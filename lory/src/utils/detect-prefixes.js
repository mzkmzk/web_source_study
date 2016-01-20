/**
 * Detecting prefixes for saving time and bytes
 */
export default function detectPrefixes () {
    let transform;
    let transition;
    let transitionEnd;
    let hasTranslate3d; //判断该浏览器是否支持3d动画

    (function () {
        //其实创建什么标签并不重要.
        let el = document.createElement('_');
        let style = el.style;

        let prop;

        if (style[prop = 'webkitTransition'] === '') {
            transitionEnd = 'webkitTransitionEnd';
            transition = prop;
        }

        if (style[prop = 'transition'] === '') {
            transitionEnd = 'transitionend';
            transition = prop;
        }

        if (style[prop = 'webkitTransform'] === '') {
            transform = prop;
        }

        if (style[prop = 'msTransform'] === '') {
            transform = prop;
        }

        if (style[prop = 'transform'] === '') {
            transform = prop;
        }

        //验证浏览器是否支持3D
        document.body.insertBefore(el, null);
        style[transform] = 'translate3d(0, 0, 0)';
        //三元运算符,返回true/boolean 参考<http://www.cnblogs.com/softlover/archive/2012/10/26/2741616.html>
        hasTranslate3d = !!global.getComputedStyle(el).getPropertyValue(transform);
        document.body.removeChild(el);
    }());

    return {
        transform,
        transition,
        transitionEnd,
        hasTranslate3d
    };
}
