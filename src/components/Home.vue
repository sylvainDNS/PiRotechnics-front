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
                  click
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
            >
              <v-icon>add</v-icon>
            </v-btn>
        </v-flex>            
      </v-layout>
        <AddShow/>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import AddShow from './AddShow'
import { bus } from '../main'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    components: {
        AddShow
    },

    data() {
        return {
            shows: []
        }
    },
    created() {
        axios
            .get(rootApi + '/show')
            .then(response => {
                this.shows = response.data
            })
            .catch(e => {
                console.error(e)
            })
    },
    methods: {
        getTime(show) {
            if (show.updatedAt) return moment(show.updatedAt).fromNow()
            else return moment(show.createdAt).fromNow()
        },
        openAddShow() {
            bus.$emit('dialog', true)
        }
    }
}
</script>