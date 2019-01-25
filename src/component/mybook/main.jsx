import React,{ Component } from "react";
import './main.css'
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