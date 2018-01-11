import { PAGE_SIZE } from '../constants';
import request from '../utils/request';

export function fetchWithdrawal(page , pagetype) {
	let pagelist = (page-1)*PAGE_SIZE;

  return request(`/wechatfans/getapplyforwithdrawal?limit=${PAGE_SIZE}&offset=${pagelist}&pagetype=${pagetype}`,{
    method: 'GET',
  });
}

export function fetchGetPass(value,typeThird) {
  return request(`/wechatfans/transferaccounts?id=${value}&typeThird=${typeThird}`,{
    method: 'GET',
  });
}

