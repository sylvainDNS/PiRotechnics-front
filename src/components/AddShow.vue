<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card id="frame">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :rules="nameRules" label="Nom du show" required></v-text-field>

          <v-btn color="blue darken-1" @click="clean">
            Annuler
          </v-btn>
          <v-btn :disabled="!valid" @click="submit">
            Ajouter
          </v-btn>
        </v-form>
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
      name: '',
      nameRules: [v => !!v || 'Un nom est obligatoire']
    }
  },
  created () {
    bus.$on('openAddShow', _ => {
      this.dialog = true
    })
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        bus.$emit('addShow', this.name)
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
#frame {
  padding: 0 10px 10px 10px;
}
</style>
