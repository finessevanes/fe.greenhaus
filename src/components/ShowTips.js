import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';

const LinkEdit = React.forwardRef((props,ref) => <RouterLink innerRef={ref} {...props} />);

const ShowTips=(props)=>{
  let tipsElem = props.tips.map((tip, idx)=>{
    return(
      <div key={tip.idx} component={LinkEdit} to={"/tip/"+tip.id} className="tipsCard">
                <div>Date: <Moment format="MMM D, YYYY" withTitle>{tip.date}</Moment></div>
                <div>Tip Amount: {tip.tipAmount}</div>
                <div>--ID: {tip.id}--</div>
      </div>
    )
  })
  return(
    <div className="cardsList">
      {tipsElem}
    </div>
  )
}

export default ShowTips
