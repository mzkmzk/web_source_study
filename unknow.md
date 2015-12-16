# UnKnow

这里主要放一些还没理解的代码

1. `mixins/reset-filter`
    
    
    // Reset filters for IE
    //
    // When you need to remove a gradient background, do not forget to use this to reset
    // the IE filter for IE9 and below.

    .reset-filter() {
      filter: e(%("progid:DXImageTransform.Microsoft.gradient(enabled = false)"));
    }
    
2. `user-select`属性
    
    表名元素内的文字可选状态.

        user-select:auto //用户不能饿选择元素中的任何内容.
    
    参考链接<https://www.qianduan.net/introduce-user-select/>
    
3. `&`之前不太清楚LESS中`&`的用法,看下面例子就OK了.
 
        .bordered {
            &.float {
            float: left; 
        }
        .top {
            margin: 5px; 
            }
        }

    会输出
    
        .bordered.float {
            float: left;  
        }
        .bordered .top {
            margin: 5px;
        }

