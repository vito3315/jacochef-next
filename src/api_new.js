import queryString from 'query-string';
import axios from 'axios';

export function api(module = '', method = '', data = {}) {
  //const urlApi_dev = 'http://127.0.0.1:8000/api/'+module+'/'+method;
  const urlApi_dev = 'http://79.174.91.113/api/'+module+'/'+method;
  const urlApi_prod = 'https://api.jacochef.ru/driver/public/index.php/';

 
  const this_data = queryString.stringify({
    login: localStorage.getItem('token'),
    data: JSON.stringify(data),
  })

  return axios.post(urlApi_dev, this_data)
    .then( (response) => {
      
      if( typeof response.data == 'string' ){
        return {
          st: false,
          text: response.data
        };
      }

      return response.data;
    })
    .catch( (error) => {
      console.log(error?.response?.status);

      if( error?.response?.status == 401 ){
        window.location.pathname = '/auth';
      }

      if( error?.response?.status == 403 ){
        window.location.pathname = '/';
      }

    });
}
