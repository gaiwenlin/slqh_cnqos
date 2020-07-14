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
  import enterpriseApi from '../../../../apis/application/enterprise';
  import CommonSelect from '../../../mixins/CommonSelect';

  export default {
    name: 'EnterpriseSelector',
    mixins: [CommonSelect],
    props: {
      parentId: {
        type: [Number, String]
      }
    },
    data () {
      return {
        api: enterpriseApi,
        entityName: 'enterprise'
      };
    },
    methods: {
      fetchData () {
        this.api.getAlls(this.getFetchParams()).then((result) => {
          this.items = result.items;
        });
      },
      getFetchParams() {
        return {
          id: this.parentId || this.$store.getters.user?.enterpriseId
        };
      },
    }
  };
</script>
