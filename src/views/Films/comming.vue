<template>
  <div id="films">
    <van-loading size="24px" v-show="showlo">加载中...</van-loading>
    <van-card v-for="item in list" :key="item.filmId" @click="datil(item.filmId)">
      <template #thumb>
        <img :src="item.poster" />
      </template>
      <template #title>
        <span style="font-size: 16px"
          >{{ item.name
          }}<span class="liti">{{ item.filmType.name }}</span></span
        >
      </template>
      <template #desc>
        <div>
          <div style="height: 19px">
            <span>{{&nbsp;}}</span>
          </div>
          <div style="font-size: 14px">
            主演:{{ item | actor }}
            <div class="comingSoonFilm-buy" style="float: right">预购</div>
          </div>
          <div style="font-size: 14px">
            上映日期:{{ item.premiereAt | datehe }}
          </div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Loading } from "vant";

Vue.use(Card);
Vue.use(Loading);
import url from "@/config/uri";
export default {
  data() {
    return {
      list: [],
      showlo: true,
      page: 1,
      all:1,
    };
  },
  created() {this.getdata()},
  mounted() {
    window.addEventListener("scroll", () => {
      let top = document.documentElement.scrollTop;
      let top1 = document.documentElement.clientHeight;
      let x = document.documentElement.scrollHeight;
      if (parseInt(top +top1)  === x) {
          this.getdata()
      }
    });
  },
  
  methods: {
    getdata() {
      if(this.page>this.all){
        return
      }
      this.$https.get(url.getCom + `?pageNum=${this.page}`).then((ret) => {
        this.all = Math.ceil(ret.data.total/10)
          this.page++
        this.list = [...this.list,...ret.data.films];
        this.showlo = false;
      });
    },
    datil(id){
      this.$router.push(`/film/${id}`)
    }
  },
  filters: {
    actor: function (item) {
      if (item.actors) {
        let str = "";
        item.actors.forEach((v) => {
          str += v.name + " ";
        });
        return str.substring(0, 12) + "...";
      }
    },
    datehe: function (tiem) {
      let time = new Date(tiem * 1000);
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let w = time.getDay();
      switch (w) {
        case 1:
          w = "一";
          break;
        case 2:
          w = "二";
          break;
        case 3:
          w = "三";
          break;
        case 4:
          w = "四";
          break;
        case 5:
          w = "五";
          break;
        case 6:
          w = "六";
          break;
        case 7:
          w = "七";
          break;
      }
      // console.log(w)
      return "星期" + w + " " + m + "月" + d + "日";
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 66px;
  height: 90px;
}
.liti {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
}
.comingSoonFilm-buy {
  border: 1px solid;
  float: right;
  line-height: 25px;
  height: 25px;
  width: 50px;
  color: #ffb232;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  position: relative;
}
</style>
