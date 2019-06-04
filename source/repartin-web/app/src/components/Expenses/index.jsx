import React, { Component } from "react";
import View from "./View";
import service from "../../services/service";
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

class Expenses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expenses:[],
      card: {
        blocks: [ {
          label: "GASTO",
          value: ""
        }, {
          label: "PAGO",
          value: ""
        } ],
        quickTip: "Quick Tip"
      }
    }

  }

  handleSearch = ( value ) => {
    // console.log( value );
  }

  handleFilter = ( value ) => {
    // console.log( value );
  }

  handleQuickTip = () => {
    const card = { ...this.state.card };
    card.quickTip = "New Quick Tip";
    this.setState( { card } );
  }

  componentWillMount = () =>{
    this.loadExpenses()
    this.myExpenses()
  }

  loadExpenses = async()=> {
    const user = await service.getById('user', this.props.firebase.auth().currentUser.uid);
    let expenses = await service.getByHouse('expense', user.houseID); 
    // debugger;
    this.setState({expenses})
  }

  myExpenses = async () => {
    var currentUser = this.props.firebase.auth().currentUser.uid
    const { user } = await service.getById('user', currentUser)
    let expenses = await service.getByHouse('expense', user.houseID)
    var spentValue = 0
    if (expenses != undefined) {
      for(let i = 0; i < expenses.expense.length; i++){
        // debugger
        spentValue += parseInt(expenses.expense[i].value.$numberDecimal)
      }

      var card = this.state.card
      card.blocks[0].value = spentValue
      // debugger;
      this.setState({ card })
    }
  }

  sumValues = (total, num) => {
    return total+num
  }

  // filterExpenses = () => {
  //   let expenses = [...this.state.expenses];
  //   expenses = expenses.filter(t => {
  //     return t.assignedUserID == this.props.firebase.auth().currentUser.uid
  //   })
  //   this.setState({expenses})
  // }

  render() {

    return (
      <View
        { ...this.state }
        expenses={ this.state.expenses }
        handleSearch={ this.handleSearch }
        handleFilter={ this.handleFilter }
        handleQuickTip={ this.handleQuickTip }
      />
    );
  }
}

export default compose(
  withRouter,
  firebaseConnect()
)(Expenses);
