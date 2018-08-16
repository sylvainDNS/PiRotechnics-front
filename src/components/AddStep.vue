<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent  max-width="500px">
            <v-card id="frame">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <vue-timepicker v-model="time" format="hh:mm:ss"></vue-timepicker>
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
import VueTimepicker from 'vue2-timepicker'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    data() {
        return {
            dialog: false,
            valid: false,
            show_id: '',
            orderCursor: 0,
            time: {
                hh: '00',
                mm: '00',
                ss: '00'
            }
        }
    },
    components: {
        VueTimepicker
    },
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
        }
    }
}
</script>

<style scoped>
#frame {
    padding: 50px;
}

.dialog.dialog--active {
    overflow: initial;
    background-color: red;
}
</style>