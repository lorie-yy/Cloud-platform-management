import request from '../utils/request';

export function fetchUser(page) {
  return request(`/wechatfans/getrelation?page=${page}`, {
    method: 'GET',
  });
}