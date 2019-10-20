import React from 'react'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';



const TipForm=(props)=>{
  const ranges = [
    {
      value: '.15',
      label: '15%',
    },
    {
      value: '.2',
      label: '20%',
    },
    {
      value: '.25',
      label: '25%',
    },
  ];

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(2),
    },
    // textField: {
    //   flexBasis: 200,
    // },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
// },

  }));

  const classes = useStyles();

  const [id, setId] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [tipAmount, setTipAmount] = React.useState("");
  const [savingsRate, setSavingsRate] = React.useState("");
  const [amountSaved, setAmountSaved] = React.useState("");

  const onIdInput=(e)=>{
    setId(e.target.value);
  }
  const onDateInput=(date)=>{
    setDate(date);
  }
  const onTipAmountInput=(e)=>{
    setTipAmount(e.target.value);
  }
  const onSavingsRateInput=(e)=>{
    setSavingsRate(e.target.value);
  }
  const onAmountSavedInput=(e)=>{
    setAmountSaved(e.target.value);
  }

  const handleCreateTip=()=>{
    fetch("http://localhost:8080/tip",{
      method:'post',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        date:date,
        tipAmount:tipAmount,
        savingsRate:savingsRate,
        amountSaved:amountSaved
      })
    }).then(()=>{
       props.fetchTips();
       setDate("");
       setTipAmount("");
       setSavingsRate("");
       setAmountSaved("")
       props.history.push('/tips')
    })
  }

  const handleUpdateTip=()=>{
    fetch("http://localhost:8080/tip/" + id,{
      method:'put',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        date: date,
        tipAmount: tipAmount,
        savingsRate: savingsRate,
        amountSaved: amountSaved
      })
    }).then(()=>{
       props.fetchTips();
       setId(0);
       setDate("");
       setTipAmount("");
       setSavingsRate("");
       setAmountSaved("");
       props.history.push('/tips')
    })
  }
  React.useEffect(()=>{
    let id = props.match ? props.match.params.id :0
    setId(id);
  },[])
  let buttonAction;
  if (id){
    buttonAction =     <Fab aria-label="save" className={classes.fab} onClick={handleUpdateTip}>
          <SaveIcon />
        </Fab>
  } else {
    buttonAction = <Fab aria-label="save" className={classes.fab} onClick={handleCreateTip}>
          <SaveIcon />
        </Fab>

  }
  return(
    <div>
    <Grid container justify="center" alignItems="center" spacing={1}>
      <form className={classes.container} noValidate autoComplete="off">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  format="MM/dd/yyyy"
                  value={date}
                  onChange={onDateInput}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>
            <TextField
              id="outlined-adornment-"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              label="Tip Amount"
              value={tipAmount}
              onChange={onTipAmountInput}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              select
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              label="Savings Rate"
              value={savingsRate}
              onChange={onSavingsRateInput}
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
            >
              {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              error
              id="outlined-adornment-amount"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              label="Amount to Save"

              InputProps={{
                startAdornment: <InputAdornment position="start">${Math.ceil(tipAmount*savingsRate)}</InputAdornment>,
              }}
            />
            <TextField
              id="outlined-adornment-amount"
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              label="Actual Amount Saved"
              value={amountSaved}
              onChange={onAmountSavedInput}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          {buttonAction}
    </form>
    </Grid>
  </div>
  )
}
export default TipForm
