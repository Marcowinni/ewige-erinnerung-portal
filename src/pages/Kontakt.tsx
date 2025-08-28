
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, Phone, MapPin, Clock } from "lucide-react";

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde normalerweise der Versand der Nachricht erfolgen
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    // Feedback zeigen (in einer realen Anwendung)
    alert("Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Kontaktieren Sie uns</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="prose prose-lg max-w-none mb-8">
                  <p>
                    Haben Sie Fragen zu unseren Produkten oder benötigen Sie Unterstützung 
                    bei der Erstellung Ihres persönlichen Gedenkens? Wir stehen Ihnen gerne zur Verfügung.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">E-Mail</h3>
                      <p className="text-muted-foreground">info.memora.moments@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Telefon</h3>
                      <p className="text-muted-foreground">+41 79 407 56 99</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Adresse</h3>
                      <p className="text-muted-foreground">
                        Erinnerungsweg 7<br />
                        8000 Zürich<br />
                        Schweiz
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-sm border border-border">
                  <h2 className="text-2xl font-serif mb-6">Nachricht senden</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr vollständiger Name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ihre E-Mail-Adresse"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Betreff</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Worum geht es in Ihrer Nachricht?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Wie können wir Ihnen helfen?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Nachricht senden
                  </Button>
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
