import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Heart, User, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useContent } from "@/contexts/ContentContext";
import { Helmet } from "react-helmet-async";

type FounderCardProps = {
  founder: {
    name: string;
    role: string;
    bio: string;
    quote: string;
    hobbies: string[];
    photoCaptions: { main: string; one: string; two: string };
  };
  mainPhoto: string;
  photoOne: string;
  photoTwo: string;
};

const FounderCard = ({ founder, mainPhoto, photoOne, photoTwo }: FounderCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.article {...fadeIn} className="flex flex-col">
      {/* Portrait */}
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden shadow-xl bg-secondary aspect-[4/5]"
      >
        <img
          src={mainPhoto}
          alt={founder.photoCaptions.main}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4">
          <p className="text-white font-serif text-lg">{founder.name}</p>
          <p className="text-white/80 text-[10px] uppercase tracking-wider">{founder.role}</p>
        </div>
      </motion.div>

      {/* Bio */}
      <p className="mt-5 text-[14px] md:text-[15px] leading-relaxed text-foreground/90">
        {founder.bio}
      </p>

      {/* Hobbies */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {founder.hobbies.map((h) => (
          <span
            key={h}
            className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-foreground/70 border border-border"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Lifestyle photos */}
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {[
          { src: photoOne, caption: founder.photoCaptions.one, delay: 0.1 },
          { src: photoTwo, caption: founder.photoCaptions.two, delay: 0.2 },
        ].map((p) => (
          <motion.figure
            key={p.src}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: p.delay }}
            whileHover={prefersReducedMotion ? undefined : { y: -3 }}
            className="group"
          >
            <div className="relative rounded-xl overflow-hidden bg-secondary aspect-[4/3] shadow-md">
              <img
                src={p.src}
                alt={p.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <figcaption className="text-[10px] text-muted-foreground mt-1.5 italic leading-snug">
              {p.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.article>
  );
};

const Ueber = () => {
  const { t, sharedContent } = useContent();

  const aboutContentForSeo = sharedContent.about;

  const founders = sharedContent.aboutPage?.founders;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{aboutContentForSeo.title}</title>
        <meta name="description" content={aboutContentForSeo.description} />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Titel & Lead */}
            <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">
              {t("aboutPage.title")}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-center mb-12">{t("aboutPage.lead")}</p>

              {/* Story */}
              <div className="my-12 p-8 bg-secondary rounded-xl">
                <h2 className="text-2xl font-serif mb-4">{t("aboutPage.story.title")}</h2>
                <p>{t("aboutPage.story.p1")}</p>
                <p className="mt-4">{t("aboutPage.story.p2")}</p>
                <p className="mt-4">{t("aboutPage.story.p3")}</p>
                <p className="mt-4">{t("aboutPage.story.p4")}</p>
                <p className="mt-4">{t("aboutPage.story.p5")}</p>
              </div>

              {/* Werte */}
              <h2 className="text-2xl font-serif mb-4">{t("aboutPage.values.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">
                    {t("aboutPage.values.compassion.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("aboutPage.values.compassion.desc")}
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <User className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">
                    {t("aboutPage.values.personality.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("aboutPage.values.personality.desc")}
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <Mail className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-serif mb-2">
                    {t("aboutPage.values.connection.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("aboutPage.values.connection.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOUNDERS — wider container for breathing room */}
          {founders && (
            <section className="max-w-6xl mx-auto my-20 lg:my-28">
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="text-center mb-14 lg:mb-20"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
                  {founders.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">{founders.title}</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {founders.intro}
                </p>
                <div className="mt-8 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </motion.header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <FounderCard
                  founder={founders.till}
                  mainPhoto="/about/till.jpg"
                  photoOne="/about/till_australien.jpeg"
                  photoTwo="/about/till_schnee.jpeg"
                />
                <FounderCard
                  founder={founders.wini}
                  mainPhoto="/about/wini.png"
                  photoOne="/about/wini_kitesurf.jpeg"
                  photoTwo="/about/wini_wandern.jpeg"
                />
              </div>
            </section>
          )}

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {/* Produkt/Warum Memora */}
              <div className="bg-card p-8 rounded-lg shadow-sm border border-border mb-12">
                <h2 className="text-2xl font-serif mb-4">{t("aboutPage.product.title")}</h2>
                <p>{t("aboutPage.product.p1")}</p>
                <p className="mt-4">{t("aboutPage.product.p2")}</p>
              </div>

              {/* Optionales Zitat (falls vorhanden) */}
              {t("aboutPage.quote") !== "aboutPage.quote" && (
                <div className="text-center my-16">
                  <p className="italic font-serif text-xl">{t("aboutPage.quote")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Ueber;
