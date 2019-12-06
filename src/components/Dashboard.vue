<template lang="pug">
main
  h1 教学管理
  .grid
    ant-card(v-for="(item, key) in classes", :key="key", :title="item.name")
      ant-button(slot="extra", shape="circle", icon="edit", @click="edit(item)", aria-label="编辑课程")
      p.teacher 老师: {{item.teacher}}
      p.more 课程信息: {{item.more}}
      p.student 学生: {{item.students}}
        ant-button.student-button(size="small") 管理
    ant-card(title="添加新课程", :bodyStyle="{'min-height': '10em'}")
      ant-button.add-button(type="primary", shape="circle", icon="plus", size="large", @click="addNew", aria-label="添加")
  ant-modal(:title="modalContent.id ? '编辑课程' : '添加新课程'", :visible="isModalVisible", @ok="dialogOk", @cancel="isModalVisible = false")
    ant-form(formLayout="horizontal")
      ant-form-item(label="课程名称", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.name")
      ant-form-item(label="老师姓名", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.teacher")
      ant-form-item(label="课程信息", :label-col="{span: 4}", :wrapper-col="{span: 20}"): ant-input(v-model="modalContent.more")
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
      isModalVisible: false,
      modalContent: {},
      classes: MOCK_CLASSES,
    };
  },
  created() {
    if (!this.$store.state.currentUserPid) {
      this.$router.push('/signin');
    }
  },
  methods: {
    addNew() {
      this.modalContent = {};
      this.isModalVisible = true;
    },
    edit(item) {
      this.modalContent = item;
      this.isModalVisible = true;
    },
    dialogOk() {
      return this._saveItem(this.modalContent).then((newId) => {
        if (!this.modalContent.id) {
          this.modalContent.id = newId;
          this.classes.push(this.modalContent);
        }
        this.isModalVisible = false;
      });
    },
    _saveItem(item) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(++MOCK_ID);
        }, 1000);
      });
    },
  },
}

// TODO(yangguang): Change to real API
const MOCK_CLASSES = [
  {id: 1, name: '中国历史兴趣班', teacher: '袁腾飞', more: '2019 8 月开课', students: 20},
  {id: 2, name: '流行音乐入门', teacher: '高晓松', more: '2019', students: 15},
  {id: 3, name: '篮球 6-8 岁班', teacher: '林书豪', more: '2019 冬季班', students: 8},
  {id: 4, name: '中国历史兴趣班', teacher: '袁腾飞', more: '2019 8 月开课', students: 12},
  {id: 5, name: '流行音乐入门', teacher: '高晓松', more: '2019', students: 22},
  {id: 6, name: '篮球 6-8 岁班', teacher: '林书豪', more: '2019 冬季班', students: 16},
];

let MOCK_ID = MOCK_CLASSES.length;
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
