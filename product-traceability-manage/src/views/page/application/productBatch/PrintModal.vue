<template>
  <modal class="print-modal" v-model="dialogVisible" @cancel="handleCancel" title="打印产品批次">
    <alert v-if="printerLoadError">
      <div class="printer-load-message" v-html="printerLoadError"></div>
    </alert>
    <i-form :label-width="100">
      <form-item label="打印数量">
        <i-input min="1" type="number" v-model="count" placeholder="请输入打印数量"></i-input>
      </form-item>
      <!--<form-item label="打印标语">-->
        <!--<i-input block type="textarea" v-model="printText" placeholder="请输入打印标语"></i-input>-->
      <!--</form-item>-->
      <!--<form-item label="打印大小">-->
        <!--<row>-->
          <!--<column :md="12">-->
            <!--<i-input type="number" v-model="printSettingsModel.width" placeholder="请输入打印宽度"><template slot="prepend">宽度</template><template slot="append">mm</template></i-input>-->
          <!--</column>-->
          <!--<column :md="12">-->
            <!--<i-input type="number" v-model="printSettingsModel.height" placeholder="请输入打印高度"><template slot="prepend">高度</template><template slot="append">mm</template></i-input>-->
          <!--</column>-->
        <!--</row>-->
      <!--</form-item>-->
      <form-item label="打印大小">
        <i-select v-model="printerSize" placeholder="请选择打印机">
          <i-option :value="'50,20'">50mm * 20mm</i-option>
          <i-option :value="'70,40'">70mm * 40mm</i-option>
          <i-option :value="'90,50'">90mm * 50mm</i-option>
        </i-select>
      </form-item>
      <form-item label="打印机">
        <i-select v-model="printerIndex" placeholder="请选择打印机">
          <i-option :key="index" :value="item.value" v-for="(item, index) in printers">{{item.label}}</i-option>
        </i-select>
      </form-item>
    </i-form>
    <div class="print_warp">
      <div class="print_bg">
        <img class="product-batch-print-content-image" src="./../../../../assets/images/print_bg_2.png">
        <qrcode :text="qrcodeUrl" :size="2048" class="print_qrcode"></qrcode>
      </div>
    </div>

    <!--<div class="product-batch-print-content-wrap" ref="productBatchPrintContent" id="printForm">-->
      <!--<div class="product-batch-print-content">-->
        <!--<div class="product-batch-print-content-image-wrap">-->
          <!--<img ref="productBatchPrintLogo" class="product-batch-print-content-image" src="./../../../../assets/images/logo.png">-->
        <!--</div>-->
        <!--<div class="product-batch-print-content-text">-->
          <!--<ul>-->
            <!--<li v-for="text in printTexts" :key="text" class="">{{text}}</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div class="product-batch-print-qrcode-wrap">-->
          <!--<div class="product-batch-print-qrcode-content">-->
            <!--<div class="product-batch-print-qrcode">-->
              <!--<qrcode :text="qrcodeUrl" :size="2048"></qrcode>-->
            <!--</div>-->
            <!--<div class="qrcode-notice">扫码查质量</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <template slot="footer">
      <i-button size="large" border circle icon="back" @click="handleCancel">{{$t('app.common.action.cancel')}}</i-button>
      <i-button size="large" circle border icon="success" scene="primary" @click="print">打印</i-button>
      <i-button size="large" circle border icon="download" scene="primary" @click="downloadFile">下载</i-button>
      <!--<i-button :disabled="!printText || !count" size="large" circle border icon="success" scene="primary" v-print="'#printForm'">打印</i-button>-->
    </template>
  </modal>
</template>

