import svgPaths from "./svg-xdf4pnzwi6";
import imgImage from "../assets/fff264f6c39fb62af3d2bc43cb1af2321e7a47e9.png";
import imgScreenshot20250514Alle1403221 from "../assets/56863f19d0fd14674439cb765c4c11414d62c04b.png";
import imgScreenshot20250513Alle0904203 from "../assets/165b1264e418770ea69c27a11a1d4c5b7f56d101.png";

function ChevronIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function DeepDiveTopic() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative rounded-[10px] shrink-0" data-name="Deep Dive Topic">
      <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3b3b3b] text-[18px] text-nowrap">Production B team</p>
      <ChevronIcon />
    </div>
  );
}

function ViewingContainer() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Viewing Container">
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#525252] text-[18px] text-nowrap">Du siehst hier</p>
      <DeepDiveTopic />
    </div>
  );
}

function UserGreeting() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="User Greeting">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[32px] text-black w-full">Hello, Hanna 👋</p>
      <ViewingContainer />
    </div>
  );
}

function Lightbulb() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="lightbulb">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="lightbulb">
          <path d={svgPaths.p1ad37680} id="Vector" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Questions() {
  return (
    <div className="bg-[#e0f0fe] content-stretch flex gap-[8px] items-start justify-end px-[16px] py-[12px] relative rounded-[10px] shrink-0" data-name="Questions">
      <div aria-hidden="true" className="absolute border-[#b9e2fe] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[1.6] not-italic relative shrink-0 text-[#015ea3] text-[14px] text-nowrap underline">Restart dashboard tour</p>
      <Lightbulb />
    </div>
  );
}

function WorkspaceContainer() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative rounded-[10px] shrink-0" data-name="Workspace Container">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#464646] text-[16px] text-nowrap">AlpinaVista AG</p>
      <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImage} />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Questions />
      <WorkspaceContainer />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <UserGreeting />
      <Frame14 />
    </div>
  );
}

function Lightbulb1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="lightbulb">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="lightbulb">
          <path d={svgPaths.p1ad37680} id="Vector" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#b9e2fe] content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0">
      <div aria-hidden="true" className="absolute border-[#b9e2fe] border-[1.25px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Lightbulb1 />
    </div>
  );
}

function TextContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[5.403px] items-start not-italic relative shrink-0 text-nowrap w-full" data-name="Text Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[20px] text-black">Wo stehe ich im Prozess?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#525252] text-[16px]">Wichtige Meilensteine und unsere Empfehlungen der Experten und Expertinnen von icommit.</p>
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[16.21px] items-start relative shrink-0 w-full" data-name="Header Container">
      <Frame />
      <TextContainer />
    </div>
  );
}

function Track() {
  return <div className="absolute bg-[#015ea3] h-[5px] left-0 right-[78.06%] rounded-br-[5.403px] rounded-tr-[5.403px] top-[-0.48px]" data-name="Track" />;
}

function Progress() {
  return (
    <div className="absolute bg-[#efefef] h-[6px] left-[0.39px] overflow-clip rounded-[6753.64px] top-[5.23px] w-[1290px]" data-name="Progress">
      <Track />
    </div>
  );
}

function Radio() {
  return <div className="[grid-area:1_/_1] bg-white border-[#015ea3] border-[1.216px] border-solid ml-0 mt-0 rounded-[12156.6px] size-[19.452px]" data-name="Radio" />;
}

function Radio1() {
  return <div className="[grid-area:1_/_1] bg-[#015ea3] border-[1.216px] border-solid border-white ml-[4.05px] mt-[4.05px] rounded-[12156.6px] size-[11.347px]" data-name="Radio" />;
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Radio />
      <Radio1 />
    </div>
  );
}

function InfluencingFactorsSubitemText() {
  return (
    <div className="bg-[#efefef] content-stretch flex items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Influencing Factors Subitem Text">
      <p className="font-['Source_Sans_Pro:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Phase 1</p>
    </div>
  );
}

function PhaseContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Phase Container">
      <Group />
      <InfluencingFactorsSubitemText />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[3.242px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[#292929] text-[14px] text-nowrap">Onboarding starten</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#525252] text-[12px] w-[min-content]">Get set up and begin your journey with icommit.</p>
    </div>
  );
}

function RotateCcw() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="rotate-ccw">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="rotate-ccw">
          <path d={svgPaths.pc67f500} id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#bdbdbd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#292929] text-[14px] text-nowrap">
        <p className="leading-[normal]">Restart onboarding</p>
      </div>
      <RotateCcw />
    </div>
  );
}

