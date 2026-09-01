/* ================================================================
   Block 4: Steady State — Painted Sky PWA
   One number to beat. DB-first. Barbell when you want it.
   Completion-based weeks: finish all 3 days to advance.
   ================================================================ */

const BLOCK = {
  name: "Block 4: Steady State",
  weeks: 6,
  // Week 4 is a hard deload. Not a prompt. A spa week.
  deloadWeek: 4,
  rpeCap: { 1: 8, 2: 8, 3: 8, 4: 6, 5: 9, 6: 9 },
};

/*
 Exercise fields:
  key        stable id for progression tracking
  name       display name (primary variant)
  type       'weighted' | 'bodyweight'
  repRange   [bottom, top]
  start      Block 4 calibrated starting weight (null = find your weight)
  inc        weight increment when set-1 trigger fires
  rest       rest seconds after a done set
  implement  'smith' | 'db' | 'stack' | 'bw' | 'barbell'  (plate math)
  isCore     mandatory finisher
  amrapTotal true = progression target is total reps across all sets (pull-ups)
  cue        coaching cue
  alts       swap variants: [{name, implement, start, inc, note}] — each variant keeps its own history
*/
const DAYS = [
  {
    id: "d1", label: "Upper Push",
    exercises: [
      { key:"bench", name:"DB Bench Press", type:"weighted", repRange:[8,10], start:55, inc:5, rest:120, implement:"db",
        cue:"Controlled tempo. Feet planted.",
        alts:[
          {name:"Smith Bench Press", implement:"smith", start:105, inc:5, note:"smith bar"},
          {name:"Barbell Bench Press", implement:"barbell", start:115, inc:5, note:"standard bar"},
        ] },
      { key:"ohp", name:"Seated DB Shoulder Press", type:"weighted", repRange:[8,10], start:40, inc:5, rest:120, implement:"db",
        cue:"Grip just outside shoulders. Drive head through at top.",
        alts:[
          {name:"Smith OHP (seated)", implement:"smith", start:75, inc:5, note:"smith bar"},
          {name:"Barbell OHP", implement:"barbell", start:95, inc:5, note:"standard bar"},
        ] },
      { key:"row1", name:"One-Arm DB Row", type:"weighted", repRange:[10,12], start:50, inc:5, rest:90, implement:"db",
        cue:"Squeeze shoulder blades 1 sec at contraction.",
        alts:[{name:"Seated Cable Row (V-bar)", implement:"stack", start:130, inc:5, note:"cable stack"}] },
      { key:"latraise", name:"DB Lateral Raise", type:"weighted", repRange:[12,20], start:15, inc:5, rest:75, implement:"db",
        cue:"Slow eccentric. No momentum. Ride the wide rep range.", alts:[] },
      { key:"tri", name:"DB Overhead Extension", type:"weighted", repRange:[12,20], start:40, inc:5, rest:75, implement:"db",
        cue:"Full lockout. One DB, both hands.",
        alts:[{name:"Cable Rope Tricep Pushdown", implement:"stack", start:35, inc:5, note:"cable stack"}] },
      { key:"crunch", name:"Cable Crunch", type:"weighted", repRange:[12,15], start:60, inc:5, rest:60, implement:"stack", isCore:true,
        cue:"Curl ribs to pelvis. Don't bow at hips.",
        alts:[{name:"Reverse Crunch", implement:"bw", start:null, inc:0, note:"bodyweight"}] },
    ],
  },
  {
    id: "d2", label: "Lower",
    exercises: [
      { key:"squat", name:"Goblet Squat", type:"weighted", repRange:[8,10], start:40, inc:5, rest:120, implement:"db",
        cue:"Depth to parallel. No rush.",
        alts:[
          {name:"Smith Squat", implement:"smith", start:120, inc:5, note:"smith bar"},
          {name:"Barbell Squat", implement:"barbell", start:115, inc:5, note:"standard bar"},
        ] },
      { key:"rdl", name:"DB Romanian Deadlift", type:"weighted", repRange:[10,12], start:55, inc:5, rest:120, implement:"db",
        cue:"Soft knees. Hinge, don't squat. DBs close to legs.", alts:[] },
      { key:"legpress", name:"DB Reverse Lunge", type:"weighted", repRange:[10,12], start:30, inc:5, rest:90, implement:"db",
        cue:"Long step back. Controlled descent. Alternate legs each rep.",
        alts:[{name:"Leg Press", implement:"stack", start:null, inc:10, note:"machine"}] },
      { key:"legcurl", name:"Seated Leg Curl", type:"weighted", repRange:[10,12], start:120, inc:5, rest:75, implement:"stack",
        cue:"Controlled. Pause at full contraction.",
        alts:[{name:"Single-Leg DB RDL", implement:"db", start:30, inc:5, note:"per side"}] },
      { key:"calf", name:"Standing Calf Raise (DBs)", type:"weighted", repRange:[15,20], start:40, inc:5, rest:60, implement:"db",
        cue:"Full range. Pause at stretch and contraction.", alts:[] },
      { key:"knees", name:"Hanging Knee Raise", type:"bodyweight", repRange:[10,15], start:null, inc:0, rest:60, implement:"bw", isCore:true,
        cue:"Posterior pelvic tilt at top. No swinging.",
        alts:[{name:"Lying Leg Raise", implement:"bw", start:null, inc:0, note:"bodyweight"}] },
    ],
  },
  {
    id: "d3", label: "Upper Pull",
    exercises: [
      { key:"pullups", name:"Pull-ups", type:"bodyweight", repRange:[5,10], start:null, inc:0, rest:120, implement:"bw", amrapTotal:true,
        cue:"First lift of the day, on purpose. Fresh arms, clean reps, log every one.",
        alts:[{name:"Lat Pulldown (wide neutral)", implement:"stack", start:100, inc:5, note:"machine fallback"}] },
      { key:"csrow", name:"Chest-Supported DB Row", type:"weighted", repRange:[10,12], start:45, inc:5, rest:90, implement:"db",
        cue:"Squeeze at top. No body English.",
        alts:[{name:"One-Arm DB Row", implement:"db", start:50, inc:5, note:"per side"}] },
      { key:"incline", name:"DB Incline Bench Press", type:"weighted", repRange:[8,10], start:50, inc:5, rest:90, implement:"db",
        cue:"30-45 degree incline. Controlled press.", alts:[] },
      { key:"hammer", name:"DB Hammer Curl", type:"weighted", repRange:[10,15], start:20, inc:5, rest:75, implement:"db",
        cue:"Full ROM. No momentum. Ride the range before adding weight.", alts:[] },
      { key:"pallof", name:"Pallof Press", type:"weighted", repRange:[10,10], start:25, inc:5, rest:60, implement:"stack", isCore:true,
        cue:"Press + hold 2 sec. 10 per side. Anti-rotation.",
        alts:[{name:"Dead Bug", implement:"bw", start:null, inc:0, note:"bodyweight, 10/side"}] },
    ],
  },
];

const RULES = [
  { icon:"01", title:"One number to beat", desc:"Beat one rep from last time. That's the whole job." },
  { icon:"02", title:"Weight moves on set 1", desc:"Top of range on set 1 at cap or under = weight goes up next time." },
  { icon:"03", title:"RPE ceiling", desc:"" },
  { icon:"04", title:"Space your days", desc:"3 sessions, never 3 in a row. The app will nag." },
  { icon:"05", title:"Core is the exit door", desc:"Every prescribed core set, every session." },
  { icon:"06", title:"Week 4 is a spa week", desc:"Mandatory deload. -20%, cap 6. Enjoy it." },
];

const LS_KEY = "workout-b4-data";

/* ---- State ---- */
let D = null;
let active = null;        // active session id
let focusIdx = 0;
let timerInt = null, restInt = null, restEnd = null;
let wakeLock = null;

function load() {
  try { D = JSON.parse(localStorage.getItem(LS_KEY)); } catch (e) {}
  if (!D) D = { sessions:{}, body:[], prefs:{ smithBar:25, sky:"on", variants:{} }, blockStart:null, lastExport:null, imported:[] };
  D.prefs = Object.assign({ smithBar:25, sky:"on", variants:{} }, D.prefs);
  if (!D.imported) D.imported = [];
  if (!D.body) D.body = [];
}
let _saveT = null;
function save() { localStorage.setItem(LS_KEY, JSON.stringify(D)); }
function autosave() { clearTimeout(_saveT); _saveT = setTimeout(save, 400); }
setInterval(() => { if (D) save(); }, 10000);

/* ---- Dates & weeks ---- */
function todayStr() { return new Date().toISOString().split("T")[0]; }
function dayDiff(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }

