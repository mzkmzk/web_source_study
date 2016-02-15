# autoresponsive-react

github地址<https://github.com/xudafeng/autoresponsive-react>

带着以下几个问题阅读

1. 如何使用
2. 如何动画的响应屏幕


##1. 如何使用

1. 基本使用

    1. clone下到本地
    2. cd到项目根目录 `make install` ->`make server`

2. 参数配置

    在`~/lib/index.js`最下面有个配置属性
    
    ```javascript
AutoResponsive.defaultProps = {
    containerWidth: null, //容器总体宽度
    containerHeight: null,//容器高度
    gridWidth: 10, //栅格宽度，栅格宽度值会影响布局的精确度，同时也会影响渲染效率
    prefixClassName: 'rc-autoresponsive', //容器的className
    itemClassName: 'item', //布局元素选择器
    itemMargin: 0, //布局元素间距
    horizontalDirection: 'left',//水平渲染方向
    transitionDuration: 1, //动画持续时间
    transitionTimingFunction: 'linear', //动画持续效果
    verticalDirection: 'top', //垂直渲染方向
    closeAnimation: false, //是否关闭动画
    onItemDidLayout: noop, //渲染前，layout 完成后触发的
    onContainerDidLayout: noop //渲染前,子节点完成后出发
};
    ```
    
3.     