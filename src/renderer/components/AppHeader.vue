<template>
  <div class="header">
    <div class="title">
        <img src="../assets/images/notes.svg" alt="">
        <div class="title-txt">{{title}}</div>
    </div>
    <div class="btn-group">
        <img src="../assets/images/setting.svg" alt="" @click="open_setting">
        <img src="../assets/images/close.svg" alt="" @click="close_window">
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'AppHeader',
  props: {
    title: String
  },
  components: {
  },
  data() {
    return {

    }
  },
  methods: {
    close_window() {
      ipcRenderer.send('window-close')
    },
    open_setting() {
      ipcRenderer.send('open-setting', '/setting')
    }
  }
}
</script>

<style>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
}

.title-txt {
  margin: 0 3px;
  font-size: 18px;
  text-align: center;
  font-weight: bolder;
}

img {
  height: 25px;
  margin: 0 3px;
}

.btn-group {
  -webkit-app-region: no-drag;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
</style>