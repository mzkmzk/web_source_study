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

    1. `margin-btoom`和`h1~h3`一致
    
    2. 增加了字体大小和粗细还有行间距

    3. 小分辨率下增加文字大小.
    
##1.3 辅助性文字

1. 普通`small`
    
        // Ex: (12px small font / 14px base font) * 100% = about 85%
        small,
        .small {
          font-size: floor((100% * @font-size-small / @font-size-base));
        }

    再看一下`@font-size-small`的设置

        @font-size-small: ceil((@font-size-base * 0.85)); // ~12px

    所以small一般为父元素的百分之85%~..

2. `mark`字体
        mark,
        .mark {
          background-color: @state-warning-bg;
          padding: .2em;
        }
    
    1. 设置了背景颜色
    2. 设置了padding为字体大小了0.2倍

3. 字体定位 & 大小写

        .text-left           { text-align: left; }
        .text-right          { text-align: right; }
        .text-center         { text-align: center; }
        .text-justify        { text-align: justify; }//两端对齐
        .text-nowrap         { white-space: nowrap; }
        
        // Transformation
        .text-lowercase      { text-transform: lowercase; }
        .text-uppercase      { text-transform: uppercase; }
        .text-capitalize     { text-transform: capitalize; }//首字母大写

4. 字体颜色

    ![字体颜色](QQ20151221-1.png)

        .text-muted {
          color: @text-muted;
        }
        .text-primary {
          .text-emphasis-variant(@brand-primary);
        }
        .text-success {
          .text-emphasis-variant(@state-success-text);
        }
        .text-info {
          .text-emphasis-variant(@state-info-text);
        }
        .text-warning {
          .text-emphasis-variant(@state-warning-text);
        }
        .text-danger {
          .text-emphasis-variant(@state-danger-text);
        }
        
        .text-emphasis-variant(@color) {
          color: @color;
          a&:hover,
          a&:focus {
            color: darken(@color, 10%);
          }
        }

    1. 普通字体颜色配置
    2. `primary~danger`还设置了选中/焦点效果加亮.
    
      
5. 显著展示文字

    ![显著文字](QQ20151221-4.png)
    
        .bg-primary {
          // Given the contrast here, this is the only class to have its color inverted
          // automatically.
          color: #fff;
          .bg-variant(@brand-primary);
        }
        .bg-success {
          .bg-variant(@state-success-bg);
        }
        .bg-info {
          .bg-variant(@state-info-bg);
        }
        .bg-warning {
          .bg-variant(@state-warning-bg);
        }
        .bg-danger {
          .bg-variant(@state-danger-bg);
        }
        
        .bg-variant(@color) {
          background-color: @color;
          a&:hover,
          a&:focus {
            background-color: darken(@color, 10%);
          }
        }
    
    这里和字体颜色类似,只不过换成了背景颜色
    
    因为默认的`.bg-primart`为蓝色,故字体要换成白色,黑色不明显.   

##2. List


1. 有序 & 无序 列表

        ul,
        ol {
          margin-top: 0;
          margin-bottom: (@line-height-computed / 2);
          ul,
          ol {
            margin-bottom: 0;
          }
        }
            
    基本的间距设置
    
    清除基本列表图标
    
        .list-unstyled {
          padding-left: 0;
          list-style: none;
        }
        
    横排列表
    
        .list-inline {
              .list-unstyled();
              margin-left: -5px;
            
              > li {
                display: inline-block;
                padding-left: 5px;
                padding-right: 5px;
              }
            }
    1. 清除基本列表图标
    2. `margin-left:-5px` 为了对齐,抵消列表默认会向右5px
    3. 设置`li`只占据一块切可计算,设置padding
2. 描述列表

        dl {
          margin-top: 0; // Remove browser default
          margin-bottom: @line-height-computed;
        }
        dt,
        dd {
          line-height: @line-height-base;
        }
        dt {
          font-weight: bold;
        }
        dd {
          margin-left: 0; // Undo browser default
        }
    基本样式设计.
    
    竖排描述
    
    ![竖排描述](QQ20151221-6.png)

        .dl-horizontal {
          dd {
            &:extend(.clearfix all); // Clear the floated `dt` if an empty `dd` is present
          }
        
          @media (min-width: @dl-horizontal-breakpoint) {
            dt {
              float: left;
              width: (@dl-horizontal-offset - 20);
              clear: left;
              text-align: right;
              .text-overflow();
            }
            dd {
              margin-left: @dl-horizontal-offset;
            }
          }
        }
        
        .text-overflow() {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
    1. `dd`清除dt的浮动影响
    2. `dt`排列只在小屏幕下可行
    3. `dt`文字过多时用`...`隐藏多出文字,`dt`漂浮向右.

##3 引导块

![引导块](QQ20151221-8.png)

    blockquote {
      padding: (@line-height-computed / 2) @line-height-computed;
      margin: 0 0 @line-height-computed;
      font-size: @blockquote-font-size;
      border-left: 5px solid @blockquote-border-color;
    
      p,
      ul,
      ol {
        &:last-child {
          margin-bottom: 0;
        }
      }
    
      // Note: Deprecated small and .small as of v3.1.0
      // Context: https://github.com/twbs/bootstrap/issues/11660
      footer,
      small,
      .small {
        display: block;
        font-size: 80%; // back to default font-size
        line-height: @line-height-base;
        color: @blockquote-small-color;
    
        &:before {
          content: '\2014 \00A0'; // em dash, nbsp
        }
      }
    }

1. 设置了基本的`padding`和`margin`
2. `p`,'ul','ol'的最后一个子类`maring-bottom`为0
3. `footer`等主要作标注作用,单独起一行,设置大小和行高,还有前面的`-`通过`:before`实现

`.blockquote-reverse`的向右设定

    .blockquote-reverse,
        blockquote.pull-right {
          padding-right: 15px;
          padding-left: 0;
          border-right: 5px solid @blockquote-border-color;
          border-left: 0;
          text-align: right;
        
          // Account for citation
          footer,
          small,
          .small {
            &:before { content: ''; }
            &:after {
              content: '\00A0 \2014'; // nbsp, em dash
            }
          }
        }
1. 在`blockquote`增加了文本向右对齐,设置了前置`padding`
2. 标注改在后面,用`:after`设置`-`,前面的`:before`为了覆盖之前`blockquote`的`-`.

##4 地址

    address {
      margin-bottom: @line-height-computed;
      font-style: normal;
      line-height: @line-height-base;
    }
这个基本没有作用..    

    
    







