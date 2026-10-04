// GAPLASH — Barcha kontent bazasi

export interface Word {
  w: string; tr: string; ipa: string; ex: string; exTr: string; assoc: string; lvl: string;
}

export interface Question {
  ask: string;
  expect: string[];
  errors: { re: string; cat: string; wrong: string; right: string; why: string }[];
  ok: string;
  h1: string;
  h2: string;
  ans: string;
  ansWhy: string;
}

export interface Lesson {
  id: string; lvl: string; cat: string; emoji: string; title: string; desc: string;
  intro: string; questions: Question[]; quiz: { q: string; opts: string[]; a: number; why: string }[];
  newWords: Word[];
}

export interface GrammarTopic {
  emoji: string; title: string; story: string; pairs: string[][];
}

export interface ContrastError {
  re: string; wrong: string; right: string; cat: string; why: string;
}

// ============ SO'ZLAR (60 ta EN) ============
export const WORDS_EN: Word[] = [
  { w: "achieve", tr: "erishmoq", ipa: "/əˈtʃiːv/", ex: "She achieved her goal.", exTr: "U maqsadiga erishdi.", assoc: "A+CHIEVE — A chempion erishdi", lvl: "B1" },
  { w: "borrow", tr: "qarz olmoq", ipa: "/ˈbɒrəʊ/", ex: "Can I borrow your pen?", exTr: "Ruchkangizni qarzga bera olasmi?", assoc: "BOR-row — qatorga o'tirib qarz oldi", lvl: "A1" },
  { w: "lend", tr: "qarz bermoq", ipa: "/lend/", ex: "I'll lend you my book.", exTr: "Kitobimni qarzga beraman.", assoc: "LEND — L (men) END (beraman)", lvl: "A1" },
  { w: "decide", tr: "qaror qilmoq", ipa: "/dɪˈsaɪd/", ex: "I decided to travel.", exTr: "Sayohat qilishga qaror qildim.", assoc: "DE-SIDE — ikki tomondan qaror", lvl: "A2" },
  { w: "environment", tr: "atrof-muhit", ipa: "/ɪnˈvaɪrənmənt/", ex: "Protect the environment.", exTr: "Atrof-muhitni asrang.", assoc: "ENVIRON — atrof + MENT", lvl: "B1" },
  { w: "experience", tr: "tajriba", ipa: "/ɪkˈspɪəriəns/", ex: "I have 5 years of experience.", exTr: "5 yillik tajribam bor.", assoc: "EX-PERIENCE — ko'p narsa ko'rgan", lvl: "B1" },
  { w: "improve", tr: "yaxshilamoq", ipa: "/ɪmˈpruːv/", ex: "I want to improve my English.", exTr: "Inglizchimni yaxshilamoqchiman.", assoc: "IM-PROVE — professional bo'lmoq", lvl: "A2" },
  { w: "knowledge", tr: "bilim", ipa: "/ˈnɒlɪdʒ/", ex: "Knowledge is power.", exTr: "Bilim — kuch.", assoc: "KNOW-LEDGE — bilgan narsa", lvl: "A2" },
  { w: "opportunity", tr: "imkoniyat", ipa: "/ˌɒpəˈtjuːnəti/", ex: "This is a great opportunity.", exTr: "Bu ajoyib imkoniyat.", assoc: "OPPORT-UNITY — port ochilgan joy", lvl: "B1" },
  { w: "recommend", tr: "tavsiya qilmoq", ipa: "/ˌrekəˈmend/", ex: "I recommend this book.", exTr: "Bu kitobni tavsiya qilaman.", assoc: "RE-COMMAND — qayta buyurmoq", lvl: "B1" },
  { w: "successful", tr: "muvaffaqiyatli", ipa: "/səkˈsesfəl/", ex: "She is a successful doctor.", exTr: "U muvaffaqiyatli shifokor.", assoc: "SUCCESS-FUL — muvaffaqiyotga to'la", lvl: "A2" },
  { w: "challenge", tr: "qiyinchilik", ipa: "/ˈtʃælɪndʒ/", ex: "Learning is a challenge.", exTr: "O'rganish — qiyinchilik.", assoc: "CHALL-ENGE — chaqiruv tashlash", lvl: "B1" },
  { w: "communicate", tr: "muloqot qilmoq", ipa: "/kəˈmjuːnɪkeɪt/", ex: "We communicate every day.", exTr: "Biz har kuni muloqot qilamiz.", assoc: "COM-MUNICATE — umumiy gap", lvl: "A2" },
  { w: "confident", tr: "ishonchli", ipa: "/ˈkɒnfɪdənt/", ex: "Be confident!", exTr: "Ishonchli bo'ling!", assoc: "CON-FIDENT — fid (ishonch) bilan", lvl: "A2" },
  { w: "develop", tr: "rivojlantirmoq", ipa: "/dɪˈveləp/", ex: "Develop your skills.", exTr: "Ko'nikmalaringizni rivojlantiring.", assoc: "DE-VELOP — parda ochilmoq", lvl: "B1" },
  { w: "disappoint", tr: "xafa qilmoq", ipa: "/ˌdɪsəˈpɔɪnt/", ex: "Don't disappoint me.", exTr: "Meni xafa qilmang.", assoc: "DIS-APPOINT — nuqta qo'ymaslik", lvl: "B1" },
  { w: "encourage", tr: "ilhom bermoq", ipa: "/ɪnˈkʌrɪdʒ/", ex: "Teachers encourage students.", exTr: "O'qituvchilar talabalarni ilhomlantiradi.", assoc: "EN-COURAGE — jasorat kiritmoq", lvl: "B1" },
  { w: "essential", tr: "zarur", ipa: "/ɪˈsenʃəl/", ex: "Water is essential for life.", exTr: "Suv hayot uchun zarur.", assoc: "ES-SENTIAL — asosiy narsa", lvl: "B1" },
  { w: "generous", tr: "saxiy", ipa: "/ˈdʒenərəs/", ex: "He is very generous.", exTr: "U juda saxiy.", assoc: "GEN-EROUS — generatsiya (ko'p beruvchi)", lvl: "A2" },
  { w: "hesitate", tr: "ikkillanmoq", ipa: "/ˈhezɪteɪt/", ex: "Don't hesitate to ask.", exTr: "So'rashdan tortinmang.", assoc: "HE-SIT-ATE — u o'tirib qoldi", lvl: "B1" },
  { w: "independent", tr: "mustaqil", ipa: "/ˌɪndɪˈpendənt/", ex: "She is very independent.", exTr: "U juda mustaqil.", assoc: "IN-DEPEND — bog'liq emas", lvl: "A2" },
  { w: "influence", tr: "ta'sir", ipa: "/ˈɪnfluəns/", ex: "Music has great influence.", exTr: "Musiqa katta ta'sirga ega.", assoc: "IN-FLOW — ichiga oqib kirish", lvl: "B1" },
  { w: "journey", tr: "sayohat", ipa: "/ˈdʒɜːni/", ex: "Life is a journey.", exTr: "Hayot — sayohat.", assoc: "JOUR-NAL — jurnal yozib sayohat", lvl: "A2" },
  { w: "magnificent", tr: "ajoyib", ipa: "/mæɡˈnɪfɪsənt/", ex: "The view is magnificent!", exTr: "Manzara ajoyib!", assoc: "MAGNI-FICENT — magnit kabi tortadi", lvl: "B2" },
  { w: "necessary", tr: "kerakli", ipa: "/ˈnesəsəri/", ex: "It's necessary to study.", exTr: "O'qish kerak.", assoc: "NEC-ESSARY — hech qachon esdan chiqmas", lvl: "A2" },
  { w: "obvious", tr: "aniq/ko'rinib turgan", ipa: "/ˈɒbviəs/", ex: "The answer is obvious.", exTr: "Javob aniq.", assoc: "OB-VIOUS — ko'zga ko'rinib turgan", lvl: "B1" },
  { w: "patience", tr: "sabrlilik", ipa: "/ˈpeɪʃəns/", ex: "Teaching requires patience.", exTr: "O'qitish sabr talab qiladi.", assoc: "PAY-TIENT — bemorga pul to'lash (sabr)", lvl: "A2" },
  { w: "persuade", tr: "ko'ndirmoq", ipa: "/pəˈsweɪd/", ex: "I persuaded him to come.", exTr: "Men uni kelishga ko'ndirdim.", assoc: "PER-SUADE — suvdek oqib o'tkazish", lvl: "B1" },
  { w: "recognize", tr: "tanimoq", ipa: "/ˈrekəɡnaɪz/", ex: "I didn't recognize you!", exTr: "Sizni taniy olmadim!", assoc: "RE-COGNIZE — qayta bilish", lvl: "A2" },
  { w: "responsible", tr: "mas'uliyatli", ipa: "/rɪˈspɒnsəbəl/", ex: "Be responsible for your actions.", exTr: "Harakatlaringiz uchun mas'uliyatli bo'ling.", assoc: "RESPONSE-BLE — javob bera oladigan", lvl: "A2" },
  { w: "sacrifice", tr: "qurbonlik", ipa: "/ˈsækrɪfaɪs/", ex: "Parents make sacrifices.", exTr: "Ota-onalar qurbonlik qiladi.", assoc: "SACRI-FICE — muqaddas ish", lvl: "B1" },
  { w: "significant", tr: "muhim", ipa: "/sɪɡˈnɪfɪkənt/", ex: "This is a significant change.", exTr: "Bu muhim o'zgarish.", assoc: "SIGN-IFICANT — belgi (sign) ko'rsatuvchi", lvl: "B1" },
  { w: "sufficient", tr: "yetarli", ipa: "/səˈfɪʃənt/", ex: "We have sufficient time.", exTr: "Bizda yetarli vaqt bor.", assoc: "SUF-FICIENT — suf (to'liq)", lvl: "B1" },
  { w: "sympathy", tr: "hamdardlik", ipa: "/ˈsɪmpəθi/", ex: "I have sympathy for you.", exTr: "Sizga hamdardlik bildraman.", assoc: "SYM-PATHY — bir yo'lda (sym) his qilish", lvl: "B1" },
  { w: "throughout", tr: "davomida", ipa: "/θruːˈaʊt/", ex: "Throughout the year...", exTr: "Yil davomida...", assoc: "THROUGH-OUT — ichidan tashqarisigacha", lvl: "B1" },
  { w: "unfortunately", tr: "afsuski", ipa: "/ʌnˈfɔːtʃənətli/", ex: "Unfortunately, I can't come.", exTr: "Afsuski, men kela olmayman.", assoc: "UN-FORTUNATE — baxtsiz", lvl: "A2" },
  { w: "vocabulary", tr: "lug'at boyligi", ipa: "/vəˈkæbjələri/", ex: "Expand your vocabulary.", exTr: "Lug'at boyligingizni kengaytiring.", assoc: "VOCAB-ULARY — ovoz (vocab) bilan bog'liq", lvl: "A2" },
  { w: "wonderful", tr: "ajoyib", ipa: "/ˈwʌndəfəl/", ex: "What a wonderful day!", exTr: "Qanday ajoyib kun!", assoc: "WONDER-FUL — hayratga to'la", lvl: "A1" },
  { w: "appreciate", tr: "qadrlamoq", ipa: "/əˈpriːʃieɪt/", ex: "I appreciate your help.", exTr: "Yordamingizni qadrlayman.", assoc: "APPRECI-ATE — narxini bilmoq", lvl: "B1" },
  { w: "consequence", tr: "oqibat", ipa: "/ˈkɒnsɪkwəns/", ex: "Think about consequences.", exTr: "Oqibatlar haqida o'ylang.", assoc: "CON-SEQUENCE — ketma-ketlik", lvl: "B1" },
  { w: "determine", tr: "aniqlamoq", ipa: "/dɪˈtɜːmɪn/", ex: "Determine the problem.", exTr: "Muammoni aniqlang.", assoc: "DE-TERMINE — termin (aniq) qilmoq", lvl: "B1" },
  { w: "enthusiasm", tr: "ishtiyoq", ipa: "/ɪnˈθjuːziæzəm/", ex: "She shows great enthusiasm.", exTr: "U katta ishtiyoq ko'rsatadi.", assoc: "EN-THUSIASM — ichidan keladigan olov", lvl: "B1" },
  { w: "fascinating", tr: "qiziqarli", ipa: "/ˈfæsɪneɪtɪŋ/", ex: "The story is fascinating.", exTr: "Hikoya juda qiziqarli.", assoc: "FASCIN-ATING — fasl (tortuvchi)", lvl: "B1" },
  { w: "guarantee", tr: "kafolat", ipa: "/ˌɡærənˈtiː/", ex: "I guarantee success.", exTr: "Muvaffaqiyatga kafolat beraman.", assoc: "GUARAN-TEE — garov (kafoat)", lvl: "B1" },
  { w: "hypothesis", tr: "taxmin/faraz", ipa: "/haɪˈpɒθəsɪs/", ex: "Test your hypothesis.", exTr: "Taxminingizni tekshiring.", assoc: "HYPO-THESIS — ostidagi (hypo) fikr", lvl: "B2" },
  { w: "inevitable", tr: "muqarrar", ipa: "/ɪnˈevɪtəbəl/", ex: "Change is inevitable.", exTr: "O'zgarish muqarrar.", assoc: "IN-EVIT-ABLE — qochib bo'lmaydigan", lvl: "B2" },
  { w: "justify", tr: "oqlamoq", ipa: "/ˈdʒʌstɪfaɪ/", ex: "Justify your decision.", exTr: "Qaroringizni oqlang.", assoc: "JUST-IFY — adolatli qilmoq", lvl: "B1" },
  { w: "magnificent", tr: "buyuk/salobatli", ipa: "/mæɡˈnɪfɪsənt/", ex: "A magnificent building.", exTr: "Salobatli bino.", assoc: "MAGNI — kattalik", lvl: "B2" },
  { w: "negotiate", tr: "muhokama qilmoq", ipa: "/nɪˈɡəʊʃieɪt/", ex: "Let's negotiate the price.", exTr: "Narxni muhokama qilaylik.", assoc: "NEGO-TEAT — qora (nego) biznesda", lvl: "B1" },
  { w: "overwhelm", tr: "bosib olmoq", ipa: "/ˌəʊvəˈwelm/", ex: "Don't let stress overwhelm you.", exTr: "Stress sizni bosib olmasin.", assoc: "OVER-WHELM — ustidan to'lqin", lvl: "B2" },
  { w: "phenomenon", tr: "hodisa", ipa: "/fɪˈnɒmɪnən/", ex: "It's a natural phenomenon.", exTr: "Bu tabiiy hodisa.", assoc: "PHENOM-ENON — ko'rinadigan narsa", lvl: "B2" },
  { w: "reluctant", tr: "istaksiz", ipa: "/rɪˈlʌktənt/", ex: "He was reluctant to go.", exTr: "U borishni istamadi.", assoc: "RE-LUCTANT — orqaga tortilgan", lvl: "B1" },
  { w: "sophisticated", tr: "murakkab/nafis", ipa: "/səˈfɪstɪkeɪtɪd/", ex: "A sophisticated system.", exTr: "Murakkab tizim.", assoc: "SOPHIST — donishmand", lvl: "B2" },
  { w: "thorough", tr: "puxta/batafsil", ipa: "/ˈθʌrə/", ex: "A thorough investigation.", exTr: "Puxta tekshiruv.", assoc: "THROUGH-OUGH — to'liq ichidan", lvl: "B2" },
  { w: "vulnerable", tr: "himoyasiz", ipa: "/ˈvʌlnərəbəl/", ex: "Children are vulnerable.", exTr: "Bolalar himoyasiz.", assoc: "VULNER — yarali (vulnus)", lvl: "B2" },
  { w: "accomplish", tr: "bajarib bo'lmoq", ipa: "/əˈkʌmplɪʃ/", ex: "I accomplished the task.", exTr: "Vazifani bajardim.", assoc: "AC-COMPLISH — to'liq qilmoq", lvl: "B1" },
  { w: "beneath", tr: "ostida", ipa: "/bɪˈniːθ/", ex: "The cat is beneath the table.", exTr: "Mushuk stol ostida.", assoc: "BE-NEATH — pastga (neath)", lvl: "A2" },
  { w: "circumstance", tr: "vaziyat", ipa: "/ˈsɜːkəmstəns/", ex: "Under no circumstances...", exTr: "Hech qanday vaziyatda...", assoc: "CIRCUM-STANCE — atrofda turuvchi", lvl: "B1" },
  { w: "distinguish", tr: "farqlamoq", ipa: "/dɪˈstɪŋɡwɪʃ/", ex: "Can you distinguish them?", exTr: "Ularni farqlay olasizmi?", assoc: "DISTINGUISH — alohida (distinct)", lvl: "B1" },
  { w: "exaggerate", tr: "bo'rttirmoq", ipa: "/ɪɡˈzædʒəreɪt/", ex: "Don't exaggerate!", exTr: "Bo'rttirmang!", assoc: "EX-AGGERATE — agregat (ko'p) qilmoq", lvl: "B1" },
];

