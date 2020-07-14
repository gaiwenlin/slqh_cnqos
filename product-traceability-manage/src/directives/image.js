import appConfig from './../config/app';

export default {
  bind (el, binding, vnode) {
    const image = new Image();
    if (binding.value.includes('//')) {
      image.src = binding.value;
    }
    else {
      image.src = appConfig.baseUrl + binding.value;
    }
    image.onload = () => {
      el.src = image.src;
    };
  }
};
