media媒体查询
flex
rem
viewport 移动端适配，设置宽度，缩放值什么的

eg:media 根据不同的屏幕尺寸设置不同的样式
@media:screen and (max-width:300px){
    body{
        width:300px;
        background-color:grey;
    }

}

rem: documentElement.style.fontSize = 100 * (documentElement.clientWidth / 750) + "px"
