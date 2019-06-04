
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core";
import PrivacyPolicy from "../PrivacyPolice";
import TermsOfService from "../TermsOfService";
import FrontPage from "../FrontPage";
import styles from "./style";

const tema = localStorage.getItem('tema');

const theme = createMuiTheme( {
  palette: {
    type: "dark",
    background: {
      default: tema
    },
    primary: {
      main: "#cccccc"
    },
    secondary: {
      main: "#333333"
    },
    text: {
      primary: "#cccccc",
      secondary: "#ffffff"
    }
  },
  typography: {
    useNextVariants: true
  }
} );

const View = ( { store, classes } ) => {

  return (
    <Provider store={ store }>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline>
          <Router>
            <main className={ classes.root }>
              <Switch>
                <Route path="/termos-de-uso" component={ TermsOfService }/>
                <Route path="/politica-de-privacidade" component={ PrivacyPolicy }/>
                <Route path="/" component={ FrontPage }/>
              </Switch>
            </main>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </Provider>
  );
};

export default withStyles( styles )( View );
