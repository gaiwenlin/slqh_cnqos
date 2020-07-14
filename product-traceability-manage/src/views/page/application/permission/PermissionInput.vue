<template>
  <cascader :clearable="clearable" v-model="model" :props="config" :options="options" @change="handleChange"></cascader>
</template>

<script>
  import CascaderSelect from '../../../mixins/CascaderSelect';

  export default {
    name: 'PermissionInput',
    mixins: [CascaderSelect],
    computed: {
      options () {
        return this.$store.getters['session/permissionTree'];
      }
    }
  };
</script>
