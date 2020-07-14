<template>
  <dropdown trigger="click" @select="handleSetSize">
    <div>
      <icon name="size" class="size-icon" />
    </div>
    <dropdown-menu slot="dropdown">
      <dropdown-menu-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{ item.label|t }}
      </dropdown-menu-item>
    </dropdown-menu>
  </dropdown>
</template>

<script>
export default {
  name: 'SizeSelect',
  data() {
    return {
      sizeOptions: [
        { label: 'system.globalSize.large', value: 'default' },
        { label: 'system.globalSize.medium', value: 'medium' },
        { label: 'system.globalSize.small', value: 'small' },
        { label: 'system.globalSize.smaller', value: 'smaller' }
      ]
    };
  },
  computed: {
    size() {
      return this.$store.getters.size;
    }
  },
  methods: {
    handleSetSize(size) {
      this.$CANKNOW.config.size = size;
      this.$store.commit('app/setSize', size);
      this.refreshView();
      this.$Message.success(this.$t('system.globalSize.switchSizeSuccess'));
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route);

      const { fullPath } = this.$route;

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        });
      });
    }
  }
};
</script>
