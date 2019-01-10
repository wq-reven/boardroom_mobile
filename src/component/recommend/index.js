import React,{ Component } from "react";
import Main from "./main";
import BottomBar from "../layout/bottomBar";
class Recommend extends Component{
    render(){
        return(
            <div style={{marginBottom:50}} className="select_drawer">
                    <div>
                        <Main  />
                        <BottomBar />
                    </div>
            </div>
        )
    }
}

export default Recommend;
