import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: 50,
  },
});

export default function BottomKonsumen() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Beranda" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Kategori" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Troli" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Akun" icon={<LocationOnIcon />} />
        {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    </div>
  );
}
