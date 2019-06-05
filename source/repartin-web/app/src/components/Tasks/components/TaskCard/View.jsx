import React from "react"
import { CardContent, Typography, IconButton, CardActions, Card, Button } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import PersonIcon from "@material-ui/icons/Person"
import styles from "./styles"
import { Link } from "react-router-dom"

const View = ( { classes, task, names, deleteTask } ) => {
  return (
    <Card className={ classes.root } raised={true}>
      <CardContent className={classes.content}>
      {!task.removed && new Date(task.executionDate).toISOString().slice(0,10) > new Date().toISOString().slice(0,10) && (
        <Typography color="secondary" className={ classes.status } component="p" variant="caption">Aguardando</Typography>
      )}
      {task.removed && (
        <Typography color="secondary" className="statusConcluded" component="p" variant="caption">Concluído</Typography>
      )}
      {!task.removed && new Date(task.executionDate).toISOString().slice(0,10) < new Date().toISOString().slice(0,10) && (
        <Typography color="secondary" className="statusConcluded" component="p" variant="caption">Atrasado</Typography>
      )}
        <Typography color="secondary" component="p" variant="h6">{task.name}</Typography>
        <Typography color="secondary" component="p" variant="body2">{task.description}</Typography>
        <Typography color="secondary" className={ classes.user } component="p" variant="body2">
          <PersonIcon className={ classes.userIcon }/> 
          {names}
        </Typography>
      </CardContent>
      <CardActions className={ classes.actions }>
        <Button className={ classes.finish } onClick={ async() => 
          { 
            var x = await deleteTask.getById('task', task._id);
            x.task.removed = true;
            await deleteTask.update('task', task._id, x.task);
            window.location.reload();
           
          }} disabled={task.removed}>
        Concluir</Button>
        <div>
        {!task.removed && (
          <IconButton className={ classes.edit } component={ Link } to={`tarefas/editar/${task._id}`}>
            <EditIcon/>
          </IconButton>
        )}
        {!task.removed && (
          <IconButton className={ classes.delete } onClick={ async() => { await deleteTask.delete('task', task._id); window.location.reload();} }>
            <DeleteIcon/>
          </IconButton>
        )}
          
        </div>
      </CardActions>
    </Card>
  )
}

export default withStyles( styles )( View )