<script>
  import { getLodop, loadCLodop, needCLodop } from '../../../../plugins/LodopFuncs';
  import appConfig from '../../../../config/app';
  import productBatchApi from '../../../../apis/application/productBatch';
  import {downLoadPng} from '../../../../utils/zipdownload';

  export default {
    name: 'PrintModal',
    props: {
      value: Boolean,
      model: null,
    },
    data () {
      return {
        LODOP: null,
        count: 1,
        printers: [],
        printerLoadError: null,
        printerSize: "50,20",
        printText: '生产有记录,流向可追踪,质量可追溯',
        printerIndex: localStorage.getItem('productBatchPrinterIndex') ? parseInt(localStorage.getItem('productBatchPrinterIndex')) : 0,
        dialogVisible: this.visible,
        printSettingsModel: {
          width: 50,
          height: 30,
        }
      };
    },
    computed: {
      printSettings () {
        return {
          width: this.printSettingsModel.width * 10,
          height: this.printSettingsModel.height * 10,
          name: 'strPageName'
        };
      },
      qrcodeUrl () {
        console.log(appConfig.domain + '/app/mobile/#productBatch/detail?id=' + this.model?.id);
        return appConfig.domain + '/app/mobile/#productBatch/detail?id=' + this.model?.id;
      },
      printTexts () {
        return this.printText.split(',');
      }
    },
    watch: {
      printerIndex (value) {
        localStorage.setItem('productBatchPrinterIndex', value);
      },
      value (val) {
        if (val !== this.dialogVisible) {
          this.dialogVisible = val;
        }
      }
    },
    mounted() {
      this.getPrinterData();
    },
    methods: {
      async getPrinterData() {
        if (needCLodop()) {
          try {
            await loadCLodop();
          }
          catch (e) {
            console.log(e);
          }
        }
        try {
          this.LODOP = await getLodop();
          window.CLODOP.On_Return = this.handlePrint;
          window.LODOP.On_Return = this.handlePrint;
          let printerCount = this.LODOP.GET_PRINTER_COUNT();
          for (let i = 0; i < printerCount; i++) {
            this.printers.push({
              label: this.LODOP.GET_PRINTER_NAME(i),
              value: i
            });
          }
        }
        catch (e) {
          this.printerLoadError = e;
        }
      },
      handleCancel () {
        this.$emit('input', false);
      },
      handlePrint(TaskID, value) {
        if (value === '1') {
          productBatchApi.updatePrintNum({
            id: this.model.id,
            printNum: parseInt(this.count) + this.model.printNum
          }).then(result => {
            this.model.printNum += this.count;
            this.$emit('print');
          });
        }
      },
      downloadFile(){
        console.log(this.model);
        if(this.model && this.model.qrCode){
          const list = this.model.qrCode.split('/');
          if(list.length>0){
            let fileName = list[list.length-1];
            const url = "http://slqh.cnqos.com/api" + this.model.qrCode;
            downLoadPng(url,fileName);
          }
        }
      },
      async print () {
        this.LODOP.PRINT_INIT();
        this.LODOP.SET_PRINTER_INDEX(this.printerIndex);
        this.LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true); //设置以纸张边缘为基点
        this.LODOP.SET_PREVIEW_WINDOW(0, 1, 1);
        this.LODOP.SET_PRINT_PAGESIZE(1, this.printerSize.split(',')[0] + 'mm', this.printerSize.split(',')[1] + 'mm');
        this.LODOP.SET_PRINT_COPIES(this.count);
        // this.$refs.productBatchPrintLogo.style.opacity = 0;
        // let printTextHtml = `<link type="text/css" rel="stylesheet" href="/static/product-batch-print.css?version=${Date.now()}">`;
        // printTextHtml += `<body style="margin:0">${this.$refs.productBatchPrintContent.innerHTML}</body>`;
        // this.$refs.productBatchPrintLogo.style.opacity = 1;
        // this.LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', printTextHtml);
        this.LODOP.SET_PRINT_STYLE('FontSize', 5);
        this.LODOP.SET_PRINT_STYLE('FontColor', '#000');
        // const textList = this.printText.split(',');
        // if(textList.length>0){
        //   textList.forEach((item,index)=>{
        //     const height = 6+index*3;
        //     this.LODOP.ADD_PRINT_TEXT(height+"mm", "20mm", "20mm", "12mm",item);
        //   })
        // }
        this.LODOP.ADD_PRINT_BARCODE('2mm', '38mm', '9mm', '9mm', 'QRCode', this.qrcodeUrl);
        // this.LODOP.ADD_PRINT_TEXT("13mm", "38.5mm", "12mm", "12mm", "扫码查质量");
        this.LODOP.PREVIEW();
      }
    }
  };
</script>

<style lang="scss">
  @import "product-batch-print";

  .print_bg{
    display: flex;
  }
  .print_qrcode{
    width:110px;
    height:110px;
    margin-top: 20px;
    margin-left: -150px;
  }
</style>
