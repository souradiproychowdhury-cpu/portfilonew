import { motion } from "framer-motion";
import { Send, MapPin, Mail, Github, Linkedin, Globe } from "lucide-react";
import { Input } from "../lightswind/input";
import { Textarea } from "../lightswind/textarea";
import { Button } from "../lightswind/button";

export const ContactSection = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-[3rem] border border-foreground/10 relative overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground">
                I'm currently open to new opportunities, collaborations, and internship roles. Whether you want to build something together or just want to say hi — I'll get back to you!
              </p>
            </div>

            <div className="space-y-6">
              <a 
                href="mailto:souradiproychowdhury@gmail.com" 
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">souradiproychowdhury@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-medium">Ashoknagar, West Bengal, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Find Me Online</p>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://github.com/souradiproychowdhury-cpu" 
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <span className="font-medium">github.com/souradiproychowdhury-cpu</span>
                </a>
                <a 
                  href="https://linkedin.com/in/Souradip-Roy-Chowdhury" 
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <span className="font-medium">linkedin.com/in/Souradip-Roy-Chowdhury</span>
                </a>
                <a 
                  href="https://portfolio1-n6kft2nd6-souradiproychowdhury-cpu.vercel.app" 
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Globe className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <span className="font-medium">Portfolio (Previous)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 glass-panel p-8 rounded-[2rem] border border-foreground/10 relative">
            <form 
              className="space-y-5" 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
                const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value;
                window.open(`mailto:souradiproychowdhury@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Your Name</label>
                <Input 
                  name="name"
                  type="text" 
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Your Email</label>
                <Input 
                  name="email"
                  type="email" 
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                <Textarea 
                  name="message"
                  rows={4}
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary resize-none placeholder:text-muted-foreground/50 min-h-[120px]"
                  placeholder="How can I help you?"
                  required
                />
              </div>

              <Button size="lg" className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] mt-4 h-12">
                Send Message <Send className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
