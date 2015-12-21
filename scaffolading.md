# Scaffolding

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



