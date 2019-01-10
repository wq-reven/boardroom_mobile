import React,{ Component } from "react";
import  "./spin.css";
import zhan from "./image/zhan.png";
class ClickBox extends Component{
    state={
       changestyle:false 
    }
    change = ()=>{
        this.setState({
            changestyle:!this.state.changestyle
        })
    }
    render(){
        if (this.props.disabled===true) {
            if (this.props.overtime === true) {
                 return(
                    <div 
                        className="select_disabled select_overtime"
                    >
                    </div>
                ) 
            }else if(this.props.isme === true){
                return(
                    <div 
                        className="select_disabled seect_isme"
                    >
                       我
                    </div>
                ) 
            } else{
                return(
                    <div 
                        className="select_disabled"
                    >
                    <img src={zhan} />
                    </div>
                ) 
            }
        } else{
            return(
            <div 
                className={this.state.changestyle === false ? 'n_selectBox' : 'click_change'}
                onClick={()=>this.change()}
             >
            </div>
        )
        }
    }
}

export default ClickBox;



