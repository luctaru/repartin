import React from "react";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import FilterNoneIcon from "@material-ui/icons/FilterNone"
import styles from "./styles";

const View = ( { house, admin, editHouse, copyId, classes } ) => {

  return (
    <div className={ classes.root }>
      <Typography className={ classes.name } component="p" variant="h6">
        { house.name }
        { admin ? (
            <Button className={ classes.editButton } onClick={ editHouse }>
              <EditIcon className={ classes.editButtonIcon }/>
            </Button>
          ) : '' 
        }
      </Typography>
      <Button onClick={ copyId( house.id ) } className={ classes.id }>
        <Typography className={ classes.id } component="p" variant="body2">
          República: { house.name }
          <FilterNoneIcon className={ classes.copyIcon }/>
        </Typography>
      </Button>
      <Typography className={ classes.address } component="p" variant="body1">{ house.address }</Typography>
      
    </div>
  );
}

export default withStyles( styles )( View );