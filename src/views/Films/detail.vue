<template>
    <div>
        <div class="header">
            <div class="goBack" @click="goBack">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
                    alt=""
                />
            </div>
            <div class="title" v-show="sshow">
                {{ film.name }}
            </div>
        </div>
        <div class="poster">
            <img v-lazy="film.poster" alt="" />
        </div>
        <div class="main">
            <div class="film-detail">
                <div>
                    {{film.name}}
                    {{filmType}}
                    {{film.grade}}
                </div>
                <div>{{ film.category }}</div>
                <div>{{ film.premiereAt | parsePremierAt }}上映</div>
                <div>{{ film.nation }} | {{ film.runtime }}分钟</div>
                <div @click="togg">{{ film.synopsis }}</div>
            </div>
            <div class="film-actor">
                <div class="yzry">演职人员</div>
                <!-- 加key，让其重新渲染swiper -->
                <Swiper :key="'yzry_' + film.actors.length">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in film.actors"
                        :key="index"
                    >
                        <img :src="item.avatarAddress" width="85" height="85" />
                        <div>{{item.name}}</div>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>
    
</template>

<script>
import url from "@/config/uri"
import Vue from "vue"
import VueLazyload from "vue-lazyload"
import Swiper from "@/components/swiper"
import moment from "moment"
Vue.use(VueLazyload, {
    loading: "https://2url.cc/1OwrB",
});
export default {
    data () {
        return {
            film:{actors:[]},
            sshow:false,
            filmType:""
        }
    },
    components: {
      Swiper  
    },
    created () {
        this.$store.commit("show",false)
        this.$https.get(url.getDetail+`?filmId=${this.$route.params.id}`).then(ret=>{
            this.film = ret.data.film
            this.filmType = ret.data.film.filmType.name
        })
        window.addEventListener("scroll",()=>{
            let x = document.documentElement.scrollTop
            if(x>50){
                this.sshow = true
            }else{
                this.sshow = false
            }
        })
    },
    beforeDestroy () {
        this.$store.commit("show",true)
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        togg(){
            let oDiv = document.querySelector(".film-detail");
            if(parseInt(oDiv.style.height)<310){
                oDiv.style.height = "310px"
            }else{
                oDiv.style.height = "190px"
            }
        }
    },
    filters: {
        parsePremierAt(val) {
            return moment(val * 1000).format("YYYY-MM-DD");
        },
    },
}
</script>
<style lang="scss" scoped>
.header {
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0);
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
}
.goBack {
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
}
.goBack img {
    width: 30px;
}
.title {
    font-size: 17px;
    line-height: 44px;
    width: 100vw;
    text-align: center;
}
.poster {
    width: 100%;
    img {
        width: 100%;
    }
}
.main {
    background: #f4f4f4;
    .film-detail {
        background: #ffffff;
        padding-top: 20px;
        padding-left: 15px;
        height: 190px;
        overflow: hidden;
    }
    .film-actor {
        background: #ffffff;
        margin-top: 10px;
        padding-left: 15px;
        .yzry {
            padding-top: 15px;
        }
    }
}
</style>