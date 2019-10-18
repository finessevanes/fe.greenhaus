import React from 'react'
import { Link } from "react-router-dom";

const ShowTip=(props)=>{
  const [tip, setTip] = React.useState({});

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
    <div>
      <li>
        <ul>ID: {tip.id}</ul>
        <ul>Date: {tip.date}</ul>
        <ul>Tip Amount: ${tip.tipAmount}</ul>
        <ul>Savings Rate: {tip.savingsRate*100}%</ul>
        <ul>Amount Saved: ${tip.amountSaved}</ul>
      </li>
      <button onClick={()=>deleteTip(tip.id)}>Delete</button>
      <Link to={"/edit/tip/" + tip.id}>Edit</Link>
    </div>
  )
}

export default ShowTip
