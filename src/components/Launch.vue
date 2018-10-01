<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>

    <v-toolbar dark color="error">
      <v-btn icon dark @click.native="dialog = false">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Lancement</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      </v-toolbar-items>
    </v-toolbar>
    <v-card></v-card>
  </v-dialog>
</template>

<script>
import { bus } from '../workers/bus'
import axios from 'axios'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
  data () {
    return {
      dialog: false,
      show: null
    }
  },
  created () {
    bus.$on('openLaunch', show => {
      this.dialog = true
      this.getSteps(show.show_id)
    })
  },
  methods: {
    getSteps (show_id) {
      axios
        .get(rootApi + '/show/' + show_id + '/step')
        .then(response => {
          this.show = response.data
        })
    }
  }
}
</script>

<style scoped>
</style>
