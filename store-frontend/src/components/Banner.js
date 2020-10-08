import React from 'react';
import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    root: {
    background: "#d0d2ce",
    backgroundImage: 'url("https://i1.wp.com/linkedinpro.co/wp-content/uploads/2018/08/LinkedIn-Background-Image-15-books.png?w=1584&ssl=1")',
    border: 0,
    boxShadow: '0 3px 5px 2px #d0d2ce',
    color: '#173f35',
    height: 200,
    width: '100%',
    },
  });

function Banner(props) {
    const { classes } = props;

    return(
<React.Fragment>
<Box mt={-3}className={classes.root} >
    
<h1> Banner</h1>
    
</Box>
</React.Fragment>
    )
}

export default withStyles(styles)(Banner)