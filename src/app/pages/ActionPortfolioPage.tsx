import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Anchor, Rocket, Scale } from "lucide-react";

import { getActionPortfolioCopy } from "../i18n/actionPortfolioCopy";
import { useLocale } from "../i18n/LocaleContext";
import { BenchmarkSelect } from "../components/action-portfolio/BenchmarkSelect";
import { PortfolioScatterPanel } from "../components/action-portfolio/PortfolioScatterPanel";
import {
  DEFAULT_BENCHMARK_ID,
  type BenchmarkOptionId,
} from "../data/benchmarkOptions";
import { PORTFOLIO_DATA } from "../data/actionPortfolioSample";
import { Header } from "../components/Header";
import { LanguageSelect } from "../components/LanguageSelect";
import { Label } from "../components/ui/label";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Switch } from "../components/ui/switch";
import { cn } from "../components/ui/utils";
import { HausStrengthMuscleIcon, HausWeaknessAlertIcon } from "../components/icons/HausRelativeIcons";

type Tab = "commitment" | "satisfaction" | "resignation";

const TAB_ORDER: Tab[] = ["commitment", "satisfaction", "resignation"];

function TabRelativeBadge({ tab }: { tab: Tab }) {
  if (tab === "commitment") {
    return (
      <span
        className="pointer-events-none absolute -right-[9px] -top-[9px] inline-flex size-6 items-center justify-center rounded-full border border-[#dbeafe] bg-white shadow-sm"
        aria-hidden
      >
        <HausWeaknessAlertIcon size={13} color="#A17C07" />
      </span>
    );
  }

  if (tab === "satisfaction") {
    return (
      <span
        className="pointer-events-none absolute -right-[9px] -top-[9px] inline-flex size-6 items-center justify-center rounded-full border border-[#dbeafe] bg-white shadow-sm"
        aria-hidden
      >
        <HausStrengthMuscleIcon size={13} color="#15803C" />
      </span>
    );
  }

  return null;
}

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : d < 0 ? -32 : 0, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -32 : d < 0 ? 32 : 0, filter: "blur(4px)" }),
};

export default function ActionPortfolioPage() {
  const { locale } = useLocale();
  const t = useMemo(() => getActionPortfolioCopy(locale), [locale]);

  const portfolioTabs = useMemo(
    () =>
      [
        { value: "commitment" as const, label: t.tabCommitment, Icon: Rocket },
        { value: "satisfaction" as const, label: t.tabSatisfaction, Icon: Scale },
        { value: "resignation" as const, label: t.tabResignation, Icon: Anchor },
      ] as const,
    [t],
  );

  const [tab, setTab] = useState<Tab>("commitment");
  const [dir, setDir] = useState(0);
  const [benchmarkId, setBenchmarkId] = useState<BenchmarkOptionId>(DEFAULT_BENCHMARK_ID);
  const [showAllLabels, setShowAllLabels] = useState(false);
  const [showPhase3Selected, setShowPhase3Selected] = useState(true);

  function handleTabChange(next: Tab) {
    if (next === tab) return;
    setDir(TAB_ORDER.indexOf(next) > TAB_ORDER.indexOf(tab) ? 1 : -1);
    setTab(next);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <Header />
      <main className="flex w-full flex-col items-center pt-20">
        <div className="flex w-full flex-col items-center gap-8 pb-20">
          <SectionWrapper className="flex w-full flex-col gap-10">

            {/* Page header */}
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-black">
                {t.pageTitle}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-[#656565]">{t.pageIntro}</p>
            </div>

            <div className="flex w-full flex-col gap-6">

              {/* ── Chart filters (single horizontal toolbar) ─────────── */}
              <div className="rounded-xl border border-gray-200 bg-white outline-none focus-visible:outline-none">
                <div
                  className={cn(
                    "flex w-full min-w-0 flex-wrap items-center gap-x-5 gap-y-3 px-3 py-2.5 sm:gap-x-10 sm:gap-y-3 sm:px-4 sm:py-3",
                    "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                    /* No focus ring/outline inside filter bar (state shown via pressed styles / switch) */
                    "[&_button]:outline-none [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-0 [&_button]:focus-visible:ring-offset-0",
                    "[&_[data-slot=switch]]:outline-none [&_[data-slot=switch]]:focus-visible:ring-0 [&_[data-slot=switch]]:focus-visible:ring-offset-0",
                  )}
                >
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="text-sm leading-none text-[#64748b]">{t.portfolioToolbar}</span>
                    <div
                      role="group"
                      aria-label={t.portfolioTabsAria}
                      className="flex min-h-[40px] items-center gap-3 rounded-lg border border-[#e0f0fe] bg-[#f0f8ff] p-2"
                    >
                      {portfolioTabs.map(({ value, label, Icon }) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={tab === value}
                          onClick={() => handleTabChange(value)}
                          className={cn(
                            "relative flex h-full min-h-[38px] items-center gap-2 rounded-md border border-transparent px-3.5 py-1.5 text-[15px] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-0 sm:px-4",
                            tab === value
                              ? "bg-[#015ea3] text-white"
                              : "text-[#0b446f] hover:bg-white/80",
                          )}
                        >
                          <TabRelativeBadge tab={value} />
                          <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <span className="hidden h-5 w-px shrink-0 bg-gray-200 sm:block" aria-hidden />

                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="text-sm leading-none text-[#64748b]">{t.benchmarkLabel}</span>
                    <BenchmarkSelect
                      value={benchmarkId}
                      onValueChange={setBenchmarkId}
                      className="max-w-[min(100vw-10rem,240px)] min-w-[100px] focus-visible:!ring-0 sm:max-w-[260px]"
                    />
                  </div>

                  <span className="hidden h-5 w-px shrink-0 bg-gray-200 sm:block" aria-hidden />

                  <div className="flex shrink-0 flex-col gap-2">
                    <Label
                      htmlFor="sw-phase3"
                      className="cursor-pointer text-sm leading-none font-normal text-[#64748b]"
                    >
                      {t.showPhase3Selected}
                    </Label>
                    <Switch
                      id="sw-phase3"
                      size="lg"
                      checked={showPhase3Selected}
                      onCheckedChange={setShowPhase3Selected}
                      className="data-[state=checked]:bg-[#015ea3] focus-visible:!ring-0 focus-visible:!ring-offset-0"
                    />
                  </div>

                  <span className="hidden h-5 w-px shrink-0 bg-gray-200 sm:block" aria-hidden />

                  <div className="flex shrink-0 flex-col gap-2">
                    <Label
                      htmlFor="sw-labels"
                      className="cursor-pointer text-sm leading-none font-normal text-[#64748b]"
                    >
                      {t.showLabels}
                    </Label>
                    <Switch
                      id="sw-labels"
                      size="lg"
                      checked={showAllLabels}
                      onCheckedChange={setShowAllLabels}
                      className="data-[state=checked]:bg-[#015ea3] focus-visible:!ring-0 focus-visible:!ring-offset-0"
                    />
                  </div>
                </div>
              </div>

              {/* ── Chart (legend = in-chart overlay, see PortfolioScatterPanel) ── */}
              <div className="min-w-0 w-full overflow-x-hidden overflow-y-visible">
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                  <motion.div
                    key={tab}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="will-change-[opacity,filter,transform]"
                  >
                    <PortfolioScatterPanel
                      data={PORTFOLIO_DATA[tab]}
                      showAllLabels={showAllLabels}
                      showPhase3Selected={showPhase3Selected}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </SectionWrapper>
        </div>
      </main>

      <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
        <LanguageSelect variant="floating" />
      </div>
    </div>
  );
}
