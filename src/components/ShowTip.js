import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const LinkEdit = React.forwardRef((props,ref) => <RouterLink innerRef={ref} {...props} />);

const ShowTip=(props)=>{
  const [tip, setTip] = React.useState({});

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
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
    <div className="tipContainer">
      <div className="tipCard">
        <h2 className="tipText dateText"><Moment format="MMM D, YYYY" withTitle>{tip.date}</Moment></h2>
        <div className="tipText tipAmountText"><strong>Tip Amount:</strong> ${tip.tipAmount}</div>
        <div className="tipText savingsRateText"><strong>Savings Rate:</strong> {tip.savingsRate*100}%</div>
        <div className="tipText amountSavedText"><strong>Amount Saved:</strong> ${tip.amountSaved}</div>

        <Button
          component={LinkEdit}
          to={"/edit/tip/" + tip.id}
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={()=>deleteTip(tip.id)}
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default ShowTip
