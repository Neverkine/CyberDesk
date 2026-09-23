import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface SupportRequestBody {
  message?: string;
  language?: "ru" | "kz" | "en";
}

const KNOWLEDGE_RESPONSES: Record<"ru" | "kz" | "en", {
  bug: (id: string) => { reply: string; badge: string };
  xp: { reply: string };
  mobile: { reply: string };
  idea: (id: string) => { reply: string; badge: string };
  kaspi: { reply: string };
  egov: { reply: string };
  telegram: { reply: string };
  general: { reply: string };
}> = {
  ru: {
    bug: (id) => ({
      reply: `Принято! Обращение зарегистрировано под кодом #${id}. Если симуляция зависла, нажмите «Попробовать снова» в окне диалога или обновите страницу. Технический стек зафиксирован.`,
      badge: `#${id}`,
    }),
    xp: {
      reply: `Опыт (+100..+120 XP) начисляется за верные решения в симуляциях атак. Кристаллы (💎) выдаются за победу в этапах и удержание серии дней. Их можно обменять на Заморозку стрика в «Магазине бонусов».`,
    },
    mobile: {
      reply: `CyberDesk полностью адаптивен! Чтобы открыть платформу на смартфоне, подключитесь к одной сети Wi-Fi и откройте локальный IP (например: http://192.168.10.12:3000) либо используйте кнопку мобильного предпросмотра в шапке.`,
    },
    idea: (id) => ({
      reply: `Отличная идея для расширения базы атак! Мы собираем актуальные векторы мошенничества по Казахстану. Ваше предложение внесено в бэклог под номером #${id}.`,
      badge: `#${id}`,
    }),
    kaspi: {
      reply: `Важное правило безопасности Kaspi: служба безопасности банка НИКОГДА не просит назвать SMS-код, CVV или сканировать чужие QR-коды для «отмены кредита». Все операции подтверждаются только внутри официального приложения Kaspi.kz.`,
    },
    egov: {
      reply: `Служба eGov и номер 1414 никогда не звонят через WhatsApp и не требуют передать код подтверждения для «отмены выпуска ЭЦП». Настоящий 1414 присылает только уведомления. При любых сомнениях звоните напрямую на 1414.`,
    },
    telegram: {
      reply: `Схема угона Telegram через «Голосование за племянницу» или «Подарок Telegram Premium» рассчитана на фишинговый ввод номера и кода сессии. Никогда не вводите код подтверждения на сторонних сайтах!`,
    },
    general: {
      reply: `Здравствуйте! Я виртуальный консультант CyberDesk по кибербезопасности и платформе. Вы можете спросить о схемах атак (Kaspi, eGov, Telegram), начислении XP, сообщить о баге или предложить сценарий. Чем могу помочь?`,
    },
  },
  kz: {
    bug: (id) => ({
      reply: `Қабылданды! Өтініш #${id} кодымен тіркелді. Егер симуляция тоқтап қалса, диалог терезесінде «Қайта көру» түймесін басыңыз немесе бетті жаңартыңыз.`,
      badge: `#${id}`,
    }),
    xp: {
      reply: `Тәжірибе (+100..+120 XP) шабуыл симуляцияларында дұрыс жауап бергені үшін беріледі. Кристалдар (💎) кезеңдерді сәтті аяқтағаны және күндік серияны сақтағаны үшін беріледі. Оларды «Бонустар дүкенінде» айырбастауға болады.`,
    },
    mobile: {
      reply: `CyberDesk толықтай бейімделген! Платформаны смартфонда ашу үшін бір Wi-Fi желісіне қосылып, жергілікті IP мекенжайын (мысалы: http://192.168.10.12:3000) ашыңыз немесе жоғарғы жолақтағы мобильді көрініс түймесін басыңыз.`,
    },
    idea: (id) => ({
      reply: `Шабуылдар базасын кеңейту бойынша керемет ұсыныс! Біз Қазақстандағы өзекті алаяқтық тәсілдерін жинақтаймыз. Сіздің идеяңыз #${id} нөмірімен тіркелді.`,
      badge: `#${id}`,
    }),
    kaspi: {
      reply: `Kaspi қауіпсіздік ережесі: банк қызметкерлері ЕШҚАШАН SMS-кодты, CVV немесе бөтен QR-кодты сканерлеуді талап етпейді. Барлық әрекеттер тек ресми Kaspi.kz қосымшасында орындалады.`,
    },
    egov: {
      reply: `eGov және 1414 қызметі ешқашан WhatsApp арқылы хабарласпайды және ЭЦП-ны жою үшін растау кодын сұрамайды. Күмәндансаңыз, бірден 1414 нөміріне қоңырау шалыңыз.`,
    },
    telegram: {
      reply: `«Дауыс беру» немесе «Telegram Premium сыйлығы» арқылы аккаунтты ұрлау схемасы фишингке негізделген. Бөгде сайттарға растау кодын енгізбеңіз!`,
    },
    general: {
      reply: `Сәлеметсіз бе! Мен CyberDesk киберқауіпсіздік кеңесшісімін. Kaspi, eGov, Telegram алаяқтық схемалары, XP жинау немесе платформа қателері бойынша көмектесуге дайынмын. Сұрағыңызды қойыңыз!`,
    },
  },
  en: {
    bug: (id) => ({
      reply: `Recorded! Issue logged under ticket #${id}. If a scenario freezes, click "Try Again" or refresh the page.`,
      badge: `#${id}`,
    }),
    xp: {
      reply: `Experience points (+100..+120 XP) are awarded for correct defensive choices in attack simulations. Gems (💎) are earned upon stage completion and daily streaks, usable in the Rewards Shop for streak freezes.`,
    },
    mobile: {
      reply: `CyberDesk is fully responsive. To test on mobile devices, connect to the same local Wi-Fi and open the host IP (e.g., http://192.168.10.12:3000) or toggle the phone frame in the header bar.`,
    },
    idea: (id) => ({
      reply: `Thank you for contributing! Your scenario proposal has been recorded into the backlog under ticket #${id}.`,
      badge: `#${id}`,
    }),
    kaspi: {
      reply: `Critical banking rule: Official security teams never ask for SMS OTPs, card CVV, or remote screen-sharing to cancel fraudulent loans. Verify directly via the official mobile banking app.`,
    },
    egov: {
      reply: `Government portal eGov.kz and contact center 1414 never initiate WhatsApp chats to cancel digital signature requests. Never disclose 1414 SMS codes to third parties.`,
    },
    telegram: {
      reply: `Telegram phishing links disguised as contests or free premium gifts steal session authorizations. Never input authentication codes on third-party domains.`,
    },
    general: {
      reply: `Hello! I am the CyberDesk cybersecurity assistant. I can answer questions regarding Kazakhstan-specific attack patterns (Kaspi, eGov, Telegram), XP mechanics, or log technical issues. How can I help?`,
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body: SupportRequestBody = await req.json().catch(() => ({}));
    const message = body.message?.trim() || "";
    const language: "ru" | "kz" | "en" = body.language || "ru";

    if (!message) {
      return NextResponse.json({
        reply: KNOWLEDGE_RESPONSES[language].general.reply,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemPrompt = `You are CyberDesk AI Support Assistant.
Respond concisely, helpfully, and empathetically in ${
          language === "kz" ? "Kazakh" : language === "en" ? "English" : "Russian"
        }.
Focus on cybersecurity hygiene, protection against phishing/banking scams in Kazakhstan (Kaspi, eGov 1414, Telegram theft), platform navigation, and resolving user issues. Keep replies under 3-4 sentences.`;

        const result = await model.generateContent({
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] },
          ],
        });

        const text = result.response.text();
        if (text && text.trim().length > 0) {
          return NextResponse.json({ reply: text.trim() });
        }
      } catch {
        // Fallback to internal knowledge engine
      }
    }

    const lower = message.toLowerCase();
    const localized = KNOWLEDGE_RESPONSES[language] || KNOWLEDGE_RESPONSES.ru;

    if (
      lower.includes("баг") ||
      lower.includes("ошибк") ||
      lower.includes("қате") ||
      lower.includes("bug") ||
      lower.includes("error") ||
      lower.includes("issue")
    ) {
      const ticketId = `BUG-${Math.floor(1000 + Math.random() * 9000)}`;
      const res = localized.bug(ticketId);
      return NextResponse.json({ reply: res.reply, badge: res.badge });
    }

    if (
      lower.includes("кристалл") ||
      lower.includes("xp") ||
      lower.includes("опыт") ||
      lower.includes("тәжірибе") ||
      lower.includes("gem")
    ) {
      return NextResponse.json({ reply: localized.xp.reply });
    }

    if (
      lower.includes("телефон") ||
      lower.includes("мобильн") ||
      lower.includes("смартфон") ||
      lower.includes("phone") ||
      lower.includes("mobile")
    ) {
      return NextResponse.json({ reply: localized.mobile.reply });
    }

    if (
      lower.includes("идея") ||
      lower.includes("сценар") ||
      lower.includes("ұсыныс") ||
      lower.includes("idea") ||
      lower.includes("suggest")
    ) {
      const reqId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      const res = localized.idea(reqId);
      return NextResponse.json({ reply: res.reply, badge: res.badge });
    }

    if (lower.includes("kaspi") || lower.includes("каспи") || lower.includes("банк") || lower.includes("bank")) {
      return NextResponse.json({ reply: localized.kaspi.reply });
    }

    if (lower.includes("egov") || lower.includes("1414") || lower.includes("эцп") || lower.includes("құжат")) {
      return NextResponse.json({ reply: localized.egov.reply });
    }

    if (lower.includes("telegram") || lower.includes("телеграм") || lower.includes("тг") || lower.includes("голосован")) {
      return NextResponse.json({ reply: localized.telegram.reply });
    }

    return NextResponse.json({ reply: localized.general.reply });
  } catch {
    return NextResponse.json(
      { reply: "Сервис временно недоступен. Попробуйте снова через минуту." },
      { status: 500 }
    );
  }
}
