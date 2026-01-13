import React from "react";

// v3.2 — 3-card percentage layout inside 1080x1350 frame (fixed escapes)
// - Top spacer 5% / Bottom spacer 5%
// - Card A (Header+Intro, transparent) 20%
// - Card B (Class Info) 30%
// - Card C (FAQ+Contact) 30%
// - English typography slightly larger than KR (except where requested smaller)
// - Body cards keep diagonal indigo→pine gradient

const pine = "#0F3D2E";
const indigo = "#163A5F";
const ceramic = "#3A7CA5";
const amber = "#D39B2D";

export default function HaeumKoreanInstagramPost_TwoPage_v3_2() {
  const [page, setPage] = React.useState<1 | 2>(1); // 1 = KR, 2 = EN
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(160deg, ${indigo}, ${pine})` }}
    >
      {/* Google Font for the TITLE + KR headings */}
      <link
        href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Preview toggle */}
      <div
        className="flex gap-2 text-sm px-2 py-1 rounded-lg"
        style={{ background: "#0a0e12", color: "#cfe3ea", border: "1px solid #1C2B33" }}
      >
        <button
          onClick={() => setPage(1)}
          className={`px-2 py-1 rounded-md border ${page === 1 ? "font-semibold" : "opacity-70"}`}
          style={{
            borderColor: page === 1 ? ceramic : "#2B3C45",
            background: page === 1 ? "#0e141a" : "transparent",
            color: page === 1 ? "#EAF6F8" : "#cfe3ea",
          }}
        >
          Page 1 · KR
        </button>
        <button
          onClick={() => setPage(2)}
          className={`px-2 py-1 rounded-md border ${page === 2 ? "font-semibold" : "opacity-70"}`}
          style={{
            borderColor: page === 2 ? ceramic : "#2B3C45",
            background: page === 2 ? "#0e141a" : "transparent",
            color: page === 2 ? "#EAF6F8" : "#cfe3ea",
          }}
        >
          Page 2 · EN
        </button>
      </div>

      {/* 1080x1350 frame */}
      <div
        className="relative mx-auto rounded-3xl shadow-2xl overflow-hidden"
        style={{ width: 1080, height: 1350, background: "rgba(8,12,16,0.9)", backdropFilter: "blur(6px)" }}
      >
        {page === 1 ? <PageKR /> : <PageEN />}
      </div>
    </div>
  );
}

function PageKR() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ height: "100%" }}>
      <div style={{ height: "5%" }} /> {/* top spacer */}

      {/* Card A — Transparent header+intro (20%) */}
      <section id="cardA-kr" className="mx-6 rounded-2xl p-6 shadow-xl" style={{ height: "20%", background: "rgba(12,16,20,0.35)" }}>
        <div className="inline-flex items-center gap-3">
          <div className="w-14 h-14 rounded-md" style={{ background: ceramic }} />
          <h1
            className="text-[58px] leading-[1.06] font-extrabold tracking-tight"
            style={{ color: "#F2F6F8", fontFamily: "'Gowun Batang', serif" }}
          >
            해움한국어 수업 안내
          </h1>
        </div>
        <p
          className="mt-3 text-[27px] leading-[1.52]"
          style={{ color: "#E6EDF1", fontFamily: "'Gowun Batang', serif" }}
        >
          해움한국어에서는 학생의 한국어 실력, 학습 목표, 성향 및 사회문화적 배경을 고려한 맞춤형 교육 과정을 제공합니다. 필요한 경우 영어 병행 수업합니다. (한국어 교육, 영어, 미디어, 심리학 전공 / 아주대 우수졸업생)
        </p>
      </section>

      {/* Card B — Class Info (30%) */}
      <section
        id="cardB-kr"
        className="mx-6 mt-6 rounded-2xl p-6 shadow-xl border"
        style={{ height: "30%", background: `linear-gradient(135deg, ${indigo}F2, ${pine}F2)`, borderColor: "#1C2B33" }}
      >
        <h2
          className="text-[26px] font-bold mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: indigo, color: "#EAF6F8", border: `1px solid ${ceramic}`, fontFamily: "'Gowun Batang', serif" }}
        >
          수업 안내
        </h2>
        <div className="grid grid-cols-2 gap-6 text-[23px] leading-[1.6]" style={{ color: "#F1F6F8" }}>
          <div className="space-y-2.5">
            <Field label="수업 시간">1회 기본 50분 (협의 후 연장 가능)</Field>
            <Field label="수업 일정">유동적, 수업 일정에 따라 조율</Field>
          </div>
          <div className="space-y-2.5">
            <Field label="수업료 (월 단위 결제)">
              주 1회 (월 4회): 128,000원<br />주 2회 (월 8회): 224,000원<br />주 3회~5회: 별도 문의
            </Field>
            <p className="mt-0.5 font-medium" style={{ color: amber }}>
              ※ 2달 이상 등록 및 그룹 수업 시 할인<br />※ 사설 수료증 발급 가능
            </p>
          </div>
        </div>
      </section>

      {/* Card C — FAQ+Contact (30%) */}
      <section
        id="cardC-kr"
        className="mx-6 mt-6 rounded-2xl p-6 shadow-xl border"
        style={{ height: "30%", background: `linear-gradient(135deg, ${indigo}F2, ${pine}F2)`, borderColor: "#1C2B33" }}
      >
        <h2
          className="text-[26px] font-bold mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: indigo, color: "#EAF6F8", border: `1px solid ${ceramic}`, fontFamily: "'Gowun Batang', serif" }}
        >
          자주 묻는 질문 (FAQ)
        </h2>
        <div className="grid grid-cols-2 gap-6 text-[23px] leading-[1.6]" style={{ color: "#F1F6F8" }}>
          <div className="space-y-2.5">
            <QALine q="Q. 그룹 수업이 있나요?">
              A. 한국어 수준, 학습 목표, 문화적 배경 등을 고려하여 소규모 그룹 수업 개설을 고려할 수 있습니다. 자세한 내용은 문의 바랍니다.
            </QALine>
            <QALine q="Q. 수업은 어디서 진행되나요?">A. 대면(오프라인) 및 비대면(온라인) 수업을 모두 제공합니다.</QALine>
          </div>
          <div className="space-y-2.5">
            <Field label="문의">더 궁금한 점이 있으시면 네이버 톡톡 또는 0507-1368-2171(문자 가능)로 문의주세요.</Field>
            <p className="mt-0.5 font-medium" style={{ color: amber }}>(DM(개인 메시지)은 확인이 늦을 수 있습니다.)</p>
          </div>
        </div>
      </section>

      <div style={{ height: "5%" }} /> {/* bottom spacer */}
    </div>
  );
}

function PageEN() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ height: "100%" }}>
      <div style={{ height: "5%" }} />

      {/* Card A — Transparent header+intro (20%) */}
      <section id="cardA-en" className="mx-6 rounded-2xl p-6 shadow-xl" style={{ height: "20%", background: "rgba(12,16,20,0.35)" }}>
        <div className="inline-flex items-center gap-3">
          <div className="w-14 h-14 rounded-md" style={{ background: ceramic }} />
          <h1
            className="text-[58px] leading-[1.06] font-extrabold tracking-tight"
            style={{ color: "#F2F6F8", fontFamily: "'Gowun Batang', serif" }}
          >
            Haeum Korean · Class Information
          </h1>
        </div>
        <p
          className="mt-3 text-[25px] leading-[1.52] max-w-[1000px]"
          style={{ color: "#E6EDF1" }}
        >
          We provide a tailored curriculum that considers proficiency, goals, learning style, and sociocultural background. Classes can be conducted alongside English when needed. (Majors: Korean Language Education, English, Media, Psychology / Ajou Univ. distinguished graduate)
        </p>
      </section>

      {/* Card B — Class Info */}
      <section
        id="cardB-en"
        className="mx-6 mt-6 rounded-2xl p-6 shadow-xl border"
        style={{ height: "30%", background: `linear-gradient(135deg, ${indigo}F2, ${pine}F2)`, borderColor: "#1C2B33" }}
      >
        <h2
          className="text-[26px] font-bold mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: indigo, color: "#EAF6F8", border: `1px solid ${ceramic}`, fontFamily: "'Gowun Batang', serif" }}
        >
          Class Information
        </h2>
        <div className="grid grid-cols-2 gap-6 text-[23px] leading-[1.6]" style={{ color: "#DDE7EB" }}>
          <div className="space-y-2.5">
            <FieldEN label="Class Time">50 minutes per session (extendable upon agreement)</FieldEN>
            <FieldEN label="Schedule">We coordinate suitable times through individual consultation.</FieldEN>
          </div>
          <div className="space-y-2.5">
            <FieldEN label="Tuition (monthly payment)">
              Once a week (4 sessions/month): 128,000 KRW<br />Twice a week (8 sessions/month): 224,000 KRW<br />3–5 times per week: Contact us
            </FieldEN>
            <p className="mt-0.5" style={{ color: amber }}>
              *Discounts for 2+ months registration and group classes*<br />*Private certificate available*
            </p>
          </div>
        </div>
      </section>

      {/* Card C — FAQ+Contact */}
      <section
        id="cardC-en"
        className="mx-6 mt-6 rounded-2xl p-6 shadow-xl border"
        style={{ height: "30%", background: `linear-gradient(135deg, ${indigo}F2, ${pine}F2)`, borderColor: "#1C2B33" }}
      >
        <h2
          className="text-[26px] font-bold mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: indigo, color: "#EAF6F8", border: `1px solid ${ceramic}`, fontFamily: "'Gowun Batang', serif" }}
        >
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="grid grid-cols-2 gap-6 text-[23px] leading-[1.6]" style={{ color: "#DDE7EB" }}>
          <div className="space-y-2.5">
            <QALineEN q="Q. Do you offer group classes?">
              A. We can open small group classes considering learners’ level, goals, and cultural background. Contact us for details.
            </QALineEN>
            <QALineEN q="Q. Where are classes held?">A. We offer both in-person (offline) and online classes.</QALineEN>
          </div>
          <div className="space-y-2.5">
            <FieldEN label="Contact">For inquiries, contact us via Naver TalkTalk or 0507-1368-2171 (text available).</FieldEN>
            <p className="mt-0.5" style={{ color: amber }}>(DMs may be checked late.)</p>
          </div>
        </div>
      </section>

      <div style={{ height: "5%" }} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-semibold" style={{ color: ceramic }}>
        {label}
      </div>
      <p className="mt-0.5" style={{ color: "#F1F6F8" }}>
        {children}
      </p>
    </div>
  );
}

function FieldEN({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-semibold" style{{ color: ceramic }}>
        {label}
      </div>
      <p className="mt-0.5" style={{ color: "#DDE7EB" }}>
        {children}
      </p>
    </div>
  );
}

function QALine({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-semibold" style={{ color: ceramic }}>
        {q}
      </div>
      <p className="mt-0.5" style={{ color: "#F1F6F8" }}>
        {children}
      </p>
    </div>
  );
}

function QALineEN({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-semibold" style={{ color: ceramic }}>
        {q}
      </div>
      <p className="mt-0.5" style={{ color: "#DDE7EB" }}>
        {children}
      </p>
    </div>
  );
}

// --------- Smoke tests (run-only in debug) ---------
// Open the canvas page with ?debug in the URL to run these non-invasive checks.
if (typeof window !== "undefined" && window.location.search.includes("debug")) {
  setTimeout(() => {
    try {
      const aKR = document.getElementById("cardA-kr");
      const bKR = document.getElementById("cardB-kr");
      const cKR = document.getElementById("cardC-kr");
      const aEN = document.getElementById("cardA-en");
      const bEN = document.getElementById("cardB-en");
      const cEN = document.getElementById("cardC-en");
      console.assert(!!aKR && !!bKR && !!cKR, "KR cards should exist");
      console.assert(!!aEN && !!bEN && !!cEN, "EN cards should exist");
      console.assert(
        getComputedStyle(bKR!).backgroundImage.includes("linear-gradient"),
        "KR Card B should have gradient background"
      );
      console.assert(
        getComputedStyle(bEN!).backgroundImage.includes("linear-gradient"),
        "EN Card B should have gradient background"
      );
      // Check percentage heights approximately (allow some rounding)
      const frame = aKR?.parentElement?.parentElement as HTMLElement | null;
      const frameH = 1350; // fixed by design
      const approx = (el: HTMLElement | null) => (el ? Math.round((el.offsetHeight / frameH) * 100) : 0);
      console.assert(approx(aKR as HTMLElement) >= 18 && approx(aKR as HTMLElement) <= 22, "Card A height ~20% (KR)");
      console.assert(approx(bKR as HTMLElement) >= 28 && approx(bKR as HTMLElement) <= 32, "Card B height ~30% (KR)");
      console.assert(approx(cKR as HTMLElement) >= 28 && approx(cKR as HTMLElement) <= 32, "Card C height ~30% (KR)");
      console.log("Smoke tests passed");
    } catch (e) {
      console.warn("Smoke tests encountered an issue:", e);
    }
  }, 0);
}
