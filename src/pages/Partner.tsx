import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerUploader from "@/components/PartnerUploader";
import { Helmet } from "react-helmet-async";

const Partner = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Partner Upload - Memora Moments</title>
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