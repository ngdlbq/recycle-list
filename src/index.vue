<template>
  <div class="wrapper">
      <div ref="list">
        <div v-for="(item, index) in items" :key="index">
          <slot name="item" :data="item"></slot>
        </div>
      </div>
  </div>
</template>
<style lang="css">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
.wrapper {
  width: 100%;
  overflow-y: scroll;
  background: #aaaaaa;
}
</style>

<script>
import { debounce, on, off } from "./utils";
export default {
  name: "recycle",
  model: {
    prop: "loading"
  },
  props: {
    loading: Boolean, // loading 状态
    offset: {
      type: Number,
      default: 100
    },
    loadingText: {
      type: String,
      default: "正在加载中..."
    },
    finished: {
      // 判断是否还有数据
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    swapperHeight: {
      type: [Number, String],
      default: 500
    }
  },
  data() {
    return {
      height: 0,
      root: null,
      scrollEle: null
    };
  },
  computed: {
    rootHeight() {
      let sh = this.swapperHeight + "";
      if (Number(sh)) {
        return sh + "px";
      }
      if (sh.indexOf("px") !== -1 || sh.indexOf("%") !== -1) {
        return sh;
      }
    }
  },
  methods: {
    onScroll() {
      if (this.loading || this.finished) return;
      let el = this.root;
      this.height = this.scrollEle.offsetHeight;
      let { scrollTop, offsetHeight } = el;
      if (this.height - scrollTop - offsetHeight < this.offset) {
        this.$emit("input", true);
        this.$emit("load");
      }
    }
  },
  mounted() {
    this.root = this.$el;
    this.root.style.height = this.rootHeight;
    this.scrollEle = this.$refs["list"];
    let scroll = debounce(this.onScroll, 20);
    on(this.$el, "scroll", scroll);
  }
};
</script>
