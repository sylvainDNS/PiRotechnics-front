<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card id="frame">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nom"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="time"
                    :rules="timeRules"
                    label="Durée"
                    required
                    ></v-text-field>
                    <v-select
                    v-model.number="channel"
                    :items="channels"
                    :rules="channelRules"
                    label="Canal"
                    required
                    ></v-select>

                    <v-btn 
                    color="blue darken-1" 
                    @click="clean"
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
import { bus } from '../workers/bus'
import axios from 'axios'

const rootApi = process.env.API_URL + ':' + process.env.API_PORT

export default {
    data: () => ({
        dialog: false,
        valid: false,
        name: '',
        time: 0,
        channel: 0,
        show_id: '',
        orderCursor: 0,
        nameRules: [v => !!v || 'Un nom est obligatoire'],
        timeRules: [v => !!v || 'Une durée est obligatoire'],
        channelRules: [v => !!v || 'Un canal est obligatoire'],
        channels: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29
        ]
    }),
    created() {
        bus.$on('openAddStep', reply => {
            this.dialog = reply.value
            this.show_id = reply.show.show_id
            this.orderCursor = reply.show.steps.length

            const usedChannels = reply.show.steps.map(step => {
                return step.channel
            })

            this.channels = this.channels.filter(channel => !usedChannels.includes(channel))
        })
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                axios
                    .post(rootApi + '/step', {
                        show_id: this.show_id,
                        cueOrder: this.getCursor(),
                        name: this.name,
                        channel: this.channel,
                        time: this.time
                    })
                    .then(() => {
                        this.clean()
                        bus.$emit('refreshSteps')
                    })
            }
        },
        getCursor() {
            this.orderCursor++
            return this.orderCursor
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
    padding: 0 10px 10px 10px;
}
</style>