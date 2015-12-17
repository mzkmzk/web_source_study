# Tables

![Tables效果](QQ20151216-2.png)

分析下这4个表格:

1. 基本的`.table`中,样式设置了

    1. 文字左边靠齐

            text-align: left;
        
    2. 边框颜色设置        

            border-bottom: 2px solid @table-border-color;
         
2. `.table-striped`条纹表格

    note:`IE8及以下不支持:nth-chlid,该样式无效`

        .table-striped {
            > tbody > tr:nth-of-type(odd) {
                background-color: @table-bg-accent;
            }
        }
3. `.table-bordered`有边框线表格

    代码中设置了2次,border
    
    1. `.table-bordered`顶层定义主要为了表格最顶部的边框线
    
    2. 在`thread(表头)` & `tbody(表内容)` & `tfoot(表腿)`中都设置了剩余的边框线.
    
    当然,还设置表头的下划线粗一点,设了`2px`
    
            .table-bordered {
                border: 1px solid @table-border-color;
                > thead,
                > tbody,
                > tfoot {
                    > tr {
                      > th,
                      > td {
                        border: 1px solid @table-border-color;
                      }
                    }
                  }
                  > thead > tr {
                    > th,
                    > td {
                      border-bottom-width: 2px;
                    }
                  }
                }
            
4. `.table-condensed`紧凑的table

    