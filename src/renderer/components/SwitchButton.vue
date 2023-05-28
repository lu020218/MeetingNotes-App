<template>
    <div class="switch" @click="openSwitch" >
            <div class="switch-bg" :class="{on:cur==1}">
                <div class="switch-btn" :class="{on:cur==1}"></div>
            </div>
        </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'SwitchButton',
    props: {
        state: String
    },
    data() {
        return {
            cur: this.state == 'open'
        }
    },
    watch: {
        state(value) {
            this.cur = value == 'open'
        }
    },
    methods: {
        openSwitch: function() {
            this.cur = !this.cur;
            this.inputValue = (this.cur == 1 ? 'open' : 'close')
        }
    },
    setup (props, context) {
        const inputValue = computed({
            get: () => props.state || '',
            set: val => {
                context.emit('update:state', val)
            }
        })

        return {
            inputValue
        }
    }
}
</script>

<style>
.switch{
    width: 2rem;
    height: 1.1rem;
    border-radius: 50px;
    border: 1px solid #efefef;
    position: relative;
    
}
.switch-btn{
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    border: 1px solid #efefef;
    position: absolute;
    background-color: #fff;
    top: -1px;
    left: -1px;
    transition:left .5s;
    -moz-transition:left .5s; /* Firefox 4 */
    -webkit-transition:left .5s; /* Safari and Chrome */
    -o-transition:left .5s; /* Opera */
}
.switch-bg{
    background-color: #52b0fd;
    width: 1rem;
    height: 1.1rem;
    border-radius: 50px;
    transition: width .5s;
    -moz-transition: width .5s; /* Firefox 4 */
    -webkit-transition:  width .5s; /* Safari and Chrome */
}
.switch-btn.on{
    left: 1rem;
}
.switch-bg.on{
    width: 2rem;
}
</style>