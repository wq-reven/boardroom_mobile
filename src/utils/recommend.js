import request from './request';
import {APIHOST} from './util';
import moment from "moment";

/**
 * 获取用户最近预约记录
 * @param {*} params 
 */
const getUserRecentlyOrder = async defaultRoom => {
    //生成最近6天日期
    let date1 = moment(new Date()).format().substr(0, 10);
    let date2 = moment(new Date(Date.parse(new Date()) - 60 * 60 * 1000 * 24 * 6)).format().substr(0, 10);
    //获取用户id
    let uid = sessionStorage.getItem('userInfo') ? (JSON.parse(sessionStorage.getItem('userInfo'))).uid : '';
    //查询用户最近6天的预约记录
    let result = await request(APIHOST + `appo/queryAppoInfo?body={"querys":{"uid":"${uid}","date":["${date2}","${date1}"]},"sort":{"key":"createTime","order":"desc"},"pagination":{"current":1,"pageSize":100}}`);
    let recentOrderByRoomId = arrGetType(result.docs);
    let recentRoom = [];
    for (const key in recentOrderByRoomId) {
        recentRoom.push(key);
    };
    defaultRoom.map(item=>{
        if (recentRoom.includes(item.roomId)) {
            item['tag'].push('最近预约');
        }
    });
    return defaultRoom;
}

/**
 * 根据会议室未来两小时内是否有人预约 返回本会议室是否空闲
 * @param {*} docs 
 */
function returnUsableTag(docs) {
    let timeArr = [];
    let nowtime = Date.parse(new Date());
    for (let i = 0; i < 4; i++) {
        let time = (new Date(nowtime)).getHours() + ':' + (Number((new Date(nowtime)).getMinutes()) > 30 ? '30' : '00');
        nowtime = nowtime + 30 * 60 * 1000;
        timeArr.push(time);
    }
    let hasTime = [];
    docs.forEach(room => {
        timeArr.forEach(time => {
            if (room.appoTime.includes(time)) {
                hasTime.push('has');
            }
        })
    });
    if (hasTime.length === 0) {
        return 'usable';
    } else {
        return 'unusable';
    }
}

/**
 *
 * 预约信息按会议室编号分类
 * @param {*} list
 * @param {*} param
 * @returns
 */
function arrGetType(list) {
    let data = {};
    for (let i = 0; i < list.length; i++) {
        if (!data[list[i].roomId]) {
            let arr = [];
            arr.push(list[i]);
            data[list[i].roomId] = arr;
        } else {
            data[list[i].roomId].push(list[i]);
        };
    }
    return data;
}
/**
 * 获取可用会议室
 * 打空闲标签
 * @param {*} allRoom 
 */
async function getUsableRoom(defaultRoom) {
    //生成日期
    let date = moment(new Date()).format().substr(0, 10);
    //获取date日期所有预约
    let result = await request(APIHOST + `appo/queryAppoInfo?body={"querys":{"date":["${date}","${date}"]},"sort":{"key":"createTime","order":"desc"},"pagination":{"current":1,"pageSize":100}}`);
    //对获取的所有预约按会议室编号进行分类
    let appoData = arrGetType(result.docs);
    //循环打‘空闲标签’
    for (let j = 0; j < defaultRoom.length; j++) {
        let room = appoData[defaultRoom[j].roomId] ? appoData[defaultRoom[j].roomId] : [];
        if (returnUsableTag(room) === 'usable') {
            defaultRoom[j]['tag'].push('空闲');
        }
    }
    // for (let j = 0; j < defaultRoom.length; j++) {
    //     let result = await request(APIHOST + `appo/queryAppoInfo?body={"querys":{"roomId":"${defaultRoom[j].roomId}","date":["${date}","${date}"]},"sort":{"key":"createTime","order":"desc"},"pagination":{"current":1,"pageSize":100}}`);
    //     if (returnUsableTag(result.docs) === 'usable') {
    //         defaultRoom[j]['tag'].push('空闲');
    //     }
    // }
    return defaultRoom;
}

/**
 *
 * 根据用户楼层 打‘本层’标签
 * @param {*} usableRoom
 */
function getUsableRoomByFloor(usableRoom) {
    let countroom = usableRoom;
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    countroom
        .forEach(item => {
            if (userInfo.floor === item.roomFloor) {
                item['tag'].push('本层');
            }
        });
    return countroom;
}

function roomSort(list) { 
   let finlist = list.sort(function (a,b) {
       return b.tag.length-a.tag.length
   })
   return finlist
}

/**
 *
 * 导出推荐会议室
 * @export
 * @param {*} allRoom
 * 通过给会议室打标签 标签数量决定推荐优先级
 */
export default async function getRecommend(allCountRoom) {
    let defaultcountRoom = allCountRoom;
    //第一轮过滤 打“空闲”标签
    let usableRoom = await getUsableRoom(defaultcountRoom);
    //若用户登录，则进行二、三轮打标签 若未登录，则跳过
    if (sessionStorage.getItem('userInfo')) {
        // 第二轮打‘本层’标签
        let UsableRoomByFloor = getUsableRoomByFloor(usableRoom);
        // 第三轮打‘最近预约’标签
        let recentOrder = await getUserRecentlyOrder(UsableRoomByFloor);
        // 按标签数量排序
        let sortOrder = roomSort(recentOrder);
        let finalOrder = sortOrder.slice(0,6);
        return finalOrder;
    } else {
        //非登录状态下
        let sortOrder = roomSort(usableRoom);
        let finarr = sortOrder.slice(0, 2);
        return finarr;
    }
}