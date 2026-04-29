import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Send, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";

const Kontakt = () => {
  const { sharedContent } = useContent();
  const c = sharedContent.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !userId) {
      console.error("EmailJS environment variables are not set!");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    emailjs
      .send(serviceId, templateId, formData, userId)
      .then(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitStatus("success");
      })
      .catch(() => setSubmitStatus("error"))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--memorial-canvas))] text-memorial-ink">
      <Helmet>
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-28 sm:pt-32 pb-20">
        <section className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--memorial-bronze) / 0.18) 0%, transparent 70%)",
            }}
          />

          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="memorial-hairline" />
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft">
                {c.heading}
              </p>
              <h1 className="font-display mt-4 text-4xl text-memorial-ink sm:text-5xl">
                {c.title}
              </h1>
              <p className="mt-5 text-[15px] text-memorial-ink-soft leading-relaxed">
                {c.description}
              </p>
            </motion.div>

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 max-w-5xl mx-auto">
              {/* Contact info column */}
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                className="memorial-card rounded-2xl border border-memorial-line p-7 sm:p-8"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft">
                  Memora Moments
                </p>
                <h2 className="font-display mt-2 text-2xl text-memorial-ink">
                  Direkter Draht
                </h2>

                <div className="mt-7 space-y-5">
                  <a
                    href="mailto:info@memora-moments.ch"
                    className="flex items-start gap-4 group"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-memorial-bronze/15 text-memorial-bronze-deep transition-colors group-hover:bg-memorial-bronze/25">
                      <Mail className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft">
                        {c.email}
                      </p>
                      <p className="mt-0.5 text-[15px] text-memorial-ink group-hover:text-memorial-bronze-deep transition-colors break-all">
                        info@memora-moments.ch
                      </p>
                    </div>
                  </a>

                  <a href="tel:+41794075699" className="flex items-start gap-4 group">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-memorial-sage/15 text-memorial-sage-deep transition-colors group-hover:bg-memorial-sage/25">
                      <Phone className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft">
                        {c.phone}
                      </p>
                      <p className="mt-0.5 text-[15px] text-memorial-ink group-hover:text-memorial-sage-deep transition-colors">
                        +41 79 407 56 99
                      </p>
                    </div>
                  </a>
                </div>
              </motion.aside>

              {/* Form column */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                className="memorial-card rounded-2xl border border-memorial-line p-7 sm:p-9"
              >
                <h2 className="font-display text-2xl text-memorial-ink mb-6">
                  {c.form.title}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="name"
                      label={c.form.name.label}
                      placeholder={c.form.name.placeholder}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      id="email"
                      type="email"
                      label={c.form.email.label}
                      placeholder={c.form.email.placeholder}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Field
                    id="subject"
                    label={c.form.subject.label}
                    placeholder={c.form.subject.placeholder}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] uppercase tracking-widest text-memorial-ink-soft mb-2"
                    >
                      {c.form.message.label}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={c.form.message.placeholder}
                      rows={5}
                      required
                      className="memorial-underline-input w-full text-[15px] text-memorial-ink resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "memorial-cta memorial-cta-primary inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-medium",
                      isSubmitting && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {c.form.submit}
                  </button>

                  {submitStatus === "success" && (
                    <div className="flex items-start gap-2 rounded-xl border border-memorial-sage/40 bg-memorial-sage/10 px-4 py-3 text-[13px] text-memorial-sage-deep">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{c.form.success}</span>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Fehler beim Senden. Bitte versuchen Sie es später erneut.</span>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

function Field({ id, label, placeholder, value, onChange, type = "text", required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-widest text-memorial-ink-soft mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="memorial-underline-input w-full text-[15px] text-memorial-ink"
      />
    </div>
  );
}

export default Kontakt;
