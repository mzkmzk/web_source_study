# Components

这里主要介绍<http://getbootstrap.com/components/#glyphicons>中效果的解析

##1. 图标库

![图标库](QQ20151223-0.png)

在`glyphicons.less`中,

1. 定义字体

    ```less
    @font-face {
      font-family: 'Glyphicons Halflings';
      src: url('@{icon-font-path}@{icon-font-name}.eot');/* IE9*/
      src: url('@{icon-font-path}@{icon-font-name}.eot?#iefix')/* IE6-IE8 */ format('embedded-opentype'),
           url('@{icon-font-path}@{icon-font-name}.woff2') format('woff2'),
           url('@{icon-font-path}@{icon-font-name}.woff') format('woff'),/* chrome、firefox */
           url('@{icon-font-path}@{icon-font-name}.ttf') format('truetype'),/* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
           url('@{icon-font-path}@{icon-font-name}.svg#@{icon-font-svg-id}') format('svg');/* iOS 4.1- */
    }
    
    ```
2. 定义使用字体规范

    ```less
    .glyphicon {
      position: relative;
      top: 1px;
      display: inline-block;//防止字体图标在IE7浏览器显示中图标右侧出现小方框现象
      font-family: 'Glyphicons Halflings';
      font-style: normal;
      font-weight: normal;//防止字体图标的边缘进行模糊
      line-height: 1;
      -webkit-font-smoothing: antialiased;//防止safair或chrome浏览器下被加粗
      -moz-osx-font-smoothing: grayscale;
    }
    ```
    参考链接<http://iconfont.cn/help/iconuse.html>
3. 定义class

    ```less
    .glyphicon-asterisk               { &:before { content: "\002a"; } }
    .glyphicon-plus                   { &:before { content: "\002b"; } }
    ```
    `icon`一般定义在`span`中,定义成`:before`主要是能在前面加文字.你在`<span>`中加`\002a`是不现实的..
4. 使用

    ```html
    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
    ```
    
    `aria-hidden="true"`的意义在于避免屏幕识读设别内容抓取错误.