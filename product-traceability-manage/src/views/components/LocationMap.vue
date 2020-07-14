<template>
  <div class="map-location">
    <i-form type="inline">
      <form-item>
        <i-input width="300" v-model="keyword" :placeholder="$t('app.common.property.keyword')"></i-input>
      </form-item>
      <form-item>
        <i-input width="300" v-model="region" :placeholder="$t('app.common.property.region')"></i-input>
      </form-item>
      <form-item>
        <i-button border circle
                  icon="search"
                  @click="search"
                  scene="primary">{{$t('app.common.action.search')}}</i-button>
      </form-item>
    </i-form>
    <div ref="mapBox" id="mapBox" style="height: 500px;"></div>
  </div>
</template>

<script>
  const qq = window.qq;

  export default {
    name: 'LocationMap',
    props: {
      value: {
        type: Object
      }
    },
    watch: {
      value: {
        handler () {
          this.setPosition();
        },
        // 深度观察
        deep: true
      }
    },
    data () {
      return {
        searchService: [],
        keyword: null,
        region: null,
        markers: []
      };
    },
    methods: {
      initialize () {
        const _this = this;
        // const sw = new qq.maps.LatLng(39.96693, 116.49369); // 西南角坐标
        // const ne = new qq.maps.LatLng(39.88795, 116.28666); // 东北角坐标
        const center = new qq.maps.LatLng(31.584617993869276, 120.29067993164062);
        const myOptions = {
          zoom: 13,
          center,
          mapTypeId: qq.maps.MapTypeId.ROADMAP
        };
        this.map = new qq.maps.Map(this.$refs.mapBox, myOptions);
        qq.maps.event.addListener(this.map, 'click', (event) => {
          this.$emit('input', {
            longitude: event.latLng.getLng(),
            latitude: event.latLng.getLat()
          });
        });
        // 设置Poi检索服务，用于本地检索、周边检索
        this.searchService = new qq.maps.SearchService({
          complete (result) {
            const pois = result.detail.pois;
            const latlngBounds = new qq.maps.LatLngBounds();
            // this.map.panTo(new qq.maps.LatLng(pois[0].latLng.lat, pois[0].latLng.lng));

            for (let i = 0, length = pois.length; i < length; i++) {
              const poi = pois[i];
              // 扩展边界范围，用来包含搜索到的Poi点
              latlngBounds.extend(poi.latLng);

              (function (n) {
                const marker = new qq.maps.Marker({
                  map: _this.map
                });
                marker.setPosition(pois[n].latLng);
                marker.setTitle(i + 1);
                _this.markers.push(marker);
              })(i);
            }
            _this.map.fitBounds(latlngBounds);
          },
          // 若服务请求失败，则运行以下函数
          error () {
            alert('出错了。');
          }
        });
      },
      clearOverlays (overlays) {
        let overlay;
        while (overlay = overlays.pop()) {
          overlay.setMap(null);
        }
      },
      setPosition () {
        if (this.value && this.value.longitude && this.value.latitude) {
          if (this.marker) {
            this.marker.setMap(null);
            this.marker = null;
          }
          this.marker = new qq.maps.Marker({
            position: new qq.maps.LatLng(this.value.latitude, this.value.longitude),
            map: this.map
          });
        }
      },
      location () {
        this.map.getCurrentPosition();
      },
      search () {
        this.clearOverlays(this.markers);
        // 根据输入的城市设置搜索范围
        this.searchService.setLocation(this.region);
        // 根据输入的关键字在搜索范围内检索
        this.searchService.search(this.keyword);
      }
    },
    mounted () {
      this.initialize();
      this.setPosition();
    }
  };
</script>
