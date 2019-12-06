<template lang="pug">
main
  ant-form(formLayout="horizontal")
    ant-form-item(label="账号", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="teacher_uid")
    ant-form-item(label="密码", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input-password(v-model="teacher_key")
    template(v-if="isRegistering")
      ant-form-item(label="姓名", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="teacher_name")
      ant-form-item(label="邮箱", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="email", type="email")
      ant-form-item(label="电话", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="phone_number", type="tel")
      ant-form-item(label="学校", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="institute_pid")
    ant-form-item(v-else, label="记住我 30 天", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-checkbox(:checked="doSaveInCookie", @change="doSaveInCookie = $event.target.checked")
    ant-button.login(type="primary", size="large", @click="login") 登录
    ant-button.register(type="primary", size="large", @click="register") 注册
    p {{message}}
</template>

<script>
import {
  Button as AntButton,
  Form as AntForm,
  Input as AntInput,
  Checkbox as AntCheckbox,
} from 'ant-design-vue';
import {callApi} from '../api.js';

// TODO(yangguang): Remove this after list institute list API
const HARD_CODED_INSTITUTE_PID = '102030405060708090000001';

export default {
  components: {AntButton, AntForm, AntFormItem: AntForm.Item, AntInput, AntInputPassword: AntInput.Password, AntCheckbox},
  data() {
    return {
      isRegistering: false,
      doSaveInCookie: false,
      message: '',
      teacher_uid: '',
      teacher_key: '',
      teacher_name: '',
      phone_number: '',
      email: '',
      institute_pid: HARD_CODED_INSTITUTE_PID,
    };
  },
  methods: {
    login() {
      const payload = {
        teacher_uid: this.teacher_uid,
        teacher_key: this.teacher_key,
      };
      callApi('workflow/teacher/login', payload, 'POST').then((teacher) => {
        this.$store.commit('setCurrentUserPid', {pid: teacher.pid, save: this.doSaveInCookie});
        this.$router.push('/dashboard');
      }).catch((error) => {
        this.message = error;
      });
    },
    register() {
      if (!this.isRegistering) {
        this.isRegistering = true;
        return;
      }
      const payload = {
        teacher_uid: this.teacher_uid,
        teacher_key: this.teacher_key,
        teacher_name: this.teacher_name,
        phone_number: this.phone_number,
        email: this.email,
        institute_pid: this.institute_pid,
      };
      callApi('config/teacher', payload, 'POST').then((pid) => {
        this.$store.commit('setCurrentUserPid', {pid, save: this.doSaveInCookie});
        this.$router.push('/dashboard');
      }).catch((error) => {
        this.message = error;
      });
    }
  },
}

</script>

<style lang="postcss" scoped>
@import '../variables.css';

main {
  padding: 6em 2em 1em;
}

</style>
