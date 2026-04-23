import React, { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { cn } from "../components/ui/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { LoginIllustrationParallax } from "../components/LoginIllustrationParallax";
import iCommitLogo from "../../assets/logo/iCommit-logo.png";
import iCommitCommitmentLogo from "../../assets/logo/iCommit-Commitment_Logo.png";
import loginIllustration from "../../assets/Illustration-01.svg";

const LANGUAGES = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "it", label: "Italiano", flag: "🇮🇹" },
  { id: "zh", label: "中文", flag: "🇨🇳" },
] as const;

type LoginLangId = (typeof LANGUAGES)[number]["id"];

type ForgotCopy = {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitButton: string;
  continueToReset: string;
  ariaBackHome: string;
  ariaLanguage: string;
  toastEmailRequiredTitle: string;
  toastEmailRequiredDesc: string;
  toastSuccessTitle: string;
  toastSuccessDesc: string;
};

const FORGOT_COPY = {
  en: {
    title: "Forgot your password?",
    subtitle: "Enter your email and we will send you a recovery link.",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    submitButton: "Send recovery email",
    continueToReset: "I already have the link (ONLY for Prototype purpose, remove for Dev)",
    ariaBackHome: "Back to home",
    ariaLanguage: "Language",
    toastEmailRequiredTitle: "Email required",
    toastEmailRequiredDesc: "Please enter your email to continue.",
    toastSuccessTitle: "Recovery email sent",
    toastSuccessDesc: "Check your inbox for the password reset link.",
  },
  de: {
    title: "Passwort vergessen?",
    subtitle:
      "Gib deine E-Mail-Adresse ein. Wir senden dir einen Link zum Zurücksetzen.",
    emailLabel: "E-Mail",
    emailPlaceholder: "name@beispiel.de",
    submitButton: "Recovery-E-Mail senden",
    continueToReset: "Ich habe den Link bereits (NUR für Prototyp-Zwecke, für Dev entfernen)",
    ariaBackHome: "Zurück zur Startseite",
    ariaLanguage: "Sprache",
    toastEmailRequiredTitle: "E-Mail erforderlich",
    toastEmailRequiredDesc: "Bitte gib deine E-Mail-Adresse ein.",
    toastSuccessTitle: "Recovery-E-Mail gesendet",
    toastSuccessDesc: "Prüfe dein Postfach für den Reset-Link.",
  },
} satisfies Record<"en" | "de", ForgotCopy>;

function forgotStrings(lang: LoginLangId): ForgotCopy {
  return lang === "de" ? FORGOT_COPY.de : FORGOT_COPY.en;
}

const forgotInputClassName =
  "h-12 rounded-xl bg-background px-3.5 text-[1.0625rem] leading-normal shadow-sm border-zinc-300 dark:border-zinc-600 md:text-[1.0625rem]";

