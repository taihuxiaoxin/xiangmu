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
