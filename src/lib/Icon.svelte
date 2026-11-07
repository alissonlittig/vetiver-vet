<script>
  let { nome, size = 26 } = $props();
  const p = {
    steto: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1M20 11a2 2 0 1 0 0 4a2 2 0 0 0 0-4',
    seringa: 'm18 2 4 4M15 5l4 4M3 21l3-1 11-11-4-4L2 16zM9 11l2 2M6 14l2 2',
    lupa: 'M11 4a7 7 0 1 0 0 14a7 7 0 0 0 0-14zM21 21l-5-5M8 11h6M11 8v6',
    bisturi: 'M3 21l9-9M12 12l7-7a2.8 2.8 0 0 1 2 5l-7 7zM9 15l-4 4',
    dente: 'M7 3c-3 0-4 3-4 5 0 4 2 5 2 9 0 2 1 4 2 4s1.5-3 2-5c.5-2 1-2 1-2s.5 0 1 2c.5 2 1 5 2 5s2-2 2-4c0-4 2-5 2-9 0-2-1-5-4-5-2 0-2.5 1-3 1S9 3 7 3z',
    gota: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
    rel: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z',
    pin: 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zM12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5z',
    tel: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    ok: 'M5 12.5l4.5 4.5L19 7.5'
  };
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={p[nome]} /></svg>
