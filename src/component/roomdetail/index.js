import React,{ Component } from "react";
import Main from "./main";
import Newmain from "./newmain";
import View from "./view";
import {withRouter} from 'react-router-dom';

@withRouter
class Roomdetail extends Component {
    render(){
        return(
            <div>
                <View />
                <Newmain />
            </div>
        )
    }
}

export default Roomdetail;