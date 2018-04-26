import request from '../utils/request';

export function fetchSet(values) {
  if (!values) {
    return request(`/wechatfans/setnotify`, {
      method: 'GET',
    });
  } else {
    return request(`/wechatfans/setnotify?detail=${values.detail}&title=${values.title}`, {
      method: 'GET',
    });

  }
}