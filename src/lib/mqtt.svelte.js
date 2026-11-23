// MQTT communication handler
import mqtt from 'mqtt'
import { handleRocrailMessage } from './rocrail.svelte.js'

export const mqttState = $state({
    connected: false,
    messages: []
})

const client = mqtt.connect('ws://localhost:9001')

client.on('connect', () => {
    mqttState.connected = true
    client.subscribe('rocrail/#')
})

client.on('close', () => {
    mqttState.connected = false
})

client.on('message', (topic, payload, packet) => {
    const msg = payload.toString()
    mqttState.messages.push({ topic, text: msg, old: packet.retain })
    handleRocrailMessage(topic, msg, packet.retain)
})

export function publish(topic, text) {
    client.publish(topic, text)
}