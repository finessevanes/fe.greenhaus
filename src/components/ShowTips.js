import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LinkEdit = React.forwardRef((props,ref) => <RouterLink innerRef={ref} {...props} />);

const ShowTips=(props)=>{
  let tipsElem = props.tips.map((tip, idx)=>{
    return(
      <div key={idx} className="tipsCard">
                <div className="fromNowText"><Moment fromNow>{tip.date}</Moment></div>
                <div className="tipsCardText"><Moment format="dddd MMM D, YYYY" withTitle>{tip.date}</Moment></div>
                <Button
                  component={LinkEdit} to={"/tip/" + tip.id}
                  color="inherit">View More
                </Button>
      </div>
    )
  })
  return(
    <div className="tipsContainer">
      {tipsElem}
    </div>
  )
}

export default ShowTips
