import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar, Button, IconButton, Typography} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    spacing: 0,
  },
  menuIcons: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    "&:hover": {
     borderBottom: "2px solid white",
     borderBottomWidth: 'thick',
     borderBottomRightRadius: '0px',
     borderBottomLeftRadius: '0px',
  }
},
}));

export default function Nav(props) {
  const classes = useStyles();
  let logged = props.loginStatus;
  console.log("log", logged);
  
   const handleLogout = () => {
     window.localStorage.removeItem("token");
    props.logout(false);
   };

  return (
    <div className={classes.root}>
      <AppBar  elevation={0} position="static" style={{backgroundColor: '#173f35'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuIcons} style={{backgroundColor: '#173f35', color: 'white'}} aria-label="menu">
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
          <IconButton edge="end" className={classes.menuIcons} style={{backgroundColor: '#173f35', color: 'white'}} aria-label="menu">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