function Column() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Column">
      <PhaseContainer />
      <Frame2 />
      <Button />
    </div>
  );
}

function Radio2() {
  return <div className="[grid-area:1_/_1] bg-white border-[#015ea3] border-[1.216px] border-solid ml-0 mt-0 rounded-[12156.6px] size-[19.452px]" data-name="Radio" />;
}

function Radio3() {
  return <div className="[grid-area:1_/_1] bg-[#015ea3] border-[1.216px] border-solid border-white ml-[4.05px] mt-[4.05px] rounded-[12156.6px] size-[11.347px]" data-name="Radio" />;
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Radio2 />
      <Radio3 />
    </div>
  );
}

function InfluencingFactorsSubitemText1() {
  return (
    <div className="bg-[#b9e2fe] content-stretch flex items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Influencing Factors Subitem Text">
      <p className="font-['Source_Sans_Pro:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b446f] text-[12px] text-nowrap">Phase 2</p>
    </div>
  );
}

function PhaseHeaderContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Phase Header Container">
      <Group1 />
      <InfluencingFactorsSubitemText1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[3.242px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[#292929] text-[14px] text-nowrap">Analyse data</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#525252] text-[12px] w-[min-content]">View your survey results and key insights.</p>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-up-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-up-right">
          <path d={svgPaths.p3dc64a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#015ea3] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
        <p className="leading-[normal]">Open results</p>
      </div>
      <ArrowUpRight />
    </div>
  );
}

function PhaseContainer1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Phase Container">
      <PhaseHeaderContainer />
      <Frame1 />
      <Button1 />
    </div>
  );
}

function Radio4() {
  return (
    <div className="bg-white relative rounded-[12156.6px] shrink-0 size-[19.452px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border-[#015ea3] border-[1.216px] border-solid inset-0 pointer-events-none rounded-[12156.6px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2113c380} id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText2() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Influencing Factors Subitem Text">
      <p className="font-['Source_Sans_Pro:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Phase 3</p>
      <Icon />
    </div>
  );
}

function PhaseHeaderContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Phase Header Container">
      <Radio4 />
      <InfluencingFactorsSubitemText2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[3.242px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[#292929] text-[14px] text-nowrap">Define focus areas</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#525252] text-[12px] w-[min-content]">Discover where to focus your next actions.</p>
    </div>
  );
}

function ArrowUpRight1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-up-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-up-right">
          <path d={svgPaths.p3dc64a80} id="Vector" stroke="var(--stroke-0, #989898)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#989898] text-[14px] text-nowrap">
        <p className="leading-[normal]">Open fields of action</p>
      </div>
      <ArrowUpRight1 />
    </div>
  );
}

function PhaseContainer2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Phase Container">
      <PhaseHeaderContainer1 />
      <Frame3 />
      <Button2 />
    </div>
  );
}

function Radio5() {
  return (
    <div className="bg-white relative rounded-[12156.6px] shrink-0 size-[19.452px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border-[#015ea3] border-[1.216px] border-solid inset-0 pointer-events-none rounded-[12156.6px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2113c380} id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText3() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Influencing Factors Subitem Text">
      <p className="font-['Source_Sans_Pro:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Phase 4</p>
      <Icon1 />
    </div>
  );
}

function PhaseHeaderContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Phase Header Container">
      <Radio5 />
      <InfluencingFactorsSubitemText3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[3.242px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[#292929] text-[14px] text-nowrap">Discuss with your team</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#525252] text-[12px] w-[min-content]">Share and align on next steps together.</p>
    </div>
  );
}

function ArrowUpRight2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-up-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-up-right">
          <path d={svgPaths.p3dc64a80} id="Vector" stroke="var(--stroke-0, #989898)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#989898] text-[14px] text-nowrap">
        <p className="leading-[normal]">Open proposals</p>
      </div>
      <ArrowUpRight2 />
    </div>
  );
}

function PhaseContainer3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Phase Container">
      <PhaseHeaderContainer2 />
      <Frame4 />
      <Button3 />
    </div>
  );
}

function Radio6() {
  return (
    <div className="bg-white relative rounded-[12156.6px] shrink-0 size-[19.452px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border-[#015ea3] border-[1.216px] border-solid inset-0 pointer-events-none rounded-[12156.6px]" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2113c380} id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText4() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Influencing Factors Subitem Text">
      <p className="font-['Source_Sans_Pro:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Phase 5</p>
      <Icon2 />
    </div>
  );
}

