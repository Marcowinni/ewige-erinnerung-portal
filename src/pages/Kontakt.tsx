import { useState } from "react";
import emailjs from '@emailjs/browser';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, Phone, Loader2 } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { Helmet } from "react-helmet-async";

const Kontakt = () => {
  const { t, sharedContent } = useContent();
  const contactContent = sharedContent.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

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

    // DEINE EMAILJS DATEN SIND HIER EINGETRAGEN
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Sicherheitscheck: Sind die Variablen überhaupt vorhanden?
    if (!serviceId || !templateId || !userId) {
      console.error("EmailJS environment variables are not set!");
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitStatus('success');
      }, (err) => {
        console.error("FAILED...", err);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* NEU: Meta Tags */}
      <Helmet>
        <title>{contactContent.title}</title>
        <meta name="description" content={contactContent.description} />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">
              {t("contact.title")}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Kontakt-Infos */}
              <div>
                <div className="prose prose-lg max-w-none mb-8">
                  <p>{t("contact.description")}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t("contact.email")}</h3>
                      <p className="text-muted-foreground">
                        info@memora.moments.ch
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{t("contact.phone")}</h3>
                      <p className="text-muted-foreground">+41 79 407 56 99</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontakt-Formular */}
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 bg-card p-8 rounded-lg shadow-sm border border-border"
                >
                  <h2 className="text-2xl font-serif mb-6">
                    {t("contact.form.title")}
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.name.label")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.name.placeholder")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email.label")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.email.placeholder")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {t("contact.form.subject.label")}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contact.form.subject.placeholder")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t("contact.form.message.label")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.message.placeholder")}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {t("contact.form.submit")}
                  </Button>
                   {submitStatus === 'success' && <p className="text-sm text-green-600">{t("contact.form.success")}</p>}
                   {submitStatus === 'error' && <p className="text-sm text-red-600">Fehler beim Senden. Bitte versuchen Sie es später erneut.</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Kontakt;