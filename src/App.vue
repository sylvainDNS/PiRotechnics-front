<template>
  <v-app id="app">
    <Drawer/>
    <router-view/>
  </v-app>
</template>

<script>
import Drawer from './components/Drawer'
export default {
  components: {
    Drawer
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null
    }
  }
}
</script>
