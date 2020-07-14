import TimeLine from './src/TimeLine';
import TimeLineItem from './src/TimeLineItem';

TimeLine.install = function (Vue) {
  Vue.component(TimeLine.name, TimeLine);
  Vue.component(TimeLineItem.name, TimeLineItem);
};

export default TimeLine;