// ============ KONTRASTIV XATO MOTORI (22+) ============
export const CONTRAST_ERRORS: ContrastError[] = [
  { re: "i have (\\d+) years", wrong: "I have {n} years", right: "I am {n} years old", cat: "grammar", why: "O'zbekcha «Menda 20 yosh» kalkasi. Inglizcha «Men 20 yoshdaman» = I AM 20 years old." },
  { re: "i am agree", wrong: "I am agree", right: "I agree", cat: "grammar", why: "«Agree» — bu fe'l, «am» kerak emas. O'zbekcha «men roziman» to'g'ridan-to'g'ri ko'chirmang." },
  { re: "(he|she|it) is (a )?doctor", wrong: "He is doctor", right: "He is a doctor", cat: "grammar", why: "Inglizchada kasb oldidan artikel «a/an» qo'yiladi. O'zbekcha «U shifokor» da artikel yo'q." },
  { re: "didn't went", wrong: "I didn't went", right: "I didn't go", cat: "grammar", why: "«Didn't» dan keyin fe'l BOSH shaklda keladi. O'tgan zamon ikki marta bo'lmaydi!" },
  { re: "doesn't knows", wrong: "He doesn't knows", right: "He doesn't know", cat: "grammar", why: "«Doesn't» o'zi -s ni oladi, fe'l yana -s olmasligi kerak." },
  { re: "more better", wrong: "more better", right: "better", cat: "grammar", why: "«Better» o'zi taqqoslash darajasi. «More» kerak emas — ikki marta taqqoslash bo'ladi." },
  { re: "informations", wrong: "informations", right: "information", cat: "vocabulary", why: "«Information» — sanalmaydigan ot. Ko'plik shakli yo'q. «News» yoki «pieces of information» ishlating." },
  { re: "advices", wrong: "advices", right: "advice", cat: "vocabulary", why: "«Advice» — sanalmaydigan ot. «Some advice» yoki «a piece of advice» ishlating." },
  { re: "peoples", wrong: "peoples", right: "people", cat: "vocabulary", why: "«People» o'zi ko'plik! «Persons» rasmiy, «people» oddiy." },
  { re: "childrens", wrong: "childrens", right: "children", cat: "vocabulary", why: "«Children» o'zi «child» ning ko'pligi. Qo'shimcha -s kerak emas." },
  { re: "i very like", wrong: "I very like", right: "I really like", cat: "structure", why: "O'zbekcha «men juda yoqtiraman» kalkasi. Inglizcha «very» fe'ldan OLDIN bo'lmaydi. «Really like» ishlating." },
  { re: "your name what", wrong: "Your name what?", right: "What is your name?", cat: "structure", why: "Inglizcha savolda so'z tartibi boshqacha: What + is + your name? O'zbek tartibida emas." },
  { re: "yesterday i go", wrong: "Yesterday I go", right: "Yesterday I went", cat: "grammar", why: "«Yesterday» o'tgan zamon. «Go» emas, «went» bo'lishi kerak!" },
  { re: "married with", wrong: "married with", right: "married to", cat: "vocabulary", why: "Inglizcha «married TO» — «with» emas. O'zbekcha «bilan» kalkasi." },
  { re: "depend from", wrong: "depend from", right: "depend on", cat: "vocabulary", why: "«Depend ON» — «from» emas. O'zbekcha «dan» kalkasi." },
  { re: "discuss about", wrong: "discuss about", right: "discuss", cat: "vocabulary", why: "«Discuss» o'zi «about» ma'nosini beradi. Ortiqcha so'z!" },
  { re: "enter to the room", wrong: "enter to the room", right: "enter the room", cat: "structure", why: "«Enter» to'g'ridan-to'g'ri obyekt oladi. «To» kerak emas." },
  { re: "return back", wrong: "return back", right: "return", cat: "vocabulary", why: "«Return» o'zi «qaytmoq». «Back» ortiqcha — ikki marta «qaytish» bo'ladi." },
  { re: "close the light", wrong: "close the light", right: "turn off the light", cat: "vocabulary", why: "O'zbekcha «yopmoq» = close. Lekin chiroq uchun «turn off» ishlatiladi!" },
  { re: "i am boring", wrong: "I am boring", right: "I am bored", cat: "vocabulary", why: "«Boring» = zerikarli (boshqalarga). «Bored» = zerikkan (o'zingiz). -ing/-ed farqi!" },
  { re: "explain me", wrong: "explain me", right: "explain to me", cat: "structure", why: "«Explain» dan keyin «to + kim» keladi. «Tell me» to'g'ri, lekin «explain to me»." },
  { re: "how to say", wrong: "How to say this?", right: "How do you say this?", cat: "structure", why: "Inglizcha savolda yordamchi fe'l kerak: «How DO you say...?»" },
  { re: "i didn't know", wrong: "I didn't know", right: "I didn't know (to'g'ri!)", cat: "grammar", why: "Bu to'g'ri! «Didn't + base form» — yaxshi ishlayapsiz." },
  { re: "he don't", wrong: "He don't", right: "He doesn't", cat: "grammar", why: "He/She/It bilan «doesn't» ishlatiladi. «Don't» faqat I/you/we/they bilan." },
  { re: "she have", wrong: "She have", right: "She has", cat: "grammar", why: "He/She/It bilan «has» ishlatiladi. «Have» faqat I/you/we/they bilan." },
];

