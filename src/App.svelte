<script>
  import MessageLog from "./lib/components/MessageLog.svelte";
  import SendForm from "./lib/components/SendForm.svelte";
  import PlanView from "./lib/components/PlanView.svelte";
  import Header from "./lib/components/Header.svelte";

   let view = $state('plan') // which tab is open
</script>

<div class="page">
  <Header bind:view />

  <main>
    {#if view === 'plan'}
      <PlanView />
    {:else}
      <MessageLog />
      <SendForm />
    {/if}
  </main>
</div>

<style>
  .page,
  main {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .page {
    padding: 12px;
  }
</style>