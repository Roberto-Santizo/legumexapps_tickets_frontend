// Valores para la plantilla — pulso (métricas del área).
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.

export const valoresPulso = {
  valoresPulso(v, ctx) {
    const { s } = ctx;
    if (v.showPulso) {
      const p = this.pulse();
      const maxLoad = this.maxLoad();
      v.pFirstResp = p.firstResp != null ? this.dur(p.firstResp) : '—';
      v.pFirstRespNote = p.frCount + (p.frCount === 1 ? ' ticket con respuesta del área' : ' tickets con respuesta del área');
      v.pResolution = p.resolution != null ? this.dur(p.resolution) : '—';
      v.pResolutionNote = p.rsCount + (p.rsCount === 1 ? ' ticket cerrado medido' : ' tickets cerrados medidos');
      v.pLate = String(p.late.length);
      // Gráficos: series reales derivadas de los tickets (sin librería; SVG + grid)
      const dias = 14, W = 640, H = 200, top = 16, bot = 12;
      const ins = new Array(dias).fill(0), outs = new Array(dias).fill(0);
      p.list.forEach(t => {
        const d = Math.floor(t.h / 24); if (d < dias) ins[dias - 1 - d]++;
        (t.historial || []).forEach(x => { if (x.kind === 'close') { const dc = Math.floor(x.h / 24); if (dc < dias) outs[dias - 1 - dc]++; } });
      });
      const yMax = Math.max(2, Math.max.apply(null, ins.concat(outs)));
      const X = i => (i + 0.5) * (W / dias), Y = v => H - bot - (v / yMax) * (H - top - bot);
      const line = arr => arr.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' ');
      v.pInPath = line(ins); v.pOutPath = line(outs);
      v.pOutArea = line(outs) + ' L' + X(dias - 1).toFixed(1) + ' ' + (H - bot) + ' L' + X(0).toFixed(1) + ' ' + (H - bot) + ' Z';
      v.pGrid = [0, 0.5, 1].map(r => ({ y: (H - bot - r * (H - top - bot)).toFixed(1) }));
      v.pDays = ins.map((n, i) => {
        const ago = dias - 1 - i;
        return { yIn: (Y(n) / H * 100).toFixed(1) + '%', yOut: (Y(outs[i]) / H * 100).toFixed(1) + '%',
          tip: (ago === 0 ? 'Hoy' : ago === 1 ? 'Ayer' : 'Hace ' + ago + ' días') + ' · ' + n + ' entraron · ' + outs[i] + ' cerraron' };
      });
      const tin = ins.reduce((a, b) => a + b, 0), tout = outs.reduce((a, b) => a + b, 0), net = tout - tin;
      v.pInTotal = String(tin); v.pOutTotal = String(tout);
      v.pNet = (net > 0 ? '−' : net < 0 ? '+' : '±') + Math.abs(net) + ' en cola';
      v.pNetInk = net >= 0 ? 'var(--verde)' : 'var(--naranja)';
      const grp = { late: 0, watch: 0, ok: 0, waiting: 0 };
      p.act.forEach(t => { const sl = this.sla(t); grp[sl.waiting ? 'waiting' : sl.late ? 'late' : sl.watch ? 'watch' : 'ok']++; });
      const tot = p.act.length || 1;
      let acc = 0;
      v.pDonut = [['late', 'Pasaron su margen', 'var(--naranja)'], ['watch', 'Cerca del margen', 'var(--ambar-oscuro)'], ['ok', 'Dentro del margen', 'var(--verde)'], ['waiting', 'Esperan al solicitante', 'var(--azul)']].map(g => {
        const len = grp[g[0]] / tot * 100, seg = { label: g[1], color: g[2], n: String(grp[g[0]]), pct: Math.round(len) + '%',
          dash: Math.max(0, len - (len > 0 ? 0.8 : 0)).toFixed(2) + ' ' + (100 - Math.max(0, len - (len > 0 ? 0.8 : 0))).toFixed(2),
          off: (25 - acc).toFixed(2), title: g[1] + ': ' + grp[g[0]] };
        acc += len; return seg;
      });
      v.pActTotal = String(p.act.length);
      v.pLateNote = p.late.length === 0 ? 'Todo dentro del margen' : 'Pasaron su margen de atención';
      // A1 · lo que espera al solicitante no es deuda del área, pero sí hay que mirarlo
      const esperando = this.visible().filter(t => this.waitingOnRequester(t));
      const semana = esperando.filter(t => this.idle(t) >= 168);
      v.pWaitNote = esperando.length === 0
        ? 'Nadie está esperando respuesta del solicitante'
        : esperando.length + (esperando.length === 1 ? ' espera respuesta del solicitante' : ' esperan respuesta del solicitante');
      v.pWaitWeek = semana.length > 0;
      v.pWaitWeekNote = semana.length + (semana.length === 1 ? ' hace más de una semana' : ' hace más de una semana');
      v.pLateBg = 'var(--n-0)';
      v.pLateBorder = p.late.length > 0 ? '1px solid var(--naranja)' : '1px solid var(--n-200)';
      v.pUnassigned = String(p.sinAsignar);
      v.pUnassignedNote = p.sinAsignar === 0 ? 'Nadie esperando triage' : 'Activos sin dueño';
      v.pLoad = s.users.map(u => {
        const ld = this.loadOf(u.id), n = ld.n, lateN = ld.late;
        return {
          nombre: u.nombre, ini: this.ini(u.nombre), ring: this.ring(u.id), count: String(n),
          width: Math.round((n / maxLoad) * 100) + '%', bar: lateN > 0 ? 'var(--naranja)' : 'var(--n-900)',
          note: lateN > 0 ? lateN + ' atrasado' + (lateN === 1 ? '' : 's') : n === 0 ? 'Libre' : 'Al día',
          noteInk: lateN > 0 ? 'var(--n-900)' : 'var(--n-500)'
        };
      }).sort((a, b) => Number(b.count) - Number(a.count));
      const maxCat = Math.max(1, ...s.cats.map(c => p.list.filter(t => t.cat === c.id).length));
      v.pCats = s.cats.map(c => {
        const total = p.list.filter(t => t.cat === c.id).length;
        const abiertos = p.act.filter(t => t.cat === c.id).length;
        return {
          nombre: c.nombre, count: String(total), abiertos: String(abiertos),
          width: Math.round((total / maxCat) * 100) + '%',
          bar: c.activo ? 'var(--n-900)' : 'var(--n-400)',
          note: abiertos > 0 ? abiertos + ' sin cerrar' : 'Sin pendientes'
        };
      }).sort((a, b) => Number(b.count) - Number(a.count));
      v.pLateRows = p.late.slice(0, 4).map(t => this.rowFor(t));
      v.pHasLate = p.late.length > 0;
      v.pNote = (p.late.length === 0 && p.rsCount === 0 && this.visible().length === 0)
        ? 'Sin datos todavía — los números aparecen cuando se cierre el primer ticket.'
        : 'Todo en esta pantalla se calcula en el navegador con los tickets, usuarios y categorías ya cargados — la API no expone métricas.';
    }
  }
};
