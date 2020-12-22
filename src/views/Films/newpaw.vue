<template>
  <div id="films">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-loading size="24px" v-show="showlo">加载中...</van-loading>
      <van-card v-for="item in list" :key="item.filmId"  @click="datil(item.filmId)">
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
          <div style="margin-top: 3px">
            <div style="font-size: 14px">
              观众评分:<span style="font-size: 15px; color: #ffb232">{{
                item.grade
              }}</span>
            </div>
            <div style="font-size: 14px">
              主演:{{ item | actor }}
              <div class="comingSoonFilm-buy" style="float: right">预购</div>
            </div>
            <div style="font-size: 14px">
              {{ item.nation }} | {{ item.runtime }}分钟
            </div>
          </div>
        </template>
      </van-card>
    </van-pull-refresh>
  </div>
</template>


<script>
import Vue from "vue";
import { Card, Loading, PullRefresh } from "vant";

Vue.use(Card);
Vue.use(Loading);
Vue.use(PullRefresh);
import url from "@/config/uri";
export default {
  data() {
    return {
      list: [],
      showlo: true,
      isLoading: true,
      page: 1,
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata: function (cb = null) {
      this.$https.get(url.getNew + `?pageNum=${this.page}`).then((ret) => {
        if (this.page <= Math.ceil(ret.data.total / 10)) {
          this.page++;
          this.list = [...ret.data.films, ...this.list];
          if (cb === null) {
            this.showlo = false;
          } else {
            cb();
          }
        }else{
            return
        }
      });
    },
    onRefresh: function () {
      this.getdata(() => {
        this.isLoading = false;
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
.van-card__thumb {
    margin-right: 0px;
    width: 80px;
}
</style>