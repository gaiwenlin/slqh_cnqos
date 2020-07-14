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
  import produceProcessApi from '../../../../apis/application/produceProcess';
  import CommonSelect from '../../../mixins/CommonSelect';

  export default {
    name: 'ProduceProcessSelect',
    mixins: [CommonSelect],
    data () {
      return {
        api: produceProcessApi,
        entityName: 'produceProcess'
      };
    }
  };
</script>
