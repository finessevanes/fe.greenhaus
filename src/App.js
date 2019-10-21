import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from "react-router-dom";
import Home from "./components/Home"
import ShowTips from "./components/ShowTips"
import ShowTip from "./components/ShowTip"
import TipForm from "./components/TipForm"
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const LinkEdit = React.forwardRef((props,ref) => <RouterLink innerRef={ref} {...props} />);


class App extends React.Component {
  constructor(){
    super()
    this.state={
      tips:[]
    }
  }


  fetchTips=()=>{
    fetch("http://localhost:8080/tips")
      .then((res)=>res.json())
      .then((response)=>{
        this.setState({tips:response})
    })
  }
  componentDidMount(){
    this.fetchTips();
  }
  render(){
    return(
    <div>
      <Router>
        <div>
        <AppBar style={{background:'#1abfba'}} position="static">
          <Toolbar>
            <Button
              component={LinkEdit} to={"/"}
              color="inherit">Home
            </Button>
            <Button
              component={LinkEdit} to={"/create"}
              color="inherit">Add Tips
            </Button>
            <Button
              component={LinkEdit} to={"/tips"}
              color="inherit">View Tips
            </Button>
          </Toolbar>
        </AppBar>
        </div>


        <div id="content_body">
          <Switch>

          <Route path='/tip/:id' render={(props)=>(
            <ShowTip {...props} fetchTips={this.fetchTips}/>
          )} />

          <Route path='/edit/tip/:id' render={(props)=>(
            <TipForm {...props} fetchTips={this.fetchTips}/>
          )} />

          <Route path='/create' render={(props)=>(
            <TipForm {...props} fetchTips={this.fetchTips}/>
          )} />

            <Route exact path='/'>
              <Home />
            </Route>

            <Route path='/tips'>
              <ShowTips tips={this.state.tips}/>
            </Route>

          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
