import React, { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Check, ChevronDown, Eye, EyeOff, X } from "lucide-react";
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

type RuleStatus = {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
};

type ResetCopy = {
  title: string;
  subtitle: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  newPasswordPlaceholder: string;
  confirmPasswordPlaceholder: string;
  showPassword: string;
  hidePassword: string;
  submitButton: string;
  backToLogin: string;
  ariaBackHome: string;
  ariaLanguage: string;
  rulesTitle: string;
  ruleUppercase: string;
  ruleLowercase: string;
  ruleNumber: string;
  ruleSymbol: string;
  toastPasswordRequiredTitle: string;
  toastPasswordRequiredDesc: string;
  toastRulesTitle: string;
  toastRulesDesc: string;
  toastMismatchTitle: string;
  toastMismatchDesc: string;
  toastSuccessTitle: string;
  toastSuccessDesc: string;
};

const RESET_COPY = {
  en: {
    title: "Create your new password",
    subtitle: "Set a secure password to complete your account recovery.",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm new password",
    newPasswordPlaceholder: "insert new password",
    confirmPasswordPlaceholder: "confirm new password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    submitButton: "Update password",
    backToLogin: "Back to login",
    ariaBackHome: "Back to home",
    ariaLanguage: "Language",
    rulesTitle: "Your password must have:",
    ruleUppercase: "At least one uppercase letter",
    ruleLowercase: "At least one lowercase letter",
    ruleNumber: "At least one number",
    ruleSymbol: "At least one symbol",
    toastPasswordRequiredTitle: "Password required",
    toastPasswordRequiredDesc: "Please enter and confirm your new password.",
    toastRulesTitle: "Password is too weak",
    toastRulesDesc: "Please satisfy all password rules.",
    toastMismatchTitle: "Passwords do not match",
    toastMismatchDesc: "The two password fields must be identical.",
    toastSuccessTitle: "Password updated",
    toastSuccessDesc: "You can now sign in with your new password.",
  },
  de: {
    title: "Neues Passwort erstellen",
    subtitle:
      "Lege ein sicheres Passwort fest, um die Wiederherstellung abzuschliessen.",
    newPasswordLabel: "Neues Passwort",
    confirmPasswordLabel: "Neues Passwort bestätigen",
    newPasswordPlaceholder: "neues passwort eingeben",
    confirmPasswordPlaceholder: "neues passwort bestätigen",
    showPassword: "Passwort anzeigen",
    hidePassword: "Passwort verbergen",
    submitButton: "Passwort aktualisieren",
    backToLogin: "Zurück zum Login",
    ariaBackHome: "Zurück zur Startseite",
    ariaLanguage: "Sprache",
    rulesTitle: "Dein Passwort muss Folgendes enthalten:",
    ruleUppercase: "Mindestens ein Grossbuchstabe",
    ruleLowercase: "Mindestens ein Kleinbuchstabe",
    ruleNumber: "Mindestens eine Zahl",
    ruleSymbol: "Mindestens ein Sonderzeichen",
    toastPasswordRequiredTitle: "Passwort erforderlich",
    toastPasswordRequiredDesc: "Bitte neues Passwort eingeben und bestätigen.",
    toastRulesTitle: "Passwort zu schwach",
    toastRulesDesc: "Bitte alle Passwortregeln erfüllen.",
    toastMismatchTitle: "Passwörter stimmen nicht überein",
    toastMismatchDesc: "Beide Passwortfelder müssen identisch sein.",
    toastSuccessTitle: "Passwort aktualisiert",
    toastSuccessDesc: "Du kannst dich jetzt mit dem neuen Passwort anmelden.",
  },
} satisfies Record<"en" | "de", ResetCopy>;

function resetStrings(lang: LoginLangId): ResetCopy {
  return lang === "de" ? RESET_COPY.de : RESET_COPY.en;
}

function getRuleStatus(password: string): RuleStatus {
  return {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  };
}

