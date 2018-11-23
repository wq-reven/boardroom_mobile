import React,{ Component } from "react";
import  "./spin.css";
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
           return(
            <div 
                className="select_disabled"
            >
            </div>
        ) 
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



