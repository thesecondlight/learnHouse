//创建单个图片加载的方法-包成一个promise
const imgPreloader = url => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => {
            resolve('图片加载成功');
        };
        image.onerror = () => {
            reject('图片加载出错');
        };
        image.src = url
    });
}

/**
 * 遍历图片路径，利用promise.all进行并行响应
 * @param imgs 图片路径数组
 * @returns {Promise<unknown[]>}
 */
const allImgPreloader = (imgs) => {
    let promiseArr = []
    imgs.forEach(src => {
        console.log(28, src)
        promiseArr.push(imgPreloader(src))
    })
    return Promise.all(promiseArr)
}

export {
    allImgPreloader
}