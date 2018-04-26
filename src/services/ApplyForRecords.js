import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetchApply(page, pagetype) {
  let pagelist = (page - 1) * PAGE_SIZE;
  return request(`/wechatfans/getallapplyforwithdrawalrecords?limit=${PAGE_SIZE}&offset=${pagelist}&pagetype=${pagetype}`, {
    method: 'GET',
  });
}