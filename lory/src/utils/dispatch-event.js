import CustomEvent from 'custom-event';

/**
 * dispatch custom events
 * 绑定事件的兼容包 参考<https://github.com/webmodules/custom-event>
 *
 * @param  {element} el         slideshow element
 * @param  {string}  type       custom event name
 * @param  {object}  detail     custom detail information
 */
export default function dispatchEvent (target, type, detail) {
    let event = new CustomEvent(
        type,
        {
            bubbles: true,
            cancelable: true,
            detail: detail
        }
    );

    target.dispatchEvent(event);
}
