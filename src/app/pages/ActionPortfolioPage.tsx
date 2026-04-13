import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Anchor, Rocket, Scale } from "lucide-react";

import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BenchmarkLegend } from "../components/action-portfolio/BenchmarkLegend";
import { PortfolioScatterPanel } from "../components/action-portfolio/PortfolioScatterPanel";
import { PORTFOLIO_DATA } from "../data/actionPortfolioSample";
import { cn } from "../components/ui/utils";

type PortfolioTab = "commitment" | "satisfaction" | "resignation";

const TABS: readonly {
  value: PortfolioTab;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { value: "commitment", label: "Commitment", Icon: Rocket },
  { value: "satisfaction", label: "Satisfaction", Icon: Scale },
  { value: "resignation", label: "Resignation", Icon: Anchor },
];

const tabTriggerClass =
  "relative overflow-hidden rounded-[10px] border border-transparent px-5 py-2.5 text-base font-medium transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-2 focus-visible:ring-[#015ea3]/40 focus-visible:ring-offset-2 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#0b446f] hover:data-[state=inactive]:bg-white/80 active:data-[state=inactive]:scale-[0.99]";

const TAB_ORDER: PortfolioTab[] = ["commitment", "satisfaction", "resignation"];

const chartSlideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 36 : dir < 0 ? -36 : 0,
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -36 : dir < 0 ? 36 : 0,
    filter: "blur(6px)",
  }),
};

export default function ActionPortfolioPage() {
  const [tab, setTab] = useState<PortfolioTab>("commitment");
  const [slideDir, setSlideDir] = useState(0);

  const handleTabChange = (v: string) => {
    const next = v as PortfolioTab;
    if (next === tab) return;
    const a = TAB_ORDER.indexOf(tab);
    const b = TAB_ORDER.indexOf(next);
    setSlideDir(b > a ? 1 : -1);
    setTab(next);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <Header />

      <main className="flex w-full flex-col items-center pt-20">
        <div className="flex w-full flex-col items-center gap-8 pb-20">
          <SectionWrapper className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-black">
                Fields of action: influence and benchmark
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-[#656565]">
                Each point is one of your fields of action. Left to right is how strongly it
                ties to the outcome. Up and down is how you compare to the benchmark group.
                Use the tabs to view commitment, satisfaction, or resignation.
              </p>
            </div>

            <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
              <TabsList
                className={cn(
                  "relative inline-flex h-auto w-full flex-wrap justify-start gap-1 rounded-[16px] border border-[#b9e2fe] bg-[#e0f0fe] p-1.5",
                  "md:w-fit",
                )}
              >
                {TABS.map(({ value, label, Icon }) => (
                  <TabsTrigger
                    key={value}
                    id={`portfolio-tab-${value}`}
                    value={value}
                    className={tabTriggerClass}
                  >
                    {tab === value ? (
                      <motion.div
                        layoutId="portfolio-tab-pill"
                        className="absolute inset-0 z-0 rounded-[10px] bg-[#015ea3] shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                          mass: 0.55,
                        }}
                        style={{ borderRadius: 10 }}
                      />
                    ) : null}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Icon className="size-5 shrink-0" strokeWidth={2} aria-hidden />
                      {label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div
                role="tabpanel"
                id={`portfolio-panel-${tab}`}
                aria-labelledby={`portfolio-tab-${tab}`}
                className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8"
              >
                <div className="min-w-0 flex-1 overflow-x-hidden overflow-y-visible">
                  <AnimatePresence mode="wait" initial={false} custom={slideDir}>
                    <motion.div
                      key={tab}
                      custom={slideDir}
                      variants={chartSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.42,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="will-change-[opacity,filter,transform]"
                    >
                      <PortfolioScatterPanel data={PORTFOLIO_DATA[tab]} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <BenchmarkLegend />
              </div>
            </Tabs>
          </SectionWrapper>
        </div>
      </main>
    </div>
  );
}
