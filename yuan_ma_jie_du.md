# 源码解读

读源码前.我有几个以为

1. 轮播图如何设置定位


##1. 代码src结构

    ├── src
    │   ├── defaults.js
    │   ├── jquery.lory.js
    │   ├── lory.js
    │   └── utils
    │       ├── detect-prefixes.js
    │       └── dispatch-event.js
##2. 读码顺序

###2.1. 先读utils

`utils` 主要有两个函数

`detect-prefixes.js`这是设置动画