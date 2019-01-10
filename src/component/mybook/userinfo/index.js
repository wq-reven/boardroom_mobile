import React,{ Component } from "react";
import { List,NavBar, Icon,WhiteSpace ,Button, WingBlank,Modal,Flex} from 'antd-mobile';
import  "./index.css";
import {withRouter} from 'react-router-dom';

@withRouter
class Userinfo extends Component{
    userloginout = () =>{
       sessionStorage.removeItem('userInfo');
       this.props.history.push('/mybook');
    }
    render(){
        const alert = Modal.alert;
        const {history} = this.props;
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={history.goBack}
                    >
                    个人信息
                </NavBar>
                <WhiteSpace />
                <List className="personinfo_list">
                    <WhiteSpace size="xl" />
                     <WhiteSpace size="xl" />
                    <div className="personinfo_ava">
                        {userInfo.name ? userInfo.name.substr(userInfo.name.length-1) : ''}
                    </div>
                    <div className="personinfo_detail">
                    <Flex wrap="wrap">
                        <Flex.Item >
                            <div>
                                <p><span className="personinfo_detail_key">姓名：</span></p>
                                <p><span className="personinfo_detail_key">手机号：</span></p>
                                <p><span className="personinfo_detail_key">邮箱：</span></p>
                                <p><span className="personinfo_detail_key">部门：</span></p>
                            </div>
                        </Flex.Item>
                        <Flex.Item>
                            <div>
                                <p><span >{userInfo.name ? userInfo.name : ''}</span></p>
                                <p><span>{userInfo.phone ? userInfo.phone : ''}</span></p>
                                <p><span>{userInfo.email ? userInfo.email : ''}</span></p>
                                <p><span >{userInfo.department ? userInfo.department : ''}</span></p>
                            </div>
                        </Flex.Item>
                    </Flex>
                  
                    </div>
                </List>
                <p className="personal_tip">如信息有问题，请联系管理员更改</p>
                <div
                    onClick={() =>
                        alert('确定退出登录吗？', '', [
                        { text: '取消', onPress: () => {} },
                        { text: '确定', onPress: () => {this.userloginout()} },
                        ])
                    }
                    className="uesr_loginout">
                    退出登录
                </div>
            </div>
        )
    }
}

export default Userinfo;