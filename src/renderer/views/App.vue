<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
  

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    
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
  border-style: solid;
  border-width: 1px;
  border-radius: 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
}
</style>
