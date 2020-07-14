<template>
  <div class="modular" :class="classes">
    <div class="modular-header" v-if="title || $slots.header" @click="handleClickHeader">
      <slot name="header">
        <span class="modular-header-flag" v-if="flag"></span>
        <div class="modular-icon">
          <slot name="icon">
            <img src="./../../../../assets/icons/modular/info.png">
          </slot>
        </div>
        <h3 class="modular-title">{{title}}</h3>
        <icon class="modular-right-icon" name="next" v-if="link"></icon>
      </slot>
    </div>
    <div class="modular-body">
      <slot></slot>
    </div>
    <div class="modular-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modular',
    props: {
      title: {
        type: String
      },
      icon: {
        type: String
      },
      flag: {
        type: Boolean,
        default: true
      },
      stretch: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Boolean,
        default: false
      },
      link: [String, Object]
    },
    computed: {
      classes () {
        return {
          stretch: !!this.stretch,
          radius: !!this.radius
        };
      }
    },
    methods: {
      handleClickHeader () {
        this.$emit('clickHeader');
      }
    }
  };
</script>
