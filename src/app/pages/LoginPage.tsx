import React, { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
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
import loginIllustration from "../../assets/Illustration-01.svg";

const LANGUAGES = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "it", label: "Italiano", flag: "🇮🇹" },
  { id: "zh", label: "中文", flag: "🇨🇳" },
] as const;

type LoginLangId = (typeof LANGUAGES)[number]["id"];

type LoginCopy = {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  forgotPassword: string;
  loginButton: string;
  ariaBackHome: string;
  ariaLanguage: string;
  showPassword: string;
  hidePassword: string;
  toastEmailRequiredTitle: string;
  toastEmailRequiredDesc: string;
  toastInvalidEmailTitle: string;
  toastInvalidEmailDesc: string;
  toastPasswordRequiredTitle: string;
  toastPasswordRequiredDesc: string;
  toastSignedInTitle: string;
  toastSignedInDesc: string;
  toastPasswordResetTitle: string;
  toastPasswordResetDesc: string;
};

const LOGIN_COPY = {
  en: {
    title: "Login to your account",
    subtitle: "Enter your email below to login to your account.",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    forgotPassword: "Forgot your password?",
    loginButton: "Login",
    ariaBackHome: "Back to home",
    ariaLanguage: "Language",
    showPassword: "Show password",
    hidePassword: "Hide password",
    toastEmailRequiredTitle: "Email required",
    toastEmailRequiredDesc: "Please enter the email address for your account.",
    toastInvalidEmailTitle: "Invalid email",
    toastInvalidEmailDesc:
      "Check the format and try again (e.g. name@company.com).",
    toastPasswordRequiredTitle: "Password required",
    toastPasswordRequiredDesc: "Enter your password to continue.",
    toastSignedInTitle: "Signed in",
    toastSignedInDesc:
      "This is a prototype — no account is created or verified.",
    toastPasswordResetTitle: "Password reset",
    toastPasswordResetDesc:
      "Reset isn’t available in this prototype. Use your real product flow when backend is ready.",
  },
  de: {
    title: "Bei Ihrem Konto anmelden",
    subtitle:
      "Geben Sie unten Ihre E-Mail-Adresse ein, um sich anzumelden.",
    emailLabel: "E-Mail",
    emailPlaceholder: "name@beispiel.de",
    passwordLabel: "Passwort",
    forgotPassword: "Passwort vergessen?",
    loginButton: "Anmelden",
    ariaBackHome: "Zurück zur Startseite",
    ariaLanguage: "Sprache",
    showPassword: "Passwort anzeigen",
    hidePassword: "Passwort verbergen",
    toastEmailRequiredTitle: "E-Mail erforderlich",
    toastEmailRequiredDesc:
      "Bitte geben Sie die E-Mail-Adresse für Ihr Konto ein.",
    toastInvalidEmailTitle: "Ungültige E-Mail",
    toastInvalidEmailDesc:
      "Prüfen Sie das Format und versuchen Sie es erneut (z. B. name@firma.de).",
    toastPasswordRequiredTitle: "Passwort erforderlich",
    toastPasswordRequiredDesc:
      "Geben Sie Ihr Passwort ein, um fortzufahren.",
    toastSignedInTitle: "Angemeldet",
    toastSignedInDesc:
      "Dies ist ein Prototyp — es wird kein Konto erstellt oder geprüft.",
    toastPasswordResetTitle: "Passwort zurücksetzen",
    toastPasswordResetDesc:
      "Im Prototyp nicht verfügbar. Nutzen Sie später Ihren echten Produkt-Flow, sobald das Backend angebunden ist.",
  },
} satisfies Record<"en" | "de", LoginCopy>;

function loginStrings(lang: LoginLangId): LoginCopy {
  return lang === "de" ? LOGIN_COPY.de : LOGIN_COPY.en;
}

/** Clearer default edge than theme `--border` (too faint on white); focus keeps Input ring. */
const loginInputClassName =
  "h-12 rounded-xl bg-background px-3.5 text-[1.0625rem] leading-normal shadow-sm border-zinc-300 dark:border-zinc-600 md:text-[1.0625rem]";

