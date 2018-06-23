<template>
  <recircle v-model="loading" :items="items" :finished="finished" @load="load">
    <template slot="item" slot-scope="{data}">
      <div class="item">
        <p v-show="!data.loaded"><span>loading...</span></p>
        <p :style="{opacity: +data.loaded}">this is {{data.value}}</p>
      </div>
    </template>
  </recircle>
</template>
<style>
.item p {
  padding: 30px 0;
  text-indent: 20px;
}
p span {
  background: rgb(183, 183, 207);
}
.item p:last-child {
  border-bottom: 1px solid #ccc;
}
</style>

<script>
import recircle from "../src";

export default {
  name: "App",
  mounted() {},
  data() {
    return {
      items: [],
      loading: true,
      finished: false
    };
  },
  components: {
    recircle,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.load();
    },
    load() {
      if (this.items.length === 60) {
        this.finished = true;
        this.loading = false;
        return;
      }
      setTimeout(() => {
        this.produceItem();
        this.loading = false;
        this.loaded();
      }, 100);
    },
    loaded() {
      setTimeout(() => {
        this.items.forEach(item => {
          item.loaded = true;
        });
      }, 2000);
    },
    produceItem() {
      let i = 0,
        len = 20;
      while (i++ < len) {
        this.items.push({
          loaded: false,
          value: i
        });
      }
    }
  }
};
</script>
