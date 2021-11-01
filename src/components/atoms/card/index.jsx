import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ButtonAtoms from "../Button";
import { Box } from "@material-ui/core";
import { baseUrl } from "../../../config/constant/Constant";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400,
  },
  media: {
    height: 140,
  },
  button: {
    backgroundColor: "green",
    color: "#fff",
    "&:hover": {
      backgroundColor: "green",
      color: "#fff",
    },
  },
  disabledButton: {
    backgroundColor: "#cfcfcf",
  },
});

const CardAtoms = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [disableBtn1, setDisableBtn] = useState(false);

  const { id, image, namaProduk, deskripsiProduk, kategori, harga, stok, userNamePenjual, onDelete, userKategori, onAddToTroli, disableBtn } = props;

  const data = {
    image,
    namaProduk,
    deskripsiProduk,
    kategori,
    harga,
    stok,
    userNamePenjual,
  };

  let button;
  if (userKategori === "Petani") {
    button = (
      <Fragment>
        <ButtonAtoms size="small" color="primary" onClick={() => history.push({ pathname: "/edit-produk", id: id, title: "Edit Produk", btnTitle: "Edit", data: data })} title={"Edit"} style={{ color: "green" }} />
        <ButtonAtoms size="small" color="primary" onClick={() => onDelete(id)} title={"Delete"} style={{ color: "green" }} />
      </Fragment>
    );
  } else {
    button = (
      <Button
        classes={{
          root: classes.button,
          disabled: classes.disabled,
        }}
        variant="contained"
        size="large"
        color="primary"
        fullWidth
        disabled={disableBtn ? disableBtn : disableBtn1}
        onClick={() => {
          setDisableBtn(true);
          onAddToTroli(id, image, namaProduk, deskripsiProduk, kategori, harga, stok, userNamePenjual);
        }}
      >
        Tambah ke troli
      </Button>
    );
  }

  const clickCard = () => {
    history.push({ pathname: "/detail-produk", data });
  };

  return (
    <Card className={classes.root} style={{ position: "relative" }}>
      <CardActionArea onClick={clickCard}>
        <CardMedia className={classes.media} image={`${baseUrl}/${image}`} title="Contemplative Reptile" />
        <CardContent>
          <Typography variant="h5" component="h2">
            {namaProduk}
          </Typography>
          <Typography variant="subtitle1" style={{ color: "green" }} gutterBottom>
            {kategori}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {deskripsiProduk}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box style={{ height: 70, position: "absolute", bottom: "0px" }}>
        <CardActions style={{ position: "absolute", bottom: "0px", width: 344 }}>{button}</CardActions>
      </Box>
    </Card>
  );
};

export default CardAtoms;
