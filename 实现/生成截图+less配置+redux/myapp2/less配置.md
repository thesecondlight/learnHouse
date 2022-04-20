# 安装less
<!-- ts的那一版 -->
在webpack.config.js中修改如下两个地方，详见React源码学习react-app/ts-react
1.
      {
        loader: require.resolve('less-loader'),
        options: lessOptions
      },
2.添加lessOptions
       const getStyleLoaders = (cssOptions, preProcessor,lessOptions) => {
        const loaders = [
<!-- 高版本 -->
npm i less less-loader
npm run eject  //如果失败，先commit代码
修改webpack.config.js
添加以下代码

```const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

{
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                modules: true,
                sourceMap: isEnvProduction && shouldUseSourceMap
              },
                "less-loader"
              ),
              sideEffects: true
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent
              },
                "less-loader"
              )
            } 
```

<!-- 低版本 -->
就是我这个版本 离谱了，10还算低版本？？
找到 `test: /\.css$/` 将其改为  `test: /\.(css|less)$/`
