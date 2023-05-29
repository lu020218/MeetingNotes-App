<template>
    <div class="btn-bar">
        <div class="btn-group">
            <div class="btn-left">
                <div class="btn-with-text">
                    <img class="img-btn" src="@/renderer/assets/images/screenshot.svg" style="height: 16px;margin-right: 1px;">
                    截屏
                </div>
                <div class="y-line"></div>
                <div class="text-btn">
                    自动截图
                </div>
            </div>
            <div class="btn-right">
                <div class="btn-with-text" @click="exportWord">
                    <img class="img-btn" src="@/renderer/assets/images/export.svg" style="height: 16px;margin-right: 1px;">
                    导出
                </div>
                
            </div>
        </div>
    </div>
    <div class="input-t">
        <textarea type="text" class="input-area" @keydown="addNotes" v-model="textarea"></textarea>
        <div style="display: flex;flex-direction: row;justify-content: flex-end;align-content: center;">
            <button class="commit-btn" style="margin: 0 6px;" @click="commitNotes">提 交</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToolsBar',
    data() {
        return {
            textarea: '',
            languageSelect: '中文',
            optionList: ['中文', '英文']
        }
    },
    methods: {
        exportWord: function() {
            this.$emit('export_word')
        },
        commitNotes: function() {
            this.$emit('add_note', this.textarea)
            this.textarea = ""
        },
        addNotes: function(event) {
            if (event.keyCode == 13)
            {
                console.log(this.textarea)
                this.$emit('add_note', this.textarea)
                this.textarea = ""
            }
        }
    }
}
</script>

<style>
.btn-bar {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgb(211 211 211);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: -webkit-fill-available;
    flex-wrap: nowrap;
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
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
}
.input-area {
    height: 115px;
    width: calc(100% - 4px);
    padding: 1px;
    resize: none;
    border: none;
    outline: none;
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
}
.btn-with-text {
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    border-radius: 3px;
}
.btn-with-text:hover, .text-btn:hover {
    background-color: rgb(238, 238, 238);
    cursor: pointer;
}
.btn-with-text:active, .text-btn:active {
    cursor: pointer;
    background-color: rgb(211, 211, 211);
}
.y-line {
    float:left;
    width: 1px;
    height: 17px;
    background: darkgray;
    margin: 0 3px;
}
.commit-btn {
    position: absolute;
    display: flex;
    flex-direction: row;
    place-content: center flex-end;
    bottom: 6px;
    right: 3px;
}
.btn-left, .btn-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.text-btn {
    font-size: 15px;
    padding: 0 6px;
    border-radius: 3px;
}
</style>