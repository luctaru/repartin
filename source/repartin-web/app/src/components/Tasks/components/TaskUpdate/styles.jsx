import { createStyles } from "@material-ui/core/";

export default (theme) => {

  return createStyles({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
      marginLeft: 10
    },
    input: {
      display: 'none',
    },
    card: {
      minWidth: 275,
      width: '80vh',
      maxHeight: '60vh',
      overflow: 'auto',
      margin: 'auto',
      position: 'absolute',
      top: 0,
      left: 0, bottom: 0, right: 0
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    rightIcon: {
      marginLeft: 10
    },
    sweetLoading: {
      position: 'absolute',
      top: '40%',
      left: '40%', bottom: 0, right: 0,
      margin: '0 auto',
      borderColor: 'red',
    }
  });
}