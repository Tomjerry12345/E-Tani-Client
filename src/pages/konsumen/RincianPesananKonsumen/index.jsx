import React, { useEffect, useState } from "react";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Grid, IconButton, useMediaQuery } from "@material-ui/core";
import TableTesting from "./TableTesting";
import { TypographyAtoms } from "../../../components/atoms";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Fragment } from "react";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
    // width: "100vw",
    "& > *": {
      borderBottom: "unset",
    },
  },
  errorBtn: {
    backgroundColor: theme.palette.error.dark,
    color: "white",
    fontSize: "10px",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      fontSize: "12px",
    },
  },
  succesBtn: {
    backgroundColor: theme.palette.success.dark,
    color: "white",
    fontSize: "10px",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      fontSize: "12px",
    },
  },
}));

export default function RincianPesanan(props) {
  const classes = useStyles();
  const { dataUsers } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hover, setHover] = useState(false);

  const [expanded, setExpanded] = useState();

  const [window_1092_open, setWindow_1092_open] = useState(true);

  const theme = createTheme();

  const md = useMediaQuery(theme.breakpoints.down("md"));
  // let window_1092 = useMediaQuery(theme.breakpoints.down("1092"));

  //   if (window_450) {
  //     window_1092 = false;
  //   }

  // console.log(`transactionStatus => ${transactionStatus}`);
  // console.log(`window_1092 => ${window_1092}`);
  // console.log(`window_1092_open => ${window_1092_open}`);

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
        setTransactionStatus([]);
        const data1 = result.data.data;
        // const listStatus = [];
        console.log(`response => ${JSON.stringify(data1)}`);

        data1.map(async (res) => {
          if (res.metodePembayaran === "digital") {
            const res1 = await getStatusPembayaran(res.rincian);
            console.log(`res1=> ${JSON.stringify(res1.data.status)}`);
            setTransactionStatus((currentArray) => [...currentArray, res1.data.status]);
          } else {
            setTransactionStatus((currentArray) => [...currentArray, "-"]);
          }
        });
        setExpanded([...Array(data1.length)].map((val) => false));
        setData(data1);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const getStatusPembayaran = (rincian) =>
    axios.post("http://localhost:4000/pembayaran/getStatus/", {
      rincian,
    });

  // useEffect(() => {
  //   if (window_450) setWindow_1092_open(false);
  //   else setWindow_1092_open(true);
  // }, [window_450]);

  const btnTerima = (id, message) => {
    console.log(`id ${id}`);
    // const request = new FormData();
    // request.append("message", message);
    // request.append("jenisAkun", dataUsers.kategori);
    const status = message === "Sudah Diterima" ? "Belum Diterima" : "Sudah Diterima";
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

  const deletePesanan = (id) => {
    axios
      .delete(`http://localhost:4000/rincian-pesanan/delete/${id}`)
      .then((result) => {
        console.log(`response => ${result}`);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (index) => {
    setExpanded(
      expanded.map((boolean_value, i) => {
        if (index === i) {
          // once we retrieve the collapse index, we negate it
          return !boolean_value;
        } else {
          // all other collapse will be closed
          return false;
        }
      })
    );
  };

  return (
    // <TableTesting />
    <TableContainer component={Paper} style={{ width: "96vw" }}>
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Produk</TableCell>
            <TableCell align="right">Harga</TableCell>
            <TableCell align="right">Jumlah</TableCell>
            <TableCell align="right">Metode Pembayaran</TableCell>
            <Fragment>
              <TableCell align="right">Status Pembayaran</TableCell>
              <TableCell align="right">Status Pengiriman</TableCell>
              <TableCell align="right">Status Penerima</TableCell>
              <TableCell align="right">Alamat Pembeli</TableCell>
            </Fragment>
            <Fragment>
              <TableCell align="right">Total Harga</TableCell>
              <TableCell align="center">Action</TableCell>
            </Fragment>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <Fragment>
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.namaProduk.map((res, index) => (
                    <TypographyAtoms variant="subtitle1" title={res} />
                  ))}
                </TableCell>
                <TableCell align="right">
                  {row.harga.map((res, index) => (
                    <TypographyAtoms variant="subtitle1" title={res} />
                  ))}
                </TableCell>
                <TableCell align="right">
                  {row.jumlah.map((res, index) => (
                    <TypographyAtoms variant="subtitle1" title={res} />
                  ))}
                </TableCell>
                <TableCell align="right">{row.metodePembayaran}</TableCell>
                <Fragment>
                  <TableCell align="right">{transactionStatus[index]}</TableCell>
                  <TableCell align="right">{row.statusPengiriman}</TableCell>
                  <TableCell align="right">{row.statusPenerima}</TableCell>
                  <TableCell align="right">{row.alamatPembeli}</TableCell>
                </Fragment>
                <Fragment>
                  <TableCell align="right">{row.rincian.gross_amount}</TableCell>
                  <TableCell align="right">
                    <Box display="flex">
                      <Button
                        className={row.statusPenerima !== "Sudah Diterima" ? classes.succesBtn : classes.errorBtn}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        variant="contained"
                        style={{ margin: "8px" }}
                        onClick={() => btnTerima(row._id, row.statusPenerima)}
                      >
                        {row.statusPenerima === "Sudah Diterima" ? "Belum Diterima" : "Sudah Diterima"}
                      </Button>
                      <Button variant="contained" style={{ margin: "8px", background: "red", color: "white", fontSize: "10px" }} onClick={() => deletePesanan(row._id)}>
                        Batalkan Pesanan
                      </Button>
                    </Box>
                  </TableCell>
                </Fragment>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
