<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-flex>
          <v-icon x-large @click="addMinute(1)" color="accent">add_circle_outline</v-icon>
          <v-text-field class="time-field" light readonly solo :value="this.minutes"></v-text-field>
          <v-icon x-large @click="addMinute(-1)" color="accent">remove_circle_outline</v-icon>
        </v-flex>
        <v-flex>
          <v-icon x-large @click="addSecond(1)" color="accent">add_circle_outline</v-icon>
          <v-text-field class="time-field" light readonly solo :value="this.seconds"></v-text-field>
          <v-icon x-large @click="addSecond(-1)" color="accent">remove_circle_outline</v-icon>
        </v-flex>
        <v-btn color="secondary" @click="clean" title="Annuler l'étape">
          Annuler
        </v-btn>
        <v-btn @click="submit" title="Ajouter l'étape">
          Ajouter
        </v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { bus } from '../workers/bus'

export default {
  data () {
    return {
      dialog: false,
      valid: false,
      show_id: '',
      minutes: 0,
      seconds: 0
    }
  },
  created () {
    bus.$on('openAddStep', show_id => {
      this.dialog = true
      this.show_id = show_id
    })
  },
  methods: {
    submit () {
      bus.$emit('addStep', {
        show_id: this.show_id,
        minutes: this.minutes,
        seconds: this.seconds
      })
      this.clean()
    },
    clean () {
      this.dialog = false
      this.minutes = 0
      this.seconds = 0
    },
    addMinute (number) {
      this.minutes += number
      if (this.minutes < 0) {
        this.minutes = 0
      }
    },
    addSecond (number) {
      this.seconds += number
      if (this.seconds > 59 || this.seconds < 0) {
        this.seconds = 0
      }
    }
  }
}
</script>

<style scoped>
.frame {
  padding: 0 10px 10px 10px;
}

.time-field {
  width: 70px;
}

.incrementer {
  width: 50px;
  height: 50px;
}
</style>
