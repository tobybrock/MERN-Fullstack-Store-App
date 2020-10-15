import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Ratings from "react-ratings-declarative";
import { getProducts } from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "2px 2px 5px black",
    },
  },
  gridLayout: {
    padding: 20,
    backgroundColor: '#ececea',
  },
}));

function Home() {
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const addCart = (data) => {
    const payload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: 1
    }
    console.log(payload);
    const currentCart = JSON.parse(window.localStorage.getItem('cart'));
    if(currentCart !== null){
      currentCart.push(payload);
      console.log(currentCart);
      window.localStorage.setItem('cart', JSON.stringify(currentCart));
    } else {
      let cartArray = [];
      cartArray.push(payload);
      console.log(cartArray);
      window.localStorage.setItem('cart', JSON.stringify(cartArray));
    }
  }

  const mapProducts = () => {
    return products.map((product) => {
      return (
        <Grid xs={3} item key={product._id} >
        
          <Card className={classes.root}>
          <IconButton onClick={e => addCart(product)} style={{backgroundColor: 'white', color: 'black', alignItems: "right", justifyContent: "right"}} >
          <AddShoppingCartIcon />
          </IconButton>
            <CardHeader
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              title={product.name}
              subtitle={product.brand}
            />
            <CardMedia
              style={{ height: 550, width: "100%", objectFit: "cover" }}
              image={product.image}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
            </CardContent>
            <CardContent>
              <p>
                <b>$ {product.price}</b>
              </p>
              <Ratings rating={product.rating} widgetRatedColors="#173f35">
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };
  return (
    <React.Fragment>
      
      <Typography variant="h2" >
               <u>Hot Sellers</u>
              </Typography>
      <Grid container justify="flex-start" spacing={10} className={classes.gridLayout}>
        {mapProducts()}
      </Grid>
    </React.Fragment>
  );
}

export default Home;
