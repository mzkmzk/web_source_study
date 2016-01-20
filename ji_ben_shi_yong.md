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

        var lory_one = lory(slider, {
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


##5. 事件触发

为了让开发者更好的控制轮播,Lory提供了7个API

| 属性        | 作用             |
|-------------|------------------|
| prev        | 上一张           |
| next        | 下一张           |
| sideTo      | 直接到第几张     |
| returnIndex | 返回当前元素的li |
| setup       | 初始化           |
| reset       | 重置             |
| destory     | 销毁             |

但是我们应该怎么调用它呢

```javascript
 var lory_one = lory(slider, {
    // options going here
});
lory_one.prev();
```
##6. 事件监听

```javascript
var events = document.querySelector('.js_slider');
events.addEventListener('before.lory.init', handleEvent);
events.addEventListener('after.lory.init', handleEvent);
events.addEventListener('before.lory.slide', handleEvent);
events.addEventListener('after.lory.slide', handleEvent);
events.addEventListener('on.lory.resize', handleEvent);
events.addEventListener('on.lory.touchend', handleEvent);
events.addEventListener('on.lory.touchmove', handleEvent);
events.addEventListener('on.lory.touchstart', handleEvent);
events.addEventListener('on.lory.destroy', handleEvent);
```
##7. 源码分析

里面最主题是一个lory类

`export function lory (slider, opts) {...}`

第一个参数为要轮播的框架,第二个就是配置信息了.

里面定义了什么方法?.

##7.1 setup().

在方法的头尾分别放上了

```javascript
dispatchSliderEvent('before', 'init');
dispatchSliderEvent('after', 'init');
```
用来提供事件监听的接口.

里面主要放的是事件的监听方法.

##7.2 slide(nextIndex,direction)

作用轮播框架,滑动是最主要的方法.

参数:

1. nextIndex 用来指明要调到第几张的参数.
2. 判断上/下.

看看在框架中,别的方法是如何调用它的

```javascript
function slideTo (index) {
    slide(index);
}

function prev () {
    slide(false, false);
}

function next () {
    slide(false, true);
}
```
从方法调用看,我们猜测的参数作用是对的

轮播时,会把所有li都放在ul里,所以我们要控制的是ul要显示的哪一段的范围,这是核心的关键.

以正常的next且infinite为false的情况下跑一边思路

```javascript
//因为next时direction参数为true,index代表当前显示元素+1
const nextSlide = direction ? index + 1 : index - 1;

//获取全部li的总宽度,方便轮播到最后时做处理.
const maxOffset = Math.round(slidesWidth - frameWidth);

//nextIndex的指向第nextIndex个li处.
nextIndex = index + slidesToScroll;

//里面的max为了pre到第一个的时候显示第0个,外面的min为了到最后一个的时候 显示最后一个.
nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);

//nextOffset一般为负值,负的宽度等于在轮播li隐藏前面li的宽度.
//这里的min和max和上一处同理.
let nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);

//当定位超过最大宽度,返回第一张.
if (rewind && Math.abs(position.x) === maxOffset && direction) {
    nextOffset = 0;
    nextIndex = 0;
    duration = rewindSpeed;
}

//移动
translate(nextOffset, duration, ease);

```

当然他的轮播方式有好几种,我这里只列举最简单的.但是原理都类似


