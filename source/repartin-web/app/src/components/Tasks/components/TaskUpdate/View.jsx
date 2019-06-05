import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import BackButton from "../../../Common/BackButton";
import styles from "../../../Common/Forms/styles";


const View = ( { aux, users, handleChange, handleSubmit, handleChangeUser, classes, state } ) => {
        
    ValidatorForm.addValidationRule('minLength', (value) => {
        if (value.length < 3) {
          return false;
        }
        return true;
      });

      var execDate, duDate;

      if(aux.task != undefined){

          execDate = new Date(aux.task.executionDate).toISOString().slice(0,10);

          duDate = new Date(aux.task.dueDate).toISOString().slice(0,10);
      }

      

    //   console.log("AUX", aux.task);
    //   if(state != undefined){
    //       console.log("state", state);
    //   }
      
    

    return (
        <ValidatorForm
            onSubmit={handleSubmit}
            onError={errors => console.error(errors)}
        >
            <Grid container spacing={24}>
                <Grid className={ classes.titleBlock } item xs={12}>
                    <BackButton to="/tarefas"/>
                    <Typography className={ classes.title } component="h1" variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                        Editar Tarefa
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {aux.task != undefined && (
                        <TextValidator
                        name='name'
                        label={'Nome: '+aux.task.name}
                        //value={aux.task.name}
                        onChange={handleChange}
                        errorMessages={['Campo obrigatório', 'O nome precisa ter mais que 3 caracteres']}
                        fullWidth
                    />
                    )}
                    
                </Grid>
                <Grid item xs={12}>
                {aux.task != undefined && (
                    <TextValidator
                        name='description'
                        label={'Descrição: ' + aux.task.description}
                        multiline
                        rows="2"
                        rowsMax="5"
                        //value={ aux.task.description }
                        onChange={handleChange}
                        fullWidth
                    />
                )}
                    
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                    <Typography color="primary" component="p" variant="body2">{'Data de realização: ' + duDate}</Typography>
                    {aux.task != undefined && (
                        
                        <TextValidator
                            className={classes.textField}
                            
                            name='dueDate'
                            type='date'
                            //value={ duDate }
                            onChange={handleChange}
                            fullWidth
                        />
                    )}
                        
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                    <Typography color="primary" component="p" variant="body2">{'Vencimento: ' + duDate}</Typography>
                    {aux.task != undefined && (
                        <TextValidator
                            className={classes.textField}
                            //label={'Vencimento: ' + execDate}
                            name='executionDate'
                            type='date'
                            //value={execDate}
                            onChange={handleChange}
                            fullWidth
                        />
                    )}
                        
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                <Typography color="primary" component="p" variant="body2">{'Usuário'}</Typography>
                {aux.task != undefined && (
                    <Select
                        className={classes.textField}
                        //label={'Usuário'}
                        name='assignedUserID'
                        multiple
                        disabled
                        value={ aux.task.assignedUserID }
                        value={aux.task.assignedUserID}
                        //onChange={handleChange}
                        input={<Input id="select-multiple" />}
                        fullWidth
                    >
                        {
                            users && users.map(u => {
                                return (
                                    <MenuItem key={u.uid} value={u.uid}>
                                        {u.name}
                                    </MenuItem>
                                )
                            })}
                    </Select>
                )}
                    
                </Grid>
            </Grid>
            <div className={ classes.submit }>
                <Button variant="contained" type="submit" color="primary" className={classes.button}>
                    Salvar
                </Button>
            </div>
        </ValidatorForm>
    )
}
export default withStyles(styles)(View);
