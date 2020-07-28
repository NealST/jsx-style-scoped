# jsx-style-scoped

## Description  
    
> jsx-style-scoped提供jsx编码模式下进行样式隔离的最佳解决方案，你可以告别css in js, css modules等不够优雅的开发方式。jsx-style-scoped提供了两个webpack-loader,分别是处理jsx或者tsx的scope-jsx-loader和处理样式文件的scope-css-loader。

## Install

> 使用之前需要先安装两个loader:  

```
npm i scope-jsx-loader --save-dev

npm i scope-css-loader --save-dev
```

## Usage

> 需要在webpack配置中进行使用，示例如下: 

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts(x?)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          },
          {
            loader: 'scope-jsx-loader'
          }
        ],
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'scope-css-loader'
          }
        ],
      }
    ]
  }
}
```

## TODO

* 增加其他构建工具的支持

## Contributing 

NealST(email: m13710224694@163.com)