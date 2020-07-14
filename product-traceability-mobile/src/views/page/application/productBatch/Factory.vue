<template>
  <modular title="工厂信息">
    <img slot="icon" src="../../../../assets/icons/section/chanpin-03.png">
    <detailed-list direction="column" class="margin-bottom-1">
      <detailed-item label="工厂名称" :to="to">{{model.product.factoryEnterprise.name}}</detailed-item>
      <detailed-item label="加工流程">
        <div class="produce-process-list margin-top-1">
          <div class="produce-process-item" v-for="step in model.product.produceProcess.steps" :key="step.name">
            <div class="produce-process-item-title-wrap">
              <div class="produce-process-item-title">{{step.name}}</div>
            </div>
            <div class="image-warp">
              <van-image :src="changeImageUrl(step.picture)" fit="cover" lazy-load radius="10">
              </van-image>
            </div>
            <!--<img class="produce-process-item-picture" :src="step.picture|filePath">-->
          </div>
        </div>
      </detailed-item>
    </detailed-list>
  </modular>
</template>

<script>
  import {changeImageUrl} from '../../../../utils/prefixUtils'
  export default {
    name: 'Factory',
    props: {
      model: null
    },
    methods: {
      changeImageUrl,
    },
    computed: {
      to () {
        return {
          path: '/enterprise/detail', query: { id: this.model.product.factoryEnterpriseId }
        };
      }
    }
  };
</script>

<style lang="scss">
  @import "~canknow-ui-core/src/scss/variables";
  .produce-process-list {
    .produce-process-item {
      background: #ffffff;
      border-radius: $block-border-radius;
      margin-bottom: $component-span;
      box-shadow: 1px 1px 3px #dddddd;
      padding: $content-padding;
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;

      &:not(:last-child) {
        &:before, &:after {
          position: absolute;
          top: calc(100% - 5px);
          z-index: 1;
          width: 8px;
          height: 20px;
          content: '';
          background: url("./../../../../assets/icons/link.png");
          background-size: 100% 100%;
        }
        &:before {
          left: 64px;
        }
        &:after {
          right: 64px;
        }
      }

      .produce-process-item-title-wrap {
        text-align: center;
        .produce-process-item-title {
          position: relative;
          display: inline-block;
          z-index: 1;
          &:before {
            content: '';
            width: calc(100% + 10px);
            position: absolute;
            bottom: 4px;
            left: -5px;
            height: 8px;
            background: #FFD372;
            z-index: -1;
          }
        }
      }

      .produce-process-item-picture {
        width: 100%;
        border-radius: $block-border-radius;
      }
      .image-warp{
        width: 90%;
      }
    }
  }
</style>
