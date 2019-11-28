<template lang="pug">
main
  .text
    h1 KLog
    p 记录学生们上课的精彩瞬间, 自动生成每个学生的精彩片段
    ul.features
      li
        img(src="@/assets/camera.svg", alt="camera icon")
        p 用手机记录下学生们的上课活动
      li
        img(src="@/assets/neural.svg", alt="neural icon")
        p 机器学习识别每个学生, 生成视频
      li
        img(src="@/assets/speech-bubble.svg", alt="speech bubble icon")
        p 老师向家长们分享每个孩子的精彩片段
    ant-button(type="primary", icon="download", size="large") 安卓应用市场
  .photos
    img(v-for="(photo, index) in photos", :style="{opacity: index === photoIndex ? 1 : 0}", :src="photo", alt="kids in a class stock photo")
  img.phone(src="@/assets/phone.png", alt="Phone frame")
</template>

<script>
import AntButton from 'ant-design-vue/lib/button';

const SLIDE_INTERVAL = 5 * 1000;

export default {
  components: {AntButton},
  data() {
    return {
      photoIndex: 0,
      photos: [require('@/assets/photos/1.jpg'), require('@/assets/photos/2.jpg'), require('@/assets/photos/3.jpg'), require('@/assets/photos/4.jpg')],
    }
  },
  created() {
    setInterval(() => {
      this.photoIndex = (this.photoIndex + 1) % this.photos.length;
    }, SLIDE_INTERVAL);
  },
}
</script>

<style lang="postcss" scoped>
@import '../variables.css';

main {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  position: relative;
  min-height: 100vh;

  &::after {
    content: '';
    position: absolute;
    top: 0;bottom: 0;left: 0;right: 0;
    background: linear-gradient(to right, #EAF2F7 30%, rgba(255,255,255,.6) 90%);
    pointer-events: none;
  }
}

.text {
  grid-column: 1/3;
  grid-row: 1;
  position: relative;
  z-index: 1;
  padding: 20vh 5em 3em;

  & > h1 {
    font-size: 3em;
    font-weight: 600;
  }

  & > p {
    font-size: 1.6em;
  }

  & > button {
    margin-top: 2em;
  }
}

.features {
  display: flex;
  list-style: none;
  font-size: 1rem;
  padding: 0;

  & > li {
    flex: 1;
    text-align: center;
    margin: 1em;
  }

  & img {
    height: 3em;
    margin-bottom: 0.5em;
  }
}

.photos {
  grid-column: 2/4;
  grid-row: 1;
  position: relative;

  & > img {
    object-fit: cover;
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    width: 100%;
    height: 100%;
    transition: opacity var(--transition);
  }
}

.phone {
  grid-column: 3/4;
  grid-row: 1;
  width: 25vw;
  margin: 15vh auto 2em;
  position: relative;
  z-index: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity var(--transition);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>