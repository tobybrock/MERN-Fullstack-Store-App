import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CardContent,
  TextField,
  Button,
  Card,
  Grid,
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "../api";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    padding: theme.spacing(2),
    textAlign: "center",
    background: "#d0d2ce",
    color: "black",
    height: 600,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 350,
  },
}));

export function Register() {
  let history = useHistory();

  const classes = useStyles();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    setIsAdmin((prev) => !prev);
  };
  const formData = {
    displayName: displayName,
    email: email,
    password: password,
    passwordCheck: passwordCheck,
    isAdmin: isAdmin,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData)
      .then((result) => {
        console.log("user created", result);
        history.push("/login");
      })
      .catch((e) => {
        console.log("error", e);
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
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
            <h1>Register</h1>
            <br />
              <FormControl>  
                <FormGroup>
                  <TextField
                    className="outlined-basic"
                    label="displayname"
                    name="displayname"
                    onChange={(e) => setDisplayName(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    className="outlined-basic"
                    label="email"
                    name="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    className="outlined-basic"
                    label="password"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="passwordCheck"
                    type="password"
                    name="passwordCheck"
                    onChange={(e) => setPasswordCheck(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Switch checked={checked} onChange={toggleChecked} />
                    }
                    label="Admin"
                  />
                  <br />
                  <Button
                    style={{ backgroundColor: "#173f35", color: "white", margin: 20 }}
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
