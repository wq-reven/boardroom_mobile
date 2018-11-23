import React,{ Component } from "react";
import { observer,inject } from 'mobx-react';
import { Flex, WhiteSpace,Card,Modal } from 'antd-mobile';
import "./main.css"
@inject('room')
@observer

class View extends Component{
    onClose(){
        this.props.room.changeVisible(false)
    }
    render(){
        const store = this.props.room;
        return(
            <div className="main">
                <Modal
                    visible={store.viewVisible}
                    transparent
                    title="会议详情"
                    footer={[{ text: 'Ok', onPress: () => {this.onClose()} }]}
                    >
                    <div style={{ height: 150}}>
                        <p><span>预约人：</span>{store.userOrderInfo.name}</p>
                        <p><span>部门：</span>{store.userOrderInfo.department}</p>
                        <p><span>会议主题：</span>{store.userOrderInfo.title}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default View;