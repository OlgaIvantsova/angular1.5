import angular from 'angular';
import NavBar from './nav-bar'
import Auth from './auth/auth';
import Login from './login';
import Register from './register';
import Profile from './profile';
import Dashboard from './dashboard'
import AuthService from '../../shared/services/provider/auth'
import 'bootstrap/less/bootstrap.less';
import './styles/less/desktop/style.less'
import '../../shared/services/smoke/smoke.css'

export default angular.module('app.modules.provider', [
  NavBar,
  Auth,
  Login,
  Register,
  Profile,
  Dashboard,
])
  .service('AuthService', AuthService)
  .config($stateProvider => {
    "ngInject";

    $stateProvider
      .state('providersAuth', {
        url: '/auth',
        template: '<app-provider-auth></app-provider-auth>'
      })
      .state('providers', {
        url: '/providers',
        template: '<ui-view></ui-view>',
        resolve: {
          _isUserLogged: (AuthService) => AuthService.isUserLogged()
        },
        controller: ($state, _isUserLogged) => {
          'ngIngect'
          const arrAuth = ['providers', 'providersAuth', 'providers.login', 'providers.register']
          const currPageIsAuthType = arrAuth.indexOf($state.current.name) > -1

          if (_isUserLogged && currPageIsAuthType) { // if user logged by try to access for not auth page
            $state.go('providers.place-list')
          } else if (!_isUserLogged && !currPageIsAuthType) { // else if user not logged
            $state.go('providersAuth')
          }
        }
      })
      .state('providers.login',  {
        url: '/login',
        template: '<app-provider-login></app-provider-login>'
      })
      .state('providers.register', {
        url: '/register',
        template: '<app-provider-register></app-provider-register>'
      })
      .state('providers.place-list', {
        url: '/places',
        template: '<app-provider-dashboard></app-provider-dashboard>'
      })
      .state('providers.profile', {
        url: '/profile',
        template: '<app-provider-profile></app-provider-profile>'
      })
  })
  .name;
