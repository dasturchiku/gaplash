// GAPLASH — localStorage Store

export interface DeckWord {
  w: string; due: number; ivl: number; reps: number;
}

export interface StoreData {
  onboarded: boolean;
  name: string;
  lang: string;
  interests: string[];
  levels: { en: string; de: string; ru: string };
  xp: number;
  xpToday: number;
  xpDay: string;
  streak: number;
  lastDay: string;
  errCats: Record<string, number>;
  contrastHits: Record<string, number>;
  totals: { correct: number; answers: number; lessons: number };
  deck: { en: DeckWord[]; de: DeckWord[]; ru: DeckWord[] };
  done: { en: string[]; de: string[]; ru: string[] };
  mnem: Record<string, string>;
  journal: { t: number; text: string; n: number }[];
  hist: { d: string; xp: number }[];
  log: { t: number; msg: string }[];
  mem: { likes: string[]; city: string; job: string; dream: string };
  pro: boolean;
  apiKey: string;
  apiEndpoint: string;
  apiModel: string;
  lessonCount: number;
  lessonDay: string;
  darkMode: boolean;
}

const DEFAULT: StoreData = {
  onboarded: false,
  name: '',
  lang: 'en',
  interests: [],
  levels: { en: '', de: '', ru: '' },
  xp: 0,
  xpToday: 0,
  xpDay: '',
  streak: 0,
  lastDay: '',
  errCats: { grammar: 0, vocabulary: 0, pronunciation: 0, spelling: 0, structure: 0 },
  contrastHits: {},
  totals: { correct: 0, answers: 0, lessons: 0 },
  deck: { en: [], de: [], ru: [] },
  done: { en: [], de: [], ru: [] },
  mnem: {},
  journal: [],
  hist: [],
  log: [],
  mem: { likes: [], city: '', job: '', dream: '' },
  pro: false,
  apiKey: '',
  apiEndpoint: '',
  apiModel: '',
  lessonCount: 0,
  lessonDay: '',
  darkMode: false,
};

const KEY = 'gaplash_v3';

export function loadStore(): StoreData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return { ...DEFAULT, ...data };
    }
  } catch (e) {
    console.error('Store load error:', e);
  }
  return { ...DEFAULT };
}

export function saveStore(data: StoreData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Store save error:', e);
  }
}

export function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function addXP(store: StoreData, amount: number): StoreData {
  const t = today();
  const newStore = { ...store };
  
  // Reset daily if new day
  if (newStore.xpDay !== t) {
    newStore.xpToday = 0;
    newStore.xpDay = t;
    // Streak logic
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (newStore.lastDay === yesterday) {
      newStore.streak += 1;
    } else if (newStore.lastDay !== t) {
      newStore.streak = 1;
    }
    newStore.lastDay = t;
    // Reset lesson count
    newStore.lessonCount = 0;
    newStore.lessonDay = t;
  }
  
  newStore.xp += amount;
  newStore.xpToday += amount;
  
  // History
  const existing = newStore.hist.find(h => h.d === t);
  if (existing) {
    existing.xp += amount;
  } else {
    newStore.hist.push({ d: t, xp: amount });
  }
  
  return newStore;
}

export function addWordToDeck(store: StoreData, word: string, lang: string): StoreData {
  const newStore = { ...store };
  const deck = [...(newStore.deck[lang as keyof typeof newStore.deck] || [])];
  if (!deck.find(w => w.w === word)) {
    deck.push({ w: word, due: Date.now(), ivl: 0, reps: 0 });
  }
  newStore.deck = { ...newStore.deck, [lang]: deck };
  return newStore;
}

export function getDueWords(store: StoreData, lang: string): DeckWord[] {
  const deck = store.deck[lang as keyof typeof store.deck] || [];
  const now = Date.now();
  return deck.filter(w => w.due <= now);
}

export function reviewWord(store: StoreData, word: string, quality: number, lang: string): StoreData {
  const newStore = { ...store };
  const deckKey = lang as keyof typeof newStore.deck;
  const deck = [...(newStore.deck[deckKey] || [])];
  const idx = deck.findIndex(w => w.w === word);
  if (idx >= 0) {
    const w = { ...deck[idx] };
    if (quality >= 3) {
      // Success
      w.reps += 1;
      if (w.ivl === 0) w.ivl = 1;
      else if (w.ivl === 1) w.ivl = 3;
      else w.ivl = Math.min(Math.round(w.ivl * 2.2), 30);
    } else {
      // Failed
      w.ivl = 0;
      w.reps = Math.max(0, w.reps - 1);
    }
    w.due = Date.now() + w.ivl * 86400000;
    deck[idx] = w;
  }
  newStore.deck = { ...newStore.deck, [deckKey]: deck };
  return newStore;
}
