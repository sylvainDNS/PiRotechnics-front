<template>
  <v-dialog v-model="dialog" persistent max-width="250px">
    <v-card class="show">
      <v-layout row wrap justify-center>
        <v-flex xs4 justify-center align-center>
          <v-icon class="icon noselect" @click="addMinute(1)" dark>add</v-icon>
          <v-text-field class="time-field" light readonly solo :value="get2Char(this.minutes)" hide-details></v-text-field>
          <v-icon class="icon noselect" @click="addMinute(-1)" dark>remove</v-icon>
        </v-flex>
        <v-flex xs4 justify-center align-center>
          <v-icon class="icon noselect" @click="addSecond(1)" dark>add</v-icon>
          <v-text-field class="time-field" light readonly solo :value="get2Char(this.seconds)" hide-details></v-text-field>
          <v-icon class="icon noselect" @click="addSecond(-1)" dark>remove</v-icon>
        </v-flex>

        <v-flex xs12>
          <v-btn @click="clean" title="Annuler l'étape">
            Annuler
          </v-btn>
          <v-btn color="secondary" @click="submit" title="Ajouter l'étape">
            Ajouter
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>

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
    addMinute (digit) {
      this.minutes += digit
      if (this.minutes < 0) {
        this.minutes = 0
      }
    },
    addSecond (digit) {
      this.seconds += digit
      if (this.seconds > 59 || this.seconds < 0) {
        this.seconds = 0
      }
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
.show {
  padding: 10px;
}

.time-field {
  text-align: center;
  height: 50px;
  width: 70px;
  z-index: 0;
}

.incrementer {
  width: 50px;
  height: 50px;
}

.icon {
  margin-left: 20px;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
