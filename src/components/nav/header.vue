<template>
<div style="height:44px">
  <div id="headernav" :class="{fix:isshow}">
    <van-tabs v-model="$store.state.activeName" @change="tog">
      <van-tab title="正在上映" name="0"></van-tab>
      <van-tab title="即将上映" name="1"></van-tab>
    </van-tabs>
  </div>
</div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
export default {
    data() {
    return {
      url:["/films/newpaw","/films/comming"],
      isshow:false
    };
  },
  created () {
    this.$store.commit("setac",String(this.url.indexOf(this.$route.path)));
    
  },
  mounted () {
    window.addEventListener("scroll",()=>{
      let top = document.documentElement.scrollTop
      if(top <100){
        this.isshow = false;
      }else{
        this.isshow = true;
      }
    })
  },
  methods: {
      tog:function(name){
        this.$router.push(this.url[name]);
          
      },
      sc:function(a){
        console.log(123);
      }
  },

};
</script>

<style lang="scss" scoped>
.fix{
  position: fixed;
  top: 30px;
  width: 100%;
  z-index: 1;
}
</style>