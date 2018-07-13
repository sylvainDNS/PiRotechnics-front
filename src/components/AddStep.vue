<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card id="frame">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="time"
                    :rules="timeRules"
                    label="Durée"
                    required
                    ></v-text-field>

                    <v-btn 
                    color="blue darken-1" 
                    @click="clean"
                    title="Annuler l'étape"
                    >
                    Annuler
                    </v-btn>
                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    title="Ajouter l'étape"
                    >
                    Ajouter
                    </v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { bus } from '../workers/bus'
import axios from 'axios'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    data: () => ({
        dialog: false,
        valid: false,
        show_id: '',
        orderCursor: 0,
        time: 0,
        timeRules: [
            v => !!v || 'Une durée est obligatoire',
            v => v != 0 || 'Une durée ne peut pas être nulle'
        ]
    }),
    created() {
        bus.$on('openAddStep', show => {
            this.dialog = true
            this.show_id = show.show_id
            this.orderCursor = show.steps.length
        })
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                axios
                    .post(rootApi + '/step', {
                        show_id: this.show_id,
                        time: this.time
                    })
                    .then(() => {
                        this.clean()
                        bus.$emit('refreshSteps')
                    })
            }
        },
        clean() {
            this.dialog = false
            this.$refs.form.reset()
        },
        unusedMap() {}
    }
}
</script>

<style scoped>
#frame {
    padding: 0 10px 10px 10px;
}
</style>