import { useState, useEffect, useCallback, useRef } from 'react';
import { Home, MessageCircle, BookOpen, GraduationCap, HelpCircle, Map, CreditCard, BarChart3, Mic, Headphones, PenTool, Mail, Drama, BookMarked, Languages, Swords, Target, Camera, Settings, School, Sun, Moon, Volume2, Award, Zap, Flame, ChevronRight, X, Check, RotateCcw, Plus, Download, Share2, ArrowRight, Star, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORDS_EN, LESSONS_EN, GRAMMAR_EN, TESTS_EN, PLACEMENT, FREE_TALK, SHADOW_SENTENCES, MINIMAL_PAIRS, PHONEMES, SILK_ROAD, ROLES, STORY_NODES, INTERPRETER, IELTS_READING, IELTS_WRITING_RUBRIC, type Word, type Lesson, type Question } from './data';
import { loadStore, saveStore, addXP, addWordToDeck, getDueWords, reviewWord, today, type StoreData, type DeckWord } from './store';
import { checkAnswer, checkContrast, checkSpelling, getPraise, extractMemory, getMemoryReminder, speak, startRecognition, askAI } from './tutor';

// ============ ASOSIY APP ============
export default function App() {
  const [store, setStore] = useState<StoreData>(loadStore);
  const [panel, setPanel] = useState('home');
  const [toast, setToast] = useState('');
  const [showProModal, setShowProModal] = useState(false);

  // Save on change
  useEffect(() => {
    saveStore(store);
  }, [store]);

  // Dark mode
  useEffect(() => {
    if (store.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [store.darkMode]);

  // Toast
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  // Confetti
  const fireConfetti = useCallback(() => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }, []);

  // Update store helper
  const updateStore = useCallback((updater: (s: StoreData) => StoreData) => {
    setStore(prev => {
      const next = updater(prev);
      return next;
    });
  }, []);

  // Pro gate
  const checkPro = useCallback((feature: string): boolean => {
    if (store.pro) return true;
    if (feature === 'lesson' && store.lessonDay === today() && store.lessonCount >= 1) {
      setShowProModal(true);
      return false;
    }
    return true;
  }, [store]);

  // Onboarding
  if (!store.onboarded) {
    return <Onboarding store={store} setStore={setStore} />;
  }

  return (
    <div className={`min-h-screen bg-paper ${store.darkMode ? 'dark' : ''}`}>
      {/* Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Desktop */}
        <Sidebar panel={panel} setPanel={setPanel} store={store} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {/* Topbar */}
          <Topbar store={store} setStore={setStore} showToast={showToast} />
          
          {/* Panel Content */}
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            {panel === 'home' && <HomePanel store={store} setStore={setStore} setPanel={setPanel} />}
            {panel === 'chat' && <ChatPanel store={store} setStore={setStore} showToast={showToast} />}
            {panel === 'words' && <WordsPanel store={store} setStore={setStore} showToast={showToast} fireConfetti={fireConfetti} />}
            {panel === 'grammar' && <GrammarPanel />}
            {panel === 'test' && <TestPanel store={store} setStore={setStore} showToast={showToast} fireConfetti={fireConfetti} />}
            {panel === 'silk' && <SilkRoadPanel store={store} />}
            {panel === 'passport' && <PassportPanel store={store} />}
            {panel === 'progress' && <ProgressPanel store={store} />}
            {panel === 'voice' && <VoicePanel store={store} showToast={showToast} />}
            {panel === 'podcast' && <PodcastPanel store={store} showToast={showToast} />}
            {panel === 'journal' && <JournalPanel store={store} setStore={setStore} showToast={showToast} />}
            {panel === 'report' && <ReportPanel store={store} />}
            {panel === 'roles' && <RolesPanel store={store} setStore={setStore} showToast={showToast} />}
            {panel === 'story' && <StoryPanel store={store} setStore={setStore} showToast={showToast} />}
            {panel === 'interpreter' && <InterpreterPanel store={store} setStore={setStore} showToast={showToast} />}
            {panel === 'duel' && <DuelPanel store={store} setStore={setStore} showToast={showToast} fireConfetti={fireConfetti} />}
            {panel === 'ielts' && <IELTSPanel store={store} setStore={setStore} showToast={showToast} checkPro={checkPro} />}
            {panel === 'stickers' && <StickersPanel store={store} />}
            {panel === 'settings' && <SettingsPanel store={store} setStore={setStore} showToast={showToast} />}
            {panel === 'classroom' && <ClassroomPanel store={store} showToast={showToast} />}
          </div>
        </main>
      </div>

      {/* Mobile Tabbar */}
      <MobileTabbar panel={panel} setPanel={setPanel} />

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Pro Modal */}
      {showProModal && (
        <ProModal onClose={() => setShowProModal(false)} setStore={setStore} fireConfetti={fireConfetti} />
      )}
    </div>
  );
}

// ============ ONBOARDING ============
function Onboarding({ store, setStore }: { store: StoreData; setStore: (s: StoreData) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [lang, setLang] = useState('en');
  const [interests, setInterests] = useState<string[]>([]);
  const [placementIdx, setPlacementIdx] = useState(0);
  const [placementAnswers, setPlacementAnswers] = useState<number[]>([]);
  const [greetings, setGreetings] = useState(0);

  const greetingsList = ['Salom', 'Hello', 'Hallo', 'Привет', 'Merhaba'];

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetings(g => (g + 1) % greetingsList.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const INTERESTS = ['🏥 Tibbiyot', '💻 IT', '✈️ Sayohat', '⚽ Futbol', '🎬 Kino', '🎵 Musiqa', '💼 Biznes', '🍳 Oshxona'];

  const toggleInterest = (i: string) => {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const finishPlacement = () => {
    let level = 'A1';
    const correct = placementAnswers.filter((a, i) => a === PLACEMENT[i].a).length;
    if (correct >= 7) level = 'C1';
    else if (correct >= 6) level = 'B2';
    else if (correct >= 5) level = 'B1';
    else if (correct >= 3) level = 'A2';

    setStore({
      ...store,
      onboarded: true,
      name,
      lang,
      interests,
      levels: { ...store.levels, [lang]: level },
    });
  };

  const skipPlacement = () => {
    setStore({
      ...store,
      onboarded: true,
      name,
      lang,
      interests,
      levels: { ...store.levels, [lang]: 'A1' },
    });
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Step 0: Splash */}
        {step === 0 && (
          <div className="text-center space-y-8">
            <div className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-display)] text-pine transition-all duration-500">
              {greetingsList[greetings]}
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {['📚', '🌍', '🎓', '💬', '🧠'].map((e, i) => (
                <span key={i} className="sticker p-3 text-2xl" style={{ transform: `rotate(${(i - 2) * 3}deg)` }}>{e}</span>
              ))}
            </div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-ink">
              GAPLASH
            </h1>
            <p className="text-lg text-ink/70">Chatbot emas. Haqiqiy AI repetitor.</p>
            <button onClick={() => setStep(1)} className="btn btn-primary text-lg">
              Boshlash <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Step 1: Til tanlash */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)]">Qaysi tilni o'rganmoqchisiz?</h2>
            <div className="grid gap-3">
              {[
                { code: 'en', name: 'English', flag: '🇬🇧', desc: "To'liq baza — 60+ so'z, 12 dars" },
                { code: 'de', name: 'Deutsch', flag: '🇩🇪', desc: 'Demo versiya' },
                { code: 'ru', name: 'Русский', flag: '🇷🇺', desc: 'Demo versiya' },
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setStep(2); }}
                  className={`sticker p-4 text-left flex items-center gap-4 ${lang === l.code ? 'ring-2 ring-leaf' : ''}`}
                >
                  <span className="text-3xl">{l.flag}</span>
                  <div>
                    <div className="font-bold text-lg">{l.name}</div>
                    <div className="text-sm text-ink/60">{l.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Ism + qiziqishlar */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)]">Tanishaylik! 👋</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Ismingiz:</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Masalan: Ali"
                className="w-full p-3 border-2 border-ink rounded-lg bg-paper2 focus:outline-none focus:border-leaf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Qiziqishlaringiz (darslar shunga moslanadi):</label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map(i => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`tag cursor-pointer ${interests.includes(i) ? 'bg-leaf text-white' : 'bg-paper2'}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!name.trim()}
              className="btn btn-primary disabled:opacity-50"
            >
              Davom etish <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Step 3: Placement Test */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)]">
              Darajangizni aniqlaymiz 📊
            </h2>
            <p className="text-sm text-ink/60">8 ta savol — darajangiz A1 dan C1 gacha aniqlanadi.</p>
            
            {placementIdx < PLACEMENT.length ? (
              <div className="space-y-4">
                <div className="sticker p-4">
                  <div className="text-xs text-ink/50 mb-1">Savol {placementIdx + 1}/{PLACEMENT.length}</div>
                  <div className="font-medium text-lg">{PLACEMENT[placementIdx].q}</div>
                </div>
                <div className="grid gap-2">
                  {PLACEMENT[placementIdx].opts.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPlacementAnswers([...placementAnswers, i]);
                        setPlacementIdx(placementIdx + 1);
                      }}
                      className="btn btn-ghost text-left justify-start"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <p>Tayyor! Natijangiz hisoblanmoqda...</p>
                <button onClick={finishPlacement} className="btn btn-primary">
                  Natijani ko'rish
                </button>
              </div>
            )}
            
            <button onClick={skipPlacement} className="text-sm text-ink/50 underline">
              O'tkazib yuborish (= A1 daraja)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ SIDEBAR ============
