    //要加载的图片地址,最好选大一点的，效果可以看得更明显
    let imgs = [
        '//yun.duiba.com.cn/spark/assets/a34aab611c43b0626b3491105e463ba20178296e.png',
        '//yun.duiba.com.cn/spark/assets/fbfba28486790d5746176000833ffa61489f30e5.jpg'
    ]
    //遍历图片，生成图片dom,模拟加载
    for (let img of imgs) {
        //生成图片对象
        let image = new Image()
        image.src = img
        console.log('加载中。。请稍等')
        //给图片增加渲染完成事件，是异步的
        image.onload = () => {
            count++
            if (imgs.length === count) { //当渲染个数与图片相同时，所有图片加载完成
                console.log(count, '所有图片渲染完成')
            }
        }
    }