// ============ DARSLAR (12 ta EN) ============
export const LESSONS_EN: Lesson[] = [
  {
    id: "l1", lvl: "A1", cat: "Tanishuv", emoji: "👋", title: "Tanishuv", desc: "O'zingizni tanishtirishni o'rganing",
    intro: "Tasavvur qiling: Londonda kafega kirdingiz. Atrofingizda inglizlar. Biri sizga qarab 'Hi! What's your name?' dedi. Endi nima deysiz?",
    questions: [
      { ask: "O'zingizni tanishtiring (ism va yosh):", expect: ["my name is", "i am", "i'm"], errors: [{ re: "i have \\d+ years", cat: "grammar", wrong: "I have 20 years", right: "I am 20 years old", why: "Yosh uchun 'have' emas 'am' ishlatiladi!" }], ok: "Ajoyib! Tabiiy tanishuv!", h1: "Ismingizni ayting: 'My name is ...'", h2: "Yoshingizni qo'shing: 'I am ... years old'", ans: "My name is [ism]. I am [yosh] years old.", ansWhy: "Inglizcha tanishuvda avval ism, keyin yosh. 'My name is' yoki 'I'm' ikkalasi ham ishlatiladi." },
      { ask: "Qayerdan ekanligingizni ayting:", expect: ["i am from", "i'm from", "i come from"], errors: [{ re: "i from", cat: "structure", wrong: "I from Tashkent", right: "I am from Tashkent", why: "Fe'l kerak! 'am' qo'shing." }], ok: "Zo'r! Shahrni aniq aytdingiz.", h1: "'I am from ...' ishlating", h2: "Shahar yoki mamlakat nomini qo'shing", ans: "I am from Tashkent, Uzbekistan.", ansWhy: "'I am from' — qayerdan ekanligingizni bildiradi. Shahar va mamlakatni birga aytish yaxshi." },
      { ask: "Kasbingizni ayting:", expect: ["i am a", "i'm a", "i work as"], errors: [{ re: "i am (?!a |an )", cat: "grammar", wrong: "I am doctor", right: "I am a doctor", why: "Kasb oldidan 'a/an' artikel kerak!" }], ok: "Mukammal! Kasbingizni to'g'ri aytdingiz.", h1: "'I am a ...' formatini ishlating", h2: "Kasbingizni qo'shing: doctor, teacher, student...", ans: "I am a software developer.", ansWhy: "Kasbdan oldin doim 'a' yoki 'an' keladi: a doctor, an engineer, a teacher." },
    ],
    quiz: [
      { q: "To'g'ri variantni tanlang: '___ name is Ali.'", opts: ["My", "I", "Me", "Mine"], a: 0, why: "'My' — egalik olmoshi. 'Mening ismim' = My name." },
      { q: "Qaysi variant to'g'ri?", opts: ["I have 25 years", "I am 25 years old", "I 25 years", "My years is 25"], a: 1, why: "Yosh uchun 'I am ... years old' ishlatiladi." },
    ],
    newWords: [WORDS_EN[0], WORDS_EN[12]],
  },
  {
    id: "l2", lvl: "A1", cat: "Past Simple", emoji: "⏰", title: "O'tgan zamon", desc: "Kecha nima qilganingizni ayting",
    intro: "Do'stingiz sizdan 'What did you do yesterday?' deb so'radi. O'tgan zamon — Past Simple — bu kundalik hayotda eng ko'p ishlatiladigan zamon!",
    questions: [
      { ask: "Kecha nima qilganingizni ayting:", expect: ["i went", "i watched", "i played", "i studied", "i worked", "i visited"], errors: [{ re: "i go yesterday", cat: "grammar", wrong: "Yesterday I go", right: "Yesterday I went", why: "'Yesterday' bilan o'tgan zamon fe'li kerak: go→went." }], ok: "Yaxshi! O'tgan zamonda gapira olasiz.", h1: "Fe'lni o'tgan zamonga o'tkazing: go→went, watch→watched", h2: "Gap boshida 'Yesterday' qo'shing", ans: "Yesterday I watched a movie.", ansWhy: "Past Simple: muntazam fe'llar +ed (watched), nointzom fe'llar alohida (went, saw, ate)." },
      { ask: "Menfiy gap tuzing: 'Kecha men parkka bormadim':", expect: ["i didn't go", "i did not go"], errors: [{ re: "didn't went", cat: "grammar", wrong: "I didn't went", right: "I didn't go", why: "'Didn't' dan keyin fe'l BOSH shaklda! -ed yoki o'tgan shakl kerak emas." }], ok: "To'g'ri! Menfiy shaklni bilasiz.", h1: "'I didn't + fe'l (bosh shakl)'", h2: "go, watch, play — bosh shaklda qolsin", ans: "I didn't go to the park yesterday.", ansWhy: "Menfiy: didn't + base form. 'Didn't went' XATO! 'Didn't go' TO'G'RI." },
      { ask: "Savol bering: 'Kecha kinoga bordingmi?'", expect: ["did you go", "did you watch"], errors: [{ re: "you went\\?", cat: "grammar", wrong: "You went?", right: "Did you go?", why: "Savolda 'Did' + fe'l (bosh shakl) kerak." }], ok: "Ajoyib savol!", h1: "'Did you + fe'l (bosh shakl)?'", h2: "Savol oxiriga '?' va intonatsiya", ans: "Did you go to the cinema yesterday?", ansWhy: "Savol: Did + subject + base form? Javob: Yes, I did. / No, I didn't." },
    ],
    quiz: [
      { q: "'go' fe'lining o'tgan zamoni:", opts: ["goed", "went", "gone", "going"], a: 1, why: "'Go' — nointzom fe'l, o'tgan zamoni 'went'." },
      { q: "To'g'ri variant: 'She ___ TV last night.'", opts: ["watch", "watched", "watches", "watching"], a: 1, why: "'Last night' = o'tgan zamon → watched." },
      { q: "Menfiy shakl: 'I ___ like it.'", opts: ["don't", "didn't", "doesn't", "not"], a: 1, why: "O'tgan zamon menfiy = didn't + base form." },
    ],
    newWords: [WORDS_EN[1], WORDS_EN[2]],
  },
  {
    id: "l3", lvl: "A2", cat: "borrow/lend", emoji: "🤝", title: "borrow vs lend", desc: "Qarz olish va qarz berish farqi",
    intro: "Do'stingizga 'Kitobingni ber' demoqchisiz. 'Lend' yoki 'borrow'? Bu ikki so'z o'zbekchada bitta — 'qarz', lekin inglizcha ikki xil!",
    questions: [
      { ask: "Do'stingizdan ruchka so'rayapsiz. Nima deysiz?", expect: ["can i borrow", "could i borrow", "may i borrow"], errors: [{ re: "can i lend", cat: "vocabulary", wrong: "Can I lend your pen?", right: "Can I borrow your pen?", why: "BORROW = qarz OLMOQ (siz olasiz). LEND = qarz BERMOQ (boshqa beradi)." }], ok: "To'g'ri! 'Borrow' — siz olasiz.", h1: "Borrow = QARZ OLMOQ (men olaman)", h2: "Lend = QARZ BERMOQ (u beradi)", ans: "Can I borrow your pen, please?", ansWhy: "Borrow = olmoq (men sizdan). Lend = bermoq (siz menga). Mnemonik: BORROw = BOlaman (ROw)." },
      { ask: "Do'stingiz pul so'rayapti. Siz berishga tayyorsiz. Nima deysiz?", expect: ["i will lend", "i can lend", "sure i'll lend", "i'll lend you"], errors: [{ re: "i will borrow you", cat: "vocabulary", wrong: "I'll borrow you money", right: "I'll lend you money", why: "Siz BERAYAPSIZ = LEND. Borrow = OLMOQ." }], ok: "Zo'r! Lend to'g'ri ishlatildi.", h1: "Siz BERYAPSIZMI? → LEND", h2: "'I'll lend you ...' = Men sizga ... beraman", ans: "Sure, I'll lend you some money.", ansWhy: "Lend = bermoq. 'I'll lend you $10' = Men sizga 10 dollar qarzga beraman." },
    ],
    quiz: [
      { q: "'Can I ___ your book?' (olmoq)", opts: ["lend", "borrow", "give", "take"], a: 1, why: "Siz OLMOQCHISIZ = borrow." },
      { q: "'I'll ___ you my notes.' (bermoq)", opts: ["borrow", "lend", "take", "keep"], a: 1, why: "Siz BERMOQCHISIZ = lend." },
    ],
    newWords: [WORDS_EN[3], WORDS_EN[4]],
  },
  {
    id: "l4", lvl: "A2", cat: "make/do", emoji: "🔨", title: "make vs do", desc: "Qachon 'make', qachon 'do'?",
    intro: "O'zbekchada 'ish qilmoq' = bitta so'z. Inglizcha ikkita: MAKE va DO. Qaysi birini qachon ishlatish kerak?",
    questions: [
      { ask: "'Uy ishlarini bajarmoq' ni inglizcha ayting:", expect: ["do the housework", "do housework", "do the homework"], errors: [{ re: "make the housework", cat: "vocabulary", wrong: "make the housework", right: "do the housework", why: "Ishlarni BAJARISH = DO. Ishlarni YARATISH = MAKE." }], ok: "To'g'ri! Ish bajarish = do.", h1: "DO = bajarish, qilish (vazifa, ish)", h2: "MAKE = yaratish, yasash (taom, reja, xato)", ans: "I do the housework every day.", ansWhy: "DO + ish/harakat: do homework, do the dishes, do exercise. MAKE + natija: make a cake, make a plan, make a mistake." },
      { ask: "'Xato qilmoq' ni ayting:", expect: ["make a mistake"], errors: [{ re: "do a mistake", cat: "vocabulary", wrong: "do a mistake", right: "make a mistake", why: "Xato YARATILADI = MAKE. Natija bor!" }], ok: "Ajoyib! 'Make a mistake' — to'g'ri ibora.", h1: "MAKE + natija: mistake, decision, plan", h2: "DO + harakat: homework, exercise, job", ans: "Everyone makes mistakes.", ansWhy: "MAKE a mistake = xato qilmoq (natija yaratildi). Bu doim 'make' bilan!" },
    ],
    quiz: [
      { q: "'___ a decision' (qaror qilmoq)", opts: ["Do", "Make", "Have", "Take"], a: 1, why: "Decision = natija → MAKE." },
      { q: "'___ your homework'", opts: ["Make", "Do", "Create", "Build"], a: 1, why: "Homework = vazifa → DO." },
    ],
    newWords: [WORDS_EN[5], WORDS_EN[6]],
  },
  {
    id: "l5", lvl: "A2", cat: "Shifokor", emoji: "🏥", title: "Shifokorda", desc: "Kasallik va shikoyat haqida gapirish",
    intro: "Tasavvur qiling: Londonda kasal bo'lib qoldingiz. Shifokorga borish kerak. Nima deysiz?",
    questions: [
      { ask: "Shifokorga nimangiz og'riyotganini ayting:", expect: ["i have a headache", "my head hurts", "i have a stomachache", "i feel sick"], errors: [{ re: "i am sick", cat: "structure", wrong: "I am sick head", right: "I have a headache", why: "Og'riq uchun 'have' ishlatiladi: I have a headache/stomachache." }], ok: "Yaxshi tushuntirdingiz!", h1: "'I have a ...' (headache, stomachache, fever)", h2: "Yoki 'My [tana a'zosi] hurts'", ans: "I have a terrible headache.", ansWhy: "Kasallik/og'riq: I have a + noun (headache, cold, fever). Yoki: My + body part + hurts/aches." },
      { ask: "Dori so'rayapsiz:", expect: ["can i have some", "could you give me", "i need some"], errors: [], ok: "Muloyim so'rayapsiz!", h1: "'Could I have some medicine?'", h2: "Yoki 'I need something for...'", ans: "Could I have some medicine for my headache?", ansWhy: "Muloyim so'rov: 'Could I have...' yoki 'Can I have...'. 'For' + kasallik." },
    ],
    quiz: [
      { q: "'Bosh og'rig'i' inglizcha:", opts: ["head pain", "headache", "head hurt", "head sick"], a: 1, why: "Headache = bosh + ache (og'riq)." },
      { q: "Shifokorga: 'I ___ a fever.'", opts: ["have", "am", "do", "feel"], a: 0, why: "'Have a fever' — kasallik uchun 'have' ishlatiladi." },
    ],
    newWords: [WORDS_EN[7], WORDS_EN[8]],
  },
  {
    id: "l6", lvl: "A2", cat: "going to/will", emoji: "🔮", title: "going to vs will", desc: "Kelajakni ifodalash",
    intro: "Rejangiz bormi yoki hozir qaror qildingizmi? Inglizcha kelajakda ikki xil yo'l bor!",
    questions: [
      { ask: "Rejangizni ayting (allaqachon qaror qilingan):", expect: ["i am going to", "i'm going to"], errors: [{ re: "i will going", cat: "grammar", wrong: "I will going travel", right: "I am going to travel", why: "'Going to' = reja. 'Will going' XATO! 'Am going to' yoki 'will go'." }], ok: "Rejangizni to'g'ri aytdingiz!", h1: "'I am going to + fe'l' = REJA (oldindan)", h2: "'I will + fe'l' = HOZIR qaror", ans: "I am going to visit Samarkand next month.", ansWhy: "GOING TO = oldindan reja/qaror. WILL = hozir qaror, va'da, taxmin. 'I'm going to study' (rejada bor)." },
      { ask: "Hozir qaror qildingiz — kimdir eshikni taqillatyapti:", expect: ["i will open", "i'll open"], errors: [], ok: "Tez qaror! 'Will' to'g'ri!", h1: "'I'll + fe'l' = hozirgi qaror", h2: "Spontan, oldindan reja bo'lmagan", ans: "I'll open the door!", ansWhy: "WILL = spontan qaror. Eshik taqilladi → 'I'll open it!' (hozir qaror qildim)." },
    ],
    quiz: [
      { q: "Reja: 'I ___ visit London.' (oldindan)", opts: ["will", "am going to", "open", "do"], a: 1, why: "Oldindan reja = going to." },
      { q: "Spontan: 'I ___ help you!' (hozir qaror)", opts: ["am going to", "will", "do", "have"], a: 1, why: "Hozirgi qaror = will." },
    ],
    newWords: [WORDS_EN[9], WORDS_EN[10]],
  },
  {
    id: "l7", lvl: "B1", cat: "Present Perfect", emoji: "✨", title: "Present Perfect", desc: "Tajriba va natija",
    intro: "'Men Parijda bo'lganman' — qachon? Muhim emas! Muhimi — TAJRIBA bor. Bu Present Perfect!",
    questions: [
      { ask: "Tajribangizni ayting (hech qachon/allaqachon):", expect: ["i have been", "i have visited", "i have tried", "i have seen"], errors: [{ re: "i was in paris", cat: "grammar", wrong: "I was in Paris (tajriba)", right: "I have been to Paris", why: "Tajriba = Present Perfect. 'I was' = qachonligi muhim (Past Simple)." }], ok: "Ajoyib! Tajribangizni to'g'ri aytdingiz.", h1: "'I have + V3' = tajriba/natija", h2: "been, visited, seen, tried — 3-shakl", ans: "I have been to Paris three times.", ansWhy: "Present Perfect: have/has + V3 (past participle). Tajriba, natija, hali tugamagan vaqt uchun." },
      { ask: "'Siz hech qachon sushi yeganmisiz?' — savol bering:", expect: ["have you ever eaten", "have you tried"], errors: [{ re: "did you ever eat", cat: "grammar", wrong: "Did you ever eat sushi?", right: "Have you ever eaten sushi?", why: "'Ever' bilan Present Perfect ishlatiladi. Tajriba so'ralyapti!" }], ok: "To'g'ri savol!", h1: "'Have you ever + V3?'", h2: "Ever = hech qachon (tajriba uchun)", ans: "Have you ever eaten sushi?", ansWhy: "'Ever' Present Perfect bilan: 'Have you ever...?' Javob: 'Yes, I have' / 'No, I haven't'." },
    ],
    quiz: [
      { q: "'I ___ finished my homework.' (hozirgina)", opts: ["have", "am", "was", "did"], a: 0, why: "Present Perfect: have + V3." },
      { q: "Tajriba: '___ you ever ___ to London?'", opts: ["Did / go", "Have / been", "Are / going", "Do / go"], a: 1, why: "'Ever' bilan Present Perfect: Have you ever been...?" },
    ],
    newWords: [WORDS_EN[11], WORDS_EN[13]],
  },
  {
    id: "l8", lvl: "A2", cat: "Artikllar", emoji: "📝", title: "a/an/the", desc: "Artikllar qoidasi",
    intro: "Inglizchada har ot bilan artikel keladi. O'zbekchada yo'q — shuning uchun xato ko'p. Keling o'rganamiz!",
    questions: [
      { ask: "'Men shifokorman' — to'g'ri yozing:", expect: ["i am a doctor"], errors: [{ re: "i am doctor", cat: "grammar", wrong: "I am doctor", right: "I am a doctor", why: "Kasb = sanaladigan ot → 'a' kerak! O'zbekcha 'U shifokor' da artikel yo'q." }], ok: "To'g'ri! Artikel qo'yildi.", h1: "Kasb/sinf oldidan 'a/an' qo'ying", h2: "a doctor, an engineer, a teacher", ans: "I am a doctor.", ansWhy: "'a' = biror (noaniq). 'an' = unli harfdan oldin. 'the' = aniq narsa." },
      { ask: "'Quyosh chiqdi' — aniq narsa:", expect: ["the sun", "the sun rose"], errors: [{ re: "a sun", cat: "grammar", wrong: "A sun rose", right: "The sun rose", why: "Quyosh BIRLlIK — aniq narsa → 'the'!" }], ok: "To'g'ri! Aniq narsa = the.", h1: "Yagona/aniq narsalar = THE", h2: "the sun, the moon, the internet", ans: "The sun rose at 6 AM.", ansWhy: "THE = aniq narsa (ikkalamiz bilamiz qaysi). A/AN = biror (noaniq, birinchi marta)." },
    ],
    quiz: [
      { q: "'I saw ___ bird.' (birinchi marta)", opts: ["a", "an", "the", "—"], a: 0, why: "Birinchi marta eshitilayotgan narsa = 'a'." },
      { q: "'___ moon is beautiful tonight.'", opts: ["A", "An", "The", "—"], a: 2, why: "Oy yagona = THE." },
    ],
    newWords: [WORDS_EN[14], WORDS_EN[15]],
  },
  {
    id: "l9", lvl: "B1", cat: "Conditionals", emoji: "🔀", title: "Shartli gaplar", desc: "If + would/could",
    intro: "'Agar boy bo'lsam, sayohat qilardim' — bu haqiqat emas, lekin tasavvur qilamiz. Bu 2nd Conditional!",
    questions: [
      { ask: "'Agar vaqtim bo'lsa, inglizcha o'rganardim' — tarjima qiling:", expect: ["if i had time i would", "if i had time i'd"], errors: [{ re: "if i have time i will", cat: "grammar", wrong: "If I have time I will learn (haqiqat emas)", right: "If I had time, I would learn", why: "Haqiqat emas (hozir vaqtim yo'q) = 2nd Conditional: If + PAST, would + fe'l." }], ok: "Ajoyib! Shartli gap to'g'ri!", h1: "If + PAST (had, were, knew) + WOULD + fe'l", h2: "Bu XAYOLIY shart — haqiqat emas", ans: "If I had more time, I would study English.", ansWhy: "2nd Conditional: agar hozir haqiqat BO'LMASA. 'If I had' (lekin yo'q) + 'I would study'." },
    ],
    quiz: [
      { q: "2nd Conditional: 'If I ___ rich, I would travel.'", opts: ["am", "was/were", "will be", "have been"], a: 1, why: "2nd Conditional = If + PAST (were)." },
      { q: "'If she ___ here, she would help.'", opts: ["is", "were", "will be", "has been"], a: 1, why: "Xayoliy shart = PAST (were)." },
    ],
    newWords: [WORDS_EN[16], WORDS_EN[17]],
  },
  {
    id: "l10", lvl: "B1", cat: "Passive", emoji: "🔄", title: "Passive Voice", desc: "Majhul nisbat",
    intro: "'The book was written by Tolkien' — Kitob yozildi (kim tomonidan muhim emas). Bu Passive!",
    questions: [
      { ask: "'Bu shahar 2000 yilda qurilgan' — Passive:", expect: ["was built", "was constructed"], errors: [{ re: "built in 2000", cat: "structure", wrong: "This city built in 2000", right: "This city was built in 2000", why: "Passive: be + V3. Shahar o'zi qurilmadi — KURILDI (majhul)." }], ok: "To'g'ri Passive!", h1: "BE + V3 (past participle)", h2: "is built, was built, has been built", ans: "This city was built in 2000.", ansWhy: "Passive = be + V3. Qachon? was built (o'tgan), is built (hozir), will be built (kelajak)." },
    ],
    quiz: [
      { q: "Passive: 'English ___ spoken here.'", opts: ["is", "are", "does", "has"], a: 0, why: "Passive Present: is/are + V3." },
      { q: "'The letter ___ yesterday.'", opts: ["was sent", "sent", "has sent", "is sending"], a: 0, why: "O'tgan zamon Passive: was/were + V3." },
    ],
    newWords: [WORDS_EN[18], WORDS_EN[19]],
  },
  {
    id: "l11", lvl: "B1", cat: "Phrasal Verbs", emoji: "🔗", title: "Frazal fe'llar", desc: "give up, look for, turn on...",
    intro: "Inglizlar fe'l + kichik so'z birikmasini juda sevadi: give UP, look FOR, turn ON. Har biri alohida ma'no!",
    questions: [
      { ask: "'Men sigaret tashladim' (tashlamoq):", expect: ["i gave up", "i quit", "i stopped"], errors: [{ re: "i gave", cat: "vocabulary", wrong: "I gave smoking", right: "I gave up smoking", why: "GIVE UP = tashlamoq (odatni). Faqat 'gave' yetarli emas!" }], ok: "Zo'r! 'Give up' to'g'ri!", h1: "GIVE UP = tashlamoq (odatni)", h2: "give up smoking, give up sugar", ans: "I gave up smoking last year.", ansWhy: "Phrasal verb: fe'l + particle. Give UP = tashlamoq. Turn ON = yoqmoq. Look FOR = qidirmoq." },
      { ask: "'Men kalitimni qidiryapman':", expect: ["i am looking for", "i'm looking for"], errors: [{ re: "i am searching", cat: "vocabulary", wrong: "I am searching my keys", right: "I am looking for my keys", why: "Qidirmoq = LOOK FOR. 'Search' boshqa ma'no (tekshirmoq)." }], ok: "To'g'ri frazal fe'l!", h1: "LOOK FOR = qidirmoq", h2: "look for keys, look for a job", ans: "I'm looking for my keys. Have you seen them?", ansWhy: "LOOK FOR = qidirmoq. LOOK AFTER = qaramoq. LOOK FORWARD TO = kutmoq (intiqib)." },
    ],
    quiz: [
      { q: "'Turn ___ the light' (yoqmoq)", opts: ["on", "off", "up", "in"], a: 0, why: "Turn ON = yoqmoq. Turn OFF = o'chirmoq." },
      { q: "'I need to find ___ a new apartment.'", opts: ["for", "out", "up", "off"], a: 0, why: "Find/look FOR = qidirmoq." },
    ],
    newWords: [WORDS_EN[20], WORDS_EN[21]],
  },
  {
    id: "l12", lvl: "B2", cat: "Business", emoji: "💼", title: "Business/Interview", desc: "Ish suhbati va biznes inglizcha",
    intro: "Tasavvur qiling: Google'dan ish taklifi keldi. Interviewga tayyorlanish kerak. Professional inglizcha o'rganamiz!",
    questions: [
      { ask: "O'zingizni professional tanishtiring:", expect: ["i have experience", "i have been working", "i graduated", "my background"], errors: [{ re: "i work (\\d+) years", cat: "grammar", wrong: "I work 5 years", right: "I have been working for 5 years", why: "Hozirgacha davom etayotgan tajriba = Present Perfect Continuous." }], ok: "Professional tanishuv!", h1: "'I have X years of experience in...'", h2: "Yoki 'I have been working as... for X years'", ans: "I have 5 years of experience in software development.", ansWhy: "Professional: 'I have X years of experience in [soha]'. Yoki: 'I have been working as [kasb] for [vaqt]'." },
      { ask: "Kuchli tomoningizni ayting:", expect: ["i am good at", "my strength is", "i excel at", "i am skilled in"], errors: [{ re: "i am good in", cat: "grammar", wrong: "I am good in English", right: "I am good at English", why: "'Good AT' — fe'l/preposition birikmasi. 'In' emas!" }], ok: "Ishonchli javob!", h1: "'I am good AT ...' yoki 'My strength is ...'", h2: "good AT, skilled IN, excel AT", ans: "I am good at problem-solving and teamwork.", ansWhy: "good AT + noun/gerund. 'I am good at coding.' Professional intervyu uchun aniq misollar keltiring." },
    ],
    quiz: [
      { q: "'I am good ___ managing teams.'", opts: ["in", "at", "on", "for"], a: 1, why: "'Good AT' — to'g'ri preposition." },
      { q: "'I ___ working here for 3 years.'", opts: ["am", "have been", "was", "did"], a: 1, why: "Hozirgacha = Present Perfect Continuous." },
    ],
    newWords: [WORDS_EN[22], WORDS_EN[23]],
  },
];

