<template>
  <div>
    <Tree :data="treeData"
          :default-checked-keys="defaultCheckedKeys"
          ref="tree"
          :props="props"
          @check-change="handleCheckChange"
          node-key="id"
          :expandOnClickNode="false"
          @node-click="handleClick"
          :default-expanded-keys="defaultExpandedKeys"
          :accordion="accordion"
          :show-checkbox="showCheckbox"></Tree>
  </div>
</template>

<script>
  export default {
    name: 'permission-tree',
    props: {
      accordion: {
        type: Boolean,
        default: true
      },
      defaultExpandAll: {
        type: Boolean,
        default: true
      },
      defaultCheckedKeys: {
        type: Array,
        default () {
          return [];
        }
      },
      defaultSelectedKeys: {
        type: Array,
        default () {
          return [];
        }
      },
      showCheckbox: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        props: {
          label: 'name'
        }
      };
    },
    watch: {
      defaultSelectedKeys (value) {
        value.forEach((item) => {
          this.$refs.tree.setCurrentKey(item);
        });
        this.$nextTick(() => {
          this.handleClick(this.$refs.tree.getCurrentNode());
        });
      },
      defaultCheckedKeys (newValue) {
        return this.$refs.tree.setCheckedKeys(newValue);
      }
    },
    computed: {
      treeData () {
        return this.$store.getters['session/permissionTree'];
      },
      defaultExpandedKeys () {
        return this.treeData.length ? [this.treeData[0].name] : [];
      }
    },
    methods: {
      handleCheckChange () {
        this.$emit('check-change');
      },
      handleClick (value) {
        this.$emit('node-click', value);
      },
      getCheckedKeys () {
        return this.$refs.tree.getCheckedKeys();
      }
    }
  };
</script>
