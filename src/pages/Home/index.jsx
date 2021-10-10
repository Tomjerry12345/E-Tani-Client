import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { HeaderPetani, HeaderKonsumen } from "../../components/molecules";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DashboardPetani, Pesanan, Produk, RincianPesananPetani, TambahDanEditProduk } from "../petani";
import { AkunKonsumen, DashboardKonsumen, KategoriKonsumen, RincianPesananKonsumen, TroliKonsumen } from "../konsumen";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TampilKategori from "../konsumen/Kategori/TampilKategori";
import TampilCari from "../konsumen/cari";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const { dataUsers, statusLogin } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log("dataUsers: ", dataUsers);

  let header;
  let routerx;

  useEffect(() => {
    console.log("statusLogin");
    Axios.get("http://localhost:4000/users/getAllUsers")
      .then((result) => {
        const data = result.data.data;
        if (data.length === 0) {
          history.push("/login");
        } else {
          history.push("/");
          data.map((res) => dispatch({ type: "UPDATE_USERS", payload: res }));
        }
      })
      .catch((err) => console.log(err));
  }, [statusLogin]);

  if (dataUsers.kategori === "Petani") {
    header = <HeaderPetani />;
    routerx = <Route exact path="/" component={DashboardPetani} />;
  } else {
    header = <HeaderKonsumen />;
    routerx = (
      <Route exact path="/">
        <DashboardKonsumen userKategori={"Konsumen"} />
      </Route>
    );
  }

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        {/* AppBar */}
        {header}

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={classes.container}>
            <Switch>
              {routerx}
              <Route path="/produk">
                <Produk userKategori={"Petani"} />
              </Route>
              <Route path="/pesan" component={Pesanan} />
              <Route path="/tambah-produk">
                <TambahDanEditProduk title={"Tambah Produk"} btnTitle={"Simpan"} />
              </Route>
              <Route path="/edit-produk">
                <TambahDanEditProduk title={"Edit Produk"} btnTitle={"Update"} />
              </Route>
              <Route path="/kategori" component={KategoriKonsumen} />
              <Route path="/tampil-kategori" component={TampilKategori} />
              <Route path="/cari" component={TampilCari} />
              <Route path="/troli" component={TroliKonsumen} />
              <Route path="/akun" component={AkunKonsumen} />
              <Route path="/konsumen/rincian-pesanan" component={RincianPesananKonsumen} />
              <Route path="/petani/rincian-pesanan" component={RincianPesananPetani} />
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
};

export default Home;
