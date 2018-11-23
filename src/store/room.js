import {observable, computed,action} from "mobx";
import {APIHOST} from '../utils/util';
import request from '../utils/request';
import getRecommend from "../utils/recommend";
import moment from 'moment';

const urls = {
    getRoomInfo: APIHOST + 'room/queryRoomInfo',
    getAPPOInfo: APIHOST + 'appo/queryAppoInfo',
    addAppoInfo: APIHOST + 'appo/addAppo',
    deleteAppo: APIHOST + 'appo/deleteAppo'
};

class Room {
    @observable roomdata = [];
    @observable appoInfo = [];
    @observable userOrderInfo = {};
    @observable mainType = 'recommend';
    @observable drawerStatus = false;
    @observable viewVisible = false;
    @observable isShowLoading = false;
    @observable searchValue = {}
    @observable sortValue = {}
    @observable myorderInfo = []
    @observable countRoomdata = []
    @observable countTime = [{
           key: '1',
           time: "9:00"
       },
       {
           key: '2',
           time: "9:30"
       },
       {
           key: '3',
           time: "10:00"
       },
       {
           key: '4',
           time: "10:30"
       },
       {
           key: '5',
           time: "11:00"
       },
       {
           key: '6',
           time: "11:30"
       },
       {
           key: '7',
           time: "12:00"
       },
       {
           key: '8',
           time: "12:30"
       },
       {
           key: '9',
           time: "13:00"
       },
       {
           key: '10',
           time: "13:30"
       },
       {
           key: '11',
           time: "14:00"
       },
       {
           key: '12',
           time: "14:30"
       },
       {
           key: '13',
           time: "15:00"
       },
       {
           key: '14',
           time: "15:30"
       },
       {
           key: '15',
           time: "16:00"
       },
       {
           key: '16',
           time: "16:30"
       },
       {
           key: '17',
           time: "17:00"
       },
       {
           key: '18',
           time: "17:30"
       },
       {
           key: '19',
           time: "18:00"
       },
   ];
    @observable date = []

    // 计算属性
    @computed get roominfo() {
        return this.roomdata.slice()
    }
    @computed get returnuserOrderInfo() {
        return this.userOrderInfo.slice()
    }
    @action.bound

