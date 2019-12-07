<template lang="pug">
main
  h1 教学管理
  .grid
    ant-card(v-for="(item, _key) in courses", :key="_key", :title="item.course_name")
      ant-button(slot="extra", shape="circle", icon="edit", @click="edit(item)", aria-label="编辑课程")
      p.teacher 老师: {{_getTeacher(item.teacher_pid).name || '(未找到)'}}
      p.teacher 助教: {{_getTeacher(item.assistant_pid).name || '(未找到)'}}
      p.more 课程信息: {{item.course_intro}}
        ant-button.student-button(size="small") 管理
    ant-card(title="添加新课程", :bodyStyle="{'min-height': '10em'}")
      ant-button.add-button(type="primary", shape="circle", icon="plus", size="large", @click="addNew", aria-label="添加")
  ant-modal(:title="modalContent.id ? '编辑课程' : '添加新课程'", :visible="isModalVisible", @ok="dialogOk", @cancel="isModalVisible = false")
    ant-form(formLayout="horizontal")
      ant-form-item(label="名称", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.course_name")
      ant-form-item(label="老师", :label-col="{span: 4}", :wrapper-col="{span: 20}")
        ant-select(v-model="modalContent.teacher_pid")
          ant-select-option(v-for="(teacher, _key) in teacherList", :key="_key", :value="teacher.pid") {{teacher.teacher_name}}
      ant-form-item(label="助教", :label-col="{span: 4}", :wrapper-col="{span: 20}")
        ant-select(v-model="modalContent.assistant_pid")
          ant-select-option(v-for="(teacher, _key) in teacherList", :key="_key", :value="teacher.pid") {{teacher.teacher_name}}
      ant-form-item(label="介绍", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.course_intro")
      p {{dialogMessage}}
</template>

<script>
import {
  Button as AntButton,
  Card as AntCard,
  Modal as AntModal,
  Form as AntForm,
  Input as AntInput,
  Select as AntSelect,
} from 'ant-design-vue';
import {callApi} from '../api.js';

export default {
  components: {AntButton, AntCard, AntModal, AntForm, AntFormItem: AntForm.Item, AntInput, AntSelect, AntSelectOption: AntSelect.Option},
  data() {
    return {
      courses: [],
      isModalVisible: false,
      modalContent: {},
      dialogMessage: '',
      teacherList: [],
    };
  },
  created() {
    this._loadCourses();
    this._loadTeacherList();
  },
  methods: {
    _loadTeacherList() {
      return callApi('config/teacher').then((teachers) => {
        this.teacherList = teachers;
      }).catch((error) => {
        this.teacherList = [{teacher_name: '获取教师列表失败'}];
      });
    },
    _loadCourses() {
      return callApi('config/course').then((courses) => {
        this.courses = courses.filter((course) => course.teacher_pid === this.$store.state.currentUserPid || course.assistant_pid === this.$store.state.currentUserPid);
      }).catch((error) => {
        this.dialogMessage = error;
      });
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
      }
      return this._saveItem(this.modalContent).then((newPin) => {
        this.modalContent.pin = newPin;
        this.courses.push(this.modalContent);
        this.isModalVisible = false;
      });
    },
    _getTeacher(pid) {
      return this.teacherList.filter((teacher) => teacher.pid === pid)[0] || {};
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
