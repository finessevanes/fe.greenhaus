import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const LinkEdit = React.forwardRef((props,ref) => <RouterLink innerRef={ref} {...props} />);

const ShowTip=(props)=>{
  const [tip, setTip] = React.useState({});

  const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  React.useEffect(()=>{
    const id = props.match.params.id;
    fetch("http://localhost:8080/tip/"+id)
      .then((res)=>res.json())
      .then((response)=>{
          setTip(response);
      })
  }, [])

  const deleteTip=(id)=>{
    fetch("http://localhost:8080/tip/"+id, {
      method:'delete'
    }).then(()=>{
      props.fetchTips();
      props.history.push('/tips');
    })
  }
  return(
    <div className="cardContainer">
      <div className="card">
        <div>Date: <Moment format="MMM D, YYYY" withTitle>{tip.date}</Moment></div>
        <div>Tip Amount: ${tip.tipAmount}</div>
        <div>Savings Rate: {tip.savingsRate*100}%</div>
        <div>Amount Saved: ${tip.amountSaved}</div>
      <Fab label="Details" component={LinkEdit} to={"/edit/tip/" + tip.id} color="secondary" aria-label="edit" className={classes.fab}>
        <EditIcon />
      </Fab>
      <Fab aria-label="delete" className={classes.fab} onClick={()=>deleteTip(tip.id)}>
        <DeleteIcon />
      </Fab>
      </div>
    </div>
  )
}

export default ShowTip
