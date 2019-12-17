<template lang="pug">
main
  ant-form(formLayout="horizontal")
    ant-form-item(label="账号", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="teacher_uid")
    ant-form-item(label="密码", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input-password(v-model="teacher_key")
    template(v-if="!isRegistering")
      p: ant-checkbox(:checked="doSaveInCookie", @change="doSaveInCookie = $event.target.checked") 下次自动登录
      p: ant-button(type="primary", size="large", @click="login") 登录
      p: ant-button(type="link", @click="isRegistering = true") 注册教师账号
    template(v-else)
      ant-form-item(label="姓名", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="teacher_name")
      ant-form-item(label="邮箱", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="email", type="email")
      ant-form-item(label="电话", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="phone_number", type="tel")
      ant-form-item(label="学校", :label-col="{span: 4}", :wrapper-col="{span: 20}")
        ant-select(v-model="institute_pid")
          ant-select-option(v-for="(institute, _key) in instituteList", :key="_key", :value="institute.pid") {{institute.institute_name}}
      p: ant-button(type="primary", size="large", @click="register") 注册
      p: ant-button(type="link", @click="isRegistering = false") 已有账号? 登录
    p {{message}}
</template>

<script>
import {
  Button as AntButton,
  Form as AntForm,
  Input as AntInput,
  Checkbox as AntCheckbox,
  Select as AntSelect,
} from 'ant-design-vue';
import {callApi} from '../api.js';

export default {
  components: {AntButton, AntForm, AntFormItem: AntForm.Item, AntInput, AntInputPassword: AntInput.Password, AntCheckbox, AntSelect, AntSelectOption: AntSelect.Option},
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
      institute_pid: '',
      instituteList: [],
    };
  },
  created() {
    this._loadInstituteList();
  },
  methods: {
    _loadInstituteList() {
      callApi('config/institute').then((instituteList) => {
        this.instituteList = instituteList;
      }).catch((error) => {
        this.instituteList = [{institute_name: '获取学校列表失败'}];
      });
    },
    login() {
      const payload = {
        teacher_uid: this.teacher_uid,
        teacher_key: this.teacher_key,
      };
      callApi('workflow/teacher/login', payload, 'POST').then((teacher) => {
        this.$store.commit('setCurrentUser', {user: teacher, save: this.doSaveInCookie});
        this.$router.push('/courses');
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
      callApi('config/teacher', payload, 'POST').then(() => {
        this.$router.go();
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
  padding: 9em 2em 1em;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

button {
  margin: 0 1em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
