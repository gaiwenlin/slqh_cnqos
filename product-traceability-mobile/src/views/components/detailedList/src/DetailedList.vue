<template>
  <div class="detailed-list-wrap" :class="classes">
    <div class="detailed-list-header" v-if="title">
      <h2 class="detailed-list-title">{{title}}</h2>
    </div>
    <ul class="detailed-list" :class="listClasses"><slot></slot></ul>
  </div>
</template>

<script>
  export default {
    name: 'DetailedList',
    props: {
      title: {
        type: String
      },
      direction: {
        type: String,
        default: 'row'
      },
      labelWidth: {
        type: [Number, String],
        default: 100
      },
      justify: {
        type: String
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          this.direction,
          {
            border: this.border
          }
        ];
      },
      listClasses () {
        return [
          {
            [`justify-${this.justify}`]: !!this.justify
          }
        ];
      }
    }
  };
</script>
