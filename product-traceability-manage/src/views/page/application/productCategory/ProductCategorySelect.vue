<template>
  <i-select :width="width"
            block
            v-model="selectedValue"
            @change="handleChange"
            :placeholder="computedPlaceholder">
    <i-option v-for="item in items" :key="item.id" :value="item.id">{{item.name}}</i-option>
  </i-select>
</template>

<script>
  import productCategoryApi from '../../../../apis/application/productCategory';
  import CommonSelect from '../../../mixins/CommonSelect';

  export default {
    name: 'ProductCategorySelect',
    mixins: [CommonSelect],
    data () {
      return {
        api: productCategoryApi,
        entityName: 'productCategory'
      };
    }
  };
</script>
