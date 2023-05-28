<template>
  <div class="top">
    <AppHeader title="会议笔记"/>
  </div>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
  import AppHeader from '@/renderer/components/AppHeader.vue'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    AppHeader
  },
  methods: {
  },
  setup() {
  }
}
</script>

<style>
#app {
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
  border-style: solid;
  border-width: 1px;
}
</style>
