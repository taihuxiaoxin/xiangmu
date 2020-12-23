<template>
    <div>
        <div class="title" v-show="cshow"><span @click="go">{{$store.state.city.cityName}}</span>电影</div>
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "@/components/nav/header"
export default {
    data () {
        return {
            cshow:false
        }
    },
    components: {
        Header,
    },
    mounted () {
        window.addEventListener("scroll",()=>{
            let y = document.documentElement.scrollTop
            if(y>80){
                this.cshow = true
            }else{
                this.cshow = false
            }
        })
    },
    methods: {
        go(){
            this.$router.push("/city")
        }
    }
}
</script>
<style scoped lang="scss">
.title{
    height: 30px;
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 30px;
    z-index: 10;
    background: white;
    span{
        position:absolute;
        left: 10px;
        font-size: 12px;
        top: 5px;
    }
}
</style>