import request from '../utils/request';

export function SignUp(values) {
	console.log(values)
	const {username,password,cloudid,shopid}=values;
	  return request(`/wechatfans/register?username=${username}&password=${password}&cloudid=${cloudid}&shopid=${shopid}`,{
	    method: 'GET',
	  });
}
