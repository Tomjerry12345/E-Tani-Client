import { Grid, Checkbox, Paper, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonAtoms, TypographyAtoms } from "../../../components/atoms";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  button: {
    backgroundColor: "green",
    color: "#fff",
    "&:hover": {
      backgroundColor: "green",
      color: "#fff",
    },
  },
  disabledButton: {
    backgroundColor: "#cfcfcf",
  },
});

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Product = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [jumlahBeli, setJumlahBeli] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkBtn, setCheckBtn] = useState(null);
  let jumlah;

  const { index, key, id, image, namaProduk, deskripsiProduk, kategori, harga, stok, usernamePenjual, usernamePembeli, onTotal } = props;

  useEffect(() => {
    const harga1 = harga * jumlahBeli;
    if (checkBtn != null) {
      onTotal(harga1, index, true, true, namaProduk, harga, jumlahBeli);
    }
  }, [jumlahBeli]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      onTotal(total, index, true, false, namaProduk, harga, null, id, usernamePembeli, usernamePenjual);
    } else {
      setJumlahBeli(0);
      setTotal(0);
      onTotal(0, index, !checked);
    }
  };

  const onClickTambah = () => {
    jumlah = jumlahBeli + 1;
    setJumlahBeli(jumlah);
    setCheckBtn(true);
  };

  const onClickKurang = () => {
    jumlah = jumlahBeli - 1;
    if (jumlah < 0) jumlah = 0;
    setJumlahBeli(jumlah);
    setCheckBtn(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ display: "flex" }}>
        <div>
          <ThemeProvider theme={theme}>
            <Checkbox checked={checked} defaultChecked color="primary" inputProps={{ "aria-label": "secondary checkbox" }} onChange={handleChange} />{" "}
          </ThemeProvider>
        </div>
        <div style={{ marginLeft: 10 }}>
          <img src={image} alt="Test" width="150" height="150" />
        </div>
        <div style={{ marginLeft: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {namaProduk}
            </Grid>
            <Grid item xs={12}>
              {"Rp. " + harga}
            </Grid>
            <Grid item xs={12} style={{ display: "flex" }}>
              <ButtonAtoms
                classes={{
                  root: classes.button,
                  disabled: classes.disabled,
                }}
                title={"+"}
                color="primary"
                variant="contained"
                onClick={onClickTambah}
                disabled={!checked}
              />
              <TypographyAtoms title={jumlahBeli} style={{ margin: "8px 10px", fontWeight: "bold" }} />
              <ButtonAtoms
                classes={{
                  root: classes.button,
                  disabled: classes.disabled,
                }}
                title={"-"}
                color="primary"
                variant="contained"
                onClick={onClickKurang}
                disabled={!checked}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <h1>{total}</h1>
    </Grid>
  );
};

