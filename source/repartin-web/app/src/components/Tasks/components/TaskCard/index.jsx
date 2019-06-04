import React, { Component } from "react";
import service from "../../../../services/service";
import View from "./View";
class ListCard extends Component {

  constructor(props){
    super(props)
    this.state ={
      names:''
    }
  }
  // getUsersNames = async () => {
  //     return this.props.task.assignedUserId != undefined && this.props.task.assignedUserId.map(async (user) => { // <-- note the `async` on this line
  //       return {
  //           id: "my_id",
  //           user: await service.getById('user', user)
  //       }
  //   });
  // }

  componentWillMount(){
    this.loadUsers()
  }

  loadUsers = async () => {
    const userId = this.props.task.assignedUserID
    var names = '';
    if (userId != undefined) {
      for (let i = 0; i < userId.length; i++) {
        var { user } = await service.getById('user', userId[i])
        names += ` ${user.name}`
        if(i+1 != userId.length)
          names+=','
      }
    }
    this.setState({names})
    // debugger;
    // var names;
    // if(userId != undefined){
    //   // userId.map(u =>{
    //   //   debugger;
    //   //   names += `${name}, `
    //   // })
    // }
    
  }

  handleDelete = async (e) => {
      await service.delete('task', this.props.task._id).then(
        alert('Tarefa deletada com sucesso')
      )
  }


  render() {
    // var a = this.getUsersNames();
    console.log(this.props);
    return (
      <View task={this.props.task}
        names={this.state.names} 
          deleteTask={service}
        />
    );
  }
}

export default ListCard;