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
    labelCol: { span: 8, offset: 2 },
    wrapperCol: { span: 11 },
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

export const returnFloorByDepartment = department => {
    let data = {
        "产品研发部": 7,
        "课程部": 3,
    }
    return data[department];
};

export const APIHOST = 'http://192.168.4.158:3100/';