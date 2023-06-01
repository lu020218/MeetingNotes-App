<template>
    <div class="export-view">
        <div class="dialog-header">{{title}}</div>
        <div v-if="viewIndex === 1">
            <div class="content">
                <div class="ct-title">
                    导出内容：
                </div>
                <div class="checkbox-group">
                    <div class="checkbox">
                        <input type="checkbox" id="text" v-model="checkedValues" value="1"><label for="text">文 字</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="image" v-model="checkedValues" value="2"><label for="image">图 片</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="note" v-model="checkedValues" value="4"><label for="note">笔 记</label>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button class="custom-button" style="width: 65px;" @click="exportWord">导 出</button>
                <button class="custom-button" style="width: 65px;" @click="exportCancel">取 消</button>
            </div>
        </div>
        <div style="padding: 15px;" v-if="viewIndex === 2">
            <div class="content" style="margin: 10px;padding: 10px;">
                <div v-if="success === 'processing'">
                    <ProgressBar></ProgressBar>
                </div>
                <div v-if="success === 'true'">
                    <label for="">导出成功！</label>
                </div>
                <div v-if="success === 'false'">
                    <label for="">导出失败！</label>
                </div>
            </div>
            <div v-if="success !== 'false'" style="margin: 10px;padding: 10px;">
                <div class="buttons">
                    <button class="custom-button" style="width: 130px;" @click="openExportDir" :disabled="success==='processing'">打开目录</button>
                </div>
            </div>
            <div v-if="success === 'false'">
                <button class="custom-button" style="width: 65px;" @click="openExportDir">重 试</button>
                <button class="custom-button" style="width: 65px;" @click="exportCancel">取 消</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import ProgressBar from '@/renderer/components/ProgressBar.vue'

export default {
    name: 'ExportView',
    data() {
        return {
            title: '导出选项',
            viewIndex: 1,
            success: 'processing',
            checkedValues: []
        }
    },
    components: {
        ProgressBar
    },
    methods: {
        exportCancel: function() {
            console.log('send close-export-dialog')
            ipcRenderer.send('close-export-dialog')
        },
        exportWord: function() {
            this.title = '正在导出Word文档'
            this.viewIndex = 2
        }
    }
}
</script>

<style>
.export-view {
    height: 100%;
}
.checkbox-group {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
}
.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    padding: 10px;
}
.dialog-header {
    -webkit-app-region: drag;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.ct-title {
    display: flex;
    padding: 10px;
}
</style>