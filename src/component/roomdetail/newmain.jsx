import React, { Component } from "react";
import './main.css';
import { observer, inject } from 'mobx-react';
import { Flex, Checkbox, WhiteSpace, WingBlank, Modal, Toast, NavBar, Icon, Popover } from "antd-mobile";
import { withRouter } from "react-router-dom";
import fresh from "./image/fresh.svg";
import Spin from "../layout/spin";
import ClickBox from "../layout/clickBox";
@inject('room')
@observer

class Newmain extends Component {
    state = {
        selectArr: [],
        roomId: '',
        visible: false,
    }
    componentDidMount() {
        this.props.room.getday();
        //获取地址栏会议室ID
        let path_arr = window.location.pathname.split(':');
        this.setState({
            roomId: path_arr[1]
        });
        this.getNowAppo(path_arr[1]);
    }
    /**
     *
     * 刷新页面数据
     * @memberof Main
     */
    getNowAppo = roomId => {
        //根据ID查询会议室预约信息
        this.props.room.getAppoInfo(roomId);
    }
    /**
     *
     * 双向绑定已选中时刻和state数据
     * @memberof Main
     */
    onChange = (key, time, date, k_id) => {
        if (this.state.selectArr.findIndex(item => item.key === key) !== -1) {
            let arr = this.state.selectArr;
            arr.splice(arr.findIndex(item => item.key === key), 1)
            this.state.selectArr = arr;
        } else {
            let item = {
                key: key,
                time: time,
                date: date,
                k_id: k_id
            }
            this.state.selectArr = [...this.state.selectArr, item];
        }
    }
    /**
     *
     * 获取已预约的会议信息
     * @param {*} time
     * @param {*} date
     * @memberof Main
     */
    getInfo = (time, date) => {
        //异步获取某一时刻预约信息
        this.props.room.getAppoInfoByTime(this.state.roomId, date, time);
        //改变Modal显示状态
        this.props.room.changeVisible(true);
    }
    /**
     *
     * 获取最终预约时间数据格式
     * @param {*} list
     * @returns
     * @memberof Main
     */
    getType(list) {
        //分类已选中时间
        let data = {};
        let findata = [];
        for (let i = 0; i < list.length; i++) {
            if (!data[list[i].date]) {
                let arr = [];
                arr.push(list[i]);
                data[list[i].date] = arr;
            } else {
                data[list[i].date].push(list[i]);
            };
        }
        //format时间时间数据格式
        let pa_item = {};
        for (let item in data) {
            let time_arr = [];
            let keyarr = []
            for (let j = 0; j < data[item].length; j++) {
                time_arr.push(data[item][j].time);
                keyarr.push(data[item][j].k_id)
            }
            pa_item = {
                date: item,
                time: time_arr,
                key_r: keyarr
            }
            findata.push(pa_item);
        }
        return findata;
    }
    judgeorderTime(){
        let param = this.getType(this.state.selectArr);
        for(let item in param){
            let ele = param[item];
            let distance = Math.abs(Number(ele.key_r[ele.key_r.length - 1]) - Number(ele.key_r[0])) + 1;
            if (ele.key_r.length < distance) {
                return false
            }
        }
    }
    /**
     *
     * 提交信息判断
     * @memberof Main
     */
    judgeInfo = () => {
        !sessionStorage.getItem('userInfo')
            ? Toast.info('请先登录', 2, null, false)
            : this.state.selectArr.length === 0
                ? Toast.info('请选择预约时间!!!', 2, null, false)
                : this.judgeorderTime() === false
                    ? Toast.fail('预约时间必须连续！', 1)
                    : this.renderPrompt()
    }
    /**
     *
     * 确认是否提交
     * @memberof Main
     */
    confirmInfo = title => {
        const alert = Modal.alert;
        alert('确定提交吗？', '', [{
            text: '取消',
            onPress: () => { }
        },
        {
            text: '确定',
            onPress: () => {
                this.submitInfo(title)
            }
        },
        ])
    }

