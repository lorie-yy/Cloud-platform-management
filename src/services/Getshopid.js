import request from '../utils/request';
import { PAGE_SIZE } from '../constants';


//获取
export function fetchshop(values) {
  return request(`/wechatfans/getshopid?cloudid=${values}`,{
    method: 'GET',
  });
}


export function fetchshopAll(page) {
   let pagelist = (page-1)*PAGE_SIZE;
  return request(`/wechatfans/getalldiscountinfo?limit=${PAGE_SIZE}&offset=${pagelist}`,{
    method: 'GET',
  });
}

export function addshopinfo(value,typeThird) {
  console.log(value)
  return request(`/wechatfans/savediscountinfo?cloudid=${value.cloudid}&bonus=${value.bonus}&shopid=${value.shopid}&typeThird=${typeThird}&public=${value.public}`,{
    method: 'GET',
  });
}

