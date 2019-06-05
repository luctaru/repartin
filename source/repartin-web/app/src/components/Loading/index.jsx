import React from "react";
import { ClipLoader } from 'react-spinners';
import styles from "./styles";
import { withStyles } from "@material-ui/core";

const View = ( { classes, loading } ) => (
  <div className={ classes.root }>
    <ClipLoader
      className={ classes.loader }
      sizeUnit={ "px" }
      size={ 130 }
      color={ '#ffffff' }
      loading={ loading }
    />
  </div>
);

export default withStyles( styles )( View );