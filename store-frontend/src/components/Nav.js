import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar, Button, IconButton} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    spacing: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
          <IconButton edge="start" className={classes.menuButton} style={{backgroundColor: '#173f35'}} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button style={{backgroundColor: '#173f35'}} component={Link} to={'/'}>Home</Button>
          {
            logged 
            ? (
              <Button style={{backgroundColor: '#173f35'}} onClick={handleLogout}>Logout</Button>
            )
            : (
              <Button style={{backgroundColor: '#173f35'}} component={Link} to={'/login'}>Login</Button>
            )
          }
          <Button style={{backgroundColor: '#173f35'}} component={Link} to={'/profile'}>Profile</Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
