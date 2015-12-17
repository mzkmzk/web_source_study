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
3. 继承`.cleafix`的所有样式.(`.cleafix`作用:清楚浮动,参考<http://zh.learnlayout.com/clearfix.html>)
        
    
顺序不能乱