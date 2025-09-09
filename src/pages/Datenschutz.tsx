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
            <section>
              <h2 className="text-2xl font-serif mb-4">{legal.privacy.sections.responsible.title}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>
                {legal.privacy.sections.responsible.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">{legal.privacy.sections.dataCollection.title}</h2>
              <p>{legal.privacy.sections.dataCollection.content}</p>
              <ul className="list-disc pl-6 space-y-2">
                {legal.privacy.sections.dataCollection.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">{legal.privacy.sections.imageProcessing.title}</h2>
              <p>{legal.privacy.sections.imageProcessing.content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">{legal.privacy.sections.rights.title}</h2>
              <p>{legal.privacy.sections.rights.content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4">{legal.privacy.sections.cookies.title}</h2>
              <p>{legal.privacy.sections.cookies.content}</p>
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