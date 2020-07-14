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
  import growthProcessApi from '../../../../apis/application/growthProcess';
  import CommonSelect from '../../../mixins/CommonSelect';

  export default {
    name: 'GrowthProcessSelect',
    mixins: [CommonSelect],
    data () {
      return {
        api: growthProcessApi,
        entityName: 'growthProcess'
      };
    }
  };
</script>
