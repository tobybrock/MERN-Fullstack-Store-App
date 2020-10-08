import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Button, Typography, TextField, Grid, FormGroup, FormControl,} from '@material-ui/core';
import { postProduct } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    step: {
            color: "#173f35"
    }
  }));
  
  function getSteps() {
    return ['step1', 'Create an ad group', 'Create an ad'];
  }

   
  export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const steps = getSteps();
    const [activeStep, setActiveStep] = React.useState(0);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    function getStepContent(step) {
        switch (step) {
          case 0:
            return <>
            <Grid
              container
              direction="row"
              spacing={3}
              alignItems="center"
              justify="center"
            >
                 <Grid item xs={8}>
                 <FormControl>
                 <FormGroup>
                 <TextField
                    className="outlined-basic"
                    label="name"
                    name="name"
                    onChange={(e) => setName(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    className="outlined-basic"
                    label="image"
                    name="image"
                    onChange={(e) => setImage(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    className="outlined-basic"
                    label="brand"
                    name="brand"
                    onChange={(e) => setBrand(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                    </FormGroup>
                </FormControl> 
                 </Grid>
                </Grid>
                </>
          case 1:
            return <>
            <Grid
              container
              direction="row"
              spacing={3}
              alignItems="center"
              justify="center"
            >
                 <Grid item xs={8}>
                 <FormControl>
                 <FormGroup>
                 <TextField
                    className="outlined-basic"
                    label="price"
                    name="price"
                    onChange={(e) => setPrice(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    className="outlined-basic"
                    label="category"
                    name="category"
                    onChange={(e) => setCategory(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    className="outlined-basic"
                    label="countInStock"
                    name="countInStock"
                    onChange={(e) => setCountInStock(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                  <TextField
                    className="outlined-basic"
                    label="rating"
                    name="rating"
                    onChange={(e) => setRating(e.currentTarget.value)}
                    variant="outlined"
                  />
                  <br />
                    </FormGroup>
                </FormControl> 
                 </Grid>
                </Grid>
                </>
          case 2:
            return  <>
            <Grid
            container
            direction="row"
            spacing={3}
            alignItems="center"
            justify="center"
          >
               <Grid item xs={8}>
               <FormControl>
               <FormGroup>
               <TextField
                  className="outlined-basic"
                  label="description"
                  name="description"
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  variant="outlined"
                />
                </FormGroup>
                </FormControl>
                </Grid>
                </Grid>
                </>

          default:
            return 'Unknown step';
        }
      }
      
    const handleNext = () => {
         setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
      
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconProps={{
                    classes: { 
                    root: classes.step,
                    completed: classes.completed,
                    active: classes.active,
                    disabled: classes.disabled
                }
                  }}
                  {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography component={'span'} className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
            </div>
          ) : (
            <div>
              <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
                </Button>
                  
                <Button
                  variant="contained"
                  style={{backgroundColor: '#173f35', color: 'white'}}
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }