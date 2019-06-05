import { createStyles } from "@material-ui/core/";

export default ( theme ) => {

    return createStyles( {
      root: {
        height: "100vh"
      },
      body:{
        minWidth: "800px",
        margin: "0px"
      },
      wrapper: {
        paddingTop: ".4rem"
      },
      addButton: {
        position: "fixed",
        bottom: theme.spacing.unit * 9,
        right: theme.spacing.unit * 2,
      }
    } );
}