function PhaseHeaderContainer3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Phase Header Container">
      <Radio6 />
      <InfluencingFactorsSubitemText4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[3.242px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[#292929] text-[14px] text-nowrap">Set clear goals</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#525252] text-[12px] w-[min-content]">Turn insights into actionable steps for your team.</p>
    </div>
  );
}

function ArrowUpRight3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-up-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-up-right">
          <path d={svgPaths.p3dc64a80} id="Vector" stroke="var(--stroke-0, #989898)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#989898] text-[14px] text-nowrap">
        <p className="leading-[normal]">Open measures</p>
      </div>
      <ArrowUpRight3 />
    </div>
  );
}

function PhaseContainer4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Phase Container">
      <PhaseHeaderContainer3 />
      <Frame5 />
      <Button4 />
    </div>
  );
}

function Radio7() {
  return (
    <div className="bg-white relative rounded-[12156.6px] shrink-0 size-[19.452px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border-[#015ea3] border-[1.216px] border-solid inset-0 pointer-events-none rounded-[12156.6px]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2113c380} id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText5() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Influencing Factors Subitem Text">
      <p className="font-['Source_Sans_Pro:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Phase 6</p>
      <Icon3 />
    </div>
  );
}

function PhaseContainer5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Phase Container">
      <Radio7 />
      <InfluencingFactorsSubitemText5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[3.242px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[#292929] text-[14px] text-nowrap">Check your team pulse</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#525252] text-[12px] w-[min-content]">Check progress and measure improvements over time.</p>
    </div>
  );
}

function ArrowUpRight4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-up-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-up-right">
          <path d={svgPaths.p3dc64a80} id="Vector" stroke="var(--stroke-0, #989898)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#989898] text-[14px] text-nowrap">
        <p className="leading-[normal]">Open pulse</p>
      </div>
      <ArrowUpRight4 />
    </div>
  );
}

function Column1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Column">
      <PhaseContainer5 />
      <Frame6 />
      <Button5 />
    </div>
  );
}

function Flex() {
  return (
    <div className="content-stretch flex gap-[32.421px] items-start relative shrink-0 w-full" data-name="Flex">
      <Progress />
      <Column />
      <PhaseContainer1 />
      <PhaseContainer2 />
      <PhaseContainer3 />
      <PhaseContainer4 />
      <Column1 />
    </div>
  );
}

function ArcticonsEmojiCompass() {
  return (
    <div className="relative size-[187px]" data-name="arcticons:emoji-compass">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 187 187">
        <g id="arcticons:emoji-compass" opacity="0.3">
          <path d={svgPaths.p25e91c40} id="Vector" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.739214" />
          <g id="Vector_2">
            <path d={svgPaths.p27237c80} fill="var(--fill-0, #015EA3)" />
            <path d={svgPaths.p27237c80} stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.739214" />
          </g>
          <path d={svgPaths.p1bfb1e80} id="Vector_3" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.739214" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[27.017px] items-start relative shrink-0 w-full" data-name="Content Container">
      <HeaderContainer />
      <Flex />
      <div className="absolute flex items-center justify-center left-[1169.39px] size-[187px] top-[-69.03px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <ArcticonsEmojiCompass />
        </div>
      </div>
    </div>
  );
}

function CommitmentCompass() {
  return (
    <div className="bg-white relative rounded-[16.21px] shrink-0 w-full" data-name="Commitment Compass">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[21.614px] relative w-full">
          <ContentContainer />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9e2fe] border-[0.675px] border-solid inset-0 pointer-events-none rounded-[16.21px]" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame15 />
      <CommitmentCompass />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[625px] size-[20px] top-[-11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_2007)" id="Icon">
          <path d={svgPaths.p2a852000} id="Vector" stroke="var(--stroke-0, #989898)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_2007">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CalendarIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Calendar Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar Icon">
          <path d={svgPaths.p29e7ce80} id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function ChevronIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #292929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function DeepDiveTopic1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative rounded-[10px] shrink-0" data-name="Deep Dive Topic">
      <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <CalendarIcon />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#3b3b3b] text-[16px] text-nowrap">
        <span>{`Compared to `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold">121 Schweizer Firmen</span>
      </p>
      <ChevronIcon1 />
    </div>
  );
}

function HeaderContainer1() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-between relative shrink-0 w-full" data-name="Header Container">
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-nowrap">{`Where’s your team in the Commitment House? `}</p>
      <Icon4 />
      <DeepDiveTopic1 />
    </div>
  );
}

