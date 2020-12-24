<template>
  <div>
    <van-tabbar v-model="active" @change="tog" placeholder>
      <van-tabbar-item>
        <van-icon class="iconfont icon-dianying" slot="icon" />
        <span>电影</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class="iconfont icon-dianyingyuan" slot="icon" />
        <span>电影院</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class="iconfont icon-wode" slot="icon" />
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, icon } from "vant";
import "@/assets/icon/iconfont.css";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(icon);
export default {
  data() {
    return {
      active: 0,
      url: ["/films", "/cinms", "/center"],
    };
  },
  created() {
    this.active = this.$route.path === "/films/newpaw" ||"/films/comming" ? 0 : this.url.indexOf(this.$route.path);
  },
  methods: {
    tog: function (index) {
      this.$router.push(this.url[index]);
    },
  },
  watch: {
    $route:function(val){
      if(val.fullPath =="/films/newpaw" ||val.fullPath =="/films/comming" ){
        this.active = 0
      }else{
        this.active = this.url.indexOf(val.fullPath)
      }
    }
  }
};
</script>