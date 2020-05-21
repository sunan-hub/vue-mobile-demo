import { type } from './common.js'
/**
 * 根据屏幕宽度计算尺寸
 * 用于解决大部分组件内联样式尺寸无法转换的问题
 *
 * @date 2020-05-15
 * @export
 * @param {Number || String} size
 * @returns
 */
export const calcSize = (size) => {
  if (type(size) !== 'string' && type(size) !== 'number') {
    throw Error('type error, param expect number or string')
  }
  if (!size) {
    return 0
  }
  var cWidth = document.body.clientWidth
  var _size = size * (cWidth / 750)
  return _size
}
