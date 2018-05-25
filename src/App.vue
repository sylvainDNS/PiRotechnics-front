<template>
  <v-app dark>
    
    <v-toolbar height="80">
<v-layout row>
      <router-link class="center" to="/" ><img src="./assets/logo.png" width="180" alt="PiRotechnics" ></router-link>
</v-layout>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            title: 'PiRotechnics'
        }
    },
    name: 'App'
}
</script>

<style scoped>
.center {
    display: block;
    margin: 0 auto;
}
</style>
