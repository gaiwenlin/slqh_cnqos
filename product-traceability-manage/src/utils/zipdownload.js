import axios from 'axios'
import authorization from '../application/authorization';

export function downLoadPng(url, fileName) {
  axios({
    method: 'get',
    url: url,
    responseType: 'blob',
    headers: { 'Authorization': 'Bearer ' + authorization.getToken() }
  }).then(res => {
    resolveBlob(res, fileName)
  })
}

export function resolveBlob(res, fileName) {
  const aLink = document.createElement('a');
  const blob = new Blob([res.data], { type: 'application/x-png' });
  aLink.href = URL.createObjectURL(blob);
  aLink.setAttribute('download', fileName);
  document.body.appendChild(aLink);
  aLink.click();
  document.body.appendChild(aLink)
}
