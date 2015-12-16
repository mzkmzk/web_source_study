# Buttons

![Button效果](QQ20151216-1.png)

在`Buttons.less`中,主要设置了`Button`的3个主要`Class`

1. `.btn` 设置基本`间距` & `定位` & `border`等.
2. `.btn-lg/sm/xs`覆盖`.btn`的`间距` & `圆角` & `字体大小`.
3. `.btn-default/.../danger`覆盖`.btn`的`字体颜色` & `背景颜色` &
 `边框颜色`

参考文件主要是`buttons.less` & `button.js` & `mixins/buttons`

主要效果有:

* 间距设置 & 圆角设置
    
        padding: @padding-vertical @padding-horizontal;
        font-size: @font-size;
        line-height: @line-height;
        border-radius: @border-radius;

    这里的属性值设置都在`variables.less`中
* 按钮阴影设置
    这里的阴影指的是边框边边上的小阴影(很难看到,Mac几乎贴上去才看到有/无的效果)
        box-shadow: inset 0 1px 0 rgba(255,255,255,.15), 0 1px 1px rgba(0,0,0,.075);
    1. `inset`表示为内阴影,
    2. 阴影水平偏移值(\*+-) 阴影垂直偏移(\*+-) 阴影模糊值 阴影尺寸 阴影颜色
    3. `box-shadow`可参考<http://css.doyoe.com/>
* `hover`,`active`时按钮颜色变化.
    
         background-color: darken(@background, 17%);
         border-color: darken(@border, 25%);
* 按钮内文字不可选

        user-select: none;

