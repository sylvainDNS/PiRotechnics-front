<template>
  <v-container grid-list-xl>
      <v-layout row>
        <v-flex md12>
          <v-card>
             <v-list two-line>
              <template v-for="(show, index) in shows">
                <v-list-tile
                  :key="show.name"
                  avatar
                  ripple
                  @click.prevent='openShow(show.show_id, show.name)'
                >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ show.name }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      {{ getTime(show) }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < shows.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
          <v-btn  @click.prevent='openAddShow()'
              fixed
              dark
              fab
              bottom
              right
              color=primary
              title="Ajouter un show"
            >
              <v-icon>add</v-icon>
            </v-btn>
        </v-flex>            
      </v-layout>
        <AddShow/>
        <Show/>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import AddShow from './AddShow'
import Show from './Show'
import { bus } from '../workers/bus'

moment.locale('fr')

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    components: {
        AddShow,
        Show
    },

    data() {
        return {
            shows: []
        }
    },
    created() {
        this.getShows()
        bus.$on('refreshShows', () => {
            this.getShows()
        })
    },
    methods: {
        getTime(show) {
            return moment(this.getLastDate(show)).fromNow(true)
        },
        openAddShow() {
            bus.$emit('openAddShow')
        },
        openShow(show_id, show_name) {
            axios.get(rootApi + '/show/' + show_id + '/step').then(response => {
                const show = {
                    show_id: show_id,
                    name: show_name,
                    steps: response.data
                }
                bus.$emit('openShow', show)
            })
        },
        getShows() {
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
        getLastDate(show) {
            if (show.updatedAt) return show.updatedAt
            else return show.createdAt
        }
    }
}
</script>