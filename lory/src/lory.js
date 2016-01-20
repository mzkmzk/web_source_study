/* globals jQuery */

import detectPrefixes from './utils/detect-prefixes.js';
import dispatchEvent from './utils/dispatch-event.js';
import defaults from './defaults.js';

const slice = Array.prototype.slice;

export function lory (slider, opts) {
    let position; //定位
    let slidesWidth; //轮播单个的宽度
    let frameWidth; //
    let slides; //轮播的元素数组

    /**
     * slider DOM elements
     */
    let frame; //对应的轮播框架DOM
    let slideContainer; //对应的轮播元素内容
    let prevCtrl;
    let nextCtrl;
    let prefixes;
    let transitionEndCallback;

    let index   = 0; //默认当前显示
    let options = {}; //配置信息

    /**
     * if object is jQuery convert to native DOM element
     */
    if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
        slider = slider[0];
    }

    /**
     * private
     * set active class to element which is the current slide
     * 先查找当前元素是否有`classNameActiveSlide`类,默认为active,为什么要每个元素都遍历,因为active的间隔由'slidesToScroll: 4,'决定
     * 其实可以根据准备为下一个的active然后算出当前的active,然后remove,可能作者偷懒...
     */
    function setActiveElement (slides, currentIndex) {
        const {classNameActiveSlide} = options;

        //
        slides.forEach((element, index) => {
            if (element.classList.contains(classNameActiveSlide)) {
                element.classList.remove(classNameActiveSlide);
            }
        });

        slides[currentIndex].classList.add(classNameActiveSlide);
    }

    /**
     * private
     * setupInfinite: function to setup if infinite is set
     *
     * @param  {array} slideArray
     * @return {array} array of updated slideContainer elements
     */
    function setupInfinite (slideArray) {
        const {infinite} = options;

        //要翻回去显示的分为两部分
        const front = slideArray.slice(0, infinite);
        const back  = slideArray.slice(slideArray.length - infinite, slideArray.length);

        //把infnite 最前面的放在容器的最后.
        front.forEach(function (element) {
            const cloned = element.cloneNode(true);

            slideContainer.appendChild(cloned);
        });

        //同理把infnite最后的放在容器前面
        back.reverse()
            .forEach(function (element) {
                const cloned = element.cloneNode(true);

                slideContainer.insertBefore(cloned, slideContainer.firstChild);
            });
        //事件设定,当动画开始执行后,执行
        slideContainer.addEventListener(prefixes.transitionEnd, onTransitionEnd);

        return slice.call(slideContainer.children);
    }

    /**
     * [dispatchSliderEvent description]
     * @return {[type]} [description]
     */
    function dispatchSliderEvent (phase, type, detail) {
        dispatchEvent(slider, `${phase}.lory.${type}`, detail);
    }

    /**
     * translates to a given position in a given time in milliseconds
     * 动画效果,比较简单易懂.
     * @to        {number} number in pixels where to translate to
     * @duration  {number} time in milliseconds for the transistion
     * @ease      {string} easing css property
     */
    function translate (to, duration, ease) {
        const style = slideContainer && slideContainer.style;

        if (style) {
            style[prefixes.transition + 'TimingFunction'] = ease;
            style[prefixes.transition + 'Duration'] = duration + 'ms';

            if (prefixes.hasTranslate3d) {
                style[prefixes.transform] = 'translate3d(' + to + 'px, 0, 0)';
            } else {
                style[prefixes.transform] = 'translate(' + to + 'px, 0)';
            }
        }
    }

    /**
     * slidefunction called by prev, next & touchend
     * 第一个参数保存准备被替换掉的最后一个,第二个表示方向是正还是反.
     * determine nextIndex and slide to next postion
     * under restrictions of the defined options
     *
     * @direction  {boolean}
     */
    function slide (nextIndex, direction) {
        const {
            slideSpeed, //设置跳动的时间差
            slidesToScroll, //设置每次上/下跳动多少个li
            infinite, //是否按上一张能跳到最后一张,可以的话,要跳几张. 和rewind互斥 false/number
            rewind,  //是否从最后一张滚回到第一张.(能看到中间所有元素) boolean
            rewindSpeed, //回滚的时间差
            ease, //设置上/下的动画 详见<http://easings.net/de>
            classNameActiveSlide
        } = options;

        let duration = slideSpeed;

        //判断下一页显示的
        const nextSlide = direction ? index + 1 : index - 1;
        //slidesWidth表示全部li的加起来的宽度. 为设定显示宽的宽度.
        const maxOffset = Math.round(slidesWidth - frameWidth);

        //设置事件监听.
        dispatchSliderEvent('before', 'slide', {
            index,
            nextSlide //指定下次显示第几张
        });

        //当上一轮和下一轮的时候.分别+/-
        if (typeof nextIndex !== 'number') {
            //正反向不同的处理.
            if (direction) {
                nextIndex = index + slidesToScroll;
            } else {
                nextIndex = index - slidesToScroll;
            }
        }
        //里面的max为了pre到第一个的时候显示第0个,外面的min为了到最后一个的时候 显示最后一个.
        nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);

        //只有在SlideTo方法会调用此方法.因为infinite会在前面加相同个数的infinite,所以直接跳转到某个li时,需要跳过前面的设置.
        if (infinite && direction === undefined) {
            nextIndex += infinite;
        }

        //nextOffset一般为负值,负的宽度等于在轮播li隐藏前面li的宽度.
        //这里的min和max和上一处同理.
        let nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);

        //当定位超过最大宽度,返回第一张.
        if (rewind && Math.abs(position.x) === maxOffset && direction) {
            nextOffset = 0;
            nextIndex = 0;
            duration = rewindSpeed;
        }

        /**
         * translate to the nextOffset by a defined duration and ease function
         */
        translate(nextOffset, duration, ease);

        /**
         * update the position with the next position
         */
        position.x = nextOffset;

        /**
         * update the index with the nextIndex only if
         * the offset of the nextIndex is in the range of the maxOffset
         * 当右边下一张位置不够显示时,把当前的显示出来就OK.
         */
        if (slides[nextIndex].offsetLeft <= maxOffset) {
            index = nextIndex;
        }

        if (infinite && (Math.abs(nextOffset) === maxOffset || Math.abs(nextOffset) === 0)) {
            if (direction) {
                index = infinite;
            }

            if (!direction) {
                index = slides.length - (infinite * 2);
            }

            position.x = slides[index].offsetLeft * -1;

            transitionEndCallback = function () {
                translate(slides[index].offsetLeft * -1, 0, undefined);
            };
        }

        if (classNameActiveSlide) {
            setActiveElement(slice.call(slides), index);
        }

        dispatchSliderEvent('after', 'slide', {
            currentSlide: index
        });
    }

    /**
     * public
     * setup function
     */
    function setup () {
        //事件监听
        dispatchSliderEvent('before', 'init');

        prefixes = detectPrefixes();
        options = {...defaults, ...opts};
        //get 需要什么 先把它定义在前面
        const {
            classNameFrame, //显示轮播整体框架的外部框
            classNameSlideContainer, // 一般为ul层.包含所有li
            classNamePrevCtrl,  //左箭头
            classNameNextCtrl, //右箭头
            enableMouseEvents,  //能否通过键盘监听.
            classNameActiveSlide //当前显示类的类名
        } = options;

        frame = slider.getElementsByClassName(classNameFrame)[0];
        slideContainer = frame.getElementsByClassName(classNameSlideContainer)[0];
        prevCtrl = slider.getElementsByClassName(classNamePrevCtrl)[0];
        nextCtrl = slider.getElementsByClassName(classNameNextCtrl)[0];

        position = {
            x: slideContainer.offsetLeft,
            y: slideContainer.offsetTop
        };

        if (options.infinite) {
            //其实简写了,Array.prototype.slice.call(...),其实是把单个的slideContainer.children 整合到一个数组里.
            slides = setupInfinite(slice.call(slideContainer.children));
        } else {
            slides = slice.call(slideContainer.children);
        }

        reset();

        //给第index个li个元素加当前正在观看的active的class.
        if (classNameActiveSlide) {
            setActiveElement(slides, index);
        }

        if (prevCtrl && nextCtrl) {
            prevCtrl.addEventListener('click', prev);
            nextCtrl.addEventListener('click', next);
        }

        slideContainer.addEventListener('touchstart', onTouchstart);

        if (enableMouseEvents) {
            slideContainer.addEventListener('mousedown', onTouchstart);
            slideContainer.addEventListener('click', onClick);
        }

        options.window.addEventListener('resize', onResize);

        dispatchSliderEvent('after', 'init');
    }

    /**
     * public
     * reset function: called on resize
     */
    function reset () {
        const {infinite, ease, rewindSpeed} = options;
        //获取相对定位/绝对定位
        slidesWidth = slideContainer.getBoundingClientRect()
            .width || slideContainer.offsetWidth;
        frameWidth = frame.getBoundingClientRect()
            .width || frame.offsetWidth;

        //当框体和ul宽度一致时,把每个li的定位算出来.reduce是一个累加器.
        if (frameWidth === slidesWidth) {
            slidesWidth = slides.reduce(function (previousValue, slide) {
                return previousValue + slide.getBoundingClientRect().width || slide.offsetWidth;
            }, 0);
        }

        index = 0;
        //当如果设置了返回时显示第几个li,就在初始化时移动几个,因为顺序轮播是个假象,在li前面都加了infinite个重复元素在前后.
        if (infinite) {
            translate(slides[index + infinite].offsetLeft * -1, 0, null);

            index = index + infinite;
            position.x = slides[index].offsetLeft * -1;
        } else {
            translate(0, rewindSpeed, ease);
        }
    }

    /**
     * public
     * slideTo: called on clickhandler
     */
    function slideTo (index) {
        slide(index);
    }

    /**
     * public
     * returnIndex function: called on clickhandler
     */
    function returnIndex () {
        return index - options.infinite || 0;
    }

    /**
     * public
     * prev function: called on clickhandler
     */
    function prev () {
        slide(false, false);
    }

    /**
     * public
     * next function: called on clickhandler
     */
    function next () {
        slide(false, true);
    }

    /**
     * public
     * destroy function: called to gracefully destroy the lory instance
     */
    function destroy () {
        dispatchSliderEvent('before', 'destroy');

        // remove event listeners
        slideContainer.removeEventListener(prefixes.transitionEnd, onTransitionEnd);
        slideContainer.removeEventListener('touchstart', onTouchstart);
        slideContainer.removeEventListener('touchmove', onTouchmove);
        slideContainer.removeEventListener('touchend', onTouchend);
        slideContainer.removeEventListener('mousemove', onTouchmove);
        slideContainer.removeEventListener('mousedown', onTouchstart);
        slideContainer.removeEventListener('mouseup', onTouchend);
        slideContainer.removeEventListener('mouseleave', onTouchend);
        slideContainer.removeEventListener('click', onClick);

        options.window.removeEventListener('resize', onResize);

        if (prevCtrl) {
            prevCtrl.removeEventListener('click', prev);
        }

        if (nextCtrl) {
            nextCtrl.removeEventListener('click', next);
        }

        dispatchSliderEvent('after', 'destroy');
    }

    // event handling

    let touchOffset;
    let delta;
    let isScrolling;

    function onTransitionEnd () {
        if (transitionEndCallback) {
            transitionEndCallback();

            transitionEndCallback = undefined;
        }
    }

    function onTouchstart (event) {
        const {enableMouseEvents} = options;
        const touches = event.touches ? event.touches[0] : event;

        if (enableMouseEvents) {
            slideContainer.addEventListener('mousemove', onTouchmove);
            slideContainer.addEventListener('mouseup', onTouchend);
            slideContainer.addEventListener('mouseleave', onTouchend);
        }

        slideContainer.addEventListener('touchmove', onTouchmove);
        slideContainer.addEventListener('touchend', onTouchend);

        const {pageX, pageY} = touches;

        touchOffset = {
            x: pageX,
            y: pageY,
            time: Date.now()
        };

        isScrolling = undefined;

        delta = {};

        dispatchSliderEvent('on', 'touchstart', {
            event
        });
    }

    function onTouchmove (event) {
        const touches = event.touches ? event.touches[0] : event;
        const {pageX, pageY} = touches;

        delta = {
            x: pageX - touchOffset.x,
            y: pageY - touchOffset.y
        };

        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
        }

        if (!isScrolling && touchOffset) {
            event.preventDefault();
            translate(position.x + delta.x, 0, null);
        }

        // may be
        dispatchSliderEvent('on', 'touchmove', {
            event
        });
    }

    function onTouchend (event) {
        /**
         * time between touchstart and touchend in milliseconds
         * @duration {number}
         */
        const duration = touchOffset ? Date.now() - touchOffset.time : undefined;

        /**
         * is valid if:
         *
         * -> swipe attempt time is over 300 ms
         * and
         * -> swipe distance is greater than 25px
         * or
         * -> swipe distance is more then a third of the swipe area
         *
         * @isValidSlide {Boolean}
         */
        const isValid = Number(duration) < 300 &&
            Math.abs(delta.x) > 25 ||
            Math.abs(delta.x) > frameWidth / 3;

        /**
         * is out of bounds if:
         *
         * -> index is 0 and delta x is greater than 0
         * or
         * -> index is the last slide and delta is smaller than 0
         *
         * @isOutOfBounds {Boolean}
         */
        const isOutOfBounds = !index && delta.x > 0 ||
            index === slides.length - 1 && delta.x < 0;

        const direction = delta.x < 0;

        if (!isScrolling) {
            if (isValid && !isOutOfBounds) {
                slide(false, direction);
            } else {
                translate(position.x, options.snapBackSpeed);
            }
        }

        touchOffset = undefined;

        /**
         * remove eventlisteners after swipe attempt
         */
        slideContainer.removeEventListener('touchmove', onTouchmove);
        slideContainer.removeEventListener('touchend', onTouchend);
        slideContainer.removeEventListener('mousemove', onTouchmove);
        slideContainer.removeEventListener('mouseup', onTouchend);
        slideContainer.removeEventListener('mouseleave', onTouchend);

        dispatchSliderEvent('on', 'touchend', {
            event
        });
    }

    function onClick (event) {
        if (delta.x) {
            event.preventDefault();
        }
    }

    function onResize (event) {
        reset();

        dispatchSliderEvent('on', 'resize', {
            event
        });
    }

    // trigger initial setup
    setup();

    // expose public api
    return {
        setup,
        reset,
        slideTo,
        returnIndex,
        prev,
        next,
        destroy
    };
}
