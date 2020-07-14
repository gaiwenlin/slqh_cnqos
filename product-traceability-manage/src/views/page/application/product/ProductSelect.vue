<template>
  <i-select :width="width"
            block
            clearable
            v-model="selectedValue"
            @change="handleChange"
            :placeholder="computedPlaceholder">
    <i-option v-for="item in items" :key="item.id" :value="item.id">{{item.name}}</i-option>
  </i-select>
</template>

<script>
  import productApi from '../../../../apis/application/product';
  import CommonSelect from '../../../mixins/CommonSelect';

  export default {
    name: 'ProductSelect',
    mixins: [CommonSelect],
    data () {
      return {
        api: productApi,
        entityName: 'product'
      };
    }
  };
</script>
