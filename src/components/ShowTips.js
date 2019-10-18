import React from 'react'
import { Link } from "react-router-dom";

const ShowTips=(props)=>{
  let tipsElem = props.tips.map((tip)=>{
    return(
      <Link to={"/tip/" + tip.id} key={tip.id}>
        <li>
          <ul>Date: {tip.date}</ul>
          <ul>Tip Amount: {tip.tipAmount}</ul>
          <ul>Savings Rate: {tip.savingsRate*100}</ul>
          <ul>Amount Saved: {tip.amountSaved}</ul>
        </li>
      </Link>
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
