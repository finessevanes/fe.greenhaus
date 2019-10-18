import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home"
import ShowTips from "./components/ShowTips"
import ShowTip from "./components/ShowTip"
import TipForm from "./components/TipForm"

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
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tips">View Tips</Link>
            </li>
            <li>
              <Link to="/create">Add Tips</Link>
            </li>
          </ul>
        </nav>
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
    );
  }
}

export default App;
