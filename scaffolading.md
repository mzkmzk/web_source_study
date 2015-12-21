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


所有元素都是遵循    


