import Flow from './src/Flow';
import FlowItem from './src/FlowItem';

Flow.install = function (Vue) {
  Vue.component(Flow.name, Flow);
  Vue.component(FlowItem.name, FlowItem);
};

export default Flow;