const TroliKonsumen = () => {
  const classes = useStyles();
  const history = useHistory()
  const { dataTroli, dataUsers } = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const [listHarga, setListHarga] = useState([0, 0, 0, 0, 0]);
  const [disableBtn, setDisableBtn] = useState(true);
  // const [metodePembayaran, setMetodePembayaran] = useState("cod");
  const [listPesanan, setListPesanan] = useState([]);
  const [listId, setListId] = useState([]);

  const [dataRincianPesanan, setDataRincianPesanan] = useState({
    usernamePembeli: "",
    userNamePenjual: [],
    namaProduk: [],
    jumlah: [],
    harga: [],
    rincian: {},
    statusPengiriman: "Belum Terkirim",
    statusPenerima: "Belum Diterima",
    metodePembayaran: "cod",
    statusPembayaran: '',
    alamatPembeli: dataUsers.alamat,
  });

  useEffect(() => {
    console.log(`list id => ${listId}`)
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalHarga = listHarga.reduce(reducer);
    setTotal(totalHarga);
    if (totalHarga > 0) setDisableBtn(false);
    else setDisableBtn(true);

    if (Object.entries(dataRincianPesanan.rincian).length !== 0) {
      console.log(`tidak kosong :`);
      console.log(dataRincianPesanan);

      axios
        .post("http://localhost:4000/rincian-pesanan/add", {
          dataRincianPesanan,
        })
        .then((res) => {
          console.log(res);
          listId.map((id) => {
            axios
              .delete(`http://localhost:4000/troli/delete/${id}`)
              .then((res) => {
                console.log("res: ", res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          });

          history.push("/");

        });
    }

  }, [listHarga, dataRincianPesanan]);

  const onTotal = (total, index, checked, isBtnClick, namaProduk, harga, jumlah, id, usernamePembeli, usernamePenjual) => {
    console.log(`usernamePenjual => ${usernamePenjual} || usernamePembeli => ${usernamePembeli}`);
    if (total === 0) {
      const test = [];
      listHarga.map((res, i) => {
        if (index === i) res = 0;
        test.push(res);
      });
      setListHarga(test);
    } else {
      const test = [];
      listHarga.map((res, i) => {
        if (index === i) res = total;
        test.push(res);
      });
      setListHarga(test);
    }

    if (checked) {
      setListPesanan([
        ...listPesanan,
        {
          namaProduk,
          jumlah,
          harga,
          usernamePembeli,
          usernamePenjual
        },
      ]);

      if (isBtnClick) {
        console.log("btnClick")
        const list = [];
        listPesanan.map((data) => {
          if (data.namaProduk === namaProduk) {
            data.jumlah = jumlah;
          }
          console.log(`data => ${data}`)
          list.push(data);
        });
        setListPesanan(list);
      } else {
        console.log(`btn not click`)
      }

      setListId([...listId, id]);
    } else {
      const list = [];
      const listId1 = [];
      listPesanan.map((res, i) => {
        if (index !== i) list.push(res);
      });
      listId.map((res, i) => {
        if (index !== i) listId1.push(res);
      });
      console.log(`list => ${list}`);
      setListPesanan(list);
      setListId(listId1);
    }
  };

  const onClickPesan = () => {

    if (dataRincianPesanan.metodePembayaran === 'cod') {
      const listNamaProduk = []
      const listJumlah = []
      const listHarga = []
      const listUsernamePenjual = []
      let usernamePembeli = ''

      listPesanan.map(data => {
        listNamaProduk.push(data.namaProduk)
        listJumlah.push(data.jumlah)
        listHarga.push(data.harga)
        listUsernamePenjual.push(data.usernamePenjual)
        usernamePembeli = data.usernamePembeli
      })

      setDataRincianPesanan({
        ...dataRincianPesanan,
        usernamePembeli: usernamePembeli,
        userNamePenjual: listUsernamePenjual,
        namaProduk: listNamaProduk,
        jumlah: listJumlah,
        harga: listHarga,
        statusPembayaran: '-',
        rincian: {
          gross_amount: total,
          transaction_status: "-",
        },
      })

    } else {
      paymentGateway()
    }

  };

  const paymentGateway = () => {
    axios
      .post("http://localhost:4000/pembayaran/transaction", {
        total,
      })
      .then((res) => {
        const transactionToken = res.data.transactionToken;

        const listNamaProduk = []
        const listJumlah = []
        const listHarga = []
        const listUsernamePenjual = []
        let usernamePembeli = ''
        window.snap.pay(transactionToken, {
          onSuccess: function (result) {
            alert("payment success!");
            console.log(result);
          },
          onPending: function (result) {
            listPesanan.map(data => {
              listNamaProduk.push(data.namaProduk)
              listJumlah.push(data.jumlah)
              listHarga.push(data.harga)
              listUsernamePenjual.push(data.usernamePenjual)
              usernamePembeli = data.usernamePembeli
            })

            setDataRincianPesanan({
              ...dataRincianPesanan,
              usernamePembeli: usernamePembeli,
              userNamePenjual: listUsernamePenjual,
              namaProduk: listNamaProduk,
              jumlah: listJumlah,
              harga: listHarga,
              rincian: result,
              statusPembayaran: result.transaction_status
            })

            alert("wating your payment!");
            console.log(result);
          },
          onError: function (result) {
            alert("payment failed!");
            console.log(result);
          },
          onClose: function () {
            alert("you closed the popup without finishing the payment");
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {

    setDataRincianPesanan({
      ...dataRincianPesanan,
      metodePembayaran: event.target.value
    })
  };

  const handleChangeAlamat = (e) => {
    setDataRincianPesanan({
      ...dataRincianPesanan,
      alamat: e.target.value,
    });
  };

  return (
    <div>
      <TypographyAtoms style={{ marginTop: 10, marginBottom: 20, fontWeight: "bold" }} title={"Troli Saya"} variant="h6" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          {dataTroli ? dataTroli.map((res, index) => <Product
            index={index} key={index} id={res._id}
            image={res.image} namaProduk={res.namaProduk}
            harga={res.harga} usernamePembeli={res.usernamePembeli}
            usernamePenjual={res.usernamePenjual} onTotal={onTotal} />) : []
          }
        </Grid>
        <Grid item style={{ marginBottom: "10px" }}>
          <FormControl component="fieldset">
            <RadioGroup aria-label="payment" name="payment" value={dataRincianPesanan.metodePembayaran} onChange={handleChange}>
              <FormControlLabel value="cod" control={<Radio />} label="COD (Bayar di tempat)" />
              <FormControlLabel value="digital" control={<Radio />} label="Pembayaran Digital" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" required fullWidth value={dataRincianPesanan.alamatPembeli} name="alamat" onChange={handleChangeAlamat} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <TypographyAtoms variant="subtitle1" title={"Total Harga: " + total} />
            <ButtonAtoms
              classes={{
                root: classes.button,
                disabled: classes.disabled,
              }}
              variant="contained"
              color="primary"
              title={"Pesan"}
              style={{ marginTop: "20px" }}
              disabled={disableBtn}
              onClick={onClickPesan}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TroliKonsumen;
