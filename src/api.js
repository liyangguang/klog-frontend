import {sha256} from 'js-sha256';

const ROOT = 'https://klogserver.westus2.cloudapp.azure.com/api/0/';
const ALL_VALUE = 'all';

export function callApi(path, payload = {}, method) {
  let option = {};
  let params = '';
  if (method) {
    if (payload.teacher_key) {
      payload.teacher_key = sha256(payload.teacher_key);
    }
    option = {method, body: JSON.stringify(payload)};
  } else {
    if (!payload.pid) {
      payload.pid = ALL_VALUE;
    }
    params = Object.entries(payload).map(([key, value]) => `${key}=${value}`).join('&');
    if (params) {
      params = '?' + params;
    }
  }

  return fetch(`${ROOT}${path}${params}`, option).then((res) => {
    if (res.ok) {
      return res.json().then((res) => res.payload);
    } else {
      return res.json().then((res) => {throw new Error(res.message);});
    }
  });
}