function Sidebar({ panel, setPanel, store }: { panel: string; setPanel: (p: string) => void; store: StoreData }) {
  const items = [
    { id: 'home', icon: Home, label: 'Bosh' },
    { id: 'chat', icon: MessageCircle, label: 'Suhbat' },
    { id: 'words', icon: BookOpen, label: 'So\'zlar', badge: getDueWords(store, store.lang).length },
    { id: 'grammar', icon: GraduationCap, label: 'Grammatika' },
    { id: 'test', icon: HelpCircle, label: 'Test' },
    { id: 'silk', icon: Map, label: '🗺️ Ipak yo\'li' },
    { id: 'passport', icon: CreditCard, label: '🛂 Pasport' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'voice', icon: Mic, label: '🎙️ Ovoz' },
    { id: 'podcast', icon: Headphones, label: '🎧 Podkast' },
    { id: 'journal', icon: PenTool, label: '✍️ Jurnal' },
    { id: 'report', icon: Mail, label: '📮 Varaqa' },
    { id: 'roles', icon: Drama, label: '🎭 Rollar' },
    { id: 'story', icon: BookMarked, label: '📖 Story' },
    { id: 'interpreter', icon: Languages, label: '🔄 Tarjimon' },
    { id: 'duel', icon: Swords, label: '⚔️ Duel' },
    { id: 'ielts', icon: Target, label: '🎯 IELTS' },
    { id: 'stickers', icon: Camera, label: '📷 Stikerlar' },
    { id: 'settings', icon: Settings, label: '⚙️ Sozlama' },
    { id: 'classroom', icon: School, label: '🏫 Sinf' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 bg-pine text-white p-4 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">GAPLASH</h1>
        <p className="text-xs text-white/60">AI Til Repetitori</p>
      </div>
      <nav className="space-y-1 flex-1">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setPanel(item.id)}
            className={`sidebar-item w-full text-white ${panel === item.id ? 'active' : ''}`}
          >
            <item.icon size={16} />
            <span className="flex-1 text-left text-sm">{item.label}</span>
            {item.badge ? (
              <span className="bg-red text-white text-xs px-1.5 py-0.5 rounded-full">{item.badge}</span>
            ) : null}
          </button>
        ))}
      </nav>
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center gap-2 text-sm">
          <Flame size={16} className="text-gold" />
          <span>{store.streak} kun</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <Zap size={16} className="text-gold" />
          <span>{store.xp} XP</span>
        </div>
      </div>
    </aside>
  );
}

