import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  errorBtn: {
    backgroundColor: theme.palette.error.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      fontSize: "16px",
    },
  },
  succesBtn: {
    backgroundColor: theme.palette.success.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      fontSize: "16px",
    },
  },
}));

export default function RincianPesanan() {
  const classes = useStyles();
  const { dataUsers } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hover, setHover] = useState(false);
  const [isBtnClick, setIsBtnClick] = useState(false);

  useEffect(() => {
    const request = new FormData();
    request.append("username", dataUsers.username);
    request.append("jenisAkun", dataUsers.kategori);
    axios
      .post("http://localhost:4000/rincian-pesanan/get/byName", request, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        const data1 = result.data.data;
        console.log(`response => ${JSON.stringify(data1)}`);
        setData(data1);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const btnTerima = (id, message) => {
    console.log(`id ${id}`);
    // const request = new FormData();
    // request.append("message", message);
    // request.append("jenisAkun", dataUsers.kategori);
    const status = message === "Sudah Terkirim" ? "Belum Terkirim" : "Sudah Terkirim";
    const data = {
      message: status,
      jenisAkun: dataUsers.kategori,
    };

    axios
      .put(`http://localhost:4000/rincian-pesanan/update/${id}`, {
        data,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(`response => ${result}`);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Produk</TableCell>
            <TableCell align="right">Harga</TableCell>
            <TableCell align="right">Jumlah</TableCell>
            <TableCell align="right">Metode Pembayaran</TableCell>
            <TableCell align="right">Status Pembayaran</TableCell>
            <TableCell align="right">Status Pengiriman</TableCell>
            <TableCell align="right">Status Penerima</TableCell>
            <TableCell align="right">Alamat Pembeli</TableCell>
            <TableCell align="right">Total Harga</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.namaProduk.map((res, index) => (
                  <Typography variant="subtitle1">
                    {index + 1}. {res}
                  </Typography>
                ))}
              </TableCell>
              <TableCell align="right">
                {row.harga.map((res, index) => (
                  <Typography variant="subtitle1">
                    {index + 1}. {res}
                  </Typography>
                ))}
              </TableCell>
              <TableCell align="right">
                {row.jumlah.map((res, index) => (
                  <Typography variant="subtitle1">
                    {index + 1}. {res}
                  </Typography>
                ))}
              </TableCell>
              <TableCell align="right">{row.metodePembayaran}</TableCell>
              <TableCell align="right">{row.rincian.transaction_status}</TableCell>
              <TableCell align="right">{row.statusPengiriman}</TableCell>
              <TableCell align="right">{row.statusPenerima}</TableCell>
              <TableCell align="right">{row.alamatPembeli}</TableCell>
              <TableCell align="right">{row.rincian.gross_amount}</TableCell>
              <TableCell align="right">
                <Button
                  // color={row.statusPenerima === "Sudah Diterima" ? "succes" : "error"}
                  className={row.statusPengiriman === "Sudah Terkirim" ? classes.succesBtn : classes.errorBtn}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  variant="contained"
                  onClick={() => btnTerima(row._id, row.statusPengiriman)}
                >
                  {row.statusPengiriman === "Belum Terkirim" ? "Belum Terkirim" : "Sudah Terkirim"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
