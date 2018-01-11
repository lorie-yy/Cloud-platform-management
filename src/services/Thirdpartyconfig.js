import request from '../utils/request';
import { PAGE_SIZE } from '../constants';


export function fetchs(page) {
  let pagelist = (page-1)*PAGE_SIZE;
  return request(`/wechatfans/getthirdpartinfo?limit=${PAGE_SIZE}&offset=${pagelist}`,{
    method: 'GET',
  });
}


export function create(values,idData, typeThirdData) {
  return request(`/wechatfans/savethirdpartinfo?url=${values.url}&name=${values.thirdpartname}&type=${values.type}&id=${idData}&typeThird=${typeThirdData}`,{
    method: 'GET',
  });
}



export function saveThirdparty(values) {
  return request(`/wechatfans/savethirdpartinfo`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
        'Content-Type': 'application/json'
    }
  });

}