    changeVisible(status) {
        this.viewVisible = status;
    }
    changeIsShowLoading(status){
        this.isShowLoading = status;
    }
    changeDrawerStatus(status){
        this.drawerStatus = status
    }
    /**
     *
     * 更改首页选项卡类型
     * @param {*} type
     * @memberof Room
     */
    changeMainType(type){
        this.mainType = type;
    }
    /**
     *
     * 生成详情页复选框数据
     * @memberof Room
     */
    setdata() {
        let Alldata = [];
        let timedata = {};
        let datedata = [];
        let todadate = {};
        for (let i = 0, len = this.appoInfo.length; i < len; i++) {
            datedata = []
            for (let j = 0, clen = this.countTime.length - 1; j < clen; j++) {
                timedata = {};
                let countTime = this.countTime;
                if (this.appoInfo[i].time.includes(countTime[j].time)) {
                    timedata = {
                        key: i+this.countTime[j].key,
                        time: this.countTime[j].time,
                        value: this.appoInfo[i].date,
                        status: "1"
                    }
                } else {
                    timedata = {
                        key: i+this.countTime[j].key,
                        k_id: this.countTime[j].key,
                        time: this.countTime[j].time,
                        value: this.appoInfo[i].date,
                        status: "0"
                    }
                }
                datedata.push(timedata)
            }
            todadate = {
                value: this.appoInfo[i].date,
                time: datedata
            }
            Alldata.push(todadate);
        }
        this.countRoomdata = Alldata;
    }
    /**
     *
     * 生成日期数据
     * @memberof Room
     */
    getday(){
        let date = new Date().setHours(6, 0, 0, 0);
        let weekdate = [];
        for (let i = 0; i < 7; i++) {
            let day_data = {
                value: moment(date).format('DD'),
                day: (moment(date).format('dddd')).substr(0,3),
                id:i
            }
            weekdate.push(day_data);
            date = date + 60 * 60 * 1000 * 24;    
        }
        this.date = weekdate;
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
     * 获取房间信息
     * @memberof Room
     */
    async getRoominfo() {
        try {
            this.isShowLoading = true;
            let result = await request(urls.getRoomInfo + this.formatGetParams());
            //this.roomdata = result.docs;
            if (this.mainType === 'all') {
                this.roomdata = result.docs;
            } else{
                this.roomdata = await getRecommend(result.docs);
            }
        } catch (error) {
            throw error;
        } finally {
            this.isShowLoading = false;
        }
    }

    /**
     *
     * 获取预约信息(我的预约页)
     * @param {*} title
     * @memberof Room
     */
    async getAppoInfoByParam(title) {
        try {
            this.isShowLoading = true;
            title = title === undefined ? '' : title;
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            let uid = userInfo.uid;
            let result = await request(urls.getAPPOInfo + `?body={"querys":{"uid":"${uid}","title":"${title}"},"sort":{"key":"createTime","order":"desc"},"pagination":{"current":1,"pageSize":100}}`);
            this.myorderInfo = result.docs;
        } catch (error) {
            throw error;
        } finally {
            this.isShowLoading = false;
        }
    }

    /**
     *
     * 获取预约信息（详情页点击已预订时刻事件）
     * @param {*} roomId
     * @param {*} date
     * @param {*} time
     * @memberof Room
     */
    async getAppoInfoByTime(roomId,date,time) {
        try {
            let result = await request(urls.getAPPOInfo + `?body={"querys":{"roomId":"${roomId}","date":["${date}","${date}"],"appoTime":"${time}"},"sort":{},"pagination":{"current":1,"pageSize":100}}`);
            this.userOrderInfo = result.docs[0];
        } catch (error) {
            throw error;
        } finally {

        }
    }
    /**
     *
     * 获取预约信息（详情页）
     * @param {*} roomId
     * @memberof Room
     */
    async getAppoInfo(roomId) {
        try {
            this.isShowLoading = true;
            let date = new Date().setHours(6, 0, 0, 0);
            let arr = [];
            let appotime = ""
            for (let i = 0; i < 7; i++) {
                appotime = moment(date).format().substr(0, 10)
                let result = await request(urls.getAPPOInfo + `?body={"querys":{"roomId":"${roomId}","date":["${appotime}","${appotime}"]},"sort":{},"pagination":{"current":1,"pageSize":100}}`);
                let day = {};
                let daytime = [];
                if (result.docs != "") {
                    result.docs.map(item => {
                        daytime = [...daytime, ...item.appoTime]
                    });
                    day = {
                        date: result.docs[0].date,
                        time: daytime
                    };
                } else {
                    day = {
                        date: moment(date).format().substr(0, 10),
                        time: []
                    };
                }
                arr.push(day);
                date = date + 60 * 60 * 1000 * 24;
            }
            this.appoInfo = arr;
            this.setdata();
        } catch (error) {
            throw error;
        } finally{
            this.isShowLoading = false;
        }
    }
    /**
     *
     *  添加预约信息
     * @param {*} params
     * @param {*} title
     * @param {*} roomId
     * @returns
     * @memberof Room
     */
    async addAppoInfo(params, title, roomId) {
        try {
            let errorArr = [];
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            for (let i = 0; i < params.length; i++) {
               let data = {
                    name: userInfo.name,
                    uid: userInfo.uid,
                    department: userInfo.department,
                    appoTime: params[i].time,
                    roomId: roomId,
                    date:params[i].date,
                    title: title
                }
                let result = await request(urls.addAppoInfo, 'POST', data);
                if (result.code !== 0) {
                    errorArr.push('error')
                }
            };
            if (errorArr.length === 0) {
                return 'ok';
            } else {
                return 'error';
            }
        } catch (error) {
            throw error;
        } finally {

        }
    }
    /**
     *
     * 删除预约
     * @param {*} appoIdarr
     * @returns
     * @memberof Room
     */
    async deleteAppo(appoIdarr) {
        try {
            this.isShowLoading = true;
            let body = {
                "appoId": appoIdarr,
                "status": "1"
            }
            let result = await request(urls.deleteAppo + `?body=${JSON.stringify(body)}`);
            if (result.ok === 1) {
               appoIdarr.forEach(ele => {
                   if (this.myorderInfo.findIndex(item => item.appoId === ele) !== -1) {
                       this.myorderInfo.splice(this.myorderInfo.findIndex(item => item.appoId === ele), 1)
                   }
               });
               return 'ok'
            } else {
                return 'error'
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