const emailLooksValid = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function LoginPage() {
  const [lang, setLang] = useState<(typeof LANGUAGES)[number]["id"]>("en");
  const [showPassword, setShowPassword] = useState(false);

  const selectedLang = useMemo(
    () => LANGUAGES.find((l) => l.id === lang) ?? LANGUAGES[0],
    [lang],
  );

  const t = useMemo(() => loginStrings(lang), [lang]);

  function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() ?? "";
    const password =
      (form.elements.namedItem("password") as HTMLInputElement)?.value ?? "";
    if (!email) {
      toast.error(t.toastEmailRequiredTitle, {
        description: t.toastEmailRequiredDesc,
      });
      return;
    }
    if (!emailLooksValid(email)) {
      toast.error(t.toastInvalidEmailTitle, {
        description: t.toastInvalidEmailDesc,
      });
      return;
    }
    if (!password) {
      toast.error(t.toastPasswordRequiredTitle, {
        description: t.toastPasswordRequiredDesc,
      });
      return;
    }

    toast.success(t.toastSignedInTitle, {
      description: t.toastSignedInDesc,
    });
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div
        className={cn(
          "w-full max-w-[1320px] flex flex-col lg:flex-row items-stretch",
          "gap-6 lg:gap-10",
        )}
      >
        {/* Form column — own card, separated from illustration */}
        <div
          className={cn(
            "flex min-h-[min(90vh,800px)] flex-col lg:min-h-[min(88vh,820px)]",
            "lg:flex-1 lg:basis-0 lg:min-w-0",
            "gap-8 rounded-[2rem] md:rounded-[2.5rem]",
            "border border-border/60 bg-card shadow-sm",
            "px-8 py-12 sm:px-12 sm:py-14 lg:px-14 lg:py-16",
          )}
        >
          <Link
            to="/"
            className="inline-flex shrink-0 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label={t.ariaBackHome}
          >
            <img
              src={iCommitLogo}
              alt="iCommit"
              className="h-[26px] w-auto object-contain sm:h-[28px]"
            />
          </Link>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="mx-auto w-full max-w-[480px] space-y-7">
              <div className="space-y-2 text-center">
                <h1 className="text-[1.6875rem] font-semibold leading-snug tracking-tight text-foreground md:text-[1.75rem] md:leading-9">
                  {t.title}
                </h1>
                <p className="text-[0.9375rem] leading-6 text-muted-foreground md:text-base md:leading-7">
                  {t.subtitle}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleLoginSubmit} noValidate>
                <div className="space-y-2">
                  <Label htmlFor="login-email">{t.emailLabel}</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.emailPlaceholder}
                    className={loginInputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="login-password">{t.passwordLabel}</Label>
                    <button
                      type="button"
                      className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      onClick={() =>
                        toast.info(t.toastPasswordResetTitle, {
                          description: t.toastPasswordResetDesc,
                        })
                      }
                    >
                      {t.forgotPassword}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={cn(loginInputClassName, "pr-11")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className={cn(
                        "absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md",
                        "text-muted-foreground transition-colors",
                        "hover:bg-muted hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                      )}
                      aria-pressed={showPassword}
                      aria-label={showPassword ? t.hidePassword : t.showPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="size-[1.125rem] shrink-0" strokeWidth={2} />
                      ) : (
                        <Eye className="size-[1.125rem] shrink-0" strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="big"
                  className="w-full bg-[#015ea3] font-normal text-white border-[#015ea3] hover:bg-[#014a82]"
                >
                  {t.loginButton}
                </Button>
              </form>
            </div>
          </div>

          {/* Language — dropdown, bottom-left */}
          <div className="shrink-0 self-start">
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
                align="start"
                side="top"
                sideOffset={8}
              >
                <DropdownMenuRadioGroup
                  value={lang}
                  onValueChange={(v) =>
                    setLang(v as (typeof LANGUAGES)[number]["id"])
                  }
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
          </div>
        </div>

        {/* Illustration column — separate card */}
        <div
          className={cn(
            "relative hidden flex-col items-center justify-center lg:flex",
            "lg:flex-1 lg:basis-0 lg:min-w-0",
            "rounded-[2rem] md:rounded-[2.5rem] border border-[#0a3d61]/50",
            "bg-[#0b446f] px-10 py-14 lg:px-14 lg:py-16",
            "min-h-[min(90vh,800px)] lg:min-h-[min(88vh,820px)]",
            "shadow-sm",
          )}
        >
          <LoginIllustrationParallax src={loginIllustration} alt="" maxOffset={10} />
        </div>
      </div>
    </div>
  );
}
