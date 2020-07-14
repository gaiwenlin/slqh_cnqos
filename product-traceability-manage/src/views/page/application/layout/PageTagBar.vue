<template>
  <div class="page-tag-bar">
    <div class="tags-container">
      <div class="tags-outer-scroll-container" ref="scrollContainer" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll">
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
          <transition-group>
            <Tag
              v-for="item in pageTagsList"
              ref="tagsPageOpened"
              :key="item.name"
              radius
              :name="item.name"
              @close="closePage"
              @click.native="linkTo(item)"
              :closable="item.name==='home'?false:true"
              :disabled="item.children?(item.children[0].name===currentPageName?false:true):(item.name===currentPageName?false:true)">{{ item.name|getTitleFromName }}</Tag>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './../../../../store/index';

  export default {
    name: 'PageTagBar',
    filterParams: {
      getTitleFromName (value) {
        return store.getters['app/hashMenus'][value] ? store.getters['app/hashMenus'][value].displayName : value;
      }
    },
    data () {
      return {
        currentPageName: this.$route.name,
        tagBodyLeft: 0,
        refsTag: [],
        tagsCount: 1
      };
    },
    props: {
      pageTagsList: Array,
      beforePush: {
        type: Function,
        default: (item) => {
          return true;
        }
      }
    },
    computed: {
      title () {
        return this.$store.state.app.currentTitle;
      },
      tagsList () {
        return this.$store.state.app.pageOpenedList;
      }
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.name;
        this.$nextTick(() => {
          this.refsTag.forEach((item, index) => {
            if (to.name === item.name) {
              let tag = this.refsTag[index].$el;
              this.moveToView(tag);
            }
          });
        });
        this.tagsCount = this.tagsList.length;
      }
    },
    methods: {
      closePage (event, name) {
        let pageOpenedList = this.$store.state.app.pageOpenedList;
        let lastPageObj = pageOpenedList[0];
        if (this.currentPageName === name) {
          let length = pageOpenedList.length;
          for (let i = 1; i < length; i++) {
            if (pageOpenedList[i].name === name) {
              if (i < (length - 1)) {
                lastPageObj = pageOpenedList[i + 1];
              }
              else {
                lastPageObj = pageOpenedList[i - 1];
              }
              break;
            }
          }
        }
        this.$store.commit('app/removeTag', name);
        this.$store.commit('app/closePage', name);
        pageOpenedList = this.$store.state.app.pageOpenedList;
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
        if (this.currentPageName === name) {
          this.linkTo(lastPageObj);
        }
      },
      linkTo (item) {
        let routerObj = {};
        routerObj.name = item.name;
        if (item.arguments) {
          routerObj.params = item.arguments;
        }
        if (item.query) {
          routerObj.query = item.query;
        }
        if (this.beforePush(item)) {
          this.$router.push(routerObj);
        }
      },
      handleScroll (e) {
        const type = e.type;
        let delta = 0;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
        }
        let left = 0;
        if (delta > 0) {
          left = Math.min(0, this.tagBodyLeft + delta);
        }
        else {
          if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
            if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
              left = this.tagBodyLeft;
            }
            else {
              left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
            }
          }
          else {
            this.tagBodyLeft = 0;
          }
        }
        this.tagBodyLeft = left;
      },
      moveToView (tag) {
        if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft + 10;
        }
        else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollContainer.offsetWidth - 100) {
          // 标签在可视区域
          this.tagBodyLeft = Math.min(0, this.$refs.scrollContainer.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20);
        }
        else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollContainer.offsetWidth - 100 - tag.offsetWidth) + 20);
        }
      },
      handleTagsOption (type) {
        if (type === 'clearAll') {
          this.$store.commit('clearAllTags');
          this.$router.push({
            name: 'home'
          });
        }
        else {
          this.$store.commit('app/clearOtherTags', this);
        }
      }
    },
    mounted () {
      this.refsTag = this.$refs.tagsPageOpened;
      setTimeout(() => {
        this.refsTag.forEach((item, index) => {
          if (this.$route.name === item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      }, 1); // 这里不设定时器就会有偏移bug
      this.tagsCount = this.tagsList.length;
    }
  };
</script>

<style lang="scss">
  @import "page-tag-bar";
</style>
