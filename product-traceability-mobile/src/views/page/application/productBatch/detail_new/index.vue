<template>
  <div v-if="loaded">
    <base-info :model="model"></base-info>
  </div>
</template>

<script>
  import BaseInfo from './BaseInfo';
  import { detail, uploadAddress } from '../../../../../apis/application/productBatch';

  export default {
    name: 'ProductBatchDetail',
    components: {
      BaseInfo
    },
    data () {
      return {
        id: null,
        model: {},
        loaded: false
      };
    },
    methods: {
      async get () {
        this.loading = true;
        const result = await detail({ id: this.id });
        this.model = result;
        this.loading = false;
        this.loaded = true;
      }
    },
    created () {
      this.id = this.$route.query.id;
      this.get();
      if (returnCitySN && this.id) {
        uploadAddress({
          productId: Number(this.$route.query.id),
          cip: returnCitySN.cip,
          cname: returnCitySN.cname,
          cid: returnCitySN.cid
        })
      }
    }
  };
</script>
