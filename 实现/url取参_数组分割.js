/** 题目：
 * url取参
 * 数组中的数据，整数第三位添加逗号，小数反向添加逗号
 * */

let param;

function getParam(key) {
    if (param) return param[key];
    param = [];
    let url = window.location.search;
    // let url = "?payId=1212&yu=1212bhnj&gh="; // 
    url = url.slice(1).split("&");
    for (let i of url) {
        let newItem = i.split("=");
        param[newItem[0]] = newItem.length == 1 ? "" : decodeURIComponent(newItem[1]);
    }
    return param[key];
}
// getParam("payId");

let arr = [16767, 2232323, 3.1212, 41212.1, 5, 6, 7, 8, 9]

// function splitArr(arr, len) {
//     let newArr = [];
//     let index = 0;
//     while (index < arr.length) {
//         newArr.push(arr.splice(index, index + len))
//     }
//     console.log('[ newArr ] ', newArr);
// }
// splitArr(arr, 3);

function addPoint(arr, pos) {
    let newArr = [];
    arr.map((value, index) => {
        value = value.toString()
        if (value.length <= pos) {
            newArr.push(+value)
            return
        }
        if (value.indexOf(".") !== -1) {
            if ((value.substr(value.length - pos, value.length)).indexOf(".") !== -1) {
                pos = pos + 1; //小数点占了一位
            }
            value = value.substr(0, value.length - pos) + "," + value.substr(value.length - pos, value.length)
        } else {
            value = value.substr(0, pos) + "," + value.substr(pos, value.length)
        }
        value = value.split(",");
        value = value.map(item => +item);
        newArr.push(...value);
    })
    console.log('[ arr ] >', newArr);
}
addPoint(arr, 3);

// 数组展开