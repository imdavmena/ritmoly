<script lang="ts">
  import Card from "$lib/components/atoms/Card.svelte";
  import Button from "$lib/components/atoms/Button.svelte";
  import Input from "$lib/components/atoms/Input.svelte";
  import { toast } from "$lib/stores/toast";

  let plans:any[] = [];
  let loading=false;

  let selectedPlan = "";
  let payment_id = "";
  let tx_hash = "";

  const wallet = import.meta.env.VITE_USDT_BEP20_WALLET || ""; // optional if you expose it

  async function loadPlans() {
    const res = await fetch("/api/plans");
    const data = await res.json();
    plans = data.plans ?? [];
    if (plans[0]) selectedPlan = plans[0].slug;
  }
  loadPlans();

  async function checkout(method:"binance_pay"|"wallet_transfer") {
    loading=true;
    const res = await fetch("/api/billing/checkout",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ plan_slug: selectedPlan, method })
    });
    const data = await res.json();
    loading=false;

    if (!data.ok) return toast(data.message ?? "Checkout failed","err");
    payment_id = data.payment._id;
    toast("Checkout created. Follow instructions.","ok");

    if (data.binancePayPayload?.checkout_url) {
      window.open(data.binancePayPayload.checkout_url, "_blank");
    }
  }

  async function verifyWallet() {
    if (!payment_id || !tx_hash) return toast("Payment id and tx hash required","err");
    const res = await fetch("/api/billing/verify-wallet",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ payment_id, tx_hash })
    });
    const data = await res.json();
    if (!data.ok) return toast(data.message ?? "Verify failed","err");
    toast("Submitted. Await admin approval (MVP).","ok");
  }
</script>

<div class="space-y-4">
  <h1 class="text-3xl font-black">Billing</h1>

  <Card>
    <div class="text-sm text-[#a99bbb]">Choose a plan</div>
    <select class="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm" bind:value={selectedPlan}>
      {#each plans as p (p.slug)}
        <option value={p.slug}>{p.name} — {p.price} {p.currency} / {p.interval}</option>
      {/each}
    </select>

    <div class="mt-4 flex flex-wrap gap-3">
      <Button variant="primary" loading={loading} on:click={() => checkout("binance_pay")}>Pay with Binance Pay</Button>
      <Button variant="secondary" loading={loading} on:click={() => checkout("wallet_transfer")}>Pay via USDT BEP20</Button>
    </div>
  </Card>

  <Card>
    <div class="font-bold">USDT BEP20 Wallet Transfer</div>
    <div class="mt-2 text-sm text-zinc-300">
      Send USDT (BEP20) to: <span class="font-mono">{import.meta.env.VITE_PUBLIC_USDT_WALLET ?? "0x... (set USDT_BEP20_WALLET server-side)"}</span>
    </div>
    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <Input label="Payment ID" bind:value={payment_id} />
      <Input label="TX Hash" bind:value={tx_hash} />
    </div>
    <div class="mt-4">
      <Button variant="secondary" on:click={verifyWallet}>Submit tx_hash</Button>
    </div>
    <div class="mt-2 text-xs text-zinc-500">
      MVP: admin approves manually in /admin/payments. Later: on-chain verification.
    </div>
  </Card>
</div>
