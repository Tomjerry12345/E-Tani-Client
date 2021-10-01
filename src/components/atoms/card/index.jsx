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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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

  const { id, image, namaProduk, deskripsiProduk, kategori, harga, stok, onDelete, userKategori, onAddToTroli, disableBtn } = props;

  let button;
  if (userKategori === "Petani") {
    button = (
      <Fragment>
        <ButtonAtoms size="small" color="primary" onClick={() => history.push({ pathname: "/edit-produk", id: id })} title={"Edit"} style={{ color: "green" }} />
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
          onAddToTroli(id, image, namaProduk, deskripsiProduk, kategori, harga, stok);
        }}
      >
        Tambah ke troli
      </Button>
    );
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {namaProduk}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {deskripsiProduk}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>{button}</CardActions>
    </Card>
  );
};

export default CardAtoms;
