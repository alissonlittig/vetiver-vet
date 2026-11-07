import { describe, it, expect } from 'vitest';
import { slotsDoDia, proximosDias, ocupadosFicticios } from '../src/lib/agenda.js';
import { team } from '../src/lib/data.js';

const helena = team[0]; // seg-sex
describe('agenda', () => {
  it('sem atendimento fora dos dias do profissional', () => {
    expect(slotsDoDia('2026-11-08', helena, 30)).toEqual([]); // domingo
    expect(slotsDoDia('2026-11-14', helena, 30)).toEqual([]); // sábado
  });
  it('respeita almoço e fechamento', () => {
    const s = slotsDoDia('2026-11-09', helena, 60);
    expect(s).toContain('08:00');
    expect(s).not.toContain('11:30');
    expect(s).not.toContain('12:30');
    expect(s).toContain('13:30');
    expect(s.at(-1)).toBe('17:00');
  });
  it('remove horários ocupados', () => {
    expect(slotsDoDia('2026-11-09', helena, 30, ['08:00'])).not.toContain('08:00');
  });
  it('próximos dias pulam domingo e são determinísticos', () => {
    const d = proximosDias(14, new Date(2026, 10, 7));
    expect(d.length).toBe(14);
    expect(d.every((x) => new Date(x + 'T12:00:00').getDay() !== 0)).toBe(true);
    expect(ocupadosFicticios(d[0], 'helena')).toEqual(ocupadosFicticios(d[0], 'helena'));
  });
});
