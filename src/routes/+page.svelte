<script>
  import { services, team } from '../lib/data.js';
  import Icon from '../lib/Icon.svelte';
  import { onMount } from 'svelte';
  let Ag = $state(null);
  let slot;
  // Carrega o agendador só perto da viewport: tira a hidratação pesada do caminho crítico.
  onMount(() => {
    const io = new IntersectionObserver((e) => {
      if (e.some((x) => x.isIntersecting)) { io.disconnect(); import('../lib/Agendar.svelte').then((m) => (Ag = m.default)); }
    }, { rootMargin: '600px' });
    io.observe(slot);
    return () => io.disconnect();
  });
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const iniciais = (n) => n.split(' ').slice(1).map((p) => p[0]).join('');
</script>

<svelte:head>
  <title>Vetiver Clínica Veterinária — cuidado de verdade para cães e gatos</title>
  <meta name="description" content="Clínica veterinária fictícia de portfólio: consultas, vacinas, exames, cirurgia e agendamento online." />
</svelte:head>

<a class="skip" href="#conteudo">Pular para o conteúdo</a>

<header class="top">
  <div class="wrap bar">
    <a class="logo" href="#topo" aria-label="Vetiver, início">
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#1f4a3f" /><path d="M32 50c-9-6-14-11-14-17a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 6-5 11-14 17z" fill="#f6f1e7" /></svg>
      <span>Vetiver</span>
    </a>
    <nav aria-label="Principal">
      <a href="#servicos">Serviços</a>
      <a href="#equipe">Equipe</a>
      <a href="#visita">Visita</a>
    </nav>
    <a class="btn btn-primary sm" href="#agendar">Agendar</a>
  </div>
</header>

