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
        <Grid item md={3} xs={9}>
          <img src={data.image} alt="gambar" width="300" height="300" />
        </Grid>
        <Grid item md={4} sxs={10}>
          <Grid container>
            <Grid item xs={10}>
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
              <Typography variant="h7">{data.deskripsiProduk}</Typography>
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
                Penjual: <span style={{ color: "green" }}>{data.namaPenjual}</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "20px",
              }}
            >
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