function TopSectionContainer() {
  return (
    <div className="h-[102.002px] relative shrink-0 w-full" data-name="Top Section Container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1040 102">
        <g id="Top Section Container">
          <path d={svgPaths.p26cd0100} fill="url(#paint0_linear_1_2025)" id="Top Section Icon" />
          <path d={svgPaths.p365de100} fill="url(#paint1_linear_1_2025)" id="Polygon 1" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_2025" x1="753.73" x2="753.73" y1="-38.1633" y2="72.8571">
            <stop stopColor="#DCDCDC" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_2025" x1="520" x2="520" y1="-37.1457" y2="102">
            <stop stopColor="#DCDCDC" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1992)" id="Icon">
          <path d={svgPaths.p327b7480} id="Vector" stroke="var(--stroke-0, #C51010)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.15789" />
        </g>
        <defs>
          <clipPath id="clip0_1_1992">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[#ffe0e0] relative rounded-[12px] shrink-0 size-[48px]" data-name="Icon Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-0 py-[25.105px] relative size-full">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function TitleContainer() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[2px] items-start not-italic relative shrink-0 w-[573.725px]" data-name="Title Container">
      <p className="leading-[normal] relative shrink-0 text-[#292929] text-[20px] w-full">Commitment</p>
      <p className="leading-[1.6] relative shrink-0 text-[#989898] text-[16px] w-full">What can we achieve together?</p>
    </div>
  );
}

function InfluencingFactorsIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Influencing Factors Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Influencing Factors Icon">
          <g id="Vector">
            <path d="M10 3.33333H6Z" fill="var(--fill-0, #FF6767)" />
            <path d={svgPaths.p1b1bee80} fill="var(--fill-0, #FF6767)" />
            <path d={svgPaths.p3133d780} stroke="var(--stroke-0, #FF6767)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsHeader() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Influencing Factors Header">
      <InfluencingFactorsIcon />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">{`Areas that are keeping Commitment low `}</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32def600} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText6() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon6 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Digitalization</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_1986)" id="Icon">
          <path d={svgPaths.p1df93880} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_1986">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText7() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon7 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Work and leisure</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3f387500} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText8() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon8 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Kundenorientierung</p>
    </div>
  );
}

function InfluencingFactorsList() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0" data-name="Influencing Factors List">
      <InfluencingFactorsSubitemText6 />
      <InfluencingFactorsSubitemText7 />
      <InfluencingFactorsSubitemText8 />
    </div>
  );
}

function InfluencingFactorsContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Influencing Factors Container">
      <InfluencingFactorsHeader />
      <InfluencingFactorsList />
    </div>
  );
}

function ContentContainer2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content Container">
      <TitleContainer />
      <InfluencingFactorsContainer />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white content-stretch flex gap-[24px] items-start p-[24px] relative rounded-[24px] shrink-0 w-[976px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <IconContainer />
      <ContentContainer2 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[400px] size-[16px] top-[115px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2049)" id="Icon">
          <path d={svgPaths.p255c9380} id="Vector" stroke="var(--stroke-0, #656565)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_2049">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p8185e00} id="Vector" stroke="var(--stroke-0, #15803C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="bg-[#dcfce8] relative rounded-[12px] shrink-0 size-[48px]" data-name="Icon Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-0 py-[25.105px] relative size-full">
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function TitleContainer1() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[2px] items-start not-italic relative shrink-0 w-[573.725px]" data-name="Title Container">
      <p className="leading-[normal] relative shrink-0 text-[#292929] text-[20px] w-full">Satisfaction</p>
      <p className="leading-[1.6] relative shrink-0 text-[#989898] text-[16px] w-full">What will I gain? Do I fit in here?</p>
    </div>
  );
}

function InfluencingFactorsIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Influencing Factors Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Influencing Factors Icon">
          <path d={svgPaths.p25294080} fill="var(--fill-0, #4ADE80)" id="Vector" stroke="var(--stroke-0, #4ADE80)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsHeader1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Influencing Factors Header">
      <InfluencingFactorsIcon1 />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">{`Areas that are keeping high Satisfaction `}</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32def600} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText9() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon11 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Digitalization</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_1986)" id="Icon">
          <path d={svgPaths.p1df93880} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_1986">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText10() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon12 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Work and leisure</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3f387500} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText11() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon13 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Kundenorientierung</p>
    </div>
  );
}

