import React,{ Component } from "react";
import './main.css'
import { Flex} from "antd-mobile";
import { Link } from "react-router-dom";
import { observer,inject } from 'mobx-react';
@inject('user')
@observer


export default class Main extends Component {
   
    render(){ 
       
        return(
           <div>
                <div className="">
                   
                </div>
           </div>
        )
    }
}