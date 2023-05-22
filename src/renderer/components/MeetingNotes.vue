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
                <img class="note-img" :src="item.image" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
const { getScreentShotDir } = require('../../common/service')

export default {
    name: 'MeetingNotes',
    props: {
        note_data: Array
    },
    data() {
        return {
            screent_shot_dir: getScreentShotDir(),
        }
    }
}
</script>

<style>
.note-content {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
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

/* 滚动条两端按钮 
.note-content::-webkit-scrollbar-button {
}
*/

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
    width: 100%;
    height: 100%;
}
</style>