import React,{ Component } from "react";
import Main from "./main";
import BottomBar from "../layout/bottomBar";
import SideDrawer from "./drawer";
class Recommend extends Component{
    render(){
        return(
            <div style={{marginBottom:50}} className="select_drawer">
                <SideDrawer >
                    <div>
                        <Main  />
                        <BottomBar />
                    </div>
                </SideDrawer>
            </div>
        )
    }
}

export default Recommend;