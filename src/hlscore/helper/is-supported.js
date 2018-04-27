import {getMediaSource} from './mediasource-helper';

export function isSupported() {
  const mediaSource = getMediaSource();
  const sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
  
  // 需要监测 mediaSource 的 Api 在浏览器下可用 并且需要确保支持这种视频源的格式
  const isTypeSupported = mediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  // 确保 appendBuffer 和  remove 方法的支持
  // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
  const sourceBufferValidAPI = !sourceBuffer ||
    (sourceBuffer.prototype &&
      typeof sourceBuffer.prototype.appendBuffer === 'function' &&
      typeof sourceBuffer.prototype.remove === 'function');
  return !!isTypeSupported && !!sourceBufferValidAPI;
}
