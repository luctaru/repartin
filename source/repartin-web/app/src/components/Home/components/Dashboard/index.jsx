import React, { Component } from "react";
import View from "./View";
import { firebaseConnect } from "react-redux-firebase";

class Dashboard extends Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.props.setCollapse( true );
  }

  render() {
    console.log("dash", this.props);
    return (
      <View
        { ...this.props }
        { ...this.state }
      />
    );
  }
}

export default firebaseConnect()( Dashboard );