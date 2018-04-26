import request from '../utils/request';
import { PAGE_SIZE } from '../constants';


export function fetchearn(page) {

  let pagelist = (page - 1) * PAGE_SIZE;
  return request(`/wechatfans/getallprofit?limit=${PAGE_SIZE}&offset=${pagelist}`, {
    method: 'GET',
  });
}

export function fetchpro(value) {
  return request(`/wechatfans/getcloudprofit?cloudid=${value.value}`, {
    method: 'GET',
  });
}


export function fetchinfo(values) {
  console.log(values.username)
  if (!values.username) {
    console.log(1)
    return request(`/wechatfans/showsomedayinfo?username=${'unknown'}&startdate=${values.date[0]}&enddate=${values.date[1]}`, {
      method: 'GET',
    });
  } else {
    console.log(2)
    return request(`/wechatfans/showsomedayinfo?username=${values.username}&startdate=${values.date[0]}&enddate=${values.date[1]}`, {
      method: 'GET',
    });
  }

}
