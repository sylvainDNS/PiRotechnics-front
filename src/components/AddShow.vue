<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card id="frame">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nom du show"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="password"
                    type="password"
                    label="Mot de passe"
                    ></v-text-field>

                    <v-btn 
                    color="blue darken-1" 
                    @click.native="dialog = false"
                    >
                    Annuler
                    </v-btn>
                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    >
                    Ajouter
                    </v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { bus } from '../main'
import axios from 'axios'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    data: () => ({
        dialog: false,
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Un nom est obligatoire',
        ],
        password: ''
    }),
    created() {
        bus.$on('dialog', value => {
            this.dialog = value
        })
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                axios.post(rootApi + '/show', {
                    name: this.name,
                    password: this.password == '' ? null : this.password
                })
            }
        }
    }
}
</script>

<style scoped>
#frame {
    padding: 0 10px 10px 10px;
}
</style>