<template>
  <div>
    <van-index-bar :index-list="checkednav">
    <template v-for="(item,index) in city">
      <van-index-anchor :key="index">{{item.index}}</van-index-anchor>
      <van-cell v-for="citya in item.data" :key="citya.cityId" :title="citya.name" @click="pul(citya.cityId,citya.name)"/>
    </template>
    </van-index-bar>
  </div>
</template>
<script>
import url from "@/config/uri";
import Vue from "vue";
import { IndexBar, IndexAnchor,Cell, CellGroup } from "vant";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(CellGroup);
export default {
  data() {
    return {
      allnav: [],
      checkednav: [],
      city: [],
    };
  },
  created() {
    this.$store.commit("show", false);
    this.$https.get(url.getCity).then((ret) => {
        console.log(ret)
        for (let i = 65; i <= 90; i++) {
          this.allnav.push(String.fromCharCode(i));
        }
      this.allnav.forEach((v) => {
        let tmp = ret.data.cities.filter((item) => 
          v.toLowerCase() == item.pinyin.substr(0, 1)
        );
        if (tmp.length > 0) {
          this.checkednav.push(v);
          this.city.push({index:v,data:tmp});
        }
      });
    });
  },
  beforeDestroy() {
    this.$store.commit("show", true);
  },
  methods: {
      pul(cityId,cityName){
          this.$store.commit("setcity",{cityId,cityName})
          this.$router.go(-1)
      }
  }
};
</script>