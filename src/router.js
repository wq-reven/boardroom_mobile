import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect,browserHistory} from 'react-router-dom';
import Recommend from './component/recommend';
import Orderroom from './component/orderroom';
import MyBook from "./component/mybook";
import Roomdetail from "./component/roomdetail";
import Login from "./component/login";
import PrivateRoute from "./utils/auth";
import Userinfo from "./component/mybook/userinfo";
import Register from "./component/register";

const RouterConfig = () =>(
        <Router history={browserHistory}>
            <Switch>
                <Route exact path="/index" component={Recommend} />
                <PrivateRoute path="/orderroom" component={Orderroom} />          
                <Route exact path="/mybook" component={MyBook} /> 
                <PrivateRoute path="/mybook/userinfo" component={Userinfo} />   
                <Route exact path="/roomdetail/:id" component={Roomdetail} /> 
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/register" component={Register} /> 
                <Redirect path="/" to={{pathname: '/index'}} />
            </Switch>  
        </Router>
)

export default RouterConfig;