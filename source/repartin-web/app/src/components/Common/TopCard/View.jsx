import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, CardContent, Card, Grid } from "@material-ui/core";
import styles from "./styles";

const View = ( { card, handleQuickTip, classes, tasks } ) => {
  return (
    <Card raised className={ classes.root }>
      <CardContent>
        <Grid container spacing={ 0 }>
        
          { 
            card.blocks.map( ( block, key ) => (
              <Grid item key={ key } xs={ 6 }>
                <Typography className={ classes.cardBlockTitle } align="center" component="p" variant="body1">{ block.label }</Typography>
                <Typography align="center" component="p" variant="h4">{ block.value }</Typography>
              </Grid>
              
              ) 
            )
          }
          <Grid className={ classes.quickTipWrapper } item xs={ 12 }>
            <Typography 
              onClick={ handleQuickTip } 
              className={ classes.quickTip } 
              component="p" 
              variant="body2" 
              align="center"
            >
              { card.quickTip }
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withStyles( styles )( View );