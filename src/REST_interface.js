import axios from 'axios';
const host = 'https://dinifarb.duckdns.org:4556';

class REST_interface {
    static isBackendRunning(){
        return new Promise(((resolve, reject) =>
            axios.get(host).then((res) => {
                resolve(
                    res.data
                );
            }).catch((err) => {
                    reject(err);
                }
            )))
    }
    static login(user){
        return new Promise(((resolve, reject) =>
            axios.post(host + '/login', user).then((res) => {
                resolve(
                    res.data
                );
            }).catch((err) => {
                    reject(err);
                }
            )))
    }
    static getCollection(collectionName){
        return new Promise(((resolve, reject) =>
            axios.get(host + '/easyway/collection',{
                headers: {
                    'Collection': collectionName,
                    'Authorization': "Bearer " +
                        sessionStorage.getItem('EAtoken'),
                },
            }).then((res) => {
                resolve(
                    res.data
                );
            }).catch((err) => {
                    reject(err);
                }
            )))
    }

}
export default REST_interface
