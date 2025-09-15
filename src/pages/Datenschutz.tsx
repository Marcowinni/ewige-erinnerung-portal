import { useContent } from "@/contexts/ContentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";

const Datenschutz = () => {
  const { sharedContent } = useContent();
  const { legal } = sharedContent;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-8 text-foreground">
            {legal.privacy.title}
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            {/* Verantwortliche Stelle */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.responsible.title}
              </h2>
              <p style={{ whiteSpace: "pre-line" }}>
                {legal.privacy.sections.responsible.content}
              </p>
            </section>

            {/* Datenerhebung */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.dataCollection.title}
              </h2>
              <p>{legal.privacy.sections.dataCollection.content}</p>
              <ul className="list-disc pl-6 space-y-2">
                {legal.privacy.sections.dataCollection.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Zweck */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.purpose.title}
              </h2>
              <p>{legal.privacy.sections.purpose.content}</p>
              <ul className="list-disc pl-6 space-y-2">
                {legal.privacy.sections.purpose.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Weitergabe */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.disclosure.title}
              </h2>
              <p>{legal.privacy.sections.disclosure.content}</p>
              <ul className="list-disc pl-6 space-y-2">
                {legal.privacy.sections.disclosure.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Speicherung */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.storage.title}
              </h2>
              <p>{legal.privacy.sections.storage.content}</p>
            </section>

            {/* Sicherheit */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.security.title}
              </h2>
              <p>{legal.privacy.sections.security.content}</p>
            </section>

            {/* Rechte */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.rights.title}
              </h2>
              <p>{legal.privacy.sections.rights.content}</p>
              <ul className="list-disc pl-6 space-y-2">
                {legal.privacy.sections.rights.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.cookies.title}
              </h2>
              <p>{legal.privacy.sections.cookies.content}</p>
            </section>

            {/* Änderungen */}
            <section>
              <h2 className="text-2xl font-serif mb-4">
                {legal.privacy.sections.changes.title}
              </h2>
              <p>{legal.privacy.sections.changes.content}</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Datenschutz;