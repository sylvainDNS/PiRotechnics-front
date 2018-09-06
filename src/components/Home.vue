<template>
  <v-app id="home" dark>
    <v-navigation-drawer v-model="drawer" permanent clipped floating fixed app>
      <v-list dense>
        <v-list-tile v-for="show in shows" :key="show.name" @click="loadShow(show)">
          <v-list-tile-content>
            <v-list-tile-title>{{ show.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>PiRotechnics</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Show/>
    </v-content>

  </v-app>
</template>

<script>
import axios from 'axios'
import { bus } from '../workers/bus'

import Show from './Show'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
  components: {
    Show
  },
  data () {
    return {
      drawer: true,
      shows: [],
      currentShow: null
    }
  },
  created () {
    this.getShows()
  },
  methods: {
    getShows () {
      axios
        .get(rootApi + '/show')
        .then(response => {
          this.shows = response.data.sort((a, b) => {
            const aDate = this.getLastDate(a)
            const bDate = this.getLastDate(b)
            return new Date(bDate) - new Date(aDate)
          })
        })
        .catch(e => {
          console.error(e)
        })
    },
    getLastDate (show) {
      if (show.updatedAt) return show.updatedAt
      else return show.createdAt
    },
    loadShow (show) {
      bus.$emit('loadShow', show)
    }
  }
}
</script>

