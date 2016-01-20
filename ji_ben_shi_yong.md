# 基本使用

预览图

![Lory预览图](QQ20160120-1.png)
##1. 下载插件

`git clone git@github.com:meandmax/lory.git`

把`lory/demo/js/lory.js`和`lory/demo/vendor/highlight.js`放到项目中.

##2. 大概的html结构

```html
 <div class="slider js_slider">
    <div class="frame js_frame">
        <ul class="slides js_slides">
            <li class="js_slide">1</li>
            <li class="js_slide">2</li>
            <li class="js_slide">3</li>
            <li class="js_slide">4</li>
            <li class="js_slide">5</li>
            <li class="js_slide">6</li>
        </ul>
    </div>
</div>
            
```

1. 第一层`js_slider`的作用是把轮播框架整体定位.
2. 第二层`js_frame`是把内部框架定位,主要为了帮左右按钮定位.
3. 第三层`js_slides`主要里面放重要的轮播元素li

##3. CSS定义

```CSS
.slider {}

.frame {
    /**
     * (optional) wrapper width, specifies width of the slider frame.
     */
    width: 880px;

    position: relative;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    white-space: nowrap;
}

.slides {
    display: inline-block;
}

li {
    position: relative;
    display: inline-block;

    /**
     * (optional) if the content inside the slide element has a defined size.
     */
    width: 880px;
}
```

