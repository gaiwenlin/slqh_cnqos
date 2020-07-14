import store from './../store/index';

export default {
  bind (el, binding, vnode) {
    if (!binding.value) {
      return;
    }
    const image = new Image();
    if (binding.value.includes('//')) {
      image.src = binding.value;
    }
    else {
      image.src = store.getters.baseUrl + binding.value;
    }
    image.onload = () => {
      el.src = image.src;
    };
  }
};