// ============ GRAMMATIKA (12 mavzu) ============
export const GRAMMAR_EN: GrammarTopic[] = [
  { emoji: "👋", title: "Tanishuv", story: "Tasavvur qiling: yangi sinfga kirdingiz. 'Hi, I'm...' — bu eng oddiy boshlanish. Har kuni ishlatiladi!", pairs: [["My name is Ali.", "I'm Ali."], ["Nice to meet you.", "Pleased to meet you."], ["Where are you from?", "What country are you from?"]] },
  { emoji: "⏰", title: "Past Simple", story: "Kecha nima qildingiz? Past Simple — bu TUGAGAN harakat. go→went, watch→watched. 'Yesterday' signali!", pairs: [["I watched TV.", "I didn't watch TV."], ["Did you go?", "Yes, I did."], ["She played tennis.", "She didn't play."]] },
  { emoji: "🤝", title: "borrow/lend", story: "O'zbekchada bitta 'qarz' — inglizcha IKKI: borrow (olmoq) va lend (bermoq). Yo'nalish muhim!", pairs: [["Can I borrow your pen?", "Can you lend me your pen?"], ["I borrowed $10 from him.", "He lent me $10."], ["She never lends money.", "I need to borrow some."]] },
  { emoji: "🔨", title: "make/do", story: "MAKE = yaratmoq (natija bor). DO = bajarmoq (harakat). 'Make a cake' (pishirding), 'do homework' (bajarding).", pairs: [["make a decision", "do homework"], ["make a mistake", "do exercise"], ["make dinner", "do the dishes"]] },
  { emoji: "🏥", title: "Shifokor mavzusi", story: "Kasal bo'lsangiz: 'I have a headache/cold/fever.' Dori: 'Could I have some medicine?' Inglizcha 'have' kasallik bilan!", pairs: [["I have a headache.", "My head hurts."], ["I have a fever.", "I feel sick."], ["I need medicine.", "Could you prescribe something?"]] },
  { emoji: "🔮", title: "going to / will", story: "GOING TO = reja (allaqachon qaror). WILL = hozir qaror. 'I'm going to study' (rejada). 'I'll help!' (hozir qaror).", pairs: [["I'm going to travel.", "I'll travel someday."], ["She's going to cook.", "I'll cook tonight!"], ["Are you going to come?", "Will you come?"]] },
  { emoji: "✨", title: "Present Perfect", story: "Tajriba muhim, vaqt emas! 'I have been to Paris' (qachon muhim emas). 'Have you ever...?' — eng mashhur savol!", pairs: [["I have finished.", "I finished yesterday."], ["Have you ever...?", "I have never..."], ["She has lived here for 5 years.", "She lived here in 2020."]] },
  { emoji: "📝", title: "Artikllar (a/an/the)", story: "A = biror (noaniq). THE = aniq (bilamiz qaysi). O'zbekchada yo'q — shuning uchun qiyin! 'A book' (bir kitob), 'the book' (ana o'sha kitob).", pairs: [["I saw a dog.", "The dog was big."], ["She is a doctor.", "The doctor is kind."], ["I need a pen.", "Give me the pen."]] },
  { emoji: "🔀", title: "Shartli gaplar", story: "IF + PAST = xayoliy (2nd). IF + PRESENT = haqiqiy (1st). 'If I were rich...' (lekin emas). 'If it rains...' (bo'lishi mumkin).", pairs: [["If I were you, I would go.", "If it rains, I will stay."], ["If she knew, she would tell.", "If he comes, tell me."], ["If I had time...", "If you need help..."]] },
  { emoji: "🔄", title: "Passive Voice", story: "Kim qilgani muhim BO'LMASA → Passive. 'The book was written' (muallif muhim emas). be + V3!", pairs: [["The letter was sent.", "They sent the letter."], ["English is spoken here.", "People speak English here."], ["The house was built in 1990.", "They built the house in 1990."]] },
  { emoji: "🔗", title: "Phrasal Verbs", story: "Fe'l + kichik so'z = yangi ma'no! give UP (tashlamoq), look FOR (qidirmoq), turn ON (yoqmoq). Inglizlar juda sevadi!", pairs: [["give up smoking", "look for keys"], ["turn on the light", "turn off the TV"], ["look after children", "find out the truth"]] },
  { emoji: "💼", title: "Business English", story: "Professional suhbatda: 'I have experience in...', 'I am good at...', 'I have been working for...'. Rasmiyroq, aniqroq!", pairs: [["I have 5 years of experience.", "I am skilled in management."], ["Could we schedule a meeting?", "I look forward to hearing from you."], ["My strengths include...", "I excel at problem-solving."]] },
];

