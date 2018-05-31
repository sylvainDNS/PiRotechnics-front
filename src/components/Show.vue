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
          <v-layout row wrap>
            <v-flex class="step"
              v-for="step in show.steps"
              v-bind:key="step.step_id"
              v-bind:index="step.cueOrder"
              v-bind:item="step"
            >
              <v-card>
                <div class="headline editor-field">
                  <v-text-field
                    :disabled="disabled"
                    name="step-name"
                    :value="step.name"
                  ></v-text-field>
                </div>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader class="composant">Canal</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field class="editor-field"
                      :disabled="disabled"
                      name="channel"
                      :value="step.channel"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Durée</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field class="editor-field"
                      :disabled="disabled"
                      name="time"
                      :value="step.time"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
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
          </v-layout>
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
            disabled: true
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
            axios.get(rootApi + '/show/' + this.show_id + '/step').then(response => {
                this.steps = response.data
            })
        },
        openAddStep() {
            const reply = {
                value: true,
                show_id: this.show.show_id,
                stepsLength: this.show.steps.length
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
