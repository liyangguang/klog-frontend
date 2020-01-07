<template lang="pug">
main
  p(v-if="pageMessage") {{pageMessage}}
  ant-list.list(:dataSource="courses")
    ant-list-item(slot="renderItem", slot-scope="item, index")
      ant-list-item-meta(:title="item.course_name")
        div(slot="description")
          span.teacher 老师: {{getTeacherName(item.teacher_pid)}}, 
          span.teacher 助教: {{getTeacherName(item.assistant_pid)}}, 
          span.more 课程信息: {{item.course_intro}}
      ant-button(slot="actions", shape="circle", icon="edit", @click="editButton(item)", aria-label="编辑课程")
      ant-button(slot="actions", @click="openStudents(item.pid)", size="small") 管理学生
        span(v-if="item.studentCount") ({{item.studentCount}})
  ant-button.add-button(slot="actions", icon="plus", size="large", @click="addButton") 添加新课程
  ant-modal(:title="modalContent.pid ? '编辑课程' : '添加新课程'", :visible="isModalVisible", @ok="modalOk", @cancel="isModalVisible = false", okText="确认", cancelText="取消")
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
  Icon as AntIcon,
  List as AntList,
  Button as AntButton,
  Modal as AntModal,
  Form as AntForm,
  Input as AntInput,
  Select as AntSelect,
} from 'ant-design-vue';
import {callApi} from '../api.js';
import {teacherMixin} from '../mixins.js';

// TODO(yangguang): Move common code in desktop/embed into mixins.
export default {
  mixins: [teacherMixin],
  components: {
    AntIcon,
    AntButton,
    AntForm, AntFormItem: AntForm.Item,
    AntInput,
    AntModal,
    AntSelect, AntSelectOption: AntSelect.Option,
    AntList, AntListItem: AntList.Item, AntListItemMeta: AntList.Item.Meta,
  },
  data() {
    return {
      courses: [],
      isModalVisible: false,
      modalContent: {},
      modalMessage: '',
      pageMessage: '',
    };
  },
  created() {
    this._loadCourses();
  },
  methods: {
    async _loadCourses() {
      try {
        // TODO(yangguang): remove the .filter() once the backend filter works
        // const filter = {fkey: 'teacher_pid', fid: this.$store.state.currentUser.pid};
        this.courses = (await callApi('config/course')).filter((course) => [course.teacher_pid, course.assistant_pid].includes(this.$store.state.currentUser.pid));
        this.courses.forEach((course) => {
          this._loadCourseStudentsRefs(course);
        });
      } catch(error) {
        console.error(error);
        this.pageMessage = '获取课程列表失败. ' + error.message;
      };
    },
    async _loadCourseStudentsRefs(course) {
      try {
        this.$set(course, 'studentCount', (await callApi('config/reference/student_course', {student_pid: 'all', course_pid: course.pid})).length);
      } catch(error) {
        console.error(error);
        this.$set(course, 'studentCount', '(获取学生人数失败)');
      };
    },
    addButton() {
      this.modalContent = {
        teacher_pid: this.$store.state.currentUser.pid,
        institute_pid: this.$store.state.currentUser.institute_pid,
        course_targets: [],  // TODO: add this in the UI
      };
      this.isModalVisible = true;
    },
    editButton(item) {
      this.modalContent = item;
      this.isModalVisible = true;
    },
    async modalOk() {
      const isNew = !this.modalContent.pid;
      // TODO: If we can do it in the backend, remove this.
      if (isNew) {
        this.modalContent.course_uid = 'uid-' + (new Date()).getTime();
      }
      try {
        const newPid = await callApi('config/course', this.modalContent, isNew ? 'POST' : 'PUT');
        if (isNew) {
          this.modalContent.pid = newPid;
          this.courses.push(this.modalContent);
        }
        this.isModalVisible = false;
      } catch(error) {
        console.error(error);
        this.modalMessage = error.message;
      };
    },
    openStudents(courseId) {
      this.$router.push(`/_embed/students/${courseId}`);
    },
  },
}

</script>

<style lang="postcss" scoped>
@import '../variables.css';

main {
  background: #fff;
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
