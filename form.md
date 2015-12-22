# Form

    .form-control {
    //基本间距大小定位.
      display: block;
      width: 100%;
      height: @input-height-base; // Make inputs at least the height of their button counterpart (base line-height + padding + border)
      padding: @padding-base-vertical @padding-base-horizontal;
      font-size: @font-size-base;
      line-height: @line-height-base;
      color: @input-color;
      background-color: @input-bg;
      background-image: none; // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
    //边框设定  
      border: 1px solid @input-border;
    //小圆角  
      border-radius: @input-border-radius; // Note: This has no effect on <select>s in some browsers, due to the limited stylability of <select>s in CSS.
    //阴影设定,所以控件都有陷下去的感觉.  
      .box-shadow(inset 0 1px 1px rgba(0,0,0,.075));
    //过渡小效果.  
      .transition(~"border-color ease-in-out .15s, box-shadow ease-in-out .15s");
    
      // Customize the `:focus` state to imitate native WebKit styles.
     //设置focus时旁边蓝色的显示,实现方法在下方.
      .form-control-focus();
    
      // Placeholder
    //提示文字的显示. 
      .placeholder();
    
      // Unstyle the caret on `<select>`s in IE10+.
      &::-ms-expand {
        border: 0;
        background-color: transparent;
      }
    
      // Disabled and read-only inputs
      //
      // HTML5 says that controls under a fieldset > legend:first-child won't be
      // disabled if the fieldset is disabled. Due to implementation difficulty, we
      // don't honor that edge case; we style them as disabled anyway.
    //只读标签的灰色设置和小手改变  
      &[disabled],
      &[readonly],
      fieldset[disabled] & {
        background-color: @input-bg-disabled;
        opacity: 1; // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655
      }
    
      &[disabled],
      fieldset[disabled] & {
        cursor: not-allowed;
      }
    
      // Reset height for `textarea`s
      textarea& {
        height: auto;
      }
    }
    
    .form-control-focus(@color: @input-border-focus) {
      @color-rgba: rgba(red(@color), green(@color), blue(@color), .6);
      &:focus {
        border-color: @color;
        outline: 0;
        .box-shadow(~"inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px @{color-rgba}");
      }
    }
    
    .placeholder(@color: @input-color-placeholder) {
      // Firefox
      &::-moz-placeholder {
        color: #999; //灰色
        opacity: 1; // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526
      }
      &:-ms-input-placeholder { color: @color; } // Internet Explorer 10+
      &::-webkit-input-placeholder  { color: @color; } // Safari and Chrome
    }
    
以上是`form`    
            
    