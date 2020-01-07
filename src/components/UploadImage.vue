<template lang="pug">
form(:enctype="REQUIRED_FILED_FOR_MULTIPART", ref="formEl")
  input(type='file', :name="FORM_FILED_NAME", @change="file = $event.target.files[0]")
  ant-button(@click="submit", :disabled="!file || isDisabled") 上传
</template>

<script>
import {Button as AntButton} from 'ant-design-vue';

// These fields is required in the backend.
const API_PATH = '/_api/upload';
const REQUIRED_FILED_FOR_MULTIPART = 'multipart/form-data';
const FORM_FILED_NAME = 'image';

export default {
  components: {AntButton},
  data(){
    return {
      file: null,
      isDisabled: false,
      REQUIRED_FILED_FOR_MULTIPART,
      FORM_FILED_NAME,
    };
  },
  methods: {
    submit() {
      this.isDisabled = true;
      this.$emit('message', '上传中...');

      const formData = new FormData(this.$refs.formEl);
      fetch(API_PATH, {method: 'POST', body: formData}).then((response) => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
      }).then((data) => {
        this.$emit('message', '');
        this.$emit('url', data.path);
        this.isDisabled = false;
      }).catch((error) => {
        this.$emit('message', '上传失败!');
        this.isDisabled = false;
      });
    },
  },
}
</script>
