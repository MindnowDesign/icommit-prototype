import React from "react";
import GB from "country-flag-icons/react/3x2/GB";
import DE from "country-flag-icons/react/3x2/DE";

import type { AppLocale } from "../i18n/LocaleContext";
import { useLocale } from "../i18n/LocaleContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "./ui/utils";

type FlagComponent = React.ComponentType<React.HTMLAttributes<HTMLSVGElement>>;

const OPTIONS: { value: AppLocale; label: string; Flag: FlagComponent }[] = [
  { value: "en", label: "English", Flag: GB },
  { value: "de", label: "Deutsch", Flag: DE },
];

const flagClassName = "h-5 w-auto shrink-0";

export type LanguageSelectVariant = "floating" | "header";

type LanguageSelectProps = {
  className?: string;
  /** `floating` = light card for page corner; `header` = white on blue bar */
  variant?: LanguageSelectVariant;
};

/**
 * Standard Radix select for EN / DE (locale via `LocaleProvider`).
 */
export function LanguageSelect({ className, variant = "floating" }: LanguageSelectProps) {
  const { locale, setLocale } = useLocale();

  const triggerStyles =
    variant === "header"
      ? cn(
          "h-10 w-[min(100%,8rem)] shrink-0 gap-2 rounded-lg border border-white/50 bg-white/15 px-3 text-base text-white shadow-none",
          "hover:bg-white/25 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/40",
          "data-[size=sm]:h-10",
          "text-white data-[placeholder]:text-white",
          "[&_[data-slot=select-value]]:text-white [&_[data-slot=select-value]]:opacity-100",
          "[&_svg]:text-white [&_svg]:opacity-100",
        )
      : cn(
          "h-11 min-h-11 w-[min(100%,9.5rem)] shrink-0 gap-2.5 rounded-xl border border-[#d8d8d8] bg-white px-3.5 text-base font-medium text-[#0b446f] shadow-md",
          "hover:border-[#b9e2fe] hover:bg-[#f8fcff] focus-visible:border-[#015ea3] focus-visible:ring-2 focus-visible:ring-[#015ea3]/25",
          "data-[size=sm]:!h-11 data-[size=sm]:min-h-11",
          "[&_[data-slot=select-value]]:text-[#0b446f]",
          "[&_svg]:text-[#0b446f]",
        );

  return (
    <Select value={locale} onValueChange={(v) => setLocale(v as AppLocale)}>
      <SelectTrigger
        size="sm"
        aria-label="Language"
        className={cn(triggerStyles, className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[9.5rem]">
        {OPTIONS.map(({ value, label, Flag }) => (
          <SelectItem
            key={value}
            value={value}
            textValue={label}
            className="py-2 pl-2 text-base"
          >
            <span className="flex items-center gap-2.5">
              <Flag className={flagClassName} title="" aria-hidden />
              {label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
