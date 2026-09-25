"use client";

import Chart from "chart.js/auto";

export function bootApp() {
  if (typeof window === "undefined") return;
  window.Chart = Chart;

/* ===================== constants ===================== */
    const LIFTS = {
      bench:{name:"Bench press", unit:"kg", label:"Top weight (kg)"},
      squat:{name:"Squat", unit:"kg", label:"Top weight (kg)"},
      deadlift:{name:"Deadlift", unit:"kg", label:"Top weight (kg)"},
      press:{name:"Overhead press", unit:"kg", label:"Top weight (kg)"},
      row:{name:"Row / pull", unit:"kg", label:"Top weight (kg)"},
      cardio:{name:"Cardio / run", unit:"km", label:"Top distance (km)"},
      other:{name:"Other", unit:"kg", label:"Top weight (kg)"}
    };
    const NAMES = ["Aussie","Tom","Dazza","Shazza","Bazza","Kez","Macca","Tash","Jayden","Mo","Priya","Sam","Riley","Charlie","Frankie"];
    /* rank ladder — lifetime volume for the profile badge, top-set weight for record badges */
    const RANKS = [
      { id:"quokka",   name:"Quokka",      volume:0,      weight:0,   km:0,  tone:"stone", emoji:"🐹" },
      { id:"koala",    name:"Koala",       volume:8000,   weight:50,  km:3,  tone:"stone", emoji:"🐨" },
      { id:"kangaroo", name:"Kangaroo",    volume:30000,  weight:80,  km:7,  tone:"ink",  emoji:"🦘" },
      { id:"croc",     name:"Crocodile",   volume:90000,  weight:110, km:14, tone:"ink",  emoji:"🐊" },
      { id:"shark",    name:"Shark",       volume:220000, weight:145, km:25, tone:"steel", emoji:"🦈" }
    ];
    const BANTER = {
      first:["First one's on the board. Welcome to the grind, champ.","Day one done. Now back it up tomorrow.","That's the baseline. Everything from here is progress.","Logged and locked. Have a crack at it again next sesh."],
      big:["Bloody legend. That's a ripper jump on your last sesh.","You little beauty. Fair dinkum, you gave it heaps.","Strewth, that's a blinder.","Deadset weapon. Built like a brick shithouse.","Get around that. True blue effort.","You're an absolute unit. Past-you can have a lie-down.","Bonza work. That's the good oil.","Went off like a frog in a sock."],
      small:["Yeah nah, tidy tick-up. Keep having a crack.","Getting there, champ. Bit more yakka.","Steady as she goes. Don't rest on ya laurels.","Small wins still count in Straya.","Nice one. Podium's still a fair drive away.","Not bad for a random arvo, legend."],
      hold:["Same old same old. Have a go, ya mug.","Treading water, mate. Harden up.","Yeah nah. Whole lot of nothing.","Needs more yeast spread, mate.","You're dreamin' if that's a story.","Clock's ticking and the numbers aren't."],
      down:["What a shocker. Soft as a soggy lamington.","My nan lifts heavier.","Went backwards quicker than a ute in reverse.","Don't be a sook — fix it next arvo.","Weak as, today. No offence.","That's a dog's breakfast."],
      pr:["New PB. You crushed your past self.","You little ripper — the ghost PB is toast.","Farkin' Legend! Past-you just copped a hiding.","Get around that. Biggest sesh you've logged. Absolute Unit!"],
      roast:["Called it a day and I'm still posting it.","Servo-snack of a sesh, posted with confidence.","Koala energy. Cute, not scary.","Friday-arvo me would've skipped this. Posting anyway."],
      bench:{big:["Pecs on tour."],small:["Bench creeping up."],hold:["Bench stall. Add a kilo."],down:["Bar isn't going to lift itself."]},
      squat:{big:["Leg day smashed. Absolute unit in the hole."],small:["Quads waking up."],hold:["Skipping leg day again?"],down:["Legs folded like a cheap deckchair."]},
      deadlift:{big:["Hinge from heaven."],small:["Deadlift ticked up."],hold:["Floor's still winning."],down:["Bar glued itself down."]},
      press:{big:["Shoulders like doorframes."],small:["Press is creeping."],hold:["Press is parked."],down:["Press went walkabout."]},
      row:{big:["Back like a barn door."],small:["Pull's getting tidier."],hold:["Rows on repeat."],down:["Rows had a smoko."]},
      cardio:{big:["Lizard-drinking pace."],small:["Stride's tidier."],hold:["Same loop, same time."],down:["Jogged like a sook in thongs."]},
      other:{big:["Whatever that was, you nutted it."],small:["Effort's up a smidge."],hold:["Mystery workout, mystery progress."],down:["That one was ordinary."]},
      win:["Cop that. You smoked your mate.","Took 'em to the cleaners.","Deadset legend. Rival's fussing."],
      draw:["Too close, you pair of dags.","Needle match. One more set.","A draw dressed up as a stoush."],
      loss:["You got cooked. Don't chuck a wobbly.","Pull ya head in.","Weak as, next to your rival."]
    };
    const LEGEND = {
      first:["Day one, legend status pending.","The ledger opens. Don't embarrass it."],
      big:["Deadset unhinged progress. Extra yeast spread.","You colonised the rack.","That's a national holiday sesh.","The bar filed a complaint and lost."],
      small:["Creeping like a magpie in spring.","On the team sheet, not the grand final.","A snag's worth of progress."],
      hold:["Frozen like a servo pie.","Numbers having a smoko.","Circling the roundabout."],
      down:["Nan's trolley out-lifted you.","Folded like a soggy sausage.","Two kelpies and a galah lift heavier."],
      pr:["Past-you chucked a sickie. Record's yours.","Record rewritten. Frame it."],
      roast:["Posting my own downfall, as tradition demands."],
      win:["Squad got flogged and you held the hose.","Leaderboard's yours."],
      draw:["Whole squad in a traffic jam.","Too close to split."],
      loss:["Squad cooked you like a Sunday roast.","Dead last in your own group chat."],
      bench:{big:["Bench so loud the fans asked for a transfer."],small:["Pecs whispering."],hold:["Bar collecting rent."],down:["Press looked like a shrug at the barbie."]},
      squat:{big:["Hole so deep they need a mining permit."],small:["Quads paying rent."],hold:["Chooks drafting a petition."],down:["Knees wrote a resignation."]},
      deadlift:{big:["Floor said uncle."],small:["Off the ground, not the charts."],hold:["Bar still glued."],down:["Couldn't deadlift a wet towel."]},
      press:{big:["Ceiling asked you to stop."],small:["Shoulders negotiating."],hold:["Press on hold music."],down:["Press folded the deckchair."]},
      row:{big:["Back blocked out the sun."],small:["Pull's warming up."],hold:["Rows in a holding pattern."],down:["Rows went walkabout."]},
      cardio:{big:["Kays so spicy the magpies clapped."],small:["Not a fun-run."],hold:["Same loop as your excuses."],down:["Jogged like a sook late for lunch."]},
      other:{big:["You ran the whole circus tent."],small:["Effort's a nibble."],hold:["Mystery meat sesh."],down:["That one was a gap year."]}
    };
    const GYM_HYPE = {
      pr:["Farkin' Legend!","Absolute Unit!","New PB, you weapon!","Have a squiz at that!"],
      big:["Farkin' Legend!","Absolute Unit!","Deadset weapon!","You little ripper!"],
      small:["Good Hustle, Mate!","Ripper effort, champ.","Solid yakka!","That's the good oil."],
      hold:["Good Hustle, Mate!","Keep having a crack.","Steady as she goes, legend."],
      first:["First sesh in the book!","Welcome to the grind, champ.","That's the baseline, legend."],
      down:["Good Hustle, Mate!","Shake it off. Next sesh is yours.","Still showed up. That's half of it."],
      roast:["Posted anyway. True blue.","Koala energy, still a sesh."],
      win:["Farkin' Legend!","You smoked 'em, champ!","Absolute Unit!"],
      draw:["Too close to split, legends.","Needle match. One more set."],
      loss:["Good Hustle, Mate!","Next one's yours. Have another crack."]
    };
    const POST_WORKOUT = [
      "Time for a Flat White! ☕",
      "Thongs on. Recovery stroll time.",
      "Cuppa and a sit-down, champ.",
      "Sun on the back. Ten minutes, then stretch.",
      "Smash a snack. You've earned the sit-down.",
      "Ocean if you're near it. Otherwise, couch and a cuppa.",
      "Kettle on. That's a wrap.",
      "Time for a cheeky walk around the block.",
      "Park in the shade. Hydrate. You've done the yakka.",
      "Hit the showers. Then a sit in the sun."
    ];
    const STATES = {
      VIC:{ code:"VIC", name:"Victoria", landmark:"The Tan Track", icon:"Tram", badge:"Melbourne Runner", iconMark:"🚊", loop:3.8 },
      NSW:{ code:"NSW", name:"New South Wales", landmark:"Harbour Bridge", icon:"Surfboard", badge:"Bridge Conqueror", iconMark:"🏄", loop:1.15 },
      QLD:{ code:"QLD", name:"Queensland", landmark:"Great Barrier Reef", icon:"Pineapple", badge:"Sunshine Lifter", iconMark:"🍍", loop:2 },
      WA:{ code:"WA", name:"Western Australia", landmark:"Rottnest Island", icon:"Quokka", badge:"Quokka Mate", iconMark:"🐹", loop:10 },
      SA:{ code:"SA", name:"South Australia", landmark:"Barossa Hills", icon:"Grape Cluster", badge:"Valley Walker", iconMark:"🍇", loop:8 },
      TAS:{ code:"TAS", name:"Tasmania", landmark:"Cradle Mountain", icon:"Tasmanian Tiger", badge:"Mountain Climber", iconMark:"⛰️", loop:12 },
      ACT:{ code:"ACT", name:"Australian Capital Territory", landmark:"Capital Hill", icon:"Parliament Dome", badge:"Capital Champ", iconMark:"🏛️", loop:3.2 },
      NT:{ code:"NT", name:"Northern Territory", landmark:"Uluru", icon:"Red Desert Sand", badge:"Outback Explorer", iconMark:"🏜️", loop:9.4 }
    };
    const MILE = {
      pie:0.22,
      vegemite:0.4,
      roo:85,
      cruiser:2800,
      roadtrain:10000,
      mcgPitch:0.165,
      tan:3.8,
      aflGame:15,
      uluru:9.4,
      sydPerth:3930
    };
    const GACHA = [
      {type:"char", id:"tradie", name:"Tradie in high-vis", line:"Boots dusty, pump cover on, already a unit."},
      {type:"char", id:"mullet", name:"Mullet & short shorts", line:"1987 called, said you're jacked."},
      {type:"char", id:"barefoot", name:"Barefoot deadlifter", line:"Thongs off, bar flying."},
      {type:"char", id:"lifeguard", name:"Beach lifeguard", line:"Zinc on the nose, still hitting records."},
      {type:"char", id:"sizzle", name:"Sausage-sizzle champ", line:"Onion optional, records not."}
    ];

    /* ===================== store ===================== */
    const $ = (id) => document.getElementById(id);
    const DEFAULT_PREFS = { roast:false, squad:false, agreed:false, spin:"", a2hs:false, char:"", mode:"solo", privacy:"full", mateId:"", backupCode:"", compare:"1m", handle:"Aussie", mates:[], state:"VIC", cardSkin:"cream", unit:"kg", updatedAt:0 };
    let prefs = Object.assign({}, DEFAULT_PREFS, JSON.parse(localStorage.getItem("mwPrefs")||"{}"));
    if(!Array.isArray(prefs.mates)) prefs.mates=[];
    if(!STATES[prefs.state]) prefs.state="VIC";
    if(prefs.unit!=="lbs") prefs.unit="kg";
    let logs = JSON.parse(localStorage.getItem("mwLogs")||"[]");
    let unlocks = Object.assign({voices:[],chars:[]}, JSON.parse(localStorage.getItem("mwUnlocks")||"{}"));
    const state = { page:"today", result:null, bgPhoto:null, aiPhoto:null, goal:"bulk", liveRank:null, profileRank:null, chart:null, soloChart:null, cal:null, prop:{ x:0.5, y:0.46, s:1 }, pointers:new Map(), shareMode:"today", shareFrom:"", shareTo:"", shareKind:"solo", versus:null, cloud:"local", syncing:false };

    const persistPrefs = () => localStorage.setItem("mwPrefs", JSON.stringify(prefs));
    const persistLogs = () => localStorage.setItem("mwLogs", JSON.stringify(logs));
    const persistUnlocks = () => localStorage.setItem("mwUnlocks", JSON.stringify(unlocks));
    function touchLocal(){ prefs.updatedAt=Date.now(); }
    const savePrefs = () => { touchLocal(); persistPrefs(); persistIdCookie(); scheduleCloudSync(); };
    const saveLogs = () => { persistLogs(); touchLocal(); persistPrefs(); scheduleCloudSync(); };
    const saveUnlocks = () => { persistUnlocks(); touchLocal(); persistPrefs(); scheduleCloudSync(); };
    function hasPass(){ return !!prefs.squad; }
    function isGoldCard(){ return hasPass() && (prefs.cardSkin||"gold")==="gold"; }

    const CLOUD_ROOT = (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL) || (window.__ENV && window.__ENV.NEXT_PUBLIC_FIREBASE_DATABASE_URL) || "";
    const MATE_ID_RE = /^MATE-[A-Z0-9]{5}$/;
    const LEGACY_ID_RE = /^MW-\d{4}$/;
    const BACKUP_RE = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    function randToken(n){
      const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const buf=new Uint8Array(n);
      if(crypto&&crypto.getRandomValues) crypto.getRandomValues(buf);
      else for(let i=0;i<n;i++) buf[i]=Math.floor(Math.random()*256);
      return Array.from(buf,b=>chars[b%chars.length]).join("");
    }
    function newMateId(){ return "MATE-"+randToken(5); }
    function newBackupCode(){ const t=randToken(12); return t.slice(0,4)+"-"+t.slice(4,8)+"-"+t.slice(8); }
    function isMatesId(id){ return MATE_ID_RE.test(id||""); }
    function isBackupCode(code){ return BACKUP_RE.test(code||""); }
    function hubRead(){ try{ return JSON.parse(localStorage.getItem("mwCloudHub")||"{}"); }catch(e){ return {}; } }
    function hubWrite(map){ localStorage.setItem("mwCloudHub", JSON.stringify(map)); }
    function cloudSnapshot(){
      return {
        mateId: prefs.mateId,
        backupCode: prefs.backupCode,
        handle: prefs.handle||"Aussie",
        privacy: prefs.privacy||"full",
        state: prefs.state||"VIC",
        prefs: {
          roast:!!prefs.roast, squad:!!prefs.squad, agreed:!!prefs.agreed,
          spin:prefs.spin||"", a2hs:!!prefs.a2hs, char:prefs.char||"",
          mode:prefs.mode||"solo", compare:prefs.compare||"1m",
          handle:prefs.handle||"Aussie", mates:Array.isArray(prefs.mates)?prefs.mates:[],
          state:prefs.state||"VIC", privacy:prefs.privacy||"full",
          cardSkin:prefs.cardSkin||"cream", unit:prefs.unit==="lbs"?"lbs":"kg"
        },
        logs: Array.isArray(logs)?logs:[],
        unlocks: unlocks||{voices:[],chars:[]},
        updatedAt: Number(prefs.updatedAt)||Date.now()
      };
    }
    function cloudUrl(id){ return CLOUD_ROOT+"/mates/"+encodeURIComponent(id)+".json"; }
    function cloudCodeUrl(code){ return CLOUD_ROOT+"/codes/"+encodeURIComponent(code)+".json"; }
    function hubPut(doc){
      if(!doc||!doc.mateId) return;
      const map=hubRead();
      map[doc.mateId]=doc;
      if(doc.backupCode) map[doc.backupCode]=doc.mateId;
      hubWrite(map);
    }
    function hubGet(key){
      const map=hubRead();
      const hit=map[key];
      if(!hit) return null;
      if(typeof hit==="string") return map[hit]||null;
      return hit;
    }
    async function cloudPut(doc){
      hubPut(doc);
      if(!CLOUD_ROOT){ state.cloud="local"; return false; }
      try{
        const body=JSON.stringify(doc);
        const res=await fetch(cloudUrl(doc.mateId), {
          method:"PUT",
          headers:{ "Content-Type":"application/json" },
          body
        });
        if(!res.ok) throw new Error("cloud "+res.status);
        if(doc.backupCode){
          fetch(cloudCodeUrl(doc.backupCode), {
            method:"PUT",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify({ mateId: doc.mateId })
          }).catch(()=>{});
        }
        state.cloud="ok";
        cloudTries=0;
        return true;
      }catch(e){
        state.cloud="local";
        if(hasPass() && cloudTries<4){
          cloudTries++;
          setTimeout(()=>{ cloudPut(cloudSnapshot()).then(paintIdentity); }, 2800*cloudTries);
        }
        return false;
      }
    }
    async function cloudGet(key){
      const k=(key||"").trim().toUpperCase();
      if(!CLOUD_ROOT){
        if(isBackupCode(k)) return hubGet(k);
        const local=hubGet(k);
        if(local){ state.cloud="local"; return local; }
        return null;
      }
      if(isBackupCode(k)){
        try{
          const res=await fetch(cloudCodeUrl(k));
          if(res.ok){
            const ref=await res.json();
            if(ref && ref.mateId) return cloudGet(ref.mateId);
          }
        }catch(e){}
        const aliased=hubGet(k);
        if(aliased) return aliased;
        return null;
      }
      try{
        const res=await fetch(cloudUrl(k));
        if(res.ok){
          const doc=await res.json();
          if(doc && doc.mateId){ hubPut(doc); state.cloud="ok"; return doc; }
        }
      }catch(e){}
      const local=hubGet(k);
      if(local){ state.cloud="local"; return local; }
      return null;
    }
    let cloudTimer=null;
    let cloudTries=0;
    function persistIdCookie(){
      if(!isMatesId(prefs.mateId)) return;
      try{ document.cookie="mwMate="+prefs.mateId+";max-age=31536000;path=/;SameSite=Lax"; }catch(e){}
    }
    function readIdCookie(){
      try{
        const m=String(document.cookie||"").match(/mwMate=(MATE-[A-Z0-9]{5})/);
        return m ? m[1] : "";
      }catch(e){ return ""; }
    }
    function clearIdCookie(){
      try{ document.cookie="mwMate=;max-age=0;path=/"; }catch(e){}
    }
    function scheduleCloudSync(){
      if(!prefs.mateId) return;
      clearTimeout(cloudTimer);
      cloudTimer=setTimeout(()=>{ cloudPut(cloudSnapshot()).then(paintIdentity); }, hasPass()?400:700);
    }
    function applyCloudProfile(doc){
      if(!doc || !isMatesId(doc.mateId)) return false;
      logs = Array.isArray(doc.logs) ? doc.logs.slice() : [];
      unlocks = Object.assign({voices:[],chars:[]}, doc.unlocks||{});
      const p=doc.prefs||{};
      prefs = Object.assign({}, DEFAULT_PREFS, p, {
        mateId: doc.mateId,
        backupCode: doc.backupCode || newBackupCode(),
        handle: doc.handle || p.handle || "Aussie",
        privacy: doc.privacy || p.privacy || "full",
        state: doc.state || p.state || "VIC",
        mates: Array.isArray(p.mates) ? p.mates : (Array.isArray(doc.mates)?doc.mates:[]),
        updatedAt: Number(doc.updatedAt||p.updatedAt||Date.now())
      });
      if(prefs.squad && !prefs.cardSkin) prefs.cardSkin="gold";
      persistPrefs(); persistLogs(); persistUnlocks(); persistIdCookie();
      return true;
    }
    function ensureMateId(){
      ensureIdentity();
      return prefs.mateId;
    }
    function ensureIdentity(){
      let dirty=false;
      const prev=prefs.mateId;
      if(!isMatesId(prefs.mateId)){
        prefs.mateId=newMateId();
        dirty=true;
        if(LEGACY_ID_RE.test(prev)){
          const map=hubRead();
          map[prev]=prefs.mateId;
          hubWrite(map);
        }
      }
      if(!isBackupCode(prefs.backupCode)){ prefs.backupCode=newBackupCode(); dirty=true; }
      if(dirty) persistPrefs();
      persistIdCookie();
      return prefs.mateId;
    }
    function paintIdentity(){
      const id=ensureIdentity();
      const line=$("settingsMateLine");
      if(line) line.textContent="Your Mates ID: "+id;
      if($("settingsMateId")) $("settingsMateId").textContent=id;
      if($("settingsBackupCode")) $("settingsBackupCode").textContent=prefs.backupCode||"----";
      if($("myMateId")) $("myMateId").textContent=id;
      if($("cloudStatus")){
        if(hasPass()){
          $("cloudStatus").textContent = state.cloud==="ok"
            ? "Auto backup on. Restores on this ID automatically."
            : "Auto backup queued. Will sync when the network’s back.";
        } else {
          $("cloudStatus").textContent = state.cloud==="ok"
            ? "Synced to the cloud under "+id+"."
            : "Saved on this device. Squad Pass unlocks full auto restore.";
        }
      }
      if($("dataNote")){
        $("dataNote").textContent = hasPass()
          ? "Squad Pass: logs back up automatically and restore on this ID if you switch devices."
          : "Logs live on this device. Cloud sync is on. Squad Pass adds full auto restore.";
      }
    }
    async function bootCloud(){
      ensureIdentity();
      const cookieId=readIdCookie();
      if(hasPass() && isMatesId(cookieId) && cookieId!==prefs.mateId && logs.length===0){
        prefs.mateId=cookieId;
        persistPrefs();
      }
      persistIdCookie();
      if(hasPass() && prefs.cardSkin!=="cream"){
        if(prefs.cardSkin!=="gold"){ prefs.cardSkin="gold"; persistPrefs(); }
      }
      try{
        const remote=await cloudGet(prefs.mateId);
        const remoteTs=Number(remote&&remote.updatedAt||0);
        const localTs=Number(prefs.updatedAt||0);
        const remoteLogs=remote && Array.isArray(remote.logs) ? remote.logs.length : 0;
        if(hasPass() && remote && remoteTs>localTs && remoteLogs>=logs.length){
          applyCloudProfile(remote);
          renderAll();
          applyShareChrome();
          applyShareMode();
          toast("Restored from cloud.");
        } else {
          if(!prefs.updatedAt){ prefs.updatedAt=Date.now(); persistPrefs(); }
          await cloudPut(cloudSnapshot());
        }
      }catch(e){
        scheduleCloudSync();
      }
      paintIdentity();
    }

    /* ===================== helpers ===================== */
    const pick = (a) => a[Math.floor(Math.random()*a.length)];
    const num = (id) => Number($(id).value)||0;
    const dayKey = (d) => { const x=d||new Date(); return new Date(x.getTime()-x.getTimezoneOffset()*6e4).toISOString().slice(0,10); };
    const todayKey = () => dayKey();
    function shiftDay(key, delta){ const d=new Date(key+"T00:00:00"); d.setDate(d.getDate()+delta); return dayKey(d); }
    const volume = (w,r,s) => Math.round(Math.max(0,w)*Math.max(1,r)*Math.max(1,s));
    const KG_TO_LBS = 2.20462;
    const weightUnit = () => prefs.unit==="lbs" ? "lbs" : "kg";
    const isLbs = () => weightUnit()==="lbs";
    const toDisplayW = (kg) => isLbs() ? (Number(kg)||0)*KG_TO_LBS : (Number(kg)||0);
    const fromDisplayW = (val) => isLbs() ? (Number(val)||0)/KG_TO_LBS : (Number(val)||0);
    const fmtW = (v) => (Math.round(v*10)/10).toLocaleString("en-AU");
    const fmtMass = (kg) => Math.round(toDisplayW(kg)).toLocaleString("en-AU")+" "+weightUnit();
    const fmtKg = (v) => fmtMass(v);
    function liftDispUnit(t){ return isCardio(t) ? "km" : weightUnit(); }
    function liftLabel(t){ return isCardio(t) ? "Top distance (km)" : "Top weight ("+weightUnit()+")"; }
    function fmtTop(w, t){ return isCardio(t) ? fmtW(w)+" km" : fmtW(toDisplayW(w))+" "+weightUnit(); }
    function inputKg(id){ return fromDisplayW(num(id)); }
    function logInputKg(){
      const raw=num("logWeight");
      return isCardio($("logWorkout").value) ? raw : fromDisplayW(raw);
    }
    const pies = (v) => Math.round((v/MILE.pie)*10)/10;
    const currentState = () => STATES[prefs.state] || STATES.VIC;
    const isCardio = (t) => !!(LIFTS[t] && LIFTS[t].unit==="km");
    const lifetimeLiftKg = () => logs.reduce((n,l)=>n+(isCardio(l.t)?0:l.v),0);
    const lifetimeRunKm = () => logs.reduce((n,l)=>n+(isCardio(l.t)?Math.max(0,l.w):0),0);
    const fmtKm = (v) => {
      const n=Math.round(v*10)/10;
      return n.toLocaleString("en-AU")+" km";
    };
    function niceQty(n){
      const rounded = n>=10 ? Math.round(n) : Math.round(n*10)/10;
      const words={1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",9:"nine",10:"ten"};
      if(Number.isInteger(rounded) && words[rounded]) return words[rounded];
      return rounded.toLocaleString("en-AU");
    }
    const LIFT_COMMON = [
      { u:0.22, name:"Classic Meat Pies" },
      { u:0.4, name:"Aussie Yeast Spread Jars" },
      { u:85, name:"Red Kangaroos" },
      { u:2800, name:"Heavy 4x4 Off-Roaders" },
      { u:10000, name:"Outback Road Trains" }
    ];
    const LIFT_STATE = {
      VIC:[{ u:16000, name:"city trams" }],
      NSW:[{ u:3.5, name:"surfboards" }],
      QLD:[{ u:1.5, name:"pineapples" }],
      WA:[{ u:3.5, name:"quokkas" }],
      SA:[{ u:2, name:"grape clusters" }],
      TAS:[{ u:12, name:"mountain packs" }],
      ACT:[{ u:14, name:"parliament steps" }],
      NT:[{ u:25, name:"red desert sandbags" }]
    };
    const RUN_NATIONAL = [
      { u:0.165, name:"Pitches of MCG Stadium" },
      { u:3.8, name:"Laps of The Tan Track" },
      { u:15, name:"AFL Match Runs" },
      { u:9.4, name:"Laps of Uluru" },
      { u:3930, name:"Crossings of Australia (Sydney to Perth)" }
    ];
    const RUN_STATE = {
      VIC:[{ u:3.8, name:"Laps of The Tan Track" }],
      NSW:[{ u:1.15, name:"Harbour Bridge walks" }],
      QLD:[{ u:2, name:"Great Barrier Reef boardwalks" }],
      WA:[{ u:10, name:"Rottnest Island loops" }],
      SA:[{ u:8, name:"Barossa Hills walks" }],
      TAS:[{ u:12, name:"Cradle Mountain climbs" }],
      ACT:[{ u:3.2, name:"Capital Hill walks" }],
      NT:[{ u:9.4, name:"Laps of Uluru" }]
    };
    function liftLocals(){
      return LIFT_COMMON.concat(LIFT_STATE[currentState().code]||[]);
    }
    function runLocals(){
      return RUN_NATIONAL.concat(RUN_STATE[currentState().code]||[]);
    }
    function analogHash(s){
      let h=2166136261;
      for(let i=0;i<s.length;i++) h=Math.imul(h^s.charCodeAt(i), 16777619);
      return Math.abs(h);
    }
    function analogPick(value, items, kind){
      const scored=items.map(it=>({ name:it.name, q:value/it.u })).filter(it=>it.q>=1.12 && it.q<=420);
      const fallback=items.map(it=>({ name:it.name, q:value/it.u }));
      const sweet=scored.filter(it=>it.q>=2 && it.q<=48);
      const mid=scored.filter(it=>it.q>=1.4 && it.q<=90);
      const pool=(sweet.length>=2 ? sweet : (mid.length ? mid : (scored.length ? scored : fallback))).slice().sort((a,b)=>a.name.localeCompare(b.name));
      if(!pool.length) return "Log a sesh";
      const dayN=Math.floor(Date.parse(todayKey()+"T00:00:00")/864e5);
      const a=pool[(dayN+analogHash(kind||"x"))%pool.length];
      return niceQty(a.q)+" "+a.name;
    }
    function versusUnit(kg){
      const m=liftMilestone(Math.max(kg,1));
      const units={
        pie:{ u:MILE.pie, name:"Classic Meat Pies" },
        yeast:{ u:MILE.vegemite, name:"Aussie Yeast Spread Jars" },
        roo:{ u:MILE.roo, name:"Red Kangaroos" },
        "4x4":{ u:MILE.cruiser, name:"Heavy 4x4 Off-Roaders" },
        train:{ u:MILE.roadtrain, name:"Outback Road Trains" }
      };
      return units[m.id]||units.pie;
    }
    function versusAnalogQty(kg, unit){
      const u=unit||versusUnit(kg);
      return "Equivalent to "+niceQty((kg||0)/u.u)+" "+u.name;
    }
    function versusAnalogPair(kgYou, kgMate){
      const unit=versusUnit(Math.max(kgYou, kgMate, 1));
      return { you: versusAnalogQty(kgYou, unit), mate: versusAnalogQty(kgMate, unit), unit };
    }
    function isVersusCard(){ return !!(state.versus && state.shareKind==="versus"); }
    function fmtRange(from, to){
      if(!from || !to || from===to) return fmtDay(from||to||todayKey());
      const a=new Date(from+"T00:00:00"), b=new Date(to+"T00:00:00");
      const sameMonth=a.getMonth()===b.getMonth() && a.getFullYear()===b.getFullYear();
      const left=a.toLocaleDateString("en-AU",{day:"numeric", month:sameMonth?undefined:"short"});
      const right=b.toLocaleDateString("en-AU",{weekday:undefined, day:"numeric", month:"short"});
      return left+" – "+right;
    }
    function spanDays(from, to){
      return Math.max(1, Math.round((new Date(to+"T00:00:00")-new Date(from+"T00:00:00"))/864e5)+1);
    }
    function shareWindow(){
      const t=todayKey();
      const mode=state.shareMode||"today";
      if(mode==="week"){
        const from=weekStart(t);
        return { mode, from, to:t, kicker:"This week", stamp:fmtRange(from,t) };
      }
      if(mode==="month"){
        const from=t.slice(0,8)+"01";
        const name=new Date(t+"T00:00:00").toLocaleDateString("en-AU",{month:"long"});
        return { mode, from, to:t, kicker:name, stamp:fmtRange(from,t) };
      }
      if(mode==="custom"){
        let from=state.shareFrom||shiftDay(t,-6);
        let to=state.shareTo||t;
        if(from>to){ const x=from; from=to; to=x; }
        const n=spanDays(from,to);
        return { mode, from, to, kicker: n===1 ? "Today" : n+" days", stamp:fmtRange(from,to) };
      }
      return { mode:"today", from:t, to:t, kicker:"Today", stamp:fmtDay(t) };
    }
    function todayLogs(){ const k=todayKey(); return logs.filter(l=>l.d===k); }
    function shareCopy(){
      const win=shareWindow();
      const day=logs.filter(l=>l.d>=win.from && l.d<=win.to);
      const kg=day.reduce((n,l)=>n+(isCardio(l.t)?0:l.v),0);
      const km=day.reduce((n,l)=>n+(isCardio(l.t)?Math.max(0,l.w):0),0);
      const rows=[];
      if(kg>0) rows.push({ hero:fmtKg(kg), line:"Equivalent to "+analogPick(kg, liftLocals(), "kg") });
      if(km>0) rows.push({ hero:fmtKm(km), line:"Equal to "+analogPick(km, runLocals(), "km") });
      let kicker=win.kicker;
      if(win.mode==="today" && day.length===1) kicker=LIFTS[day[0].t].name;
      if(!rows.length) return { kicker:win.kicker, stamp:win.stamp, rows:[{ hero:"Log a sesh", line:"Nothing in this window yet" }] };
      return { kicker, stamp:win.stamp, rows };
    }
    const round1 = (v) => Math.round(v*10)/10;
    function fmtDay(key){ return new Date(key+"T00:00:00").toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"}); }
    function fmtShort(key){ return new Date(key+"T00:00:00").toLocaleDateString("en-AU",{day:"numeric",month:"short"}); }
    function weekStart(key){ const d=new Date(key+"T00:00:00"); d.setDate(d.getDate()-((d.getDay()+6)%7)); return dayKey(d); }
    function weekLabel(startKey){
      const a=new Date(startKey+"T00:00:00"), b=new Date(startKey+"T00:00:00");
      b.setDate(b.getDate()+6);
      const same=a.getMonth()===b.getMonth();
      return a.toLocaleDateString("en-AU",{day:"numeric",month:same?undefined:"short"})+" – "+b.toLocaleDateString("en-AU",{day:"numeric",month:"short"});
    }
    function setsOf(container){ const on=$(container).querySelector("button.on"); return on?Number(on.dataset.n):3; }
    function buildSets(container, selected){
      const box=$(container); box.innerHTML="";
      for(let n=1;n<=10;n++){
        const b=document.createElement("button");
        b.type="button"; b.dataset.n=String(n); b.textContent=String(n);
        if(n===selected) b.classList.add("on");
        box.appendChild(b);
      }
    }
    function buzz(p){ try{ navigator.vibrate && navigator.vibrate(p||[28]); }catch(e){} }
    function toast(msg, accent){
      const t=$("toast");
      t.textContent=msg;
      t.classList.toggle("accent", !!accent);
      t.classList.add("show");
      clearTimeout(toast._t);
      toast._t=setTimeout(()=>t.classList.remove("show"),2400);
    }

    /* ===================== rank badges ===================== */
    function rankByVolume(v){ let r=RANKS[0]; RANKS.forEach(x=>{ if(v>=x.volume) r=x; }); return r; }
    function nextRank(rank){ const i=RANKS.findIndex(r=>r.id===rank.id); return RANKS[i+1]||null; }
    function rankBySet(w, lift){
      const km = lift && LIFTS[lift] && LIFTS[lift].unit==="km";
      let r=RANKS[0]; RANKS.forEach(x=>{ if(w>=(km?x.km:x.weight)) r=x; });
      return r;
    }
    const MARKS = {
      /* enamel / embroidery silhouettes on a 48 disc. Small ears = quokka. Big ears = koala. */
      quokka:[
        {t:"circle", x:17.6, y:15.2, r:3.3, mode:"fill"},
        {t:"circle", x:30.4, y:15.2, r:3.3, mode:"fill"},
        {t:"circle", x:24, y:26.4, r:10.1, mode:"fill"},
        {t:"circle", x:20.4, y:24.2, r:1.45, mode:"knock"},
        {t:"circle", x:27.6, y:24.2, r:1.45, mode:"knock"},
        {t:"arc", x:24, y:27.2, r:4.6, from:Math.PI*0.18, to:Math.PI*0.82, mode:"knock"}
      ],
      koala:[
        {t:"circle", x:12.2, y:16.8, r:7.1, mode:"fill"},
        {t:"circle", x:35.8, y:16.8, r:7.1, mode:"fill"},
        {t:"circle", x:12.2, y:16.8, r:3.4, mode:"knock"},
        {t:"circle", x:35.8, y:16.8, r:3.4, mode:"knock"},
        {t:"circle", x:24, y:27.6, r:9.4, mode:"fill"},
        {t:"circle", x:20.4, y:25.6, r:1.4, mode:"knock"},
        {t:"circle", x:27.6, y:25.6, r:1.4, mode:"knock"},
        {t:"circle", x:24, y:30.4, r:2.2, mode:"knock"}
      ],
      kangaroo:[
        {t:"path", d:[[16.2,7.2],[21.4,22.8],[13.6,21.4]], close:true, mode:"fill"},
        {t:"path", d:[[31.8,7.2],[34.4,21.4],[26.6,22.8]], close:true, mode:"fill"},
        {t:"circle", x:24, y:27.6, r:8.6, mode:"fill"},
        {t:"circle", x:20.6, y:26.4, r:1.35, mode:"knock"},
        {t:"circle", x:27.4, y:26.4, r:1.35, mode:"knock"}
      ],
      croc:[
        {t:"path", d:[[7.6,22.2],[16,16.6],[33.5,18.4],[40.6,23.8],[33.5,29.4],[16,31.2]], close:true, mode:"fill"},
        {t:"circle", x:15.6, y:21.6, r:1.7, mode:"knock"},
        {t:"path", d:[[22,24.6],[25.2,27.6],[28.4,24.6],[31.6,27.6],[34.8,24.8]], mode:"knock"}
      ],
      shark:[
        {t:"path", d:[
          [3.2,12.2],[10.8,22.4],[16.2,17.6],[22.4,5.8],[27.6,17.4],
          [35.8,18.2],[41.8,20.6],[45.2,24.4],[41.4,28],[34,30],
          [28,39.6],[26.2,30.4],[18.2,31.2],[11.2,26.2],[5.6,33.8]
        ], close:true, mode:"fill"},
        {t:"circle", x:37.8, y:23, r:1.55, mode:"knock"},
        {t:"path", d:[[32.2,21.4],[32.2,27.2]], mode:"knock"},
        {t:"path", d:[[34.6,21.8],[34.6,26.6]], mode:"knock"},
        {t:"path", d:[[40,26.2],[43.6,25.2]], mode:"knock"}
      ]
    };
    /* rank disc: stone / charcoal / steel */
    const PATCH = {
      stone:{ mark:"#1A1A18", disc:"#E4E4E1" },
      ink:  { mark:"#121211", disc:"#EEEEEC" },
      steel:{ mark:"#3D4A55", disc:"#E2E5E8" }
    };
    const rankColor = (rank) => (PATCH[rank.tone]||PATCH.stone).mark;
function badgeMarkup(rank, size){
  const skin=PATCH[rank.tone]||PATCH.stone;
  const color=skin.mark, knock=skin.disc;
  const parts=[];
  (MARKS[rank.id]||[]).forEach(m=>{
    const solid = m.mode==="fill";
    const paint = m.mode==="knock" ? knock : color;
    const attrs = solid
      ? 'fill="'+paint+'"'
      : 'fill="none" stroke="'+paint+'" stroke-width="'+(m.mode==="knock"?2:1.8)+'" stroke-linejoin="round" stroke-linecap="round"';
    if(m.t==="circle") parts.push('<circle cx="'+m.x+'" cy="'+m.y+'" r="'+m.r+'" '+(m.mode==="stroke"?attrs:'fill="'+paint+'"')+'/>');
    else if(m.t==="arc") parts.push('<path d="'+arcPath(m)+(m.close?" Z":"")+'" '+attrs+'/>');
    else if(m.t==="bez") parts.push('<path d="'+bezPath(m)+'" '+attrs+'/>');
    else parts.push('<path d="'+polyPath(m)+'" '+attrs+'/>');
  });
  return '<svg viewBox="0 0 48 48" width="'+size+'" height="'+size+'" role="img" aria-label="'+rank.name+' rank">'+
    '<circle cx="24" cy="24" r="23.5" fill="'+skin.disc+'"/>'+
    '<circle cx="24" cy="24" r="22" fill="none" stroke="'+color+'" stroke-width="1.15"/>'+
    parts.join("")+'</svg>';
}
    function polyPath(m){
      return m.d.map((p,i)=>(i?"L":"M")+p[0]+" "+p[1]).join(" ")+(m.close?" Z":"");
    }
    function bezPath(m){
      let d="M"+m.start[0]+" "+m.start[1];
      m.segs.forEach(s=>{ d+=" Q"+s[0]+" "+s[1]+" "+s[2]+" "+s[3]; });
      if(m.line) d+=" L"+m.line[0]+" "+m.line[1];
      (m.back||[]).forEach(s=>{ d+=" Q"+s[0]+" "+s[1]+" "+s[2]+" "+s[3]; });
      return d+" Z";
    }
    function arcPath(m){
      const x1=m.x+Math.cos(m.from)*m.r, y1=m.y+Math.sin(m.from)*m.r;
      const x2=m.x+Math.cos(m.to)*m.r, y2=m.y+Math.sin(m.to)*m.r;
      return "M"+x1.toFixed(2)+" "+y1.toFixed(2)+" A"+m.r+" "+m.r+" 0 0 1 "+x2.toFixed(2)+" "+y2.toFixed(2);
    }
    function setBadge(el, rank, size, animate){
      if(!el) return;
      el.innerHTML=badgeMarkup(rank, size);
      if(animate){ el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
    }
    /* canvas version for the share card */
    function drawBadge(ctx, cx, cy, radius, rankId, color, knock){
      const k=(radius*2)/48, map=(x,y)=>[cx+(x-24)*k, cy+(y-24)*k];
      ctx.save();
      ctx.lineJoin="round"; ctx.lineCap="round";
      ctx.fillStyle=knock;
      ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle=color; ctx.globalAlpha=1; ctx.lineWidth=Math.max(1.2,1.15*k);
      ctx.beginPath(); ctx.arc(cx,cy,radius*0.92,0,Math.PI*2); ctx.stroke();
      ctx.globalAlpha=1;
      (MARKS[rankId]||[]).forEach(m=>{
        const paint = m.mode==="knock" ? knock : color;
        ctx.fillStyle=paint; ctx.strokeStyle=paint;
        ctx.lineWidth=Math.max(1.6,(m.mode==="knock"?2:1.8)*k);
        ctx.beginPath();
        if(m.t==="circle"){ const [x,y]=map(m.x,m.y); ctx.arc(x,y,m.r*k,0,Math.PI*2); }
        else if(m.t==="arc"){ const [x,y]=map(m.x,m.y); ctx.arc(x,y,m.r*k,m.from,m.to); if(m.close) ctx.closePath(); }
        else if(m.t==="bez"){
          const [sx,sy]=map(m.start[0],m.start[1]); ctx.moveTo(sx,sy);
          const curve=(s)=>{ const [c1,c2]=map(s[0],s[1]), [e1,e2]=map(s[2],s[3]); ctx.quadraticCurveTo(c1,c2,e1,e2); };
          m.segs.forEach(curve);
          if(m.line){ const [lx,ly]=map(m.line[0],m.line[1]); ctx.lineTo(lx,ly); }
          (m.back||[]).forEach(curve);
          ctx.closePath();
        }
        else {
          m.d.forEach((p,i)=>{ const [x,y]=map(p[0],p[1]); i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
          if(m.close) ctx.closePath();
        }
        if(m.t==="circle" && m.mode!=="stroke") ctx.fill();
        else if(m.mode==="fill") ctx.fill();
        else ctx.stroke();
      });
      ctx.restore();
    }

    /* ===================== derived data ===================== */
    const sortedLogs = () => logs.slice().sort((a,b)=>a.d===b.d ? a.ts-b.ts : (a.d<b.d?-1:1));
    const lifetimeVolume = () => logs.reduce((n,l)=>n+l.v,0);
    function streakDays(){
      const days=[...new Set(logs.map(l=>l.d))].sort().reverse();
      if(!days.length) return 0;
      if(days[0]!==todayKey() && days[0]!==shiftDay(todayKey(),-1)) return 0;
      let n=1, cursor=days[0];
      for(let i=1;i<days.length;i++){
        if(days[i]===shiftDay(cursor,-1)){ n++; cursor=days[i]; } else break;
      }
      return n;
    }
    function weekBuckets(){
      const map=new Map();
      logs.forEach(l=>{
        const k=weekStart(l.d);
        const b=map.get(k)||{start:k,sessions:0,volume:0,pies:0};
        b.sessions++; b.volume+=l.v; b.pies+=pies(l.v);
        map.set(k,b);
      });
      return [...map.values()].sort((a,b)=>a.start<b.start?1:-1);
    }
    function thisWeek(){
      const k=weekStart(todayKey());
      return weekBuckets().find(b=>b.start===k) || {start:k,sessions:0,volume:0,pies:0};
    }
    function personalRecords(){
      const best={};
      logs.forEach(l=>{ const cur=best[l.t]; if(!cur || l.w>cur.w || (l.w===cur.w && l.r>cur.r)) best[l.t]=l; });
      return best;
    }
    const lastOfLift = (t) => sortedLogs().filter(l=>l.t===t).pop() || null;
    const bestVolume = (t) => logs.filter(l=>l.t===t).reduce((m,l)=>Math.max(m,l.v),0);
    function topRecord(){
      const best=personalRecords(); let out=null;
      Object.keys(best).forEach(t=>{ if(!out || best[t].w>out.w || (best[t].w===out.w && best[t].v>out.v)) out=best[t]; });
      return out;
    }

    /* ===================== banter ===================== */
    const pack = () => (prefs.squad && unlocks.legend) ? LEGEND : BANTER;
    function tierOf(delta){ if(delta>=8) return "big"; if(delta>=2) return "small"; if(delta>-5) return "hold"; return "down"; }
    function liftPool(tier,t){
      const P=pack();
      return (P[tier]||BANTER[tier]||[]).concat((P[t]&&P[t][tier])||(BANTER[t]&&BANTER[t][tier])||[]);
    }
    function stateBanter(tier){
      const st=currentState();
      const lines={
        first:[
          "Day one in "+st.code+". "+st.landmark+" is waiting.",
          "Ledger's open. "+st.badge+" status starts now."
        ],
        big:[
          "That's a "+st.badge+" sesh at "+st.landmark+". Deadset.",
          st.icon+" energy. "+st.landmark+" just stood up.",
          "Fair dinkum unit. Wear the "+st.badge+" badge."
        ],
        small:[
          "Tidy tick-up. "+st.landmark+" would almost nod at that.",
          "Getting closer to "+st.badge+" territory."
        ],
        hold:[
          "Still short of a lap of "+st.landmark+".",
          "That's a warm-up, not a "+st.badge+" story."
        ],
        down:[
          "That load wouldn't even budge a "+st.icon.toLowerCase()+".",
          "Mate, "+st.landmark+" didn't even notice.",
          "Soft as a missed loop of "+st.landmark+"."
        ],
        pr:[
          "New PB. "+st.landmark+" can hear it.",
          "Record's yours. "+st.badge+" material."
        ],
        roast:[
          "Posted it anyway. "+st.badge+" wouldn't claim this one.",
          "Servo-snack sesh. Save "+st.landmark+" for someone who earned it."
        ],
        win:["You smoked 'em. "+st.badge+" keeps the belt."],
        draw:["Too close. Split a lap of "+st.landmark+" and go again."],
        loss:["You got cooked. Back to "+st.landmark+" until you fix it."]
      };
      return lines[tier]||[];
    }
    function sessionVerdict(entry, prev, isPr){
      const P=pack();
      if(prefs.roast) return { text:pick(stateBanter("roast").concat(P.roast||BANTER.roast)), tier:"roast" };
      if(isPr) return { text:pick(stateBanter("pr").concat(P.pr||BANTER.pr)), tier:"pr" };
      if(!prev) return { text:pick(stateBanter("first").concat(P.first||BANTER.first)), tier:"first" };
      const delta=((entry.v-prev.v)/Math.max(prev.v,1))*100;
      const tier=tierOf(delta);
      return { text:pick(stateBanter(tier).concat(liftPool(tier,entry.t))), tier, delta };
    }
    function punishLine(loser, penalty){
      const tag="@"+String(loser).replace(/\s+/g,"");
      const line=(penalty||"").trim();
      return line ? "Friendly Challenge for "+tag+": "+line+"." : "Friendly Challenge for "+tag+".";
    }
    function liftMilestone(kg){
      const piesN=kg/MILE.pie, jars=kg/MILE.vegemite, roos=kg/MILE.roo, cars=kg/MILE.cruiser, trains=kg/MILE.roadtrain;
      let id="pie", label=niceQty(piesN)+" Classic Meat Pies", punch="Equivalent to "+niceQty(piesN)+" Classic Meat Pies 🥧";
      if(kg>=MILE.roadtrain){
        id="train"; label=niceQty(trains)+" Outback Road Trains";
        punch="Equivalent to "+niceQty(trains)+" Outback Road Trains 🚛";
      } else if(kg>=MILE.cruiser){
        id="4x4"; label=niceQty(cars)+" Heavy 4x4 Off-Roaders";
        punch="Equivalent to "+niceQty(cars)+" Heavy 4x4 Off-Roaders 🚙";
      } else if(kg>=MILE.roo){
        id="roo"; label=niceQty(roos)+" Red Kangaroos";
        punch="Equivalent to "+niceQty(roos)+" Red Kangaroos 🦘";
      } else if(kg>=8){
        id="yeast"; label=niceQty(jars)+" Aussie Yeast Spread Jars";
        punch="Equivalent to "+niceQty(jars)+" Aussie Yeast Spread Jars 🫙";
      }
      return { id, punch, pies:piesN, jars, roos, cars, trains, label };
    }
    function runMilestone(km){
      const pitches=km/MILE.mcgPitch, tan=km/MILE.tan, games=km/MILE.aflGame, uluru=km/MILE.uluru, crossing=km/MILE.sydPerth;
      let punch="Log a run and we start the ledger.", label="Hit the road";
      if(km>=4000){
        punch = crossing>=1.2
          ? "Equal to "+niceQty(crossing)+" crossings of Australia (Sydney to Perth) 🇦🇺"
          : "Equal to Crossing Australia (Sydney to Perth) 🇦🇺";
        label = crossing>=1.2 ? niceQty(crossing)+" Australia crossings" : "Crossing Australia";
      } else if(km>=100){
        punch="Equal to "+niceQty(uluru)+" Laps of Uluru 🪨";
        label=niceQty(uluru)+" Uluru laps";
      } else if(km>=15){
        punch="Equal to "+niceQty(games)+" AFL Match Runs 🏃";
        label=niceQty(games)+" AFL Match Runs";
      } else if(km>=MILE.tan){
        punch="Equal to "+niceQty(tan)+" Laps of The Tan Track 🏃‍♂️";
        label=niceQty(tan)+" Tan Track laps";
      } else if(km>0){
        punch="Equal to "+niceQty(pitches)+" Pitches of MCG Stadium 🏟️";
        label=niceQty(pitches)+" MCG pitches";
      }
      return { punch, label, pitches, tan, games, uluru, crossing };
    }
    function renderLegend(){
      const st=currentState();
      const kg=lifetimeLiftKg(), km=lifetimeRunKm();
      const lift=liftMilestone(kg), run=runMilestone(km);
      $("legendTitle").textContent=st.badge;
      $("legendState").textContent=st.code;
      $("legendKg").textContent=fmtKg(kg);
      $("legendPunch").textContent = kg>0 ? lift.punch : "Log a lift and we start the ledger.";
      $("legendKm").textContent=fmtKm(km)+" run";
      $("legendRunPunch").textContent=run.punch;
      const runCell = km>=4000
        ? [niceQty(run.crossing), "Australia crossings"]
        : km>=100 ? [niceQty(run.uluru), "Uluru laps"]
        : km>=15 ? [niceQty(run.games), "AFL Match Runs"]
        : km>=MILE.tan ? [niceQty(run.tan), "Tan Track laps"]
        : [niceQty(run.pitches), "MCG pitches"];
      const cells=[
        [niceQty(lift.pies), "Classic Meat Pies"],
        [niceQty(lift.jars), "Yeast spread jars"],
        [niceQty(lift.roos), "Red Kangaroos"],
        [niceQty(lift.cars), "Heavy 4x4s"],
        [niceQty(lift.trains), "Road trains"],
        runCell
      ];
      $("legendGrid").innerHTML=cells.map(c=>
        '<div class="legend-cell"><b class="tnum">'+c[0]+'</b><span>'+c[1]+'</span></div>'
      ).join("");
    }
    function applyStateChrome(){
      const st=currentState();
      if($("wkBeerLabel")) $("wkBeerLabel").textContent=st.icon;
      if($("wkBeers")) $("wkBeers").textContent=st.iconMark;
      if($("stateSelect")) $("stateSelect").value=st.code;
      if($("stateMeta")) $("stateMeta").textContent=st.landmark+" · "+st.icon+" · "+st.badge;
      applyWagers();
    }
    const WAGER_KIND = {
      selfie:()=>"Send a funny selfie to the group",
      pushups:()=>"Drop and do 10 push-ups now",
      plank:()=>"Hold a 30-second plank",
      lap:()=>"Jog one easy lap"
    };
    function presetChallenge(){
      const on=document.querySelector("[data-wager-kind].on");
      const kind=on?on.dataset.wagerKind:"pushups";
      return (WAGER_KIND[kind]||WAGER_KIND.pushups)();
    }
    function challengeText(){
      const typed=(($("challengeLine")&&$("challengeLine").value)||"").trim();
      return typed || presetChallenge();
    }
    function defaultPenalty(){ return challengeText(); }
    function fillPenalties(line){
      if($("challengeLine")) $("challengeLine").value=line;
      document.querySelectorAll("[data-penalty]").forEach(el=>{ el.value=line; });
    }
    function syncChallengePills(){
      const v=(($("challengeLine")&&$("challengeLine").value)||"").trim();
      let matched=false;
      document.querySelectorAll("[data-wager-kind]").forEach(b=>{
        const line=(WAGER_KIND[b.dataset.wagerKind]||WAGER_KIND.pushups)();
        b.dataset.wager=line;
        const on=!!v && line===v;
        b.classList.toggle("on", on);
        if(on) matched=true;
      });
      return matched;
    }
    function applyWagers(){
      document.querySelectorAll("[data-wager-kind]").forEach(b=>{
        b.dataset.wager=(WAGER_KIND[b.dataset.wagerKind]||WAGER_KIND.pushups)();
      });
      if($("challengeLine") && !($("challengeLine").value||"").trim()){
        const push=document.querySelector('[data-wager-kind="pushups"]');
        if(push) push.classList.add("on");
        $("challengeLine").value=presetChallenge();
      }
      syncChallengePills();
    }

    /* ===================== share card ===================== */
    const CARD_FONT = 'Inter,-apple-system,"Helvetica Neue",Arial,sans-serif';
    function tracked(ctx,text,x,y,track){
      if(!track){ ctx.fillText(text,x,y); return; }
      if("letterSpacing" in ctx){
        const prev=ctx.letterSpacing; ctx.letterSpacing=track+"px";
        ctx.fillText(text,x,y); ctx.letterSpacing=prev; return;
      }
      const chars=Array.from(text);
      const total=chars.reduce((n,ch)=>n+ctx.measureText(ch).width+track,0)-track;
      let cx = ctx.textAlign==="center" ? x-total/2 : (ctx.textAlign==="right" ? x-total : x);
      const align=ctx.textAlign; ctx.textAlign="left";
      chars.forEach(ch=>{ ctx.fillText(ch,cx,y); cx+=ctx.measureText(ch).width+track; });
      ctx.textAlign=align;
    }
    function drawCover(ctx,img,x,y,w,h){
      const ir=img.width/img.height, rr=w/h; let sx,sy,sw,sh;
      if(ir>rr){ sh=img.height; sw=sh*rr; sx=(img.width-sw)/2; sy=0; }
      else { sw=img.width; sh=sw/rr; sx=0; sy=(img.height-sh)/2; }
      ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
    }
    const PROP_S_MIN = 0.4, PROP_S_MAX = 2.2;
    function syncPropSliders(){
      if($("propScale")) $("propScale").value=String(Math.round((state.prop.s||1)*100));
      if($("propX")) $("propX").value=String(Math.round((state.prop.x||0.5)*100));
      if($("propY")) $("propY").value=String(Math.round((state.prop.y||0.46)*100));
    }
    function resetProp(){
      const versus=isVersusCard();
      const photo=!!state.bgPhoto;
      if(versus){
        state.prop={ x:0.5, y: photo ? 0.64 : 0.52, s:1 };
      } else {
        state.prop={ x:0.5, y: photo ? 0.38 : 0.46, s:1 };
      }
      syncPropSliders();
    }
    function wrapShare(ctx, text, maxW, track){
      const width=t=>ctx.measureText(t).width+Math.max(0,t.length-1)*track;
      if(width(text)<=maxW) return [text];
      const words=text.split(" "), lines=[]; let cur="";
      words.forEach(w=>{
        const t=cur?cur+" "+w:w;
        if(width(t)<=maxW) cur=t;
        else { if(cur) lines.push(cur); cur=w; }
      });
      if(cur) lines.push(cur);
      return lines.slice(0,4);
    }
    function roundRectPath(ctx, x, y, w, h, r){
      const rr=Math.min(r, w/2, h/2);
      ctx.beginPath();
      ctx.moveTo(x+rr, y);
      ctx.arcTo(x+w, y, x+w, y+h, rr);
      ctx.arcTo(x+w, y+h, x, y+h, rr);
      ctx.arcTo(x, y+h, x, y, rr);
      ctx.arcTo(x, y, x+w, y, rr);
      ctx.closePath();
    }
    function drawStamp(ctx, label, x, y, kind, photo){
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(kind==="win" ? -0.12 : kind==="lose" ? 0.12 : 0);
      const long=label.length>=10;
      const track=long?2:4;
      ctx.font="800 "+(long?20:24)+"px "+CARD_FONT;
      ctx.textAlign="center";
      ctx.textBaseline="middle";
      const w=Math.max(ctx.measureText(label).width+Math.max(0,label.length-1)*track+36, 176);
      const h=46;
      const gold=isGoldCard();
      const color=gold
        ? (kind==="win" ? "#E6D5B0" : kind==="lose" ? "#C4A574" : "rgba(196,165,116,.82)")
        : photo
          ? (kind==="win" ? "#FFFFFF" : kind==="lose" ? "rgba(255,255,255,.86)" : "rgba(255,255,255,.78)")
          : (kind==="win" ? "#2A333C" : (kind==="lose" ? "#3D4A55" : "#5A5A56"));
      ctx.strokeStyle=color;
      ctx.lineWidth=4;
      roundRectPath(ctx, -w/2, -h/2, w, h, 4);
      ctx.stroke();
      ctx.fillStyle=color;
      tracked(ctx, label, 0, 2, track);
      ctx.restore();
    }
    function sharePalette(photo){
      if(isGoldCard()){
        return {
          gold:true,
          bg:"#161310",
          ink: photo ? "#F3E6C4" : "#E6D5B0",
          sub: photo ? "rgba(243,230,196,.78)" : "#C4A574",
          mute: photo ? "rgba(243,230,196,.56)" : "#8A7344",
          accent: "#C4A574",
          panel: "rgba(16,13,10,.58)"
        };
      }
      return {
        gold:false,
        bg:"#E6E6E3",
        ink: photo ? "#FFFFFF" : "#121211",
        sub: photo ? "rgba(255,255,255,.74)" : "#5A5A56",
        mute: photo ? "rgba(255,255,255,.58)" : "#888884",
        accent: photo ? "#FFFFFF" : "#3D4A55",
        panel: "rgba(18,18,17,.46)"
      };
    }
    function drawGoldChrome(ctx, W, H, photo){
      if(!isGoldCard()) return;
      const m=42;
      ctx.save();
      ctx.strokeStyle="#C4A574";
      ctx.lineWidth=2.5;
      ctx.strokeRect(m, m, W-m*2, H-m*2);
      ctx.lineWidth=1;
      ctx.globalAlpha=.65;
      ctx.strokeRect(m+12, m+12, W-m*2-24, H-m*2-24);
      ctx.globalAlpha=1;
      ctx.fillStyle=photo ? "rgba(243,230,196,.86)" : "#C4A574";
      ctx.font="700 18px "+CARD_FONT;
      ctx.textAlign="center";
      ctx.textBaseline="alphabetic";
      tracked(ctx, "GOLD", W/2, m+38, 11);
      ctx.restore();
    }
    function fitHeroKg(ctx, text, maxW, maxPx){
      let size=maxPx;
      ctx.font="800 "+size+"px "+CARD_FONT;
      while(size>42 && ctx.measureText(text).width>maxW){
        size-=4;
        ctx.font="800 "+size+"px "+CARD_FONT;
      }
      return size;
    }
    function versusPanel(ctx, x, y, w, h, photo){
      if(!photo && !isGoldCard()) return;
      ctx.save();
      ctx.fillStyle=sharePalette(photo).panel;
      roundRectPath(ctx, x, y, w, h, 28);
      ctx.fill();
      ctx.restore();
    }
    function drawVersusCard(ctx, W, H){
      const v=state.versus;
      const people=(v.people&&v.people.length) ? v.people : [v.you, v.mate].filter(Boolean);
      const photo=!!state.bgPhoto;
      const pal=sharePalette(photo);
      const ink=pal.ink, sub=pal.sub, mute=pal.mute;

      if(photo){
        drawCover(ctx, state.bgPhoto, 0, 0, W, H);
        const top=ctx.createLinearGradient(0,0,0,280);
        top.addColorStop(0, pal.gold ? "rgba(22,19,16,.62)" : "rgba(0,0,0,.45)");
        top.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=top; ctx.fillRect(0,0,W,280);
        const edge=ctx.createRadialGradient(W/2, H*0.42, W*0.2, W/2, H*0.42, W*0.88);
        edge.addColorStop(0,"rgba(0,0,0,0)");
        edge.addColorStop(1, pal.gold ? "rgba(22,19,16,.42)" : "rgba(0,0,0,.32)");
        ctx.fillStyle=edge; ctx.fillRect(0,0,W,H);
      } else {
        ctx.fillStyle=pal.bg;
        ctx.fillRect(0,0,W,H);
      }

      const s=state.prop.s||1;
      ctx.save();
      ctx.translate((state.prop.x||0.5)*W, (state.prop.y||0.52)*H);
      ctx.scale(s,s);
      if(people.length>2) drawSquadVersus(ctx, W, people, photo, ink, sub, mute, v);
      else drawDuoVersus(ctx, W, v, photo, ink, sub, mute);
      ctx.restore();

      ctx.setTransform(1,0,0,1,0,0);
      drawGoldChrome(ctx, W, H, photo);
      ctx.textAlign="center";
      ctx.textBaseline="alphabetic";
      ctx.fillStyle=mute;
      ctx.font="800 20px "+CARD_FONT;
      tracked(ctx, "MATES & WEIGHTS", W/2, H-48, 10);
    }
    function versusStampFor(ranked, idx){
      const tied=ranked[0].v===ranked[ranked.length-1].v;
      if(tied) return { stamp:"LOCKED IN", kind:"draw" };
      if(idx===0) return { stamp:"TOP MATE", kind:"win" };
      if(idx===ranked.length-1) return { stamp:"CHALLENGER", kind:"lose" };
      return { stamp:"PACESETTER", kind:"draw" };
    }
    function topPerkLine(){
      const pool=[
        "Couch is yours. Put ya feet up.",
        "That's a wrap. Chill on the couch.",
        "Park it on the couch, champ.",
        "Feet up, mate. You've earned it.",
        "Go on, have a sit-down. Job's done."
      ];
      const dayN=Math.floor(Date.parse(todayKey()+"T00:00:00")/864e5);
      return pool[dayN%pool.length];
    }
    function versusNote(stamp, kind, penalty){
      if(stamp==="CHALLENGER" || kind==="lose") return { label:"FRIENDLY CHALLENGE", line:(penalty||"").trim() };
      if(stamp==="TOP MATE" || kind==="win") return { label:"EARNED IT", line:topPerkLine() };
      if(stamp==="PACESETTER") return { label:"KEEP PACE", line:"In the mix. Keep having a crack." };
      return { label:"LOCKED IN", line:"Too close. Split a sit-down." };
    }
    function drawVersusPersonCol(ctx, x, colW, p, o){
      const stampY=o.stampY, kgY=o.kgY;
      if(o.stamp) drawStamp(ctx, o.stamp, x, stampY, o.stampKind, o.photo);
      ctx.textAlign="center";
      ctx.textBaseline="alphabetic";
      if(o.kicker){
        ctx.fillStyle=o.mute;
        ctx.font="700 16px "+CARD_FONT;
        tracked(ctx, o.kicker, x, stampY+78, 8);
      }
      ctx.fillStyle=o.ink;
      ctx.font="800 "+(o.namePx||38)+"px "+CARD_FONT;
      wrapShare(ctx, (p.name||"Mate").toUpperCase(), colW, 2).slice(0,2).forEach((ln,i)=>{
        ctx.fillText(ln, x, stampY+126+i*42);
      });
      const kg=fmtKg(p.w);
      ctx.font="800 "+fitHeroKg(ctx, kg, colW, o.kgMax||78)+"px "+CARD_FONT;
      ctx.fillText(kg, x, kgY);
      ctx.fillStyle=o.ink;
      ctx.font="700 24px "+CARD_FONT;
      wrapShare(ctx, o.analog||"", colW, 1).slice(0,2).forEach((ln,i)=>ctx.fillText(ln, x, kgY+52+i*32));
      ctx.fillStyle=o.mute;
      ctx.font="700 16px "+CARD_FONT;
      tracked(ctx, fmtKg(p.v).toUpperCase()+" VOL", x, kgY+126, 3);
      const note=versusNote(o.stamp, o.stampKind, p.penalty);
      ctx.fillStyle=o.mute;
      ctx.font="700 13px "+CARD_FONT;
      tracked(ctx, note.label, x, kgY+156, 3);
      ctx.fillStyle=o.ink;
      ctx.font="700 20px "+CARD_FONT;
      wrapShare(ctx, note.line||"", colW, 0).slice(0,2).forEach((ln,i)=>ctx.fillText(ln, x, kgY+186+i*28));
    }
    function drawVersusHeader(ctx, title, stamp, sub){
      ctx.textAlign="center";
      ctx.textBaseline="alphabetic";
      ctx.fillStyle=sub;
      ctx.font="700 22px "+CARD_FONT;
      tracked(ctx, title, 0, -360, 12);
      ctx.font="700 14px "+CARD_FONT;
      tracked(ctx, "FRIENDLY CHALLENGE", 0, -334, 6);
      ctx.font="700 18px "+CARD_FONT;
      tracked(ctx, String(stamp||fmtDay(todayKey())).toUpperCase(), 0, -308, 7);
    }
    function drawDuoVersus(ctx, W, v, photo, ink, sub, mute){
      const you=v.you||v.people[0], mate=v.mate||v.people[1];
      const analog=versusAnalogPair(you.v||you.w, mate.v||mate.w);
      const tied=v.kind==="draw" || you.v===mate.v;
      const youWin=!tied && you.v>mate.v;
      const leftX=-W*0.23, rightX=W*0.23, colW=W*0.38;
      const stampY=-248, vsY=12, kgY=130;

      versusPanel(ctx, -W*0.46, -408, W*0.92, 796, photo);
      drawVersusHeader(ctx, "MATE BATTLE", v.stamp, sub);

      drawVersusPersonCol(ctx, leftX, colW, you, {
        photo, ink, sub, mute, analog:analog.you, stampY, kgY,
        stamp: tied?"LOCKED IN":(youWin?"TOP MATE":"CHALLENGER"),
        stampKind: tied?"draw":(youWin?"win":"lose"),
        kicker:"YOU"
      });
      drawVersusPersonCol(ctx, rightX, colW, mate, {
        photo, ink, sub, mute, analog:analog.mate, stampY, kgY,
        stamp: tied?"LOCKED IN":(youWin?"CHALLENGER":"TOP MATE"),
        stampKind: tied?"draw":(youWin?"lose":"win"),
        kicker:"MATE"
      });

      ctx.beginPath();
      ctx.arc(0, vsY, 50, 0, Math.PI*2);
      ctx.fillStyle=isGoldCard() && !photo ? "#C4A574" : (photo ? "rgba(18,18,17,.82)" : "#121211");
      ctx.fill();
      ctx.fillStyle=isGoldCard() && !photo ? "#161310" : "#E6E6E3";
      ctx.font="800 30px "+CARD_FONT;
      ctx.textBaseline="middle";
      tracked(ctx, "VS", 0, vsY+2, 6);
      ctx.textBaseline="alphabetic";
    }
    function drawSquadVersus(ctx, W, people, photo, ink, sub, mute, v){
      const ranked=people.slice().sort((a,b)=>b.v-a.v);
      const unit=versusUnit(Math.max(...ranked.map(p=>p.v||p.w||1)));
      const n=ranked.length;
      const cols=n<=3 ? n : 2;
      const rows=Math.ceil(n/cols);
      const stacked=rows>1;
      const stampY=stacked ? -210 : -248, kgY=stacked ? 90 : 130;
      const cellH=stacked ? 540 : 600;
      const headerH=88;
      const gridW=W*0.92;
      const gap=24;
      const colW=Math.min(W*0.38, (gridW-(cols-1)*gap)/cols-8);
      const namePx=cols>=3 ? 30 : 38;
      const kgMax=cols>=3 ? 58 : 72;
      const youKey=v.you ? v.you.name+"|"+v.you.v : "";
      const totalH=headerH+rows*cellH;
      const startY=-totalH/2;

      versusPanel(ctx, -gridW/2, startY-28, gridW, totalH+40, photo);

      ctx.save();
      ctx.translate(0, startY+360);
      drawVersusHeader(ctx, "SQUAD BATTLE", v.stamp, sub);
      ctx.restore();

      ranked.forEach((p, idx)=>{
        const r=Math.floor(idx/cols);
        const c=idx%cols;
        const inRow=Math.min(cols, n-r*cols);
        const rowW=colW*inRow+gap*(inRow-1);
        const x=-rowW/2+colW/2+c*(colW+gap);
        const yOff=startY+headerH+r*cellH+cellH/2;
        const st=versusStampFor(ranked, idx);
        ctx.save();
        ctx.translate(0, yOff);
        drawVersusPersonCol(ctx, x, colW, p, {
          photo, ink, sub, mute, stampY, kgY, namePx, kgMax,
          analog:versusAnalogQty(p.v||p.w, unit),
          stamp:st.stamp, stampKind:st.kind,
          kicker:(p.name+"|"+p.v)===youKey ? "YOU" : String(idx+1).padStart(2,"0")
        });
        ctx.restore();
      });
    }
    function drawShareType(ctx, W, H, photo){
      const copy=shareCopy();
      const s=state.prop.s||1;
      const pal=sharePalette(photo);
      const ink=pal.ink;
      const sub=pal.sub;
      ctx.save();
      ctx.translate(state.prop.x*W, state.prop.y*H);
      ctx.scale(s,s);
      ctx.textAlign="center";
      ctx.textBaseline="alphabetic";
      const maxW=(W*0.84)/s;
      ctx.font="700 26px "+CARD_FONT;
      const items=[];
      if(copy.kicker) items.push({ kind:"kicker", h:42, text:copy.kicker.toUpperCase() });
      copy.rows.forEach(row=>{
        items.push({ kind:"hero", h:96, text:row.hero });
        items.push({ kind:"gap", h:40 });
        wrapShare(ctx, row.line.toUpperCase(), maxW, 4).forEach(ln=>{
          items.push({ kind:"line", h:38, text:ln });
        });
        items.push({ kind:"gap", h:20 });
      });
      const total=items.reduce((n,it)=>n+it.h,0);
      let y=-total/2;
      items.forEach(it=>{
        y+=it.h;
        if(it.kind==="kicker"){
          ctx.fillStyle=sub; ctx.font="700 22px "+CARD_FONT;
          tracked(ctx, it.text, 0, y, 10);
        } else if(it.kind==="hero"){
          ctx.fillStyle=ink; ctx.font="700 92px "+CARD_FONT;
          ctx.fillText(it.text, 0, y);
        } else if(it.kind==="line"){
          ctx.fillStyle=sub; ctx.font="700 26px "+CARD_FONT;
          tracked(ctx, it.text, 0, y, 4);
        }
      });
      ctx.restore();
    }
    function drawShareCard(){
      const c=$("storyCanvas"), ctx=c.getContext("2d"), W=c.width, H=c.height, PAD=112;
      ctx.setTransform(1,0,0,1,0,0);
      if("filter" in ctx) ctx.filter="none";
      ctx.clearRect(0,0,W,H);
      if(isVersusCard()){
        drawVersusCard(ctx, W, H);
        return;
      }
      const photo=!!state.bgPhoto;
      const pal=sharePalette(photo);
      if(photo){
        drawCover(ctx,state.bgPhoto,0,0,W,H);
        const top=ctx.createLinearGradient(0,0,0,280);
        top.addColorStop(0, pal.gold ? "rgba(22,19,16,.62)" : "rgba(0,0,0,.55)"); top.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=top; ctx.fillRect(0,0,W,280);
        const bottom=ctx.createLinearGradient(0,H-420,0,H);
        bottom.addColorStop(0,"rgba(0,0,0,0)");
        bottom.addColorStop(.42, pal.gold ? "rgba(22,19,16,.5)" : "rgba(0,0,0,.5)");
        bottom.addColorStop(1, pal.gold ? "rgba(16,13,10,.9)" : "rgba(0,0,0,.88)");
        ctx.fillStyle=bottom; ctx.fillRect(0,H-420,W,420);
      } else {
        ctx.fillStyle=pal.bg; ctx.fillRect(0,0,W,H);
      }

      const sub = pal.sub;
      const accent= pal.accent;

      ctx.textAlign="center"; ctx.textBaseline="alphabetic";
      ctx.fillStyle=sub; ctx.font="700 22px "+CARD_FONT;
      tracked(ctx, String(shareCopy().stamp||fmtDay(todayKey())).toUpperCase(), W/2, PAD+28, 10);

      drawShareType(ctx, W, H, photo);

      ctx.setTransform(1,0,0,1,0,0);
      drawGoldChrome(ctx, W, H, photo);
      ctx.textAlign="center"; ctx.textBaseline="alphabetic";
      ctx.fillStyle=accent; ctx.font="800 28px "+CARD_FONT;
      tracked(ctx,"MATES & WEIGHTS",W/2,H-PAD+8,14);
    }
    async function paintCard(){ try{ await document.fonts.ready; }catch(e){} drawShareCard(); }

    async function drawAiCard(){
      if(!state.aiPhoto){ toast("Add a photo first."); return; }
      try{ await document.fonts.ready; }catch(e){}
      const c=$("aiCanvas"), ctx=c.getContext("2d"), W=c.width, H=c.height, PAD=112;
      const canFilter="filter" in ctx;
      ctx.setTransform(1,0,0,1,0,0);
      if(canFilter) ctx.filter="none";
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#E6E6E3"; ctx.fillRect(0,0,W,H);
      ctx.textAlign="left"; ctx.textBaseline="alphabetic";
      ctx.fillStyle="#121211"; ctx.font="700 30px "+CARD_FONT;
      tracked(ctx,"AI FUTURE VISION",PAD,PAD+34,14);
      ctx.fillStyle="#3D4A55"; ctx.font="700 26px "+CARD_FONT;
      tracked(ctx,(state.goal==="bulk"?"SIX MONTHS · BULK UP":"SIX MONTHS · SHREDDED"),PAD,PAD+90,8);

      const bw=W-PAD*2, bh=600, y1=340, y2=y1+bh+140;
      ctx.fillStyle="#9B9E96"; ctx.font="700 24px "+CARD_FONT;
      tracked(ctx,"NOW",PAD,y1-28,10);
      if(canFilter) ctx.filter="grayscale(.45) brightness(.9)";
      drawCover(ctx,state.aiPhoto,PAD,y1,bw,bh);
      if(canFilter) ctx.filter="none";
      ctx.fillStyle="#121211"; ctx.font="700 24px "+CARD_FONT;
      tracked(ctx,"SIX MONTHS IN — STUDY",PAD,y2-28,10);
      if(canFilter) ctx.filter = state.goal==="bulk" ? "contrast(1.16) saturate(1.05) brightness(1.04)" : "contrast(1.22) saturate(.9) brightness(1.06)";
      drawCover(ctx,state.aiPhoto,PAD,y2,bw,bh);
      if(canFilter) ctx.filter="none";

      const rank=rankByVolume(lifetimeVolume());
      drawBadge(ctx, W-PAD-52, y2+bh-52, 48, rank.id, (PATCH[rank.tone]||PATCH.stone).mark, (PATCH[rank.tone]||PATCH.stone).disc);

      ctx.fillStyle="#CBCBC7"; ctx.fillRect(PAD,H-PAD-104,W-PAD*2,1);
      ctx.fillStyle="#5A5A56"; ctx.font="400 24px "+CARD_FONT;
      ctx.fillText("Stylised study for motivation only. Not a prediction, not medical advice.",PAD,H-PAD-52);
      ctx.fillStyle="#121211"; ctx.font="800 26px "+CARD_FONT;
      tracked(ctx,"MATES & WEIGHTS",PAD,H-PAD,14);
      $("aiStage").classList.add("on");
    }

function privacyNote(level){
  if(level==="stats") return "PBs, weekly volume and rank only. Daily weights stay off the feed.";
  if(level==="ghost") return "Ghost: check-in and rank only. No lifts, no leaderboard.";
  return "Full log: weights, reps, PBs and rank.";
}
function renderMates(){
  const list=$("mateList");
  if(!list) return;
  const mates=prefs.mates||[];
  if(!mates.length){ list.innerHTML='<p class="empty" style="margin-top:14px">No mates yet. Share your ID.</p>'; return; }
  list.innerHTML=mates.map(m=>
    '<div class="mate-row"><div><b>'+m.id+'</b><div class="note dim">'+ (m.name||"Mate")+'</div></div><button class="text-link" type="button" data-drop-mate="'+m.id+'">Remove</button></div>'
  ).join("");
}
function renderMode(){
  const squad = prefs.mode==="squad";
  document.querySelectorAll("#modeSwitch [data-mode]").forEach(b=>b.classList.toggle("on", b.dataset.mode===prefs.mode));
  $("modeTag").textContent = squad ? "Squad" : "Solo";
  $("modeNote").textContent = squad
    ? "Mate Battle is open. Share your ID so mates can join."
    : "You vs past-you. Change the window whenever you want.";
  if($("matesSettingsCard")) $("matesSettingsCard").hidden = !squad;
  if($("goBattle")) $("goBattle").hidden = squad;
  $("myMateId").textContent = ensureMateId();
  if($("myHandle")) $("myHandle").value = prefs.handle||"Aussie";
  const priv=prefs.privacy||"full";
  document.querySelectorAll("#privacyBtns [data-privacy]").forEach(b=>b.classList.toggle("on", b.dataset.privacy===priv));
  if($("privacyDesc")) $("privacyDesc").textContent=privacyNote(priv);
  if($("comparePeriod")) $("comparePeriod").value = prefs.compare||"1m";
  renderMates();
}
function periodDays(p){ return p==="1w"?7:p==="1m"?30:p==="3m"?90:0; }
function logsNear(key){
  return logs.filter(l=>l.d===key);
}
function volumeOn(key){
  return logsNear(key).reduce((n,l)=>n+l.v,0);
}
function windowVolume(fromKey, toKey){
  return logs.filter(l=>l.d>=fromKey && l.d<=toKey).reduce((n,l)=>n+l.v,0);
}
function bestLiftIn(t, fromKey, toKey){
  const pool=logs.filter(l=>l.t===t && (!fromKey || (l.d>=fromKey && l.d<=toKey)));
  if(!pool.length) return null;
  return pool.reduce((m,l)=> (!m || l.w>m.w || (l.w===m.w && l.r>m.r)) ? l : m, null);
}
function dayRank(key){
  const day=logsNear(key);
  if(!day.length) return null;
  const last=day.slice().sort((a,b)=>a.ts-b.ts).pop();
  return rankBySet(last.w, last.t);
}
function fmtDelta(now, past, kind){
  if(past==null) return {text:"", down:false};
  const d=now-past;
  const sign=d>=0?"+":"";
  const cardio=kind==="lift" && isCardio($("logWorkout").value);
  const shown=cardio ? d : toDisplayW(d);
  const unit=cardio ? "km" : weightUnit();
  return { text: sign+fmtW(shown)+" "+unit+" "+(d>=0?"▲":"▼"), down:d<0 };
}
    function beatPastSelf(v){
      const t=$("logWorkout").value;
      const older=logs.slice(0,-1).filter(l=>l.t===t);
      if(!older.length) return false;
      const days=periodDays(prefs.compare||"1m");
      const target=days ? shiftDay(todayKey(), -days) : null;
      const nearby=target ? older.filter(l=>Math.abs((new Date(l.d+"T00:00:00")-new Date(target+"T00:00:00"))/86400000)<=10) : [];
      const pool=nearby.length?nearby:older;
      return v>Math.max(...pool.map(l=>l.v));
    }
function monthWeeks(){
  const now=new Date(todayKey()+"T00:00:00");
  const start=new Date(now.getFullYear(), now.getMonth(), 1);
  const key=dayKey(start);
  return weekBuckets().filter(w=>w.start>=weekStart(key)).sort((a,b)=>a.start<b.start?-1:1);
}
function renderCompareSnap(){
  if(!$("cmpVolNow")) return;
  const t=$("logWorkout").value;
  const week=thisWeek();
  const days=periodDays(prefs.compare||"1m");
  const nowVol=week.volume;
  let pastVol=0, pastLabel="Past week: —";
  if(prefs.compare==="best"){
    pastVol=logs.reduce((m,l)=>Math.max(m,l.v),0);
    pastLabel="Best sesh: "+(pastVol?fmtKg(pastVol):"—");
  } else if(days){
    const from=shiftDay(week.start, -days);
    const to=shiftDay(from, 6);
    pastVol=windowVolume(from, to);
    pastLabel="That week: "+fmtKg(pastVol);
  }
  $("cmpVolNow").textContent=fmtKg(nowVol);
  const dv=fmtDelta(nowVol, pastVol, "vol");
  $("cmpVolDelta").textContent=dv.text;
  $("cmpVolDelta").classList.toggle("down", dv.down);
  $("cmpVolPast").textContent=pastLabel;
  $("cmpLiftLabel").textContent=LIFTS[t].name+" top set";
  const nowLift=bestLiftIn(t, week.start, todayKey()) || lastOfLift(t);
  let pastLift=null;
  if(prefs.compare==="best") pastLift=personalRecords()[t]||null;
  else if(days){
    const from=shiftDay(todayKey(), -days-6);
    const to=shiftDay(todayKey(), -days+6);
    pastLift=bestLiftIn(t, from, to);
  }
  $("cmpLiftNow").textContent=nowLift? fmtTop(nowLift.w, t) : "—";
  const dl=fmtDelta(nowLift?nowLift.w:0, pastLift?pastLift.w:null, "lift");
  $("cmpLiftDelta").textContent=(nowLift&&pastLift)?dl.text:"";
  $("cmpLiftDelta").classList.toggle("down", dl.down);
  $("cmpLiftPast").textContent=pastLift?("Past: "+fmtTop(pastLift.w, t)):"Past: —";
}
function renderCalendar(){
  if(!$("calGrid")) return;
  if(!state.cal){
    const n=new Date(todayKey()+"T00:00:00");
    state.cal={y:n.getFullYear(), m:n.getMonth()};
  }
  const first=new Date(state.cal.y, state.cal.m, 1);
  const last=new Date(state.cal.y, state.cal.m+1, 0);
  $("calTitle").textContent=first.toLocaleDateString("en-AU",{month:"long", year:"numeric"});
  const start=(first.getDay()+6)%7;
  const cells=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>'<div class="cal-dow">'+d+'</div>');
  for(let i=0;i<start;i++) cells.push('<div class="cal-day empty"></div>');
  const today=todayKey();
  for(let d=1;d<=last.getDate();d++){
    const key=dayKey(new Date(state.cal.y, state.cal.m, d));
    const rank=dayRank(key);
    const cls=["cal-day"];
    if(key===today) cls.push("today");
    if(rank) cls.push("logged");
    cells.push('<div class="'+cls.join(" ")+'"><span class="n">'+d+'</span>'+(rank?'<span class="emo">'+rank.emoji+'</span>':'')+'</div>');
  }
  $("calGrid").innerHTML=cells.join("");
}
function renderSolo(){
  if(!$("soloCanvas")) return;
  renderCompareSnap();
  renderCalendar();
  const data=sortedLogs().slice(-8);
  const enough=data.length>=2;
  $("soloChartEmpty").hidden=enough;
  $("soloChartBox").hidden=!enough;
  $("soloFoot").hidden=!enough;
  if(!enough){
    if(state.soloChart){ state.soloChart.destroy(); state.soloChart=null; }
    $("soloFoot").innerHTML="";
  } else {
    const vals=data.map(d=>d.v), labels=data.map(d=>fmtShort(d.d));
    const days=periodDays(prefs.compare||"1m");
    const past = prefs.compare==="best"
      ? data.map(()=>logs.reduce((m,l)=>Math.max(m,l.v),0))
      : days ? data.map(d=>{
      const target=shiftDay(d.d, -days);
      const nearby=logs.filter(l=>Math.abs((new Date(l.d+"T00:00:00")-new Date(target+"T00:00:00"))/86400000)<=3);
      if(!nearby.length) return null;
      return nearby.sort((a,b)=>Math.abs((new Date(a.d)-new Date(target))-(new Date(b.d)-new Date(target))))[0].v;
    }) : [];
    const max=Math.max(...vals);
    $("soloFoot").innerHTML=
      '<span class="caps">'+fmtShort(data[0].d)+'</span>'+
      '<span class="caps">Peak '+fmtKg(max)+'</span>'+
      '<span class="caps">'+fmtShort(data[data.length-1].d)+'</span>';
    const datasets=[{
      data:vals, borderColor:"#3D4A55", borderWidth:2, tension:.22,
      pointRadius:vals.map((v,i)=>i===vals.length-1?4:0),
      pointBackgroundColor:"#3D4A55", pointBorderWidth:0, pointHoverRadius:0, fill:false
    }];
    if((days || prefs.compare==="best") && past.some(v=>v!=null)){
      datasets.push({
        data:past, borderColor:"#9A9A96", borderWidth:1.6, borderDash:[4,4], tension:.22,
        pointRadius:0, pointHoverRadius:0, fill:false, spanGaps:true
      });
    }
    if(window.Chart){
      if(state.soloChart){ state.soloChart.destroy(); state.soloChart=null; }
      $("soloFallback").style.display="none";
      $("soloCanvas").style.display="block";
      state.soloChart=new Chart($("soloCanvas").getContext("2d"),{
        type:"line",
        data:{ labels, datasets },
        options:{
          responsive:true, maintainAspectRatio:false,
          layout:{ padding:{ top:10, bottom:4, left:2, right:2 } },
          plugins:{ legend:{display:false}, tooltip:{enabled:false} },
              scales:{ x:{display:false, grid:{display:false}}, y:{display:false, grid:{display:false}, suggestedMin:Math.min(...vals)*0.94} },
          animation:{ duration:700, easing:"easeOutCubic" }
        }
      });
    } else {
      $("soloCanvas").style.display="none";
      $("soloFallback").style.display="block";
      const W=600,H=150,P=8,top=12,bottom=H-18;
      const min=Math.min(...vals), span=Math.max(1,max-min);
      const x=i=>P+i*((W-P*2)/(data.length-1));
      const y=v=>top+(1-(v-min)/span)*(bottom-top);
      const pts=data.map((d,i)=>x(i).toFixed(1)+","+y(d.v).toFixed(1)).join(" ");
      $("soloFallback").innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" style="width:100%;height:100%;display:block" role="img" aria-label="Solo volume trend">'+
        '<polyline points="'+pts+'" fill="none" stroke="#3D4A55" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>';
    }
  }
  const weeks=monthWeeks();
  $("soloWeekTable").hidden=!weeks.length;
  $("soloWeekEmpty").hidden=!!weeks.length;
  $("soloWeekBody").innerHTML=weeks.map(w=>
    '<tr><td class="week">'+weekLabel(w.start)+'</td><td class="num tnum">'+w.sessions+'</td><td class="num tnum">'+fmtKg(w.volume)+'</td></tr>'
  ).join("");
  const best=personalRecords();
  const keys=Object.keys(best).sort((a,b)=>best[b].w-best[a].w);
  $("soloPrEmpty").hidden=!!keys.length;
  $("soloPrGrid").innerHTML=keys.map((t,i)=>{
    const l=best[t], rank=rankBySet(l.w, t);
    return '<div class="pr'+(i===0?" best":"")+'"><div class="pr-top"><span class="caps">'+LIFTS[t].name+'</span>'+
      '<span class="badge">'+badgeMarkup(rank,32)+'</span></div>'+
      '<div class="v tnum">'+fmtTop(l.w, t)+'</div>'+
      '<div class="s">× '+l.r+' reps × '+l.s+' sets · '+rank.name+' · '+fmtDay(l.d)+'</div></div>';
  }).join("");
}

    /* ===================== rendering ===================== */
    function renderRankHeader(){
      const lv=lifetimeVolume();
      const rank=rankByVolume(lv), next=nextRank(rank);
      const changed = !state.profileRank || state.profileRank.id!==rank.id;
      state.profileRank=rank;
      setBadge($("rankBadge"), rank, 54, changed);
      $("rankName").textContent=rank.name;
      $("rankTier").textContent="Tier "+(RANKS.findIndex(r=>r.id===rank.id)+1)+" / "+RANKS.length;
      $("rankNext").textContent = next
        ? fmtKg(Math.max(0,next.volume-lv))+" to "+next.name
        : fmtKg(lv)+" lifetime · apex rank";
      $("rankFrom").textContent=rank.name;
      $("rankTo").textContent = next ? next.name : "Apex";
      const span = next ? next.volume-rank.volume : 1;
      const pct = next ? Math.max(2, Math.min(100, ((lv-rank.volume)/span)*100)) : 100;
      $("rankBar").style.width=pct+"%";
    }
    function renderToday(){
      $("streakBig").textContent=streakDays();
      const week=thisWeek();
      $("weekPies").textContent=round1(week.pies);
      $("wkSessions").textContent=week.sessions;
      $("wkVolume").textContent=fmtKg(week.volume);
      applyStateChrome();
      renderRankHeader();
      renderLegend();
    }
    function renderLive(){
      const w=logInputKg(), r=num("logReps"), s=setsOf("logSets");
      const v=volume(w,r,s);
      $("liveVolume").textContent=fmtKg(v);
      $("liveExtras").textContent="Total volume · Equivalent to "+pies(v)+" Classic Meat Pies";
      const rank=rankBySet(w, $("logWorkout").value);
      const changed = !state.liveRank || state.liveRank.id!==rank.id;
      state.liveRank=rank;
      $("liveRank").textContent=rank.name;
      setBadge($("liveBadge"), rank, 34, changed);
    }
    function renderChart(){
      const data=sortedLogs().slice(-10);
      const enough=data.length>=2;
      $("chartEmpty").hidden=enough;
      $("chartBox").hidden=!enough;
      $("chartFoot").hidden=!enough;
      if(!enough){
        if(state.chart){ state.chart.destroy(); state.chart=null; }
        $("chartFoot").innerHTML="";
        return;
      }
      const vals=data.map(d=>d.v), labels=data.map(d=>fmtShort(d.d));
      const max=Math.max(...vals);
      $("chartFoot").innerHTML=
        '<span class="caps">'+fmtShort(data[0].d)+'</span>'+
        '<span class="caps">Peak '+fmtKg(max)+'</span>'+
        '<span class="caps">'+fmtShort(data[data.length-1].d)+'</span>';
      if(window.Chart){
        if(state.chart){ state.chart.destroy(); state.chart=null; }
        $("chartFallback").style.display="none";
        $("trendCanvas").style.display="block";
        state.chart=new Chart($("trendCanvas").getContext("2d"),{
          type:"line",
          data:{ labels, datasets:[{
            data:vals, borderColor:"#121211", borderWidth:2, tension:.22,
            pointRadius:vals.map((v,i)=>i===vals.length-1?4:0),
            pointBackgroundColor:"#3D4A55", pointBorderWidth:0, pointHoverRadius:0,
            fill:false
          }]},
          options:{
            responsive:true, maintainAspectRatio:false,
            layout:{ padding:{ top:14, bottom:6, left:2, right:2 } },
            plugins:{ legend:{display:false}, tooltip:{enabled:false} },
            scales:{ x:{display:false, grid:{display:false}}, y:{display:false, grid:{display:false}, suggestedMin:Math.min(...vals)*0.94} },
            animation:{ duration:700, easing:"easeOutCubic" }
          }
        });
      } else {
        /* offline fallback: hairline SVG line, no grid */
        $("trendCanvas").style.display="none";
        $("chartFallback").style.display="block";
        const W=600,H=190,P=8,top=16,bottom=H-22;
        const min=Math.min(...vals), span=Math.max(1,max-min);
        const x=i=>P+i*((W-P*2)/(data.length-1));
        const y=v=>top+(1-(v-min)/span)*(bottom-top);
        const pts=data.map((d,i)=>x(i).toFixed(1)+","+y(d.v).toFixed(1)).join(" ");
        const last=data[data.length-1];
        $("chartFallback").innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" style="width:100%;height:100%;display:block" role="img" aria-label="Volume trend">'+
          '<polyline points="'+pts+'" fill="none" stroke="#121211" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>'+
          '<circle cx="'+x(data.length-1).toFixed(1)+'" cy="'+y(last.v).toFixed(1)+'" r="4" fill="#3D4A55"/></svg>';
      }
    }
    function renderWeeks(){
      const weeks=weekBuckets().slice(0,6);
      $("weekTable").hidden=!weeks.length;
      $("weekEmpty").hidden=!!weeks.length;
      $("weekBody").innerHTML=weeks.map(w=>
        '<tr><td class="week">'+weekLabel(w.start)+'</td><td class="num tnum">'+w.sessions+'</td><td class="num tnum">'+fmtKg(w.volume)+'</td><td class="num tnum">'+round1(w.pies)+'</td></tr>'
      ).join("");
    }
    function renderPrs(){
      const best=personalRecords();
      const keys=Object.keys(best).sort((a,b)=>best[b].w-best[a].w);
      $("prEmpty").hidden=!!keys.length;
      $("prGrid").innerHTML=keys.map((t,i)=>{
        const l=best[t], rank=rankBySet(l.w, t);
        return '<div class="pr'+(i===0?" best":"")+'"><div class="pr-top"><span class="caps">'+LIFTS[t].name+'</span>'+
          '<span class="badge">'+badgeMarkup(rank,32)+'</span></div>'+
          '<div class="v tnum">'+fmtTop(l.w, t)+'</div>'+
          '<div class="s">× '+l.r+' reps × '+l.s+' sets · '+rank.name+' · '+fmtDay(l.d)+'</div></div>';
      }).join("");
    }
    function renderTimeline(){
      const recent=sortedLogs().reverse().slice(0,14);
      $("timelineEmpty").hidden=!!recent.length;
      $("timeline").innerHTML=recent.map(l=>{
        const rank=rankBySet(l.w, l.t);
        return '<li><span class="badge">'+badgeMarkup(rank,26)+'</span>'+
          '<div><div class="lift">'+LIFTS[l.t].name+'</div>'+
          '<div class="det">'+fmtTop(l.w, l.t)+' × '+l.r+' × '+l.s+' sets · '+round1(pies(l.v))+' pies</div></div>'+
          '<div><div class="vol tnum">'+fmtKg(l.v)+'</div><div class="day">'+fmtDay(l.d)+'</div></div></li>';
      }).join("");
    }
    function renderLadder(){
      const lv=lifetimeVolume(), current=rankByVolume(lv);
      $("ladder").innerHTML=RANKS.map(r=>
        '<div class="switch"><p style="display:flex;align-items:center;gap:16px">'+
        '<span class="badge">'+badgeMarkup(r,32)+'</span>'+
        '<span>'+r.name+'<small>'+(r.volume?fmtKg(r.volume)+" lifetime · "+fmtTop(r.weight)+" top set · "+r.km+"km run":"Starting rank")+'</small></span></p>'+
        '<span class="caps">'+(r.id===current.id?"Current":(lv>=r.volume?"Earned":"Locked"))+'</span></div>'
      ).join("");
    }
    function renderHistory(){
      try{ renderChart(); }catch(e){ $("chartBox").hidden=true; $("chartFoot").hidden=true; $("chartEmpty").hidden=false; }
      renderWeeks(); renderPrs(); renderTimeline();
    }
    function renderSettings(){
      $("roastToggle").classList.toggle("on", prefs.roast);
      $("roastToggle").setAttribute("aria-checked", String(prefs.roast));
      if($("planTitle")) $("planTitle").textContent = hasPass() ? "Squad Pass" : "Pro Plan (Coming Soon)";
      $("planStatus").textContent = hasPass() ? "Active · group battles, Gold card, auto backup" : "Coming soon · group battles, Gold, auto backup";
      $("legalState").textContent = prefs.agreed ? "Accepted. AI vision unlocked." : "Entertainment only. Not medical advice.";
      $("spinBtn").textContent = prefs.spin===todayKey() ? "Spun today · back tomorrow" : "One free spin";
      const items=unlocks.chars.map(id=>(GACHA.find(g=>g.id===id)||{}).name||id).filter(Boolean);
      $("collectionText").textContent = items.length ? "Collected: "+items.join(", ")+"." : "Nothing collected yet.";
      applyStateChrome();
      renderLadder();
      paintIdentity();
      applyUnitChrome();
    }
    function applyUnitChrome(){
      const u=weightUnit();
      document.querySelectorAll(".unit-switch [data-unit]").forEach(b=>b.classList.toggle("on", b.dataset.unit===u));
      if($("logWeightLabel")) $("logWeightLabel").textContent=liftLabel($("logWorkout").value);
      if($("youWeightLabel")) $("youWeightLabel").textContent="Your top weight ("+u+")";
      if($("mateWeightLabel")) $("mateWeightLabel").textContent="Their top weight ("+u+")";
      document.querySelectorAll("#squadList [data-member] label").forEach(lab=>{
        if(/^Top weight/.test(lab.textContent||"")) lab.textContent="Top weight ("+u+")";
      });
    }
    function convertWeightFields(prev, next){
      if(prev===next) return;
      const conv=el=>{
        if(!el) return;
        const shown=Number(el.value)||0;
        const kg=prev==="lbs" ? shown/KG_TO_LBS : shown;
        const out=next==="lbs" ? kg*KG_TO_LBS : kg;
        el.value=String(Math.round(out*10)/10);
      };
      if(!isCardio($("logWorkout").value)) conv($("logWeight"));
      conv($("youWeight"));
      conv($("mateWeight"));
      document.querySelectorAll("#squadList [data-weight]").forEach(conv);
    }
    function setWeightUnit(next){
      const unit=next==="lbs"?"lbs":"kg";
      const prev=weightUnit();
      if(prev===unit) return;
      convertWeightFields(prev, unit);
      prefs.unit=unit;
      savePrefs();
      applyUnitChrome();
      renderAll();
      paintCard();
      toast(unit==="lbs" ? "Pounds on." : "Kilos on.");
    }
    function gymHype(tier){
      const pool=GYM_HYPE[tier]||GYM_HYPE.small;
      return pick(pool);
    }
    function postWorkoutLine(){
      const dayN=Math.floor(Date.parse(todayKey()+"T00:00:00")/864e5);
      return POST_WORKOUT[(dayN+(logs?logs.length:0))%POST_WORKOUT.length];
    }
    function flashHype(el){
      if(!el) return;
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
    }
    function renderResult(res, meta){
      state.result=res;
      $("resultCard").hidden=false;
      $("prTag").hidden = res.tier!=="pr";
      const hypeEl=$("hypeLine");
      hypeEl.hidden=false;
      hypeEl.textContent=res.hype||gymHype(res.tier);
      flashHype(hypeEl);
      $("banterLine").textContent=res.text;
      const afterEl=$("postWorkoutLine");
      afterEl.hidden=false;
      afterEl.textContent=res.after||postWorkoutLine();
      $("resultMeta").innerHTML=meta.map(m=>
        '<div><span class="caps">'+m[0]+'</span><b class="tnum'+(m[2]?" hit":"")+'">'+m[1]+'</b></div>'
      ).join("");
      paintCard();
      $("storyCanvas").classList.add("fit");
      buzz(res.tier==="pr" ? [30,40,30,60] : [24,26,34]);
    }
    function renderAll(){ renderMode(); renderToday(); renderLive(); renderSolo(); renderHistory(); renderSettings(); }

    /* ===================== navigation ===================== */
    function setPage(page){
      state.page=page;
      ["today","history","settings","battle","ai"].forEach(p=>{
        const el=$("page"+p.charAt(0).toUpperCase()+p.slice(1));
        if(el) el.classList.toggle("on", p===page);
      });
      const navFor = (page==="ai") ? "today" : (page==="battle" ? "today" : page);
      document.querySelectorAll("[data-nav]").forEach(b=>b.classList.toggle("on", b.dataset.nav===navFor));
      if(page==="history") renderHistory();
      if(page==="settings") renderSettings();
      if(page==="today"){ renderToday(); renderSolo(); }
      if(page==="battle") updateHeadcount();
      window.scrollTo({top:0,behavior:"smooth"});
    }
    function openSheet(id){
      document.querySelectorAll(".sheet").forEach(s=>s.classList.toggle("on", s.id===id));
      $("sheetBack").classList.add("on");
    }
    function closeSheets(){
      document.querySelectorAll(".sheet").forEach(s=>s.classList.remove("on"));
      $("sheetBack").classList.remove("on");
    }

    /* ===================== actions ===================== */
    function logSesh(){
      const t=$("logWorkout").value;
      const w=logInputKg(), r=Math.max(1,num("logReps")), s=setsOf("logSets");
      if(w<=0){ toast(isCardio(t)?"Pop a distance in first.":"Pop a weight in first."); $("logWeight").focus(); return; }
      const v=volume(w,r,s);
      const prev=lastOfLift(t);
      const isPr = v>bestVolume(t);
      const before=rankByVolume(lifetimeVolume());
      logs.push({ d:todayKey(), ts:Date.now(), t, w, r, s, v, p:pies(v) });
      if(logs.length>500) logs=logs.slice(-500);
      saveLogs();
      const after=rankByVolume(lifetimeVolume());

      const res=sessionVerdict({t,v}, prev, isPr);
      renderResult(res, [
        ["Total volume", fmtKg(v), isPr],
        ["Top set", fmtTop(w, t)+" × "+r+" × "+s],
        ["Set rank", rankBySet(w, t).name],
        ["Classic Meat Pies", round1(pies(v))],
        ["Home badge", currentState().badge],
        ["Day streak", streakDays()]
      ]);
      renderToday(); renderSolo(); renderHistory();
      if(after.id!==before.id) toast(gymHype("pr")+" Rank up · "+after.name, true);
      else if(beatPastSelf(v)) toast(gymHype("big")+" You beat past-you.", true);
      else if(isPr) toast(gymHype("pr")+" New PB logged.", true);
      else if(prev && v<prev.v) toast(gymHype("down")+" Sesh logged.");
      else toast(gymHype(res.tier)+" Sesh logged.", res.tier==="big"||res.tier==="first");
      $("resultCard").scrollIntoView({behavior:"smooth",block:"start"});
    }
    function headcount(){ return Math.max(1,Math.min(15,Math.round(num("headcount")||2))); }
    function renderSquadRows(n){
      const box=$("squadList");
      const keep=[...box.querySelectorAll("[data-member]")].map(row=>({
        name:row.querySelector("[data-name]").value,
        w:row.querySelector("[data-weight]").value,
        r:row.querySelector("[data-reps]").value,
        s:Number((row.querySelector(".sets button.on")||{dataset:{n:3}}).dataset.n)
      }));
      box.innerHTML="";
      for(let i=0;i<n;i++){
        const prev=keep[i]||{};
        const row=document.createElement("div");
        row.className="squad-member";
        row.dataset.member="1";
        row.innerHTML=
          '<div class="row2 field"><div><label>'+(i===0?"You":"Mate "+i)+'</label><input data-name value="'+(prev.name||NAMES[i]||("Mate "+(i+1)))+'" /></div>'+
          '<div><label>Top weight ('+weightUnit()+')</label><input data-weight type="number" min="0" step="0.5" value="'+(prev.w||(100-i*5))+'" inputmode="decimal" /></div></div>'+
          '<div class="row2 field" style="margin-bottom:8px"><div><label>Reps</label><input data-reps type="number" min="1" step="1" value="'+(prev.r||8)+'" inputmode="numeric" /></div>'+
          '<div><label>Sets</label><div class="sets"></div></div></div>';
        const setBox=row.querySelector(".sets");
        const sel=Number(prev.s)||3;
        for(let k=1;k<=10;k++){
          const b=document.createElement("button");
          b.type="button"; b.dataset.n=String(k); b.textContent=String(k);
          if(k===sel) b.classList.add("on");
          setBox.appendChild(b);
        }
        box.appendChild(row);
      }
    }
    function updateHeadcount(){
      const n=headcount();
      $("headcount").value=n;
      const duo=n<=2;
      $("duoPanel").hidden=!duo;
      $("squadPanel").hidden=duo;
      if(!duo && n<=10) renderSquadRows(n);
      $("planHint").textContent = duo
        ? "Free plan · 1–2 humans."
        : n<=10 ? (hasPass() ? "Squad Pass active · 3–10 humans." : "Three to ten humans is a Pro feature — coming soon.")
        : "Eleven or more is Gym Enterprise.";
    }
    function readSquad(){
      const dare=challengeText();
      return [...$("squadList").querySelectorAll("[data-member]")].map(row=>({
        name:row.querySelector("[data-name]").value||"Mate",
        w:fromDisplayW(Number(row.querySelector("[data-weight]").value)||0),
        r:Math.max(1,Number(row.querySelector("[data-reps]").value)||1),
        s:Number((row.querySelector(".sets button.on")||{dataset:{n:3}}).dataset.n),
        penalty:dare
      }));
    }
    function runBattle(){
      const n=headcount(), dare=challengeText();
      if(n>=11){ openSheet("entSheet"); return; }
      if(n>=3 && !hasPass()){ showComingSoon(); return; }
      let people;
      if(n<=2){
        people=[
          {name:$("youName").value||"You", w:inputKg("youWeight"), r:Math.max(1,num("youReps")), s:setsOf("youSets"), penalty:dare},
          {name:(n===1?"Gym ghost":($("mateName").value||"Mate")), w:inputKg("mateWeight"), r:Math.max(1,num("mateReps")), s:setsOf("mateSets"), penalty:dare}
        ];
      } else people=readSquad();
      people=people.map(p=>({...p, v:volume(p.w,p.r,p.s), penalty:(p.penalty||"").trim()||dare}));
      const ranked=people.map((p,i)=>({...p, i})).sort((a,b)=>b.v-a.v);
      const winner=ranked[0], loser=ranked[ranked.length-1], you=ranked.find(r=>r.i===0);
      const kind = winner.i===you.i && winner.v!==loser.v ? "win" : (loser.i===you.i && winner.v!==loser.v ? "loss" : "draw");
      const P=pack();
      const text=pick(stateBanter(kind).concat(P[kind]||BANTER[kind]))+" "+punishLine(loser.name, loser.penalty||dare);

      const t=$("logWorkout").value;
      if(you.v>0){ logs.push({ d:todayKey(), ts:Date.now(), t, w:you.w, r:you.r, s:you.s, v:you.v, p:pies(you.v) }); saveLogs(); }

      const rival = n<=2 ? people[1] : (ranked.find(r=>r.i!==0) || people[1]);
      state.versus={
        you:{ name:people[0].name, w:people[0].w, v:people[0].v, penalty:people[0].penalty },
        mate:{ name:rival.name, w:rival.w, v:rival.v, penalty:rival.penalty },
        people: people.map(p=>({ name:p.name, w:p.w, v:p.v, penalty:p.penalty })),
        kind, stamp:fmtDay(todayKey())
      };
      state.shareKind="versus";
      resetProp();

      const meta=[
        ["Top Mate", winner.name+" · "+fmtKg(winner.v)],
        ["Challenger", loser.name+" · "+fmtKg(loser.v)],
        ["Your volume", fmtKg(you.v)],
        ["Set rank", rankBySet(you.w, t).name]
      ];
      if(n<=2){
        if(kind==="draw"){
          meta.push(["Locked in", "Too close. Split a sit-down."]);
        } else {
          meta.push(["Top Mate", topPerkLine()]);
          meta.push(["Challenger", loser.penalty||"—"]);
        }
      } else {
        ranked.forEach((p,i)=>meta.push(["#"+(i+1)+" "+p.name, fmtKg(p.w)+" · "+(p.penalty||"")]));
      }
      renderResult({text, tier:kind}, meta);
      renderToday(); renderHistory();
      applyShareChrome();
      setPage("today");
      toast(kind==="win" ? gymHype("win")+" Share the card." : kind==="loss" ? gymHype("loss")+" Share it anyway." : gymHype("draw"));
      $("sharePanel").scrollIntoView({behavior:"smooth",block:"start"});
    }
    function spin(){
      if(prefs.spin===todayKey()){ toast("Already spun today."); return; }
      const prize=pick(GACHA);
      prefs.spin=todayKey();
      if(prize.type==="char"){ prefs.char=prize.id; if(!unlocks.chars.includes(prize.id)) unlocks.chars.push(prize.id); }
      savePrefs(); saveUnlocks();
      $("gachaPrize").textContent=prize.name+" — "+prize.line;
      $("gachaText").textContent="Collected. It sits in your Settings collection.";
      $("pullGacha").disabled=true;
      renderSettings(); buzz([22,24,30]);
    }

    /* ===================== PWA ===================== */
    function makeIcon(size){
      const c=document.createElement("canvas"); c.width=size; c.height=size;
      const x=c.getContext("2d");
      x.fillStyle="#121211"; x.fillRect(0,0,size,size);
      x.fillStyle="#E6E6E3"; x.font="800 "+Math.round(size*.26)+"px "+CARD_FONT;
      x.textAlign="center"; x.textBaseline="middle";
      if("letterSpacing" in x) x.letterSpacing=Math.round(size*.04)+"px";
      x.fillText("MW", size/2+size*.02, size/2);
      return c.toDataURL("image/png");
    }
    function installPwaMeta(){
      try{
        const i192=makeIcon(192), i512=makeIcon(512);
        $("appleTouchIcon").setAttribute("href", makeIcon(180));
        $("pwaFavicon").setAttribute("type","image/png");
        $("pwaFavicon").setAttribute("href", i192);
        const start=location.href.split("#")[0];
        const manifest={
          name:"Mates & Weights", short_name:"Mates & Weights",
          description:"Volume. Streaks. Banter.",
          start_url:start, scope:start.replace(/index\.html$/i,""),
          display:"standalone", orientation:"portrait",
          background_color:"#E6E6E3", theme_color:"#E6E6E3",
          icons:[{src:i192,sizes:"192x192",type:"image/png"},{src:i512,sizes:"512x512",type:"image/png"}]
        };
        const blob=new Blob([JSON.stringify(manifest)],{type:"application/manifest+json"});
        $("pwaManifest").setAttribute("href", URL.createObjectURL(blob));
      }catch(e){}
    }
    function setA2HS(on){ $("a2hs").classList.toggle("show", on); }
    window.deferredInstall=null;
    window.addEventListener("beforeinstallprompt", e=>{ e.preventDefault(); window.deferredInstall=e; $("nativeInstall").hidden=false; });
    window.addEventListener("appinstalled", ()=>{ prefs.a2hs=true; savePrefs(); setA2HS(false); toast("Installed."); });

    /* ===================== events ===================== */
    document.addEventListener("click", e=>{
      const setBtn=e.target.closest(".sets button");
      if(setBtn){
        setBtn.parentElement.querySelectorAll("button").forEach(b=>b.classList.toggle("on", b===setBtn));
        renderLive();
      }
      if(e.target.closest("[data-close]")) closeSheets();
      if(e.target.closest("[data-back]")) setPage("today");
    });
    document.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>setPage(b.dataset.nav)));
    $("sheetBack").addEventListener("click", closeSheets);
    document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeSheets(); });

    $("logWorkout").addEventListener("change",()=>{
      applyUnitChrome();
      renderLive();
      renderSolo();
    });
    ["logWeight","logReps"].forEach(id=>$(id).addEventListener("input", renderLive));
    $("saveSesh").addEventListener("click", logSesh);
    $("photoBtn").addEventListener("click",()=>$("photoInput").click());
    function canvasPt(e, canvas){
      const r=canvas.getBoundingClientRect();
      return { x:(e.clientX-r.left)/r.width*canvas.width, y:(e.clientY-r.top)/r.height*canvas.height };
    }
    function pinchDist(){
      const pts=[...state.pointers.values()];
      if(pts.length<2) return 0;
      const dx=pts[0].x-pts[1].x, dy=pts[0].y-pts[1].y;
      return Math.hypot(dx,dy);
    }
    $("photoInput").addEventListener("change",()=>{
      const f=$("photoInput").files[0]; if(!f) return;
      const r=new FileReader();
      r.onload=()=>{ const img=new Image(); img.onload=()=>{
        state.bgPhoto=img; $("clearPhoto").hidden=false;
        resetProp();
        applyShareChrome();
        toast(isVersusCard() ? "Background set. Type sits on the shot." : "Park the numbers on the shot.");
      }; img.src=r.result; };
      r.readAsDataURL(f);
    });
    $("clearPhoto").addEventListener("click",()=>{
      state.bgPhoto=null; $("photoInput").value=""; $("clearPhoto").hidden=true;
      applyShareChrome();
      toast(isVersusCard() ? "Background off." : "Back to the clean card.");
    });
    $("propScale").addEventListener("input",()=>{
      state.prop.s=Math.max(PROP_S_MIN, Math.min(PROP_S_MAX, Number($("propScale").value)/100));
      drawShareCard();
    });
    $("propX").addEventListener("input",()=>{
      state.prop.x=Math.max(0, Math.min(1, Number($("propX").value)/100));
      drawShareCard();
    });
    $("propY").addEventListener("input",()=>{
      state.prop.y=Math.max(0, Math.min(1, Number($("propY").value)/100));
      drawShareCard();
    });
    $("propReset").addEventListener("click",()=>{
      resetProp();
      drawShareCard(); toast("Layout reset.");
    });
    (function bindPropDrag(){
      const canvas=$("storyCanvas");
      canvas.addEventListener("pointerdown", e=>{
        canvas.setPointerCapture(e.pointerId);
        const p=canvasPt(e, canvas);
        state.pointers.set(e.pointerId, p);
        if(state.pointers.size===1){
          state.drag={ x:p.x, y:p.y, px:state.prop.x, py:state.prop.y };
          canvas.classList.add("drag");
        } else if(state.pointers.size===2){
          state.pinch={ dist:pinchDist(), s:state.prop.s };
        }
      });
      canvas.addEventListener("pointermove", e=>{
        if(!state.pointers.has(e.pointerId)) return;
        state.pointers.set(e.pointerId, canvasPt(e, canvas));
        if(state.pointers.size>=2 && state.pinch){
          const d=pinchDist();
          if(d>8){
            state.prop.s=Math.max(PROP_S_MIN, Math.min(PROP_S_MAX, state.pinch.s*(d/state.pinch.dist)));
          }
        } else if(state.drag){
          const p=state.pointers.get(e.pointerId);
          state.prop.x=Math.max(0, Math.min(1, state.drag.px+(p.x-state.drag.x)/canvas.width));
          state.prop.y=Math.max(0, Math.min(1, state.drag.py+(p.y-state.drag.y)/canvas.height));
        }
        syncPropSliders();
        drawShareCard();
      });
      const end=e=>{
        state.pointers.delete(e.pointerId);
        if(state.pointers.size<2) state.pinch=null;
        if(state.pointers.size===0){ state.drag=null; canvas.classList.remove("drag"); }
      };
      canvas.addEventListener("pointerup", end);
      canvas.addEventListener("pointercancel", end);
    })();
    function applyShareChrome(){
      const versus=isVersusCard();
      const photo=!!state.bgPhoto;
      if($("shareSoloTools")) $("shareSoloTools").hidden=versus;
      if($("propTools")) $("propTools").hidden=false;
      if($("shareVersusNote")) $("shareVersusNote").hidden=!versus;
      if($("clearVersus")) $("clearVersus").hidden=!versus;
      if($("shareEyebrow")) $("shareEyebrow").textContent=versus ? "Versus card" : "Share card";
      if($("shareNote")){
        $("shareNote").hidden=versus;
        $("shareNote").textContent="Today, this week, this month, or a custom window. Volume is Equivalent to ~. Runs are Equal to ~.";
      }
      if($("photoBtn")){
        $("photoBtn").textContent = versus
          ? (photo ? "Change background" : "Set background selfie")
          : (photo ? "Change photo" : "Add photo");
        $("photoBtn").className = (versus && !photo) ? "btn" : "btn-ghost";
      }
      if($("clearPhoto")) $("clearPhoto").hidden=!photo;
      if($("photoHint")){
        $("photoHint").textContent = versus
          ? (photo ? "Selfie stays put. Drag type onto the shot, or use the sliders." : "Set a selfie as the background, then drag type onto the shot.")
          : (photo ? "Selfie on. Drag the numbers onto the shot." : "Add a selfie, then drag the numbers onto the shot — or use the sliders.");
      }
      if($("storyCanvas")) $("storyCanvas").classList.remove("still");
      const skin=isGoldCard() ? "gold" : "cream";
      document.querySelectorAll("#cardSkinPills [data-skin]").forEach(b=>b.classList.toggle("on", b.dataset.skin===skin));
      if($("goldHint")){
        $("goldHint").textContent = hasPass()
          ? (isGoldCard() ? "Gold skin on. Classic is still there if you want it." : "Classic skin. Gold is unlocked on Squad Pass.")
          : "Gold is a Squad Pass skin for Stories.";
      }
      paintCard();
    }
    function applyShareMode(){
      const mode=state.shareMode||"today";
      document.querySelectorAll("#sharePills [data-share-mode]").forEach(b=>b.classList.toggle("on", b.dataset.shareMode===mode));
      const box=$("shareCustom");
      if(box) box.hidden=mode!=="custom";
      if(mode==="custom"){
        const t=todayKey();
        if(!state.shareFrom) state.shareFrom=shiftDay(t,-6);
        if(!state.shareTo) state.shareTo=t;
        if($("shareFrom")){ $("shareFrom").value=state.shareFrom; $("shareFrom").max=t; }
        if($("shareTo")){ $("shareTo").value=state.shareTo; $("shareTo").max=t; }
      }
      paintCard();
    }
    document.querySelectorAll("#cardSkinPills [data-skin]").forEach(b=>b.addEventListener("click",()=>{
      if(b.dataset.skin==="gold" && !hasPass()){
        showComingSoon();
        return;
      }
      prefs.cardSkin=b.dataset.skin==="gold" ? "gold" : "cream";
      savePrefs();
      applyShareChrome();
      toast(isGoldCard() ? "Gold card." : "Classic card.");
    }));
    document.querySelectorAll("#sharePills [data-share-mode]").forEach(b=>b.addEventListener("click",()=>{
      state.shareMode=b.dataset.shareMode;
      state.shareKind="solo";
      resetProp();
      applyShareChrome();
      applyShareMode();
      toast(state.shareMode==="today"?"Today's card.":state.shareMode==="week"?"This week's card.":state.shareMode==="month"?"This month's card.":"Pick your dates.");
    }));
    ["shareFrom","shareTo"].forEach(id=>{
      $(id).addEventListener("change",()=>{
        const t=todayKey();
        let from=$("shareFrom").value||shiftDay(t,-6);
        let to=$("shareTo").value||t;
        if(from>t) from=t;
        if(to>t) to=t;
        if(from>to){ const x=from; from=to; to=x; }
        state.shareFrom=from; state.shareTo=to;
        $("shareFrom").value=from; $("shareTo").value=to;
        paintCard();
      });
    });
    function cardFileName(){
      const gold=isGoldCard() ? "-gold" : "";
      return isVersusCard() ? "mates-weights-versus"+gold+".png" : "mates-weights-"+shareWindow().mode+gold+".png";
    }
    function cardCaption(){
      if(!isVersusCard()) return "Mates & Weights";
      const v=state.versus;
      const people=(v.people&&v.people.length)?v.people:[v.you,v.mate].filter(Boolean);
      const ranked=people.slice().sort((a,b)=>(b.v||0)-(a.v||0));
      const board=ranked.map((p,i)=>(i+1)+". "+p.name+" "+fmtKg(p.w)).join(" · ");
      const last=ranked[ranked.length-1];
      const first=ranked[0];
      const tied=first && last && first.v===last.v;
      const perk=tied?"":" · "+first.name+": "+topPerkLine();
      const dare=(!tied && last&&last.penalty) ? " · Friendly Challenge: "+last.name+" — "+last.penalty : "";
      return board+perk+dare;
    }
    function saveCardPng(blob, quiet){
      if(!blob) return;
      const url=URL.createObjectURL(blob), a=document.createElement("a");
      a.href=url; a.download=cardFileName(); a.click();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
      if(!quiet) toast("Image saved.");
    }
    function cardBlob(){
      return new Promise(res=>$("storyCanvas").toBlob(res,"image/png"));
    }
    async function shareStoryCard(){
      const blob=await cardBlob();
      if(!blob){ toast("Couldn't build the card."); return; }
      const file=new File([blob], cardFileName(), { type:"image/png" });
      const payload={ files:[file], title:"Mates & Weights", text:cardCaption() };
      try{
        if(navigator.share && navigator.canShare && navigator.canShare(payload)){
          await navigator.share(payload);
          toast("Shared.");
          return;
        }
        if(navigator.share){
          await navigator.share({ title:"Mates & Weights", text:cardCaption() });
          toast("Caption shared. Use Copy Image or Save Image for the card.");
          return;
        }
      }catch(e){
        if(e && e.name==="AbortError") return;
      }
      toast("Share sheet isn't on this device. Copy Image or Save Image instead.");
    }
    async function copyCardImage(){
      const blob=await cardBlob();
      if(!blob){ toast("Couldn't build the card."); return; }
      try{
        if(navigator.clipboard && window.ClipboardItem){
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          toast("Image copied.");
          return;
        }
      }catch(e){}
      saveCardPng(blob, true);
      toast("Copy not supported. Image saved instead.");
    }
    function inviteLink(){
      const id=ensureMateId();
      const name=(prefs.handle||"Aussie").replace(/\s+/g,"_");
      return "https://matesandweights.com/invite?mate="+id+"&name="+encodeURIComponent(name);
    }
    function inviteText(){
      const id=ensureMateId();
      return "I just logged my sesh on Mates & Weights! Think you can beat my volume? Add me: "+id+" · "+inviteLink();
    }
    async function challengeMate(){
      const text=inviteText(), link=inviteLink(), id=ensureMateId();
      try{
        if(navigator.share){
          await navigator.share({ title:"Challenge a Mate", text, url:link });
          toast("Challenge sent · "+id, true);
          return;
        }
      }catch(e){
        if(e && e.name==="AbortError") return;
      }
      try{
        if(navigator.clipboard) await navigator.clipboard.writeText(text);
      }catch(e){}
      toast("Invite copied · "+id);
    }
    $("shareStoryBtn").addEventListener("click", ()=>{ shareStoryCard(); });
    $("copyCardBtn").addEventListener("click", ()=>{ copyCardImage(); });
    $("downloadCard").addEventListener("click",()=>{
      cardBlob().then(blob=>saveCardPng(blob));
    });
    $("challengeMateShareBtn").addEventListener("click", ()=>{ challengeMate(); });
    $("challengeMateResultBtn").addEventListener("click", ()=>{ challengeMate(); });
    $("clearVersus").addEventListener("click",()=>{
      state.shareKind="solo";
      resetProp();
      applyShareChrome();
      applyShareMode();
      toast("Solo card.");
    });
$("goBattle").addEventListener("click",()=>setPage("battle"));
$("goAi").addEventListener("click",()=>setPage("ai"));
$("toHistory").addEventListener("click",()=>setPage("history"));
$("streakJump").addEventListener("click",()=>{
  $("calendarAnchor").scrollIntoView({behavior:"smooth",block:"start"});
  buzz();
});
$("calPrev").addEventListener("click",()=>{
  if(!state.cal) renderCalendar();
  state.cal.m--; if(state.cal.m<0){ state.cal.m=11; state.cal.y--; }
  renderCalendar();
});
$("calNext").addEventListener("click",()=>{
  if(!state.cal) renderCalendar();
  state.cal.m++; if(state.cal.m>11){ state.cal.m=0; state.cal.y++; }
  renderCalendar();
});
document.querySelectorAll("#modeSwitch [data-mode]").forEach(b=>b.addEventListener("click",()=>{
  prefs.mode=b.dataset.mode; savePrefs(); renderMode(); buzz([18,20,24]);
  if(prefs.mode==="squad"){
    toast("Squad on. Mate Battle is open.");
    setPage("battle");
  } else {
    toast("Solo. You vs past-you.");
    setPage("today");
  }
}));
$("copyIdBtn").addEventListener("click", ()=>{ challengeMate(); });
document.querySelectorAll(".unit-switch [data-unit]").forEach(b=>b.addEventListener("click",()=>{
  setWeightUnit(b.dataset.unit);
}));
document.querySelectorAll("#privacyBtns [data-privacy]").forEach(b=>b.addEventListener("click",()=>{
  prefs.privacy=b.dataset.privacy; savePrefs(); renderMode(); toast(privacyNote(prefs.privacy));
}));
$("myHandle").addEventListener("change",()=>{
  prefs.handle=($("myHandle").value||"Aussie").trim(); savePrefs();
});
$("addMateBtn").addEventListener("click",()=>{
  const id=($("inputMateId").value||"").trim().toUpperCase();
  if(!isMatesId(id) && !LEGACY_ID_RE.test(id)){ toast("Use an ID like MATE-8F92A."); return; }
  if(id===ensureMateId()){ toast("That's you."); return; }
  prefs.mates=prefs.mates||[];
  if(prefs.mates.some(m=>m.id===id)){ toast("Already added."); return; }
  prefs.mates.push({id, name:"Mate"}); savePrefs(); $("inputMateId").value=""; renderMates(); toast("Mate added.");
  cloudGet(id).then(doc=>{
    if(!doc || !doc.handle) return;
    const mate=prefs.mates.find(m=>m.id===id);
    if(!mate) return;
    mate.name=doc.handle;
    savePrefs();
    renderMates();
  });
});
$("mateList").addEventListener("click", e=>{
  const btn=e.target.closest("[data-drop-mate]"); if(!btn) return;
  prefs.mates=(prefs.mates||[]).filter(m=>m.id!==btn.dataset.dropMate); savePrefs(); renderMates();
});
$("comparePeriod").addEventListener("change",()=>{
  prefs.compare=$("comparePeriod").value; savePrefs(); renderSolo(); buzz();
});
    $("stateSelect").addEventListener("change",()=>{
      prefs.state=$("stateSelect").value;
      if(!STATES[prefs.state]) prefs.state="VIC";
      savePrefs();
      applyStateChrome();
      renderLegend();
      renderLive();
      renderToday();
      paintCard();
      toast("Home ground · "+currentState().code+" · "+currentState().badge);
    });


    $("roastToggle").addEventListener("click",()=>{
      prefs.roast=!prefs.roast; savePrefs(); renderSettings();
      toast(prefs.roast ? "Self-deprecation on." : "Straight flexing again.");
    });
    $("spinBtn").addEventListener("click",()=>{
      $("pullGacha").disabled = prefs.spin===todayKey();
      $("gachaPrize").textContent="";
      $("gachaText").textContent = prefs.spin===todayKey()
        ? "You've had today's spin. Back tomorrow."
        : "One free spin a day. Tradies, mullets, lifeguards.";
      openSheet("gachaSheet");
    });
    $("pullGacha").addEventListener("click", spin);
    function showComingSoon(){
      toast("Pro features are coming soon! Thanks for your interest.", true);
    }
    $("openSquad").addEventListener("click",()=>{
      if(hasPass()){ toast("Squad Pass is already on."); return; }
      showComingSoon();
    });
    $("openEnt").addEventListener("click",()=>openSheet("entSheet"));
    $("installBtn").addEventListener("click",()=>{ $("nativeInstall").hidden=!window.deferredInstall; openSheet("installSheet"); });
    $("openLegal").addEventListener("click",()=>{ $("agreeBox").checked=prefs.agreed; $("agreeBtn").disabled=!prefs.agreed; openSheet("legalSheet"); });
    $("unlockBtn").addEventListener("click",()=>{
      showComingSoon();
    });
    $("agreeBox").addEventListener("change",()=>{ $("agreeBtn").disabled=!$("agreeBox").checked; });
    $("agreeBtn").addEventListener("click",()=>{
      if(!$("agreeBox").checked) return;
      prefs.agreed=true; savePrefs(); closeSheets(); renderSettings();
      toast("Accepted.");
    });
    $("nativeInstall").addEventListener("click", async ()=>{
      if(!window.deferredInstall){ toast("Use the manual steps above."); return; }
      window.deferredInstall.prompt();
      try{ await window.deferredInstall.userChoice; }catch(e){}
      window.deferredInstall=null; $("nativeInstall").hidden=true;
    });
    $("clearData").addEventListener("click",()=>{
      if(!confirm("Erase every log and setting on this device? Cloud profiles stay available by Mates ID.")) return;
      logs=[]; unlocks={voices:[],chars:[]}; prefs=Object.assign({},DEFAULT_PREFS);
      persistLogs(); persistUnlocks(); persistPrefs();
      clearIdCookie();
      ensureIdentity();
      state.result=null; state.profileRank=null; state.liveRank=null;
      $("resultCard").hidden=true;
      renderAll(); paintCard(); paintIdentity();
      scheduleCloudSync();
      toast("Wiped on this device. Import your old ID to restore.");
    });

    function copyText(text, ok){
      const done=()=>toast(ok);
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done).catch(done);
        return;
      }
      done();
    }
    $("copySettingsIdBtn").addEventListener("click",()=>copyText(ensureMateId(), "Mates ID copied."));
    $("copyBackupBtn").addEventListener("click",()=>copyText(prefs.backupCode||"", "Backup code copied."));
    async function importProfile(){
      const key=($("importMateId").value||"").trim().toUpperCase();
      if(!isMatesId(key) && !isBackupCode(key) && !LEGACY_ID_RE.test(key)){
        toast("Use an ID like MATE-8F92A.");
        return;
      }
      if(isMatesId(key) && key===prefs.mateId){
        toast("That's already this profile.");
        return;
      }
      if(!confirm("この端末のデータを、ID "+key+" のクラウド保存分で置き換えますか？")) return;
      const doc=await cloudGet(key);
      if(!doc){ toast("No cloud profile found for that ID."); return; }
      if(!applyCloudProfile(doc)){ toast("That profile is incomplete."); return; }
      paintIdentity();
      renderAll();
      paintCard();
      $("importMateId").value="";
      scheduleCloudSync();
      toast("Profile restored · "+prefs.mateId);
    }
    $("importProfileBtn").addEventListener("click", importProfile);
    $("importMateId").addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); importProfile(); } });

    $("headcount").addEventListener("input", updateHeadcount);
    $("headcount").addEventListener("change", updateHeadcount);
    document.querySelectorAll("[data-wager-kind]").forEach(b=>b.addEventListener("click",()=>{
      document.querySelectorAll("[data-wager-kind]").forEach(x=>x.classList.toggle("on",x===b));
      fillPenalties((WAGER_KIND[b.dataset.wagerKind]||WAGER_KIND.pushups)());
    }));
    if($("challengeLine")) $("challengeLine").addEventListener("input", syncChallengePills);
    $("runBattle").addEventListener("click", runBattle);

    document.querySelectorAll("[data-goal]").forEach(b=>b.addEventListener("click",()=>{
      state.goal=b.dataset.goal;
      document.querySelectorAll("[data-goal]").forEach(x=>x.classList.toggle("on",x===b));
    }));
    function loadAiPhoto(file){
      const r=new FileReader();
      r.onload=()=>{ const img=new Image(); img.onload=()=>{
        state.aiPhoto=img; $("dropHint").textContent="Photo ready · generate the study";
        toast("Photo loaded.");
      }; img.src=r.result; };
      r.readAsDataURL(file);
    }
    $("drop").addEventListener("click", e=>{
      if(e.target===$("aiPhoto")) return;
      if(!prefs.agreed){ $("agreeBox").checked=false; $("agreeBtn").disabled=true; openSheet("legalSheet"); return; }
      $("aiPhoto").click();
    });
    $("drop").addEventListener("dragover", e=>{ e.preventDefault(); $("drop").classList.add("hot"); });
    $("drop").addEventListener("dragleave",()=>$("drop").classList.remove("hot"));
    $("drop").addEventListener("drop", e=>{
      e.preventDefault(); $("drop").classList.remove("hot");
      if(!prefs.agreed){ openSheet("legalSheet"); return; }
      const f=e.dataTransfer.files[0]; if(f) loadAiPhoto(f);
    });
    $("aiPhoto").addEventListener("change",()=>{ const f=$("aiPhoto").files[0]; if(f) loadAiPhoto(f); });
    $("aiGen").addEventListener("click",()=>{
      if(!prefs.agreed){ openSheet("legalSheet"); return; }
      drawAiCard();
    });
    $("saveAi").addEventListener("click",()=>{
      $("aiCanvas").toBlob(blob=>{
        if(!blob) return;
        const url=URL.createObjectURL(blob), a=document.createElement("a");
        a.href=url; a.download="mates-weights-ai-study.png"; a.click();
        setTimeout(()=>URL.revokeObjectURL(url),1500);
        toast("Saved. Study only.");
      },"image/png");
    });
    $("a2hsOpen").addEventListener("click",()=>{ $("nativeInstall").hidden=!window.deferredInstall; openSheet("installSheet"); });
    $("a2hsDismiss").addEventListener("click",()=>{ prefs.a2hs=true; savePrefs(); setA2HS(false); });
    window.addEventListener("load", ()=>{ if(state.page==="history" || logs.length) renderChart(); if(logs.length) renderSolo(); });

    /* ===================== boot ===================== */
    installPwaMeta();
    ensureIdentity();
    try{
      const q=new URLSearchParams(location.search);
      const invite=(q.get("mate")||"").toUpperCase();
      if(isMatesId(invite) || LEGACY_ID_RE.test(invite)){
        if($("inputMateId")) $("inputMateId").value=invite;
        prefs.mode="squad";
        persistPrefs();
      }
    }catch(e){}
    buildSets("logSets",3); buildSets("youSets",3); buildSets("mateSets",3);
    applyUnitChrome();
    renderAll(); setPage(prefs.mode==="squad" ? "battle" : "today"); applyShareChrome(); applyShareMode();
    paintIdentity();
    bootCloud();
    $("storyCanvas").classList.add("fit");
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone===true;
    if(!standalone && !prefs.a2hs) setTimeout(()=>setA2HS(true), 1600);
    document.addEventListener("visibilitychange", ()=>{
      if(document.hidden || !hasPass()) return;
      bootCloud();
    });
    window.addEventListener("online", ()=>{ if(hasPass()) scheduleCloudSync(); });

}
