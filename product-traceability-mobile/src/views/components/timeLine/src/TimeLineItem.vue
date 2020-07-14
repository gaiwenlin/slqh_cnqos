<template>
  <div class="time-line-item" :class="[status]">
    <div class="time-line-item-tail"></div>
    <div class="time-line-item-node"><i v-if="status==='process'" class="el-timeline-item__icon el-icon-more"></i></div>
    <div class="time-line-item-date-time">
      <div class="time-line-item-date-time-wrap" v-if="dateTime">
        <div class="time-line-item-date">{{date}}</div>
        <div class="time-line-item-time">{{time}}</div>
      </div>
      <div v-else class="time-line-item-date-time-none">
      </div>
    </div>
    <div class="time-line-item-body">
      <div class="time-line-item-title">{{title}}</div>
      <div class="time-line-item-description" v-if="description">{{description}}</div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    name: 'TimeLineItem',
    props: {
      title: null,
      status: {
        type: String,
        default: ''
      },
      description: null,
      dateTime: null
    },
    computed: {
      date () {
        return moment(this.dateTime).format('YYYY-MM-DD');
      },
      time () {
        return moment(this.dateTime).format('HH:mm:ss');
      }
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .time-line-item {
    display: flex;
    border-bottom: 1px solid $split-color;
    padding: $content-padding;
    position: relative;
    &.wait-for-confirm {
      .time-line-item-node {
        background-color: $error-color;
      }
      .time-line-item-title {
        color: $error-color;
      }
    }
    &.wait {
      .time-line-item-tail {
      }
    }
    &.process {
      .time-line-item-node {
        background-color: $primary-color;
      }
    }
    &.success {
      .time-line-item-tail {
        border-color: $success-color;
      }
      .time-line-item-node {
        background-color: $success-color;
      }
    }
    &-tail {
      position: absolute;
      left: 100px;
      top: calc(#{$content-padding} + 4px);
      height: 100%;
      border-left: 2px solid #e4e7ed;
    }
    &-node {
      top: calc(#{$content-padding} + 4px);
      left: 101px;
      width: 14px;
      height: 14px;
      position: absolute;
      transform: translateX(-50%);
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-date-time {
      width: 100px;
      .time-line-item-date {
        font-size: $font-size-small;
        margin-bottom: $text-span;
      }
      .time-line-item-time {
        font-size: $font-size-large;
        font-weight: bold;
        color: #cca86d;
      }
      .time-line-item-date-time-none {
        font-size: $font-size-large;
        font-weight: bold;
        color: $property-text-color;
      }
    }
    &-body {
      flex: 1;
      padding-left: $content-padding;
      .time-line-item-title {
        font-size: $font-size;
      }
      .time-line-item-description {
        margin-top: $component-span;
        color: $sub-color;
      }
    }
  }
</style>
