import React, { Component } from "react";
import './main.css'
import {Drawer, List, NavBar, Icon} from "antd-mobile";
import { observer, inject } from 'mobx-react';
@inject('room')
@observer

export default class SideDrawer extends Component {
    onOpenChange = (...args) => {
        console.log(args);
        this.props.room.changeDrawerStatus(!this.props.room.drawerStatus)
    }
    render() {
        const { children,room } = this.props;
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                        multipleLine
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);
        return (
            <div>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
                    sidebar={sidebar}
                    position="right"
                    open={room.drawerStatus}
                    onOpenChange={this.onOpenChange}
                >
                   {children}
             </Drawer>
            </div>
        )
    }
}