<template>
  <i-select :width="width"
            block
            clearable
            :multiple="multiple"
            v-model="selectedValue"
            @change="handleChange"
            :placeholder="computedPlaceholder">
    <i-option v-for="item in items" :key="item.id" :value="item.id" :label="item.name"></i-option>
  </i-select>
</template>

<script>
  import roleApi from '../../../../apis/application/role';
  import CommonSelect from '../../../mixins/CommonSelect';

  export default {
    name: 'RoleSelect',
    mixins: [CommonSelect],
    data () {
      return {
        api: roleApi,
        entityName: 'role'
      };
    }
  };
</script>