function InfluencingFactorsList1() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0" data-name="Influencing Factors List">
      <InfluencingFactorsSubitemText9 />
      <InfluencingFactorsSubitemText10 />
      <InfluencingFactorsSubitemText11 />
    </div>
  );
}

function InfluencingFactorsContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Influencing Factors Container">
      <InfluencingFactorsHeader1 />
      <InfluencingFactorsList1 />
    </div>
  );
}

function ContentContainer3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content Container">
      <TitleContainer1 />
      <InfluencingFactorsContainer1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white content-stretch flex gap-[24px] items-start p-[24px] relative rounded-[24px] shrink-0 w-[976px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <IconContainer1 />
      <ContentContainer3 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[392px] size-[16px] top-[357px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2049)" id="Icon">
          <path d={svgPaths.p255c9380} id="Vector" stroke="var(--stroke-0, #656565)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_2049">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_2013)" id="Icon">
          <path d={svgPaths.p2b811600} id="Vector" stroke="var(--stroke-0, #656565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.15789" />
        </g>
        <defs>
          <clipPath id="clip0_1_2013">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconContainer2() {
  return (
    <div className="bg-[#efefef] relative rounded-[12px] shrink-0 size-[48px]" data-name="Icon Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-0 py-[25.105px] relative size-full">
          <Icon15 />
        </div>
      </div>
    </div>
  );
}

function TitleContainer2() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[2px] items-start not-italic relative shrink-0 w-[573.725px]" data-name="Title Container">
      <p className="leading-[normal] relative shrink-0 text-[#292929] text-[20px] w-full">Resignation</p>
      <p className="leading-[1.6] relative shrink-0 text-[#989898] text-[16px] w-full">Why am I even here?</p>
    </div>
  );
}

function InfluencingFactorsIcon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Influencing Factors Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Influencing Factors Icon">
          <path d={svgPaths.p29bf1ac0} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsHeader2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Influencing Factors Header">
      <InfluencingFactorsIcon2 />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">Areas that can decrease Resignation levels</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32def600} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText12() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon16 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Digitalization</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_1986)" id="Icon">
          <path d={svgPaths.p1df93880} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_1986">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText13() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon17 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Work and leisure</p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3f387500} id="Vector" stroke="var(--stroke-0, #3D3D3D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function InfluencingFactorsSubitemText14() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center px-[10px] py-[6px] relative rounded-[10px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon18 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3d3d3d] text-[12px] text-nowrap">Kundenorientierung</p>
    </div>
  );
}

function InfluencingFactorsList2() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0" data-name="Influencing Factors List">
      <InfluencingFactorsSubitemText12 />
      <InfluencingFactorsSubitemText13 />
      <InfluencingFactorsSubitemText14 />
    </div>
  );
}

function InfluencingFactorsContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Influencing Factors Container">
      <InfluencingFactorsHeader2 />
      <InfluencingFactorsList2 />
    </div>
  );
}

function ContentContainer4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content Container">
      <TitleContainer2 />
      <InfluencingFactorsContainer2 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white content-stretch flex gap-[24px] items-start p-[24px] relative rounded-[24px] shrink-0 w-[976px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <IconContainer2 />
      <ContentContainer4 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-[413px] size-[16px] top-[595px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2049)" id="Icon">
          <path d={svgPaths.p255c9380} id="Vector" stroke="var(--stroke-0, #656565)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_2049">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p1b5b9d00} id="Vector" stroke="var(--stroke-0, #A17C07)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FocusMarker1() {
  return (
    <div className="absolute bg-[#fef0c3] content-stretch flex gap-[8px] items-center px-[12px] py-[6px] right-[24px] rounded-[12px] top-[-20.55px]" data-name="Focus Marker-02">
      <Icon20 />
      <p className="font-['Source_Sans_Pro:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#a17c07] text-[16px] text-nowrap">Top weakness</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p10ada780} fill="var(--fill-0, #1DE4D3)" id="Vector" />
          <path d={svgPaths.p2b9f4d00} fill="var(--fill-0, #05807B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function FocusMarker() {
  return (
    <div className="absolute bg-[#c7fff6] content-stretch flex gap-[8px] items-center px-[12px] py-[6px] right-[24px] rounded-[12px] top-[210.45px]" data-name="Focus Marker-02">
      <Icon21 />
      <p className="font-['Source_Sans_Pro:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#0a6562] text-[16px] text-nowrap">Top strength</p>
    </div>
  );
}

function CardsContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[976px]" data-name="Cards Container">
      <Card />
      <Icon9 />
      <Card1 />
      <Icon14 />
      <Card2 />
      <Icon19 />
      <FocusMarker1 />
      <FocusMarker />
    </div>
  );
}

function ContentContainer1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center justify-center relative shrink-0 w-[1040px]" data-name="Content Container">
      <TopSectionContainer />
      <CardsContainer />
      <div className="bg-gradient-to-t from-[#efefef] h-[64px] shrink-0 to-white w-full" data-name="Bottom Section Icon" />
    </div>
  );
}

function MainContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[61px] items-center relative shrink-0 w-full" data-name="Main Container">
      <HeaderContainer1 />
      <ContentContainer1 />
    </div>
  );
}

function InfluencingFactorsSubitemText15() {
  return (
    <div className="bg-[#b9e2fe] content-stretch flex items-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#b9e2fe] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b446f] text-[14px] text-nowrap">Phase 2</p>
    </div>
  );
}

function SaveAndShareHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-center relative shrink-0 w-full" data-name="Save and Share Header">
      <InfluencingFactorsSubitemText15 />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px]">Let’s look at results more in details</p>
    </div>
  );
}

function LineChart() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="line-chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="line-chart">
          <path d={svgPaths.pb4a5340} id="Vector" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer3() {
  return (
    <div className="bg-[#e0f0fe] content-stretch flex flex-col items-center justify-center px-0 py-[18.947px] relative rounded-[8px] shrink-0 size-[48px]" data-name="Icon Container">
      <LineChart />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[4px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="leading-[1.4] relative shrink-0 text-[18px] text-black text-nowrap">Confront results with other companies</p>
      <p className="leading-[1.5] min-w-full relative shrink-0 text-[#656565] text-[14px] tracking-[-0.14px] w-[min-content]">This is an interesting value to look at, and here’s a sharp sentence why.</p>
    </div>
  );
}

function SaveAndShareHeader1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Save and Share Header">
      <IconContainer3 />
      <Frame9 />
    </div>
  );
}

function Contrast() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="contrast">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="contrast">
          <g id="Vector">
            <path d={svgPaths.p10ada780} stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95" />
            <path d={svgPaths.p6a51200} stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconContainer4() {
  return (
    <div className="bg-[#e0f0fe] content-stretch flex flex-col items-center justify-center px-0 py-[18.947px] relative rounded-[8px] shrink-0 size-[48px]" data-name="Icon Container">
      <Contrast />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[4px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="leading-[1.4] relative shrink-0 text-[18px] text-black text-nowrap">Check response homogeneity</p>
      <p className="leading-[1.5] min-w-full relative shrink-0 text-[#656565] text-[14px] tracking-[-0.14px] w-[min-content]">This is an interesting value to look at, and here’s a sharp sentence why.</p>
    </div>
  );
}

function SaveAndShareHeader2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Save and Share Header">
      <IconContainer4 />
      <Frame10 />
    </div>
  );
}

function History() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="history">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="history">
          <path d={svgPaths.p2c7bae00} id="Vector" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer5() {
  return (
    <div className="bg-[#e0f0fe] content-stretch flex flex-col items-center justify-center px-0 py-[18.947px] relative rounded-[8px] shrink-0 size-[48px]" data-name="Icon Container">
      <History />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[4px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="leading-[1.4] relative shrink-0 text-[18px] text-black text-nowrap">Spot positive trends over the years</p>
      <p className="leading-[1.5] min-w-full relative shrink-0 text-[#656565] text-[14px] tracking-[-0.14px] w-[min-content]">This is an interesting value to look at, and here’s a sharp sentence why.</p>
    </div>
  );
}

function SaveAndShareHeader3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Save and Share Header">
      <IconContainer5 />
      <Frame8 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[64px] items-center px-[64px] py-0 relative w-full">
          <SaveAndShareHeader1 />
          <SaveAndShareHeader2 />
          <SaveAndShareHeader3 />
        </div>
      </div>
    </div>
  );
}

function SaveAndShare1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Save and Share">
      <Frame7 />
    </div>
  );
}

function ArrowUpRight5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-up-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-up-right">
          <path d={svgPaths.p3dc64a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#065186] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[32px] py-[14px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[normal]">See survey results</p>
      </div>
      <ArrowUpRight5 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Button6 />
    </div>
  );
}

function SaveAndShare() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Save and Share">
      <SaveAndShareHeader />
      <SaveAndShare1 />
      <Frame13 />
    </div>
  );
}

