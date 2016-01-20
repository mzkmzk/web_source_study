# 基本使用

预览图

![Lory预览图](QQ20160120-1.png)
##1. 下载插件

`git clone git@github.com:meandmax/lory.git`

把`lory/demo/js/lory.js`和`lory/demo/vendor/highlight.js`放到项目中.

##2. html结构

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

```css
.slider {}

.frame {
    /**
     * (optional) wrapper width, specifies width of the slider frame.
     */
    width: 880px;

    position: relative;
    font-size: 0;
    line-height: 0;
    overflow: hidden;/*由于所有元素都在一个ul中,对超出指定宽度(此CSS为880),隐藏元素.*/
    white-space: nowrap;/*强制文本在一行中显示,除非遇到br*/
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

定义也是主要的刚才3层加上`li`

1. .slider{}里面可以定义具体轮播的显示位置问题
2. .frame{}给轮播框架定制了宽度
3. .slides的inline-block是为了让更多的li都放在一行并可计算宽度
4. li和.slider设置类似.并且可以设置宽度

##4. JS设置

```javascript
<script>
    hljs.initHighlightingOnLoad();
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var slider = document.querySelector('.js_slider');

        lory(slider, {
            // options going here
        });
    });
</script>
```

整理来说设置比较简单,使用严格模式的ES6,和添加的时间监听.

先获取最外部的轮播框类,然后lory里可以设置详细的东西

但是大家都看到了lory里的第二个参数为空的.可以设置什么参数呢?

| 属性                    | 说明                                      | 默认值                      |
|-------------------------|-------------------------------------------|-----------------------------|
| slidesToScroll          | 自动轮播几次                              | 1                           |
| infinite                | 类似传送带,你想后面重复多少个最前面的li   | false(不能和rewind一起使用) |
| enableMouseEvents       | 是否鼠标左右拖动                          | false                       |
| rewind                  | 最后一页直接滚回第一张(可以看到中间li)    | false                       |
| slideSpeed              | 动画滑动间的间隔                          | 300                         |
| rewindSpeed             | 设置了rewind,从最后一张滚回到第一张的时间 | 600                         |
| snapBackSpeed           | 当滑动被打断,返回原状的时间               | 200                         |
| ease                    | 滑动的形式http://easings.net/de           | ease                        |
| classNameFrame          | 默认包含ul框架的元素名称                  | js_frame                    |
| classNameSlideContainer | 默认ul框架的元素名称                      | js_slides                   |
| classNamePrevCtrl       | 左按钮                                    | js_prev                     |
| classNameNextCtrl       | 右按钮                                    | js_next                     |


##5. 时间触发

为了让开发者更好的控制轮播,Lory提供了7个API

