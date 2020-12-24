<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="mobile"
      name="mobile"
      label="mobile"
      placeholder="手机号"
      :rules="[{ pattern, message: '请填写手机号' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="password"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>
<script>
import Vue from "vue";
import { Form, Toast,Button,Field } from "vant";

Vue.use(Form);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Field);
export default {
  data() {
    return {
      mobile: "",
      password: "",
      pattern: /^1[3-9]\d{9}$/,
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values)
      this.$https.post("/v1/login", values).then((ret) => {
        if (ret.code == 0) {
          Toast.success(ret.msg);
          console.log(ret)
          this.$store.commit("setjwt",ret.jtw)
          setTimeout(()=>{
            this.$router.go(-1)
          },2000)
        } else {
          Toast.fail(ret.msg);
        }
      });
    },
  },
};
</script>