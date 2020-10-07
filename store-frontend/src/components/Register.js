import React, { useState } from "react";
import { register } from "../api";
import { useHistory } from "react-router-dom";
import { TextField, Button, Card, Grid, Switch, FormControlLabel, FormGroup, FormControl } from "@material-ui/core";

export function Register() {
    let history = useHistory();

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
    }
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
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Card>
            
              <h1>Register</h1>
            <FormControl component="fieldset">
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
                control={<Switch checked={checked} onChange={toggleChecked}/>}
                 label="Admin"
             />
              <br />
              <Button style={{ backgroundColor: "#7395AE", margin:20}} onClick={handleSubmit}>
                Register
              </Button>
            </FormGroup>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
