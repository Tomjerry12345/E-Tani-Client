import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { CardAtoms, TypographyAtoms } from "../../../components/atoms";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const DashboardKonsumen = ({ userKategori }) => {
  const [produk, setProduk] = useState([]);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [severity, setSeverity] = useState("");
  const idTroli = [];
  const idProduk = [];
  const listDisableBtn = [];
  const [disableBtn, setDisableBtn] = useState([]);
  let i = 0;

  const { dataUsers, statusProduk } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = new FormData();
    request.append("username", dataUsers.username);
    axios
      .get("http://localhost:4000/produk/getAllProduk")
      .then((result) => {
        const data = result.data.data;
        data.map((produk) => idProduk.push(produk._id));
        setProduk(data);
        return axios.post("http://localhost:4000/troli/getTroli", request, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
      })
      .then((result) => {
        const troli = result.data.data;
        troli.map((troli) => idTroli.push(troli.idProduk));

        idProduk.map((res) => listDisableBtn.push(idTroli.includes(res)));

        setDisableBtn(listDisableBtn);
        dispatch({ type: "UPDATE_TROLI", payload: troli });
      })
      .catch((err) => console.log(err));
  }, [produk]);

  const onAddToTroli = (id, image, namaProduk, deskripsiProduk, kategori, harga, stok, usernamePenjual) => {
    console.log(`username penjual => ${usernamePenjual}`);
    console.log(`produk => ${JSON.stringify(produk)}`);
    const data = new FormData();
    data.append("idProduk", id);
    data.append("namaProduk", namaProduk);
    data.append("deskripsiProduk", deskripsiProduk);
    data.append("kategori", kategori);
    data.append("harga", harga);
    data.append("stok", stok);
    data.append("image", image);
    data.append("usernamePembeli", dataUsers.username);
    data.append("usernamePenjual", usernamePenjual);

    axios
      .post("http://localhost:4000/troli/createTroli", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const message = res.data.message;
        console.log("post succes : ", message);
        setSeverity("success");
        setResponse(message);
        setOpen(true);
        dispatch({ type: "UPDATE_STATUS_PRODUK", payload: !statusProduk });
      })
      .catch((err) => {
        const message = err.response.data.message;
        setSeverity("error");
        setResponse(message);
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <TypographyAtoms title={"Produk"} variant="h6" />
      <Grid container direction="column" style={{ marginTop: "10px" }} spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            {produk
              ? produk.map((dataProduk) => {
                return (
                  <Grid item md={3} key={dataProduk._id}>
                    <CardAtoms
                      id={dataProduk._id}
                      image={`http://localhost:4000/${dataProduk.image}`}
                      namaProduk={dataProduk.namaProduk}
                      deskripsiProduk={dataProduk.deskripsiProduk}
                      kategori={dataProduk.kategori}
                      harga={dataProduk.harga}
                      stok={dataProduk.stok}
                      usernamePenjual={dataProduk.userNamePenjual}
                      userKategori={userKategori}
                      onAddToTroli={onAddToTroli}
                      disableBtn={disableBtn[i++]}
                    />
                  </Grid>
                );
              })
              : []}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {response}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashboardKonsumen;
