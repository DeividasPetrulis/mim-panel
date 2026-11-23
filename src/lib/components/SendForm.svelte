<script>
  import { publish } from "../mqtt.svelte.js";

  let topic = $state("rocrail/service/client");
  let text = $state("");

  function send(event) {
    event.preventDefault(); // prevents the page from reloading
    publish(topic, text)
    text = ""
  }
</script>

<form class="box send" onsubmit={send}>
  <input bind:value={topic} />
  <input bind:value={text} placeholder="message" />
  <button>SEND</button>
</form>

<style>
  .send {
    display: flex;
    gap: 8px;
  }
  .send input {
    flex: 1;
  }
</style>
