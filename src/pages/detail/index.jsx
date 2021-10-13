import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function DetailProduk() {
  const history = useHistory();
  const data = history.location.data;

  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: "UPDATE_REFRESH", payload: !refresh });
  }, []);
  return (
    <div>
      <Grid container>
        <Grid item md={2} />
        <Grid item md={4} sm>
          <img src={data.image} alt="gambar" width="500" />
        </Grid>
        <Grid item md sm>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{
                  fontWeight: "bold",
                }}
              >
                {data.namaProduk}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="h4">{`Rp. ${data.harga}`}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "14px",
              }}
            >
              <Typography variant="h6">{data.deskripsiProduk}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="subtitle1">
                Kategori: <span style={{ color: "green" }}>{data.kategori}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="subtitle1">
                Stok: <span style={{ color: "green" }}>{data.stok}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "10px",
              }}
            >
              <Typography variant="subtitle1">
                Penjual: <span style={{ color: "green" }}>{data.userNamePenjual}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "20px",
              }}
            >
              <Button variant="contained" style={{ background: "green", color: "white" }} onClick={() => history.push("/")}>
                Kembali ke menu awal
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
