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




