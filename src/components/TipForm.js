import React from 'react'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



const TipForm=(props)=>{
  const [id, setId] = React.useState(0);
  const [date, setDate] = React.useState(new Date('2014-08-18T21:11:54'));
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
    buttonAction = <button onClick={handleUpdateTip}>Update Tip</button>
  } else {
    buttonAction = <button onClick={handleCreateTip}>Add Tip</button>
  }
  return(
    <div>
      <h1>This is my formpage page</h1>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={date}
            onChange={onDateInput}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          </Grid>
      </MuiPickersUtilsProvider>

      <input type="number" value={tipAmount} onChange={onTipAmountInput} placeholder="Tip Amount"></input>
      <select type="number" value={savingsRate} onChange={onSavingsRateInput}>
        <option>Savings Rate%</option>
        <option value=".15">15%</option>
        <option value=".20">20%</option>
        <option value=".25">25%</option>
      </select>
      <div>
        <p>Amount to save: ${Math.ceil(tipAmount*savingsRate)}</p>
        <input type="number" placeholder="Actual Saved" value={amountSaved} onChange={onAmountSavedInput}></input>
      </div>
      {buttonAction}
    </div>
  )
}
export default TipForm
