import React,{ Component } from "react";
import { List,NavBar, Icon,WhiteSpace ,Button, WingBlank,Modal} from 'antd-mobile';
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
        return(
            <div>
               <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={history.goBack}
                >个人信息</NavBar>
                <WhiteSpace />
                <List>
                </List>
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