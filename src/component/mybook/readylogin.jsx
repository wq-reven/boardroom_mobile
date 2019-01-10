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
                        </div>
                     <Link to="/mybook/userinfo">
                        <div className="Login_person fn_clear">
                           <span className="fn_left">我的信息</span>
                             <i className="rea_right_content fn_right">
                            </i>
                        </div>
                    </Link>
                    <div>

                    </div>
                 </div>  
            )
        } else{
            return<div></div>
        }
    }
}