// ============ TEST SAVOLLARI (30 ta) ============
export const TESTS_EN = [
  { q: "'I ___ a student.'", opts: ["am", "is", "are", "be"], a: 0, why: "I + am. 'Men talabaman'.", cat: "grammar", lvl: "A1" },
  { q: "'She ___ from Korea.'", opts: ["am", "is", "are", "be"], a: 1, why: "She + is.", cat: "grammar", lvl: "A1" },
  { q: "'They ___ playing football.'", opts: ["am", "is", "are", "be"], a: 2, why: "They + are.", cat: "grammar", lvl: "A1" },
  { q: "'I ___ breakfast every morning.'", opts: ["has", "have", "having", "haves"], a: 1, why: "I + have. I/you/we/they = have.", cat: "grammar", lvl: "A1" },
  { q: "'He ___ to school yesterday.'", opts: ["go", "goes", "went", "going"], a: 2, why: "Yesterday = Past Simple. go→went.", cat: "grammar", lvl: "A1" },
  { q: "'Can you ___ me?'", opts: ["help", "helps", "helping", "helped"], a: 0, why: "Can + base form (yordamchi fe'dan keyin).", cat: "grammar", lvl: "A1" },
  { q: "'There ___ a book on the table.'", opts: ["am", "is", "are", "be"], a: 1, why: "A book = singular → is.", cat: "grammar", lvl: "A1" },
  { q: "'I don't like ___.'", opts: ["she", "her", "hers", "herself"], a: 1, why: "Fe'ldan keyin obyekt olmoshi: her.", cat: "grammar", lvl: "A2" },
  { q: "'She is ___ than her sister.'", opts: ["tall", "taller", "tallest", "more tall"], a: 1, why: "2 ta narsa taqqoslash = -er (taller).", cat: "grammar", lvl: "A2" },
  { q: "'This is ___ book I've ever read.'", opts: ["good", "better", "best", "the best"], a: 3, why: "Eng yaxshi = the best (superlative).", cat: "grammar", lvl: "A2" },
  { q: "'I have lived here ___ 2010.'", opts: ["for", "since", "from", "at"], a: 1, why: "Aniq yil = SINCE. Davr = FOR.", cat: "grammar", lvl: "A2" },
  { q: "'If it rains, I ___ stay home.'", opts: ["will", "would", "am", "do"], a: 0, why: "1st Conditional: If + present, WILL + base.", cat: "grammar", lvl: "A2" },
  { q: "'The letter ___ yesterday.'", opts: ["sent", "was sent", "has sent", "is sent"], a: 1, why: "Passive Past: was/were + V3.", cat: "grammar", lvl: "B1" },
  { q: "'I wish I ___ taller.'", opts: ["am", "was/were", "will be", "have been"], a: 1, why: "Wish + PAST (xayoliy).", cat: "grammar", lvl: "B1" },
  { q: "'He suggested ___ a movie.'", opts: ["watch", "to watch", "watching", "watched"], a: 2, why: "Suggest + gerund (-ing).", cat: "grammar", lvl: "B1" },
  { q: "'By next year, I ___ graduated.'", opts: ["will", "will have", "am", "have"], a: 1, why: "By + kelajak = Future Perfect (will have + V3).", cat: "grammar", lvl: "B2" },
  { q: "'Not only ___ smart, but also kind.'", opts: ["he is", "is he", "he", "does he"], a: 1, why: "Not only + inversion (is he).", cat: "grammar", lvl: "B2" },
  { q: "'I'd rather you ___ smoke here.'", opts: ["don't", "didn't", "won't", "not"], a: 1, why: "Would rather + PAST (xayoliy).", cat: "grammar", lvl: "B2" },
  { q: "'She's the one ___ car was stolen.'", opts: ["who", "whose", "which", "whom"], a: 1, why: "Egalik = WHOSE (uning).", cat: "grammar", lvl: "B1" },
  { q: "'Hardly ___ arrived when it started raining.'", opts: ["we had", "had we", "we have", "have we"], a: 1, why: "Hardly + inversion (had we).", cat: "grammar", lvl: "B2" },
  { q: "'Can I borrow your pen?' — '___.'", opts: ["Yes, lend it", "Yes, here you are", "Yes, borrow it", "Yes, take"], a: 1, why: "'Here you are' — marhamat, mana.", cat: "vocabulary", lvl: "A1" },
  { q: "'I need some ___.' (maslahat)", opts: ["advices", "advice", "advise", "an advice"], a: 1, why: "Advice — sanalmaydigan ot (ko'plik yo'q).", cat: "vocabulary", lvl: "A2" },
  { q: "'The ___ was amazing!' (taom)", opts: ["meal", "food", "dish", "eat"], a: 0, why: "Meal = to'liq ovqat (nonushta, tushlik).", cat: "vocabulary", lvl: "A2" },
  { q: "'I'm looking ___ my keys.'", opts: ["at", "for", "after", "up"], a: 1, why: "Look FOR = qidirmoq.", cat: "vocabulary", lvl: "A2" },
  { q: "'Please turn ___ the TV.'", opts: ["on", "up", "in", "at"], a: 0, why: "Turn ON = yoqmoq.", cat: "vocabulary", lvl: "A2" },
  { q: "'He ___ a mistake.'", opts: ["did", "made", "had", "took"], a: 1, why: "Make a mistake = xato qilmoq.", cat: "vocabulary", lvl: "A2" },
  { q: "'I'm ___ tired today.'", opts: ["very", "much", "many", "a lot"], a: 0, why: "Very + sifat/fe'l. Much = V3 bilan.", cat: "vocabulary", lvl: "A1" },
  { q: "'She ___ English for 5 years.'", opts: ["studies", "has studied", "is studying", "studied"], a: 1, why: "For 5 years (hozirgacha) = Present Perfect.", cat: "grammar", lvl: "B1" },
  { q: "'I'll call you ___ I arrive.'", opts: ["as soon as", "until", "while", "during"], a: 0, why: "As soon as = zahoti (kelganoq).", cat: "vocabulary", lvl: "B1" },
  { q: "'The meeting has been ___ until Friday.'", opts: ["put off", "put on", "put out", "put up"], a: 0, why: "Put off = kechiktirmoq.", cat: "vocabulary", lvl: "B2" },
];

