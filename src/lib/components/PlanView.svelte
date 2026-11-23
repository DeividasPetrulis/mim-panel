<script>
  import { publish, mqttState } from "../mqtt.svelte.js";
  import { rocrailState } from "../rocrail.svelte.js";
  import { CELL } from "../geometry.js";
  import { requestPlan } from "../rocrail.js";

  let area = $derived.by(() => {
    const pieces = [
      rocrailState.tracks,
      rocrailState.switches,
      rocrailState.sensors,
      rocrailState.blocks,
    ].flatMap(Object.values);
    if (pieces.length === 0) return { x: 0, y: 0, w: CELL, h: CELL };

    const xs = pieces.map((it) => Number(it.x));
    const ys = pieces.map((it) => Number(it.y));
    const minX = Math.min(...xs),
      maxX = Math.max(...xs) + 1;
    const minY = Math.min(...ys),
      maxY = Math.max(...ys) + 1;

    const m = CELL / 2; // margin of half a cell
    return {
      x: minX * CELL - m,
      y: minY * CELL - m,
      w: (maxX - minX) * CELL + 2 * m,
      h: (maxY - minY) * CELL + 2 * m,
    };
  });

  //publish("rocrail/service/client", requestPlan());
</script>

<main class="box plan">
  {#if !rocrailState.online}
    <p>Rocrail is offline</p>
  {:else}
    <svg viewBox="{area.x} {area.y} {area.w} {area.h}">
      <!-- plain track -->
      {#each Object.values(rocrailState.tracks) as tk (tk.id)}
        <circle
          class="track"
          cx={Number(tk.x) * CELL + CELL / 2}
          cy={Number(tk.y) * CELL + CELL / 2}
          r="3"
        />
      {/each}

      <!-- switches -->
      {#each Object.values(rocrailState.switches) as sw (sw.id)}
        <circle
          class="switch"
          cx={Number(sw.x) * CELL + CELL / 2}
          cy={Number(sw.y) * CELL + CELL / 2}
          r="3.1"
        />
      {/each}

      <!-- sensors -->
      {#each Object.values(rocrailState.sensors) as fb (fb.id)}
        <circle
          class="sensor"
          cx={Number(fb.x) * CELL + CELL / 2}
          cy={Number(fb.y) * CELL + CELL / 2}
          r="4"
        />
      {/each}

      <!-- blocks -->
      {#each Object.values(rocrailState.blocks) as bk (bk.id)}
        <rect
          class="block"
          x={Number(bk.x) * CELL + CELL / 2 - 4}
          y={Number(bk.y) * CELL + CELL / 2 - 4}
          width="8"
          height="8"
        />
      {/each}
    </svg>
  {/if}
</main>

<style>
  svg {
    width: 100%;
    background: var(--bg);
    max-height: 85vh;
    overflow: auto;
  }

  .track {
    fill: var(--dim);
  }

  .switch {
    fill: var(--fg);
  }
  .sensor {
    fill: var(--accent);
  }
  .block {
    fill: orange;
  }
</style>