function hasAllRules(status: RuleStatus): boolean {
  return status.hasUppercase && status.hasLowercase && status.hasNumber && status.hasSymbol;
}

const resetInputClassName =
  "h-12 rounded-xl bg-background px-3.5 text-[1.0625rem] leading-normal shadow-sm border-zinc-300 dark:border-zinc-600 md:text-[1.0625rem]";

type ResetLocationState = {
  lang?: LoginLangId;
};

function RuleItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-muted-foreground">
      {ok ? (
        <Check className="size-4 text-emerald-600" strokeWidth={2.4} aria-hidden />
      ) : (
        <X className="size-4 text-muted-foreground/70" strokeWidth={2.4} aria-hidden />
      )}
      <span>{label}</span>
    </li>
  );
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const locationState = (state ?? {}) as ResetLocationState;

  const [lang, setLang] = useState<LoginLangId>(locationState.lang ?? "en");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const selectedLang = useMemo(
    () => LANGUAGES.find((item) => item.id === lang) ?? LANGUAGES[0],
    [lang],
  );
  const t = useMemo(() => resetStrings(lang), [lang]);
  const status = useMemo(() => getRuleStatus(newPassword), [newPassword]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error(t.toastPasswordRequiredTitle, {
        description: t.toastPasswordRequiredDesc,
      });
      return;
    }

    if (!hasAllRules(status)) {
      toast.error(t.toastRulesTitle, {
        description: t.toastRulesDesc,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t.toastMismatchTitle, {
        description: t.toastMismatchDesc,
      });
      return;
    }

    toast.success(t.toastSuccessTitle, {
      description: t.toastSuccessDesc,
    });
    navigate("/login", { state: { lang }, replace: true });
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
            <div className="mx-auto w-full max-w-[480px] space-y-6 xl:max-w-[520px] 2xl:max-w-[560px]">
              <div className="space-y-2 text-center">
                <h1 className="text-[1.6875rem] font-semibold leading-snug tracking-tight text-foreground md:text-[1.75rem] md:leading-9">
                  {t.title}
                </h1>
                <p className="text-[0.9375rem] leading-6 text-muted-foreground md:text-base md:leading-7">
                  {t.subtitle}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t.newPasswordLabel}</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={t.newPasswordPlaceholder}
                        className={cn(resetInputClassName, "pr-11")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        className={cn(
                          "absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md",
                          "text-muted-foreground transition-colors",
                          "hover:bg-muted hover:text-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                        )}
                        aria-pressed={showNewPassword}
                        aria-label={showNewPassword ? t.hidePassword : t.showPassword}
                      >
                        {showNewPassword ? (
                          <EyeOff className="size-[1.125rem] shrink-0" strokeWidth={2} />
                        ) : (
                          <Eye className="size-[1.125rem] shrink-0" strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wide text-foreground/80">{t.rulesTitle}</p>
                    <ul className="space-y-1.5">
                      <RuleItem ok={status.hasUppercase} label={t.ruleUppercase} />
                      <RuleItem ok={status.hasLowercase} label={t.ruleLowercase} />
                      <RuleItem ok={status.hasNumber} label={t.ruleNumber} />
                      <RuleItem ok={status.hasSymbol} label={t.ruleSymbol} />
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="confirm-password">{t.confirmPasswordLabel}</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t.confirmPasswordPlaceholder}
                      className={cn(resetInputClassName, "pr-11")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className={cn(
                        "absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md",
                        "text-muted-foreground transition-colors",
                        "hover:bg-muted hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                      )}
                      aria-pressed={showConfirmPassword}
                      aria-label={showConfirmPassword ? t.hidePassword : t.showPassword}
                    >
                      {showConfirmPassword ? (
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
                  {t.submitButton}
                </Button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    onClick={() => navigate("/login", { state: { lang } })}
                  >
                    {t.backToLogin}
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
