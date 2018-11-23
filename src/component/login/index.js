import React,{ Component } from "react";
import {withRouter} from 'react-router-dom';
import  './index.css';
import { List, InputItem, Toast,NavBar, Icon,WhiteSpace ,Button, WingBlank} from 'antd-mobile';
import { observer,inject } from 'mobx-react';

@inject('user')
@observer


class Login extends Component{
    state = {
        hasError: '',
        phone: '',
        password:''
    }
    NoUser() {
        Toast.fail('没有此用户！', 1);
    }
    passwordError() {
        Toast.offline('密码错误!', 1);
     }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onPhoneChange = value => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        };
        this.setState({
            phone:value
        });
    }
     onPaChange = value => {
         this.setState({
            password:value
         });
     }
    onLogin = async ()=>{
        if (this.state.hasError === false) {
            let data = {
                phone:(this.state.phone).replace(/\s+/g,""),
                password:this.state.password
            }
        let res = await this.props.user.userLogin(data)
        if (res === 'nouser') {
            this.NoUser()
        } else if (res === 'error') {
            this.passwordError()
        } else{
            this.props.history.push('./mybook')
        } 
        } 
    }
    render(){
       const {history} = this.props
        return(
            <div>
                <div>
                    <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={history.goBack}
                    >账号登录</NavBar>
                </div>
                <WhiteSpace />
                <List>
                    <InputItem
                        type="phone"
                        placeholder="输入手机号"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onPhoneChange}
                        value={this.state.phone}
                    >手机号码</InputItem>
                    <InputItem
                        type="password"
                        placeholder = "****"
                        onChange={this.onPaChange}
                        value={this.state.password}
                    >密码</InputItem>
                </List> 
                 <WhiteSpace size="lg" />
                 <WingBlank >
                    <Button 
                        size="" 
                        type="primary"
                        onClick={() => {
                                this.onLogin()
                            }}>
                        登录
                    </Button>
                 </WingBlank>
                 <div className="zhuce_area">
                    <Button
                        onClick={() => { this.props.history.push('/register') }}
                        style={{ width: "8rem" }}
                        className="zhuce_btn"
                        type="ghost" size="small">
                        注册
                    </Button>
                 </div>
            </div>
        )
    }
}

export default withRouter(Login)