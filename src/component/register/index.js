import React,{ Component } from "react";
import { createForm } from 'rc-form';
import { List,NavBar, Icon,WhiteSpace ,Toast,InputItem,Button,Picker, WingBlank,Modal} from 'antd-mobile';
import  "./index.css";
import { formatFormData } from "../../utils/util";
import {withRouter} from 'react-router-dom';
import { observer,inject } from 'mobx-react';
import md5 from "md5";

@inject('user')
@observer
@withRouter

class Register extends Component {
        resetForm = () => {
            this.props.form.resetFields();
        };
        handleOk = async () => {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    const value = formatFormData(values);
                    let user_data = {
                        phone: (value.phone).replace(/\s+/g, ""),
                        password: value.password,
                        // password: md5(value.password),
                        department: value.department[0],
                        name: value.name
                    }
                    let res = await this.props.user.userRegister(user_data);
                    if (res === 'success') {
                        this.registerSuccess();
                        this.props.history.push('./login');
                    } else if (res === 'userexist') {
                        this.registerFail('手机号已存在，请重试');
                    } else {
                        this.registerFail('注册失败，请重试！');
                    }
                }
            });
        };
        registerSuccess() {
            Toast.success('注册成功', 1);
        }
        registerFail(msg) {
            Toast.fail(msg, 1);
        }
        state = {
            password:'',
            confirmpassword:''
        }
        setpassword = (rule,value,callback)=>{
            if (value.replace(/\s/g, '').length < 4) {
                callback('error');
            } else {
                this.setState({
                    password: value
                });
                callback();
            }
        }
        checkPhone = (rule, value, callback) => {
            if (value.replace(/\s/g, '').length < 11) {
                callback('error');
            } else {
                callback();
            }
        }
        checkpass = (rule,value,callback) => {
            if (value !== this.state.password) {
                callback('error');
            } else {
                callback();
            }
        }
        render(){
            const {history} = this.props;
            const { getFieldProps, getFieldError } = this.props.form;
            const area  = [
                {
                    label: "课程部",
                    value: '课程部',
                },
                {
                    label: "产品研发部",
                    value: '产品研发部',
                }
            ];
            return(
                <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={history.goBack}
                    >注册</NavBar>
                    <WhiteSpace />
                    <List renderHeader={() => '用户信息填写'}>
                        <InputItem
                            { ...getFieldProps('phone', {
                                    initialValue: '',
                                    validateFirst: true,
                                    rules: [{
                                            required: true,
                                        },
                                        this.checkPhone
                                    ],
                                    validateTrigger: 'onBlur',
                                })
                            }
                            type="phone"
                            error={getFieldError('phone')?true:false}
                            placeholder="输入手机号"
                        >手机号码</InputItem>
                        <InputItem
                            {...getFieldProps('name',
                                {
                                    rules: [{
                                            required: true,
                                        }
                                    ],
                                })
                            }
                            type="text"
                            placeholder="输入姓名"
                            error={getFieldError('name')?true:false}
                        >姓名</InputItem>
                        <Picker
                            data={area} 
                            error = {
                                getFieldError('area') ? true : false
                            }
                            cols={1} 
                            {...getFieldProps('department',
                                {
                                    rules: [{
                                            required: true,
                                        }
                                    ],
                                })
                            }>
                            <List.Item arrow="horizontal">部门</List.Item>
                        </Picker>
                        <InputItem
                            {...getFieldProps('password',
                                {
                                    initialValue: '',
                                    validateFirst: true,
                                    rules: [{
                                            required: true,
                                        },
                                        this.setpassword
                                    ],
                                    validateTrigger: 'onChange',
                                }
                            )}
                            error = {
                                getFieldError('password') ? true : false
                            }
                            
                            type="password"
                            placeholder="******"
                        >密码</InputItem>
                        <InputItem
                            {...getFieldProps('confirmpassword',
                                {
                                    validateFirst: true,
                                    rules: [{
                                                required: true,
                                            },
                                            this.checkpass
                                        ],
                                    validateTrigger: 'onBlur',
                                }
                            )}
                            error = {
                                getFieldError('confirmpassword') ? true : false
                            }
                            type="password"
                            placeholder = "******"
                        >确认密码</InputItem>
                        </List>
                        <WhiteSpace size="lg" />
                        <WingBlank>
                            <Button type="primary" onClick={()=>{this.handleOk()}}>
                                提交
                            </Button>
                        </WingBlank>
                </div>
        )
    }
}

export default createForm()(Register);