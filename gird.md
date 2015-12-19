# Gird

设置主体的宽度和子模块的宽度

##1. `container` & `container-fluid`

    .container {
        .container-fixed();

        @media (min-width: @screen-sm-min) {
            width: @container-sm;
        }
         @media (min-width: @screen-md-min) {
            width: @container-md;
        }
        @media (min-width: @screen-lg-min) {
            width: @container-lg;
        }
    }
    
    .container-fluid {
        .container-fixed();
    }
    
效果就是`container`会去响应设置宽度为多少,

而`container-flxed`则默认100%.

`.container-fixed()`执行代码

        .container-fixed(@gutter: @grid-gutter-width) {
            margin-right: auto;
            margin-left: auto;
            padding-left:  floor((@gutter / 2));
            padding-right: ceil((@gutter / 2));
            &:extend(.clearfix all);
        }
1. `margin-lef/right:auto`设置居中 
2. 设置`padding`
3. 继承`.cleafix`的所有样式.(`.cleafix`主要作用:清除浮动,参考<http://zh.learnlayout.com/clearfix.html>)

##2. `.row`

    // Creates a wrapper for a series of columns
    .make-row(@gutter: @grid-gutter-width) {
      margin-left:  ceil((@gutter / -2));
      margin-right: floor((@gutter / -2));
      &:extend(.clearfix all);
    }
    
    主要是清除浮动和设置间距
    
##3. `col-@{type}-@{index}`

`type`主要有`xs` & `sm` & `md` & `lg`

`index` 有`1~12(默认)`

``

Bootstrap如何生成这么多class?

    .make-grid-columns() {
      .col(@index) { // initial
        @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
        .col((@index + 1), @item);
      }
      .col(@index, @list) when (@index =< @grid-columns) { // general; "=<" isn't a typo
        @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
        .col((@index + 1), ~"@{list}, @{item}");
      }
      .col(@index, @list) when (@index > @grid-columns) { // terminal
        @{list} {
          position: relative;
          // Prevent columns from collapsing when empty
          min-height: 1px;
          // Inner gutter via padding
          padding-left:  ceil((@grid-gutter-width / 2));
          padding-right: floor((@grid-gutter-width / 2));
        }
      }
      .col(1); // kickstart it
    }

`note ~代表避免LESS错误的编译`

这个程序从最后一行开始执行.

首先`.col(@index)`把所有类型都写一次,其实这里的index就是1,这个函数也只执行一遍,

然后`col-@type-2~12`的`class`名字都通过第二个`.clo(...)`函数生成的.

最后一个`.clo(...)`的@list代表给前面生成的`col-@{type}-@{index}`设置定位方式和间距.

好了,基于样式定好了,怎么给`type`定义具体的宽度和漂浮呢

    .make-grid(xs);
    @media (min-width: @screen-sm-min) {
        .make-grid(sm);
    }
    @media (min-width: @screen-md-min) {
        .make-grid(md);
    }
    @media (min-width: @screen-lg-min) {
        .make-grid(lg);
    }
    
这里可能是为了省性能?.根据不同的尺寸生成特定的`class`

    .make-grid(@class) {
      .float-grid-columns(@class);
      .loop-grid-columns(@grid-columns, @class, width);
      .loop-grid-columns(@grid-columns, @class, pull);
      .loop-grid-columns(@grid-columns, @class, push);
      .loop-grid-columns(@grid-columns, @class, offset);
    }
    
这里`.float-grid-columns(@class)`和`.make-grid-columns()`实现方式是类似的,`.float-grid-columns(@class)`只是为了给特定的`col-@{type}-@{index}`设置一个`float: left`

其实这里我不明白为什么一开始要`.make-grid-columns()`,这个方法我觉得是可以和`.float-grid-columns(@class)`合在一起的?.

    .calc-grid-column(@index, @class, @type) when (@type = width) and (@index > 0) {
      .col-@{class}-@{index} {
        width: percentage((@index / @grid-columns));
      }
    }
    .calc-grid-column(@index, @class, @type) when (@type = push) and (@index > 0) {
      .col-@{class}-push-@{index} {
        left: percentage((@index / @grid-columns));
      }
    }
    .calc-grid-column(@index, @class, @type) when (@type = push) and (@index = 0) {
      .col-@{class}-push-0 {
        left: auto;
      }
    }
    .calc-grid-column(@index, @class, @type) when (@type = pull) and (@index > 0) {
      .col-@{class}-pull-@{index} {
        right: percentage((@index / @grid-columns));
      }
    }
    .calc-grid-column(@index, @class, @type) when (@type = pull) and (@index = 0) {
      .col-@{class}-pull-0 {
        right: auto;
      }
    }
    .calc-grid-column(@index, @class, @type) when (@type = offset) {
      .col-@{class}-offset-@{index} {
        margin-left: percentage((@index / @grid-columns));
      }
    }
    
这里可以看出来`col`的宽度百分比设置,`push` & `pull` 通过`left` & `right` 实现的,然后`offset`则是通过`margin-left`实现的.










        