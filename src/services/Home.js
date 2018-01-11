import request from '../utils/request';

export function fetchHome() {
	  return request(`/wechatfans/getallfans`,{
	    method: 'GET',
	 });
}