// 节流，执行第一次
function _throttle(fun, time = 2000) {
    let lasttime, timer;
    return () => {
        let now = new Date();
        if (lasttime && now < lasttime + time) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                lasttime = now; //last12 下一次now16 >1+2 进入else
            }, time);
        } else {
            lasttime = now;
            fun.apply(this, arguments);
        }
    }
}



function flagThrottle(fun, time = 2000) {
    let flag = true;
    return () => {
        if (!flag) return;

        flag = false;
        setTimeout(() => {
            fun.apply(this, arguments);
            flag = true;
        }, time)

    }

}

// 防抖 执行最后一次
function _debounce(fun, time) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun.apply(this, arguments);
        }, time)
    }
}

/**
 * 大连周水子机场
 * 大连金水机场 
 * 
 */

let urlParams; //存储所有的参数
function getUrlParams(key) {
    if (urlParams) return urlParams[key];
    urlParams = {};
    let search = window.location.search; //当前frame 的链接
    try {
        search = top.location.search; //获取顶层frame 的链接
    } catch (e) {}
    //获取链接参数
    for (let item of search.replace('?', '').split('&')) {
        let arr = item.split('=');
        urlParams[arr[0]] = arr.length === 1 ? '' : decodeURIComponent(arr[1]);
    }
    console.log('[ url ] >', urlParams)
    return urlParams[key];
}


//test
let keyArr;

function getpar(key) {
    if (keyArr) return keyArr[key];
    keyArr = [];
    let search = window.location.search;
    // let search = "?bycnds=1212nj&bshdjnsd=1212&id="
    search = search.replace("?", "").split("&");
    for (let item of search) {
        item = item.split("=");
        keyArr[item[0]] = item.length == 1 ? "" : decodeURIComponent(item[1])
    }
    return keyArr[key];
}
// getpar("id");
function demo(fun, time) {
    return () => {
        fun.apply(this)
    }
}

function clg() {
    console.log('[ 我是一个console.log ] >')
}
demo(clg(), 2000)