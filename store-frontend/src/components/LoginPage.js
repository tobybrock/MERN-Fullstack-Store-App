import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { TextField, Button, Grid, Card} from "@material-ui/core"
import { login, updateHeaderOptions } from "../api";


export function LoginPage(props) {
  let history = useHistory();
  let location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//get the route the user was trying to reach to redirect on login
  let { from } = location.state || { from: { pathname: "/" } };

    const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    })
      .then((token) => {
        localStorage.setItem("token", token);   //store token
        props.setLoginStatus(true);             //update login state for nav
        updateHeaderOptions();                  //update the API header with new token
        history.push(from);                     //route to prior page or homepage
      })
      .catch((e) => {
        console.log(e);
        //material ui banner to tell user incorrect login
      });
  };

  return (
    <>
    <Grid
       container
       spacing={0}
       direction="column"
       alignItems="center"
       justify="center"
       style={{ minHeight: "100vh" }}
     >
       <Grid item xs={3}>
         <Card>
     <h1>Login</h1>

     <form >
       <TextField id="outlined-basic" label="email" name="email" onChange={(e) => setEmail(e.currentTarget.value)} variant="outlined" />
       <br />
       <TextField id="outlined-basic" label="password" type="password" name="password" onChange={(e) => setPassword(e.currentTarget.value)} variant="outlined" />
       <br />
       <Button style={{backgroundColor: '#7395AE', margin:20}} onClick={handleSubmit}>Login</Button>
       </form>
       <h2>Don't have an account?</h2>
       <Button style={{backgroundColor: '#7395AE', margin:20}} component={Link} to={'/register'}>Register Here</Button>
       </Card>
       </Grid>
     </Grid>
   </>
 );
}
    