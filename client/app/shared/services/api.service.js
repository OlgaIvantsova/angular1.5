import angular from 'angular'

const X_CRF_TOKEN = '20BBwQfuC8cGxRBv1EBRVPc3HjfFzbgT9y86xzOzmFWI5dbMxYaylhEBUzX0nrAG'

export default class ApiService {

  baseURI = 'https://www.bringusnow.com/api/';

  constructor($http, $window, toastr) {
    'ngInject'

    Object.assign($http.defaults, {
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken'
    });

    Object.assign(this, { $http, $window, toastr });
  }

  _doRequest(config) {

    config.headers = Object.assign({}, config.headers, {
      'Content-Type': 'application/json',
      'X-CSRFToken': X_CRF_TOKEN,
      'Authorization': `Token ${this.$window.localStorage.getItem('auth_token') || ''}`
    });

    return this.$http(config);
  }

  get(url, params, options) {
    url = `${this.baseURI}${url}`;

    if (!options || !options.skipSlash) {
      url += '/';
    }

    return this._doRequest({
      url,
      method: 'GET',
      params
    });
  }

  post(url, data) {
    return this._doRequest({
      url: `${this.baseURI}${url}/`,
      method: 'POST',
      data
    });
  }

  patch(url, data) {
    return this._doRequest({
      url: `${this.baseURI}${url}/`,
      method: 'PATCH',
      data
    });
  }

  put(url, data) {
    return this._doRequest({
      url: `${this.baseURI}${url}/`,
      method: 'PUT',
      data
    });
  }

  del(url, data) {
    return this._doRequest({
      url: `${this.baseURI}${url}/`,
      method: 'DELETE',
      data
    });
  }

  upload(url, formData) {
    let config = {}
    config.transformRequest = angular.identity
    config.headers = {
      'Content-Type': undefined,
      'X-CSRFToken': X_CRF_TOKEN,
      'Authorization': `Token ${this.$window.localStorage.getItem('auth_token') || ''}`
    };

    return this.$http.post(url, formData, config)
  }
}