function InfluencingFactorsSubitemText16() {
  return (
    <div className="bg-[#b9e2fe] content-stretch flex items-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#b9e2fe] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b446f] text-[14px] text-nowrap">Phase 3</p>
    </div>
  );
}

function SaveAndShareHeader4() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-[892px]" data-name="Save and Share Header">
      <InfluencingFactorsSubitemText16 />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px]">Define the areas of action you want to focus on</p>
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#656565] text-[0px] text-[14px] tracking-[-0.14px] w-[min-content]">
        <span>{`We suggest to pick a maximum of `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold">2/3 areas</span>
        <span>{` to focus on in `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold">the next 6 month.</span>
      </p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p171e4600} id="Vector" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer6() {
  return (
    <div className="bg-[#e0f0fe] content-stretch flex flex-col items-center justify-center px-0 py-[16px] relative rounded-[10.667px] shrink-0 w-[64px]" data-name="Icon Container">
      <Icon22 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <IconContainer6 />
    </div>
  );
}

function SaveAndShareCardContent() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[12px] items-start not-italic relative shrink-0 w-full" data-name="Save and Share Card Content">
      <p className="leading-[1.4] relative shrink-0 text-[#18181b] text-[18px] text-center text-nowrap">Discuss where you can have the most impact with your team</p>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-[#7c7c7c] text-[14px] tracking-[-0.14px] w-[min-content]">
        <p className="leading-[1.5]">Download all the documentation to confidently prepare a discussion with your team about the most important areas of action.</p>
      </div>
    </div>
  );
}

function ArrowDownToLine() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-down-to-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-down-to-line">
          <path d={svgPaths.p193b7900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#065186] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[32px] py-[14px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[normal]">Download documentation</p>
      </div>
      <ArrowDownToLine />
    </div>
  );
}

function SaveAndShareCard() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-end justify-end relative shrink-0 w-full" data-name="Save and Share Card">
      <SaveAndShareCardContent />
      <Button7 />
    </div>
  );
}

function CardDashboard() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="Card/ Dashboard">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[16px] relative w-full">
        <Frame11 />
        <SaveAndShareCard />
      </div>
    </div>
  );
}

function SaveAndShareContent() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1312px]" data-name="Save and Share Content">
      <CardDashboard />
    </div>
  );
}

function SaveAndShare2() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start justify-center relative shrink-0 w-full" data-name="Save and Share">
      <SaveAndShareHeader4 />
      <SaveAndShareContent />
    </div>
  );
}

function InfluencingFactorsSubitemText17() {
  return (
    <div className="bg-[#b9e2fe] content-stretch flex items-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Influencing Factors Subitem Text">
      <div aria-hidden="true" className="absolute border border-[#b9e2fe] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b446f] text-[14px] text-nowrap">Phase 4</p>
    </div>
  );
}

function SaveAndShareHeader5() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-[892px]" data-name="Save and Share Header">
      <InfluencingFactorsSubitemText17 />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-black text-nowrap tracking-[-0.48px]">{`Define actionable steps towards specific goals `}</p>
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[#656565] text-[0px] text-[14px] tracking-[-0.14px] w-[min-content]">
        <span>{`Based on the areas of action,we need to `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold">define specific goals</span>
        <span>{` and how to implement them `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold">over time.</span>
      </p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p2c9bf2c0} id="Vector" stroke="var(--stroke-0, #015EA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer7() {
  return (
    <div className="bg-[#e0f0fe] content-stretch flex flex-col items-center justify-center px-0 py-[16px] relative rounded-[10.667px] shrink-0 w-[64px]" data-name="Icon Container">
      <Icon23 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <IconContainer7 />
    </div>
  );
}

function SaveAndShareCardContent1() {
  return (
    <div className="content-stretch flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] gap-[12px] items-start not-italic relative shrink-0 w-full" data-name="Save and Share Card Content">
      <p className="leading-[1.4] relative shrink-0 text-[#18181b] text-[18px] text-center text-nowrap">Discuss the measures and goals with your team</p>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-[#7c7c7c] text-[14px] tracking-[-0.14px] w-[min-content]">
        <p className="leading-[1.5]">Download all the documentation to confidently prepare a discussion with your team about next measures and goals</p>
      </div>
    </div>
  );
}

function ArrowDownToLine1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-down-to-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-down-to-line">
          <path d={svgPaths.p193b7900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#065186] content-stretch flex gap-[8px] items-center justify-center min-w-[80px] px-[32px] py-[14px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[normal]">Download documentation</p>
      </div>
      <ArrowDownToLine1 />
    </div>
  );
}

function SaveAndShareCard1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-end justify-end relative shrink-0 w-full" data-name="Save and Share Card">
      <SaveAndShareCardContent1 />
      <Button8 />
    </div>
  );
}