// ============ PLACEMENT TEST (8 ta) ============
export const PLACEMENT = [
  { q: "'I ___ a teacher.'", opts: ["am", "is", "are", "be"], a: 0, lvl: "A1" },
  { q: "'She ___ to school every day.'", opts: ["go", "goes", "going", "gone"], a: 1, lvl: "A1" },
  { q: "'I have ___ been to London.'", opts: ["ever", "never", "always", "yet"], a: 1, lvl: "A2" },
  { q: "'If I ___ you, I would study harder.'", opts: ["am", "was", "were", "be"], a: 2, lvl: "B1" },
  { q: "'The report ___ by tomorrow.'", opts: ["will complete", "will be completed", "completes", "is completing"], a: 1, lvl: "B1" },
  { q: "'Had I known, I ___ differently.'", opts: ["would act", "would have acted", "acted", "had acted"], a: 1, lvl: "B2" },
  { q: "'Not until he left ___ I realize.'", opts: ["do", "did", "have", "was"], a: 1, lvl: "B2" },
  { q: "'The phenomenon, ___ was unexpected, caused concern.'", opts: ["which", "what", "who", "whose"], a: 0, lvl: "C1" },
];

// ============ ERKIN SUHBAT SAVOLLARI ============
export const FREE_TALK = [
  "What's your favorite food? Why do you like it?",
  "If you could visit any city, where would you go?",
  "What movie do you recommend? What's it about?",
  "What's your dream job? Why?",
  "Describe your typical day. What do you do?",
  "What hobby would you like to start? Why?",
  "Tell me about your best friend. What are they like?",
  "If you won $1 million, what would you do first?",
];

