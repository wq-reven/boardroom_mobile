import {observable,action} from "mobx";
import { APIHOST} from '../utils/util';
import request from '../utils/request';
import md5 from "md5";

const urls = {
    userLogin: APIHOST + 'user/userLogin',
    userRegister: APIHOST + 'user/userRegister'
};
class User {
    @observable userInfo = {}

    @action.bound
     async userLogin(data){
        try {
            let body = {
                phone: Number(data.phone),
                password: data.password,
                // password: md5(data.password)
            }
            let result = await request(urls.userLogin, 'POST', body);
            if (result.code === 201) {
                let user = JSON.stringify(result.data);
                sessionStorage.setItem('userInfo', user);
                return 'success'
            } else if (result.code === 405 ) {
                return 'nouser'
            } else if (result.code === 505) {
                return 'error'
            } 
        } catch (error) {
            throw error;
        } finally {
            
        }
    }
    async userRegister(user_data) {
        try {
            let result = await request(urls.userRegister + '?body=' + encodeURIComponent(JSON.stringify(user_data)));
            if (result.code === 0) {
                return 'success';
            } else if (result.code === 1) {
                return 'userexist';
            } else {
                return 'error';
            }
        } catch (error) {
            throw error;
        } finally {

        }
    }
}

export default User