// COMPLETION-BASED WEEK: all 3 day types must be finished before week advances.
function currentWeek() {
  if (!D.blockStart) return 1;
  let w = 1;
  while (w <= BLOCK.weeks) {
    const allDone = DAYS.every(day =>
      Object.values(D.sessions).some(s => s.dayId === day.id && s.week === w && s.finishedAt)
    );
    if (allDone) w++;
    else break;
  }
  return w;
}
function weekLabel(w) { return w === BLOCK.deloadWeek ? `W${w} · DELOAD` : `W${w}`; }
function rpeCap(w) { return BLOCK.rpeCap[Math.min(Math.max(w,1),6)] || 8; }
function blockDone() { return D.blockStart && currentWeek() > BLOCK.weeks; }

/* ---- Exercise variant handling ---- */
function variantOf(ex) {
  const vi = D.prefs.variants[ex.key] || 0;
  if (vi === 0) return { name: ex.name, implement: ex.implement, start: ex.start, inc: ex.inc, vi: 0 };
  const a = ex.alts[vi - 1];
  return a ? { name: a.name, implement: a.implement, start: a.start, inc: a.inc, note: a.note, vi } : { name: ex.name, implement: ex.implement, start: ex.start, inc: ex.inc, vi: 0 };
}

/* ---- Unified history (baked career + local Block 4 sessions) ---- */
function localAsCareer() {
  const out = [];
  for (const s of Object.values(D.sessions)) {
    const day = DAYS.find(d => d.id === s.dayId);
    if (!day) continue;
    const exs = [];
    day.exercises.forEach((ex, i) => {
      const el = s.exercises[i];
      if (!el) return;
      const vname = el.variantName || ex.name;
      const sets = (el.sets || []).filter(validSet).map(x => ({ w: x.w || null, r: x.r, rpe: x.rpe }));
      if (sets.length) exs.push({ n: vname, s: sets });
    });
    if (exs.length) out.push({ b:"Block 4", d:s.date, l:`${day.label}${s.week ? " · " + weekLabel(s.week) : ""}`, e:exs, fin:!!s.finishedAt, deload:s.week === BLOCK.deloadWeek, _local:s.id });
  }
  return out;
}
function allHistory() {
  return CAREER.concat(D.imported).concat(localAsCareer()).sort((a,b) => (a.d||"").localeCompare(b.d||""));
}
function validSet(s) {
  if (!s.done) return false;
  const r = typeof s.r === "number" ? s.r : parseInt(s.r);
  if (isNaN(r) || r <= 0) return false;
  if (r <= 2 && (s.rpe == null || s.rpe <= 2)) return false; // button-clicking, not lifting
  return true;
}

/* ---- Progression engine ---- */
// Most recent non-deload session containing this variant name.
function lastPerformance(name, opts = {}) {
  const hist = allHistory();
  for (let i = hist.length - 1; i >= 0; i--) {
    const sess = hist[i];
    if (sess.deload && !opts.includeDeload) continue;
    if (opts.excludeLocalId && sess._local === opts.excludeLocalId) continue;
    for (const ex of sess.e) {
      if (ex.n === name && ex.s.length) return { date: sess.d, sets: ex.s, block: sess.b };
    }
  }
  return null;
}

/*
 Target for this session. Returns:
  { mode:'beat'|'newWeight'|'calibrate'|'deload'|'beatTotal', w, reps, why, last }
*/
function getTarget(ex, week, excludeLocalId) {
  const v = variantOf(ex);
  const cap = rpeCap(week);
  // For bodyweight rep work, deload sessions still count as real history (the reps weren't discounted).
  const bw = ex.amrapTotal || v.implement === "bw";
  const last = lastPerformance(v.name, { excludeLocalId, includeDeload: bw });
  const [bot, top] = ex.repRange;

  // Deload week: -20% off last working weight, bottom reps, cap 6.
  if (week === BLOCK.deloadWeek) {
    if (ex.amrapTotal || v.implement === "bw") {
      const t = last ? Math.max(1, Math.round(last.sets.reduce((n,s)=>n+s.r,0) * 0.7)) : bot;
      return { mode:"deload", w:null, reps:t, why:"Deload: about 70% of your usual total reps. Easy day.", last };
    }
    const ref = last ? bestWorkingWeight(last.sets) : v.start;
    const w = ref ? Math.max(5, Math.round(ref * 0.8 / 5) * 5) : null;
    return { mode:"deload", w, reps:bot, why:`Deload week: -20% off ${ref || "?"} lb. Cap RPE 6. This is the plan, not a failure.`, last };
  }

  // Bodyweight AMRAP-total (pull-ups)
  if (ex.amrapTotal) {
    if (!last) return { mode:"beatTotal", w:null, reps:null, total:null, why:"First session: log every clean rep across 3 sets. That total is the number to beat.", last };
    const total = last.sets.reduce((n,s) => n + s.r, 0);
    return { mode:"beatTotal", w:null, total:total + 1, why:`Last time: ${total} total reps (${last.sets.map(s=>s.r).join("/")}). One more anywhere wins.`, last };
  }

  // Plain bodyweight rep work (knee raises etc.)
  if (v.implement === "bw") {
    if (!last) return { mode:"beat", w:null, reps:bot, why:`First session: start at ${bot} clean reps per set.`, last };
    const s1 = last.sets[0];
    if (s1.r >= top) return { mode:"beat", w:null, reps:top, why:`You own the top of the range (${top}). Hold it clean, slow the tempo.`, last };
    return { mode:"beat", w:null, reps:Math.min(s1.r + 1, top), why:`Last set 1: ${s1.r} reps. Beat it by one.`, last };
  }

  // Weighted
  if (!last) {
    if (v.start == null) return { mode:"calibrate", w:null, reps:bot, why:`No history for ${v.name}. Find a weight that's RPE 7 for ${bot}. Log it and the engine takes over.`, last };
    return { mode:"beat", w:v.start, reps:bot, why:`Calibrated start from your Block 1-3 history. Build reps from ${bot} toward ${top}.`, last };
  }
  const s1 = last.sets[0];
  const w1 = s1.w || bestWorkingWeight(last.sets) || v.start;
  const trigger = s1.r >= top && (s1.rpe == null || s1.rpe <= cap);
  if (trigger) {
    return { mode:"newWeight", w:(w1 || 0) + v.inc, reps:bot,
      why:`Set 1 hit ${s1.r} @ RPE ${s1.rpe ?? "?"} last time. Earned +${v.inc}. Back to ${bot}s, climb again.`, last };
  }
  const target = Math.min(s1.r + 1, top);
  return { mode:"beat", w:w1, reps:target, why:`Last set 1: ${s1.r} @ ${w1} lb (RPE ${s1.rpe ?? "?"}). Beat ${s1.r} by one.`, last };
}
function bestWorkingWeight(sets) {
  let w = 0; for (const s of sets) if (s.w && s.w > w) w = s.w; return w || null;
}

/* ---- PRs (career-wide, weight and rep PRs both count) ---- */
function prTable() {
  const t = {}; // name -> {w, r, date, e1: est 1RM}
  for (const sess of allHistory()) {
    if (sess.deload) continue;
    for (const ex of sess.e) for (const s of ex.s) {
      const cur = t[ex.n];
      const e1 = s.w ? s.w * (1 + s.r / 30) : null;
      const better = !cur
        || (e1 && (!cur.e1 || e1 > cur.e1 + 0.01))
        || (!s.w && s.r > (cur.r || 0));
      if (better) t[ex.n] = { w:s.w, r:s.r, date:sess.d, e1 };
    }
  }
  return t;
}
function checkPR(name, w, r) {
  const t = prTable(); const cur = t[name];
  if (!cur) return null;
  if (w) {
    const e1 = w * (1 + r / 30);
    if (e1 > (cur.e1 || 0) + 0.01) return w > (cur.w||0) ? "WEIGHT PR" : "REP PR";
  } else if (r > (cur.r || 0)) return "REP PR";
  return null;
}

