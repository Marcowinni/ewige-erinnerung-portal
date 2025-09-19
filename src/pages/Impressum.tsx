import { useContent } from "@/contexts/ContentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

const Impressum = () => {
  const { sharedContent } = useContent();
  const { imprint } = sharedContent.legal;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-8 text-foreground">
            {imprint.title}
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-serif mb-4">{imprint.sections.info.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                {imprint.sections.info.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">{imprint.sections.contact.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                {imprint.sections.contact.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">{imprint.sections.responsible.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                {imprint.sections.responsible.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">{imprint.sections.disclaimer.title}</h2>
              
              <h3 className="text-xl font-serif mb-3">{imprint.sections.disclaimer.content.title}</h3>
              <p>
                {imprint.sections.disclaimer.content.content}
              </p>

              <h3 className="text-xl font-serif my-3">{imprint.sections.disclaimer.links.title}</h3>
              <p>
                {imprint.sections.disclaimer.links.content}
              </p>

              <h3 className="text-xl font-serif my-3">{imprint.sections.disclaimer.copyright.title}</h3>
              <p>
                {imprint.sections.disclaimer.copyright.content}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Impressum;