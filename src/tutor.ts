// GAPLASH — Tutor Dvigateli + Kontrastiv Motor

import { CONTRAST_ERRORS, type ContrastError } from './data';

export interface TutorResult {
  correct: boolean;
  contrastError?: ContrastError;
  category?: string;
  wrong?: string;
  right?: string;
  why?: string;
  isUzInterference?: boolean;
}

// Kontrastiv xato tekshiruvi
export function checkContrast(input: string): TutorResult | null {
  const lower = input.toLowerCase().trim();
  
  for (const err of CONTRAST_ERRORS) {
    const regex = new RegExp(err.re, 'i');
    if (regex.test(lower)) {
      return {
        correct: false,
        contrastError: err,
        category: err.cat,
        wrong: err.wrong,
        right: err.right,
        why: err.why,
        isUzInterference: true,
      };
    }
  }
  return null;
}

// Savol javobini tekshirish
export function checkAnswer(
  input: string,
  expect: string[],
  errors: { re: string; cat: string; wrong: string; right: string; why: string }[]
): TutorResult {
  const lower = input.toLowerCase().trim();
  
  // 1. Avval kontrastiv tekshiruv
  const contrast = checkContrast(lower);
  if (contrast) return contrast;
  
  // 2. Dars xatolari
  for (const err of errors) {
    try {
      const regex = new RegExp(err.re, 'i');
      if (regex.test(lower)) {
        return {
          correct: false,
          category: err.cat,
          wrong: err.wrong,
          right: err.right,
          why: err.why,
        };
      }
    } catch (e) {
      // Regex xatosi bo'lsa o'tkazib yuboramiz
    }
  }
  
  // 3. Expect tekshiruv
  const hasExpected = expect.some(exp => lower.includes(exp.toLowerCase()));
  if (hasExpected) {
    return { correct: true };
  }
  
  // 4. Hech narsa topilmadi — noto'g'ri
  return {
    correct: false,
    category: 'structure',
    wrong: input,
    right: expect.join(' / '),
    why: "Javobda kerakli so'zlar yo'q. Qayta urinib ko'ring!",
  };
}

// Maqtov rotatsiyasi
const PRAISE = [
  "Zo'r!",
  "Ajoyib!",
  "Mukammal!",
  "Barakalla!",
  "Sayoz! Davom etamiz!",
];

export function getPraise(name: string): string {
  const p = PRAISE[Math.floor(Math.random() * PRAISE.length)];
  return name ? `${p} ${name}, davom etamiz!` : p;
}

// Erkin suhbat uchun xotira
export function extractMemory(text: string, mem: { likes: string[]; city: string; job: string; dream: string }) {
  const lower = text.toLowerCase();
  const newMem = { ...mem };
  
  // Like
  const likeMatch = lower.match(/i (?:really )?like (.+?)(?:\.|,|$)/);
  if (likeMatch && newMem.likes.length < 10) {
    const item = likeMatch[1].trim();
    if (!newMem.likes.includes(item)) {
      newMem.likes.push(item);
    }
  }
  
  // City
  const cityMatch = lower.match(/(?:i (?:live|am) in|i'm from|i come from) (.+?)(?:\.|,|$)/);
  if (cityMatch) {
    newMem.city = cityMatch[1].trim();
  }
  
  // Job
  const jobMatch = lower.match(/i (?:am|work as) a (.+?)(?:\.|,|$)/);
  if (jobMatch) {
    newMem.job = jobMatch[1].trim();
  }
  
  // Dream
  const dreamMatch = lower.match(/(?:my dream|i want to be|i want to become) (.+?)(?:\.|,|$)/);
  if (dreamMatch) {
    newMem.dream = dreamMatch[1].trim();
  }
  
  return newMem;
}

// Max xotira eslatmasi
export function getMemoryReminder(mem: { likes: string[]; city: string; job: string; dream: string }): string {
  const parts: string[] = [];
  if (mem.likes.length > 0) {
    parts.push(`Siz ${mem.likes[mem.likes.length - 1]} ni yoqtirishingizni aytdingiz`);
  }
  if (mem.city) {
    parts.push(`${mem.city} da yashaysiz`);
  }
  if (mem.job) {
    parts.push(`Siz ${mem.job} siz`);
  }
  if (parts.length === 0) return '';
  return "🧠 Eslayman: " + parts.join(', ') + ". ";
}

// Imlo tekshiruvi (SPELL)
const SPELL_CORRECTIONS: Record<string, string> = {
  becaus: 'because', recieve: 'receive', seperate: 'separate',
  definately: 'definitely', occassion: 'occasion', neccessary: 'necessary',
  accomodate: 'accommodate', begining: 'beginning', beleive: 'believe',
  calender: 'calendar', concious: 'conscious', enviroment: 'environment',
  goverment: 'government', happend: 'happened', immediatly: 'immediately',
  knowlege: 'knowledge', liason: 'liaison', maintenence: 'maintenance',
  noticable: 'noticeable', occurence: 'occurrence', persue: 'pursue',
  publically: 'publicly', reccomend: 'recommend', refered: 'referred',
  succesful: 'successful', suprise: 'surprise', untill: 'until',
  wierd: 'weird', writting: 'writing',
};

export function checkSpelling(text: string): { wrong: string; right: string }[] {
  const words = text.split(/\s+/);
  const corrections: { wrong: string; right: string }[] = [];
  
  for (const word of words) {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    if (SPELL_CORRECTIONS[clean]) {
      corrections.push({ wrong: word, right: SPELL_CORRECTIONS[clean] });
    }
  }
  
  return corrections;
}

// LLM so'rovi
export async function askAI(
  messages: { role: string; content: string }[],
  apiKey: string,
  endpoint: string,
  model: string
): Promise<string | null> {
  if (!apiKey) return null;
  
  try {
    const url = endpoint || 'https://api.openai.com/v1/chat/completions';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-3.5-turbo',
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });
    
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    console.error('AI error:', e);
    return null;
  }
}

// TTS
export function speak(text: string, lang: string = 'en-US', pitch: number = 1, rate: number = 0.95): void {
  try {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.pitch = pitch;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    // TTS qo'llanmasa jim qolamiz
  }
}

// STT (Speech Recognition)
export function startRecognition(
  lang: string,
  onResult: (text: string) => void,
  onError: (err: string) => void
): (() => void) | null {
  try {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError("Brauzeringiz ovoz tanishni qo'llab-quvvatlamaydi");
      return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };
    
    recognition.onerror = (event: any) => {
      onError(`Ovoz xatosi: ${event.error}`);
    };
    
    recognition.start();
    
    return () => {
      try { recognition.stop(); } catch (e) {}
    };
  } catch (e) {
    onError("Ovoz tanish ishga tushmadi");
    return null;
  }
}
