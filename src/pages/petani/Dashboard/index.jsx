import { Grid, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TypographyAtoms } from "../../../components/atoms";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function DashboardPetani() {
  const [totalProduk, setTotalProduk] = useState(0);
  const { dataProduk } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("http://localhost:4000/produk/getAllProduk")
      .then((result) => {
        const data = result.data;
        dispatch({ type: "UPDATE_PRODUK", payload: data });
        setTotalProduk(data);
      })
      .catch((err) => console.log(err));
    return () => {
      setTotalProduk(0);
    };
  }, []);
  return (
    <div>
      <TypographyAtoms title={"Dashboard"} variant="subtitle1" />
      <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <StorefrontIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <TypographyAtoms title={"Jumlah Produk: " + dataProduk.totalData} variant="subtitle1" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <ShoppingCartIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <TypographyAtoms title={"Jumlah Pesanan: 0"} variant="subtitle1" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardPetani;
