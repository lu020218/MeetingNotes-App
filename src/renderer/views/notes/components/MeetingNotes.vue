<template>
    <div class="note-content">
        <ul class="note-ul" style="list-style: none;">
            <li v-for="(item, index) in note_data" :key="index">
                <p style="margin: 6px;"><a class="note-txt" v-for="(it, index) in item.text" :key="index">
                    {{ it.txt }}
                    <span style="color: red;">
                        [笔记：{{ it.note }}]
                    </span>
                </a></p>
                <img class="note-img" :src="imageToBase64(item.image)" v-if="item.image.length">
            </li>
        </ul>
    </div>
</template>

<script>
const { getScreentShotDir } = require('@/common/service')
// import { getImageURL } from '@/common/service'

export default {
    name: 'MeetingNotes',
    props: {
        note_data: Array
    },
    data() {
        return {
            screent_shot_dir: getScreentShotDir(),
        }
    },
    methods: {
        imageToBase64: function(str) {
            return `atom://${str}`
        }
    }
}
</script>

<style>
.note-content {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    background-color: #f7f7f3;
    width: 98%;
}


/* 滚动条整体 */
.note-content::-webkit-scrollbar {
    height: 20px;
    width: 10px;
}
/* 两个滚动条交接处 -- x轴和y轴 */
.note-content::-webkit-scrollbar-corner {
    background-color: transparent;
}

/* 滚动条滑块 */
.note-content::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(198, 198, 226, 0.473);
    background: #cecdcd;
}

/* 滚动条轨道 */
.note-content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(243, 242, 242, 0.336);
    border-radius: 6px;
    background: #ededed31;
}

.note-content::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
}

.note-content::-webkit-scrollbar-button:vertical:single-button:start {
    /* border: 1px solid red; */
    width: 20px;
    height: 15px;
    /* 3px 5px 移动图片位置 */
    background: url("@/renderer/assets/images/scrollbarTop.svg") -1px no-repeat;
    background-size: 12px 6px;
    cursor: pointer;
}

.note-content::-webkit-scrollbar-button:vertical:single-button:end {
    /* border: 1px solid red; */
    width: 20px;
    height: 15px;
    background: url("@/renderer/assets/images/scrollbarBottom.svg") -1px no-repeat;
    background-size: 12px 6px;
    cursor: pointer;
}

.note-ul {
    list-style: none;
    padding: inherit;
    text-align: justify;
    margin: 0px;
}

.note-txt {
    margin: 3px;
}

.note-img {
    width: calc(100% - 12px);
    height: 100%;
    margin: 6px;
}
</style>