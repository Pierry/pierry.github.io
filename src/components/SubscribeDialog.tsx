import { useEffect, useState } from "react";
import { Mail, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Lang = "en" | "pt";
type Frequency = "threads" | "impactful" | "daily";
type Status = "idle" | "loading" | "success";

const STORAGE_KEY = "newsletter:subscribed";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const i18n = {
  en: {
    title: "Subscribe to the newsletter",
    subtitle: "Curated tech digests in your inbox.",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    emailError: "Enter a valid email address.",
    languageLabel: "Language",
    languageEn: "English",
    languagePt: "Português",
    frequencyLabel: "How often?",
    threadsTitle: "Threads only",
    threadsBody: "When a long-running topic gets a new post.",
    impactfulTitle: "Impactful posts",
    impactfulBody: "High-signal items only. A few per week.",
    dailyTitle: "Daily digest",
    dailyBody: "Everything, every day.",
    consent: "No spam. Unsubscribe any time.",
    cancel: "Cancel",
    confirm: "Subscribe",
    submitting: "Subscribing...",
    successTitle: "You're in.",
    successBody: "Check your inbox to confirm the subscription.",
    done: "Done",
  },
  pt: {
    title: "Assine a newsletter",
    subtitle: "Resumos de tech curados no seu inbox.",
    emailLabel: "Email",
    emailPlaceholder: "voce@exemplo.com",
    emailError: "Digite um email válido.",
    languageLabel: "Idioma",
    languageEn: "English",
    languagePt: "Português",
    frequencyLabel: "Com que frequência?",
    threadsTitle: "Só threads",
    threadsBody: "Quando um assunto longo ganha um post novo.",
    impactfulTitle: "Posts impactantes",
    impactfulBody: "Só os mais importantes. Poucos por semana.",
    dailyTitle: "Resumo diário",
    dailyBody: "Tudo, todo dia.",
    consent: "Sem spam. Cancele quando quiser.",
    cancel: "Cancelar",
    confirm: "Assinar",
    submitting: "Assinando...",
    successTitle: "Pronto.",
    successBody: "Verifique seu inbox para confirmar a inscrição.",
    done: "Fechar",
  },
} as const;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: Lang;
  initialEmail?: string;
};

export const SubscribeDialog = ({ open, onOpenChange, lang, initialEmail = "" }: Props) => {
  const t = i18n[lang];
  const [email, setEmail] = useState(initialEmail);
  const [chosenLang, setChosenLang] = useState<Lang>(lang);
  const [frequency, setFrequency] = useState<Frequency>("impactful");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const emailValid = EMAIL_RE.test(email.trim());
  const showError = touched && !emailValid;

  useEffect(() => {
    setChosenLang(lang);
  }, [lang]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setTouched(false);
      if (initialEmail) setEmail(initialEmail);
    }
  }, [open, initialEmail]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailValid) {
      setTouched(true);
      return;
    }
    setStatus("loading");
    window.setTimeout(() => {
      try {
        const payload = {
          email: email.trim(),
          lang: chosenLang,
          frequency,
          at: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // ignore storage errors
      }
      setStatus("success");
    }, 500);
  };

  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {status === "success" ? (
          <div className="space-y-5">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Check size={20} className="text-green-500" />
                <DialogTitle>{t.successTitle}</DialogTitle>
              </div>
              <DialogDescription>{t.successBody}</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={close}>{t.done}</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail size={18} />
                {t.title}
              </DialogTitle>
              <DialogDescription>{t.subtitle}</DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Label htmlFor="subscribe-email">{t.emailLabel}</Label>
              <Input
                id="subscribe-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder={t.emailPlaceholder}
                aria-invalid={showError}
                className={showError ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {showError && (
                <p className="text-sm text-destructive">{t.emailError}</p>
              )}
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">{t.languageLabel}</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["en", "pt"] as const).map((l) => (
                  <label
                    key={l}
                    className={`cursor-pointer rounded-md border px-3 py-2.5 text-sm transition-colors ${
                      chosenLang === l
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="lang"
                      value={l}
                      checked={chosenLang === l}
                      onChange={() => setChosenLang(l)}
                      className="sr-only"
                    />
                    <span className="font-medium">
                      {l === "en" ? t.languageEn : t.languagePt}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">{t.frequencyLabel}</legend>
              <div className="space-y-2">
                {(
                  [
                    { key: "threads", title: t.threadsTitle, body: t.threadsBody },
                    { key: "impactful", title: t.impactfulTitle, body: t.impactfulBody },
                    { key: "daily", title: t.dailyTitle, body: t.dailyBody },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.key}
                    className={`block cursor-pointer rounded-md border px-3 py-2.5 transition-colors ${
                      frequency === opt.key
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={opt.key}
                      checked={frequency === opt.key}
                      onChange={() => setFrequency(opt.key)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{opt.title}</span>
                      {frequency === opt.key && (
                        <Check size={14} className="text-primary" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-snug">
                      {opt.body}
                    </p>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="text-xs text-muted-foreground">{t.consent}</p>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button type="button" variant="ghost" onClick={close}>
                {t.cancel}
              </Button>
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? t.submitting : t.confirm}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const isSubscribed = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(STORAGE_KEY);
};
