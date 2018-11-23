import React,{ Component } from "react";
import  "./spin.css";
class Spin extends Component{
    render(){
        const { children,isLoading} = this.props;
        return(
            <div>
                <div className="ant-spin-box" style={isLoading === true ? {display:'block'}: {display:'none'}}>
                    <span className="ant-spin-dot ant-spin-dot-spin">
                        <i></i><i></i><i></i><i></i>
                    </span>
                    <a className="ant-spin-a">加载中···</a>
                </div>
                <div className={isLoading === true ? 'ant-spin-loading load-blur' : 'ant-spin-loading'}>
                    {children}
                </div> 
            </div>
        )
    }
}

export default Spin;



