<template lang="pug">
form(:enctype="REQUIRED_FILED_FOR_MULTIPART", ref="formEl")
  p {{message}}
  input(type='file', :name="FORM_FILED_NAME", @change="file = $event.target.files[0]")
  ant-button(@click="submit", :disabled="!file") Upload Image
  img(v-if="url", :src="url")
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
      message: 'Select an image to upload',
      url: '',
      REQUIRED_FILED_FOR_MULTIPART,
      FORM_FILED_NAME,
    };
  },
  methods: {
    submit() {
      const formData = new FormData(this.$refs.formEl);
      fetch(API_PATH, {method: 'POST', body: formData}).then((response) => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
      }).then((data) => {
        this.message = 'Uploaded successfully';
        this.url = data.path;
      }).catch((error) => {
        this.message = 'Failed to upload. ' + error.message;
      });
    },
  },
}
</script>

<style lang="postcss" scoped>
@import '../variables.css';

img {
  height: 5em;
}
</style>