<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
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
            >
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn
            round
            flat
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn 
            round
            flat
            >
              <v-icon>flare</v-icon>
            </v-btn>
            <!-- <v-btn dark flat @click.native="dialog = false">Save</v-btn> -->
          </v-toolbar-items>
        </v-toolbar>
        <v-subheader>Détail du show</v-subheader>
          <template v-for="(step, index) in show.steps">
            <v-flex xs12>
              <v-card color="cyan darken-2" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row wrap>
                    <v-flex xs7>
                      <div>
                        <div class="headline">{{ step.name }}</div>
                        <div>Foster the People</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          <v-divider v-if="index + 1 < show.steps.length" :key="index"></v-divider>
        </template>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { bus } from '../workers/bus'

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
        bus.$on('openShow', show => {
            this.dialog = true
            this.show = show
        })
    }
}
</script>