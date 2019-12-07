<template lang="pug">
main
  h1 教学管理
  .grid
    ant-card(v-for="(item, _key) in courses", :key="_key", :title="item.course_name")
      ant-button(slot="extra", shape="circle", icon="edit", @click="edit(item)", aria-label="编辑课程")
      p.teacher 老师: {{item.teacher_pid}}
      p.teacher 助教: {{item.assistant_pid}}
      p.more 课程信息: {{item.course_intro}}
        ant-button.student-button(size="small") 管理
    ant-card(title="添加新课程", :bodyStyle="{'min-height': '10em'}")
      ant-button.add-button(type="primary", shape="circle", icon="plus", size="large", @click="addNew", aria-label="添加")
  ant-modal(:title="modalContent.id ? '编辑课程' : '添加新课程'", :visible="isModalVisible", @ok="dialogOk", @cancel="isModalVisible = false")
    ant-form(formLayout="horizontal")
      ant-form-item(label="课程名称", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.course_name")
      ant-form-item(label="老师姓名", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.teacher_pid")
      ant-form-item(label="助教姓名", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.assistant_pid")
      ant-form-item(label="课程信息", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.course_intro")
      p {{dialogMessage}}
</template>

<script>
import {
  Button as AntButton,
  Card as AntCard,
  Modal as AntModal,
  Form as AntForm,
  Input as AntInput,
} from 'ant-design-vue';
import {callApi} from '../api.js';

export default {
  components: {AntButton, AntCard, AntModal, AntForm, AntFormItem: AntForm.Item, AntInput},
  data() {
    return {
      courses: [],
      isModalVisible: false,
      modalContent: {},
      dialogMessage: '',
    };
  },
  created() {
    if (!this.$store.state.currentUserPid) {
      this.$router.push('/signin');
    }

    this._loadCourses();
  },
  methods: {
    _loadCourses() {
      return callApi('config/course', {pid: 'all'}).then(console.log);
      // return callApi('config/course', {'teacher_pid': this.$store.state.currentUserPid}).then((courses) => {
      //   this.courses = courses;
      // }).catch((error) => {
      //   this.dialogMessage = error;
      // });
    },
    addNew() {
      this.modalContent = {};
      this.isModalVisible = true;
    },
    edit(item) {
      this.modalContent = item;
      this.isModalVisible = true;
    },
    dialogOk() {
      if (!this.modalContent.course_uid) {
        this.modalContent.course_uid = this.modalContent.course_name.toLowerCase().replace(/\W+/, '-');
        this.courses.push(this.modalContent);
      }
      return this._saveItem(this.modalContent).then((newPin) => {
        this.modalContent.pin = newPin;
        this.isModalVisible = false;
      });
    },
    _saveItem(item) {
      return callApi('config/course', item, item.pid ? 'PUT' : 'POST').catch((error) => {
        this.dialogMessage = error;
      });
    },
  },
}

</script>

<style lang="postcss" scoped>
@import '../variables.css';

main {
  padding: 6em 2em 1em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;
}

p {
  margin: .5em;
}

.student-button {
  margin-left: 1em;
}

.add-button {
  margin: 0 auto;
  display: block;
  transform: scale(1.5) translateY(40%);
}

@media screen and (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 800px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
