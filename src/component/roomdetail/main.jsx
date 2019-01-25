import React, { Component } from "react";
import './main.css';
import { observer, inject } from 'mobx-react';
import { Flex, WhiteSpace, WingBlank, Modal, Toast, NavBar, Icon, Popover } from "antd-mobile";
import { withRouter } from "react-router-dom";
import fresh from "./image/fresh.svg";
import Spin from "../layout/spin";
import ClickBox from "../layout/clickBox";
import { returnRoomPosition, renderCountEndTime } from "../../utils/util";
@inject('appo')
@observer


class Main extends Component {
    state = {
        selectArr: [],
        roomId: '',
        visible: false,
        isselect:true,
        countTitle:'',
        modalStatus:false
    }
    componentDidMount() {
        this.props.appo.getday();
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
        this.props.appo.getAppoInfo(roomId);
    }
    /**
     *
     * 双向绑定已选中时刻和state数据
     * @memberof Main
     */
    onChange = (key, time, date, k_id) => {

        if (this.state.selectArr.findIndex(item => item.key === key) !== -1) {
            let arr = this.state.selectArr;
            arr.splice(arr.findIndex(item => item.key === key), 1);
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
    getInfo = async (time, date) => {
        //异步获取某一时刻预约信息
       let res = await this.props.appo.getAppoInfoByTime(this.state.roomId, date, time);
       if (res === 'error') {
           Toast.info('预约已被删除！', 4, null, false);
       } else {
           //改变Modal显示状态
           this.props.appo.changeVisible(true);
       }
       
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
    sortTime (a,b){
        return Number(a.k_id) - Number(b.k_id)
    }
    getArrSort = arr =>{
        var Arr = arr.sort(this.sortTime)
        return Arr
    }
    onClose(){
        this.setState({
            modalStatus:false
        })
        window.location.reload()
    }
    judgeorderTime(){
        let sortresult = this.getArrSort(this.state.selectArr)
        let param = this.getType(sortresult);
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
                    ? Toast.fail('当日预约时间必须连续！', 1)
                    : this.state.countTitle
                        ? this.confirmInfo()
                        : this.renderPrompt()
    }
    /**
     *
     * 确认是否提交
     * @memberof Main
     */
    confirmInfo = ctitle => {
        const title = this.state.countTitle ? this.state.countTitle : ctitle;
        let param = this.getType(this.state.selectArr);
        const timestr = param.map(item=>{
            return (<p key = {item.date}>
                    {item.date} {item.time[0]}-{renderCountEndTime(item.time[item.time.length-1])}
                </p>)
            })
        const alert = Modal.alert;
        const str = (<div>
                <p>会议主题: <span>{title}</span></p>
                <p>会议时间</p>
                {timestr}
            </div>)
        alert('确定提交吗?', str, [{
            text: '取消',
            onPress: () => {}
        },
        {
            text: '确定',
            onPress: () => {
                this.submitInfo(title, param)
            }
        },
        ])
    }

    /**
     *
     * 最终弹窗提交信息
     * @memberof Main
     */
    submitInfo = async (title, param) => {
        //判断登录状态决定是否异步提交预约信息
        let res = await this.props.appo.addAppoInfo(param, title, this.state.roomId);
        if (res === 'ok') {
            Toast.success('预约成功 !!!', 1);
            this.props.history.push(`/orderroom`)
        } else if (res === 'conflict') {
            Toast.info('您预约的时段有冲突，请刷新后重新选择！', 4, null, false);
        } else if (res === 'room') {
            Toast.info('您在该时段已预约了其他会议室，请重新选择！', 4, null, false);
        } else if (res === 'user') {
            this.setState({
                modalStatus: true
            })
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
                    this.setState({
                        countTitle: value
                    });
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
        window.location.reload()
    };
    handleVisibleChange = visible => {
        this.setState({
            visible,
        });
    };
    goMain = () =>{
        this.props.history.push(`/index`);
    }
    tipmessage(){
        Toast.info('该时段已过期！', 1, null, false); 
    }
    returnSumBtn =()=>{
        if (sessionStorage.getItem('userInfo')){
            return(
                <div
                    onClick={() =>
                        this.judgeInfo()
                    }
                    className="uesr_submit">
                    提交
                </div>
            )
        } else{
            return(
                <div
                    onClick={() =>
                        this.props.history.push(`/login?from=/roomdetail/:${this.state.roomId}`)
                    }
                    className="uesr_submit">
                    登录
                </div>
            )
        }
    }
    render() {
        const store = this.props.appo;
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
                    <br/>
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
                            <ClickBox selectstatus={this.state.isselect}>
                            </ClickBox>
                        </li>
                        
                    )
                } else if (val.status === "1") {
                    let uid = '';
                    let userInfostr = sessionStorage.getItem('userInfo') ? sessionStorage.getItem('userInfo') : ''
                    if (userInfostr) {
                        let userInfo = JSON.parse(userInfostr);
                        uid = userInfo.uid
                    }
                    if (val.uid === uid) {
                        return (
                            <li
                                key={val.time}
                                onClick={() => {
                                    this.getInfo(val.time, val.value)
                                }}
                                className="s_selectBox"
                            >
                                <ClickBox
                                    disabled={true}
                                    isme = {true}
                                >
                                </ClickBox>
                            </li>
                        )
                    } else{
                        return (
                            <li
                                key={val.time}
                                onClick={() => {
                                    this.getInfo(val.time, val.value)
                                }}
                                className="s_selectBox"
                            >
                                <ClickBox
                                    disabled={true}
                                >
                                </ClickBox>
                            </li>
                        )
                    }
                   
                } else if (val.status === "2") {
                    return (
                        <li
                            key={val.time}
                            onClick={() => {
                                this.tipmessage()
                            }}
                            className="s_selectBox"
                        >
                            <ClickBox
                                disabled={true}
                                overtime={true}
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
                <Modal
                    visible={this.state.modalStatus}
                    transparent
                    title="预约冲突"
                    footer={[{ text: '刷新', onPress: () => { this.onClose() } }]}
                >
                   您预约的时段和他人有冲突，请刷新后重新选择！ 
                </Modal>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={()=>this.goMain()}
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
                <div className="room_title">
                    ({returnRoomPosition(this.state.roomId)})
                </div>
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
                {this.returnSumBtn()}
            </div>
        )
    }
}

export default withRouter(Main);