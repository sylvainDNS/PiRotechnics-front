<template>
  <v-container fluid grid-list-md>
    <v-data-iterator :items="currentSteps" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout" row wrap>
      <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
        <v-card>
          <v-card-title>
            <h4>Etape {{ props.index+1 }}</h4>
            <v-spacer></v-spacer>
            <v-btn flat icon small @click='deleteStep(props.item.step_id)' title="Supprimer l'étape">
              <v-icon dark>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Minutage : </v-list-tile-content>
              <v-list-tile-content class="align-end">{{ get2Char(props.item.minutes) }}:{{ get2Char(props.item.seconds) }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <v-btn @click='openAddStep' fixed fab bottom right color="secondary" title="Ajouter une étape">
      <v-icon>add</v-icon>
    </v-btn>
    <AddStep/>
  </v-container>
</template>

<script>
import { bus } from '../workers/bus'
import axios from 'axios'

import AddStep from './AddStep'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
  components: {
    AddStep
  },
  data () {
    return {
      currentSteps: [],
      currentShow: null,
      rowsPerPageItems: [6, 12, 18],
      pagination: {
        rowsPerPage: 6
      }
    }
  },
  created () {
    bus.$on('loadShow', show => {
      this.currentShow = show
      this.getSteps()
    })
    bus.$on('addStep', step => {
      this.addStep(step)
    })
  },
  methods: {
    getSteps () {
      axios
        .get(rootApi + '/show/' + this.currentShow.show_id + '/step')
        .then(response => {
          this.currentSteps = response.data
        })
    },
    deleteStep (step_id) {
      axios
        .delete(rootApi + '/step/' + step_id)
        .then(() => this.getSteps())
    },
    openAddStep () {
      bus.$emit('openAddStep', this.currentShow.show_id)
    },
    addStep (step) {
      axios
        .post(rootApi + '/step', step)
        .then(this.getSteps())
    },
    get2Char (digit) {
      if (digit < 10) {
        return '0' + digit
      } else {
        return digit
      }
    }
  }
}
</script>

<style scoped>
</style>
