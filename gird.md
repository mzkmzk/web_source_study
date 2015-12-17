# Gird

设置主体的宽度和子模块的宽度

响应式主要代码

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