import React, {Component} from "react";
import Main from "./main";
import Search from "./seach";
import {WhiteSpace, WingBlank} from 'antd-mobile';
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