function CardDashboard1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[12px] shrink-0" data-name="Card/ Dashboard">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[16px] relative w-full">
        <Frame12 />
        <SaveAndShareCard1 />
      </div>
    </div>
  );
}

function SaveAndShareContent1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[1312px]" data-name="Save and Share Content">
      <CardDashboard1 />
    </div>
  );
}

function SaveAndShare3() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Save and Share">
      <SaveAndShareHeader5 />
      <SaveAndShareContent1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[128px] items-start left-[64px] top-[191px] w-[1314px]">
      <Frame16 />
      <MainContainer />
      <SaveAndShare />
      <SaveAndShare2 />
      <SaveAndShare3 />
    </div>
  );
}

function LogoAndTitle() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Logo and title">
      <div className="bg-[#d9d9d9] rounded-[16px] shrink-0 size-[46px]" data-name="Logo" />
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#525252] text-[24px] text-nowrap tracking-[-0.48px]">DIGITAL COMMITMENT TOOL</p>
    </div>
  );
}

function MenuIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Menu Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Menu Icon">
          <path d={svgPaths.p15dbed80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function UserIconContainer() {
  return (
    <div className="bg-[#00b2a9] content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[32px]" data-name="User icon container">
      <MenuIcon />
    </div>
  );
}

function UserInfo() {
  return (
    <div className="content-stretch flex gap-[11px] items-center relative shrink-0" data-name="User info">
      <p className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#525252] text-[18px] text-nowrap">user-email@gmail.ch</p>
      <UserIconContainer />
    </div>
  );
}

function HeaderContent() {
  return (
    <div className="content-stretch flex items-center justify-between px-0 py-[16px] relative shrink-0 w-full" data-name="Header content">
      <LogoAndTitle />
      <UserInfo />
    </div>
  );
}

function LayoutDashboard() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="layout-dashboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="layout-dashboard">
          <g id="Vector">
            <path d={svgPaths.p13b4cd00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p32939e80} fill="var(--fill-0, white)" />
            <path d={svgPaths.pdc9c900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p20de0972} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Navlink2() {
  return (
    <div className="absolute bg-[#00b2a9] content-stretch flex gap-[8px] h-[45px] items-center justify-center left-0 px-[14px] py-[8px] top-[-0.47px] w-[170px]" data-name="Navlink">
      <LayoutDashboard />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white">Dashboard</p>
    </div>
  );
}

function ResultsIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Results icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Results icon">
          <path d={svgPaths.p11918b00} id="Vector" stroke="var(--stroke-0, #00B2A9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95" />
        </g>
      </svg>
    </div>
  );
}

function Navlink3() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex gap-[8px] h-[46px] items-center justify-center left-[170px] px-[14px] py-[8px] top-[-0.47px] w-[123px]" data-name="Navlink">
      <ResultsIcon />
      <p className="font-['Source_Sans_Pro:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#00b2a9] text-[20px] text-nowrap">Results</p>
    </div>
  );
}

function Navlink1() {
  return (
    <div className="h-[45px] relative shrink-0 w-[811px]" data-name="Navlink">
      <div className="absolute h-[45px] left-[293px] top-0 w-[518px]" data-name="Screenshot 2025-05-14 alle 14.03.22 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.22%] left-0 max-w-none top-0 w-full" src={imgScreenshot20250514Alle1403221} />
        </div>
      </div>
      <Navlink2 />
      <Navlink3 />
    </div>
  );
}

function Navlink() {
  return (
    <div className="bg-[#00b2a9] content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Navlink">
      <Navlink1 />
      <div className="h-[45px] relative shrink-0 w-[87px]" data-name="Screenshot 2025-05-13 alle 09.04.20 3">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[3081.09%] left-[-1563.56%] max-w-none top-[-138.21%] w-[1663.94%]" src={imgScreenshot20250513Alle0904203} />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-1/2 top-0 translate-x-[-50%] w-[1312px]" data-name="Header">
      <HeaderContent />
      <Navlink />
    </div>
  );
}

export default function After() {
  return (
    <div className="bg-white relative size-full" data-name="After">
      <Frame17 />
      <Header />
    </div>
  );
}