import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL
var TOKEN = ''
try {
  const userToken = JSON.parse(Cookies.get("userToken"))
  TOKEN = userToken?.token //'MQ.zuVFp8xDBM15lUoLgvNLWgGqr_GyaerUpAmtEdPU-C52tZWUy-DBbmWy011Q'
} catch (error) {
}


const objectToQueryParams = (params) => {
  var queryPharams = [];
  if (typeof (params) == 'object') {
    Object.keys(params).map((res, index) => {
      queryPharams.push(encodeURIComponent(res) + "=" + encodeURIComponent(params[res]));
    })
  }
  return queryPharams.join("&")
}


export const blacklist = () => {
  Cookies.remove("userToken");
  Cookies.remove("userProfile");
  window.location.href = "/";
};

// =========== with form data ==============
export const apiPost = async ({ path, formData, objParams }) => {
  return await axios.post(
    `${API_URL}/${path}?${objectToQueryParams(objParams)}`,
    formData,
    { headers: { Authorization: `Bearer ${TOKEN}` }, }
  ).then((res) => {
    return res;
  }).catch((err) => {
    if ((err?.response?.status) == 401) { blacklist() }
    return err?.response;
  });
};

export const apiPut = async ({ path, formData, objParams }) => {
  return await axios.put(
    `${API_URL}/${path}?${objectToQueryParams(objParams)}`,
    formData,
    { headers: { Authorization: `Bearer ${TOKEN}` }, }
  ).then((res) => {
    return res;
  }).catch((err) => {
    if ((err?.response?.status) == 401) { blacklist() }
    return err?.response;
  });
};




// ============= without form data =================
export const apiGet = async ({ path, objParams }) => {
  return await axios.get(
    `${API_URL}/${path}?${objectToQueryParams(objParams)}`,
    { headers: { Authorization: `Bearer ${TOKEN}`, }, }
  ).then((res) => {
    return res;
  }).catch((err) => {
    if ((err?.response?.status) == 401) { blacklist() }
    return err?.response;
  });
};


export const apiDelete = async ({ path, objParams }) => {
  return await axios.delete(
    `${API_URL}/${path}?${objectToQueryParams(objParams)}`,
    { headers: { Authorization: `Bearer ${TOKEN}`, }, }
  ).then((res) => {
    return res;
  }).catch((err) => {
    if ((err?.response?.status) == 401) { blacklist() }
    return err?.response;
  });
};




