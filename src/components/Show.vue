<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ show.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
          round
          flat
          ><v-icon>delete</v-icon>
          </v-btn>
          <v-btn
          round
          flat
          v-on:click="edit()"
          class="edit"
          >
          <v-icon v-if="!editing">edit</v-icon>
          <v-icon v-else>save</v-icon>
          </v-btn>
          <v-btn 
          round
          flat
          ><v-icon>whatshot</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card>
        <v-container fluid grid-list-md>
           <v-data-iterator
            :items="show.steps"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
            >
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm6
              md4
              lg3
            >
              <v-card>
                <v-card-title>
                  <h4>{{ props.item.name }}</h4>
                  <v-spacer></v-spacer>
                  <v-btn flat icon small>
                    <v-icon dark>close</v-icon>
                  </v-btn>
                </v-card-title>
                
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Ordre:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.cueOrder }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Canal:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.channel }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Durée:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.time }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-data-iterator>
          <v-btn  @click.prevent='openAddStep()'
            fixed
            dark
            fab
            bottom
            right
            color=primary
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-container>
      </v-card>
      <AddStep/>
    </v-dialog>
</template>
<script>
import { bus } from '../workers/bus'
import AddStep from './AddStep'
import axios from 'axios'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    components: {
        AddStep
    },
    data() {
        return {
            dialog: false,
            show: {
                show_id: '',
                name: '',
                steps: []
            },
            editing: false,
            disabled: true,
            rowsPerPageItems: [4, 8, 12],
            pagination: {
                rowsPerPage: 4
            }
        }
    },
    created() {
        bus.$on('openShow', show => {
            this.dialog = true
            this.show = show
        })
        bus.$on('refreshSteps', () => {
            this.getSteps()
        })
    },
    methods: {
        edit() {
            this.editing = !this.editing
            this.disabled = !this.disabled
        },
        getSteps() {
            axios.get(rootApi + '/show/' + this.show.show_id + '/step').then(response => {
                this.show.steps = response.data
            })
        },
        openAddStep() {
            const reply = {
                value: true,
                show: this.show
            }
            bus.$emit('openAddStep', reply)
        }
    }
}
</script>

<style scoped>
.composant {
    padding: 0 0 0 16px;
    align-items: flex-end;
}
.step {
    max-width: 50%;
}

.editor-field div div input:disabled {
    color: rgb(146, 43, 43);
}
.editor-field::after {
    color: white;
}
</style>
