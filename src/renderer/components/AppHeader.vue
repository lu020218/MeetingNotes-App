<template>
  <div class="header">
    <div v-if="currentRouteName === 'index'">
      <div class="header-left">
        <router-link to="/setting">
          <img class="img-header-btn" src="../assets/images/setting.svg" alt="" style="-webkit-app-region: no-drag;">
        </router-link>
      </div>
    </div>
    <div v-else-if="currentRouteName === 'setting'">
      <div class="header-left">
        <router-link to="/">
          <img class="img-header-btn" src="../assets/images/goback.svg" alt="" style="-webkit-app-region: no-drag;">
        </router-link>
      </div>
    </div>
    <div class="header-middle">
      <div class="title-txt">{{title}}</div>
    </div>
    <div class="header-right">
      <div class="btn-group">
        <img class="img-header-btn" src="../assets/images/minimize.svg" alt="" @click="minimize_window">
        <img class="img-header-btn" src="../assets/images/close.svg" alt="" @click="close_window">
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { useRoute } from 'vue-router'
const {dialog}=require('electron').remote

export default {
  name: 'AppHeader',
  props: {
    title: String
  },
  components: {
  },
  data() {
    return {
      currentRouteName: useRoute().name,
      isNotesSave: false
    }
  },
  methods: {
    minimize_window() {
      ipcRenderer.send('window-minimize')
    },
    close_window() {
      if (this.isNotesSave == false) {
          dialog.showMessageBox({
          message: '笔记尚未保存，请确认是否关闭？',
          type: 'question',
          title: '提示',
          buttons: ['OK', 'Cancel']
        }).then ( result => {
          console.log('messagebox:' + result.response)
          if (result.response == '0') {
            ipcRenderer.send('window-close')
          }
        })
      }
      else {
        ipcRenderer.send('window-close')
      }
    },
    open_setting() {
      
    }
  },
  created() {
    ipcRenderer.on('notes-saved', () => {
      this.isNotesSave = true
    })
  },
  watch: {
    $route(to, from) {
      console.log('to:' + to.name + ',from:' + from.name)
      this.currentRouteName = to.name
    }
  },
  setup() {
    
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
.header-left {
  padding-left: 6px;
  padding-top: 4px;
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

.img-header-btn {
  height: 25px;
  margin: 0 3px;
}
.img-header-btn:hover {
  cursor: pointer;
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