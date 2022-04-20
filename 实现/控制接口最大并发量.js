// https://blog.csdn.net/weixin_44116302/article/details/109803289
// 问题： 接口请求最大并发量控制
// 1.0 这个看得懂，下面的方法看不懂
function fetch(url) {
    // 模拟接口请求
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(url)
        }, 10000 * Math.random())
    })
}
/**
 * 接口请求最大并发量控制
 * @param { Array } urls 接口请求地址数组集合
 * @param { Number } max 最大并发量
 * @param { Function } callback 回调函数 
 */
function maxRequestLimit(urls, max, callback) {
    // 如果没有传入urls或max则不继续执行
    if (!urls || !max) return

    // 当请求地址数组集合长度为0，则执行回调函数（如果有的话），并结束后续执行
    if (urls.length === 0) {
        if (callback) callback()
        return
    }

    // 使用splice方法返回当前要使用的请求集合，同时删除原有的请求集合
    const onceMaxUrlArr = urls.splice(0, max)

    // 进行map转换，将url参数转换为promise
    const onceMaxFetchArr = onceMaxUrlArr.map(url => fetch(url))

    // 使用当前这一队列
    Promise.all(onceMaxFetchArr)
        .then(res => {
            console.log(res)
            // 递归请求
            maxRequestLimit(urls, max, callback)
        })
}

maxRequestLimit(['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8'], 3, () => {
    console.log('fetch end')
})


// 看不懂
function fetch(url) {
    // 模拟接口请求
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(url)
        }, 10000 * Math.random())
    })
}

/**
 * 2.0
 * 接口请求最大并发量控制
 * @param { Array } urls 接口请求地址数组集合
 * @param { Number } max 最大并发量
 * @param { Function } callback 回调函数 
 */
function maxRequestLimit(arr, max, callback) {
    // 如果没有传入urls或max则不继续执行
    if (!arr || !max) return

    // 当请求地址数组集合长度为0，则执行回调函数（如果有的话），并结束后续执行
    if (arr.length === 0) {
        if (callback) callback()
        return
    }

    let fetchArr = [], // 存储并发max的promise数组
        i = 0;

    function toFetch() {
        // 所有的请求都受理，则返回一个resolve
        if (i === arr.length) return Promise.resolve()

        // 取出第i个url， 放入fetch里面 , 每取一次i++
        let one = fetch(arr[i++])

        //将当前的promise存入并发数组中
        fetchArr.push(one)

        // 当promise执行完毕后，从数组删除
        one.then(res => {
            console.log(res)
            fetchArr.splice(fetchArr.indexOf(one), 1)
        })

        let p = Promise.resolve()

        // 当并行数量达到最大后， 用race比较 第一个完成的， 然后再调用一下函数自身。
        if (fetchArr.length >= max) p = Promise.race(fetchArr)

        return p.then(() => toFetch())
    }

    // arr循环完后， 现在fetchArr里面剩下的promise对象， 使用all等待所有的都完成之后执行callback
    toFetch()
        .then(() => Promise.all(fetchArr))
        .then(() => callback())
}


maxRequestLimit(['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8'], 3, () => {
    console.log('fetch end')
})