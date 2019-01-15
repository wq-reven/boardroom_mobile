import moment from 'moment';

export const enums = {

};

export const dataTypes = {
    createTime: 'DatePicker',
    registerTime: 'DatePicker'
};

export const formatViewData = (key, values) => {
    if (enums[key]) {
        let result = [];
        if (typeof values === 'string') {
            values = values.split(',');
        } else if (typeof values === 'number' || typeof values === 'boolean') {
            values = [values];
        }
        for (let value of values) {
            for (let item of enums[key]) {
                if (item.value === value) {
                    result.push(item.label);
                }
            }
        }
        return result.join(',');
    } else if (dataTypes[key] === 'DatePicker') {
        return moment(values).format('YYYY-MM-DD HH:MM');
    } else {
        return values;
    }
};

export const formatFormData = values => {
    let result = {};
    Object.keys(values).forEach(key => {
        if (typeof values[key] !== 'undefined') {
            if (values[key] instanceof moment) {
                result[key] = values[key].valueOf();
            } else {
                result[key] = values[key];
            }
        }
    });
    return result;
};


export const formItemLayout = {
    labelCol: {
        span: 8,
        offset: 2
    },
    wrapperCol: {
        span: 11
    },
};

export const returnRoomPosition = roomId => {
    let data = {
        "702B01": "七楼第一会议室",
        "702B02": "七楼第二会议室",
        "702B03": "七楼第三会议室",
        "702B04": "七楼第四会议室",
        "502B01": "五楼第一会议室",
        "502B02": "五楼第二会议室",
    }
    return data[roomId];
};

export const returnDepartment = [{
        label: "产品研发部",
        value: '产品研发部',
        floor: 3
    },
    {
        label: "课程部",
        value: '课程部',
        floor: 3
    },
    {
        label: "渠道部",
        value: '渠道部',
        floor: 3
    },
    {
        label: "简教练运营部",
        value: '简教练运营部',
        floor: 3
    },
    {
        label: "简而优运营部",
        value: '简而优运营部',
        floor: 3
    },
    {
        label: "智慧课堂部",
        value: '智慧课堂部',
        floor: 5
    },
    {
        label: "网络营销部",
        value: '网络营销部',
        floor: 3
    },
    {
        label: "综合&财商部",
        value: '综合&财商部',
        floor: 5
    },
    {
        label: "简单学习网",
        value: '简单学习网',
        floor: 5
    },
    {
        label: "品牌市场部",
        value: '品牌市场部',
        floor: 5
    },
]

export const returnFloorByDepartment = department => {
    // let data = {
    //     "产品研发部": 7,
    //     "课程部": 3,
    //     "渠道部": 3,
    //     "简教练运营部": 3,
    //     "简而优运营部": 3,
    //     "智慧课堂部": 5,
    //     "网络营销部": 3,
    //     "综合&财商部": 5,
    //     "简单学习网": 5,
    //     "品牌市场部": 5
    // }
    // return data[department];
    let resdepartment = "";
    let data = returnDepartment;
    data.forEach(item=>{
        if (item.label === department) {
            resdepartment = item.floor
        }
    })
    return resdepartment
};



export const returnGridColor = appoId => {
    let colordata = [
        "94cc8c",
        "cb8b84",
        "e7be94",
        "f0dc9e",
        "caa8e2",
        "b1f4dd"
    ]
    return colordata[Math.floor(Math.random() * 5)]
}

/**
 * cookie操作
 */
export const dealCookie = {
    set: function (key, val, time) { //设置cookie方法
        var date = new Date(); //获取当前时间
        var expiresDays = time; //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString(); //设置cookie
    },
    get: function (key) { //获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");
        var arrCookie = getCookie.split(";")
        var tips; //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");
            if (key == arr[0]) {
                tips = arr[1];
                break;
            }
        }
        return tips;
    },
    del: function (key) { //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" + date.toGMTString(); //设置cookie
    }
}

//获取地址栏参数
export function getUrlParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 渲染会议结束时间
 * @param {*} time
 */
export function renderCountEndTime(time) {
    let timearr = time.split(':');
    let endtime = timearr[1] === '00' ?
        timearr[0] + ':30' :
        timearr[1] === '30' ?
        (Number(timearr[0]) + 1) + ':00' : '';
    return endtime;
}
export const APIHOST = 'http://39.105.12.145:3100/';
// export const APIHOST = 'http://192.168.4.113:3100/';
