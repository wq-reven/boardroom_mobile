import {observable, computed,action} from "mobx";
import { APIHOST,} from '../utils/util';
import request from '../utils/request';
import getRecommend from "../utils/recommend";

const urls = {
    getRoomInfo: APIHOST + 'room/queryRoomInfo',
};

class Room {
    @observable roomdata = [];
    @observable mainType = 'recommend';
    @observable viewVisible = false;
    @observable isShowLoading = false;
    @observable searchValue = {}
    @observable sortValue = {}
    
    // 计算属性
    @computed get roominfo() {
        return this.roomdata.slice()
    }
    @action.bound

    changeVisible(status) {
        this.viewVisible = status;
    }
    changeIsShowLoading(status) {
        this.isShowLoading = status;
    }

    /**
     *
     * 更改首页选项卡类型
     * @param {*} type
     * @memberof Room
     */
    changeMainType(type) {
        this.mainType = type;
    }
   
    /**
     *
     * 格式化搜索数据
     * @returns
     * @memberof Room
     */
    formatGetParams() {
        const params = {
            querys: {
                ...this.searchValue,
            },
            sort: {
                ...this.sortValue,
            },
            pagination: {
                current: 1,
                pageSize: 100
            },
        };
        return '?body=' + encodeURIComponent(JSON.stringify(params));
    };
    /**
     *
     * 获取会议室信息
     * @memberof Room
     */
    async getRoominfo() {
        try {
            this.isShowLoading = true;
            let result = await request(urls.getRoomInfo + this.formatGetParams());
            if (this.mainType === 'all') {
                this.roomdata = result.docs;
            } else {
                let data = await getRecommend(result.docs);
                this.roomdata = data
            }
        } catch (error) {
            throw error;
        } finally {
            this.isShowLoading = false;
        }
    }


    @action changeSortValue(param) {
        this.sortValue['key'] = param.key;
        this.sortValue['order'] = param.order;
    }
}

export default Room;