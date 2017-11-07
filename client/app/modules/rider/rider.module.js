import angular from 'angular';

import Services from './services';
import 'bootstrap/less/bootstrap.less';
import './events-list/events-list.scss';
import './styles/style.less'

import Auth from './auth/auth';
import SearchEvents from './search-events/search-events';
import PhoneAuth from './phone-auth/phone-auth';
import EventsList from './events-list/events-list';
import UberCallback from './uber-callback/uber-callback';
import NavMenu from './nav-menu/nav-menu';
import CodeConfirm from './code-confirm/code-confirm';

export default angular.module('app.modules.rider', [
  Auth,
  SearchEvents,
  PhoneAuth,
  EventsList,
  Services,
  UberCallback,
  NavMenu,
  CodeConfirm
]).config(($stateProvider, $facebookProvider) => {
  "ngInject";
  $facebookProvider.setAppId('1683744838556603');

  $stateProvider.state('riderPhoneValidation', {
    url: '/phone',
    template: '<app-phone-auth></app-phone-auth>',
    resolve: {
      phone: (authService, $state, $q) => {
        'ngInject';
        return $q((res, rej) => {
          return authService.getAuthUser()
            .then((user) => {
              if (user) {
                return user.isVerified
                  ? rej({
                    newTransition: $state.go('riders.events'),
                    rejectReason: 'phone already verified'
                  })
                  : res('phone');
              }
              else {
                rej($state.go('auth'));
              }
            })
            .catch((err) => rej($state.go('auth')));
        })
      }
    }
  }).state('riders', {
    abstract: true,
    template: '<ui-view></ui-view>',
    url: '/riders',
    resolve: {
      user: (authService, $state, $q) => {
        'ngInject';
        return $q((res, rej) => {
          return authService.getAuthUser()
            .then((user) => {
              if (user.isVerified) {
                return res(user);
              }
              else {
                rej({
                  newTransition: $state.go('riderPhoneValidation'),
                  rejectReason: 'unverified phone'
                });
              }
            })
            .catch((authRoute) => rej({
              newTransition: $state.go('auth'),
              rejectReason: 'unsigned user'
            }));
        })
      }
    }

  }).state('riders.events', {
    url: '/events',
    template: '<app-search-events></app-search-events>'
  }).state('riders.phoneAuth', {
    url: '/phoneAuth',
    template: '<app-phone-auth></app-phone-auth>',
    resolve: {
      phoneAuth: (user, $q, $state) => {
        'ngInject';
        return $q( (res, rej) => {
          if (user.isVerified) {
            return rej({
              newTransition: $state.go('riders.events'),
              rejectReason: 'phone already verified'
            });
          } else {
            res('phoneAuth');
          }
        });

      }
    }
  }).state('riders.uberCallback', {
    url: '/uber-callback?state',
    template: '<app-uber-callback></app-uber-callback>',
  }).state('riders.uberRedirect', {
    url: '/uber-redirect:link',
    template: '<app-uber-callback></app-uber-callback>',
  })
    .state('riders.codeConfirm', {
    url: '/code-confirm',
    template: '<app-code-confirm></app-code-confirm>',
  })
}).run( (  ) => {
    (function(){
      if (document.getElementById('facebook-jssdk')) {return;}
      var fjs = document.getElementsByTagName('script')[0];

      var js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }());
  })
  .name;
