import {
    observable,
    computed,
    action
} from "mobx";
import {
    APIHOST
} from '../utils/util';
import request from '../utils/request';
import moment from 'moment';

const urls = {
    getAPPOInfo: APIHOST + 'appo/queryAppoInfo'
};

class Appo {
    @observable appoInfo = []
    @observable countTime = [
        {
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
    @action.bound
    async getAppoInfoByTime() {
        try {
            let date = new Date().setHours(6, 0, 0, 0);
            let starttime = moment(date).format().substr(0, 10);
            let endtime = moment(date + 60 * 60 * 1000 * 24 * 5).format().substr(0, 10);
            let result = await request(urls.getAPPOInfo + `?body={"querys":{"roomId":"702B02","date":["${starttime}","${endtime}"]},"sort":{},"pagination":{"current":1,"pageSize":100}}`);
            console.log(result.docs)
        } catch (error) {

        } finally {

        }
    }
    async getAppoInfo(roomId) {
        try {
            let date = new Date().setHours(6, 0, 0, 0);
            let arr = [];
            let appotime = ""
            for (let i = 0; i < 7; i++) {
                appotime = moment(date).format().substr(0, 10)
                let result = await request(urls.getAPPOInfo + `?body={"querys":{"roomId":"${roomId}","date":"${appotime}"},"sort":{},"pagination":{"current":1,"pageSize":100}}`);
                let day = {}
                let daytime = []
                if (result.docs != "") {
                    result.docs.map(item => {
                        daytime = [...daytime, ...item.appoTime]
                    })
                    day = {
                        date: result.docs[0].date,
                        time: daytime
                    }
                } else {
                    day = {
                        date: moment(date).format().substr(0, 10),
                        time: []
                    }
                }
                arr.push(day)
                date = date + 60 * 60 * 1000 * 24;
            }
            console.log(arr)
            this.appoInfo = arr
        } catch (error) {
            console.log(error)
        }
    }
    setdata() {
    
         let Alldata = [];
         let timedate = {};
         let datedata = [];
         let todadate = {};
        for (let i = 0, len = this.appoInfo.length; i < len; i++) {
             datedata = []
             for (let j = 0; j < this.countTime.length - 1; j++) {
                 console.log(this.countTime[j])
                //  timedate = {}
                //  timedate = {
                //      key: this.countTime[j].key,
                //      time: this.countTime[j].time,
                //      id: this.date[i].id,
                //      value: this.date[i].value,
                //      status: this.randomNum()
                //  }
                //  datedata.push(timedate)
             }
            //  todadate = {
            //      id: this.date[i].id,
            //      value: this.date[i].value,
            //      time: datedata
            //  }
            //  Alldata.push(todadate)
         }
         //console.log(Alldata);
        //  this.countRoomdata = Alldata
    }

}

export default Appo