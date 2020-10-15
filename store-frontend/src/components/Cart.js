import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  cardItems: {
    width: "100%",
  },
  gridLayout: {
    paddingBottom: 20
  }
}));



//store cart in local storage in arry which is stringified (have to unstring when accessing it)
function Cart() {
const classes = useStyles();
let [cartArray, setCartArray] = useState(JSON.parse(window.localStorage.getItem("cart")));

  const removeCart = (data) => {
    console.log(data);
    let currentCart = cartArray
    for(let i = 0; i < currentCart.length; i++){
      if(data.product === currentCart[i].product){
        currentCart.splice(i, 1);
        
      }
    }
    window.localStorage.setItem('cart', JSON.stringify(currentCart));
    setCartArray(JSON.parse(window.localStorage.getItem("cart")));
  }

  const minusQty = (data) => {
    let currentCart = cartArray
    if(data.qty >1){
    data.qty -=1;
  }
    window.localStorage.setItem('cart', JSON.stringify(currentCart));
    setCartArray(JSON.parse(window.localStorage.getItem("cart")));
  }

  const addQty = (data) => {
    let currentCart = cartArray

    
    if(data.qty < data.countInStock){
    
    data.qty +=1;
  }

    window.localStorage.setItem('cart', JSON.stringify(currentCart));
    setCartArray(JSON.parse(window.localStorage.getItem("cart")));
  }

  const total = () => {
    let total = 0;
    
    cartArray.forEach(element => {
      total += element.price * element.qty
    });
    console.log(total);
    return total
  }

  const cartArrayMap = () => {
    return cartArray.map((cartItem) => {
      return (

        <Grid container  
        justify="space-between"
        alignItems="flex-start"
        direction="row" 
        xs={8} 
        item 
        key={cartItem.product}>

          <Grid container direction="column" className={classes.gridLayout}>
          <Card className={classes.cardItems}>
            <Grid container justify="flex-end">
          <Button style={{backgroundColor: 'crimson', color: 'white', }} onClick={e => removeCart(cartItem)}>X</Button>
          </Grid>
            
                <h1>{cartItem.name}</h1>
            
            <CardMedia
              style={{ height: 550, width: "100%", objectFit: "cover" }}
              image={cartItem.image}
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                $ {cartItem.price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Count left in stock: {cartItem.countInStock}
              </Typography>
            </CardContent>
            <CardContent style={{ whiteSpace: "nowrap"}}>
            <Button style={{backgroundColor: '#173f35', color: 'white', display: "inline-block"}} onClick={e => minusQty(cartItem)}>-</Button>
            <Box color="black" bgcolor="grey" p={1} style={{ display: "inline-block"}}>
             Quantity: {cartItem.qty}
            </Box>
            <Button style={{backgroundColor: '#173f35', color: 'white', display: "inline-block"}} onClick={e => addQty(cartItem)}>+</Button>
            </CardContent>
          </Card>
          </Grid>
          <br />
        </Grid>
      );
    });
  };

  const isEmpty = () => {
    if(cartArray === null){
      return <Typography variant="h3">
        Shopping Cart Empty
      </Typography>
    }else if(cartArray.length !== 0){
      return (
      <>
      <Typography variant="h1" align="left">
      Your Shopping Cart
    </Typography>
      <Grid container justify="flex-end">
      <Card>
      <Typography variant="h3" align="left">
      Your Total: $ {total()}
    </Typography>
    <br />
    <Button style={{backgroundColor: '#173f35', color: 'white', display: "inline-block"}} component={Link}
                to={"/shipping"}>Pay Now</Button>
      </Card>
      </Grid>
      {cartArrayMap()}
      </>
      )
    }
  }

  return (
    <>
          {isEmpty()} 
    </>
  );
}

export default Cart;
