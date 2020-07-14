<template>
  <vue-qr :logoSrc="logo" :text="text" :size="size" :margin="0"></vue-qr>
</template>

<script>
  import vueQr from 'vue-qr';

  export default {
    name: 'Qrcode',
    components: {
      vueQr
    },
    props: {
      logo: null,
      text: null,
      size: null
    }
  };
</script>

