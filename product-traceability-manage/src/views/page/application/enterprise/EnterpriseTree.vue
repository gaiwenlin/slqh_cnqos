<template>
  <tree :props="props"
        ref="tree"
        node-key="id"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :default-expand-all="true"
        :load="loadNode"
        lazy></tree>
</template>

<script>
  import enterpriseApi from '../../../../apis/application/enterprise';

  export default {
    name: 'EnterpriseTree',
    data () {
      return {
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
      reload () {
      },
      clearSelect () {
        this.$refs.tree.setCheckedKeys([]);
      },
      handleNodeClick (data, node) {
        this.$emit('select', data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '我的企业', id: this.$store.state.session.user.enterpriseId }]);
        }
        enterpriseApi.getAll({
          id: node.data ? node.data.id : this.$store.state.session.user.enterpriseId
        }).then(result => {
          resolve(result.items);
        });
      }
    }
  };
</script>
