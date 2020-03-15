<template lang="pug">
div
  template(v-if="state === STATES.INIT")
    label Your name: 
      input(v-model="userName", placeholder="Your name")
    button(@click="broadcast") Start
  template(v-if="state === STATES.BROADCASTING")
    p Looking for users...
    button(@click="cancelBroadcast") Cancel
  template(v-if="state === STATES.CONNECTED")
    ul: li(v-for="message in messages")
      p {{message.text}}
        span by {{message.name}}
        span {{message.time}}
    input(v-model="userInput", placeholder="Type in your message...", @keyup.enter="sendMessage")
    button(@click="sendMessage") Send
    button(@click="disconnect") Disconnect
</template>

<script>
const signalhub = require('signalhub');
const SIGNALHUB_NAME = 'chat-hub';
const SIGNALHUB_PATH = 'http://localhost:8080';
const CHANNEL_NAMES = {
  JOINING: 'joining',
  CONNECTING: 'connecting',
};
const MESSAGE_TYPE = 'message';
const STATES = {
  INIT: 'init',
  BROADCASTING: 'broadcasting',
  CONNECTED: 'connected',
};

const HUB = signalhub(SIGNALHUB_NAME, [SIGNALHUB_PATH]);

export default {
  data() {
    return {
      messages: [],
      userInput: '',
      userName: '',
      state: STATES.INIT,
      STATES,
    };
  },
  methods: {
    broadcast() {
      this.state = STATES.BROADCASTING;
      HUB.broadcast(CHANNEL_NAMES.JOINING, {
        name: this.userName,
      });
      HUB.subscribe(CHANNEL_NAME).on('data', (data) => {
        console.log('connecting to', data.name);
      });
      hub.close([callback])
    },
    sendMessage() {
      if (!this.userInput) return;

    },
  },
}
</script>

<style lang="postcss" scoped>
ul {
  list-style: none;
  padding: 0;

  & span {
    margin-left: .5em;
    opacity: 0.6;
  }
}
</style>