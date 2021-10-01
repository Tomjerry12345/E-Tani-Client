import React, { Fragment, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Badge, FilledInput, FormControl, InputAdornment, InputLabel } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  title: {
    flexGrow: 0.2,
  },

  icon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const HeaderKonsumen = () => {
  const classes = useStyles();
  const history = useHistory();
  const { dataTroli } = useSelector((state) => state);
  const [totalData, setTotalData] = useState(0);
  const [cari, setCari] = useState("");

  useEffect(() => {
    console.log("dataTroli: ", dataTroli);
    let sumData = 0;
    dataTroli.map(() => (sumData = sumData + 1));
    setTotalData(sumData);
  }, [dataTroli]);

  const handleChange = (event) => {
    setCari(event.target.value);
  };

  return (
    <Fragment>
      <AppBar position="absolute" style={{ background: "green" }}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap style={{ width: "20ch" }}>
            Dashboard
          </Typography>
          <div className={classes.icon} style={{}}>
            <IconButton color="inherit" onClick={() => history.push("/kategori")}>
              <CategoryIcon />
            </IconButton>
            <Typography variant="subtitle1" color="inherit" noWrap style={{ marginBottom: "10px" }}>
              Kategori
            </Typography>
          </div>

          <FormControl fullWidth variant="filled" style={{ margin: "0px 10px 0px 10px" }}>
            <InputLabel htmlFor="filled-adornment-password">Cari</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end" onClick={() => history.push({ pathname: "/cari", state: { cari: cari } })}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              style={{ background: "white" }}
              value={cari}
              onChange={handleChange}
            />
          </FormControl>
          <div className={classes.icon} style={{ marginRight: "10px" }}>
            <IconButton color="inherit" onClick={() => history.push("/troli")}>
              <Badge badgeContent={totalData} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Typography variant="subtitle1" color="inherit" noWrap style={{ marginBottom: "10px" }}>
              Troli
            </Typography>
          </div>
          <div className={classes.icon} style={{ marginRight: "10px" }}>
            <IconButton color="inherit" onClick={() => history.push("/akun")}>
              <AccountCircleIcon />
            </IconButton>
            <Typography variant="subtitle1" color="inherit" noWrap style={{ marginBottom: "10px" }}>
              Akun
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default HeaderKonsumen;
