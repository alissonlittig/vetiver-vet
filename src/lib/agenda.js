import { horarios } from './data.js';

const pad = (n) => String(n).padStart(2, '0');

/** Horários livres (HH:MM) de um dia para um profissional; `ocupados` simula agenda já tomada. */
export function slotsDoDia(data, vet, duracaoMin, ocupados = []) {
  const d = new Date(data + 'T12:00:00');
  const dow = d.getDay();
  if (Number.isNaN(dow) || !vet.dias.includes(dow)) return [];
  const fecha = (dow === 6 ? horarios.sabadoFecha : horarios.fecha) * 60;
  const out = [];
  for (let m = horarios.abre * 60; m + duracaoMin <= fecha; m += 30) {
    const h = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
    // almoço 12:00-13:30 fechado
    if (m < 13.5 * 60 && m + duracaoMin > 12 * 60) continue;
    if (!ocupados.includes(h)) out.push(h);
  }
  return out;
}

/** Ocupação determinística (fictícia) por data+vet, para a demo parecer uma agenda real. */
export function ocupadosFicticios(data, vetId) {
  let seed = 0;
  for (const c of data + vetId) seed = (seed * 31 + c.charCodeAt(0)) % 9973;
  const todos = [];
  for (let m = 8 * 60; m < 18 * 60; m += 30) todos.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  return todos.filter((_, i) => (seed + i * 7) % 4 === 0);
}

export function proximosDias(n, de = new Date()) {
  const out = [];
  const d = new Date(de.getFullYear(), de.getMonth(), de.getDate() + 1);
  while (out.length < n) {
    if (d.getDay() !== 0) out.push(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
    d.setDate(d.getDate() + 1);
  }
  return out;
}
