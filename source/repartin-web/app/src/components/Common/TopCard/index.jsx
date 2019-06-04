import React, { Component } from "react";
import View from "./View";

class TopCard extends Component {

  render() {
    return (
      <View 
        { ...this.props }
        { ...this.state }
      />
    );
  }
}

export default TopCard;