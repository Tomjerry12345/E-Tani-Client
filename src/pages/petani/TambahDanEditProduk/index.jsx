import { Container, FormControl, Grid, IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ButtonAtoms, TypographyAtoms } from "../../../components/atoms";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const TambahDanEditProduk = ({ title, btnTitle }) => {
  const classes = useStyles();
  const location = useLocation();
  const [state, setState] = useState({
    namaProduk: "",
    deskripsiProduk: "",
    kategori: "",
    harga: "",
    stok: "",
    image: "",
  });

  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [preview, setPreview] = useState(null);
  const [severity, setSeverity] = useState("");

  const { dataUsers } = useSelector((state) => state);

  useEffect(() => {
    console.log(`dataUsers => ${JSON.stringify(dataUsers)}`)
  }, [dataUsers])

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const requestProduk = (request) => {
    request
      .then((res) => {
        const message = res.data.message;
        console.log("post succes : ", message);
        setSeverity("success");
        setResponse(message);
        state.namaProduk = "";
        state.deskripsiProduk = "";
        state.kategori = "";
        state.harga = "";
        state.stok = "";
        state.image = "";
        setPreview(null);
        setOpen(true);
      })
      .catch((err) => {
        const message = err.response.data.message;
        setSeverity("error");
        setResponse(message);
        setOpen(true);
      });
  };

  const btnClick = () => {
    const data = new FormData();
    data.append("namaProduk", state.namaProduk);
    data.append("deskripsiProduk", state.deskripsiProduk);
    data.append("kategori", state.kategori);
    data.append("harga", state.harga);
    data.append("stok", state.stok);
    data.append("image", state.image);
    data.append("userNamePenjual", dataUsers.username);
    if (btnTitle === "Simpan") {
      const insertData = axios.post("http://localhost:4000/produk/createProduk", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      requestProduk(insertData);
    } else {
      const updateData = axios.put(`http://localhost:4000/produk/${location.id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      requestProduk(updateData);
    }
  };

  const onSetImage = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setState({
      ...state,
      image: file,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let colorText, styleImage;
  if (preview === null) {
    colorText = "black";
    styleImage = {
      background: "#0222",
      height: "200px",
    };
  } else {
    styleImage = {
      background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${preview})`,
      height: "200px",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
    colorText = "white";
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <TypographyAtoms title={title} variant="h6" />
        <ThemeProvider theme={theme}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
              <Grid
                item
                xs={12}
                style={{
                  height: "50%",
                }}
              >
                <Grid container direction="column" alignItems="center" style={styleImage} justifyContent="center">
                  <Grid item>
                    <input accept="image/*" id="icon-button-file" type="file" hidden onChange={(e) => onSetImage(e)} />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <AddPhotoAlternateIcon fontSize="large" style={{ color: `${colorText}` }} />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item>
                    <TypographyAtoms title={"Tambah Foto"} variant="subtitle" style={{ color: `${colorText}` }} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="namaProduk" name="namaProduk" variant="outlined" required fullWidth id="namaProduk" label="Nama Produk" autoFocus value={state.namaProduk} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="deskripsiProduk" name="deskripsiProduk" variant="outlined" required fullWidth id="deskripsiProduk" label="Deskripsi" multiline rows={4} value={state.deskripsiProduk} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                {/* Select Molecules */}
                <FormControl variant="outlined">
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    native
                    value={state.kategori}
                    onChange={handleChange}
                    label="Kategori"
                    inputProps={{
                      name: "kategori",
                      id: "kategori",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"Sayur-mayur"}>Sayur-mayur</option>
                    <option value={"Serelia"}>Serelia</option>
                    <option value={"Buah-buahan"}>Buah-buahan</option>
                    <option value={"Kacang-kacangan"}>Kacang-kacangan</option>
                    <option value={"Umbi-umbian"}>Umbi-umbian</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="harga" label="Harga" type="number" id="harga" autoComplete="harga" value={state.harga} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="stok" label="Stok" type="number" id="stok" autoComplete="stok" value={state.stok} onChange={handleChange} />
              </Grid>
              {/* Batas grid */}
            </Grid>
          </form>
        </ThemeProvider>
        <ButtonAtoms style={{ backgroundColor: "green" }} fullWidth variant="contained" color="primary" className={classes.submit} title={btnTitle} onClick={btnClick} />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {response}
          </Alert>
        </Snackbar>
      </Container>
    </div >
  );
};

export default TambahDanEditProduk;
