<script>
  import { mqttState } from "../mqtt.svelte.js";

  let log;

  // Scroll to the bottom when a new message appears
  $effect(() => {
    mqttState.messages.length;
    log.scrollTop = log.scrollHeight;
  });
</script>

<main class="box log" bind:this={log}>
  {#each mqttState.messages as m}
    <div class:dim={m.old}><span class="topic">{m.topic}</span> {m.text}</div>
  {/each}
</main>

<style>
  .log {
    height: 77vh;
    overflow-y: auto;
  }
  .topic {
    color: var(--accent);
  }

  .dim {
    color: var(--dim);
  }
</style>
