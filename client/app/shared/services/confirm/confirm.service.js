export default class confirm {
  constructor(smoke) {
    'ngInject'

    Object.assign(this, { smoke })
  }

  open({ message, cb, id = null }) {
    const template = `
        <div class="confirm__header">Confirm</div>
        <div class="confirm__body">${message}</div>`

    const options = {
          ok: 'Yes',
          cancel: 'No',
          classname: 'confirm'
        }

    const onConfirm = function (isConfirm) {
          cb.call(this, isConfirm, id);
        };
    this.smoke.confirm(template, onConfirm, options);
  }
}
