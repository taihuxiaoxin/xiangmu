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
      name="密码"
      label="密码"
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
import { Form } from "vant";

Vue.use(Form);
export default {
  data(){
    return {
      pattern:/^1[3-9]\d{9}$/
    }
  }
};
</script>