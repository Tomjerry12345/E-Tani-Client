// import React, { Fragment, useEffect, useState } from "react";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import { makeStyles, alpha } from "@material-ui/core/styles";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { Badge, FilledInput, FormControl, InputAdornment, InputLabel } from "@material-ui/core";
// import CategoryIcon from "@material-ui/icons/Category";
// import SearchIcon from "@material-ui/icons/Search";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { Box, CardMedia } from "@material-ui/core";
// import Logo from "../../../../assets/icon/logo.png";
// import InputBase from "@material-ui/core/InputBase";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     // width: "100vw",
//   },
//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },

//   title: {
//     flexGrow: 0.2,
//   },

//   icon: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",

//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// const HeaderKonsumen = () => {
//   const classes = useStyles();
//   const history = useHistory();

//   const path = history.location.pathname;

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const { dataTroli } = useSelector((state) => state);
//   const [totalData, setTotalData] = useState(0);
//   const [cari, setCari] = useState("");
//   const [hideArrow, setHideArrow] = useState(false);

//   useEffect(() => {
//     path !== "/" ? setHideArrow(true) : setHideArrow(false);
//     let sumData = 0;
//     dataTroli.map(() => (sumData = sumData + 1));
//     setTotalData(sumData);
//   }, [dataTroli]);

//   const handleChange = (event) => {
//     setCari(event.target.value);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = (event) => {
//     console.log(`click menu ${event}`);
//     event === "pesananSaya" ? history.push("/konsumen/rincian-pesanan") : history.push("/akun");
//     setAnchorEl(null);
//   };

//   return (
//     <Fragment>
//       <AppBar position="absolute" style={{ background: "green", width: "100vw" }}>
//         <Toolbar className={classes.toolbar}>
//           {!hideArrow ? null : (
//             <IconButton color="inherit" onClick={() => history.push("/")}>
//               <ArrowBackIcon />
//             </IconButton>
//           )}

//           <Box style={{ marginRight: "10px" }}>
//             <img src={Logo} alt="logo" width="60" />
//           </Box>
//           <Typography className={classes.title} component="h1" variant="h6" color="inherit" noWrap>
//             E-Tani
//           </Typography> [selesai]
//           <div className={classes.icon} style={{}}>
//             <IconButton color="inherit" onClick={() => history.push("/kategori")}>
//               <CategoryIcon />
//             </IconButton>
//             <Typography variant="subtitle1" color="inherit" noWrap style={{ marginBottom: "10px" }}>
//               Kategori
//             </Typography>
//           </div>

//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ "aria-label": "search" }}
//               onChange={handleChange}
//             />
//           </div>

//           {/* <FormControl variant="filled" style={{ margin: "0px 10px 0px 10px", width: "50vw" }}>
//             <InputLabel htmlFor="filled-adornment-password">Cari</InputLabel>
//             <FilledInput
//               id="filled-adornment-password"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton aria-label="toggle password visibility" edge="end" onClick={() => history.push({ pathname: "/cari", state: { cari: cari } })}>
//                     <SearchIcon />
//                   </IconButton>
//                 </InputAdornment>
//               }
//               style={{ background: "white" }}
//               value={cari}
//               onChange={handleChange}
//             />
//           </FormControl> */}
//           <div className={classes.icon} style={{ marginRight: "10px" }}>
//             <IconButton color="inherit" onClick={() => history.push("/troli")}>
//               <Badge badgeContent={totalData} color="secondary">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//             <Typography variant="subtitle1" color="inherit" noWrap style={{ marginBottom: "10px" }}>
//               Troli
//             </Typography>
//           </div>
//           <div className={classes.icon} style={{ marginRight: "10px" }}>
//             <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => setAnchorEl(event.currentTarget)}>
//               <AccountCircleIcon />
//             </IconButton>
//             <Typography variant="subtitle1" color="inherit" noWrap style={{ marginBottom: "10px" }}>
//               Akun
//             </Typography>
//           </div>
//           <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
//             <MenuItem onClick={() => handleClose("pesananSaya")}>Pesanan saya</MenuItem>
//             <MenuItem onClick={() => handleClose("informasiAkun")}>Informasi Akun</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//     </Fragment>
//   );
// };

// export default HeaderKonsumen;

import { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import { makeStyles, alpha } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import clsx from "clsx";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import Logo from "../../../../assets/icon/logo.png";
import { Box, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CategoryIcon from "@material-ui/icons/Category";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "green",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    padding: 16,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const HeaderKonsumen = () => {
  const classes = useStyles();
  const history = useHistory();

  const path = history.location.pathname;

  const [anchorEl, setAnchorEl] = useState(null);
  const { dataTroli } = useSelector((state) => state);
  const [totalData, setTotalData] = useState(0);
  const [cari, setCari] = useState("");
  const [hideArrow, setHideArrow] = useState(false);

  useEffect(() => {
    path !== "/" ? setHideArrow(true) : setHideArrow(false);
    let sumData = 0;
    dataTroli.map(() => (sumData = sumData + 1));
    setTotalData(sumData);
  }, [dataTroli]);

  const handleChange = (event) => {
    console.log(`${event.keyCode}`);
    if (event.keyCode == 13) {
      history.push({ pathname: "/cari", state: { cari: event.target.value } });
      console.log("value", event.target.value);
      setCari("");
      // put the login here
    }
    // setCari(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    console.log(`click menu ${event}`);
    event === "pesananSaya" ? history.push("/konsumen/rincian-pesanan") : history.push("/akun");
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {!hideArrow ? null : (
            <IconButton color="inherit" onClick={() => history.push("/")}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box>
            <img src={Logo} alt="logo" width="60" height="50" />
          </Box>
          <Typography className={classes.title} component="h1" variant="h6" color="inherit" noWrap>
            E-Tani
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleChange}
              value={cari}
              // onChange={handleChange}
            />
          </div>
          <IconButton color="inherit" onClick={() => history.push("/kategori")}>
            <CategoryIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => history.push("/checkout")}>
            <Badge badgeContent={totalData} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => setAnchorEl(event.currentTarget)}>
            <AccountCircleIcon />
          </IconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => handleClose("pesananSaya")}>Pesanan saya</MenuItem>
            <MenuItem onClick={() => handleClose("informasiAkun")}>Informasi Akun</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderKonsumen;
