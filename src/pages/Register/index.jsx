import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ButtonAtoms, LinkAtoms, TypographyAtoms } from "../../components/atoms";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import { RadioMolecules } from "../../components/molecules";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { green } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    namaLengkap: "",
    username: "",
    password: "",
    jenisKelamin: "",
    alamat: "",
    kabupaten: "",
    kecamatan: "",
    kategori: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const clickBtnRegister = () => {
    const data = new FormData();
    data.append("namaLengkap", state.namaLengkap);
    data.append("username", state.username);
    data.append("password", state.password);
    data.append("jenisKelamin", state.jenisKelamin);
    data.append("alamat", state.alamat);
    data.append("noHp", state.noHp);
    data.append("kabupaten", state.kabupaten);
    data.append("kecamatan", state.kecamatan);
    data.append("kategori", state.kategori);
    data.append("statusLogin", true);
    data.append("image", state.image);

    console.log("data : ", data);

    Axios.post("http://localhost:4000/auth/register", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("post succes : ", res.data.message);
        history.push("/");
      })
      .catch((err) => {
        const message = err.response.data.message;
        setResponse(message);
        setOpen(true);
      });
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <TypographyAtoms component="h1" variant="h5" title={"Daftar"} />
        <form className={classes.form}>
          <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
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
                <TextField autoComplete="namaLengkap" name="namaLengkap" variant="outlined" value={state.namaLengkap} required fullWidth id="namaLengkap" label="Nama Lengkap" autoFocus onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="username" name="username" variant="outlined" value={state.username} required fullWidth id="username" label="Username" onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="password" value={state.password} label="Password" type="password" id="password" autoComplete="current-password" onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                {/* Select molecules */}
                <RadioMolecules title={"Jenis Kelamin"} aria-label="jenisKelamin" name="jenisKelamin" value={state.jenisKelamin} onChange={handleChange} mValue={"Perempuan"} mValue1={"Laki-Laki"} />
              </Grid>

              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="noHp" value={state.noHp} onChange={handleChange} label="No Hp" type="text" id="noHp" />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth name="alamat" value={state.alamat} onChange={handleChange} label="Alamat" type="alamat" id="alamat" />
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="kabupaten">Kabupaten</InputLabel>
                  <Select
                    native
                    value={state.kabupaten}
                    onChange={handleChange}
                    label="Kabupaten"
                    inputProps={{
                      name: "kabupaten",
                      id: "kabupaten",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"Bulukumba"}>Bulukumba</option>
                    <option value={"Bone"}>Bone</option>
                    <option value={"Gowa"}>Gowa</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="kecamatan">Kecamatan</InputLabel>
                  <Select
                    native
                    value={state.kecamatan}
                    onChange={handleChange}
                    label="kecamatan"
                    inputProps={{
                      name: "kecamatan",
                      id: "kecamatan",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"Herlang"}>Herlang</option>
                    <option value={"Samata"}>Samata</option>
                    <option value={"Bira"}>Bira</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {/* Select molecules */}
                <RadioMolecules title={"Kategori"} aria-label="kategori1" name="kategori" value={state.kategori} onChange={handleChange} mValue={"Petani"} mValue1={"Konsumen"} />
              </Grid>

              {/* Batas grid */}
            </Grid>
          </ThemeProvider>

          <ButtonAtoms fullWidth variant="contained" color="primary" className={classes.submit} title={"Daftar"} onClick={clickBtnRegister} style={{ background: "green" }} />
          <Grid container justifyContent="center">
            <Grid item className={classes.typography}>
              <LinkAtoms to="/login" variant="body2" title={"Sudah punya akun? Login"} style={{ color: "green" }} />
            </Grid>
          </Grid>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {response}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default Register;
