<script>
  import { services, team } from './data.js';
  import { slotsDoDia, ocupadosFicticios, proximosDias } from './agenda.js';
  import Icon from './Icon.svelte';

  const dias = proximosDias(12);
  let servicoId = $state('consulta');
  let vetId = $state('helena');
  let dia = $state(dias[0]);
  let hora = $state('');
  let nome = $state('');
  let pet = $state('');
  let especie = $state('Cão');
  let confirmado = $state(false);

  const servico = $derived(services.find((s) => s.id === servicoId));
  const vet = $derived(team.find((t) => t.id === vetId));
  const livres = $derived(slotsDoDia(dia, vet, servico.min, ocupadosFicticios(dia, vetId)));
  const dow = (d) => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  const dm = (d) => d.slice(8) + '/' + d.slice(5, 7);
  const longo = (d) => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const valido = $derived(hora && nome.trim().length > 1 && pet.trim().length > 0);

  $effect(() => { if (hora && !livres.includes(hora)) hora = ''; });
  function enviar(e) { e.preventDefault(); if (valido) confirmado = true; }
  function reiniciar() { confirmado = false; hora = ''; nome = ''; pet = ''; }
</script>

<section class="sec">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Agendamento online</p>
      <h2>Escolha o horário. A gente cuida do resto.</h2>
      <p class="sub">Demonstração: a agenda abaixo é fictícia e nada é enviado a lugar nenhum.</p>
    </div>

    {#if confirmado}
      <div class="ok" role="status">
        <span class="okic"><Icon nome="ok" size={30} /></span>
        <h3>Pedido registrado, {nome.trim().split(' ')[0]}.</h3>
        <p>{pet} ({especie.toLowerCase()}) — {servico.nome} com {vet.nome}<br />{longo(dia)}, às {hora}.</p>
        <p class="mut">Na versão real, você receberia a confirmação por WhatsApp e um lembrete 24 h antes.</p>
        <button class="btn btn-ghost" onclick={reiniciar}>Novo agendamento</button>
      </div>
    {:else}
      <form class="grid" onsubmit={enviar}>
        <fieldset class="col">
          <legend><span class="n">1</span> O que o seu bichinho precisa?</legend>
          <div class="chips">
            {#each services as s (s.id)}
              <label class="chip" class:on={servicoId === s.id}>
                <input type="radio" name="servico" value={s.id} bind:group={servicoId} />
                {s.nome} <small>{s.min} min</small>
              </label>
            {/each}
          </div>
          <p class="l2"><span class="n">2</span> Com quem?</p>
          <div class="chips">
            {#each team as t (t.id)}
              <label class="chip" class:on={vetId === t.id}>
                <input type="radio" name="vet" value={t.id} bind:group={vetId} />
                {t.nome}
              </label>
            {/each}
          </div>
        </fieldset>

        <fieldset class="col">
          <legend><span class="n">3</span> Dia e horário</legend>
          <div class="days" role="radiogroup" aria-label="Dia">
            {#each dias as d (d)}
              <label class="day" class:on={dia === d}>
                <input type="radio" name="dia" value={d} bind:group={dia} />
                <span>{dow(d)}</span><b>{dm(d)}</b>
              </label>
            {/each}
          </div>
          {#if livres.length}
            <div class="slots" role="radiogroup" aria-label="Horário">
              {#each livres as h (h)}
                <label class="slot" class:on={hora === h}>
                  <input type="radio" name="hora" value={h} bind:group={hora} />{h}
                </label>
              {/each}
            </div>
          {:else}
            <p class="empty">{vet.nome.split(' ')[1]} não tem horário neste dia. Escolha outra data ou outro profissional.</p>
          {/if}
        </fieldset>

        <fieldset class="col full">
          <legend><span class="n">4</span> Quem vamos receber?</legend>
          <div class="fields">
            <label>Seu nome<input bind:value={nome} autocomplete="name" required placeholder="Maria Souza" /></label>
            <label>Nome do pet<input bind:value={pet} required placeholder="Pipoca" /></label>
            <label>Espécie
              <select bind:value={especie}><option>Cão</option><option>Gato</option><option>Outro</option></select>
            </label>
            <button class="btn btn-primary" type="submit" disabled={!valido}>Pedir este horário</button>
          </div>
          {#if hora}<p class="resume">{servico.nome} · {vet.nome} · {longo(dia)} às {hora} · {servico.preco}</p>{/if}
        </fieldset>
      </form>
    {/if}
  </div>
</section>

<style>
  .sec { padding: 96px 0; background: var(--paper); border-block: 1px solid var(--line); }
  .head { max-width: 640px; margin-bottom: 40px; }
  .head h2 { font-size: clamp(2rem, 4.5vw, 3rem); margin: 14px 0 12px; }
  .sub { color: var(--muted); }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .col { border: 1px solid var(--line); background: var(--cream); border-radius: var(--r); padding: 26px; margin: 0; min-width: 0; }
  .full { grid-column: 1 / -1; }
  legend, .l2 { font: 600 1rem var(--sans); display: flex; align-items: center; gap: 10px; padding: 0; margin: 0 0 16px; }
  legend { float: left; width: 100%; }
  legend + * { clear: both; }
  .l2 { margin-top: 26px; }
  .n { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: var(--green); color: #fff; font-size: .8rem; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  input[type='radio'] { position: absolute; opacity: 0; pointer-events: none; }
  .chip, .slot, .day { position: relative; cursor: pointer; border: 1.5px solid var(--line); background: var(--paper); border-radius: 999px; transition: .15s; }
  .chip { padding: 10px 16px; font-weight: 500; font-size: .94rem; min-height: 44px; display: inline-flex; align-items: center; gap: 8px; }
  .chip small { color: var(--muted); font-size: .76rem; }
  .on { border-color: var(--green); background: var(--green); color: #fff; }
  .on small { color: #cfe3dc; }
  .chip:focus-within, .slot:focus-within, .day:focus-within { outline: 3px solid var(--clay); outline-offset: 2px; }
  .days { display: flex; gap: 8px; overflow-x: auto; padding: 3px 3px 10px; margin-bottom: 14px; scrollbar-width: thin; }
  .day { flex: 0 0 62px; border-radius: 14px; display: flex; flex-direction: column; align-items: center; padding: 8px 0; text-transform: capitalize; font-size: .78rem; }
  .day b { font-size: 1rem; }
  .slots { display: grid; grid-template-columns: repeat(auto-fill, minmax(76px, 1fr)); gap: 8px; max-height: 190px; overflow-y: auto; padding: 3px; }
  .slot { text-align: center; padding: 10px 0; font-weight: 600; font-variant-numeric: tabular-nums; min-height: 44px; }
  .empty { color: #5a2a18; background: var(--clay-soft); padding: 14px 16px; border-radius: 12px; }
  .fields { display: grid; grid-template-columns: 1.3fr 1fr .7fr auto; gap: 14px; align-items: end; }
  label { font-size: .85rem; font-weight: 600; display: grid; gap: 6px; }
  .chip, .slot, .day { display: flex; }
  .fields input, select { min-height: 48px; border: 1.5px solid var(--line); border-radius: 12px; padding: 0 14px; font: inherit; background: var(--paper); color: var(--ink); width: 100%; }
  .resume { margin-top: 16px; color: var(--green); font-weight: 600; font-size: .92rem; }
  .ok { max-width: 560px; margin: 0 auto; text-align: center; background: var(--cream); border: 1px solid var(--line); border-radius: 24px; padding: 44px 28px; box-shadow: var(--shadow); display: grid; gap: 14px; justify-items: center; }
  .ok h3 { font-size: 1.8rem; }
  .okic { width: 60px; height: 60px; display: grid; place-items: center; border-radius: 50%; background: var(--green); color: #fff; }
  .mut { color: var(--muted); font-size: .9rem; }
  @media (max-width: 860px) {
    .sec { padding: 64px 0; }
    .grid { grid-template-columns: 1fr; }
    .col { padding: 20px; }
    .fields { grid-template-columns: 1fr; }
  }
</style>
