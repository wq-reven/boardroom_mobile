import React,{ Component } from "react";
import { observer,inject } from 'mobx-react';
import { Flex, WhiteSpace,Card,Modal } from 'antd-mobile';
import "./main.css";
import {renderCountEndTime} from "../../utils/util";

@inject('appo')
@observer

class View extends Component{
    onClose(){
        this.props.appo.changeVisible(false)
    }
    render(){
        const store = this.props.appo;
        const info = store.userOrderInfo
        return(
            <div className="main">
                <Modal
                    visible={store.viewVisible}
                    transparent
                    title="会议详情"
                    footer={[{ text: 'Ok', onPress: () => {this.onClose()} }]}
                    >
                    <div style={{ height: 150}}>
                        <p><span>预约人：</span>{info.name}</p>
                        <p><span>部门：</span>{info.department}</p>
                        <p><span>会议主题：</span>{info.title}</p>
                        <p><span>会议时间：</span> {info.date} {info.appoTime[0]}-{renderCountEndTime(info.appoTime[info.appoTime.length - 1])}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default View;