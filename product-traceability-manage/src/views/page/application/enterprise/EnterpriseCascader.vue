<template>
  <cascader :block="block" :placeholder="computedPlaceholder" v-model="model" :props="props" @change="handleChange"></cascader>
</template>

<script>
  import enterpriseApi from '../../../../apis/application/enterprise';
  import CascaderSelect from '../../../mixins/CascaderSelect';

  export default {
    name: 'EnterpriseCascader',
    mixins: [CascaderSelect],
    props: {
      parentId: {
        type: [Number, String]
      }
    },
    data () {
      const self = this;
      return {
        api: enterpriseApi,
        entityName: 'enterprise',
        props: {
          lazy: true,
          emitPath: false,
          checkStrictly: true,
          lazyLoad (node, resolve) {
            const parentId = node.data?.value;
            self.getAll(parentId).then(items => {
              resolve(items);
            });
          }
        }
      };
    },
    methods: {
      getAll (parentId) {
        return new Promise((resolve, reject) => {
          enterpriseApi.getAll(this.getFetchParams(parentId)).then(result => {
            resolve(result.items.map(item => {
              return {
                value: item.id,
                label: item.name
              };
            }));
          });
        });
      },
      getFetchParams(parentId) {
        return {
          id: parentId || this.$store.getters.user?.enterpriseId
        };
      },
    }
  };
</script>
