# start

1. 本地项目目录安装
    ```sh
    # 如果使用webpack 4+ 版本，还需要安装 CLI
    mkdir webpack-demo && cd webpack-demo
    npm init -y
    npm install webpack webpack-cli --save-dev
    ```
2. 在package.json文件中配置快捷启动
    ```js
    {
        "scripts": {
            "start": "webpack --config webpack.config.js"
        }
    }
    ```
3. 建立基本目录结构
    ```files
    /root
        /dist
        /src
        package.json
        webpack.config.js
        index.html
    ```