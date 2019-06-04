import React, { Component } from 'react'
import View from './View'
import service from "../../../../services/service";
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

class TaskUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: [],
            users: []
        }
    }

    handleChange = (e) => {
        // const { name, value } = e.target;
        // let task = this.state.task;
        // task[name] = value;
        // this.setState({ task })
        var task = this.state.task;
        if(e == "") {

        }
        
        task.task.name = e;
        this.setState({task});

    }

    componentWillMount = async() => {
        
        this.loadUsers();

        console.log('Componentebefore');
        console.log(this.state.task);

        const task = await service.getById('task', this.props.match.params.id);
        this.setState({task});
        
        console.log('Componenteafter');
        console.log(this.state.task);
    }

    handleSubmit = async (e) => {
        const useId = this.props.firebase.auth().currentUser.uid
        const { user } = await service.getById('user', useId)

        console.log("AQUIIII");
        console.log(this.props.match.params.id);

        var form = this.state.task
        form.useId = useId
        form.houseID = user.houseID
        
        await service.update('task', this.props.match.params.id, form)
        this.props.history.push('/tarefas')

    }

    //verifica a existência de uma task antes de renderizar
    getTask = async () => {
        // if (this.props.idTask != undefined) {
        //     this.state.task = await service.getById('task', props.idTask)
        // }
        const task = await service.getById('task', this.props.match.params.id);
        this.setState({task});
    }

    //buscar por todos usuários da casa
    loadUsers = async (e) => {
        const useId = this.props.firebase.auth().currentUser.uid;
        const { user } = await service.getById('user', useId);

        let { users } = await service.getById('house/members', user.houseID);
        this.setState({ users });
    }

    render() {
        console.log("render");
        console.log(this.state.task);
        return (
            <View 
                { ...this.state }
                { ...this.props }
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                aux={ this.state.task } 
            />
        )
    }
};

export default compose(
    withRouter,
    firebaseConnect()
)(TaskUpdate);
