import React, {Component} from "react";
import Main from "./main";
import BottomBar from "../layout/bottomBar";

class Orderroom extends Component {
    render() {
        return (
            <div style={{
                marginBottom: 50
            }}>
                <Main/>
                <BottomBar/>
            </div>
        )
    }
}

export default Orderroom;