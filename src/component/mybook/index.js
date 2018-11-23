import React,{ Component } from "react";
import Main from "./main";
import BottomBar from "../layout/bottomBar";
import Nologin from "./nologin";
import Readylogin from "./readylogin";
import { observer,inject } from 'mobx-react';
@inject('user')
@observer

class MyBook extends Component{
    render(){
        let userInfo = sessionStorage.getItem('userInfo')
        return(
            <div>
            {userInfo == null ? (<Nologin />) :  (<Readylogin />)}
                <Main /> 
                <BottomBar />
            </div>
        )
    }
}

export default MyBook;