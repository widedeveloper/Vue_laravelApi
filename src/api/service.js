export class Service {
    constructor(enableCaching, cacheId) {
        this.path = "http://localhost:82/api/";
        if (enableCaching) {
            this.cache = new ApiCache(cacheId);
        }
    }

    apiFetch(api, headers, callBack) {
        let url = this.path + api;

        if (this.cache != null && this.cache.hasCache(api)) {
            var json = JSON.parse(this.cache.getCache(api));
            if (callBack) {
                callBack(json);
            } else {
                console.log(json);
            }
            return;
        }
        fetch(url, headers)
            .then(response => response.json())
            .then((json) => {
                // if (this.cache) {
                //     this.cache.setCache(api, JSON.stringify(json));
                // }

                if (callBack) {
                    callBack(json);
                } else {
                    console.log("ASDFASDF",json);
                }
            })
            .catch(error => {
                if (callBack) {
                    callBack(error);
                } else {
                    console.log(error);
                }
            });
    }

    apiPost(api, postData, cb) {
        var pdata = new FormData();
        if (postData) {
            for (let p in postData) {
                pdata.append(p, postData[p]);
            }
        }

        this.apiFetch(api, {
            method: 'post',
            body: pdata
        }, cb)
    }
}

export class ApiCache {
    constructor(cacheId) {
        this.id = cacheId || 'global';
        this.cache = window.localStorage;
    }

    setCache(key, value) {
        this.cache.setItem(this.id + "/" + key, value);
    }

    hasCache(key) {
        return this.getCache(key) != null;
    }

    getCache(key) {
        return this.cache.getItem(this.id + "/" + key);
    }

    removeCache(key) {
        this.cache.removeItem(key);
    }

    clear() {

        let removeKeys = [];


        for (let i = 0; i < this.cache.length; i++) {
            let key = this.cache.key(i);
            if (key.indexOf(this.id + '/') === 0) {
                removeKeys.push(key);
            }
        }

        for (let i = 0; i < removeKeys.length; i++) {
            this.removeCache(removeKeys[i]);
        }

    }
}


export class PersistentData {
    constructor(id) {
        this.id = "PersistentData:" + (id || 'global');
        this.Data = window.localStorage;
    }

    setData(key, value) {
        let dataObject = JSON.stringify({ data: value, type: typeof (value) });
        this.Data.setItem(this.id + "/" + key, dataObject);
    }

    hasData(key) {
        return this.getData(key) != null;
    }

    getData(key) {
        let dataString = this.Data.getItem(this.id + "/" + key);
        if (dataString) {
            return JSON.parse(dataString).data;
        }
        return null;
    }

    removeData(key) {
        this.Data.removeItem(key);
    }

    clear() {

        let removeKeys = [];

        for (let i = 0; i < this.Data.length; i++) {
            let key = this.Data.key(i);
            if (key.indexOf(this.id + '/') === 0) {
                removeKeys.push(key);
            }
        }

        for (let i = 0; i < removeKeys.length; i++) {
            this.removeData(removeKeys[i]);
        }

    }
}


export class getData extends Service{
    constructor(){
        super(true, "getData");
        this.service = 'api_get_data';
        this.persistent = new ApiCache('Account');
        this.token =this.persistent.getCache('token')
    }

    apiFetch(api, vdate, cb){
        
        var pdata = new FormData();console.log("ASDFASDF",vdate)
        pdata.append('vdate', vdate);
        var headers={
            method: 'post',
            body: pdata,
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        }        
        super.apiFetch(this.service + "/" + api, headers, cb);
    }

    getradios(vdate, cb){
        this.apiFetch("radios", vdate,cb);
    }

    getregions(vdate, cb){
        this.apiFetch("regions", vdate,cb);
    }

    getstreams(vdate,cb){
        this.apiFetch("streams", vdate,cb);
    }

    // getProvinces(cb){
    //     this.apiFetch("province", cb);
    // }

    // getHowHear(cb){
    //     this.apiFetch("how-hear", cb);
    // }
}

export class Account extends Service {

    constructor() {
        super();
        this.persistent = new ApiCache('Account');
    }

    get token() {
        return this.persistent.getCache('token');
    }

    get userId() {
        return this.persistent.getCache('userId');
    }

    get name() {
        return this.persistent.getCache('name');
    }

    get email() {
        return this.persistent.getCache('email');
    }


    get isLoggedIn() {
        return this.token != null;
    }

    logout() {
        this.persistent.clear();
    }

    login(email, password, cb) {
        let postBody = {
            email: email,
            password: password
        }

        let query = [];

        for (let p in postBody) {
            query.push(p + "=" + postBody[p]);
        }

        this.apiPost("api_login?" + query.join("&"), "", (json) => {
            this.persistent.clear();
            if (json.token) {
                this.persistent.clear();
                for (var p in json) {
                    this.persistent.setCache(p, json[p]);
                }
            }

            if (cb) {
                cb(this);
            }
        });
    }

}