// @flow
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    width: "600px",
  },
  media: {
    height: 250,
    borderRadius: "250px",
    width: 250,
    margin: "auto",
  },
  button: {
    marginTop: theme.spacing(8),
    background: "green",
    color: "white",
  },
  items: {
    width: "100vw",
  },
}));

export const AkunPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { dataUsers, statusLogin } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`${JSON.stringify(dataUsers)}`);
  }, []);

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
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={`http://localhost:4000/${dataUsers.image}`} title="Contemplative Reptile" />
          <CardContent>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="h5" component="h2">
                  {dataUsers.namaLengkap}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" component="h2">
                  {dataUsers.username}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {dataUsers.jenisAkun}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary" component="p">
                  {dataUsers.jenisKelamin}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${dataUsers.alamat} kec. ${dataUsers.kecamatan} Kab. ${dataUsers.kabupaten}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary" component="p">
                  {dataUsers.noHp}
                </Typography>
              </Grid>
              {dataUsers.kategori === "Petani" ? null : (
                <Grid item xs={12} style={{ width: "100vw" }}>
                  <Button fullWidth className={classes.button} variant="contained" onClick={btnLogout}>
                    Logout
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
