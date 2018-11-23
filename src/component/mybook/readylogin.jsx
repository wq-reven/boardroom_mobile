import React,{ Component } from "react";
import './main.css'
import { Flex} from "antd-mobile";
import { Link } from "react-router-dom";
import avatar1 from "./image/avatar1.svg";
import { observer,inject } from 'mobx-react';
@inject('user')
@observer

export default class Readylogin extends Component {
   
    render(){ 
        let storestr = sessionStorage.getItem('userInfo')
        if (storestr !== null) {
            let store = JSON.parse(storestr)
            return(
                 <div className="Login">
                        <div className="Login_title">
                            <Link to="/mybook/userinfo">
                                 <Flex>
                                    <Flex.Item>
                                            <div className="Login_btn">
                                              <img src={avatar1} />
                                            </div>
                                            <div className="login_content">
                                             {store.name}
                                            </div>
                                    </Flex.Item>
                                </Flex>
                            </Link>
                        </div>
                 </div>  
            )
        } else{
            return<div></div>
        }
    }
}