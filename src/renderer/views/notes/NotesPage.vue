<template>
  <div class="top">
    <AppHeader title="会议笔记"/>
  </div>
  <div class="middle">
    <MeetingNotes :note_data="notes_data"/>
  </div>
  <div class="bottom">
    <ToolsBar @add_note="chuandi_note" @export_word="exportWord"></ToolsBar>
  </div>
</template>

<script>
import {onBeforeMount, onMounted, getCurrentInstance} from 'vue'
import AppHeader from '@/renderer/components/AppHeader.vue'
import MeetingNotes from './components/MeetingNotes.vue'
import ToolsBar from './components/ToolsBar.vue'
import { getNotes } from '@/common/service'
import { ipcRenderer } from 'electron'
const Store = require('electron-store')

export default {
  name: 'NotesPage',
  data() {
    return {
      note_content: '',
      notes_data: [],
      datas: {}
    }
  },
  components: {
    AppHeader,
    MeetingNotes,
    ToolsBar
  },
  methods: {
    exportWord: function() {
      let store = new Store()
      let exportPath = store.get('savedir.exportDir')
      ipcRenderer.send('export-word', exportPath, JSON.stringify(this.notes_data))
    },
    chuandi_note: function(val) {
      console.log('app:' + val)
      this.note_content = val
      let length = this.notes_data.length
      if (this.notes_data[length - 1].image.length > 0)
      {
        let note_text = { image: '', text: []}
        note_text.text.push({txt: '', note: val})
        this.notes_data.push(note_text)
      }
      else
      {
        this.notes_data[length - 1].text.push({txt: '', note: val})
      }
    }
  },
  setup() {
    const ins = getCurrentInstance()
    onBeforeMount(() => {
      
    }),
    onMounted(() => {
      // 在挂载后执行
      let datas = getNotes('E:\\Work\\meeting-notes\\MeetingNotes-App\\notes_tmp.json')
      //console.log('datas:' + datas.notes)
      if (!datas) return

      datas.notes.forEach(element => {
        let note = { image: {base64: '', path: ''}, text: []}
        note.image = element.image
        //console.log('img:'+element.image+', image:'+note.image)
        note.text = element.text
        ins.data.notes_data.push(note)
      });
    })
  }
}
</script>

<style>
#NotesPage {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.top {
  flex: 0 0 auto;
  -webkit-app-region: drag;
}

.middle {
  flex: 1 1 auto;
  height: calc(100vh - 35px - 163px);
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.bottom {
  flex: 0 0 auto;
  height: 160px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
}
</style>
