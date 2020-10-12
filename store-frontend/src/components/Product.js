import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from "react-router-dom";
import { Typography, TextField, Grid, Card, Button , CardContent, Box} from '@material-ui/core';
import { postProduct } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    card: {
      background: "#d0d2ce",
    }
  }));
     
  export default function Product() {
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    const onSubmit = (e) => {
      e.preventDefault();
      postProduct({
        name: name,
        image: image,
        brand: brand,
        price: price,
        category: category,
        countInStock: countInStock,
        description: description,
        rating: rating,
      })
      .then(() => {
        history.push(from);
        console.log("product created");
      })
      .catch((e) => {
      console.log(e)
      });
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
                  Add a Product to Store
                    </Typography>
                   <hr />
                   <CardContent>
                     
                     <Box display="flex" justifyContent="space-between" m={1} p={1} >
                 <TextField
                    className="outlined-basic"
                    label="name"
                    name="name"
                    onChange={(e) => setName(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <TextField
                    className="outlined-basic"
                    label="brand"
                    name="brand"
                    onChange={(e) => setBrand(e.currentTarget.value)}
                    variant="outlined"
                  />
                  </Box>
                  <br />

                  <Box display="flex" justifyContent="space-between" m={1} p={1} >
                  <TextField
                    className="outlined-basic"
                    label="category"
                    name="category"
                    onChange={(e) => setCategory(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <TextField
                    className="outlined-basic"
                    label="countInStock"
                    name="countInStock"
                    onChange={(e) => setCountInStock(e.currentTarget.value)}
                    variant="outlined"
                  />
                  </Box>
                  <br />

                  <Box display="flex" justifyContent="space-between" m={1} p={1} >
                  <TextField
                    className="outlined-basic"
                    label="price"
                    name="price"
                    onChange={(e) => setPrice(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <TextField
                    className="outlined-basic"
                    label="rating"
                    name="rating"
                    onChange={(e) => setRating(e.currentTarget.value)}
                    variant="outlined"
                  />
                  </Box>
                  <br />
                  <Typography variant="h6">
                  Add an Image Url
                  </Typography>
                  <TextField
                  className="outlined-basic"
                  label="imageUrl"
                  name="image"
                  onChange={(e) => setImage(e.currentTarget.value)}
                  variant="outlined"
                  style={{margin: 20}}
                />            
                <br />

               <TextField
                  className="outlined-basic"
                  label="description"
                  multiline
                  rows={6}
                  name="description"
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  variant="outlined"
                  style={{margin: 20}}
                />
                <br />
                <Button  style={{
                  backgroundColor: "#173f35",
                  color: "white",
                  margin: 20,
                }} onClick={onSubmit}>
                  Create Product!
                  </Button>
                </CardContent>
                </Card>
                </Box>
                </Grid>

                ) 
                }