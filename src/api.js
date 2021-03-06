import {sha256} from 'js-sha256';

// TODO(yangguang): Move it to backend, graphql

const ROOT = 'https://klogserver.westus2.cloudapp.azure.com/api/0/';
const ALL_VALUE = 'all';

export async function callApi(path, payload = {}, method) {
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

  const response = await fetch(`${ROOT}${path}${params}`, option);
  const data = await response.json();
  if (response.ok) {
    return data.payload;
  } else {
    throw new Error(data.message);
  }
}