/* ---- Sessions ---- */
function findOpenSession(dayId) {
  return Object.values(D.sessions).find(s => s.dayId === dayId && !s.finishedAt && s.date === todayStr())
      || Object.values(D.sessions).find(s => s.dayId === dayId && !s.finishedAt);
}
function createSession(dayIdx) {
  const day = DAYS[dayIdx];
  const week = Math.min(currentWeek(), BLOCK.weeks);
  const id = "s" + Date.now();
  const s = {
    id, dayId: day.id, date: todayStr(), week,
    exercises: day.exercises.map(ex => {
      const v = variantOf(ex);
      const tgt = getTarget(ex, week);
      const n = 3;
      return { variantName: v.name,
        sets: Array.from({ length: n }, () => ({ r:null, w: tgt.w ?? null, rpe:null, done:false })) };
    }),
    startedAt: null, finishedAt: null,
  };
  D.sessions[id] = s;
  save();
  return s;
}
function markStarted(s) {
  if (!s.startedAt) { s.startedAt = new Date().toISOString(); startTimer(s); }
}
function sessionDurMin(s) {
  const ats = [];
  for (const e of s.exercises) for (const st of e.sets || []) if (st.at) ats.push(st.at);
  if (s.startedAt) ats.push(s.startedAt);
  if (ats.length < 2) return null;
  ats.sort();
  return Math.round((new Date(ats[ats.length-1]) - new Date(ats[0])) / 60000);
}
function coreOK(s, day) {
  return day.exercises.every((ex, i) => {
    if (!ex.isCore) return true;
    const el = s.exercises[i];
    const done = (el?.sets || []).filter(validSet).length;
    return done >= 3; // every prescribed core set, not a token single
  });
}
function junkSets(s) {
  let n = 0;
  for (const e of s.exercises) for (const st of e.sets || []) {
    if (st.done && !validSet(st)) n++;
  }
  return n;
}
function consecutiveDays() {
  // finished sessions on the two previous distinct calendar days?
  const dates = new Set(Object.values(D.sessions).filter(x => x.finishedAt).map(x => x.date));
  const t = new Date();
  const d1 = new Date(t); d1.setDate(t.getDate() - 1);
  const d2 = new Date(t); d2.setDate(t.getDate() - 2);
  const f = d => d.toISOString().split("T")[0];
  return dates.has(f(d1)) && dates.has(f(d2));
}
function lastTrainedDaysAgo() {
  const dates = Object.values(D.sessions).filter(x => x.finishedAt).map(x => x.date).sort();
  if (!dates.length) return null;
  return dayDiff(dates[dates.length - 1], todayStr());
}

/* ================================================================
   RENDERING
   ================================================================ */
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + name).classList.add("active");
  const tabFor = { home:"home", focus:"today", summary:"today", progress:"progress" };
  document.querySelectorAll(".tabbar button").forEach(b => b.classList.toggle("active", b.dataset.tab === tabFor[name]));
  sky.setScene(name);
}

/* ---- Home ---- */
function renderHome() {
  const started = !!D.blockStart;
  const week = Math.min(currentWeek(), BLOCK.weeks);
  const cap = rpeCap(week);
  const over = blockDone();

  document.getElementById("home-sub").textContent = !started
    ? "STARTS ON YOUR FIRST FINISHED SESSION"
    : over ? "BLOCK COMPLETE · SEE REPORT CARD IN CAREER"
    : `${weekLabel(week)} OF ${BLOCK.weeks} · 3 DAYS · RPE ≤${cap}`;

  // Week strip
  const ws = document.getElementById("week-strip");
  let h = "";
  for (let w = 1; w <= BLOCK.weeks; w++) {
    const done = DAYS.filter(d => Object.values(D.sessions).some(s => s.dayId === d.id && s.week === w && s.finishedAt)).length;
    const pct = Math.round((done / 3) * 100);
    const cur = started && w === week && !over;
    let color = "rgba(255,255,255,0.35)";
    if (done >= 3) color = "#fff"; else if (cur) color = "var(--red)";
    h += `<div class="week-col">
      <div class="wl ${cur ? "current" : ""} ${w === BLOCK.deloadWeek ? "deload-w" : ""}">${w === BLOCK.deloadWeek ? "W4·DL" : "W" + w}</div>
      <div class="week-bar"><div class="week-bar-fill" style="width:${pct}%;background:${color};"></div></div>
    </div>`;
  }
  ws.innerHTML = h;

  // Banners
  const bh = document.getElementById("home-banners");
  let bhtml = "";
  if (consecutiveDays()) {
    bhtml += `<div class="banner warn"><span class="label">SPACING</span>You've trained the last two days. A third in a row is how Blocks 1-3 died. Rest today; the program works because of the days off.</div>`;
  }
  if (started && week === BLOCK.deloadWeek && !over) {
    bhtml += `<div class="banner deload"><span class="label">DELOAD WEEK</span>Everything is -20% and capped at RPE 6 this week automatically. Mandatory. All three previous blocks collapsed in the back half; this is the fix.</div>`;
  }
  // Completion-based week: remind which days are still needed
  if (started && !over) {
    const missing = DAYS.filter(d => !Object.values(D.sessions).some(s => s.dayId === d.id && s.week === week && s.finishedAt));
    if (missing.length > 0 && missing.length < 3) {
      bhtml += `<div class="banner info"><span class="label">WEEK ${week}</span>${missing.map(d => d.label).join(" + ")} still needed to advance to W${week + 1}.</div>`;
    }
  }
  const unexported = Object.values(D.sessions).filter(s => s.finishedAt && (!D.lastExport || s.finishedAt > D.lastExport)).length;
  if (unexported >= 3 || (unexported >= 1 && D.lastExport && dayDiff(D.lastExport.split("T")[0], todayStr()) > 7)) {
    bhtml += `<div class="banner info"><span class="label">BACKUP</span>${unexported} session${unexported>1?"s":""} not backed up. iPhone storage is a handshake deal with Apple.<br><button id="banner-export">EXPORT NOW</button></div>`;
  }
  bh.innerHTML = bhtml;
  const be = document.getElementById("banner-export");
  if (be) be.addEventListener("click", doExport);

  renderBodyweight();

  // Session cards
  const sc = document.getElementById("sessions-card");
  const doneThisWeek = DAYS.filter(d => Object.values(D.sessions).some(s => s.dayId === d.id && s.week === week && s.finishedAt)).length;
  let scHtml = `<div class="card-head"><span class="label">${started ? weekLabel(week) : "WEEK 1"} · ${doneThisWeek}/3 SESSIONS</span><span class="label" id="last-trained"></span></div>`;
  DAYS.forEach((day, i) => {
    const fin = Object.values(D.sessions).find(s => s.dayId === day.id && s.week === week && s.finishedAt);
    const open = findOpenSession(day.id);
    let cls = "", status = "→";
    if (fin) { cls = "is-done"; status = "DONE"; }
    else if (open) { cls = "in-progress"; status = "IN PROGRESS"; }
    scHtml += `<button class="day-btn ${cls}" data-day="${i}">
      <span><span class="db-day">DAY ${i + 1}</span><span class="db-label" style="display:block;">${day.label}</span>
      <span class="db-sub">${day.exercises.length} exercises · core last</span></span>
      <span class="db-status">${status}</span>
    </button>
    <div class="day-detail" data-detail="${i}"><div id="day-detail-${i}" style="padding:4px 0 14px;"></div></div>`;
  });
  sc.innerHTML = scHtml;
  const lt = lastTrainedDaysAgo();
  document.getElementById("last-trained").textContent = lt == null ? "" : lt === 0 ? "TRAINED TODAY" : `LAST: ${lt}D AGO`;

  sc.querySelectorAll(".day-btn").forEach(b => {
    b.addEventListener("click", () => {
      const i = parseInt(b.dataset.day);
      const det = sc.querySelector(`[data-detail="${i}"]`);
      const isOpen = det.classList.contains("open");
      sc.querySelectorAll(".day-detail").forEach(d => d.classList.remove("open"));
      if (!isOpen) { det.classList.add("open"); renderDayDetail(i); }
    });
  });

  // Rules
  document.getElementById("rules-list").innerHTML = RULES.map(r => {
    const desc = r.title === "RPE ceiling" ? `≤${cap} this week` : r.desc;
    return `<div class="rule-row"><div class="rule-icon">${r.icon}</div><div><span class="rule-title">${r.title}</span><span class="rule-desc">${desc}</span></div></div>`;
  }).join("");
}

