# Gird

设置主体的宽度和子模块的宽度

##1. `container` & `container-flxed`

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
    
效果就是`container`会去响应设置宽度为多少,而
    
顺序不能乱