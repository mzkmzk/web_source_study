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
3. 定义class