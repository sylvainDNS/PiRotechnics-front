<template>
  <v-dialog v-model="dialog" persistent max-width="250px">
    <v-card class="show">
      <v-layout row wrap justify-center>

        <v-flex xs4 justify-center align-center>
          <v-icon class="icon " @click=" " dark>add</v-icon>
          <v-text-field class="time-field " light readonly solo :value="this.seconds "></v-text-field>
          <v-icon class="icon " @click=" " dark>remove</v-icon>
        </v-flex>
        <v-flex xs4 justify-center align-center>
          <v-icon class="icon " @click=" " dark>add</v-icon>
          <v-text-field class="time-field " mask="## " light readonly solo :value="this.seconds "></v-text-field>
          <v-icon class="icon " @click=" " dark>remove</v-icon>
        </v-flex>

        <v-flex xs12>
          <v-btn @click="clean" title="Annuler l'étape">
            Annuler
          </v-btn>
          <v-btn color="secondary " @click="submit" title="Ajouter l'étape">
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
.show {
  padding: 10px;
}

.time-field {
  text-align: center;
  height: 50px;
  width: 70px;
}

.incrementer {
  width: 50px;
  height: 50px;
}

.icon {
  margin-left: 20px;
}
</style>
