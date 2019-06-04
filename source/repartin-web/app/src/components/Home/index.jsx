import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from "redux";
import View from "./View";
import service from './../../services/service';

class Home extends Component {

  state = {
    isMember: false, // é de uma rep?
    collapse: false,
    pending: false,
    loading: true
  }

  constructor( props ) {
    super(props);
  }

  componentWillMount = async () => {
    const resp = await service.getById('user', this.props.firebase.auth().currentUser.uid);
    if (resp && resp.user) {
      const user = resp.user;
      if (user.houseID != null) {
        if (user.accepted) {
          this.setState({ isMember: true, loading: false })
        } else {
          this.setState({ isMember: true, pending: true, loading: false });
        }
      } else {
        this.setState( { loading: false } )
      }
    } else {
      this.setState( { loading: false } )
    }
    
  }

  setMember = ( isMemeber ) => {
    this.setState( {
      isMember: isMemeber
    } );
  }

  setPending = ( pending ) => {
    this.setState( {
      pending: pending
    } )
  }

  setCollapse = ( collapse )  => {
    this.setState( {
      collapse: collapse
    } );
  }

  render() {
    return (
      <View
        { ...this.props } 
        { ...this.state }
        setMember={ this.setMember }
        setCollapse={ this.setCollapse }
        setPending={ this.setPending }
      />
    );
  }
};

export default compose(
  withRouter,
  firebaseConnect()
)(Home);
