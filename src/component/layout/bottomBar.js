import React,{ Component } from "react";
import { TabBar } from 'antd-mobile';
import './bottomBar.css'
import {withRouter} from "react-router-dom";
import home from "./image/main.svg";
import homefill from "./image/main-fill.svg";

class BottomBar extends Component{
    componentDidMount(){
        let pathname = this.props.history.location.pathname;
        switch (pathname) {
            default:
                this.setState({
                    selectedTab: 'main',
                });
                break;
            case '/orderroom':
                this.setState({
                    selectedTab: 'all',
                });
                break;
            case '/mybook':
                this.setState({
                    selectedTab: 'my',
                });
                break;
        }
    }
    state = {
        selectedTab: 'main',
        hidden: false,
    };
   
    render(){
        
        return(
            <div>   
                <div className="footer">
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                    <TabBar.Item
                        title="首页"
                        key="main"
                        icon={<div style={{
                        width: '22px',
                        height: '22px',
                         }}
                        >
                            <img style={{
                                width: '22px',
                                height: '22px',
                                }} src={home} />
                        </div>
                        }
                        selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                       }}
                        >
                             <img style={{
                                width: '22px',
                                height: '22px',
                                }} src={homefill} />
                        </div>
                        }
                        selected={this.state.selectedTab === 'main'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'main',
                            });
                            this.props.history.push(`/index`);
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        title="我的预约"
                        key="Koubei"
                        selected={this.state.selectedTab === 'all'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'all',
                        });
                         this.props.history.push(`/orderroom`);
                        }}
                        data-seed="logId1"
                    >
                   
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        title="个人"
                        key="Friend"
                        selected={this.state.selectedTab === 'my'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'my',
                        });
                        this.props.history.push(`/mybook`);
                        }}
                    >
                    </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}

export default withRouter(BottomBar)


