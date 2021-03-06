import React,{ Component } from "react";
import { observer,inject } from 'mobx-react';
import {WhiteSpace, WingBlank, Card, SegmentedControl, NoticeBar} from 'antd-mobile';
import { withRouter } from "react-router-dom";
import Spin from "../layout/spin";
import "./main.css"
@inject('room')
@observer

class Main extends Component{
    componentDidMount(){
        this.props.room.getRoominfo();
    }
    state = {
        viewStatus: true,
    }
    show= id => {
        this.props.history.push(`/roomdetail/:${id}`);
    }
    onValueChange = value => {
        if (value === '全部') {
            this.props.room.changeMainType('all');
            this.props.room.getRoominfo();
        } else {
            this.props.room.changeMainType('recommend');
            this.props.room.getRoominfo();
        }
    }
    renderTags = tags =>{
        const Tag = tags.map(item=>{
            return(
                <span key={item}>
                    {item}
                </span>
            )
        })
        return Tag;
    }
    renderselectedIndex(type){
        if (type == 'all') {
            return 1
        } else {
            return 0
        }
    }
    onOpenChange = () =>{
       
    }
    returnAttr = equipment =>{
        const Attr = equipment.map(item=>{
            return(
                <span key={item}>{item}</span>
            )
        })
        return Attr
    }
    render(){
        const store = this.props.room;
        const listCard = store.roomdata.map(item => {
            return(
                <div  key={item.roomId} className="listli">
                    <Card full
                        onClick={()=>{
                            this.show(item.roomId)
                        }}
                    >
                        <Card.Body>
                            <div className="re_imgbox">
                                <div className="roomtags">
                                    {this.renderTags(item.tag)}
                                </div>
                                <div className="roomproperty ">
                                    {this.returnAttr(item.equipment)}
                                </div>
                                <img alt="example" src={item.url} />
                            </div>
                        </Card.Body>
                        <Card.Footer style={{ fontSize: 12 }} content={<div>{item.roomName}</div>}  extra={<div>适用{item.peopleNum}人</div>} />
                    </Card>
                </div>
            )
        });

        return(
            <div className="main">

                <div className="title">
                    <h4>--会议室列表--</h4>
                    <div className={this.state.viewStatus ? '' : 'hide'}>
                        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                         使用会议室时请爱护器材，保持地面清洁
                        </NoticeBar>
                        <WhiteSpace />
                    </div>
                    <WingBlank size="lg" className="sc-example">
                    <SegmentedControl
                        values={['推荐', '全部']}
                        onChange={this.onChange}
                        selectedIndex={this.renderselectedIndex(store.mainType)}
                        onValueChange={this.onValueChange}
                    />
                    </WingBlank>
                    <WhiteSpace size="lg" />
                </div>
                <div className="roomContent">
                    <Spin isLoading={store.isShowLoading}>
                        {listCard}
                  </Spin>
                </div>
            </div>
        )
    }
}
export default withRouter(Main);
