/*
将此文件放到project/config/scripts/assets/目录下
在package.json文件的"scripts"字段下，分别修改dev和build命令：
"dev": "node ./config/scripts/assets/generateAssetList.js && node ./config/webpack.dev.config.js"
"build": "node ./config/scripts/assets/generateAssetList.js && node ./config/scripts/assets/index.js imgmin imgup && node ./config/webpack.prod.config.js"
*/

const fs = require('fs')
const path = require('path')

// 读资源目录
const imgList = searchFileFromFolder('/imgs', /\.(png|jpg|jpeg)$/i);
// const svgaList = searchFileFromFolder('/src/assets', /\.svga$/i);
function searchFileFromFolder(folderPath, regExp) {
    const fileList = []
    const searchOneDir = (absolutePath, relativePath) => {
        fs.readdirSync(absolutePath).forEach(v => {
            let absPath = absolutePath + '/' + v;
            let relPath = relativePath ? relativePath + '/' + v :  v;
            if(fs.statSync(absPath).isFile()) {
                regExp.test(v) && fileList.push(relPath);
            }else {
                searchOneDir(absPath, relPath);
            }
        });
    }
    searchOneDir(path.resolve('.') + folderPath, '');
    return fileList;
}
// console.log('imgList', imgList, imgList.length);
// console.log('svgaList', svgaList, svgaList.length);

// 写资源列表json
fs.writeFileSync(path.resolve('.') + '/imgList.json', JSON.stringify(imgList))
// fs.writeFileSync(path.resolve('.') + '/src/svgaList.json', JSON.stringify(svgaList))