import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import View from "./View";
import { compose } from "redux";

class CardTasks extends Component {

  constructor( props ) {
    super( props );
    this.openTasks = this.openTasks.bind( this );
  }

  openTasks( event ) {
    this.props.history.push( "/tarefas" );
  }

  render() {
    console.log("OPEN",this.props);
    return (
      <View
      openTasks = {this.openTasks} />
    );
  }
}

export default compose( 
  withRouter
)( CardTasks );