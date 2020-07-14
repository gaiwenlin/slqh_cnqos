<template>
  <div v-if="errorLogs.length>0">
    <badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible=true">
      <i-button icon="bug" style="padding: 8px 10px;" size="small" scene="danger"></i-button>
    </badge>
    <modal :visible.sync="dialogTableVisible" width="80%" transfer>
      <div slot="header">
        <span style="padding-right: 10px;">Error Log</span>
        <i-button size="smaller" type="primary" icon="remove" @click="clearAll">Clear All</i-button>
      </div>
      <i-table :data="errorLogs" border>
        <table-column label="Message">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <tag type="warning">
                {{ row.vm.$vnode.tag }} error in {{ row.info }}
              </tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </table-column>
        <table-column label="Stack">
          <template slot-scope="scope">
            {{ scope.row.err.stack }}
          </template>
        </table-column>
      </i-table>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'ErrorLog',
    data() {
      return {
        dialogTableVisible: false
      };
    },
    computed: {
      errorLogs() {
        return this.$store.getters.errorLogs;
      }
    },
    methods: {
      clearAll() {
        this.dialogTableVisible = false;
        this.$store.commit('errorLog/clearErrorLog');
      }
    }
  };
</script>

<style lang="scss">
  @import "./../../styles/variables";
  .message-title {
    font-size: $font-size-large;
    color: $title-text-color;
    font-weight: bold;
    padding-right: $content-padding;
  }
</style>
