import { Grid } from "@material-ui/core";
import React from "react";
import { ButtonAtoms, TypographyAtoms } from "../../../components/atoms";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";

const AkunKonsumen = () => {
  const { statusLogin } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory()
  const btnLogout = () => {
    axios
      .put("http://localhost:4000/auth/logout")
      .then((result) => {
        console.log(result);
        dispatch({ type: "UPDATE_STATUS_LOGIN", payload: !statusLogin });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <TypographyAtoms title={"Akun Saya"} variant="h6" />
      <Grid container direction="column" style={{ marginTop: "10px", paddingRight: "10px" }} spacing={2}>
        <Grid item>
          <ButtonAtoms fullWidth title={"Pesanan Saya"} variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} style={{ justifyContent: "end", background: "green" }} size="large" onClick={() => history.push('/konsumen/rincian-pesanan')} />
        </Grid>
        <Grid item>
          <ButtonAtoms fullWidth title={"Alamat Saya"} variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} style={{ justifyContent: "end", background: "green" }} size="large" />
        </Grid>
        <Grid item>
          <ButtonAtoms fullWidth title={"Informasi Akun"} variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} style={{ justifyContent: "end", background: "green" }} size="large" />
        </Grid>
        <Grid item>
          <ButtonAtoms fullWidth title={"Keluar"} variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} style={{ justifyContent: "end", background: "green" }} size="large" onClick={btnLogout} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AkunKonsumen;
