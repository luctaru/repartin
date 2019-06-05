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
        const { name, value } = e.target;
        let task = this.state.task;
        task[name] = value;
        this.setState({ task })
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

        console.log(e);
        console.log(this.state.task.task);
        console.log(e.target[0].value);
        console.log(e.target[3].value);
        console.log(e.target[4].value);
        console.log(e.target[5].value);
        console.log(e.target[6].value);

        var form = this.state.task.task;

        form.name = e.target[0].value;
        form.description = e.target[3].value;
        form.dueDate = new Date(e.target[4].value).toISOString();
        form.executionDate = new Date(e.target[5].value).toISOString();

        console.log(form);

        // const useId = this.props.firebase.auth().currentUser.uid
        // const { user } = await service.getById('user', useId)

        // console.log("AQUIIII");
        // console.log(this.props.match.params.id);

        // var form = this.state.task
        // form.useId = useId
        // form.houseID = user.houseID
        
        await service.update('task', this.props.match.params.id, form);
        this.props.history.push('/tarefas');

        // var x = await deleteTask.getById('task', task._id);
        //     x.task.removed = true;
        //     await deleteTask.update('task', task._id, x.task);
        //     window.location.reload();

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
