<template>
  <v-app id="home" dark>
    <v-navigation-drawer permanent clipped floating fixed app>
      <v-list dense>
        <v-list-tile v-for="show in shows" :value="show.active" :key="show.name" @click="loadShow(show)" active-class="show-active">

          <v-list-tile-content>
            <v-list-tile-title>{{ show.name }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
        <v-btn block color="primary" @click="openAddShow" title="Ajouter un show">
          <v-icon>add</v-icon>
        </v-btn>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>PiRotechnics</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <Show/>
    </v-content>
    <AddShow/>
  </v-app>
</template>

<script>
import axios from 'axios'
import { bus } from '../workers/bus'

import Show from './Show'
import AddShow from './AddShow'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
  components: {
    Show, AddShow
  },
  data () {
    return {
      shows: []
    }
  },
  created () {
    this.getShows()
    bus.$on('addShow', name => {
      this.addShow(name)
    })
  },
  methods: {
    addShow (name) {
      axios
        .post(rootApi + '/show', {
          name: name
        })
        .then(() => {
          this.getShows()
        })
    },
    getShows () {
      axios
        .get(rootApi + '/show')
        .then(response => {
          this.shows = response.data.sort((a, b) => {
            const aDate = this.getLastDate(a)
            const bDate = this.getLastDate(b)
            return new Date(bDate) - new Date(aDate)
          }).map((show, index) => {
            const active = () => {
              if (index === 0) {
                this.loadShow(show)
                return true
              }
            }
            return {
              show_id: show.show_id,
              name: show.name,
              createdAt: show.createdAt,
              updatedAt: show.updatedAt,
              active: active()
            }
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
      this.setActive(show)
    },
    openAddShow () {
      bus.$emit('openAddShow')
    },
    setActive (_show) {
      this.shows = this.shows.map(show => {
        if (show.show_id === _show.show_id) {
          return {
            show_id: show.show_id,
            name: show.name,
            createdAt: show.createdAt,
            updatedAt: show.updatedAt,
            active: true
          }
        } else {
          return {
            show_id: show.show_id,
            name: show.name,
            createdAt: show.createdAt,
            updatedAt: show.updatedAt,
            active: false
          }
        }
      })
    }
  }
}
</script>

<style>
.show-active,
.show-active:hover,
#home {
  background-color: darkgray !important;
  color: black;
}
</style>
