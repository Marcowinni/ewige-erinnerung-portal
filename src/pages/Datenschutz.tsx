import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useContent } from "@/contexts/ContentContext";

const Datenschutz = () => {
  const { content } = useContent();
  const shared = content.shared;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-8">
            {shared.legal.privacy.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {shared.legal.privacy.sections.responsible.title}
              </h2>
              <p>{shared.legal.privacy.sections.responsible.content}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {shared.legal.privacy.sections.dataCollection.title}
              </h2>
              <p className="mb-4">{shared.legal.privacy.sections.dataCollection.content}</p>
              <ul className="list-disc pl-6">
                {shared.legal.privacy.sections.dataCollection.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {shared.legal.privacy.sections.imageProcessing.title}
              </h2>
              <p className="mb-4">{shared.legal.privacy.sections.imageProcessing.content}</p>
              <ul className="list-disc pl-6">
                {shared.legal.privacy.sections.imageProcessing.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {shared.legal.privacy.sections.rights.title}
              </h2>
              <p className="mb-4">{shared.legal.privacy.sections.rights.content}</p>
              <ul className="list-disc pl-6">
                {shared.legal.privacy.sections.rights.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {shared.legal.privacy.sections.cookies.title}
              </h2>
              <p>{shared.legal.privacy.sections.cookies.content}</p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default Datenschutz;