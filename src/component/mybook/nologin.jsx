import React,{ Component } from "react";
import './main.css'
import { Flex} from "antd-mobile";
import { Link } from "react-router-dom";
import { observer,inject } from 'mobx-react';
import avatar2 from "./image/avatar3.svg";
@inject('user')
@observer

export default class Nologin extends Component {
   
    render(){ 
        return(
            <div className="Login">
                        <div className="Login_title">
                            <Link to="/login">
                                <Flex>
                                    <Flex.Item>
                                        <div className="Login_btn">
                                            <img src={avatar2} />
                                        </div>
                                        <div className="login_content">
                                            立即登录
                                        </div>
                                        <div className="login_title_right">
                                            <i className="right_content">
                                            </i>
                                        </div>
                                    </Flex.Item>
                                </Flex>
                            </Link>
                        </div>
                 </div>  
        )
    }
}