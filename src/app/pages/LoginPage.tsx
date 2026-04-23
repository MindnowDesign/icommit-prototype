import React, { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
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

type LoginCopy = {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
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
  emailErrorInvalid: string;
  passwordErrorInvalid: string;
  toastFixErrorsTitle: string;
  toastFixErrorsDesc: string;
  toastSignedInTitle: string;
  toastSignedInDesc: string;
};

const LOGIN_COPY = {
  en: {
    title: "Login to your account",
    subtitle: "Enter your email below to login to your account.",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "insert your password",
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
    emailErrorInvalid: "Wrong email, check spelling.",
    passwordErrorInvalid: "Wrong password, check spelling.",
    toastFixErrorsTitle: "Please fix the errors",
    toastFixErrorsDesc: "Check the highlighted fields and try again.",
    toastSignedInTitle: "Signed in",
    toastSignedInDesc:
      "This is a prototype — no account is created or verified.",
  },
  de: {
    title: "Melden Sie sich in Ihrem Konto an",
    subtitle: "Geben Sie Ihre E-Mail-Adresse ein, um sich anzumelden.",
    emailLabel: "E-Mail",
    emailPlaceholder: "name@beispiel.ch",
    passwordLabel: "Passwort",
    passwordPlaceholder: "Passwort eingeben",
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
    emailErrorInvalid: "Ungültige E-Mail-Adresse. Bitte prüfen Sie die Eingabe.",
    passwordErrorInvalid: "Ungültiges Passwort. Bitte prüfen Sie die Eingabe.",
    toastFixErrorsTitle: "Bitte korrigieren Sie die Fehler",
    toastFixErrorsDesc: "Prüfen Sie die markierten Felder und versuchen Sie es erneut.",
    toastSignedInTitle: "Angemeldet",
    toastSignedInDesc:
      "Dies ist ein Prototyp — es erfolgt keine echte Kontoüberprüfung.",
  },
} satisfies Record<"en" | "de", LoginCopy>;

function loginStrings(lang: LoginLangId): LoginCopy {
  return lang === "de" ? LOGIN_COPY.de : LOGIN_COPY.en;
}

/** Clearer default edge than theme `--border` (too faint on white); focus keeps Input ring. */
const loginInputClassName =
  "h-12 rounded-xl bg-background px-3.5 text-[1.0625rem] leading-normal shadow-sm border-zinc-300 dark:border-zinc-600 md:text-[1.0625rem]";

export default function LoginPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<(typeof LANGUAGES)[number]["id"]>("en");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const selectedLang = useMemo(
    () => LANGUAGES.find((l) => l.id === lang) ?? LANGUAGES[0],
    [lang],
  );

  const t = useMemo(() => loginStrings(lang), [lang]);

  function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedEmail = email.trim();

    let hasError = false;
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailLooksValid) {
      setEmailError(t.emailErrorInvalid);
      hasError = true;
    } else {
      setEmailError(null);
    }

    const passwordLooksValid = password.trim().length >= 6;
    if (!passwordLooksValid) {
      setPasswordError(t.passwordErrorInvalid);
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (hasError) {
      toast.error(t.toastFixErrorsTitle, {
        description: t.toastFixErrorsDesc,
      });
      return;
    }
    navigate("/login/token", { state: { lang, email: trimmedEmail } });
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
      <div
        className={cn(
          "flex w-full max-w-full flex-col items-stretch lg:flex-row",
          "gap-6 lg:gap-8 xl:gap-10",
          /* Wider on large viewports so both columns scale up (still capped for readability) */
          "lg:max-w-[min(100%,1480px)] xl:max-w-[min(100%,1680px)] 2xl:max-w-[min(100%,min(1880px,92vw))]",
        )}
      >
        {/* Form column — own card, separated from illustration */}
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

              <form className="space-y-6" onSubmit={handleLoginSubmit} noValidate>
                <div className="space-y-2">
                  <Label htmlFor="login-email">{t.emailLabel}</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder={t.emailPlaceholder}
                    className={cn(loginInputClassName, emailError && "border-red-500 focus-visible:ring-red-500/40")}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "login-email-error" : undefined}
                  />
                  {emailError ? (
                    <p id="login-email-error" className="text-xs text-red-600">
                      {emailError}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="login-password">{t.passwordLabel}</Label>
                    <button
                      type="button"
                      className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      onClick={() => navigate("/login/forgot-password", { state: { lang } })}
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError(null);
                      }}
                      placeholder={t.passwordPlaceholder}
                      className={cn(
                        loginInputClassName,
                        "pr-11",
                        passwordError && "border-red-500 focus-visible:ring-red-500/40",
                      )}
                      aria-invalid={!!passwordError}
                      aria-describedby={passwordError ? "login-password-error" : undefined}
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
                  {passwordError ? (
                    <p id="login-password-error" className="text-xs text-red-600">
                      {passwordError}
                    </p>
                  ) : null}
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

          {/* Footer row — language bottom-left + old logo bottom-right */}
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

        {/* Illustration column — separate card */}
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
