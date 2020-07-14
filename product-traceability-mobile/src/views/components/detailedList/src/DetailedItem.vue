<template>
  <li class="detailed-item" @click="handleClick" :class="{ clickable: clickable }">
    <label class="detailed-item-label" :style="labelStyles">{{label}}</label>
    <div class="detailed-item-content"><slot></slot></div>
    <van-icon class="detailed-item-to-icon" name="arrow" v-if="clickable"/>
  </li>
</template>

<script>
  export default {
    name: 'DetailedItem',
    props: {
      labelWidth: {
        type: [String, Number]
      },
      label: {
        type: String
      },
      to: {
        type: Object
      }
    },
    computed: {
      clickable () {
        return !!this.to;
      },
      labelStyles () {
        let style = {};
        const labelWidth = this.labelWidth || this.list.labelWidth;

        if (labelWidth) {
          style.width = `${labelWidth}px`;
        }
        return style;
      },
      list () {
        return this.$parent;
      }
    },
    methods: {
      handleClick () {
        this.$router.push(this.to);
      }
    }
  };
</script>
