import React, { Component } from "react";
import View from "./View";
import service from "../../services/service";
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';
import { async } from "q";

class Tasks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      card: {
        blocks: [{
          label: "SUAS TAREFAS",
          value: ""
        }, {
          label: "ATRASADAS",
          value: ""
        }],
        quickTip: "Quick Tip"
      },
      original:[]
    }
    this.handleQuickTip = this.handleQuickTip.bind(this);
  }

  componentWillMount = () => {
    this.loadTasks()
    this.myTasks()
  }

  handleSearch = async(value) => {

    let searchFilter = value;
    searchFilter = searchFilter.replace(new RegExp('(ã|á|à|Ã|À|Á)', 'gi'), 'a');
    searchFilter = searchFilter.replace(new RegExp('(é|è|É|È)', 'gi'), 'e');
    searchFilter = searchFilter.replace(new RegExp('(í|ì|Í|Ì)', 'gi'), 'i');
    searchFilter = searchFilter.replace(new RegExp('(ó|ò|õ|Ò|Ó|Õ)', 'gi'), 'o');
    searchFilter = searchFilter.replace(new RegExp('(ú|ù|Ú|Ù)', 'gi'), 'u');
    searchFilter = searchFilter.replace(new RegExp('(ç|Ç)', 'gi'), 'c');
    const patern = `^${searchFilter}`;

    console.log("state");
    console.log(this.state);

    let x;
    let original;

    if(this.state.original.length == 0){
      original = this.state.tasks.task;
      this.setState({original});
    }

    if(this.state.tasks.task) {
      x = this.state.tasks.task;
    } else {
      x = this.state.tasks;
    }

    let tasks = x.filter(c => new RegExp(patern, 'gi').test(c.name));

    if(value == "" || value == null){
      tasks = this.state.original;
    }

    this.setState({ tasks });

    console.log("tasks");
    console.log(tasks);
    console.log("statetasks");
    console.log(this.state.tasks);

  }

  handleFilter(value) {
    console.log( value );
  }



  handleQuickTip() {
    const card = { ...this.state.card };
    card.quickTip = "New Quick Tip";
    this.setState({ card });
  }

  loadTasks = async () => {
    const { user } = await service.getById('user', this.props.firebase.auth().currentUser.uid);
    let tasks = await service.getByHouse('task', user.houseID);
    this.setState({ tasks })
    console.log("LOAD");
    console.log(this.state);
  }

  myTasks = async () => {
    var currentUser = this.props.firebase.auth().currentUser.uid
    const { user } = await service.getById('user', currentUser)
    let tasks = await service.getByHouse('task', user.houseID)
    var myDelayedTasks = []
    var myTasks = []
    if (tasks != undefined) {

      var myTasks = tasks.task.reduce(function (filtered, task) {
        for (let i = 0; i < task.assignedUserID.length; i++) {
          if (task.assignedUserID[i] == currentUser) {
            filtered.push(task)
          }
        }
        return filtered
      }, [])

      

      myDelayedTasks = tasks.task.reduce(function (filtered, task) {

        for (let i = 0; i < task.assignedUserID.length; i++) {

          if (task.assignedUserID[i] == currentUser && new Date(task.executionDate).toISOString().slice(0,10) < new Date().toISOString().slice(0,10) && task.removed == false) {
            filtered.push(task)
          }
        }
        return filtered
      }, [])

      var card = this.state.card

      card.blocks[0].value = myTasks.length
      card.blocks[1].value = myDelayedTasks.length
      this.setState({ card })
    }
  }

  filterTasks = () => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(t => {
      return t.assignedUserID == this.props.firebase.auth().currentUser.uid
    })
    this.setState({ tasks })
  }

  render() {

    return (
      <View
        {...this.state}
        handleSearch={this.handleSearch}
        handleFilter={this.handleFilter}
        handleQuickTip={this.handleQuickTip}
        tasks={this.state.tasks}
      />
    );
  }
}

export default compose(
  withRouter,
  firebaseConnect()
)(Tasks);
