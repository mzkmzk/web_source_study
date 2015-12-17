# Utils

这里主要列举一些代码中可能疑惑的函数或方法

1. 如果你不熟悉`LESS`
 
    最好阅读这篇博客后再看`Bootstrap`源代码<http://www.bootcss.com/p/lesscss/>

    1. `:extend`伪类的使用(必须在语句的最后)
            //输入
            nav ul {
              &:extend(.inline);
              background: blue;
            }
            .inline {
              color: red;
            }
            
            //输出
            nav ul {
              background: blue;
            }
            .inline,
            nav ul {
              color: red;
            }
            
            .c:extend(.d all) {
                // 扩展".d"的所有实例，比如".x.d"或者".d.x"
            }
            
            //输入
            .a.b.test,
            .test.c {
              color: orange;
            }
            .test {
              &:hover {
                color: green;
              }
            }
            
            .replacement:extend(.test all) {}
            
            //输出
            
            .a.b.test,
            .test.c,
            .a.b.replacement,
            .replacement.c {
              color: orange;
            }
            .test:hover,
            .replacement:hover {
              color: green;
            }