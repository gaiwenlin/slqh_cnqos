import authorization from '../application';
import eventBus from './../utils/eventBus';

export default {
  onAuthor (handle) {
    if (authorization.getToken()) {
      handle();
    }
    else {
      eventBus.$on('onAuthor', handle);
    }
  }
};
