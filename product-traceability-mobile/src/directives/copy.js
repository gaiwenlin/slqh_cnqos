import Clipboard from 'clipboard';
import { Dialog } from 'vant';

export default {
  bind (el, binding, vnode) {
    const clipboard = new Clipboard(el, {
    });
    clipboard.on('success', e => {
      Dialog.alert({
        message: binding.value
      });
    });
  }
};
