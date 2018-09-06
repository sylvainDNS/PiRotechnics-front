<template>
  <v-card height="350px">
    <v-navigation-drawer v-model="drawer" permanent absolute>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="show in shows" :key="show.name" @click="">
          <v-list-tile-content>
            <v-list-tile-title>{{ show.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import axios from 'axios'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
  data () {
    return {
      drawer: true,
      shows: []
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
    }
  }
}
</script>
