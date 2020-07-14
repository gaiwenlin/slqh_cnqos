<template>
  <modular title="源产地信息" v-if="model">
    <img slot="icon" src="../../../../assets/icons/section/chanpin-02.png">
    <detailed-list direction="column" class="margin-bottom-1">
      <detailed-item label="源产地名称" :to="to" v-if="model.product.originEnterprise.name">{{model.product.originEnterprise.name}}</detailed-item>
      <detailed-item label="生长过程" v-if="steps.length>0">
        <flow>
          <flow-item :title="step.name" v-for="step in steps" :key="step.name">
            <van-image :src="changeImageUrl(step.picture)" fit="cover" lazy-load class="vanImage">
            </van-image>
          </flow-item>
        </flow>
      </detailed-item>
    </detailed-list>
  </modular>
</template>

<script>
  import {changeImageUrl} from '../../../../utils/prefixUtils'
  export default {
    name: 'SourceArea',
    props: {
      model: null
    },
    data() {
      return {
      };
    },
    methods:{
      changeImageUrl,
    },
    computed: {
      steps(){
        let list =[];
        if(this.model.product.growthProcess.steps){
          this.model.product.growthProcess.steps.forEach(item=>{
            if(item.name||item.picture){
              list.push(item);
            }
          })
        }
        return list;
      },
      to () {
        return {
          path: '/enterprise/detail', query: { id: this.model.product.originEnterprise.id }
        };
      }
    }
  };
</script>
<style>
  .vanImage{
    height: 100px;
    width: 200px;
  }
</style>

