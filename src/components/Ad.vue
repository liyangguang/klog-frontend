<template lang="pug">
main(:class="{['_bg-' + (photoIndex + 1)]: true}")
  .content
    .left
      h1 SwapLive
      p Swap your face and live chat!
      ul.features
        li
          img(src="@/assets/neural.svg", alt="neural icon")
          p AI technology swaps your face
        li
          img(src="@/assets/camera.svg", alt="camera icon")
          p Protect your identity and privacy
        li
          img(src="@/assets/speech-bubble.svg", alt="speech bubble icon")
          p Live chat with others in groups or 1-on-1
      p Coming soon! Sign up to get updates!
      form
        ant-input(type="email", name="email", placeholder="Email address")
        ant-button(type="primary") Sign up
</template>

<script>
import {Button as AntButton, Input as AntInput} from 'ant-design-vue';

const SLIDE_INTERVAL = 5 * 1000;

export default {
  components: {AntButton, AntInput},
  data() {
    return {
      photoIndex: 0,
      photos: [require('@/assets/ad/phone-1.png'), require('@/assets/ad/phone-2.png'), require('@/assets/ad/phone-3.png')],
    }
  },
  created() {
    this._addFacebookTracking();
    setInterval(() => {
      this.nextPhoto();
    }, SLIDE_INTERVAL);

  },
  methods: {
    _addFacebookTracking(){
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
       fbq('init', '215864872930611'); 
      fbq('track', 'PageView');
    },
    nextPhoto(){
      this.photoIndex = (this.photoIndex + 1) % this.photos.length;
    },
  },
}
</script>

<style lang="postcss" scoped>
@import '../variables.css';

:root {
  --z-content: 1;
  --z-bg-photos: 0;
  --transition: 1s linear;
}

main {
  position: relative;
  transition: background var(--transition);
  background-size: auto 100vh;
  background-repeat: no-repeat;
  background-position: 75% 50%;

  &._bg-1 {
    background-color: #009abf;
    background-image: url(../assets/ad/phone-1.png);
  }
  &._bg-2 {
    background-color: #fdc728;
    background-image: url(../assets/ad/phone-2.png);
  }
  &._bg-3 {
    background-color: #f16d3e;
    background-image: url(../assets/ad/phone-3.png);
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  position: relative;
  z-index: var(--z-content);
}

.left {
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

form {
  display: flex;
  align-items: center;

  & input {
    margin-right: 1em;
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

.right {
  position: relative;
  height: 100vh;

  & > img {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100vh;
    transform: translateX(-70%);
  }
}

@media screen and (max-width: 800px) {
  main {
    background-position: 50% 100%;
    padding-bottom: 600px;
  }

  .content {
    display: block;
    font-size: 0.8em;
  }

  .left {
    padding: 6em 2em 2em;
    text-align: center;
  }

  .features {
    display: block;

    & > li {
      margin-bottom: 2em;
    }
  }

  .right {
    display: none;
  }
}
</style>
