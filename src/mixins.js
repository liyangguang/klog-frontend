import {callApi} from './api.js';

const NO_USER_PID = '000000000000000000000000';

export const teacherMixin = {
  data() {
    return {
      teacherList: [],
    };
  },
  created() {
    this._loadTeacherList();
  },
  methods: {
    async _loadTeacherList() {
      const filter = {fkey: 'institute_pid', fid: this.$store.state.currentUser.institute_pid};
      try {
        this.teacherList = await callApi('config/teacher', filter);
      } catch(error) {
        console.error(error);
        this.teacherList = [{pid: null, teacher_name: '获取教师列表失败'}];
      };
    },
    getTeacherName(pid) {
      if (!pid || pid === NO_USER_PID) return '(无)';
      if (!this.teacherList.length) return '(载入中)';
      const teacher = this.teacherList.filter((teacher) => teacher.pid === pid)[0];
      if (!teacher) return '(未找到)';
      return teacher.teacher_name;
    },
  },
};

export const studentMixin = {
  data() {
    return {
      studentList: [],
    };
  },
  created() {
    this._loadAllStudents();
  },
  methods: {
    // TODO(yangguang): Do we really need to load them all? Can we filter, or just use the pid to get each student separately?
    async _loadAllStudents() {
      try {
        this.studentList = await callApi('config/student');
      } catch(error) {
        console.error(error);
        this.studentList = [{student_name: '获取学生列表失败'}];
      };
    },
    getStudentName(pid) {
      if (!pid || pid === NO_USER_PID) return '(无)';
      if (!this.studentList || !this.studentList.length) return '(载入中)';

      const student = this.studentList.filter((student) => student.pid === pid)[0];
      if (!student) return '(未找到)';
      return student.student_name;
    },
    getStudent(pid) {
      if (!pid || pid === NO_USER_PID) return {};
      if (!this.studentList || !this.studentList.length) return {};

      const student = this.studentList.filter((student) => student.pid === pid)[0];
      return student || {};
    },
  },
}