// ============ SHADOWING (8 gap) ============
export const SHADOW_SENTENCES = [
  "The weather is beautiful today.",
  "I would like a cup of coffee, please.",
  "Could you tell me where the station is?",
  "She has been working here for five years.",
  "Unfortunately, I can't attend the meeting.",
  "The children are playing in the garden.",
  "I'm looking forward to our vacation.",
  "It's never too late to learn something new.",
];

// ============ MINIMAL JUFTLIKLAR (10) ============
export const MINIMAL_PAIRS = [
  { a: "ship", b: "sheep", note: "/ɪ/ vs /iː/ — qisqa va uzun" },
  { a: "work", b: "walk", note: "/ɜː/ vs /ɔː/" },
  { a: "bad", b: "bed", note: "/æ/ vs /e/" },
  { a: "full", b: "fool", note: "/ʊ/ vs /uː/" },
  { a: "think", b: "sink", note: "/θ/ vs /s/" },
  { a: "very", b: "wary", note: "/v/ vs /w/" },
  { a: "rice", b: "nice", note: "/r/ vs /n/" },
  { a: "light", b: "night", note: "/l/ vs /n/" },
  { a: "seat", b: "sit", note: "/iː/ vs /ɪ/" },
  { a: "pool", b: "pull", note: "/uː/ vs /ʊ/" },
];

