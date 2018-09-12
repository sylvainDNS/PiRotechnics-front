<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" mask="##" classe="frame" persistent max-width="500px" background-color="white">
      <v-card>
        <v-btn class="incrementer" fab small>
          <v-icon x-large>add_circle_outline</v-icon>
        </v-btn>
        <v-text-field class="time-field" readonly outline label="Secondes" :value="this.seconds"></v-text-field>
        <v-btn class="incrementer" fab small>
          <v-icon x-large>remove_circle_outline</v-icon>
        </v-btn>
        <v-btn color="primary" @click="clean" title="Annuler l'étape">
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
    this.getTime()
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        bus.$emit('addStep', {
          show_id: this.show_id,
          minutes: this.minutes,
          seconds: this.seconds
        })
        this.clean()
      }
    },
    clean () {
      this.dialog = false
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
.frame {
  padding: 0 10px 10px 10px;
  background-color: #424242 !important;
  color: #fff;
}

.time-field {
  width: 70px;
}

.incrementer {
  width: 50px;
  height: 50px;
}
</style>
