# jQuery2.2

##1. 读前准备

1. 下载源码<https://github.com/jquery/jquery/tree/2.2-stable>
2. 阅读源码前,建议先看下CommonJS<http://javascript.ruanyifeng.com/nodejs/module.html#toc12>
3. Dash等API阅读器,对着API和源码进行分析.

##2. 通读

首先大致浏览一下目录结构

src部分有很多js和文件夹同名的文件.

![jQuery目录结构](QQ20160123-1.png)

基本一个目录都是为同名的js提供方法的.

##有趣的点

###1. each对数组和类数组和数组的处理

what is 类数组?





##额外知识点

###1. #id选择器的XSS过滤正则

```javascript
var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
rquickExpr.exec(selector);

```

###2. 获取数组元素负数实现

```javascript
eq: function( i ) {
var len = this.length,
	j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
},
```

