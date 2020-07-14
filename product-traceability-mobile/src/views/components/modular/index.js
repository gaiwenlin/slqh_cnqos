import Modular from './src/Modular';

/* istanbul ignore next */
Modular.install = function (Vue) {
    Vue.component(Modular.name, Modular);
};

export default Modular;