function renderBodyweight() {
  const b = D.body.slice().sort((a, b2) => a.d.localeCompare(b2.d));
  const el = document.getElementById("bw-val");
  const tr = document.getElementById("bw-trend");
  if (!b.length) { el.innerHTML = `—<span class="unit"> lb</span>`; tr.textContent = "Log your first weigh-in"; tr.className = "bw-trend"; }
  else {
    const last = b[b.length - 1];
    el.innerHTML = `${last.w}<span class="unit"> lb</span>`;
    const weekAgo = b.filter(x => dayDiff(x.d, last.d) >= 6);
    if (weekAgo.length) {
      const ref = weekAgo[weekAgo.length - 1];
      const delta = Math.round((last.w - ref.w) * 10) / 10;
      tr.textContent = `${delta > 0 ? "+" : ""}${delta} lb vs ${dayDiff(ref.d, last.d)}d ago`;
      tr.className = "bw-trend " + (delta < 0 ? "down" : delta > 0 ? "up" : "");
    } else { tr.textContent = `Logged ${last.d}`; tr.className = "bw-trend"; }
  }
  // sparkline
  const c = document.getElementById("bw-spark"), ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  const pts = b.slice(-14);
  if (pts.length >= 2) {
    const ws2 = pts.map(p => p.w), min = Math.min(...ws2) - 0.5, max = Math.max(...ws2) + 0.5;
    ctx.strokeStyle = "#3d5fa8"; ctx.lineWidth = 2; ctx.beginPath();
    pts.forEach((p, i) => {
      const x = (i / (pts.length - 1)) * (c.width - 4) + 2;
      const y = c.height - 3 - ((p.w - min) / (max - min)) * (c.height - 6);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.stroke();
  }
}

function renderDayDetail(dayIdx) {
  const host = document.getElementById(`day-detail-${dayIdx}`);
  const day = DAYS[dayIdx];
  const week = Math.min(currentWeek(), BLOCK.weeks);
  const open = findOpenSession(day.id);
  let h = "";
  day.exercises.forEach((ex, i) => {
    const v = variantOf(ex);
    const tgt = getTarget(ex, week, open?.id);
    let meta = "";
    if (tgt.mode === "beatTotal") meta = tgt.total ? `beat ${tgt.total - 1} total` : "AMRAP test";
    else if (tgt.mode === "calibrate") meta = "find weight";
    else meta = `${tgt.w ? tgt.w + " lb · " : ""}${tgt.reps ? "aim " + tgt.reps : ""}`;
    const doneSets = open ? (open.exercises[i]?.sets || []).filter(s => s.done).length : 0;
    h += `<div class="ex-line">
      <span class="exl-status">${doneSets >= 3 ? "✓" : doneSets > 0 ? doneSets : ""}</span>
      <span class="exl-name">${v.name}${ex.isCore ? '<span class="exl-core">CORE</span>' : ""}</span>
      <span class="exl-meta">${meta}${tgt.mode === "newWeight" ? " ↑" : ""}</span>
    </div>`;
  });
  h += `<button class="day-start-btn" data-launch="${dayIdx}">${open ? "CONTINUE SESSION" : "START SESSION"}</button>`;
  host.innerHTML = h;
  host.querySelector("[data-launch]").addEventListener("click", e => {
    e.stopPropagation(); openSession(dayIdx);
  });
}

/* ---- Session flow ---- */
function openSession(dayIdx) {
  const day = DAYS[dayIdx];
  let s = findOpenSession(day.id);
  if (!s) s = createSession(dayIdx);
  active = s.id;
  // first exercise with an unfinished set
  focusIdx = 0;
  for (let i = 0; i < day.exercises.length; i++) {
    const el = s.exercises[i];
    if (!el.sets.every(x => x.done)) { focusIdx = i; break; }
  }
  if (s.startedAt) startTimer(s);
  acquireWake();
  showScreen("focus");
  renderFocus();
}

function renderFocus() {
  const s = D.sessions[active];
  if (!s) { showScreen("home"); renderHome(); return; }
  const day = DAYS.find(d => d.id === s.dayId);
  const ex = day.exercises[focusIdx];
  const el = s.exercises[focusIdx];
  const v = variantOf(ex);
  // if the saved variant differs from current pref and no sets logged yet, adopt current
  if (el.variantName !== v.name && !el.sets.some(x => x.done)) el.variantName = v.name;
  const week = s.week, cap = rpeCap(week);
  const tgt = getTarget(ex, week, s.id);
  const total = day.exercises.length;

  let h = `<div class="focus-top">
    <button class="focus-back" id="f-back">← BLOCK</button>
    <div style="display:flex;gap:14px;align-items:center;">
      ${focusIdx > 0 ? '<button class="focus-back" id="f-prev">← PREV</button>' : ""}
      <span class="focus-counter">${String(focusIdx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
    </div>
  </div>
  <div class="session-banner"><span>${weekLabel(week)}</span><span>RPE CAP <b style="color:${cap <= 6 ? "var(--purple)" : cap <= 8 ? "#9fd49b" : "var(--yellow)"}">${cap}</b></span><span class="sb-timer" id="sb-timer">--</span></div>
  <div class="progress-segments">${day.exercises.map((_, i) => `<div class="seg ${i < focusIdx ? "past" : i === focusIdx ? "current" : ""}"></div>`).join("")}</div>`;

  h += `<div class="focus-hero">
    <div class="fh-label">EX ${String(focusIdx + 1).padStart(2, "0")}${ex.isCore ? " · CORE" : ""}${ex.amrapTotal ? " · AMRAP" : ""}</div>
    <div class="fh-name">${el.variantName}</div>
    <div class="fh-cue">${ex.cue}</div>
  </div>`;

  // The one number to beat
  let beatVal = "", beatUnit = "", modeCls = "";
  if (tgt.mode === "beatTotal") { beatVal = tgt.total ?? "TEST"; beatUnit = tgt.total ? " total reps" : ""; }
  else if (tgt.mode === "calibrate") { beatVal = "FIND IT"; }
  else if (tgt.mode === "newWeight") { beatVal = `${tgt.reps} × ${tgt.w}`; beatUnit = " lb"; modeCls = "mode-new"; }
  else if (tgt.mode === "deload") { beatVal = tgt.w ? `${tgt.reps} × ${tgt.w}` : `${tgt.reps}`; beatUnit = tgt.w ? " lb" : " reps"; modeCls = "mode-deload"; }
  else { beatVal = tgt.w ? `${tgt.reps} × ${tgt.w}` : `${tgt.reps}`; beatUnit = tgt.w ? " lb" : " reps"; }
  h += `<div class="beat-card ${modeCls}">
    <span class="label">${tgt.mode === "newWeight" ? "NEW WEIGHT EARNED" : tgt.mode === "deload" ? "DELOAD TARGET" : tgt.mode === "calibrate" ? "CALIBRATE" : "BEAT THIS"}</span>
    <div class="beat-val">${beatVal}<span class="beat-unit">${beatUnit}</span></div>
    <div class="beat-why">${tgt.why}</div>
  </div>`;

  // Last time strip
  if (tgt.last) {
    h += `<div class="last-time">LAST (${tgt.last.date}): ${tgt.last.sets.map(x => `${x.w ? x.w + "×" : ""}${x.r}${x.rpe ? "@" + x.rpe : ""}`).join("  ·  ")}</div>`;
  }

  // Plate math
  const w0 = el.sets[0]?.w;
  if (w0 && v.implement === "smith") {
    const bar = D.prefs.smithBar || 25;
    const ps = Math.round(((w0 - bar) / 2) * 10) / 10;
    h += `<div class="plate-hint">${ps > 0 ? ps + " lb each side + " + bar + " lb bar" : "bar only (" + bar + " lb)"}</div>`;
  } else if (w0 && v.implement === "barbell") {
    const bar = 45;
    const ps = Math.round(((w0 - bar) / 2) * 10) / 10;
    h += `<div class="plate-hint">${ps > 0 ? plateMath(ps) + " each side + " + bar + " lb bar" : "bar only (45 lb)"}</div>`;
  } else if (w0 && v.implement === "db") {
    h += `<div class="plate-hint">${w0} lb ${v.note || "per DB"}</div>`;
  }

  // Variant swap
  if (ex.alts.length) {
    h += `<div class="swap-row">
      <button data-v="0" class="${v.vi === 0 ? "active" : ""}">${ex.name}</button>
      ${ex.alts.map((a, ai) => `<button data-v="${ai + 1}" class="${v.vi === ai + 1 ? "active" : ""}">${a.name}</button>`).join("")}
    </div>`;
  }

  // Set grid
  const hasW = v.implement !== "bw";
  h += `<div class="set-wrap"><div class="set-grid-header ${hasW ? "with-weight" : "no-weight"}"><div>#</div>${hasW ? "<div>LB</div>" : ""}<div>REPS</div><div>RPE</div><div></div></div>`;
  el.sets.forEach((st, si) => {
    const rpeCls = st.rpe && st.rpe > cap ? "rpe-over" : st.rpe && st.rpe >= cap ? "rpe-warn" : "";
    h += `<div class="set-row ${st.done ? "done" : ""} ${hasW ? "with-weight" : "no-weight"}" data-si="${si}">
      <div class="sno">${si + 1}</div>
      ${hasW ? `<input type="number" inputmode="decimal" data-f="w" value="${st.w ?? ""}" placeholder="${tgt.w ?? "lb"}">` : ""}
      <input type="number" inputmode="numeric" data-f="r" value="${st.r ?? ""}" placeholder="${tgt.reps ?? tgt.total ?? "reps"}">
      <input type="number" inputmode="decimal" data-f="rpe" value="${st.rpe ?? ""}" placeholder="≤${cap}" class="${rpeCls}">
      <button class="check" data-act="done">${st.done ? "✓" : ""}</button>
    </div>`;
  });
  if (el.sets.some(x => x.done && x.rpe > cap)) {
    h += `<div class="rpe-warning">Cap is ${cap} this week. You're over it. Drop ${v.inc || 5} lb or shave reps; the ramp only works if it stays a ramp.</div>`;
  }
  h += `<button class="add-set" id="f-addset">+ ADD SET</button></div>`;

  // Next / finish
  if (focusIdx < total - 1) {
    const nv = variantOf(day.exercises[focusIdx + 1]);
    h += `<button class="focus-next" id="f-next">NEXT: ${nv.name.toUpperCase()}</button>`;
  } else {
    const ok = coreOK(s, day);
    h += `<button class="focus-next finish ${ok ? "" : "disabled"}" id="f-next">${ok ? "FINISH SESSION" : "COMPLETE ALL 3 CORE SETS"}</button>`;
  }
  document.getElementById("focus-inner").innerHTML = h;
  updateTimerEl();
  wireFocus(s, day, ex, el, v, cap);
}

/* ---- Barbell plate math ---- */
function plateMath(perSide) {
  if (perSide <= 0) return "0 lb";
  const plates = [45, 25, 10, 5, 2.5];
  const used = [];
  let rem = perSide;
  for (const p of plates) {
    while (rem >= p - 0.01) { used.push(p); rem -= p; }
  }
  if (!used.length) return perSide + " lb";
  // group: "45+10" or "2x25+5"
  const counts = {};
  used.forEach(p => { counts[p] = (counts[p] || 0) + 1; });
  return Object.entries(counts).map(([p, n]) => n > 1 ? `${n}×${p}` : p).join("+") + " lb";
}

function wireFocus(s, day, ex, el, v, cap) {
  document.getElementById("f-back").addEventListener("click", () => { showScreen("home"); renderHome(); });
  const prev = document.getElementById("f-prev");
  if (prev) prev.addEventListener("click", () => { focusIdx--; renderFocus(); });

  document.querySelectorAll(".swap-row button").forEach(b => {
    b.addEventListener("click", () => {
      if (el.sets.some(x => x.done)) {
        if (!confirm("Sets already logged on this variant today. Swap anyway? Logged sets stay under the old name.")) return;
      }
      D.prefs.variants[ex.key] = parseInt(b.dataset.v);
      const nv = variantOf(ex);
      if (!el.sets.some(x => x.done)) {
        el.variantName = nv.name;
        const t = getTarget(ex, s.week, s.id);
        el.sets.forEach(x => { if (!x.done) x.w = t.w ?? null; });
      }
      save(); renderFocus();
    });
  });

  document.querySelectorAll(".set-row").forEach(row => {
    const si = parseInt(row.dataset.si);
    const st = el.sets[si];
    row.querySelectorAll("input").forEach(inp => {
      inp.addEventListener("input", () => {
        const f = inp.dataset.f, val = inp.value.trim();
        if (f === "r") st.r = val === "" ? null : parseInt(val);
        else if (f === "w") st.w = val === "" ? null : parseFloat(val);
        else if (f === "rpe") st.rpe = val === "" ? null : parseFloat(val);
        autosave();
      });
      inp.addEventListener("change", () => { save(); if (inp.dataset.f === "rpe") renderFocus(); });
    });
    row.querySelector('[data-act="done"]').addEventListener("click", () => {
      st.done = !st.done;
      if (st.done) {
        st.at = new Date().toISOString();
        markStarted(s);
        if (validSet(st)) {
          const pr = checkPR(el.variantName, st.w, st.r);
          if (pr) flashPR(`${pr} · ${el.variantName} ${st.w ? st.w + " lb × " : ""}${st.r}`);
        }
        startRest(ex.rest || 90, el.variantName);
      }
      save(); renderFocus();
    });
  });

  document.getElementById("f-addset").addEventListener("click", () => {
    const lastSet = el.sets[el.sets.length - 1];
    el.sets.push({ r:null, w:lastSet ? lastSet.w : null, rpe:null, done:false });
    save(); renderFocus();
  });

  document.getElementById("f-next").addEventListener("click", () => {
    if (focusIdx < day.exercises.length - 1) { focusIdx++; renderFocus(); return; }
    if (!coreOK(s, day)) return;
    finishSession(s, day);
  });
}

function finishSession(s, day) {
  const junk = junkSets(s);
  if (junk > 0 && !confirm(`${junk} set${junk > 1 ? "s" : ""} look like button-clicking (1-2 reps at RPE ≤2). They won't count toward progression. Finish anyway?`)) return;
  s.finishedAt = new Date().toISOString();
  if (!D.blockStart) D.blockStart = s.date;
  save();
  stopTimer(); releaseWake();
  showScreen("summary");
  renderSummary(s, day);
}

/* ---- Summary ---- */
function renderSummary(s, day) {
  const cap = rpeCap(s.week);
  let maxRpe = 0, prs = 0, beats = 0, tries = 0;
  day.exercises.forEach((ex, i) => {
    const el = s.exercises[i];
    const good = (el.sets || []).filter(validSet);
    good.forEach(x => { if (x.rpe && x.rpe > maxRpe) maxRpe = x.rpe; });
    // did we beat last time? compare vs target computed excluding this session
    const tgt = getTarget(ex, s.week, s.id);
    if (tgt.mode === "beatTotal" && tgt.total != null) {
      tries++; if (good.reduce((n, x) => n + x.r, 0) >= tgt.total) beats++;
    } else if (tgt.mode === "beat" && tgt.reps != null && good[0]) {
      tries++; if (good[0].r >= tgt.reps) beats++;
    } else if (tgt.mode === "newWeight" && good[0]) {
      tries++; if ((good[0].w || 0) >= tgt.w) beats++;
    }
  });
  const dur = sessionDurMin(s);
  const rpeOK = maxRpe <= cap, timeOK = dur == null || dur <= 60;
  const junk = junkSets(s);

  // Check week completion after this session
  const week = s.week;
  const weekNowDone = DAYS.every(d => Object.values(D.sessions).some(ss => ss.dayId === d.id && ss.week === week && ss.finishedAt));

  const checks = [
    { label: "Every core set logged", pass: coreOK(s, day) },
    { label: `RPE stayed ≤ ${cap}`, pass: rpeOK, detail: rpeOK ? null : `peak ${maxRpe}` },
    { label: "Under 60 minutes", pass: timeOK, detail: dur != null ? dur + " min" : "n/a" },
    { label: "No junk sets", pass: junk === 0, detail: junk ? junk + " excluded" : null },
  ];
  let weekMsg = "";
  if (weekNowDone && week < BLOCK.weeks) {
    weekMsg = `<div class="banner info" style="margin:12px 0;"><span class="label">WEEK ${week} COMPLETE</span>All 3 days done. You're on to W${week + 1}${week + 1 === BLOCK.deloadWeek ? " (deload)" : ""}.</div>`;
  } else if (!weekNowDone) {
    const missing = DAYS.filter(d => !Object.values(D.sessions).some(ss => ss.dayId === d.id && ss.week === week && ss.finishedAt));
    weekMsg = `<div style="font-family:var(--mono);font-size:10px;letter-spacing:0.5px;color:var(--ink-dim);margin:8px 0;">${missing.map(d => d.label).join(" + ")} still needed for W${week}.</div>`;
  }

  document.getElementById("summary-content").innerHTML = `
    <div class="summary-wrap">
      <div class="summary-title">Session complete</div>
      <div class="summary-sub">${day.label} · ${weekLabel(s.week)}${dur ? " · " + dur + " min" : ""}</div>
      ${weekMsg}
      <div class="paper">
        <div class="card-head"><span class="label">RULES CHECK</span></div>
        ${checks.map(c => `<div class="check-row"><div class="check-icon ${c.pass ? "pass" : "fail"}">${c.pass ? "✓" : "✗"}</div>
          <div><span class="check-label" style="color:${c.pass ? "var(--ink)" : "var(--red)"}">${c.label}</span>${c.detail ? `<span class="check-detail">${c.detail}</span>` : ""}</div></div>`).join("")}
      </div>
      <div class="paper">
        <div class="card-head"><span class="label">NUMBERS BEATEN</span></div>
        <div class="big-stat">${beats}<span class="unit"> of ${tries}</span></div>
      </div>
      <button class="focus-next" id="sum-done" style="background:var(--ink);">DONE</button>
    </div>`;
  document.getElementById("sum-done").addEventListener("click", () => {
    active = null; showScreen("home"); renderHome();
  });
}

/* ---- Career / Progress ---- */
function renderProgress() {
  const hist = allHistory();
  const fin = hist.filter(x => x.fin !== false);
  const b4 = Object.values(D.sessions).filter(x => x.finishedAt);
  document.getElementById("prog-sub").textContent =
    `${fin.length} SESSIONS · ${new Set(fin.map(x => x.b)).size} BLOCKS · SINCE APR 2026`;

  const prT = prTable();
  const prCount = Object.keys(prT).length;
  let sets4 = 0; b4.forEach(s => s.exercises.forEach(e => sets4 += (e.sets || []).filter(validSet).length));
  document.getElementById("prog-stats").innerHTML = `
    <div class="stat-card"><div class="sc-val">${b4.length}/18</div><div class="sc-lbl">Block 4</div></div>
    <div class="stat-card"><div class="sc-val">${fin.length}</div><div class="sc-lbl">Lifetime</div></div>
    <div class="stat-card"><div class="sc-val">${prCount}</div><div class="sc-lbl">Lifts tracked</div></div>`;

  // PR list: show current Block 4 movements first, best e1RM
  const names = [];
  DAYS.forEach(d => d.exercises.forEach(ex => {
    names.push(variantOf(ex).name);
  }));
  const shown = new Set();
  let prHtml = "";
  names.concat(Object.keys(prT)).forEach(n => {
    if (shown.has(n) || !prT[n]) return;
    shown.add(n);
    const p = prT[n];
    prHtml += `<div class="pr-row"><span class="pr-name">${n}</span>
      <span class="pr-val">${p.w ? p.w + " lb × " + p.r : p.r + " reps"}</span>
      <span class="pr-date">${p.date}</span></div>`;
  });
  document.getElementById("pr-list").innerHTML = prHtml || '<div style="font-size:12px;color:var(--ink-dim);">No PRs yet. Rude.</div>';

  // Block 4 weight trend per exercise, scaled per exercise
  let tHtml = "";
  DAYS.forEach(day => day.exercises.forEach(ex => {
    if (ex.implement === "bw" && !ex.amrapTotal) return;
    const vName = variantOf(ex).name;
    const series = [];
    Object.values(D.sessions).filter(x => x.finishedAt).sort((a, b) => a.date.localeCompare(b.date)).forEach(s2 => {
      const day2 = DAYS.find(d => d.id === s2.dayId);
      const idx = day2 ? day2.exercises.indexOf(ex) : -1;
      if (idx < 0) return;
      const el = s2.exercises[idx];
      if (!el || el.variantName !== vName) return;
      const good = (el.sets || []).filter(validSet);
      if (!good.length) return;
      const val = ex.amrapTotal ? good.reduce((n, x) => n + x.r, 0) : bestWorkingWeight(good.map(x => ({ w: x.w })));
      if (val) series.push({ d: s2.date, v: val });
    });
    if (series.length < 1) return;
    const max = Math.max(...series.map(p => p.v));
    const prIdx = series.reduce((bi, p, i) => p.v > series[bi].v ? i : bi, 0);
    tHtml += `<div class="trend-ex"><div class="trend-name">${vName}${ex.amrapTotal ? " (total reps)" : ""}</div>
      <div class="trend-bars">${series.map((p, i) =>
        `<div class="trend-bar ${i === prIdx && series.length > 1 ? "pr" : ""}" style="height:${Math.max(10, Math.round((p.v / max) * 100))}%;" title="${p.d}: ${p.v}"></div>`).join("")}</div></div>`;
  }));
  document.getElementById("trend-list").innerHTML = tHtml || '<div style="font-size:12px;color:var(--ink-dim);">Trends appear after your first Block 4 sessions.</div>';

  // History (newest first, all blocks) — tappable
  const sorted = fin.slice().reverse();
  document.getElementById("history-list").innerHTML = sorted.slice(0, 50).map((sess, hi) => `
    <div class="hist-item" data-hi="${hi}">
      <div class="hi-top"><span class="hi-label">${sess.l || "Session"}</span><span class="hi-block">${sess.b}</span></div>
      <div class="hi-date">${sess.d}${sess.deload ? " · deload" : ""}</div>
      <div class="hi-tags">${sess.e.map(ex2 => `<span class="hi-tag">${shortName(ex2.n)} ${ex2.s[0]?.w ? ex2.s[0].w + "×" : ""}${ex2.s.map(x => x.r).join("/")}</span>`).join("")}</div>
      <div class="hi-detail" id="hi-detail-${hi}"></div>
    </div>`).join("");

  // Wire up tappable history
  document.querySelectorAll(".hist-item").forEach(item => {
    item.addEventListener("click", () => {
      const hi = parseInt(item.dataset.hi);
      const det = document.getElementById(`hi-detail-${hi}`);
      const isOpen = det.classList.contains("open");
      document.querySelectorAll(".hi-detail").forEach(d => { d.classList.remove("open"); d.innerHTML = ""; });
      if (!isOpen) {
        const sess = sorted[hi];
        let dHtml = "";
        sess.e.forEach(ex2 => {
          dHtml += `<div class="hd-ex"><div class="hd-name">${ex2.n}</div>`;
          dHtml += `<div class="hd-sets">${ex2.s.map((st, si) =>
            `<div class="hd-set"><span class="hd-sno">${si+1}</span>${st.w ? `<span class="hd-w">${st.w} lb</span>` : ""}<span class="hd-r">×${st.r}</span>${st.rpe != null ? `<span class="hd-rpe">@${st.rpe}</span>` : ""}</div>`
          ).join("")}</div></div>`;
        });
        det.innerHTML = dHtml;
        det.classList.add("open");
      }
    });
  });

  document.getElementById("smith-bar").value = D.prefs.smithBar || 25;
  document.getElementById("sky-mode").value = D.prefs.sky || "on";
}
function shortName(n) {
  return n.replace("Smith ", "S.").replace("Seated Cable Row (V-bar)", "Cable Row").replace(" (wide neutral)", "")
          .replace("Chest-Supported ", "CS ").replace("Cable Rope Tricep Pushdown", "Pushdown")
          .replace("Standing Calf Raise (DBs)", "Calf").replace(" (seated)", "").replace("DB Romanian Deadlift", "RDL")
          .replace("Barbell ", "BB ").replace("DB Reverse Lunge", "Rev Lunge").replace("DB Overhead Extension", "OH Ext");
}

/* ---- Block report card ---- */
function renderReport() {
  const b4 = Object.values(D.sessions).filter(x => x.finishedAt).sort((a, b) => a.date.localeCompare(b.date));
  if (!b4.length) { alert("No Block 4 sessions yet. The report card needs a semester first."); return; }
  const weeks = new Set(b4.map(s => s.week)).size;
  let durs = [], overCap = 0, totalSets = 0, junk = 0;
  const spacingBad = [];
  const dates = b4.map(s => s.date);
  for (let i = 2; i < dates.length; i++) {
    if (dayDiff(dates[i - 2], dates[i]) <= 2) spacingBad.push(dates[i]);
  }
  b4.forEach(s => {
    const d2 = sessionDurMin(s); if (d2 != null && d2 < 600) durs.push(d2);
    const cap = rpeCap(s.week);
    s.exercises.forEach(e => (e.sets || []).forEach(st => {
      if (!st.done) return;
      totalSets++;
      if (!validSet(st)) junk++;
      else if (st.rpe && st.rpe > cap) overCap++;
    }));
  });
  // per-lift first vs latest
  let lifts = "";
  DAYS.forEach(day => day.exercises.forEach(ex => {
    if (ex.implement === "bw" && !ex.amrapTotal) return;
    const vName = variantOf(ex).name;
    const vals = [];
    b4.forEach(s2 => {
      const day2 = DAYS.find(d => d.id === s2.dayId);
      const idx = day2 ? day2.exercises.indexOf(ex) : -1;
      if (idx < 0) return;
      const el = s2.exercises[idx];
      if (!el || el.variantName !== vName) return;
      const good = (el.sets || []).filter(validSet);
      if (!good.length) return;
      vals.push(ex.amrapTotal ? good.reduce((n, x) => n + x.r, 0) : (good[0].w || 0));
    });
    if (vals.length >= 2) {
      const a = vals[0], z = vals[vals.length - 1];
      lifts += `<div class="pr-row"><span class="pr-name">${vName}</span><span class="pr-val">${a} → ${z}${ex.amrapTotal ? " reps" : " lb"}</span></div>`;
    }
  }));
  const avgDur = durs.length ? Math.round(durs.reduce((a, b) => a + b, 0) / durs.length) : null;
  document.getElementById("summary-content").innerHTML = `
    <div class="summary-wrap">
      <div class="summary-title">Block report card</div>
      <div class="summary-sub">${b4.length}/18 SESSIONS · ${weeks} WEEK${weeks > 1 ? "S" : ""} TOUCHED</div>
      <div class="paper">
        <div class="card-head"><span class="label">DISCIPLINE</span></div>
        <div class="check-row"><div class="check-icon ${spacingBad.length === 0 ? "pass" : "fail"}">${spacingBad.length === 0 ? "✓" : "✗"}</div><div><span class="check-label">Spacing</span><span class="check-detail">${spacingBad.length === 0 ? "never 3 in a row" : spacingBad.length + " pile-ups"}</span></div></div>
        <div class="check-row"><div class="check-icon ${overCap === 0 ? "pass" : "fail"}">${overCap === 0 ? "✓" : "✗"}</div><div><span class="check-label">RPE discipline</span><span class="check-detail">${overCap} sets over cap of ${totalSets}</span></div></div>
        <div class="check-row"><div class="check-icon ${junk === 0 ? "pass" : "fail"}">${junk === 0 ? "✓" : "✗"}</div><div><span class="check-label">Honest logging</span><span class="check-detail">${junk} junk sets</span></div></div>
        <div class="check-row"><div class="check-icon ${avgDur == null || avgDur <= 60 ? "pass" : "fail"}">${avgDur == null || avgDur <= 60 ? "✓" : "✗"}</div><div><span class="check-label">Session length</span><span class="check-detail">${avgDur != null ? "avg " + avgDur + " min" : "n/a"}</span></div></div>
      </div>
      <div class="paper"><div class="card-head"><span class="label">LIFTS · FIRST → LATEST</span></div>${lifts || '<div style="font-size:12px;color:var(--ink-dim);">Need 2+ sessions per lift.</div>'}</div>
      <button class="focus-next" id="sum-done" style="background:var(--ink);">BACK</button>
    </div>`;
  showScreen("summary");
  document.getElementById("sum-done").addEventListener("click", () => { showScreen("progress"); renderProgress(); });
}

/* ---- Timers, wake lock, PR flash ---- */
function startTimer(s) {
  clearInterval(timerInt);
  timerInt = setInterval(updateTimerEl, 1000);
  updateTimerEl();
}
function stopTimer() { clearInterval(timerInt); }
function updateTimerEl() {
  const el = document.getElementById("sb-timer");
  if (!el || !active) return;
  const s = D.sessions[active];
  if (!s || !s.startedAt) { el.textContent = "NOT STARTED"; el.classList.remove("over-time"); return; }
  const sec = Math.floor((Date.now() - new Date(s.startedAt)) / 1000);
  const m = Math.floor(sec / 60);
  el.textContent = `${m}:${String(sec % 60).padStart(2, "0")}`;
  el.classList.toggle("over-time", m >= 60);
}
function startRest(sec, name) {
  restEnd = Date.now() + sec * 1000;
  document.getElementById("rt-label").textContent = name;
  document.getElementById("rest-timer").classList.add("active");
  clearInterval(restInt);
  restInt = setInterval(tickRest, 400); tickRest();
}
function tickRest() {
  if (!restEnd) return;
  const remain = Math.ceil((restEnd - Date.now()) / 1000);
  const m = Math.floor(Math.max(0, remain) / 60), s2 = Math.max(0, remain) % 60;
  document.getElementById("rt-time").textContent = `${m}:${String(s2).padStart(2, "0")}`;
  if (remain <= 0) {
    document.getElementById("rt-label").textContent = "Go.";
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    beep();
    clearInterval(restInt);
    setTimeout(stopRest, 2500);
  }
}
function stopRest() { clearInterval(restInt); restEnd = null; document.getElementById("rest-timer").classList.remove("active"); }
function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [660, 880, 1100].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.28, ctx.currentTime + i * 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.25);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.15); o.stop(ctx.currentTime + i * 0.15 + 0.25);
    });
    setTimeout(() => ctx.close(), 1600);
  } catch (e) {}
}
async function acquireWake() {
  try { if ("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen"); } catch (e) {}
}
function releaseWake() { try { wakeLock && wakeLock.release(); } catch (e) {} wakeLock = null; }
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && active && !D.sessions[active]?.finishedAt) acquireWake();
});
let prT2 = null;
function flashPR(msg) {
  const el = document.getElementById("pr-flash");
  el.textContent = msg;
  el.classList.add("show");
  beep();
  clearTimeout(prT2);
  prT2 = setTimeout(() => el.classList.remove("show"), 3200);
}

