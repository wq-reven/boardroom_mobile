import React,{ Component } from "react";
import './main.css';
import { observer,inject } from 'mobx-react';
import { Flex } from "antd-mobile";
@inject('room','appo')
@observer

class Content extends Component{
        componentDidMount() {
            this.props.room.getday();
            this.props.room.setdata();
            //window.addEventListener('touchmove', this.moveSlide);
        }
        state = {
            key: '',
            _active: '',
            startpageY:0,
            relativepageY:0,
            touchStatus:'0',
            defaultPointRef:'',
            selected:[],
            renewSelect:false
        }
        countDefaultRange =(classList,pageY) =>{
            if (pageY < 51) {
                this.state.relativepageY = pageY
            } else {
                let time = parseInt((classList[2]).replace(/[^0-9]/ig, ""));
                let relativepageY = pageY - 51*(time-1);
                console.log(relativepageY)
                this.state.relativepageY = relativepageY
            }
        }
        changeStyleByDistance = (classList,pageY) =>{
            let startpageY = this.state.startpageY;
            let relativepageY = this.state.relativepageY;
            let line = parseInt((classList[1]).replace(/[^0-9]/ig, ""));
            let time = parseInt((classList[2]).replace(/[^0-9]/ig, ""));
            if (this.state.touchStatus == 0) {
                if (pageY - startpageY > relativepageY) {
                    let dref = `select${line}${time + 1}`;
                    if (time + 1 < 11) {
                        let classNames = this.refs[dref].className;
                        if (classNames.indexOf('_active') != -1) {
                            alert('已被选择')
                        } else {
                            this.refs[dref].style.background = '#333'
                            this.state.touchStatus = '1'
                        }
                    }
                } 
            } else {
                let newRange = pageY - startpageY- relativepageY;
                    //console.log(Math.floor(newRange))
                if (parseInt(newRange) % 51 > 0 && parseInt(newRange) % 51 < 6) {
                    let index = Math.floor(newRange / 51);
                    let dref = `select${line}${time + 1 + index}`;
                    let classNames = this.refs[dref].className;
                    if (classNames.indexOf('_active') != -1) {
                        alert('已被选择')
                    } else {
                        this.refs[dref].style.background = '#333'
                    }  
                }
            }
            
        }
        startSlide = e => {
            e.preventDefault();
            let touch = e.changedTouches[0];
            let classList = touch.target.classList;
            let pageY = touch.pageY - 40;
            this.state.startpageY = pageY;
            if (classList[1] == '_active') {
                alert('已被选择')
            } else {
                this.countDefaultRange(classList,pageY)
                let line = (classList[1]).replace(/[^0-9]/ig, "");
                let time = (classList[2]).replace(/[^0-9]/ig, "");
                let dref = 'select'+line+time;
                if (this.state.renewSelect == false) {
                    this.state.defaultPointRef = dref;
                }
                
                
                // let defaultPointRef = this.state.defaultPointRef;
                // if (defaultPointRef) {
                //      if (this.state.defaultPointRef !== dref) {
                //          this.refs[dref].style.background = '#333';
                //          this.refs[this.state.defaultPointRef].style.background = '#3CB371'
                //      }
                // } else {
                //      this.refs[dref].style.background = '#333';
                // }
            }    
        }
        endSlide = e => {
            this.state.touchStatus == 0
            e.preventDefault();
            let touch = e.changedTouches[0];
            let classList = touch.target.classList;
            let pageY = touch.pageY - 40;
            let startpageY = this.state.startpageY;
            if (classList[1]  !== '_active') {
                let defaultPointRef = this.state.defaultPointRef;
                let line = (classList[1]).replace(/[^0-9]/ig, "");
                let time = (classList[2]).replace(/[^0-9]/ig, "");
                let dref = 'select' + line + time;
                if (this.state.renewSelect == true) {
                     if (pageY - startpageY < 20 && pageY - startpageY > -1) {
                         if (defaultPointRef !== dref) {
                             this.refs[dref].style.background = '#333';
                             this.refs[defaultPointRef].style.background = '#3CB371'
                         } else {
                             console.log(pageY - startpageY)
                             alert('获取成功2')
                         }
                         // let line = (classList[1]).replace(/[^0-9]/ig, "");
                         // let time = (classList[2]).replace(/[^0-9]/ig, "");
                         // let defaultPointRef = 'select'+line+time;
                         // this.state.defaultPointRef = defaultPointRef;
                     } else if (pageY - startpageY > 51) {
                         if (defaultPointRef !== dref) {
                             alert('失败')
                         } else {
                             console.log(pageY - startpageY)
                             alert('获取成功1')
                         }
                     }
                     this.state.defaultPointRef = dref
                } else {
                    if (pageY - startpageY < 20 && pageY - startpageY > -1) {
                        this.refs[dref].style.background = '#333';
                        this.state.renewSelect = true;
                    } else if (pageY - startpageY > 51) {
                        alert('失败')
                    }
                }  
            } 
        }
        moveSlide = e => {
            e.preventDefault();
            let touch = e.changedTouches[0];
            let classList = touch.target.classList;
            let pageY = touch.pageY - 40;
            let startpageY = this.state.startpageY;
            if (classList[1] !== '_active') {
                let line = (classList[1]).replace(/[^0-9]/ig, "");
                let time = (classList[2]).replace(/[^0-9]/ig, "");
                let dref = 'select' + line + time;
                let defaultPointRef = this.state.defaultPointRef;
                if (this.state.renewSelect == true) {
                    if (defaultPointRef != '') {
                        if (defaultPointRef != dref) {
                            //this.refs[dref].style.background = '#333';
                            console.log(1)
                            this.refs[defaultPointRef].style.background = '#3CB371'
                        } else {
                            this.changeStyleByDistance(classList, touch.pageY - 40)
                        }
                    }
                } 
            }

            
        }
        render(){
            const store = this.props.room;
            const timeBar = store.countTime.map(item => {
                return(
                    <li key={item.key} className="timebar">
                        {item.time}
                    </li>
                )
            });
            const dateBar = store.date.map(item=>{
                return(
                     <Flex.Item  style={{textAlign:'center',fontSize:12}} key={item.id}>
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
            const list = store.countRoomdata.map(item =>{
                const selectli = item.time.map(val =>{
                        return(
                        <li  
                            key={val.time} className={ val.status == '1'? "selectBox _active" : `selectBox line${val.id} time${val.key}`} 
                            ref={`select${val.id}${val.key}`}
                        >
                           {/* <div className="editbox" key={val.time}  onClick={()=>alert(val.time)}>
                        </div>*/}
                        </li>
                    )
                });
                return(
                    <Flex.Item key={item.value}   
                    >
                        {selectli}
                    </Flex.Item>
                )
            })
            return(
                <div className="mainroom">
                    <div className="listHeader clearfix">
                        <div className="leftBar headerleft">
                            {(new Date()).getMonth()+1}月
                        </div>
                        <div className="dateBar">
                            <Flex>
                            {dateBar}
                            </Flex>
                        </div>
                    </div>
                    <div className="con clearfix">
                        <div className="leftBar">
                            {timeBar}
                        </div>
                        <div className="listBox" id="com">
                            <Flex 
                                onTouchStart={this.startSlide.bind(this)}
                                onTouchEnd={this.endSlide.bind(this)}
                                onTouchMove={this.moveSlide.bind(this)}
                                >
                            {list}
                        </Flex>
                        </div>
                      
                    </div>
                </div>
            )
    }
}

export default Content;