// ============ FONEM DRILL ============
export const PHONEMES = [
  { sound: "/θ/", words: ["think", "three", "thank", "bath", "month"], tip: "Tilni tishlar orasiga qo'ying va puflang." },
  { sound: "/w/ vs /v/", words: ["wine/vine", "west/vest", "wet/vet"], tip: "/w/ — lablar doira. /v/ — tish labga." },
  { sound: "/æ/", words: ["cat", "bad", "man", "happy", "travel"], tip: "Og'izni keng oching — 'a' va 'e' orasi." },
  { sound: "/ŋ/", words: ["sing", "ring", "long", "king", "morning"], tip: "Orqa til — tanglayga. 'ng' tovushi." },
  { sound: "/ɜː/", words: ["bird", "work", "learn", "turn", "first"], tip: "Uzun, o'rta tovush. Lablar neytral." },
];

// ============ IPAK YO'LI ============
export const SILK_ROAD = [
  { city: "Samarqand", emoji: "🕌", req: "1 dars", check: (s: any) => s.totals.lessons >= 1 },
  { city: "Buxoro", emoji: "📚", req: "3 dars", check: (s: any) => s.totals.lessons >= 3 },
  { city: "Xiva", emoji: "🏰", req: "6 dars", check: (s: any) => s.totals.lessons >= 6 },
  { city: "Marv", emoji: "📖", req: "20 so'z", check: (s: any) => (s.deck?.en?.filter((w: any) => w.reps > 0).length || 0) >= 20 },
  { city: "Tabriz", emoji: "🌉", req: "9 dars", check: (s: any) => s.totals.lessons >= 9 },
  { city: "Trabzon", emoji: "⛰️", req: "30 so'z", check: (s: any) => (s.deck?.en?.filter((w: any) => w.reps > 0).length || 0) >= 30 },
  { city: "Istanbul", emoji: "🌊", req: "12 dars", check: (s: any) => s.totals.lessons >= 12 },
  { city: "London", emoji: "🇬🇧", req: "B2 test 80%", check: (s: any) => s.levels?.en === "B2" || s.levels?.en === "C1" },
];

// ============ ROLLAR (3 ssenariy × 4 turn) ============
export const ROLES = [
  {
    title: "Job Interview", emoji: "💼",
    turns: [
      { role: "interviewer", text: "Tell me about yourself.", hint: "I am... I have experience in..." },
      { role: "interviewer", text: "Why do you want this job?", hint: "I am interested in... because..." },
      { role: "interviewer", text: "What are your strengths?", hint: "I am good at... My strength is..." },
      { role: "interviewer", text: "Do you have any questions?", hint: "Could you tell me about...?" },
    ],
  },
  {
    title: "At the Airport", emoji: "✈️",
    turns: [
      { role: "officer", text: "May I see your passport?", hint: "Here you are. / Sure, here it is." },
      { role: "officer", text: "What is the purpose of your visit?", hint: "I am here for business/tourism/study." },
      { role: "officer", text: "How long will you stay?", hint: "I will stay for ... days/weeks." },
      { role: "officer", text: "Where will you be staying?", hint: "I will stay at ... hotel." },
    ],
  },
  {
    title: "At the Hotel", emoji: "🏨",
    turns: [
      { role: "receptionist", text: "Welcome! Do you have a reservation?", hint: "Yes, under the name... / No, I'd like to book a room." },
      { role: "receptionist", text: "What type of room would you prefer?", hint: "I'd like a single/double room." },
      { role: "receptionist", text: "Breakfast is from 7 to 10. Anything else?", hint: "Could I have the WiFi password?" },
      { role: "receptionist", text: "Here's your key. Room 305. Enjoy your stay!", hint: "Thank you! / Could you help me with my luggage?" },
    ],
  },
];

// ============ STORY (tugunli hikoya) ============
export const STORY_NODES = [
  { id: 1, text: "You arrive at the train station in London. It's raining. You need to find your hotel.", choices: [{ text: "Ask a passerby for help", next: 2 }, { text: "Use your phone map", next: 3 }] },
  { id: 2, text: "You approach a friendly-looking person. 'Excuse me, could you help me?'", input: true, expect: ["excuse me", "could you", "help", "where"], next: 4 },
  { id: 3, text: "You open Google Maps. The battery is at 15%. You need to hurry.", choices: [{ text: "Walk quickly", next: 4 }, { text: "Find a cafe to charge", next: 5 }] },
  { id: 4, text: "You see the hotel! 'The Grand London' — your reservation is here.", input: true, expect: ["hello", "reservation", "check in", "name"], next: 6 },
  { id: 5, text: "In the cafe, you meet a local. They offer to show you around!", choices: [{ text: "Accept the invitation", next: 7 }, { text: "Thank them but go to hotel", next: 6 }] },
  { id: 6, text: "ENDING A: You check in and rest. Tomorrow you explore London. Good job! 🎉", ending: true, words: ["reservation", "check in", "passerby"] },
  { id: 7, text: "ENDING B: Your new friend shows you hidden London. You make a friend for life! 🌟", ending: true, words: ["hidden", "local", "explore"] },
];

// ============ TARJIMON (7 gap) ============
export const INTERPRETER = [
  { uz: "Men Toshkentdanman.", en: "I am from Tashkent.", keys: ["from", "tashkent"] },
  { uz: "Kecha men kinoga bordim.", en: "Yesterday I went to the cinema.", keys: ["yesterday", "went", "cinema"] },
  { uz: "U shifokor bo'lishni xohlaydi.", en: "She wants to become a doctor.", keys: ["wants", "doctor", "become"] },
  { uz: "Biz ingliz tilini o'rganyapmiz.", en: "We are learning English.", keys: ["learning", "english"] },
  { uz: "Agar vaqtim bo'lsa, sayohat qilardim.", en: "If I had time, I would travel.", keys: ["if", "time", "would", "travel"] },
  { uz: "Bu kitob juda qiziqarli.", en: "This book is very interesting.", keys: ["book", "interesting"] },
  { uz: "Men har kuni ertalab mashq qilaman.", en: "I exercise every morning.", keys: ["exercise", "every", "morning"] },
];

// ============ IELTS ============
export const IELTS_READING = {
  title: "The Silk Road: A Bridge Between Civilizations",
  text: `The Silk Road was not a single road, but a network of trade routes connecting the East and West. For over 1,500 years, merchants traveled these paths, carrying silk, spices, precious metals, and ideas between China, Central Asia, the Middle East, and Europe.

The name "Silk Road" was coined by German geographer Ferdinand von Richthofen in 1877, but the routes had been in use since the 2nd century BCE. Beyond goods, these routes facilitated the exchange of religions (Buddhism, Islam), technologies (paper, gunpowder), and cultural practices.

Central Asia, particularly cities like Samarkand and Bukhara, served as crucial hubs. Under Timur's reign in the 14th century, Samarkand became one of the world's most magnificent cities, attracting scholars, artists, and traders from across the known world.

Today, China's Belt and Road Initiative echoes these ancient paths, demonstrating how historical trade networks continue to influence modern geopolitics and economics.`,
  questions: [
    { q: "The Silk Road was:", opts: ["A single road from China to Europe", "A network of trade routes", "A railway built in 1877", "A river in Central Asia"], a: 1 },
    { q: "Who gave the name 'Silk Road'?", opts: ["A Chinese emperor", "A German geographer", "A British merchant", "An Italian explorer"], a: 1 },
    { q: "Samarkand became magnificent under:", opts: ["Genghis Khan", "Ferdinand von Richthofen", "Timur's reign", "The Silk merchants"], a: 2 },
    { q: "The modern equivalent mentioned is:", opts: ["The Internet", "The European Union", "Belt and Road Initiative", "NATO"], a: 2 },
  ],
};

export const IELTS_WRITING_RUBRIC = {
  prompt: "Some people believe that learning a foreign language is essential in the modern world. To what extent do you agree or disagree?",
  criteria: [
    { name: "Word count ≥ 60", check: (t: string) => t.split(/\s+/).length >= 60 },
    { name: "Connectors ≥ 2", check: (t: string) => (t.match(/\b(however|therefore|moreover|furthermore|although|because|since|in addition)\b/gi) || []).length >= 2 },
    { name: "Clear opinion", check: (t: string) => /\b(i agree|i disagree|i believe|i think|in my opinion)\b/i.test(t) },
    { name: "Paragraphs ≥ 2", check: (t: string) => t.split(/\n\n+/).length >= 2 },
  ],
};
