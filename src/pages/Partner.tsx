import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerUploader from "@/components/PartnerUploader";
import { Helmet } from "react-helmet-async";
import { useContent } from "@/contexts/ContentContext";

const Partner = () => {
  const { sharedContent } = useContent();
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{sharedContent.meta.partner.title}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Navbar />
      
      <main className="flex-grow pt-24 bg-background">
        <PartnerUploader />
      </main>

      <Footer />
    </div>
  );
};

export default Partner;