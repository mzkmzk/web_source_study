# Type

`type.less`主要设置了字体

##1. 字体

###1.1 标题

![标题效果](QQ20151221-0.png)

代码

    h1, h2, h3, h4, h5, h6,
    .h1, .h2, .h3, .h4, .h5, .h6 {
      font-family: @headings-font-family;
      font-weight: @headings-font-weight;
      line-height: @headings-line-height;
      color: @headings-color;
    
      small,
      .small {
        font-weight: normal;
        line-height: 1;
        color: @headings-small-color;
      }
    }
    
    h1, .h1,
    h2, .h2,
    h3, .h3 {
      margin-top: @line-height-computed;
      margin-bottom: (@line-height-computed / 2);
    
      small,
      .small {
        font-size: 65%;
      }
    }
    h4, .h4,
    h5, .h5,
    h6, .h6 {
      margin-top: (@line-height-computed / 2);
      margin-bottom: (@line-height-computed / 2);
    
      small,
      .small {
        font-size: 75%;
      }
    }
    
    h1, .h1 { font-size: @font-size-h1; }
    h2, .h2 { font-size: @font-size-h2; }
    h3, .h3 { font-size: @font-size-h3; }
    h4, .h4 { font-size: @font-size-h4; }
    h5, .h5 { font-size: @font-size-h5; }
    h6, .h6 { font-size: @font-size-h6; }

1. 设置了默认的字体,字体粗细,行高,粗细
2. `margin`和`small`在`h1~h3` & `h4~h6` 做了不同的配置

###1.2 内容字体

    p {
      margin: 0 0 (@line-height-computed / 2);
    }
    
    .lead {
      margin-bottom: @line-height-computed;
      font-size: floor((@font-size-base * 1.15));
      font-weight: 300;
      line-height: 1.4;
    
      @media (min-width: @screen-sm-min) {
        font-size: (@font-size-base * 1.5);
      }
    }
    
1. `p`标签设置了基本的`margin`和`h4~h6`的一致
2. `.read`主要味儿了提供阅读做了

    
    
    







