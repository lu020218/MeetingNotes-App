<template>
    <div class="radio" v-for="(item, index) in radioList" :key="index">
        <input type="radio" :id="item" :name="name" :value="item" v-model="redioValue">
        <label :for="item">{{ item }}</label>
    </div>
</template>

<script>
export default {
    name: 'RadioButton',
    props: {
        name: String,
        radioList: Array,
        defaultValue: String
    },
    data() {
        return {
            redioValue: this.defaultValue
        }
    }
}
</script>