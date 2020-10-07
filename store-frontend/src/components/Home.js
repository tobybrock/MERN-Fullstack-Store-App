import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import Ratings from "react-ratings-declarative";
import Banner from "./Banner";
import { getProducts } from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "2px 2px 5px black",
    },
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

  const mapProducts = () => {
    return products.map((product) => {
      console.log(product.image);
      return (
        <Grid xs={3} item key={product._id}>
          <Card className={classes.root}>
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
      <Banner />
      <h1>Home</h1>
      <Grid container justify="center" spacing={2}>
        {mapProducts()}
      </Grid>
    </React.Fragment>
  );
}

export default Home;
