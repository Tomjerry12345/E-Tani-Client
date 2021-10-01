import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { TypographyAtoms } from "../../../components/atoms";
import { useHistory } from "react-router-dom";

const KategoriProduk = ({ title, icon }) => {
  const history = useHistory();

  const onBtnKategori = () => {
    history.push({ pathname: "/tampil-kategori", state: { kategori: title } });
  };

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <IconButton color="inherit" onClick={onBtnKategori}>
            {icon}
          </IconButton>
        </Grid>
        <Grid item>
          <TypographyAtoms title={title} variant="subtitle" />
        </Grid>
      </Grid>
    </Grid>
  );
};

const KategoriKonsumen = () => {
  return (
    <div>
      <TypographyAtoms title={"Kategori"} variant="h6" />
      <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <KategoriProduk title={"Sayur-mayur"} icon=<StorefrontIcon fontSize="large" /> />
        <KategoriProduk title={"Serelia"} icon=<ShoppingCartIcon fontSize="large" /> />
        <KategoriProduk title={"Buah-buahan"} icon=<ShoppingCartIcon fontSize="large" /> />
        <KategoriProduk title={"Kacang-kacangan"} icon=<ShoppingCartIcon fontSize="large" /> />
        <KategoriProduk title={"Umbi-umbian"} icon=<ShoppingCartIcon fontSize="large" /> />
      </Grid>
    </div>
  );
};

export default KategoriKonsumen;
