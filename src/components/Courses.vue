<template lang="pug">
main
  h1 课程管理
  p {{pageMessage}}
  .grid
    ant-card(v-for="(item, _key) in courses", :key="_key", :title="item.course_name")
      ant-button(slot="extra", shape="circle", icon="edit", @click="editButton(item)", aria-label="编辑课程")
      p.teacher 老师: {{getTeacherName(item.teacher_pid)}}
      p.teacher 助教: {{getTeacherName(item.assistant_pid)}}
      p.more 课程信息: {{item.course_intro}}
      ant-button(@click="openStudents(item.pid)", size="small") 管理学生 ({{item.studentCount}})
    ant-card(title="添加新课程", :bodyStyle="{'min-height': '10em', 'text-align': 'center'}")
      ant-button.add-button(type="primary", shape="circle", icon="plus", size="large", @click="addButton", aria-label="添加")
  ant-modal(:title="modalContent.pid ? '编辑课程' : '添加新课程'", :visible="isModalVisible", @ok="modalOk", @cancel="isModalVisible = false")
    ant-form(formLayout="horizontal")
      ant-form-item(label="名称", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.course_name")
      ant-form-item(label="老师", :label-col="{span: 4}", :wrapper-col="{span: 20}")
        ant-select(v-model="modalContent.teacher_pid")
          ant-select-option(v-for="(teacher, _key) in teacherList", :key="_key", :value="teacher.pid") {{teacher.teacher_name}}
      ant-form-item(label="助教", :label-col="{span: 4}", :wrapper-col="{span: 20}")
        ant-select(v-model="modalContent.assistant_pid")
          ant-select-option(v-for="(teacher, _key) in teacherList", :key="_key", :value="teacher.pid") {{teacher.teacher_name}}
      ant-form-item(label="介绍", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.course_intro")
      p {{modalMessage}}
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
import {sha256} from 'js-sha256';
import {callApi} from '../api.js';

const NO_TEACHER_PID = '000000000000000000000000';

export default {
  components: {AntButton, AntCard, AntModal, AntForm, AntFormItem: AntForm.Item, AntInput, AntSelect, AntSelectOption: AntSelect.Option},
  data() {
    return {
      courses: [],
      isModalVisible: false,
      modalContent: {},
      modalMessage: '',
      pageMessage: '',
      teacherList: [],
    };
  },
  created() {
    this._loadCourses();
    this._loadTeacherList();
  },
  methods: {
    _loadTeacherList() {
      const filter = {fkey: 'institute_pid', fid: this.$store.state.currentUser.institute_pid};
      return callApi('config/teacher', filter).then((teachers) => {
        this.teacherList = teachers;
      }).catch((error) => {
        console.error(error);
        this.teacherList = [{pid: null, teacher_name: '获取教师列表失败'}];
      });
    },
    _loadCourses() {
      const filter = {fkey: 'teacher_pid', fid: this.$store.state.currentUser.pid};
      return callApi('config/course', filter).then((courses) => {
        this.courses = courses.filter((course) => course.teacher_pid === this.$store.state.currentUser.pid || course.assistant_pid === this.$store.state.currentUser.pid);
        this.courses.forEach((course) => {
          this._loadCourseStudentsRefs(course);
        });
      }).catch((error) => {
        console.error(error);
        this.pageMessage = '获取课程列表失败. ' + error.message;
      });
    },
    _loadCourseStudentsRefs(course) {
      return callApi('config/reference/student_course', {student_pid: 'all', course_pid: course.pid}).then((refs) => {
        this.$set(course, 'studentCount', refs.length);
      }).catch((error) => {
        console.error(error);
        this.$set(course, 'studentCount', '(获取学生人数失败)');
      });
    },
    addButton() {
      this.modalContent = this._getDefaultNewCourseFields();
      this.isModalVisible = true;
    },
    editButton(item) {
      this.modalContent = item;
      this.isModalVisible = true;
    },
    modalOk() {
      const isNew = !this.modalContent.pid;
      // TODO: If we can remove it from the database, remove this.
      if (isNew) {
        this.modalContent.course_uid = sha256(this.modalContent.course_name);
      }
      callApi('config/course', this.modalContent, isNew ? 'POST' : 'PUT').then((newPid) => {
        if (isNew) {
          this.modalContent.pid = newPid;
          this.courses.push(this.modalContent);
        }
        this.isModalVisible = false;
      }).catch((error) => {
        console.error(error);
        this.modalMessage = error.message;
      });
    },
    getTeacherName(pid) {
      if (!pid || pid === NO_TEACHER_PID) return '(无)';
      if (!this.teacherList.length) return '(载入中)';

      const teacher = this.teacherList.filter((teacher) => teacher.pid === pid)[0];
      if (!teacher) throw new Error(`No teacher found matching pid ${pid}`);
      return teacher.teacher_name;
    },
    _getDefaultNewCourseFields() {
      return {
        teacher_pid: this.$store.state.currentUser.pid,
        institute_pid: this.$store.state.currentUser.institute_pid,
        course_targets: [],  // TODO: add this in the UI
      }
    },
    openStudents(courseId) {
      this.$router.push(`/students/${courseId}`);
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
  margin: .5em 0;
}

.student-button {
  margin-left: 1em;
}

.add-button {
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
