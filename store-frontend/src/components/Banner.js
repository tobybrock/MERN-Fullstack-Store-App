import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import "fontsource-sonsie-one";

const styles = () => ({
    root: {
    backgroundImage: 'url("https://i1.wp.com/linkedinpro.co/wp-content/uploads/2018/08/LinkedIn-Background-Image-15-books.png?w=1584&ssl=1")',
    border: 0,
    boxShadow: '0 3px 5px 2px #d0d2ce',
    color: 'white',
    height: 200,
    width: '100%',
    fontFamily: 'Sonsie+One',
    backgroundColor: '#ececea',
    },
  });

function Banner(props) {
    const { classes } = props;

    return(
<React.Fragment>
<Box mt={-3}className={classes.root} >
<Typography variant="h1">
<b><em>-- Barnies Books --</em></b>
</Typography>

    
</Box>
</React.Fragment>
    )
}

export default withStyles(styles)(Banner)