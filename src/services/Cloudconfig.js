import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetchsTh(alldata) {
  let limit ,offset;
  return request(`/wechatfans/getthirdpartinfo?limit=${limit}&offset=${offset}&alldata=${alldata}`,{
    method: 'GET',
  });
}


export function fetchyun(page) {
	let pagelist = (page-1)*PAGE_SIZE;
  return request(`/wechatfans/getcloudconfig?limit=${PAGE_SIZE}&offset=${pagelist}`,{
    method: 'GET',
  });
}

export function fetchname() {
  return request(`/wechatfans/getcloudname`,{
    method: 'GET',
  });
}

export function savename(cloudid,thirdpart,typeThird) {
  return request(`/wechatfans/savecloudconfig?cloudid=${cloudid}&thirdpart=${thirdpart}&typeThird=${typeThird}`,{
    method: 'GET',
  });
}
