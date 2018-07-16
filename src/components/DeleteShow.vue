<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title class="headline">Voulez-vous vraiment supprimer ce show ?</v-card-title>
        <v-card-text>Cette action est irréversible.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Annuler</v-btn>
          <v-btn color="red darken-1" flat @click.prevent='deleteShow()'>Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { bus } from '../workers/bus'
import axios from 'axios'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    data() {
        return {
            dialog: false,
            show: {
                show_id: '',
                name: '',
                steps: []
            }
        }
    },
    created() {
        bus.$on('openDeleteShow', show => {
            console.log('delete !')
            this.dialog = true
            this.show = show
        })
    },
    methods: {
        deleteShow() {
            axios
                .delete(rootApi + '/show/' + this.show.show_id)
                .then(() => bus.$emit('refreshShows'))
                .then(() => (this.dialog = false))
                .then(() => bus.$emit('closeShow'))
        }
    }
}
</script>