<script>
  import { mqttState } from "../mqtt.svelte.js";
  import { rocrailState } from "../rocrail.svelte.js";

  // Comes from App.svelte
  let { view = $bindable() } = $props();
</script>

<header class="box">
  <span class="title">TRAIN CONTROL PANEL<span class="cursor">_</span></span>

  <nav>
    <button class:active={view === "plan"} onclick={() => (view = "plan")}
      >[PLAN]</button
    >
    <button class:active={view === "console"} onclick={() => (view = "console")}
      >[CONSOLE]</button
    >
  </nav>

  <div class="status-list">
    <span class="status" class:online={mqttState.connected}>
      {mqttState.connected ? "● BROKER" : "○ BROKER"}
    </span>
    <span class="status" class:online={rocrailState.online}>
      {rocrailState.online ? "● ROCRAIL" : "○ ROCRAIL"}
    </span>
  </div>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .title {
    flex: 1;
  }

  nav {
    display: flex;
    gap: 8px;
  }
  button {
    font: inherit;
    color: var(--fg);
    background: none;
    border: none;
    padding: 0 4px;
    cursor: pointer;
  }
  button.active {
    background: var(--fg);
    color: var(--bg);
  }

  .status-list {
    display: flex;
    flex-direction: column;
    font-size: 15px;
  }
  .status {
    color: var(--dim);
  }
  .status.online {
    color: var(--fg);
  }

  .cursor {
    animation: blink 1s steps(1) infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>