<main id="conteudo">
  <section class="hero" id="topo">
    <div class="wrap hgrid">
      <div class="htxt">
        <p class="eyebrow">Clínica veterinária · Curitiba</p>
        <h1>Cuidado de verdade, <em>sem pressa</em> e sem susto.</h1>
        <p class="lead">Consultas longas, exames no mesmo dia e uma equipe que explica cada passo. Para cães, gatos e para quem ama os dois.</p>
        <div class="cta">
          <a class="btn btn-primary" href="#agendar">Agendar consulta</a>
          <a class="btn btn-ghost" href="#servicos">Ver serviços</a>
        </div>
        <ul class="facts">
          <li><b>40 min</b><span>por consulta</span></li>
          <li><b>Mesmo dia</b><span>laudos de exame</span></li>
          <li><b>Seg–Sáb</b><span>8h às 18h</span></li>
        </ul>
      </div>
      <div class="art" aria-hidden="true">
        <svg viewBox="0 0 480 520" width="100%">
          <defs><clipPath id="c"><rect width="480" height="520" rx="36" /></clipPath></defs>
          <g clip-path="url(#c)">
            <rect width="480" height="520" fill="#1f4a3f" />
            <circle cx="380" cy="120" r="170" fill="#2f6a5a" />
            <circle cx="90" cy="470" r="150" fill="#b4502f" opacity=".92" />
            <circle cx="400" cy="440" r="70" fill="#f3dccf" />
            <g fill="#f6f1e7">
              <ellipse cx="240" cy="300" rx="82" ry="70" />
              <ellipse cx="148" cy="226" rx="30" ry="40" transform="rotate(-18 148 226)" />
              <ellipse cx="206" cy="170" rx="31" ry="43" transform="rotate(-6 206 170)" />
              <ellipse cx="278" cy="170" rx="31" ry="43" transform="rotate(6 278 170)" />
              <ellipse cx="336" cy="226" rx="30" ry="40" transform="rotate(18 336 226)" />
            </g>
          </g>
        </svg>
        <div class="badge"><Icon nome="rel" size={20} /> Próximo horário livre: amanhã, 08:30</div>
      </div>
    </div>
  </section>

  <section id="servicos" class="sec">
    <div class="wrap">
      <div class="head">
        <p class="eyebrow">Serviços</p>
        <h2>Tudo que seu bicho precisa, num lugar só.</h2>
      </div>
      <ul class="cards">
        {#each services as s (s.id)}
          <li class="card">
            <span class="ic"><Icon nome={s.icone} /></span>
            <h3>{s.nome}</h3>
            <p>{s.desc}</p>
            <div class="meta"><span>{s.min} min</span><b>{s.preco}</b></div>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="equipe" class="sec alt">
    <div class="wrap">
      <div class="head">
        <p class="eyebrow">Equipe</p>
        <h2>Gente que conhece o seu bicho pelo nome.</h2>
      </div>
      <ul class="team">
        {#each team as t (t.id)}
          <li class="person">
            <span class="avatar" aria-hidden="true">{iniciais(t.nome)}</span>
            <h3>{t.nome}</h3>
            <p class="role">{t.papel}</p>
            <p>{t.bio}</p>
            <p class="days">Atende: {t.dias.map((d) => dias[d].slice(0, 3)).join(' · ')}</p>
            <p class="crmv">{t.crmv}</p>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <div bind:this={slot} id="agendar" class="agslot">
    {#if Ag}<Ag />{:else}<p class="agload">Carregando agenda…</p>{/if}
  </div>

  <section id="visita" class="sec">
    <div class="wrap vgrid">
      <div>
        <p class="eyebrow">Visita</p>
        <h2>Venha conhecer. O cafezinho é do tutor.</h2>
        <ul class="info">
          <li><Icon nome="pin" /><span>Rua das Palmeiras, 000 — Água Verde, Curitiba/PR<br /><small>Endereço fictício</small></span></li>
          <li><Icon nome="rel" /><span>Seg a sex, 8h às 18h · Sáb, 8h às 13h<br /><small>Fechamos para o almoço das 12h às 13h30</small></span></li>
          <li><Icon nome="tel" /><span>(41) 0000-0000<br /><small>Número fictício</small></span></li>
        </ul>
      </div>
      <aside class="urg">
        <h3>Urgência fora do horário?</h3>
        <p>Na versão real, aqui entra o contato do plantão 24 h parceiro. Em caso de intoxicação, trauma ou dificuldade para respirar, vá direto ao plantão mais próximo.</p>
      </aside>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap">
    <p>Vetiver é uma marca fictícia criada para fins de portfólio. Nomes, preços, endereços e registros profissionais são inventados.</p>
    <p>© 2026 Demonstração</p>
  </div>
</footer>

<style>
  .skip { position: absolute; left: -999px; background: var(--green); color: #fff; padding: 10px 16px; z-index: 99; }
  .skip:focus { left: 12px; top: 12px; }
  .top { position: sticky; top: 0; z-index: 20; background: var(--cream); border-bottom: 1px solid var(--line); }
  .bar { display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 16px; }
  .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; font: 600 1.35rem var(--serif); letter-spacing: -.02em; }
  nav { display: flex; gap: 28px; margin-left: auto; }
  nav a { text-decoration: none; font-weight: 500; font-size: .95rem; color: var(--muted); padding: 10px 2px; }
  nav a:hover { color: var(--green); }
  .sm { min-height: 42px; padding: 0 1.1rem; font-size: .92rem; }
  .hero { padding: 64px 0 88px; }
  .hgrid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 56px; align-items: center; }
  h1 { font-size: clamp(2.6rem, 6vw, 4.6rem); margin: 18px 0 20px; }
  h1 em { font-style: italic; color: var(--clay); font-weight: 480; }
  .lead { font-size: 1.15rem; color: var(--muted); max-width: 33rem; }
  .cta { display: flex; flex-wrap: wrap; gap: 12px; margin: 30px 0 40px; }
  .facts { list-style: none; display: flex; gap: 36px; padding: 24px 0 0; margin: 0; border-top: 1px solid var(--line); }
  .facts li { display: grid; }
  .facts b { font: 600 1.35rem var(--serif); }
  .facts span { font-size: .85rem; color: var(--muted); }
  .art { position: relative; }
  .art svg { display: block; border-radius: 36px; box-shadow: var(--shadow); aspect-ratio: 480 / 520; }
  .badge { position: absolute; left: -18px; bottom: 36px; display: flex; gap: 8px; align-items: center; background: var(--paper); border: 1px solid var(--line); padding: 12px 16px; border-radius: 14px; font-weight: 600; font-size: .88rem; box-shadow: var(--shadow); color: var(--green); }
  .sec { padding: 96px 0; }
  .alt { background: var(--sand); }
  .head { max-width: 640px; margin-bottom: 44px; }
  .head h2, .vgrid h2 { font-size: clamp(2rem, 4.5vw, 3rem); margin-top: 14px; }
  .cards, .team { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .card { background: var(--paper); border: 1px solid var(--line); border-radius: var(--r); padding: 28px; display: flex; flex-direction: column; gap: 10px; transition: transform .2s, box-shadow .2s; }
  .card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
  .ic { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 14px; background: var(--clay-soft); color: var(--clay); margin-bottom: 6px; }
  .card h3, .person h3 { font-size: 1.35rem; }
  .card p { color: var(--muted); flex: 1; }
  .meta { display: flex; justify-content: space-between; align-items: baseline; padding-top: 14px; border-top: 1px dashed var(--line); font-size: .9rem; }
  .meta span { color: var(--muted); }
  .meta b { color: var(--green); }
  .person { background: var(--paper); border-radius: var(--r); padding: 30px; display: grid; gap: 8px; align-content: start; }
  .avatar { width: 72px; height: 72px; border-radius: 50%; background: var(--green); color: var(--cream); display: grid; place-items: center; font: 560 1.6rem var(--serif); margin-bottom: 10px; box-shadow: 0 0 0 6px var(--cream), 0 0 0 7px var(--line); }
  .role { color: var(--clay); font-weight: 600; font-size: .92rem; }
  .person p:not(.role):not(.days):not(.crmv) { color: var(--muted); }
  .days { font-size: .85rem; font-weight: 600; color: var(--green); margin-top: 6px; }
  .crmv { font-size: .76rem; color: #6b756f; }
  .vgrid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 56px; align-items: start; }
  .info { list-style: none; padding: 0; margin: 32px 0 0; display: grid; gap: 22px; }
  .info li { display: flex; gap: 16px; align-items: flex-start; }
  .info :global(svg) { flex: none; color: var(--green); margin-top: 2px; }
  .info small { color: var(--muted); }
  .urg { background: var(--green); color: var(--cream); padding: 34px; border-radius: 24px; display: grid; gap: 12px; }
  .urg p { color: #d6e5df; }
  .agslot { min-height: 760px; background: var(--paper); border-block: 1px solid var(--line); }
  .agload { padding: 96px 20px; text-align: center; color: var(--muted); }
  .foot { background: var(--ink); color: #c7d0cb; padding: 36px 0; font-size: .88rem; }
  .foot .wrap { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
  @media (max-width: 900px) {
    nav { display: none; }
    .bar { justify-content: space-between; }
    .hero { padding: 36px 0 56px; }
    .hgrid, .vgrid { grid-template-columns: 1fr; gap: 36px; }
    .cards, .team { grid-template-columns: 1fr; }
    .sec { padding: 64px 0; }
    .badge { left: 12px; bottom: 16px; }
    .facts { gap: 20px; }
  }
</style>
