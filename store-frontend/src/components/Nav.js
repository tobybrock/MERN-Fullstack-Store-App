import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, AppBar, Toolbar, Button, IconButton, Typography, Drawer, Divider} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    spacing: 0,
  },
  menuIcons: {
    marginRight: theme.spacing(2),
    backgroundColor: '#173f35', 
    color: 'white'
  },
  menuButton: {
    "&:hover": {
     borderBottom: "2px solid white",
     borderBottomWidth: 'thick',
     borderBottomRightRadius: '0px',
     borderBottomLeftRadius: '0px',
  }
},
drawer: {
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
},
}));

export default function Nav(props) {

  const classes = useStyles();

  let logged = props.loginStatus;
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(true)
  };

     const handleLogout = () => {
     window.localStorage.removeItem("token");
    props.logout(false);
   };

  return (
    <div className={classes.root}>
      <AppBar  elevation={0} position="static" style={{backgroundColor: '#173f35'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuIcons} onClick={handleDrawerToggle} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button className={classes.menuButton} style={{backgroundColor: '#173f35', color: 'white'}} component={Link} to={'/'}>Home</Button>
          {
            logged 
            ? (
              <>
              <Button className={classes.menuButton} style={{backgroundColor: '#173f35', color: 'white'}} onClick={handleLogout} component={Link} to={'/'}>Logout</Button>
              <Button className={classes.menuButton} style={{backgroundColor: '#173f35', color: 'white'}} component={Link} to={'/product'}>Create Product</Button>
              </>
            )
            : (
              <Button className={classes.menuButton} style={{backgroundColor: '#173f35', color: 'white'}} component={Link} to={'/login'}>Login</Button>
            )
          }
           <Typography type="title" color="inherit" style={{ flex: 1 }}>
           </Typography>
          <IconButton edge="end" className={classes.menuIcons} component={Link} to={'/cart'} aria-label="menu">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        />
    </div>
  );
}
