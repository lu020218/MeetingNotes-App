<template>
    <div>
        <div class="dialog-header">导出选项</div>
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
        
        <div>已选中：{{ checkedValues }}</div>
        <div class="buttons">
            <button class="custom-button" style="width: 65px;" @click="exportWord">导 出</button>
            <button class="custom-button" style="width: 65px;" @click="exportCancel">取 消</button>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
    name: 'ExportView',
    data() {
        return {
            checkedValues: []
        }
    },
    components: {
        
    },
    methods: {
        exportCancel: function() {
            console.log('send close-export-dialog')
            ipcRenderer.send('close-export-dialog')
        },
        exportWord: function() {

        }
    }
}
</script>

<style>
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