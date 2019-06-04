import React, { Component } from "react";
import View from "./View";
import service from "../../../../../../services/service";
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

class CreateHouse extends Component {

  state = {
    house: {
      name: '',
      address: '',
      creation: new Date(),
      color: '#fff',
      removed: false,
      cep: '',
      city: '',
      state: ''
    },
    file: '',
    loading: false,
    dialog: {
      open: false,
      title: '',
      message: ''
    }
  };

  componentWillMount = async () => {

    let user = await service.getById('user', this.props.firebase.auth().currentUser.uid)
    if (user.houseID !== undefined) {
      this.props.history.push('/');
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let house = this.state.house;
    house[name] = value;
    this.setState({ house })
  }

  handleChangeComplete = (color) => {
    let house = this.state.house;
    house.color = color.hex;
    localStorage.setItem("tema", color.hex);
    this.setState({ house });
  };

  /*
  * Só é possível cadastrar uma house para o usuario que tenha houseID null
  *
  */
  handleSubmit = async (e) => {

    this.setState({ loading: true })
    let scope = this;
   
    const form = this.state.house;
    form.adminID = this.props.firebase.auth().currentUser.uid;
    let house = await service.create('house', form);
    
    if (this.state.file !== '') {

      if (house !== undefined) {
        let uploadTask = this.props.firebase.storage().ref().child(this.props.firebase.auth().currentUser.uid).put(this.state.file);
        await uploadTask.on('state_changed', async function (snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, function (error) {
          console.error(error)
        }, async function () {
          uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
            house.house.image = downloadURL;
            await service.update('house', house.house._id, house.house);
            scope.props.setMember( true );
            scope.props.history.push("/");

          }).catch(err => {
            scope.setState({ loading: false })
          });
        });
      } else {
        this.loadDialog('Erro ao cadastrar república', 'Por favor, verifique todas informações do formulário!');
        this.setState({ loading: false })
      }
    } else {
      //this.loadDialog('Ops! Falta uma foto', 'Por favor, suba uma imagem para representar sua república!');
      this.setState({ loading: false })
    }
  }


  handleUpload = (e) => {
    let file = e.target.files[0];
    this.setState({ file })
  }

  searchCep = async (e) => {
    const { value } = e.target;

    if( value.length > 0 ) {
      this.setState({ loading: true })

      let address = await service.getAddress(value);
      
      if (address !== undefined && address.erro == undefined) {
        const house = this.state.house;
        house.city = address.localidade;
        house.state = address.uf;
        house.address = `${address.logradouro} - ${address.bairro}`;

        this.setState({ loading: true, house })
      } else {
        this.loadDialog('Erro ao buscar CEP', 'O CEP digitado não existe ou está incorreto!');
      }

      this.setState({ loading: false });
    }
  }

  closeDialog = () => {
    const dialog = this.state.dialog;
    dialog.open = false;
    this.setState({ dialog });
  }

  loadDialog = (title, message) => {
    const dialog = this.state.dialog;
    dialog.open = true;
    dialog.message = message;
    dialog.title = title;
    this.setState({ dialog });
  }

  render() {

    return (
      <View handleChange={this.handleChange} searchCep={this.searchCep}
        handleSubmit={this.handleSubmit} handleChangeComplete={this.handleChangeComplete} 
        handleUpload={this.handleUpload} loading={this.state.loading} 
        house={this.state.house} dialog={this.state.dialog} closeDialog={this.closeDialog} />
    );
  }
}


export default compose(
  withRouter,
  firebaseConnect()
)(CreateHouse);

