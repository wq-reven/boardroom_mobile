/**
 *
 * @param {Strong} url 请求的地址，如果是get请求，会把参数拼在这后面
 * @param {String} method 请求的方式，
 * @param {Object} body 如果是post请求，参数采用object形式传入
 * @return {Promise} 返回一个promise对象。
 * 对于错误的处理，会将返回结果序列化以后抛出去，
 * 对于参数的处理，也要跟后端确认方案以后，统一处理。
 */
export default async function request(url, method = 'GET', body = {}) {
    if (method.toLocaleUpperCase() === 'POST') {
        body = body;
    };
    let response;
    if (method.toLocaleUpperCase() === 'GET') {
        response = await fetch(url, {
            method,
        });
    } else {
        response = await fetch(url, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
    let result = await response.json();
    let code = result.code;
    switch (code) {
        case 0:
            return result.data;
            break;
        case 1:
            return result.data;
            break;
        case 200:
            return result.data;
            break;
        case -1:
            alert(result.msg);
            throw new Error(JSON.stringify(result));
            break;
        case 502:
            alert('系统错误');
            throw new Error(JSON.stringify(result));
            break;
        case 405:
            return result;
            break;
        case 505:
            return result;
            break;
        case 201:
            return result;
            break;
        default:
            throw new Error(JSON.stringify(result));
            break;
    }
}