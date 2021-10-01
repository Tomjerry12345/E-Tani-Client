import { Grid, Checkbox, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonAtoms, TypographyAtoms } from "../../../components/atoms";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

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

  const { index, key, id, image, namaProduk, deskripsiProduk, kategori, harga, stok, onTotal } = props;

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      console.log("tercek");
    } else {
      console.log("tidak tercek");
      setJumlahBeli(0);
      setTotal(0);
      onTotal(0, index);
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

  useEffect(() => {
    const harga1 = harga * jumlahBeli;
    if (checkBtn != null) {
      if (checkBtn) {
        console.log("tambah");
        setTotal(harga1);
        onTotal(harga1, index);
      } else {
        console.log("kurang");
        console.log("total: ", total);
        setTotal(harga1);
        onTotal(harga1, index);
      }
    }
  }, [jumlahBeli]);

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
  const { dataTroli } = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const [listHarga, setListHarga] = useState([0, 0, 0, 0, 0]);
  const [disableBtn, setDisableBtn] = useState(true);

  console.log("dataTroli: ", dataTroli);

  useEffect(() => {
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalHarga = listHarga.reduce(reducer);
    setTotal(totalHarga);
    if (totalHarga > 0) setDisableBtn(false);
    else setDisableBtn(true);
  }, [listHarga]);

  const onTotal = (harga, index, checked) => {
    console.log("harga: ", harga);
    console.log("checked: ", checked);
    if (harga === 0) {
      console.log("kosong");
      const test = [];
      listHarga.map((res, i) => {
        if (index === i) res = 0;
        test.push(res);
      });
      setListHarga(test);
    } else {
      const test = [];
      listHarga.map((res, i) => {
        if (index === i) res = harga;
        test.push(res);
      });
      setListHarga(test);
    }
  };

  return (
    <div>
      <TypographyAtoms style={{ marginTop: 10, marginBottom: 20, fontWeight: "bold" }} title={"Troli Saya"} variant="h6" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          {dataTroli
            ? dataTroli.map((res, index) => {
                console.log("index: ", index);
                return <Product index={index} key={index} id={res._id} image={res.image} namaProduk={res.namaProduk} harga={res.harga} onTotal={onTotal} />;
              })
            : []}
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
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TroliKonsumen;
