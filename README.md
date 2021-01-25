# electron-template
本项目基于 electron-forge 实现模板，覆盖基本的桌面应用通用功能实现

具体有：打包、创建快捷方式、自启动、更新代码，设置 控制面板->程序与功能 中图标、生成安装程序图标、免安装版exe图标

使用前准备：

1、查看 npm 源

npm config get registry

2、如果不是国内源、设置为淘宝源【可以设置为其他国内源】

npm config set registry https://registry.npm.taobao.org

3、设置 electron 国内源 【可选】

如果用户发现没有设置此步骤之后 electron 下载过慢，可以设置此步骤，将 electron 镜像改为 淘宝源

npm config set electron_mirror https://npm.taobao.org/mirrors/electron/

使用方式：

1、下载项目

git clone https://github.com/baiyuting/electron-template.git

2、进入项目

cd electron-template

3、安装依赖包

npm install

4、打包 out目录下 make 中是安装包， xx-win32-x64 中是免安装程序包

npm run make
