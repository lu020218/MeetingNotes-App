<template>
    <div class="btn-bar">
        <div class="select-group">
            <div class="language">
                语言:
                <select name="lan" id="lan" v-model="languageSelect" @change="getLanguage">
                    <option v-for='(item, index) in optionList' :key="index">{{ item }}</option>
                </select>
            </div>
            <div class="note-language">
                <select name="" id="" @="getNoteLanguage">
                    <option value="origin">记录原文</option>
                    <option value="translate">记录译文</option>
                </select>
            </div>
        </div>
        <div class="btn-group">
            <img src="../assets/images/screenshot.svg" alt="截图">
            <img src="../assets/images/export.svg" alt="导出成Word文档">
        </div>
    </div>
    <div class="input-t">
        <textarea type="text" class="input-t" @keydown="addNotes" v-model="textarea"></textarea>
        <div style="display: flex;flex-direction: row;justify-content: flex-end;align-content: center;">
            <label for="">Ctrl+回车提交笔记</label>
            <button style="margin: 0 6px;">提 交</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToolsBar',
    data() {
        return {
            textarea: 'qwe',
            languageSelect: '中文',
            optionList: ['中文', '英文']
        }
    },
    methods: {
        getLanguage: function() {

        },
        getNoteLanguage: function() {

        },
        addNotes: function(event) {
            if (event.keyCode == 13)
            {
                console.log(this.textarea)
                this.$emit('add_note', this.textarea)
            }
        }
    }
}
</script>

<style>
.btn-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5px;
    justify-content: space-between;
    width: -webkit-fill-available;
}
.select-group{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 5px;
}

.note-language{
    padding-left: 5px;
}

.btn-group {
    padding: 5px;
}

.input-t {
    height: 90px;
    width: 100%;
    padding: 0px;
    resize: none;
}
</style>