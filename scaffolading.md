# Scaffolding

##1 全局基本设置

主要设置`Bootstrap`的前面准备工作.

    * {
      .box-sizing(border-box);
    }
    *:before,
    *:after {
      .box-sizing(border-box);
    }
    
    .box-sizing(@boxmodel) {
        -webkit-box-sizing: @boxmodel;
        -moz-box-sizing: @boxmodel;
        box-sizing: @boxmodel;
    }


所有元素都是遵循`border-box`原则

即标签设定了`width`,然后再设定`padding`和`border`都会计算在`width`以内.

    html {
      font-size: 10px;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    
`-webkit-tap-highlight-color`作用于手机端,`Android`和`iOS`会有点击高亮效果,这句就表明所有点击效果都显示白色.


    
    body {
      font-family: @font-family-base;
      font-size: @font-size-base;
      line-height: @line-height-base;
      color: @text-color;
      background-color: @body-bg;
    }
设置全局字体属性和背景颜色.
    
    // Reset fonts for relevant elements
    input,
    button,
    select,
    textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

常用的表单元素的字体属性都遵从父元素


##2 全局a标签设置

    a {
      color: darken(#428bca, 6.5%);
      text-decoration: none;
    
      &:hover,
      &:focus {
        color: darken(@link-color, 15%);
        text-decoration: @link-hover-decoration;
      }
    
      &:focus {
        .tab-focus();
      }
    }
    
    .tab-focus() {
      // Default
      outline: thin dotted;
      // WebKit
      outline: 5px auto -webkit-focus-ring-color;
      outline-offset: -2px;
    }


a标签主要效果

1. 设置链接颜色
2. 取消无效果的下划线
3. `foces` & `hover` 时颜色加亮,下划线出现
4. 设置`focus`时,默认定义细轮廓 点状 ,边框偏移-2px(往内)


##3 全局图片设置

![图片效果](QQ20151221-9.png)

    img {
      vertical-align: middle;
    }

设置图片基于父元素的中部基线
    
    // Responsive images (ensure images don't scale beyond their parents)
    .img-responsive {
      .img-responsive();
    }
    
    
    .img-responsive(@display: block) {
      display: @display;
      max-width: 100%; // Part 1: Set a maximum relative to the parent
      height: auto; // Part 2: Scale the height according to the width, otherwise you get stretching
    }
    
响应式图片,独占一行,能按比例缩小.
    
      // Rounded corners
    .img-rounded {
      border-radius: 6px;
    }

有一丢丢圆角...
    
    // Perfect circle
    .img-circle {
      border-radius: 50%; // set radius in percents
    }
    
通过50%实现圆形显示    
    
    // Image thumbnails
    //
    // Heads up! This is mixin-ed into thumbnails.less for `.thumbnail`.
    .img-thumbnail {
      padding: 4px;
      line-height: 1.428571429;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      .transition(all .2s ease-in-out);
    
      // Keep them at most 100% wide
      .img-responsive(inline-block);
    }
    
 设置了`padding`和外壳线,做了一个过渡特效.小圆角.
 
 值得注意的是,这个类的响应式图片是块状且可计算的.
 
 
##4. 杂项

    hr {
      margin-top:    20px;
      margin-bottom: 20px;
      border: 0;
      border-top: 1px solid #eee;
    }

hr线重定义

    // Only display content to screen readers
    //
    // See: http://a11yproject.com/posts/how-to-hide-content/
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0,0,0,0);
      border: 0;
    }
    
    // Use in conjunction with .sr-only to only display content when it's focused.
    // Useful for "Skip to main content" links; see http://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1
    // Credit: HTML5 Boilerplate
    
    .sr-only-focusable {
      &:active,
      &:focus {
        position: static;
        width: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        clip: auto;
      }
    }
    
作用未知



    [role="button"] {
      cursor: pointer;
    }

定义`[role='button]`鼠标变指针