    /**
     *
     * 最终弹窗提交信息
     * @memberof Main
     */
    submitInfo = async title => {
        let param = this.getType(this.state.selectArr);
        //判断登录状态决定是否异步提交预约信息
        let res = await this.props.room.addAppoInfo(param, title, this.state.roomId);
        if (res === 'ok') {
            Toast.success('预约成功 !!!', 1);
            this.props.history.push(`/orderroom`)
        } else {
            Toast.info('预约失败，请重试!!!', 2, null, false);
        }
    }
    /**
     *
     * 填写会议主题弹窗内容
     * @memberof Main
     */
    renderPrompt() {
        const prompt = Modal.prompt;
        prompt('请输入会议主题', '', [{
            text: '取消'
        },
        {
            text: '确定',
            onPress: value => {
                if (value === '') {
                    Toast.info('请填写会议主题!!!', 2, null, false);
                    this.renderPrompt();
                } else {
                    this.confirmInfo(value);
                }
            }
        },
        ])
    }
    onSelect = opt => {
        this.setState({
            visible: false
        });
        this.getNowAppo(this.state.roomId)
    };
    handleVisibleChange = visible => {
        this.setState({
            visible,
        });
    };
    bindcalss = () =>{
        console.log(22)
    }
    render() {
        const store = this.props.room;
        const CheckboxItem = Checkbox.CheckboxItem;
        const timeBar = store.countTime.map(item => {
            return (
                <li key={item.key} className="timebar">
                    {item.time}
                </li>
            )
        });
        const dateBar = store.date.map(item => {
            return (
                <Flex.Item style={{ textAlign: 'center', fontSize: 12 }} key={item.id}>
                    <span>
                        {item.value}
                    </span>
                    <br />
                    <span>
                        {item.day}
                    </span>
                </Flex.Item>
            )
        })
        const list = store.countRoomdata.map(item => {
            const selectli = item.time.map(val => {
                if (val.status === "0") {
                    return (
                        <li 
                            className="s_selectBox"
                            key={val.time}
                            onClick={() => {
                                this.onChange(val.key, val.time, val.value,val.k_id)
                        }}>
                            <ClickBox >
                            </ClickBox>
                        </li>
                        
                    )
                } else {
                    return (
                        <li
                            key={val.time}
                            onClick={() => {
                                this.getInfo(val.time, val.value)
                            }}
                            className="s_selectBox"
                        >
                            <ClickBox 
                            disabled = {true}   
                            >
                            </ClickBox>
                        </li>
                    )
                }
            });
            return (
                <div key={item.value} className="n_select_out">
                    {selectli}
                </div>
            )
        });
        const Item = Popover.Item;
        const myImg = () => <img src={fresh} className="am-icon am-icon-xs" alt="" />;
        return (
            <div className="mainroom">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.props.history.goBack}
                    rightContent={
                        <Popover mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<Item key="4" value="scan" icon={myImg()} data-seed="logId">刷新</Item>),
                            ]}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            onVisibleChange={this.handleVisibleChange}
                            onSelect={this.onSelect}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <Icon type="ellipsis" />
                            </div>
                        </Popover>
                    }
                >
                    会议室预订
                    </NavBar>
                <Spin isLoading={store.isShowLoading}>
                    <div>
                       
                        <WingBlank size="sm">
                            <div className="listHeader clearfix">
                                <div className="leftBar headerleft">
                                    {(new Date()).getMonth() + 1}月
                            </div>
                                <div className="dateBar">
                                    <Flex>
                                        {dateBar}
                                    </Flex>
                                </div>
                            </div>
                            <div className="detail_con clearfix">
                                <div className="leftBar">
                                    {timeBar}
                                </div>
                                <div className="n_listBox">
                                        {list}
                                </div>
                                <WhiteSpace />
                            </div>
                        </WingBlank>
                    </div>
                </Spin>
                <div
                    onClick={() =>
                        this.judgeInfo()
                    }
                    className="uesr_submit">
                    提交
                    </div>
            </div>
        )
    }
}

export default withRouter(Newmain);