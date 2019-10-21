// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import { Link as RouterLink } from "react-router-dom";
//
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));
//
// const NavBar=()=>{
//   const classes = useStyles();
//   return(
//     <Router>
//       <div>
//         <div className={classes.root}>
//           <Switch>
//           //navbar
//               <AppBar position="static">
//                 <Toolbar>
//                   <Button
//                     component={LinkEdit} to={"/"}
//                     color="inherit">Home
//                   </Button>
//                   <Button
//                     component={LinkEdit} to={"/create"}
//                     color="inherit">Add Tips
//                   </Button>
//                   <Button
//                     component={LinkEdit} to={"/tips"}
//                     color="inherit">View Tips
//                   </Button>
//                 </Toolbar>
//               </AppBar>
//               // navbar ends
//               <Route path='/tip/:id' render={(props)=>(
//                 <ShowTip {...props} fetchTips={this.fetchTips}/>
//               )} />
//
//               <Route path='/edit/tip/:id' render={(props)=>(
//                 <TipForm {...props} fetchTips={this.fetchTips}/>
//               )} />
//
//               <Route path='/create' render={(props)=>(
//                 <TipForm {...props} fetchTips={this.fetchTips}/>
//               )} />
//
//                 <Route exact path='/'>
//                   <Home />
//                 </Route>
//
//                 <Route path='/tips'>
//                   <ShowTips tips={this.state.tips}/>
//                 </Route>
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   )
// }
//
//
// export default NavBar
