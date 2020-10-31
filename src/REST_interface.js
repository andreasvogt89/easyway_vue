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
    static postToCollection(collectionName, item){
        return new Promise(((resolve, reject) =>
            axios.post(host + '/easyway/add',item,{
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
    static deleteItemInCollection(collectionName, itemId){
        return new Promise(((resolve, reject) =>
            axios.delete(host + '/easyway/delete/'+ itemId,{
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
    static changeItemInCollection(collectionName, itemId, item){
        return new Promise(((resolve, reject) =>
            axios.put(host + '/easyway/change/'+ itemId,{
                headers: {
                    'Collection': collectionName,
                    'Authorization': "Bearer " +
                        sessionStorage.getItem('EAtoken'),
                },
                item
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
