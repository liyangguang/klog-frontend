<template lang="pug">
main
  h1 学生管理
  p {{pageMessage}}
  p {{course.name}}
  p.teacher 老师: {{getTeacherName(course.teacher_pid)}}
  p.teacher 助教: {{getTeacherName(course.assistant_pid)}}
  .grid
    ant-card(v-for="(item, _key) in currentCourseStudentRefs", :key="_key")
      p {{getStudentName(item.student_pid)}}
    ant-card(title="添加学生", :bodyStyle="{'min-height': '10em', 'text-align': 'center'}")
      ant-button.add-button(type="primary", shape="circle", icon="plus", size="large", @click="addButton", aria-label="添加")
  ant-modal(title="添加学生", :visible="isModalVisible", @ok="modalOk", @cancel="isModalVisible = false", okText="确认", cancelText="取消")
    ant-form(formLayout="horizontal")
      ant-form-item(label="学生列表", :label-col="{span: 4}", :wrapper-col="{span: 20}")
        ant-select(v-model="modalContent.student_pid")
          ant-select-option(v-for="(student, _key) in availableStudents", :key="_key", :value="student.pid") {{student.student_name}}
          ant-select-option(:value="NEW_STUDENT_VALUE") [注册新学生]
      template(v-if="modalContent.student_pid === NEW_STUDENT_VALUE")
        ant-form-item(label="姓名", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.student_name")
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

const NO_USER_PID = '000000000000000000000000';
const NEW_STUDENT_VALUE = 'CREATE_NEW';

export default {
  components: {AntButton, AntCard, AntModal, AntForm, AntFormItem: AntForm.Item, AntInput, AntSelect, AntSelectOption: AntSelect.Option},
  data() {
    return {
      course: {},
      isModalVisible: false,
      modalContent: {},
      modalMessage: '',
      pageMessage: '',
      currentCourseStudentRefs: [],
      teacherList: [],
      studentList: [],
      NEW_STUDENT_VALUE: NEW_STUDENT_VALUE,
    };
  },
  computed: {
    availableStudents() {
      if (!this.studentList) return [];
      return this.studentList.filter((student) => !this.currentCourseStudentRefs.find((ref) => ref.student_pid === student.pid));
    },
  },
  created() {
    this._loadCourse();  // For course info
    this._loadCourseStudentsRefs();  // For student list
    this._loadAllStudents();  // For getting student name
    this._loadTeacherList();  // For getting teacher name
  },
  methods: {
    async _loadCourse() {
      try {
        this.course = (await callApi('config/course', {pid: this.$route.params.coursePid}))[0];
      } catch(error) {
        console.error(error);
        this.pageMessage = '获取课程信息失败. ' + error.message;
      };
    },
    async _loadCourseStudentsRefs() {
      try {
        this.currentCourseStudentRefs = await callApi('config/reference/student_course', {student_pid: 'all', course_pid: this.$route.params.coursePid});
      } catch(error) {
        console.error(error);
        this.pageMessage = '获取学生列表失败. ' + error.message;
      };
    },
    async _loadAllStudents() {
      try {
        this.studentList = await callApi('config/student');
      } catch(error) {
        console.error(error);
        this.studentList = [{student_name: '获取学生列表失败'}];
      };
    },
    async _loadTeacherList() {
      const filter = {fkey: 'institute_pid', fid: this.$store.state.currentUser.institute_pid};
      try {
        this.teacherList = await callApi('config/teacher', filter);
      } catch(error) {
        console.error(error);
        this.pageMessage = '获取教师列表失败. ' + error.message;
      };
    },
    addButton() {
      this.modalContent = {};
      this.isModalVisible = true;
    },
    async modalOk() {
      try {
        if (this.modalContent.student_pid === NEW_STUDENT_VALUE) {
          const newPid = await callApi('config/student', this.modalContent, 'POST');
          this.studentList.push((await callApi('config/student', {pid: newPid}))[0]);
          await this._addStudentCourseRelationship(newPid);
        } else {
          await this._addStudentCourseRelationship(this.modalContent.student_pid);
        }
      } catch (error) {
        console.error(error);
        this.modalMessage = error.message;
      }
    },
    async _addStudentCourseRelationship(studentPid) {
      try {
        const payload = {course_pid: this.$route.params.coursePid, student_pid: studentPid};
        await callApi('config/reference/student_course', payload, 'POST');
        this.currentCourseStudentRefs.push(payload);
        this.isModalVisible = false;
      } catch(error) {
        console.error(error);
        this.modalMessage = '添加学生失败. ' + error.message;
      };
    },
    getTeacherName(pid) {
      if (!pid || pid === NO_USER_PID) return '(无)';
      if (!this.teacherList || !this.teacherList.length) return '(载入中)';

      const teacher = this.teacherList.filter((teacher) => teacher.pid === pid)[0];
      if (!teacher) throw new Error(`No teacher found matching pid ${pid}`);
      return teacher.teacher_name;
    },
    getStudentName(pid) {
      if (!pid || pid === NO_USER_PID) return '(无)';
      if (!this.studentList || !this.studentList.length) return '(载入中)';

      const student = this.studentList.filter((student) => student.pid === pid)[0];
      if (!student) throw new Error(`No student found matching pid ${pid}`);
      return student.student_name;
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
