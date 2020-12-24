<template>
  <div id="app">
    <router-view/>
    <Footer v-show="$store.state.isshow"/>
  </div>
</template>
<script>
import Footer from "./components/nav/footer"
export default {
  components: {
    Footer,
  },
  created () {
    let t = window.localStorage.getItem("jwt")
    if(t){
      this.$store.commit("setjwt",t)
    }
  },
  updated () {
    let x = this.$route.path ==="/films/newpaw" ? "0" : "1";
    this.$store.commit("setac",x)
  }
}
// import url from "./config/uri"
// export default {
//   async created () {
//     let ret = await this.$https.get(url.getCity)
//     console.log(ret)
//   }
// }
</script>
<style lang="scss">

</style>
