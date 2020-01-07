<template lang="pug">
main
  p(v-if="pageMessage") {{pageMessage}}
  .course-info
    router-link(to="/_embed/courses") 返回课程列表
    h1 {{course.course_name}}
    p
      span.teacher 老师: {{getTeacherName(course.teacher_pid)}}, 
      span.teacher 助教: {{getTeacherName(course.assistant_pid)}}, 
      span.more 课程信息: {{course.course_intro}}
    h2 学生列表
  ant-list.list(:dataSource="currentCourseStudentRefs")
    ant-list-item(slot="renderItem", slot-scope="item, index")
      ant-list-item-meta(:title="getStudentName(item.student_pid)")
        ant-avatar(slot="avatar", :src="getStudent(item.student_pid).student_image_url")
      ant-button(size="small", disabled) 绑定家长
  ant-button.add-button(slot="actions", icon="plus", size="large", @click="addButton") 添加
  ant-modal(title="添加学生", :visible="isModalVisible", @ok="modalOk", @cancel="isModalVisible = false", okText="确认", cancelText="取消")
    ant-form(formLayout="horizontal")
      ant-form-item(label="学生列表", :label-col="{span: 4}", :wrapper-col="{span: 20}")
        ant-select(v-model="modalContent.student_pid")
          ant-select-option(v-for="(student, _key) in availableStudents", :key="_key", :value="student.pid") {{student.student_name}}
          ant-select-option(:value="NEW_STUDENT_VALUE") [注册新学生]
      template(v-if="modalContent.student_pid === NEW_STUDENT_VALUE")
        ant-form-item(label="姓名", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.student_name")
        img.image-preview(:src="modalContent.student_image_url")
        upload-image(@message="uploadMessage = $event", @url="modalContent.student_image_url = $event")
        p {{uploadMessage}}
      p {{modalMessage}}
</template>

<script>
import {
  Avatar as AntAvatar,
  Button as AntButton,
  List as AntList,
  Modal as AntModal,
  Form as AntForm,
  Input as AntInput,
  Select as AntSelect,
} from 'ant-design-vue';
import {sha256} from 'js-sha256';

import {callApi} from '../api.js';
import {teacherMixin, studentMixin} from '../mixins.js';
import UploadImage from '../components/UploadImage.vue';

const NEW_STUDENT_VALUE = 'CREATE_NEW';

// TODO(yangguang): Move common code in desktop/embed into mixins.
export default {
  mixins: [teacherMixin, studentMixin],
  components: {
    UploadImage,
    AntAvatar,
    AntButton,
    AntModal,
    AntForm, AntFormItem: AntForm.Item,
    AntInput,
    AntSelect, AntSelectOption: AntSelect.Option,
    AntList, AntListItem: AntList.Item, AntListItemMeta: AntList.Item.Meta,
  },
  data() {
    return {
      course: {},
      isModalVisible: false,
      modalContent: {},
      modalMessage: '',
      pageMessage: '',
      uploadMessage: '',
      currentCourseStudentRefs: [],
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
  },
}

</script>

<style lang="postcss" scoped>
@import '../variables.css';

main {
  background: #fff;
}

.course-info {
  padding: 1em;
}

.list {
  padding: 0 1em;
}

.add-button {
  width: 100%;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  border-radius: 0;
}
</style>
