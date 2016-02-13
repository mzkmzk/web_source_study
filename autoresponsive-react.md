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
  containerWidth: null,
  containerHeight: null,
  gridWidth: 10,
  prefixClassName: 'rc-autoresponsive',
  itemClassName: 'item',
  itemMargin: 0,
  horizontalDirection: 'left',
  transitionDuration: 1,
  transitionTimingFunction: 'linear',
  verticalDirection: 'top',
  closeAnimation: false,
  onItemDidLayout: noop,
  onContainerDidLayout: noop
};
    ```