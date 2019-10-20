import React from 'react'
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ShowTips=(props)=>{
  const classes = useStyles();
  let tipsElem = props.tips.map((tip)=>{
    return(
      <div key="tip.id" className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Link to={"/tip/" + tip.id} key={tip.id}>
              <div>
                <div>Date: <Moment format="MMM D, YYYY" withTitle>{tip.date}</Moment></div>
                <div>Tip Amount: {tip.tipAmount}</div>
                <div>Savings Rate: {tip.savingsRate*100}%</div>
                <div>Amount Saved: {tip.amountSaved}</div>
              </div>
            </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  })
  return(
    <div>
      <h1>Show Tips</h1>
      {tipsElem}
    </div>
  )
}

export default ShowTips
