import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography, TextField, Grid, Card, Button , CardContent, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    card: {
      background: "#d0d2ce",
    }
  }));
     
  export default function Shipping() {
    const classes = useStyles();

    const previous = () => {
        const prevShip = JSON.parse(window.localStorage.getItem("shipping"))
            if(prevShip.address === null){
                prevShip.address = "";
            }
            if(prevShip.city === null){
                prevShip.city = "";
            }
            if(prevShip.postalCode === null){
                prevShip.postalCode = "";
            }
            if(prevShip.country === null){
                prevShip.country = "";
            }
            console.log(prevShip);
            return prevShip
            
        }
        let previousForm = previous();

    const [address, setAddress] = useState(previousForm.address);
    const [city, setCity] = useState(previousForm.city);
    const [postalCode, setPostalCode] = useState(previousForm.postalCode);
    const [country, setCountry] = useState(previousForm.country);
    
    const onSubmit = (e) => {
      e.preventDefault();
        let ship = {
            address: address,
            city: city,
            postalCode: postalCode,
            country: country
        }

      window.localStorage.setItem('shipping', JSON.stringify(ship));
      }
  
    return (
      
            <Grid
              container
              direction="row"
              spacing={3}
              alignItems="center"
              justify="center"
            >
              
              <Box>
                <br />
                 <Card className={classes.card}>
                   <Typography variant="h2">
                  Shipping Details
                    </Typography>
                   <hr />
                   <CardContent>
                     
                <Box display="flex" justifyContent="space-between" m={1} p={1} >
                 <TextField
                    className="outlined-basic"
                    label="address"
                    name="address"
                    defaultValue={previousForm.address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <TextField
                    className="outlined-basic"
                    label="city"
                    name="city"
                    defaultValue={previousForm.city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    variant="outlined"
                  />
                  </Box>
                  <br />

                  <Box display="flex" justifyContent="space-between" m={1} p={1} >
                  <TextField
                    className="outlined-basic"
                    label="postalCode"
                    name="postalCode"
                    defaultValue={previousForm.postalCode}
                    onChange={(e) => setPostalCode(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <TextField
                    className="outlined-basic"
                    label="country"
                    name="country"
                    defaultValue={previousForm.country}
                    onChange={(e) => setCountry(e.currentTarget.value)}
                    variant="outlined"
                  />
                  </Box>
                  <br />

                <Button  style={{
                  backgroundColor: "#173f35",
                  color: "white",
                  margin: 20,
                }} onClick={onSubmit}>
                  Next
                  </Button>
                </CardContent>
                </Card>
                </Box>
                </Grid>

                ) 
                }