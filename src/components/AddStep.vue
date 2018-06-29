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
                    v-model.number="currentCueOrder"
                    :items="cueOrders"
                    :rules="cueOrderRules"
                    label="Ordre"
                    required
                    ></v-select>
                    <v-select
                    v-model.number="currentChannel"
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
        currentChannel: 0,
        currentCueOrder: 0,
        show_id: '',
        orderCursor: 0,
        nameRules: [v => !!v || 'Un nom est obligatoire'],
        timeRules: [v => !!v || 'Une durée est obligatoire'],
        channelRules: [v => !!v || 'Un canal est obligatoire'],
        channels: Array.from({ length: 28 }, (v, k) => k + 1),
        cueOrderRules: [v => !!v || 'Un ordre est obligatoire'],
        cueOrders: Array.from({ length: 28 }, (v, k) => k + 1)
    }),
    created() {
        bus.$on('openAddStep', reply => {
            this.dialog = reply.value
            this.show_id = reply.show.show_id
            this.orderCursor = reply.show.steps.length

            const usedChannels = reply.show.steps.map(step => {
                return step.channel
            })
            const usedCueOrders = reply.show.steps.map(step => {
                return step.cueOrder
            })

            this.channels = this.channels.filter(channel => !usedChannels.includes(channel))
            this.cueOrders = this.cueOrders.filter(cueOrder => !usedCueOrders.includes(cueOrder))
        })
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                axios
                    .post(rootApi + '/step', {
                        show_id: this.show_id,
                        cueOrder: this.currentCueOrder,
                        name: this.name,
                        channel: this.currentChannel,
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