import request from '../utils/request';
import { PAGE_SIZE } from '../constants';


export function fetchearn(page) {

		let pagelist = (page-1)*PAGE_SIZE;
	  return request(`/wechatfans/getallprofit?limit=${PAGE_SIZE}&offset=${pagelist}`,{
	    method: 'GET',
	  });
}

export function fetchpro(value) {
	  return request(`/wechatfans/getcloudprofit?cloudid=${value.value}`,{
	    method: 'GET',
	  });
}