// ============ TOPBAR ============
function Topbar({ store, setStore, showToast }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void }) {
  return (
    <div className="sticky top-0 z-10 bg-paper/90 backdrop-blur border-b border-ink/10 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Flame size={18} className="text-gold" />
          <span className="font-bold font-[family-name:var(--font-mono)]">{store.streak}</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap size={18} className="text-gold" />
          <span className="font-bold font-[family-name:var(--font-mono)]">{store.xp}</span>
          <span className="text-xs text-ink/50">XP</span>
        </div>
        <div className="hidden sm:block">
          <span className="tag bg-gold-soft">{store.levels[store.lang as keyof typeof store.levels] || 'A1'}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{store.name} 👋</span>
        <button
          onClick={() => setStore({ ...store, darkMode: !store.darkMode })}
          className="p-2 rounded-lg hover:bg-ink/5"
          title="Dark mode"
        >
          {store.darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}

// ============ MOBILE TABBAR ============
function MobileTabbar({ panel, setPanel }: { panel: string; setPanel: (p: string) => void }) {
  const items = [
    { id: 'home', icon: Home, label: 'Bosh' },
    { id: 'chat', icon: MessageCircle, label: 'Suhbat' },
    { id: 'words', icon: BookOpen, label: 'So\'zlar' },
    { id: 'grammar', icon: GraduationCap, label: 'Gramm.' },
    { id: 'test', icon: HelpCircle, label: 'Test' },
    { id: 'silk', icon: Map, label: 'Xarita' },
    { id: 'progress', icon: BarChart3, label: 'Stat' },
    { id: 'voice', icon: Mic, label: 'Ovoz' },
    { id: 'duel', icon: Swords, label: 'Duel' },
    { id: 'settings', icon: Settings, label: '⚙️' },
  ];

  return (
    <div className="tabbar md:hidden">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => setPanel(item.id)}
          className={`tabbar-item ${panel === item.id ? 'active' : ''}`}
        >
          <item.icon size={16} className="inline mr-1" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ============ HOME PANEL ============
function HomePanel({ store, setStore, setPanel }: { store: StoreData; setStore: (s: StoreData) => void; setPanel: (p: string) => void }) {
  const hour = new Date().getHours();
  let greeting = 'Xayrli kun';
  let ritual = '';
  if (hour < 11) { greeting = 'Xayrli tong'; ritual = '🌅 Ertalabgi eslash — 5 daqiqa so\'z takrorlang!'; }
  else if (hour < 18) { greeting = 'Xayrli kun'; ritual = '📚 Bugungi darsni boshlang!'; }
  else { greeting = 'Xayrli kech'; ritual = '🌙 Uyqu oldi review — 5 daqiqa so\'z takrorlang!'; }

  const xpGoal = 60;
  const progress = Math.min((store.xpToday / xpGoal) * 100, 100);

  const quickCards = [
    { icon: '💬', title: 'Suhbat', desc: 'Erkin gaplashish', panel: 'chat' },
    { icon: '📖', title: 'Dars', desc: LESSONS_EN[store.done[store.lang as keyof typeof store.done]?.length || 0]?.title || 'Keyingi dars', panel: 'chat' },
    { icon: '🔤', title: 'So\'zlar', desc: `${getDueWords(store, store.lang).length} ta kutmoqda`, panel: 'words' },
    { icon: '📝', title: 'Test', desc: 'Bilimingizni tekshiring', panel: 'test' },
    { icon: '🎙️', title: 'Ovoz', desc: 'Talaffuz mashqi', panel: 'voice' },
    { icon: '⚔️', title: 'Duel', desc: 'Max bilan poyga', panel: 'duel' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">
          {greeting}, {store.name}! 👋
        </h1>
        <p className="text-ink/60 mt-1">{ritual}</p>
      </div>

      {/* XP Progress */}
      <div className="sticker p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Kunlik maqsad</span>
          <span className="font-[family-name:var(--font-mono)] text-sm">{store.xpToday}/{xpGoal} XP</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Quick Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {quickCards.map(card => (
          <button
            key={card.title}
            onClick={() => setPanel(card.panel)}
            className="sticker p-4 text-left"
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="font-bold text-sm">{card.title}</div>
            <div className="text-xs text-ink/60">{card.desc}</div>
          </button>
        ))}
      </div>

      {/* Level info */}
      <div className="gold-card">
        <div className="flex items-center gap-3">
          <Award size={24} className="text-ink" />
          <div>
            <div className="font-bold">Darajangiz: {store.levels[store.lang as keyof typeof store.levels] || 'A1'}</div>
            <div className="text-sm text-ink/70">Test topshirib darajangizni oshiring!</div>
          </div>
          <button onClick={() => setPanel('test')} className="btn btn-primary ml-auto text-sm">
            Test <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ CHAT PANEL ============
function ChatPanel({ store, setStore, showToast }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void }) {
  const [mode, setMode] = useState<'lesson' | 'free'>('lesson');
  const [lessonIdx, setLessonIdx] = useState(store.done[store.lang as keyof typeof store.done]?.length || 0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [messages, setMessages] = useState<{role: string; text: string; type?: string}[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [freeMsgs, setFreeMsgs] = useState<{role: string; text: string}[]>([]);
  const [freeInput, setFreeInput] = useState('');
  const [freeQuestionIdx, setFreeQuestionIdx] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentLesson = LESSONS_EN[lessonIdx % LESSONS_EN.length];

  useEffect(() => {
    if (mode === 'lesson' && messages.length === 0 && currentLesson) {
      setMessages([
        { role: 'tutor', text: `${currentLesson.emoji} ${currentLesson.title}`, type: 'header' },
        { role: 'tutor', text: currentLesson.intro },
        { role: 'tutor', text: currentLesson.questions[0]?.ask || "Savol tayyorlanmoqda..." },
      ]);
    }
  }, [mode, lessonIdx]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, freeMsgs]);

  const handleAnswer = () => {
    if (!input.trim()) return;
    if (!currentLesson) return;

    const q = currentLesson.questions[questionIdx];
    if (!q) return;

    const result = checkAnswer(input, q.expect, q.errors);

    if (result.correct) {
      const praise = getPraise(store.name);
      setMessages(prev => [...prev,
        { role: 'user', text: input },
        { role: 'tutor', text: `✅ ${praise}` },
      ]);
      
      let newStore = addXP(store, 10);
      newStore = { ...newStore, totals: { ...newStore.totals, correct: newStore.totals.correct + 1, answers: newStore.totals.answers + 1 } };
      setStore(newStore);
      
      setAttempts(0);
      setInput('');
      
      setTimeout(() => {
        if (questionIdx + 1 < currentLesson.questions.length) {
          setQuestionIdx(questionIdx + 1);
          setMessages(prev => [...prev, { role: 'tutor', text: currentLesson.questions[questionIdx + 1].ask }]);
        } else {
          setShowQuiz(true);
        }
      }, 1000);
    } else {
      setMessages(prev => [...prev, { role: 'user', text: input }]);
      
      let newStore = addXP(store, 0);
      newStore = { ...newStore, totals: { ...newStore.totals, answers: newStore.totals.answers + 1 } };
      if (result.category) {
        newStore = { ...newStore, errCats: { ...newStore.errCats, [result.category]: (newStore.errCats[result.category] || 0) + 1 } };
      }
      if (result.isUzInterference) {
        newStore = { ...newStore, contrastHits: { ...newStore.contrastHits, [result.wrong || '']: (newStore.contrastHits[result.wrong || ''] || 0) + 1 } };
      }
      setStore(newStore);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setInput('');

      if (newAttempts >= 3) {
        setMessages(prev => [...prev,
          { role: 'error', text: `✗ ${result.wrong || input}` },
          { role: 'tutor', text: `✓ ${result.right || q.ans}` },
          { role: 'tutor', text: `💡 ${result.why || q.ansWhy}` },
          { role: 'tutor', text: 'Davom etamiz! ▶' },
        ]);
        setAttempts(0);
        setTimeout(() => {
          if (questionIdx + 1 < currentLesson.questions.length) {
            setQuestionIdx(questionIdx + 1);
            setMessages(prev => [...prev, { role: 'tutor', text: currentLesson.questions[questionIdx + 1].ask }]);
          } else {
            setShowQuiz(true);
          }
        }, 1500);
      } else if (newAttempts === 1) {
        setMessages(prev => [...prev,
          { role: 'error', text: `✗ Xato. ${result.isUzInterference ? '🧬 UZ-INTERFERENS' : ''}` },
          { role: 'tutor', text: `💡 ${result.why || q.h1}` },
          { role: 'tutor', text: 'Qayta urinib ko\'ring!' },
        ]);
      } else {
        setMessages(prev => [...prev,
          { role: 'error', text: `✗ Yaqin! ${result.isUzInterference ? '🧬 UZ-INTERFERENS' : ''}` },
          { role: 'tutor', text: `💡 ${result.why || q.h2}` },
        ]);
      }
    }
  };

  const finishLesson = () => {
    let newStore = addXP(store, 30);
    newStore = { ...newStore, totals: { ...newStore.totals, lessons: newStore.totals.lessons + 1 } };
    const doneKey = store.lang as keyof typeof newStore.done;
    const doneList = [...newStore.done[doneKey]];
    if (!doneList.includes(currentLesson.id)) {
      doneList.push(currentLesson.id);
    }
    newStore = { ...newStore, done: { ...newStore.done, [doneKey]: doneList } };
    newStore = { ...newStore, lessonCount: newStore.lessonCount + 1, lessonDay: today() };
    
    // Add new words to deck
    for (const w of currentLesson.newWords) {
      newStore = addWordToDeck(newStore, w.w, store.lang);
    }
    
    setStore(newStore);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setShowQuiz(false);
    setLessonIdx(lessonIdx + 1);
    setQuestionIdx(0);
    setMessages([]);
    setAttempts(0);
    showToast(`+30 XP! Dars tugadi 🎉`);
  };

  // Free talk mode
  const handleFreeAnswer = async () => {
    if (!freeInput.trim()) return;

    const contrastResult = checkContrast(freeInput);
    const newFreeMsgs = [...freeMsgs, { role: 'user', text: freeInput }];
    
    let newStore = { ...store };
    newStore.mem = extractMemory(freeInput, store.mem);
    
    if (contrastResult) {
      newFreeMsgs.push({ role: 'error', text: `✗ ${contrastResult.wrong}` });
      newFreeMsgs.push({ role: 'tutor', text: `✓ ${contrastResult.right}\n💡 ${contrastResult.why}` });
      newStore = { ...newStore, contrastHits: { ...newStore.contrastHits, [contrastResult.wrong || '']: (newStore.contrastHits[contrastResult.wrong || ''] || 0) + 1 } };
    } else {
      const memoryNote = freeMsgs.length % 6 === 0 ? getMemoryReminder(newStore.mem) : '';
      const nextQ = FREE_TALK[freeQuestionIdx % FREE_TALK.length];
      newFreeMsgs.push({ role: 'tutor', text: `${memoryNote}Yaxshi javob! ${nextQ}` });
      setFreeQuestionIdx(freeQuestionIdx + 1);
    }
    
    newStore = addXP(newStore, 5);
    setStore(newStore);
    setFreeMsgs(newFreeMsgs);
    setFreeInput('');
  };

  if (chatMode) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">💬 Erkin suhbat</h2>
          <button onClick={() => setChatMode(false)} className="btn btn-ghost text-sm">← Darslar</button>
        </div>
        
        <div className="bg-notebook rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3 border-2 border-ink/20">
          {freeMsgs.length === 0 && (
            <div className="text-center text-ink/50 py-8">
              <p>Max: Hello, {store.name}! 👋</p>
              <p className="mt-2">{FREE_TALK[0]}</p>
            </div>
          )}
          {freeMsgs.map((msg, i) => (
            <div key={i} className={`${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user' ? 'bg-blue/10 border border-blue/30' :
                msg.role === 'error' ? 'corr-card' :
                'bg-leaf/10 border border-leaf/30'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <input
            value={freeInput}
            onChange={e => setFreeInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleFreeAnswer()}
            placeholder="Javobingizni yozing..."
            className="flex-1 p-3 border-2 border-ink rounded-lg bg-paper2"
          />
          <button onClick={handleFreeAnswer} className="btn btn-primary">
            <ArrowRight size={18} />
          </button>
          <button onClick={() => speak(freeMsgs[freeMsgs.length - 1]?.text || '', 'en-US')} className="btn btn-ghost">
            <Volume2 size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">📝 Mini-test</h2>
        <div className="gold-card text-center">
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-xl font-bold">Dars tugadi!</div>
          <div className="text-sm text-ink/70 mt-2">
            {currentLesson.newWords.map(w => w.w).join(', ')} — yangi so'zlar deck'ga qo'shildi
          </div>
          <button onClick={finishLesson} className="btn btn-primary mt-4">
            Yakunlash +30 XP <Zap size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">💬 Suhbat</h2>
        <button onClick={() => setChatMode(true)} className="btn btn-ghost text-sm">Erkin suhbat →</button>
      </div>

      {currentLesson && (
        <div className="sticker p-3 flex items-center gap-3">
          <span className="text-2xl">{currentLesson.emoji}</span>
          <div>
            <div className="font-bold">{currentLesson.title}</div>
            <div className="text-xs text-ink/60">{currentLesson.lvl} • {questionIdx + 1}/{currentLesson.questions.length}</div>
          </div>
        </div>
      )}

      <div className="bg-notebook rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3 border-2 border-ink/20">
        {messages.map((msg, i) => (
          <div key={i} className={`${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-3 rounded-lg max-w-[85%] ${
              msg.role === 'user' ? 'bg-blue/10 border border-blue/30' :
              msg.role === 'error' ? 'corr-card' :
              msg.type === 'header' ? 'gold-card font-bold' :
              'bg-leaf/10 border border-leaf/30'
            }`}>
              {msg.text}
              {msg.role === 'tutor' && msg.type !== 'header' && (
                <button onClick={() => speak(msg.text, 'en-US')} className="ml-2 opacity-50 hover:opacity-100">
                  <Volume2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAnswer()}
          placeholder="Javobingizni yozing..."
          className="flex-1 p-3 border-2 border-ink rounded-lg bg-paper2"
        />
        <button onClick={handleAnswer} className="btn btn-primary">
          <ArrowRight size={18} />
        </button>
      </div>

      {attempts > 0 && attempts < 3 && currentLesson?.questions[questionIdx] && (
        <div className="text-sm text-ink/60 italic">
          💡 Hint: {attempts === 1 ? currentLesson.questions[questionIdx].h1 : currentLesson.questions[questionIdx].h2}
        </div>
      )}
    </div>
  );
}

// ============ WORDS PANEL ============
function WordsPanel({ store, setStore, showToast, fireConfetti }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void; fireConfetti: () => void }) {
  const [mode, setMode] = useState<'list' | 'session'>('list');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mnemInput, setMnemInput] = useState('');

  const lang = store.lang;
  const allWords = WORDS_EN;
  const dueWords = getDueWords(store, lang);
  const sessionWords = dueWords.length > 0 ? dueWords : allWords.slice(0, 5).map(w => ({ w: w.w, due: 0, ivl: 0, reps: 0 }));

  const getWordData = (w: string): Word | undefined => allWords.find(x => x.w === w);

  const handleReview = (quality: number) => {
    const word = sessionWords[currentIdx];
    if (!word) return;
    
    let newStore = reviewWord(store, word.w, quality, lang);
    newStore = addXP(newStore, quality >= 3 ? 3 : 0);
    setStore(newStore);
    
    if (quality >= 3) {
      fireConfetti();
    }
    
    setFlipped(false);
    if (currentIdx + 1 < sessionWords.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setMode('list');
      setCurrentIdx(0);
      showToast("Sessiya tugadi! 🎉");
    }
  };

  const saveMnemonic = () => {
    if (!mnemInput.trim()) return;
    const word = sessionWords[currentIdx];
    if (!word) return;
    const newStore = { ...store, mnem: { ...store.mnem, [word.w]: mnemInput } };
    setStore(newStore);
    showToast("Mnemonika saqlandi! 🧠");
    setMnemInput('');
  };

  if (mode === 'session' && sessionWords.length > 0) {
    const word = getWordData(sessionWords[currentIdx]?.w);
    if (!word) return <div>So'z topilmadi</div>;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">🔤 So'zlar sessiyasi</h2>
          <span className="tag">{currentIdx + 1}/{sessionWords.length}</span>
        </div>

        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          <div className="flashcard-inner sticker p-8 min-h-[250px] flex flex-col items-center justify-center text-center">
            {!flipped ? (
              <>
                <div className="text-3xl font-bold mb-2">{word.w}</div>
                <div className="text-sm text-ink/50 font-[family-name:var(--font-mono)]">{word.ipa}</div>
                <div className="tag mt-2 bg-gold-soft">{word.lvl}</div>
                <div className="text-xs text-ink/40 mt-4">Bosib aylantiring →</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold mb-2">{word.tr}</div>
                <div className="text-sm italic mt-2">"{word.ex}"</div>
                <div className="text-xs text-ink/60 mt-1">{word.exTr}</div>
                <div className="mt-3 p-2 bg-gold-soft rounded text-sm">🧠 {word.assoc}</div>
                {store.mnem[word.w] && (
                  <div className="mt-2 p-2 bg-leaf/10 rounded text-sm">📝 Sizning: {store.mnem[word.w]}</div>
                )}
              </>
            )}
          </div>
        </div>

        {flipped && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                value={mnemInput}
                onChange={e => setMnemInput(e.target.value)}
                placeholder="O'z mnemonikangiz..."
                className="flex-1 p-2 border-2 border-ink rounded-lg bg-paper2 text-sm"
              />
              <button onClick={saveMnemonic} className="btn btn-gold text-sm">
                <Plus size={16} />
              </button>
            </div>
            <div className="flex gap-2 justify-center">
              <button onClick={() => handleReview(1)} className="btn btn-red text-sm">Mustahkam emas</button>
              <button onClick={() => handleReview(3)} className="btn btn-primary text-sm">Bilaman ✓</button>
              <button onClick={() => handleReview(5)} className="btn btn-gold text-sm">Oson! ⭐</button>
            </div>
          </div>
        )}

        <button onClick={() => { setMode('list'); setCurrentIdx(0); }} className="btn btn-ghost text-sm">
          ← Ro'yxatga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🔤 So'zlar</h2>
        <div className="flex items-center gap-2">
          <span className="tag bg-red-soft text-red">{dueWords.length} due</span>
          {dueWords.length > 0 && (
            <button onClick={() => { setMode('session'); setCurrentIdx(0); setFlipped(false); }} className="btn btn-primary text-sm">
              Sessiya boshlash <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allWords.slice(0, 20).map(word => {
          const inDeck = store.deck[lang as keyof typeof store.deck]?.find(d => d.w === word.w);
          return (
            <div key={word.w} className="sticker p-3" style={{ transform: `rotate(${(Math.random() - 0.5) * 1.2}deg)` }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{word.w}</div>
                  <div className="text-xs text-ink/50 font-[family-name:var(--font-mono)]">{word.ipa}</div>
                </div>
                <span className="tag bg-gold-soft text-xs">{word.lvl}</span>
              </div>
              <div className="text-sm mt-1">{word.tr}</div>
              {inDeck && <div className="text-xs text-leaf mt-1">✓ deck'da • {inDeck.reps} marta</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ GRAMMAR PANEL ============
function GrammarPanel() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">📚 Grammatika</h2>
      <div className="space-y-2">
        {GRAMMAR_EN.map((topic, i) => (
          <div key={i} className="sticker overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full p-4 text-left flex items-center gap-3"
            >
              <span className="text-2xl">{topic.emoji}</span>
              <span className="font-bold flex-1">{topic.title}</span>
              <ChevronRight size={18} className={`transition-transform ${openIdx === i ? 'rotate-90' : ''}`} />
            </button>
            {openIdx === i && (
              <div className="px-4 pb-4 space-y-3 border-t border-ink/10">
                <p className="text-sm mt-3">{topic.story}</p>
                <div className="grid gap-2">
                  {topic.pairs.map((pair, j) => (
                    <div key={j} className="flex gap-2 text-sm">
                      <span className="text-leaf">✓</span>
                      <span className="flex-1">{pair[0]}</span>
                      <span className="text-ink/40">↔</span>
                      <span className="flex-1 text-ink/70">{pair[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ TEST PANEL ============
function TestPanel({ store, setStore, showToast, fireConfetti }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void; fireConfetti: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [finished, setFinished] = useState(false);
  const [testBank, setTestBank] = useState(TESTS_EN.slice(0, 10));

  const current = testBank[idx];

  const handleAnswer = (optIdx: number) => {
    if (answered) return;
    setSelected(optIdx);
    setAnswered(true);
    if (optIdx === current.a) {
      setScore(score + 1);
      let newStore = addXP(store, 6);
      setStore(newStore);
    }
  };

  const nextQuestion = () => {
    if (idx + 1 >= testBank.length) {
      setFinished(true);
      const pct = Math.round((score / testBank.length) * 100);
      if (pct >= 80) {
        fireConfetti();
        showToast(`🎉 ${pct}% — Ajoyib natija!`);
      }
    } else {
      setIdx(idx + 1);
      setAnswered(false);
      setSelected(-1);
    }
  };

  const restart = () => {
    setIdx(0);
    setScore(0);
    setAnswered(false);
    setSelected(-1);
    setFinished(false);
    setTestBank([...TESTS_EN].sort(() => Math.random() - 0.5).slice(0, 10));
  };

  if (finished) {
    const pct = Math.round((score / testBank.length) * 100);
    return (
      <div className="space-y-4 text-center">
        <div className="gold-card p-8">
          <div className="text-5xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
          <div className="text-2xl font-bold">{score}/{testBank.length} to'g'ri</div>
          <div className="text-lg mt-2">{pct}%</div>
          <div className="text-sm text-ink/70 mt-4">
            {pct >= 80 ? "Ajoyib natija! Darajangiz oshdi!" : pct >= 50 ? "Yaxshi! Yana mashq qiling." : "Ko'proq dars qiling, keyin qayta urinib ko'ring."}
          </div>
          <button onClick={restart} className="btn btn-primary mt-4">
            <RotateCcw size={16} /> Qayta boshlash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">📝 Test</h2>
        <span className="tag">{idx + 1}/{testBank.length} • {score} to'g'ri</span>
      </div>

      <div className="sticker p-6">
        <div className="font-bold text-lg mb-4">{current.q}</div>
        <div className="grid gap-2">
          {current.opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                answered && i === current.a ? 'border-leaf bg-leaf/10 font-bold' :
                answered && i === selected && i !== current.a ? 'border-red bg-red/10' :
                'border-ink/20 hover:border-ink/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <div className="mt-4 p-3 bg-gold-soft rounded-lg">
            <div className="text-sm font-medium">💡 {current.why}</div>
            <button onClick={nextQuestion} className="btn btn-primary text-sm mt-3">
              {idx + 1 >= testBank.length ? 'Natija' : 'Keyingi'} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ SILK ROAD PANEL ============
function SilkRoadPanel({ store }: { store: StoreData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🗺️ Ipak yo'li</h2>
      <p className="text-sm text-ink/60">Samarqanddan Londongacha — har bir shahar yangi bosqich!</p>
      
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ink/20"></div>
        <div className="space-y-6">
          {SILK_ROAD.map((city, i) => {
            const unlocked = city.check(store);
            return (
              <div key={i} className="flex items-start gap-4 relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 ${
                  unlocked ? 'bg-leaf text-white border-2 border-ink' : 'bg-ink/10 border-2 border-ink/20'
                }`}>
                  {unlocked ? city.emoji : '🔒'}
                </div>
                <div className={`sticker p-4 flex-1 ${!unlocked ? 'opacity-50' : ''}`}>
                  <div className="font-bold">{city.city}</div>
                  <div className="text-sm text-ink/60">{city.req}</div>
                  {unlocked && <div className="stamp inline-block mt-2 text-xs">✓ OCHILDI</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ PASSPORT PANEL ============
function PassportPanel({ store }: { store: StoreData }) {
  const downloadCert = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#f7f4ea';
    ctx.fillRect(0, 0, 800, 600);
    
    // Border
    ctx.strokeStyle = '#134534';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 760, 560);
    ctx.strokeRect(30, 30, 740, 540);

    // Title
    ctx.fillStyle = '#134534';
    ctx.font = 'bold 36px Bricolage Grotesque, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GAPLASH', 400, 80);
    
    ctx.font = '20px Manrope, sans-serif';
    ctx.fillText('Sertifikat', 400, 120);

    // Name
    ctx.font = 'bold 28px Manrope, sans-serif';
    ctx.fillText(store.name || 'O\'quvchi', 400, 220);

    // Level
    ctx.font = '22px Manrope, sans-serif';
    ctx.fillText(`Daraja: ${store.levels[store.lang as keyof typeof store.levels] || 'A1'}`, 400, 280);

    // Stats
    ctx.font = '16px Manrope, sans-serif';
    ctx.fillText(`${store.xp} XP • ${store.totals.lessons} dars • ${store.streak} kun streak`, 400, 340);

    // Date
    ctx.font = '14px Space Mono, monospace';
    ctx.fillText(new Date().toLocaleDateString('uz-UZ'), 400, 420);

    // Signature
    ctx.font = 'italic 18px Manrope, sans-serif';
    ctx.fillText('GAPLASH AI Repetitor', 400, 500);

    // Download
    const link = document.createElement('a');
    link.download = `gaplash-cert-${store.name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🛂 Til pasporti</h2>
      
      <div className="sticker p-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">🛂</div>
          <div className="text-xl font-bold">{store.name}</div>
          <div className="tag bg-gold-soft text-lg">{store.levels[store.lang as keyof typeof store.levels] || 'A1'}</div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{store.xp}</div>
              <div className="text-xs text-ink/60">XP</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{store.totals.lessons}</div>
              <div className="text-xs text-ink/60">Dars</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{store.streak}</div>
              <div className="text-xs text-ink/60">Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stamps */}
      <div className="flex flex-wrap gap-3">
        {SILK_ROAD.filter(c => c.check(store)).map((city, i) => (
          <div key={i} className="stamp text-xs">{city.emoji} {city.city}</div>
        ))}
      </div>

      <button onClick={downloadCert} className="btn btn-primary">
        <Download size={18} /> Sertifikat yuklab olish
      </button>
    </div>
  );
}

// ============ PROGRESS PANEL ============
function ProgressPanel({ store }: { store: StoreData }) {
  const maxCat = Math.max(...Object.values(store.errCats), 1);
  const topContrast = Object.entries(store.contrastHits).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">📊 Progress</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'XP', value: store.xp, icon: <Zap size={16} className="text-gold" /> },
          { label: 'Dars', value: store.totals.lessons, icon: <BookOpen size={16} className="text-leaf" /> },
          { label: "To'g'ri", value: `${store.totals.correct}/${store.totals.answers}`, icon: <Check size={16} className="text-leaf" /> },
          { label: 'Streak', value: `${store.streak} 🔥`, icon: <Flame size={16} className="text-red" /> },
        ].map((s, i) => (
          <div key={i} className="sticker p-3 text-center">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <div className="text-xl font-bold font-[family-name:var(--font-mono)]">{s.value}</div>
            <div className="text-xs text-ink/60">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Level Path */}
      <div className="sticker p-4">
        <div className="font-bold mb-3">Daraja yo'li</div>
        <div className="flex items-center gap-1">
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => {
            const current = store.levels[store.lang as keyof typeof store.levels] || 'A1';
            const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
            const isReached = levels.indexOf(lvl) <= levels.indexOf(current);
            return (
              <div key={lvl} className={`flex-1 text-center py-2 rounded text-xs font-bold ${
                isReached ? 'bg-leaf text-white' : 'bg-ink/10'
              }`}>
                {lvl}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Categories */}
      <div className="sticker p-4">
        <div className="font-bold mb-3">Xato kategoriyalari</div>
        <div className="space-y-2">
          {Object.entries(store.errCats).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-2">
              <span className="text-xs w-20 capitalize">{cat}</span>
              <div className="flex-1 h-4 bg-ink/10 rounded overflow-hidden">
                <div className="h-full bg-red rounded" style={{ width: `${(count / maxCat) * 100}%` }}></div>
              </div>
              <span className="text-xs font-[family-name:var(--font-mono)]">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contrast Hits */}
      {topContrast.length > 0 && (
        <div className="sticker p-4">
          <div className="font-bold mb-3">🧬 Xato pasporti (UZ-Interferens)</div>
          <div className="space-y-2">
            {topContrast.map(([err, count], i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="tag bg-red-soft text-red">🧬</span>
                <span className="flex-1 wavy-red">{err}</span>
                <span className="font-[family-name:var(--font-mono)] text-xs">{count}×</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ VOICE PANEL ============
function VoicePanel({ store, showToast }: { store: StoreData; showToast: (m: string) => void }) {
  const [mode, setMode] = useState<'shadow' | 'pairs' | 'phoneme'>('shadow');
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState('');

  const handleShadow = () => {
    const sentence = SHADOW_SENTENCES[idx];
    const stopFn = startRecognition('en-US',
      (text) => {
        const targetWords = sentence.toLowerCase().split(/\s+/);
        const heardWords = text.toLowerCase().split(/\s+/);
        const matches = targetWords.filter(w => heardWords.some(h => h.includes(w) || w.includes(h)));
        const accuracy = Math.round((matches.length / targetWords.length) * 100);
        setResult(`Aniqlik: ${accuracy}% (${matches.length}/${targetWords.length} so'z)`);
      },
      (err) => {
        showToast(err);
        setResult('Ovoz tanish ishlamadi. Matnni o\'qib mashq qiling.');
      }
    );
    if (!stopFn) {
      showToast("Brauzeringiz mikrofonni qo'llab-quvvatlamaydi");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🎙️ Ovoz studiyasi</h2>
      
      <div className="flex gap-2">
        <button onClick={() => setMode('shadow')} className={`tag cursor-pointer ${mode === 'shadow' ? 'bg-leaf text-white' : ''}`}>Shadowing</button>
        <button onClick={() => setMode('pairs')} className={`tag cursor-pointer ${mode === 'pairs' ? 'bg-leaf text-white' : ''}`}>Juftliklar</button>
        <button onClick={() => setMode('phoneme')} className={`tag cursor-pointer ${mode === 'phoneme' ? 'bg-leaf text-white' : ''}`}>Fonem</button>
      </div>

      {mode === 'shadow' && (
        <div className="sticker p-6 text-center space-y-4">
          <div className="text-xs text-ink/50">{idx + 1}/{SHADOW_SENTENCES.length}</div>
          <div className="text-xl font-medium">{SHADOW_SENTENCES[idx]}</div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => speak(SHADOW_SENTENCES[idx], 'en-US')} className="btn btn-blue">
              <Volume2 size={18} /> Eshit
            </button>
            <button onClick={handleShadow} className="btn btn-primary">
              🎤 Takrorlash
            </button>
          </div>
          {result && <div className="text-sm p-2 bg-gold-soft rounded">{result}</div>}
          <button onClick={() => { setIdx((idx + 1) % SHADOW_SENTENCES.length); setResult(''); }} className="btn btn-ghost text-sm">
            Keyingi →
          </button>
        </div>
      )}

      {mode === 'pairs' && (
        <div className="sticker p-6 text-center space-y-4">
          <div className="text-xs text-ink/50">{idx + 1}/{MINIMAL_PAIRS.length}</div>
          <div className="text-xl font-medium">
            {MINIMAL_PAIRS[idx].a} / {MINIMAL_PAIRS[idx].b}
          </div>
          <div className="text-sm text-ink/60">{MINIMAL_PAIRS[idx].note}</div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => speak(MINIMAL_PAIRS[idx].a, 'en-US')} className="btn btn-blue">🔊 A</button>
            <button onClick={() => speak(MINIMAL_PAIRS[idx].b, 'en-US')} className="btn btn-blue">🔊 B</button>
          </div>
          <button onClick={() => setIdx((idx + 1) % MINIMAL_PAIRS.length)} className="btn btn-ghost text-sm">
            Keyingi →
          </button>
        </div>
      )}

      {mode === 'phoneme' && (
        <div className="space-y-3">
          {PHONEMES.map((ph, i) => (
            <div key={i} className="sticker p-4">
              <div className="font-bold font-[family-name:var(--font-mono)]">{ph.sound}</div>
              <div className="text-sm text-ink/60 mt-1">{ph.tip}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ph.words.map((w, j) => (
                  <button key={j} onClick={() => speak(w, 'en-US')} className="tag cursor-pointer hover:bg-leaf hover:text-white">
                    🔊 {w}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ PODCAST PANEL ============
function PodcastPanel({ store, showToast }: { store: StoreData; showToast: (m: string) => void }) {
  const [playing, setPlaying] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);

  const deckWords = store.deck[store.lang as keyof typeof store.deck]?.slice(0, 3).map(w => w.w) || [];
  const likes = store.mem.likes.slice(0, 2);
  const city = store.mem.city || 'Tashkent';

  const lines = [
    { speaker: 'A', text: `Hey! Did you know that ${deckWords[0] || 'learning'} is important?` },
    { speaker: 'B', text: `Yes! I'm from ${city}. We study every day.` },
    { speaker: 'A', text: `That's great! Do you like ${likes[0] || 'music'}?` },
    { speaker: 'B', text: `Of course! ${likes[0] || 'Music'} helps me relax.` },
    { speaker: 'A', text: `I agree. And ${deckWords[1] || 'practice'} makes perfect!` },
    { speaker: 'B', text: `Absolutely! Let's ${deckWords[2] || 'continue'} tomorrow.` },
    { speaker: 'A', text: `Deal! See you then!` },
    { speaker: 'B', text: `Bye! Have a great day!` },
  ];

  const playAll = () => {
    setPlaying(true);
    setLineIdx(0);
    
    const playLine = (i: number) => {
      if (i >= lines.length) {
        setPlaying(false);
        return;
      }
      setLineIdx(i);
      const line = lines[i];
      const pitch = line.speaker === 'A' ? 1.15 : 0.85;
      speak(line.text, 'en-US', pitch);
      setTimeout(() => playLine(i + 1), line.text.length * 80 + 1000);
    };
    
    playLine(0);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🎧 Shaxsiy podkast</h2>
      <p className="text-sm text-ink/60">Sizning so'zlaringiz va qiziqishlaringiz asosida yaratilgan dialog.</p>

      <div className="sticker p-4 space-y-2">
        {lines.map((line, i) => (
          <div key={i} className={`flex gap-3 p-2 rounded ${i === lineIdx && playing ? 'bg-gold-soft' : ''}`}>
            <span className={`tag ${line.speaker === 'A' ? 'bg-blue text-white' : 'bg-leaf text-white'}`}>
              {line.speaker}
            </span>
            <span className="text-sm flex-1">{line.text}</span>
            <button onClick={() => speak(line.text, 'en-US', line.speaker === 'A' ? 1.15 : 0.85)} className="opacity-50 hover:opacity-100">
              <Volume2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={playAll} className="btn btn-primary" disabled={playing}>
          ▶ Barchasini eshitish
        </button>
        <button onClick={() => showToast("Yangi epizod yaratildi! 🎲")} className="btn btn-ghost">
          🎲 Yangi epizod
        </button>
      </div>
    </div>
  );
}

// ============ JOURNAL PANEL ============
function JournalPanel({ store, setStore, showToast }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void }) {
  const [text, setText] = useState('');
  const [corrections, setCorrections] = useState<{wrong: string; right: string}[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    
    const spellingErrors = checkSpelling(text);
    const contrastResult = checkContrast(text);
    const allCorrections = [...spellingErrors];
    
    if (contrastResult && contrastResult.wrong) {
      allCorrections.push({ wrong: contrastResult.wrong || '', right: contrastResult.right || '' });
    }
    
    // Fix capitalization
    const fixed = text.replace(/\bi\b/g, 'I').replace(/^./, c => c.toUpperCase());
    
    setCorrections(allCorrections);
    setSubmitted(true);
    
    let newStore = addXP(store, 6);
    newStore = { ...newStore, journal: [{ t: Date.now(), text: fixed, n: allCorrections.length }, ...store.journal].slice(0, 10) };
    setStore(newStore);
    showToast("+6 XP! Jurnal yozildi ✍️");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">✍️ Jurnal</h2>
      <p className="text-sm text-ink/60">Inglizcha yozing — xatolaringizni qizil ruchka bilan tuzatamiz.</p>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Bugun nima qildingiz? Inglizcha yozing..."
        className="w-full p-4 border-2 border-ink rounded-lg bg-notebook min-h-[150px] resize-y"
      />

      <button onClick={handleSubmit} className="btn btn-primary" disabled={!text.trim()}>
        Tekshirish <Check size={16} />
      </button>

      {submitted && corrections.length > 0 && (
        <div className="space-y-3">
          <div className="font-bold">🖊 Tuzatishlar:</div>
          {corrections.map((c, i) => (
            <div key={i} className="corr-card">
              <div className="wavy-red text-sm">{c.wrong}</div>
              <div className="text-leaf font-medium text-sm mt-1">→ {c.right}</div>
            </div>
          ))}
        </div>
      )}

      {submitted && corrections.length === 0 && (
        <div className="ok-card">
          <div className="font-medium">✅ Ajoyib! Xato topilmadi!</div>
        </div>
      )}

      {store.journal.length > 0 && (
        <div className="mt-6">
          <div className="font-bold mb-2">📚 Arxiv</div>
          <div className="space-y-2">
            {store.journal.slice(0, 5).map((entry, i) => (
              <div key={i} className="sticker p-3 text-sm">
                <div className="text-xs text-ink/50">{new Date(entry.t).toLocaleDateString()}</div>
                <div className="mt-1">{entry.text.substring(0, 100)}...</div>
                {entry.n > 0 && <span className="tag bg-red-soft text-xs mt-1">{entry.n} tuzatish</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ REPORT PANEL ============
function ReportPanel({ store }: { store: StoreData }) {
  const weekXP = store.hist.slice(-7).reduce((sum, h) => sum + h.xp, 0);
  const weekLessons = store.totals.lessons;
  const weekWords = store.deck[store.lang as keyof typeof store.deck]?.length || 0;
  
  const topError = Object.entries(store.errCats).sort((a, b) => b[1] - a[1])[0];
  
  const teacherNote = store.xp >= 100 
    ? `${store.name}, ajoyib haftalik! ${weekXP} XP to'pladingiz. Davom eting!`
    : store.xp >= 30
    ? `${store.name}, yaxshi boshlanish! Har kuni 10 daqiqa mashq qiling — natija bo'ladi.`
    : `${store.name}, hali kam mashq qildingiz. Bugun 1 ta dars qiling — boshlanishi eng muhimi!`;

  const downloadReport = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f7f4ea';
    ctx.fillRect(0, 0, 600, 400);
    ctx.strokeStyle = '#134534';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, 580, 380);

    ctx.fillStyle = '#134534';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📮 Haftalik varaqa', 300, 50);
    
    ctx.font = '16px sans-serif';
    ctx.fillText(`${store.name} — ${new Date().toLocaleDateString()}`, 300, 80);
    
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`💪 XP: ${weekXP}`, 50, 130);
    ctx.fillText(`📚 Darslar: ${weekLessons}`, 50, 160);
    ctx.fillText(`🔤 So'zlar: ${weekWords}`, 50, 190);
    ctx.fillText(`🔥 Streak: ${store.streak} kun`, 50, 220);
    
    ctx.fillText(`🍎 ${teacherNote}`, 50, 280);

    const link = document.createElement('a');
    link.download = 'gaplash-report.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">📮 Haftalik varaqa</h2>

      <div className="sticker p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{weekXP}</div>
            <div className="text-xs text-ink/60">Hafta XP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{weekLessons}</div>
            <div className="text-xs text-ink/60">Darslar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{weekWords}</div>
            <div className="text-xs text-ink/60">So'zlar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-[family-name:var(--font-mono)]">{store.streak} 🔥</div>
            <div className="text-xs text-ink/60">Streak</div>
          </div>
        </div>

        {topError && topError[1] > 0 && (
          <div className="text-sm p-3 bg-red-soft rounded">
            ⚠️ Zaif tomon: <strong>{topError[0]}</strong> ({topError[1]} xato)
          </div>
        )}

        <div className="p-3 bg-gold-soft rounded text-sm italic">
          🍎 {teacherNote}
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={downloadReport} className="btn btn-primary">
          <Download size={18} /> PNG yuklash
        </button>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent('Men GAPLASH da ${weekXP} XP to\'pladim!')} &text=${encodeURIComponent('📮 GAPLASH haftalik varaqa')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-blue"
        >
          <Share2 size={18} /> Telegram
        </a>
      </div>
    </div>
  );
}

// ============ ROLES PANEL ============
function RolesPanel({ store, setStore, showToast }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [turnIdx, setTurnIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const role = ROLES[roleIdx];
  const turn = role.turns[turnIdx];

  const handleAnswer = () => {
    if (!input.trim()) return;
    
    const result = checkContrast(input);
    if (result) {
      setFeedback(`✗ ${result.wrong} → ✓ ${result.right}\n💡 ${result.why}`);
    } else {
      setFeedback(`✅ Yaxshi javob! ${turn.hint ? `Model: "${turn.hint}"` : ''}`);
      setScore(score + 1);
      let newStore = addXP(store, 5);
      setStore(newStore);
    }
    setInput('');
  };

  const nextTurn = () => {
    setFeedback('');
    if (turnIdx + 1 >= role.turns.length) {
      setDone(true);
      showToast(`Role tugadi! Ball: ${score}/${role.turns.length}`);
    } else {
      setTurnIdx(turnIdx + 1);
    }
  };

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <div className="gold-card p-6">
          <div className="text-3xl mb-2">🎭</div>
          <div className="font-bold text-xl">{role.title} tugadi!</div>
          <div className="text-lg mt-2">{score}/{role.turns.length} ball</div>
          <button onClick={() => { setDone(false); setTurnIdx(0); setScore(0); }} className="btn btn-primary mt-4">
            Boshqa rol →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🎭 Rollar</h2>
      
      <div className="flex gap-2">
        {ROLES.map((r, i) => (
          <button key={i} onClick={() => { setRoleIdx(i); setTurnIdx(0); setDone(false); setScore(0); setFeedback(''); }}
            className={`tag cursor-pointer ${roleIdx === i ? 'bg-leaf text-white' : ''}`}>
            {r.emoji} {r.title}
          </button>
        ))}
      </div>

      <div className="sticker p-4">
        <div className="text-xs text-ink/50 mb-2">Turn {turnIdx + 1}/{role.turns.length}</div>
        <div className="flex gap-3 items-start">
          <span className="tag bg-blue text-white">AI</span>
          <div>
            <div className="font-medium">{turn.text}</div>
            <button onClick={() => speak(turn.text, 'en-US')} className="text-xs text-ink/50 mt-1 hover:text-leaf">
              🔊 Eshit
            </button>
          </div>
        </div>
      </div>

      {feedback && (
        <div className={`p-3 rounded-lg ${feedback.startsWith('✗') ? 'corr-card' : 'ok-card'}`}>
          {feedback}
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (feedback ? nextTurn() : handleAnswer())}
          placeholder="Javobingiz..."
          className="flex-1 p-3 border-2 border-ink rounded-lg bg-paper2"
        />
        <button onClick={feedback ? nextTurn : handleAnswer} className="btn btn-primary">
          {feedback ? 'Keyingi →' : <ArrowRight size={18} />}
        </button>
      </div>

      {!feedback && turn.hint && (
        <div className="text-sm text-ink/50 italic">💡 Hint: {turn.hint}</div>
      )}
    </div>
  );
}

// ============ STORY PANEL ============
function StoryPanel({ store, setStore, showToast }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void }) {
  const [nodeIdx, setNodeIdx] = useState(0);
  const [input, setInput] = useState('');
  const node = STORY_NODES[nodeIdx];

  const handleChoice = (next: number) => {
    setNodeIdx(next);
  };

  const handleInput = () => {
    if (!input.trim()) return;
    setInput('');
    setNodeIdx(node.next || nodeIdx);
  };

  if (node.ending) {
    return (
      <div className="space-y-4 text-center">
        <div className="gold-card p-8">
          <div className="text-3xl mb-4">🎉</div>
          <div className="text-lg">{node.text}</div>
          {node.words && (
            <div className="mt-4 text-sm">
              <div className="font-bold mb-2">Yangi so'zlar:</div>
              <div className="flex gap-2 justify-center flex-wrap">
                {node.words.map((w, i) => (
                  <span key={i} className="tag bg-gold-soft">{w}</span>
                ))}
              </div>
            </div>
          )}
          <button onClick={() => setNodeIdx(0)} className="btn btn-primary mt-4">
            Qayta boshlash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">📖 Story Mode</h2>

      <div className="sticker p-6">
        <div className="text-lg leading-relaxed">{node.text}</div>
      </div>

      {node.input ? (
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleInput()}
            placeholder="Inglizcha javob yozing..."
            className="flex-1 p-3 border-2 border-ink rounded-lg bg-paper2"
          />
          <button onClick={handleInput} className="btn btn-primary">
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {node.choices?.map((choice, i) => (
            <button key={i} onClick={() => handleChoice(choice.next)} className="btn btn-ghost w-full text-left">
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ INTERPRETER PANEL ============
function InterpreterPanel({ store, setStore, showToast }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [result, setResult] = useState<null | { correct: boolean; missing: string[] }>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const item = INTERPRETER[idx];

  useEffect(() => {
    if (result) return;
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleCheck();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, result]);

  const handleCheck = () => {
    clearInterval(timerRef.current);
    const lower = input.toLowerCase();
    const missing = item.keys.filter(k => !lower.includes(k.toLowerCase()));
    const correct = missing.length === 0;
    setResult({ correct, missing });
    
    if (correct) {
      let newStore = addXP(store, 8);
      setStore(newStore);
    }
  };

  const next = () => {
    setIdx((idx + 1) % INTERPRETER.length);
    setInput('');
    setResult(null);
    setTimeLeft(15);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🔄 Tarjimon</h2>
      <p className="text-sm text-ink/60">15 soniya ichida o'zbekchani inglizcha tarjima qiling!</p>

      <div className="sticker p-6 text-center">
        <div className="text-xl font-bold mb-4">{item.uz}</div>
        
        {/* Timer */}
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
        </div>
        <div className="text-sm font-[family-name:var(--font-mono)] mb-4">{timeLeft}s</div>

        {!result ? (
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="Inglizcha tarjima..."
              className="flex-1 p-3 border-2 border-ink rounded-lg bg-paper2"
            />
            <button onClick={handleCheck} className="btn btn-primary">
              <Check size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className={result.correct ? 'ok-card' : 'corr-card'}>
              {result.correct ? '✅ To\'g\'ri!' : `⚠️ Yetishmagan: ${result.missing.join(', ')}`}
            </div>
            <div className="text-sm">
              <div className="font-bold">Etalon:</div>
              <div className="text-leaf">{item.en}</div>
            </div>
            <button onClick={next} className="btn btn-primary">Keyingi →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ DUEL PANEL ============
function DuelPanel({ store, setStore, showToast, fireConfetti }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void; fireConfetti: () => void }) {
  const [mode, setMode] = useState<'menu' | 'ai' | 'live'>('menu');
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState(TESTS_EN.sort(() => Math.random() - 0.5).slice(0, 8));

  useEffect(() => {
    if (mode !== 'ai' || answered || finished) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          // AI answers
          setAiScore(s => s + (Math.random() > 0.4 ? 1 : 0));
          setAnswered(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, qIdx, answered, finished]);

  const handleAnswer = (optIdx: number) => {
    if (answered) return;
    setSelected(optIdx);
    setAnswered(true);
    const current = questions[qIdx];
    if (optIdx === current.a) {
      setScore(s => s + 1);
    }
  };

  const nextQ = () => {
    if (qIdx + 1 >= questions.length) {
      setFinished(true);
      if (score > aiScore) {
        fireConfetti();
        let newStore = addXP(store, 20);
        setStore(newStore);
        showToast("🏆 G'alaba! +20 XP");
      } else {
        showToast("Yaqin edi! Keyingi safar g'alaba qozonasiz.");
      }
    } else {
      setQIdx(qIdx + 1);
      setAnswered(false);
      setSelected(-1);
      setTimeLeft(10);
    }
  };

  if (mode === 'menu') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">⚔️ Duel</h2>
        <div className="grid gap-4">
          <button onClick={() => { setMode('ai'); setQIdx(0); setScore(0); setAiScore(0); setFinished(false); }} className="sticker p-6 text-left">
            <div className="text-2xl mb-2">🤖</div>
            <div className="font-bold">Max bilan duel</div>
            <div className="text-sm text-ink/60">8 savol, Max 6-10s ichida javob beradi</div>
          </button>
          <button onClick={() => showToast("Jonli duel uchun Supabase ulanishi kerak")} className="sticker p-6 text-left opacity-70">
            <div className="text-2xl mb-2">🌐</div>
            <div className="font-bold">Jonli duel</div>
            <div className="text-sm text-ink/60">Do'stingiz bilan o'ynang (tez orada)</div>
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="space-y-4 text-center">
        <div className="gold-card p-8">
          <div className="text-4xl mb-4">{score > aiScore ? '🏆' : '💪'}</div>
          <div className="text-xl font-bold">
            Siz: {score} — Max: {aiScore}
          </div>
          <div className="text-lg mt-2">{score > aiScore ? "G'alaba!" : "Yaqin edi!"}</div>
          <button onClick={() => setMode('menu')} className="btn btn-primary mt-4">Menu</button>
        </div>
      </div>
    );
  }

  const current = questions[qIdx];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">⚔️ Max bilan</h2>
        <div className="flex items-center gap-4">
          <span className="tag bg-blue text-white">Siz: {score}</span>
          <span className="tag bg-red text-white">Max: {aiScore}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(timeLeft / 10) * 100}%` }}></div>
      </div>

      <div className="sticker p-6">
        <div className="font-bold text-lg mb-4">{current.q}</div>
        <div className="grid gap-2">
          {current.opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`p-3 rounded-lg border-2 text-left ${
                answered && i === current.a ? 'border-leaf bg-leaf/10' :
                answered && i === selected ? 'border-red bg-red/10' :
                'border-ink/20 hover:border-ink/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <button onClick={nextQ} className="btn btn-primary mt-4 text-sm">
            {qIdx + 1 >= questions.length ? 'Natija' : 'Keyingi →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ============ IELTS PANEL ============
function IELTSPanel({ store, setStore, showToast, checkPro }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void; checkPro: (f: string) => boolean }) {
  const [tab, setTab] = useState<'reading' | 'writing'>('reading');
  const [rAnswers, setRAnswers] = useState<number[]>([]);
  const [rDone, setRDone] = useState(false);
  const [wText, setWText] = useState('');
  const [wDone, setWDone] = useState(false);

  if (!checkPro('ielts')) {
    return (
      <div className="text-center p-8">
        <Lock size={48} className="mx-auto text-ink/30 mb-4" />
        <div className="text-xl font-bold">IELTS — Pro rejimda</div>
        <p className="text-sm text-ink/60 mt-2">Pro ga o'tib, IELTS mock testlardan foydalaning.</p>
      </div>
    );
  }

  const handleReadingAnswer = (qIdx: number, optIdx: number) => {
    const newAnswers = [...rAnswers];
    newAnswers[qIdx] = optIdx;
    setRAnswers(newAnswers);
    if (newAnswers.length === IELTS_READING.questions.length) {
      setRDone(true);
    }
  };

  const readingScore = rAnswers.filter((a, i) => a === IELTS_READING.questions[i].a).length;

  const checkWriting = () => {
    setWDone(true);
    const results = IELTS_WRITING_RUBRIC.criteria.map(c => ({
      name: c.name,
      pass: c.check(wText),
    }));
    const passed = results.filter(r => r.pass).length;
    const band = Math.min(9, Math.max(4, Math.round(passed * 2 + readingScore)));
    let newStore = addXP(store, 15);
    setStore(newStore);
    showToast(`IELTS band: ~${band}.0`);
    return { results, band };
  };

  const wResults = wDone ? checkWriting() : null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🎯 IELTS Mock</h2>

      <div className="flex gap-2">
        <button onClick={() => setTab('reading')} className={`tag cursor-pointer ${tab === 'reading' ? 'bg-leaf text-white' : ''}`}>
          Reading
        </button>
        <button onClick={() => setTab('writing')} className={`tag cursor-pointer ${tab === 'writing' ? 'bg-leaf text-white' : ''}`}>
          Writing
        </button>
      </div>

      {tab === 'reading' && (
        <div className="space-y-4">
          <div className="sticker p-4">
            <div className="font-bold mb-2">{IELTS_READING.title}</div>
            <div className="text-sm leading-relaxed whitespace-pre-line">{IELTS_READING.text}</div>
          </div>

          {IELTS_READING.questions.map((q, i) => (
            <div key={i} className="sticker p-4">
              <div className="font-medium mb-2">{i + 1}. {q.q}</div>
              <div className="grid gap-2">
                {q.opts.map((opt, j) => (
                  <button
                    key={j}
                    onClick={() => handleReadingAnswer(i, j)}
                    disabled={rDone}
                    className={`p-2 rounded border text-left text-sm ${
                      rDone && j === q.a ? 'border-leaf bg-leaf/10 font-bold' :
                      rDone && rAnswers[i] === j ? 'border-red bg-red/10' :
                      rAnswers[i] === j ? 'border-blue bg-blue/10' :
                      'border-ink/20 hover:border-ink/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {rDone && (
            <div className="gold-card text-center">
              <div className="text-xl font-bold">Reading: {readingScore}/{IELTS_READING.questions.length}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'writing' && (
        <div className="space-y-4">
          <div className="sticker p-4">
            <div className="font-bold mb-2">Task 2:</div>
            <div className="text-sm italic">{IELTS_WRITING_RUBRIC.prompt}</div>
          </div>

          <textarea
            value={wText}
            onChange={e => setWText(e.target.value)}
            placeholder="Essay yozing (kamida 60 so'z)..."
            className="w-full p-4 border-2 border-ink rounded-lg bg-paper2 min-h-[200px] resize-y"
          />

          <button onClick={checkWriting} className="btn btn-primary" disabled={!wText.trim() || wDone}>
            Tekshirish
          </button>

          {wDone && wResults && (
            <div className="space-y-3">
              <div className="gold-card text-center">
                <div className="text-2xl font-bold">Taxminiy band: {wResults.band}.0</div>
              </div>
              <div className="sticker p-4">
                {wResults.results.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <span className={r.pass ? 'text-leaf' : 'text-red'}>{r.pass ? '✓' : '✗'}</span>
                    <span className="text-sm">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============ STICKERS PANEL ============
function StickersPanel({ store }: { store: StoreData }) {
  const stickers = [
    { emoji: '📚', label: 'Bookworm' },
    { emoji: '🌍', label: 'Traveler' },
    { emoji: '🧠', label: 'Smart' },
    { emoji: '🔥', label: 'On Fire' },
    { emoji: '🎓', label: 'Graduate' },
    { emoji: '💪', label: 'Strong' },
    { emoji: '⭐', label: 'Star' },
    { emoji: '🏆', label: 'Champion' },
    { emoji: '💬', label: 'Talker' },
    { emoji: '🎯', label: 'Focused' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">📷 Stikerlar</h2>
      <p className="text-sm text-ink/60">Stikerlarni chop etib, xonangizga osing!</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {stickers.map((s, i) => (
          <div key={i} className="sticker p-4 text-center" style={{ transform: `rotate(${(i % 3 - 1) * 2}deg)` }}>
            <div className="text-4xl mb-2">{s.emoji}</div>
            <div className="text-xs font-bold">{s.label}</div>
            <div className="text-xs text-ink/50 mt-1">GAPLASH</div>
          </div>
        ))}
      </div>

      <button onClick={() => window.print()} className="btn btn-primary">
        🖨 Chop etish
      </button>
    </div>
  );
}

// ============ SETTINGS PANEL ============
function SettingsPanel({ store, setStore, showToast }: { store: StoreData; setStore: (s: StoreData) => void; showToast: (m: string) => void }) {
  const [apiKey, setApiKey] = useState(store.apiKey);
  const [apiEndpoint, setApiEndpoint] = useState(store.apiEndpoint);
  const [apiModel, setApiModel] = useState(store.apiModel);
  const [proCode, setProCode] = useState('');

  const saveAPI = () => {
    setStore({ ...store, apiKey, apiEndpoint, apiModel });
    showToast("API sozlamalari saqlandi!");
  };

  const testAPI = async () => {
    const result = await askAI(
      [{ role: 'user', content: 'Say hello in 5 words.' }],
      apiKey, apiEndpoint, apiModel
    );
    if (result) {
      showToast(`✅ API ishlayapti: "${result.substring(0, 50)}"`);
    } else {
      showToast("❌ API ulanmadi. Kalit va endpointni tekshiring.");
    }
  };

  const activatePro = () => {
    if (proCode === 'GAPLASH-2026-PRO' || proCode === 'GAPLASH-PRO') {
      setStore({ ...store, pro: true });
      showToast("🎉 Pro aktivlashtirildi!");
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    } else {
      showToast("❌ Noto'g'ri kod");
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gaplash-data.json';
    a.click();
    showToast("Ma'lumotlar eksport qilindi!");
  };

  const resetAll = () => {
    if (confirm("Barcha ma'lumotlar o'chiriladi. Davom etasizmi?")) {
      localStorage.removeItem('gaplash_v3');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">⚙️ Sozlamalar</h2>

      {/* Pro Section */}
      <div className="sticker p-4 space-y-3">
        <div className="font-bold flex items-center gap-2">
          <Star size={18} className="text-gold" /> Pro rejim
          {store.pro && <span className="tag bg-leaf text-white text-xs">FAOL</span>}
        </div>
        {!store.pro && (
          <div className="flex gap-2">
            <input
              value={proCode}
              onChange={e => setProCode(e.target.value)}
              placeholder="Pro kodini kiriting..."
              className="flex-1 p-2 border-2 border-ink rounded-lg bg-paper2 text-sm"
            />
            <button onClick={activatePro} className="btn btn-gold text-sm">Aktivlash</button>
          </div>
        )}
        <div className="text-xs text-ink/50">
          Demo kod: GAPLASH-2026-PRO
        </div>
      </div>

      {/* AI/LLM Section */}
      <div className="sticker p-4 space-y-3">
        <div className="font-bold">🤖 AI / LLM sozlamalari</div>
        <div>
          <label className="text-xs text-ink/60">API Key:</label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full p-2 border border-ink/20 rounded text-sm mt-1"
          />
        </div>
        <div>
          <label className="text-xs text-ink/60">Endpoint:</label>
          <input
            value={apiEndpoint}
            onChange={e => setApiEndpoint(e.target.value)}
            placeholder="https://api.openai.com/v1/chat/completions"
            className="w-full p-2 border border-ink/20 rounded text-sm mt-1"
          />
        </div>
        <div>
          <label className="text-xs text-ink/60">Model:</label>
          <input
            value={apiModel}
            onChange={e => setApiModel(e.target.value)}
            placeholder="gpt-3.5-turbo"
            className="w-full p-2 border border-ink/20 rounded text-sm mt-1"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={saveAPI} className="btn btn-primary text-sm">Saqlash</button>
          <button onClick={testAPI} className="btn btn-ghost text-sm">🔌 Test</button>
        </div>
      </div>

      {/* Data */}
      <div className="sticker p-4 space-y-3">
        <div className="font-bold">📦 Ma'lumotlar</div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportData} className="btn btn-ghost text-sm">
            <Download size={16} /> JSON eksport
          </button>
          <button onClick={resetAll} className="btn btn-red text-sm">
            <RotateCcw size={16} /> Hammasini tozalash
          </button>
        </div>
      </div>

      {/* Dark mode */}
      <div className="sticker p-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">🌙 Dark mode</span>
          <button
            onClick={() => setStore({ ...store, darkMode: !store.darkMode })}
            className={`w-12 h-6 rounded-full transition-colors ${store.darkMode ? 'bg-leaf' : 'bg-ink/20'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${store.darkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ CLASSROOM PANEL ============
function ClassroomPanel({ store, showToast }: { store: StoreData; showToast: (m: string) => void }) {
  const [code, setCode] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (code.length === 5) {
      setJoined(true);
      showToast("Sinfga qo'shildingiz!");
    } else {
      showToast("5 belgili kod kiriting");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">🏫 Sinf</h2>
      <p className="text-sm text-ink/60">O'qituvchi sinfini kod orqali qo'shiling yoki o'z sinfingizni yarating.</p>

      {!joined ? (
        <div className="sticker p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Sinf kodi:</label>
            <div className="flex gap-2 mt-2">
              <input
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                maxLength={5}
                placeholder="XXXXX"
                className="flex-1 p-3 border-2 border-ink rounded-lg bg-paper2 text-center font-[family-name:var(--font-mono)] text-xl tracking-widest"
              />
              <button onClick={handleJoin} className="btn btn-primary">
                Qo'shilish
              </button>
            </div>
          </div>
          <div className="text-xs text-ink/50">
            Supabase ulanmasa, demo rejimda ishlaydi.
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="gold-card">
            <div className="font-bold">📊 Sinf hisoboti (demo)</div>
            <div className="mt-3 text-sm">
              <p>• O'quvchilar: 12 ta</p>
              <p>• O'rtacha XP: 245</p>
              <p>• Zaif mavzu: Past Simple</p>
              <p>• Tavsiya: Grammar darslarini takrorlang</p>
            </div>
          </div>

          <div className="sticker p-4">
            <div className="font-bold mb-2">O'quvchilar:</div>
            <div className="space-y-2 text-sm">
              {[
                { name: 'Ali', xp: 320, lessons: 8, weak: 'Grammar' },
                { name: 'Malika', xp: 280, lessons: 7, weak: 'Vocabulary' },
                { name: 'Jasur', xp: 190, lessons: 5, weak: 'Structure' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-ink/10">
                  <span className="font-medium">{s.name}</span>
                  <span className="font-[family-name:var(--font-mono)] text-xs">{s.xp} XP • {s.lessons} dars</span>
                  <span className="tag bg-red-soft text-xs">{s.weak}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => showToast("JSON eksport qilindi!")} className="btn btn-ghost text-sm">
            <Download size={16} /> JSON eksport
          </button>
        </div>
      )}
    </div>
  );
}

// ============ PRO MODAL ============
function ProModal({ onClose, setStore, fireConfetti }: { onClose: () => void; setStore: (s: StoreData) => void; fireConfetti: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-paper rounded-2xl max-w-md w-full p-6 space-y-4 border-2 border-ink">
        <div className="text-center">
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-xl font-bold font-[family-name:var(--font-display)]">GAPLASH Pro</div>
          <p className="text-sm text-ink/60 mt-2">Kunlik dars limiti tugadi. Pro ga o'ting!</p>
        </div>

        <div className="space-y-2">
          <div className="sticker p-3 flex justify-between items-center">
            <div>
              <div className="font-bold">Bepul</div>
              <div className="text-xs text-ink/60">1 dars/kun</div>
            </div>
            <span className="tag bg-ink/10">0 so'm</span>
          </div>
          <div className="sticker p-3 flex justify-between items-center ring-2 ring-gold">
            <div>
              <div className="font-bold">Pro Oylik</div>
              <div className="text-xs text-ink/60">Cheksiz dars + barcha funksiyalar</div>
            </div>
            <span className="tag bg-gold-soft">49 000 so'm/oy</span>
          </div>
          <div className="sticker p-3 flex justify-between items-center">
            <div>
              <div className="font-bold">Pro Yillik</div>
              <div className="text-xs text-ink/60">Eng tejamkor variant</div>
            </div>
            <span className="tag bg-gold-soft">399 000 so'm/yil</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="btn btn-ghost flex-1">Keyinroq</button>
          <button
            onClick={() => {
              setStore({ ...(loadStore()), pro: true });
              fireConfetti();
              onClose();
            }}
            className="btn btn-primary flex-1"
          >
            Demo Pro 🎉
          </button>
        </div>

        <div className="text-xs text-center text-ink/40">
          Haqiqiy to'lov: Stripe/Payme/Click orqali. Sozlamalardan kod kiriting.
        </div>
      </div>
    </div>
  );
}