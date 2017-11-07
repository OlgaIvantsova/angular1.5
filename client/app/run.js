export default ($transitions) => {
  'ngInject';

  $transitions.onError({to: '*'}, function () {
    console.warn('$stateChangeError: ', ...arguments);
  });
  $transitions.onSuccess({to: '*'}, function () {
    console.info('$stateChangeSuccess: ', ...arguments);
  });
  $transitions.onStart({to: '*'}, function () {
    console.info('$stateChangeStart: ', ...arguments);
  });
}
