import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { FormControl, FormGroup, TextField, Button, Grid, Card, CardContent } from "@material-ui/core";
import { login, updateHeaderOptions } from "../api";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: "#d0d2ce",
    color: "black",
    height: 400,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 350,
  },
}));

export function LoginPage(props) {
  let history = useHistory();
  let location = useLocation();

  const classes = useStyles();
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
        localStorage.setItem("token", token); //store token
        props.setLoginStatus(true); //update login state for nav
        updateHeaderOptions(); //update the API header with new token
        history.push(from); //route to prior page or homepage
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
        direction="row"
        spacing={3}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <h1>LOGIN</h1>
              <FormControl>
              <FormGroup>
                <TextField
                  id="outlined-basic"
                  label="email"
                  name="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  variant="outlined"
                />
                <br />
                <TextField
                  id="outlined-basic"
                  label="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  variant="outlined"
                />
                <br />
                <Button
                  style={{
                    backgroundColor: "#173f35",
                    color: "white",
                    margin: 20,
                    width: 225,
                  }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <h1>NEW AROUND HERE?</h1>
              <p>
                Create an online account with us to reap the benefits! Fast and
                easy checkout, plus awesome reward benefits!
              </p>
              <br />
              <Button
                style={{
                  backgroundColor: "#173f35",
                  color: "white",
                  margin: 20,
                }}
                component={Link}
                to={"/register"}
              >
                Register Here
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