/* ================================================================
   THE LIVING SKY
   Drifting cloud vapor on canvas. Reacts to touch. Warms as the
   session progresses. Sleeps when hidden, freezes in focus mode,
   respects reduced motion, costs your battery almost nothing.
   ================================================================ */
const sky = (() => {
  const cv = document.getElementById("sky");
  const ctx = cv.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0, H = 0, dpr = 1, blobs = [], raf = null, t = 0, scene = "home", warmth = 0, warmthTarget = 0;
  const P = { top: [111, 139, 165], mid: [143, 165, 188], low: [176, 191, 204], fade: [201, 210, 217] };
  const WARM = { top: [150, 132, 141], mid: [190, 160, 148], low: [222, 190, 158], fade: [236, 214, 178] };

  function lerp(a, b, k) { return a + (b - a) * k; }
  function mix(c1, c2, k) { return `rgb(${Math.round(lerp(c1[0], c2[0], k))},${Math.round(lerp(c1[1], c2[1], k))},${Math.round(lerp(c1[2], c2[2], k))})`; }

  let lastW = 0, resizeT = null, scrolling = false, scrollT = null;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const newW = window.innerWidth;
    W = newW; H = Math.max(H, window.innerHeight, (screen && screen.height) || 0);
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (newW !== lastW || !blobs.length) { lastW = newW; makeBlobs(); }
    draw();
  }
  function onResize() { clearTimeout(resizeT); resizeT = setTimeout(resize, 120); }
  function markScrolling() {
    scrolling = true;
    clearTimeout(scrollT);
    scrollT = setTimeout(() => { scrolling = false; }, 220);
  }
  function makeBlobs() {
    blobs = [];
    const n = 7;
    for (let i = 0; i < n; i++) {
      blobs.push({
        x: Math.random() * W, y: Math.random() * H * 0.75,
        r: 90 + Math.random() * 150,
        vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.03,
        ph: Math.random() * Math.PI * 2, sp: 0.0015 + Math.random() * 0.002,
        a: 0.10 + Math.random() * 0.12,
        ix: 0, iy: 0,
      });
    }
  }
  function drawGradient() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, mix(P.top, WARM.top, warmth));
    g.addColorStop(0.45, mix(P.mid, WARM.mid, warmth));
    g.addColorStop(0.8, mix(P.low, WARM.low, warmth));
    g.addColorStop(1, mix(P.fade, WARM.fade, warmth));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  function drawBlobs() {
    for (const b of blobs) {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, `rgba(255,255,255,${b.a})`);
      g.addColorStop(0.7, `rgba(255,255,255,${b.a * 0.35})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
    }
  }
  function step() {
    t++;
    warmth += (warmthTarget - warmth) * 0.01;
    for (const b of blobs) {
      b.ph += b.sp;
      b.x += b.vx + Math.sin(b.ph) * 0.12 + b.ix;
      b.y += b.vy + Math.cos(b.ph * 0.8) * 0.05 + b.iy;
      b.ix *= 0.94; b.iy *= 0.94;
      if (b.x < -b.r) b.x = W + b.r; if (b.x > W + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = H * 0.8; if (b.y > H) b.y = -b.r * 0.5;
    }
    draw();
    raf = requestAnimationFrame(step);
  }
  function draw() { drawGradient(); drawBlobs(); }
  function running() {
    return !reduced && D?.prefs?.sky !== "off" && scene === "home" && document.visibilityState === "visible";
  }
  function update() {
    cancelAnimationFrame(raf); raf = null;
    if (running()) raf = requestAnimationFrame(step);
    else draw();
  }
  function poke(x, y) {
    if (!running() || scrolling) return;
    for (const b of blobs) {
      const dx = b.x - x, dy = b.y - y, d = Math.hypot(dx, dy);
      if (d < b.r * 1.6 && d > 1) {
        const f = (1 - d / (b.r * 1.6)) * 1.1;
        b.ix += (dx / d) * f; b.iy += (dy / d) * f;
      }
    }
  }
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", markScrolling, { passive: true });
  document.addEventListener("visibilitychange", update);
  window.addEventListener("pointermove", e => poke(e.clientX, e.clientY), { passive: true });
  window.addEventListener("touchmove", e => { const c = e.touches[0]; if (c) poke(c.clientX, c.clientY); }, { passive: true });

  return {
    init() { resize(); update(); },
    setScene(s) { scene = s; update(); },
    setWarmth(k) { warmthTarget = Math.max(0, Math.min(1, k)); if (!running()) { warmth = warmthTarget; draw(); } },
    refresh() { update(); },
  };
})();

// Session progress warms the sky: done work sets / total prescribed
function updateWarmth() {
  if (!active) {
    const trainedToday = Object.values(D.sessions).some(s => s.finishedAt && s.date === todayStr());
    sky.setWarmth(trainedToday ? 0.85 : 0);
    return;
  }
  const s = D.sessions[active];
  if (!s) return;
  let done = 0, total = 0;
  s.exercises.forEach(e => (e.sets || []).forEach(st => { total++; if (st.done) done++; }));
  sky.setWarmth(total ? done / total : 0);
}

/* ================================================================
   DATA: export / import / reset
   ================================================================ */
function doExport() {
  D.lastExport = new Date().toISOString();
  save();
  const payload = { app: "block4", exportedAt: D.lastExport, blockStart: D.blockStart, sessions: D.sessions, body: D.body, prefs: D.prefs, imported: D.imported };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `block4-backup-${todayStr()}.json`;
  a.click(); URL.revokeObjectURL(url);
  renderHome();
}

// Accepts: Block 4 backups (restore) AND old Block 1/2/3 backups (career import)
function handleImport(data) {
  if (data.app === "block4" && data.sessions) {
    const n = Object.keys(data.sessions).length;
    if (!confirm(`Restore ${n} Block 4 session(s)? Imported data wins on conflicts.`)) return;
    D.sessions = Object.assign({}, D.sessions, data.sessions);
    if (data.body) { const seen = new Set(D.body.map(x => x.d)); data.body.forEach(x => { if (!seen.has(x.d)) D.body.push(x); }); }
    if (data.blockStart && !D.blockStart) D.blockStart = data.blockStart;
    if (data.imported) {
      const have = new Set(D.imported.map(x => x.d + x.l));
      data.imported.forEach(x => { if (!have.has(x.d + x.l)) D.imported.push(x); });
    }
    save(); alert(`Restored ${n} session(s).`); renderHome(); renderProgress();
    return;
  }
  // Block 3 backup -> career import
  if (data.app === "block3" && data.sessions) {
    const added = [];
    const have = new Set(CAREER.concat(D.imported).map(x => x.d + "|" + (x.l || "")));
    const B3DAYS = { d1:"Upper Push", d2:"Lower", d3:"Upper Pull" };
    for (const s of Object.values(data.sessions)) {
      if (!s.finishedAt) continue;
      const exs = [];
      (s.exercises || []).forEach(el => {
        const sets = (el.sets || []).filter(st => {
          if (!st.done) return false;
          const r = typeof st.r === "number" ? st.r : parseInt(st.r);
          if (isNaN(r) || r <= 0) return false;
          if (r <= 2 && (st.rpe == null || st.rpe <= 2)) return false;
          return true;
        }).map(st => ({ w: st.w || null, r: parseInt(st.r), rpe: st.rpe ?? null }));
        if (sets.length) exs.push({ n: el.variantName, s: sets });
      });
      if (!exs.length) continue;
      const label = (B3DAYS[s.dayId] || "Session") + (s.week ? " · W" + s.week : "");
      const key = (s.date || "") + "|" + label;
      if (have.has(key)) continue;
      have.add(key);
      added.push({ b:"Block 3", d:s.date, l:label, e:exs, fin:true, deload:s.week === 4 });
    }
    if (!added.length) { alert("Nothing new in that backup; those sessions are already in your career history."); return; }
    if (!confirm(`Found ${added.length} Block 3 session(s) not in career history. Import?`)) return;
    D.imported = D.imported.concat(added);
    save(); alert(`${added.length} session(s) added to career.`); renderProgress();
    return;
  }
  if (data.logs) { // legacy Block 1/2 backup -> career
    const B2MAP = {
      d1: [null, "Smith Bench Press", "Smith OHP (seated)", "Seated Cable Row (V-bar)", "DB Lateral Raise", "Cable Rope Tricep Pushdown", "Cable Crunch", null],
      d2: [null, "Smith Squat", "DB Romanian Deadlift", "Bulgarian Split Squat", "Seated Leg Curl", "Standing Calf Raise (DBs)", "Hanging Knee Raise", null],
      d3: [null, "Lat Pulldown (wide neutral)", "Chest-Supported DB Row", "DB Incline Bench Press", "Pull-ups", "DB Hammer Curl", "Pallof Press", null],
    };
    const added = [];
    const have = new Set(CAREER.concat(D.imported).map(x => x.d + "|" + (x.l || "")));
    for (const log of Object.values(data.logs)) {
      const named = (log.exercises || []).some(e => e.name);
      const exs = [];
      (log.exercises || []).forEach((e, i) => {
        let nm = e.name || (B2MAP[log.dayId] || [])[i];
        if (!nm || e.type === "mobility") return;
        const sets = (e.sets || []).filter(st => {
          const r = typeof st.reps === "number" ? st.reps : parseInt(st.reps);
          if (!st.done || isNaN(r) || r <= 0) return false;
          if (r <= 2 && (st.rpe == null || st.rpe <= 2)) return false;
          return true;
        }).map(st => ({ w: (typeof st.weight === "number" && st.weight > 0) ? st.weight : null, r: parseInt(st.reps), rpe: st.rpe ?? null }));
        if (sets.length) exs.push({ n: nm, s: sets });
      });
      if (!exs.length) continue;
      const label = (log.label || "") + (named ? "" : ` · W${log.week || "?"}`);
      const key = (log.date || "") + "|" + label;
      if (have.has(key)) continue;
      have.add(key);
      added.push({ b: named ? "Block 1" : "Block 2", d: log.date, l: label, e: exs, fin: !!log.finishedAt, deload: !named && log.week === 5 });
    }
    if (!added.length) { alert("Nothing new in that backup; those sessions are already in your career history."); return; }
    if (!confirm(`Found ${added.length} legacy session(s) not in career history. Import?`)) return;
    D.imported = D.imported.concat(added);
    save(); alert(`${added.length} session(s) added to career.`); renderProgress();
    return;
  }
  alert("Unrecognized backup format.");
}

/* ================================================================
   WIRE UP
   ================================================================ */
function wireUp() {
  document.querySelectorAll(".tabbar button").forEach(b => {
    b.addEventListener("click", () => {
      const tab = b.dataset.tab;
      if (tab === "home") { showScreen("home"); renderHome(); }
      else if (tab === "today") {
        // resume active, else open the first unfinished day this week
        if (active && D.sessions[active] && !D.sessions[active].finishedAt) { showScreen("focus"); renderFocus(); return; }
        const week = Math.min(currentWeek(), BLOCK.weeks);
        let idx = DAYS.findIndex(d => !Object.values(D.sessions).some(s => s.dayId === d.id && s.week === week && s.finishedAt));
        openSession(idx === -1 ? 0 : idx);
      }
      else if (tab === "progress") { showScreen("progress"); renderProgress(); }
    });
  });

  document.getElementById("rt-add").addEventListener("click", () => { if (restEnd) restEnd += 30000; });
  document.getElementById("rt-stop").addEventListener("click", stopRest);

  document.getElementById("bw-save").addEventListener("click", () => {
    const inp = document.getElementById("bw-input");
    const w = parseFloat(inp.value);
    if (!w || w < 60 || w > 500) return;
    const existing = D.body.find(x => x.d === todayStr());
    if (existing) existing.w = w; else D.body.push({ d: todayStr(), w });
    inp.value = ""; save(); renderBodyweight();
  });

  document.getElementById("smith-bar").addEventListener("change", e => { D.prefs.smithBar = parseInt(e.target.value); save(); });
  document.getElementById("sky-mode").addEventListener("change", e => { D.prefs.sky = e.target.value; save(); sky.refresh(); });

  document.getElementById("btn-export").addEventListener("click", doExport);
  document.getElementById("btn-import").addEventListener("click", () => document.getElementById("import-file").click());
  document.getElementById("import-file").addEventListener("change", e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => { try { handleImport(JSON.parse(ev.target.result)); } catch (err) { alert("Import failed: " + err.message); } };
    r.readAsText(f);
    e.target.value = "";
  });
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (!confirm("Reset all Block 4 data? Career history (Blocks 1-3) stays; it's baked in.")) return;
    localStorage.removeItem(LS_KEY);
    location.reload();
  });
  document.getElementById("btn-report").addEventListener("click", renderReport);
}

// Keep warmth in sync whenever we save (cheap hook)
const _origSave = save;
save = function () { _origSave(); updateWarmth(); };

function init() {
  load();
  wireUp();
  sky.init();
  updateWarmth();
  renderHome();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
}
init();
