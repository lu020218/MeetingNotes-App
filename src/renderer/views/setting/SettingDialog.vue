<template>
    <div class="top">
        <AppHeader title="会议笔记"/>
    </div>
    <div class="set-div">
        <label class="label">语言设置</label>
        <div class="lang-set">
            <div class="lang-from">
                <label>音源：</label>
                <select name="lan" id="lan" v-model="languageFrom" @change="getLanguage">
                    <option v-for='(item, index) in languageList' :key="index">{{ item }}</option>
                </select>
            </div>
            >>
            <div class="lang-note">
                <label>记录：</label>
                <select name="note-lan" id="note-lan" v-model="languageTo" @change="getNoteLanguage">
                    <option v-for='(item, index) in languageToList' :key="index">{{ item }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="set-div">
        <label class="label">录音设置</label>
        <div class="audio-set">
            <div>
                <input type="radio" id="mix" name="devices" value="mix" v-model="audioMode">
                <label for="mix">混  音</label>
            </div>
            <div>
                <input type="radio" id="mic" name="devices" value="mic" v-model="audioMode">
                <label for="mic">麦克风</label>
            </div>
            <div>
                <input type="radio" id="spk" name="devices" value="spk" v-model="audioMode">
                <label for="spk">扬声器</label>
            </div>
        </div>
    </div>
    <div class="set-div">
        <label class="label">自动化设置</label>
        <div class="time-set">
            <label style="width: 30%;">时间间隔：</label>
            <input type="text" style="width: 60px;" v-model="timeInterval">（单位：秒）
        </div>
        <div class="cv-set">
            <label style="width: 30%;">截图去重：</label>
            <SwitchButton v-model:state="cvState"></SwitchButton>
        </div>
    </div>
    <div class="set-div">
        <label class="label">截图设置</label>
        <div class="mode-select">
            <select name="selcct" id="select" v-model="screenshotMode" @change="getScreenshotMode">
                <option v-for="(item, index) in screenshotModeList" :key="index" :value="item">{{ item }}</option>
            </select>
            <div class="select-value" v-if="screenshotMode == '自动识别'">优先：WeLink Meeting > Web Video > 全屏</div>
            <div class="select-value" v-if="screenshotMode == '固定选择'">
                <div class="screenshot-mode-set">
                    <div class="radio" v-for="(item, index) in screenshotTargetList" :key="index">
                        <input type="radio" :id="item" name="screenshotModes" :value="item" v-model="screenshotTarget">
                        <label :for="item">{{ item }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="set-div">
        <label class="label">目录设置</label>
        <div class="dir-set">
            <label style="width: 30%;">缓存目录：</label>
            <input type="text" :value="tempDir">
            <button @click="openSaveDir">修改</button>
        </div>
        <div class="dir-set">
            <label style="width: 30%;">导出目录：</label>
            <input type="text" :value="exportDir">
            <button @click="openExportDir">修改</button>
        </div>
        <div class="dir-clean-set">
            <button class="custom-button">清理缓存目录</button>
        </div>
    </div>
    <div class="set-div">
        <div class="save-btn">
            <button class="custom-button" @click="saveConfig">应用并保存</button>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/renderer/components/AppHeader.vue'
import SwitchButton from '@/renderer/components/SwitchButton.vue'
import { ipcRenderer } from 'electron'
const {dialog}=require('electron').remote
const Store = require('electron-store')
const store = new Store()

export default {
    name: 'SettingDialog',
    data() {
        return {
            tempDir: '',
            exportDir: '',
            languageFrom: '中文',
            languageList: ['中文', '英文'],
            languageTo: '原文',
            languageToList: ['原文', '译文'],
            audioMode: 'mix',
            timeInterval: 30,
            cvState: 'open',
            screenshotMode: '自动识别',
            screenshotModeList: ['自动识别', '固定选择'],
            screenshotTargetList: ['WeLinkMeeting', 'WebVideo', 'FullScreen'],
            screenshotTarget: 'WeLinkMeeting'
        }
    },
    components: {
        AppHeader,
        SwitchButton
    },
    mounted: function() {
        this.loadConfig()
    },
    watch: {
        screenshotTarget() {
            console.log('screenshotTarget:' + this.screenshotTarget)
        }
    },
    methods: {
        saveConfig: function() {
            store.set('language.from', this.languageFrom)
            store.set('language.to', this.languageTo)
            store.set('audio', this.audioMode)
            store.set('auto.time', this.timeInterval)
            store.set('auto.cv', this.cvState)
            store.set('screentshot.mode', this.screenshotMode)
            store.set('screentshot.target', this.screenshotTarget)
            store.set('savedir.tempDir', this.tempDir)
            store.set('savedir.exportDir', this.exportDir)

            dialog.showMessageBox({
                message: '已成功应用并保存配置文件',
                type: 'info',
                title: '提示',
                buttons: ['OK']
            }).then ( result => {
                console.log('messagebox:' + result.response)
            })
        },
        loadConfig: function() {
            this.languageFrom = store.get('language.from')
            this.languageTo = store.get('language.to')
            this.audioMode = store.get('audio')
            this.timeInterval = store.get('auto.time')
            this.cvState = store.get('auto.cv')
            this.screenshotMode = store.get('screentshot.mode')
            this.screenshotTarget = store.get('screentshot.target')
            this.tempDir = store.get('savedir.tempDir')
            this.exportDir = store.get('savedir.exportDir')
        },
        openExportDir: function() {
            let savePath = ipcRenderer.sendSync('save-file-dialog','E:\\Work\\meeting-notes')
            console.log('savepath:' + savePath)
            if (savePath.length > 0)
            {
                this.exportDir = savePath[0]
            }
        },
        openSaveDir: function() {
            let savePath = ipcRenderer.sendSync('save-file-dialog','E:\\Work\\meeting-notes')
            console.log('savepath:' + savePath)
            if (savePath.length > 0)
            {
                this.tempDir = savePath[0]
            }
        },
        getNoteLanguage: function(strVal) {
            console.log(strVal)
        },
        getScreenshotMode: function(value) {
            console.log(value.target.value)
            this.screenshotMode = value.target.value
        }
    }
}
</script>

<style>
.radio {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: flex-start;
}
.label {
    padding: 10px;
    font-weight: bold;
    text-align: left;
}
.set-div {
    margin: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
.dir-set {
    margin: 6px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.lang-set {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 10px;
}
.lang-from {
    width: 50%;
    margin: 6px;
}
.lang-note {
    width: 50%;
    margin: 6px;
}
.audio-set {
    margin: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;
}
.time-set {
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.cv-set {
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.dir-clean-set {
    margin: 10px;
    display: flex;
}
.custom-button {
    color: rgb(255 255 255);
    background-color: #008cff;
    border-style: none;
    border-radius: 16px;
    padding: 6px 13px;
}
.save-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 6px;
}
.custom-button:hover {
    cursor: pointer;
    background-color: #7bc1fa;
}
.mode-select {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
}
.select-value {
    font-size: 14px;
    margin-left: 9px;
}
.screenshot-mode-set {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: nowrap;
    font-size: 13px;
}
</style>