type ForgotLocationState = {
  lang?: LoginLangId;
  email?: string;
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const locationState = (state ?? {}) as ForgotLocationState;
  const [lang, setLang] = useState<LoginLangId>(locationState.lang ?? "en");

  const selectedLang = useMemo(
    () => LANGUAGES.find((item) => item.id === lang) ?? LANGUAGES[0],
    [lang],
  );
  const t = useMemo(() => forgotStrings(lang), [lang]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() ?? "";
    if (!email) {
      toast.error(t.toastEmailRequiredTitle, {
        description: t.toastEmailRequiredDesc,
      });
      return;
    }
    toast.success(t.toastSuccessTitle, {
      description: t.toastSuccessDesc,
    });
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
      <div
        className={cn(
          "flex w-full max-w-full flex-col items-stretch lg:flex-row",
          "gap-6 lg:gap-8 xl:gap-10",
          "lg:max-w-[min(100%,1480px)] xl:max-w-[min(100%,1680px)] 2xl:max-w-[min(100%,min(1880px,92vw))]",
        )}
      >
        <div
          className={cn(
            "flex min-h-[min(90vh,800px)] flex-col lg:min-h-[min(88vh,820px)] xl:min-h-[min(88vh,860px)] 2xl:min-h-[min(88vh,900px)]",
            "lg:flex-1 lg:basis-0 lg:min-w-0",
            "gap-8 rounded-[2rem] md:rounded-[2.5rem]",
            "border border-border/60 bg-card shadow-sm",
            "px-8 py-10 sm:px-12 sm:py-12 lg:px-14 lg:py-14",
          )}
        >
          <Link
            to="/"
            className="inline-flex shrink-0 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label={t.ariaBackHome}
          >
            <img
              src={iCommitCommitmentLogo}
              alt="iCommit Commitment"
              className="h-[46px] w-auto object-contain sm:h-[50px]"
            />
          </Link>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="mx-auto w-full max-w-[480px] space-y-7 xl:max-w-[520px] 2xl:max-w-[560px]">
              <div className="space-y-2 text-center">
                <h1 className="text-[1.6875rem] font-semibold leading-snug tracking-tight text-foreground md:text-[1.75rem] md:leading-9">
                  {t.title}
                </h1>
                <p className="text-[0.9375rem] leading-6 text-muted-foreground md:text-base md:leading-7">
                  {t.subtitle}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <Label htmlFor="recovery-email">{t.emailLabel}</Label>
                  <Input
                    id="recovery-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={locationState.email ?? ""}
                    placeholder={t.emailPlaceholder}
                    className={forgotInputClassName}
                  />
                </div>

                <Button
                  type="submit"
                  size="big"
                  className="w-full bg-[#015ea3] font-normal text-white border-[#015ea3] hover:bg-[#014a82]"
                >
                  {t.submitButton}
                </Button>

                <div className="flex justify-center text-sm">
                  <button
                    type="button"
                    className="text-muted-foreground/75 underline underline-offset-4 transition-colors hover:text-foreground"
                    onClick={() =>
                      navigate("/login/reset-password", {
                        state: { lang, email: locationState.email },
                      })
                    }
                  >
                    {t.continueToReset}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="shrink-0 flex w-full items-center justify-between gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "group inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 bg-background px-3 text-sm shadow-sm",
                    "outline-none transition-colors",
                    "hover:border-zinc-400 hover:bg-muted/60",
                    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    "data-[state=open]:border-[#015ea3]/40 data-[state=open]:bg-muted/40 data-[state=open]:shadow-sm",
                    "dark:border-zinc-600",
                  )}
                  aria-label={t.ariaLanguage}
                >
                  <span className="text-base leading-none" aria-hidden>
                    {selectedLang.flag}
                  </span>
                  <span className="font-medium text-foreground">{selectedLang.label}</span>
                  <ChevronDown
                    className="size-4 shrink-0 opacity-60 transition-transform group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-[12rem] rounded-lg border-zinc-200 p-1 shadow-lg dark:border-zinc-700"
                align="end"
                side="top"
                sideOffset={8}
              >
                <DropdownMenuRadioGroup
                  value={lang}
                  onValueChange={(v) => setLang(v as LoginLangId)}
                >
                  {LANGUAGES.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id}
                      value={item.id}
                      className="cursor-pointer gap-2 rounded-md py-2 pl-8 pr-2 text-sm focus:bg-[#015ea3]/10"
                    >
                      <span className="text-base" aria-hidden>
                        {item.flag}
                      </span>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/"
              className="inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-label={t.ariaBackHome}
            >
              <img
                src={iCommitLogo}
                alt="iCommit"
                className="h-[20px] w-auto object-contain sm:h-[22px]"
              />
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "relative hidden flex-col items-center justify-center lg:flex",
            "lg:flex-1 lg:basis-0 lg:min-w-0",
            "rounded-[2rem] md:rounded-[2.5rem] border border-[#0a3d61]/50",
            "bg-[#0b446f] px-10 py-14 lg:px-14 lg:py-16",
            "min-h-[min(90vh,800px)] lg:min-h-[min(88vh,820px)] xl:min-h-[min(88vh,860px)] 2xl:min-h-[min(88vh,900px)]",
            "shadow-sm",
          )}
        >
          <LoginIllustrationParallax
            src={loginIllustration}
            alt=""
            maxOffset={10}
            imgClassName="xl:max-h-[min(80vh,680px)] 2xl:max-h-[min(82vh,720px)]"
          />
        </div>
      </div>
    </div>
  );
}
