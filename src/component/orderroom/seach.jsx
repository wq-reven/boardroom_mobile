import React,{ Component } from "react";
import { observer,inject } from 'mobx-react';
import { SearchBar} from 'antd-mobile';
import './search.css'
@inject('room')
@observer

export default class Search extends Component{

    render(){
        return(
            <div>
                <SearchBar placeholder="输入条件搜索" maxLength={8} />
            </div>
        )
    }
}