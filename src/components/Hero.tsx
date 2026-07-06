import React, { useState } from 'react';
import { ShieldCheck, Award, Zap, ArrowRight, BarChart3, Settings2, ArrowDownToLine } from 'lucide-react';
import { COMPANY_DETAILS } from '../data';
import { jsPDF } from 'jspdf';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'success'>('idle');

  const handleAction = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadProfile = () => {
    setDownloadState('downloading');
    
    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const totalPages = 5;

        // Custom Helper: Draw standard page header (CES circular logo) and footer
        const drawHeaderFooter = (pageNum: number) => {
          // Circular CES logo on top right
          doc.setDrawColor(15, 46, 92); // ces-blue (#0f2e5c)
          doc.setLineWidth(1.2);
          doc.circle(185, 22, 10, 'S');
          
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.setTextColor(15, 46, 92);
          doc.text("CES", 185, 23.5, { align: "center" });

          // Header horizontal line
          doc.setDrawColor(15, 46, 92);
          doc.setLineWidth(0.6);
          doc.line(15, 36, 195, 36);

          // Footer
          doc.setDrawColor(180, 180, 180);
          doc.setLineWidth(0.4);
          doc.line(15, 278, 195, 278);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text("CANDELA ENGINEERING & SERVICES", 15, 283);
          doc.text(`Page ${pageNum} of ${totalPages}`, 195, 283, { align: "right" });
        };

        const drawBullet = (x: number, y: number) => {
          // Draw solid triangle pointer ►
          doc.setFillColor(15, 46, 92);
          doc.triangle(x, y - 2.5, x, y + 0.5, x + 2.5, y - 1, 'F');
        };

        // ================= PAGE 1: COVER PAGE =================
        // Top solid bar
        doc.setFillColor(15, 46, 92); // ces-blue
        doc.rect(15, 15, 150, 22, 'F');

        // Circular Logo on top right
        doc.setDrawColor(15, 46, 92);
        doc.setLineWidth(1.5);
        doc.circle(182, 26, 12, 'S');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(15, 46, 92);
        doc.text("CES", 182, 28, { align: "center" });

        // Draw an elegant wireframe representing transmission tower and electrical lines (Page 1 main photo)
        doc.setDrawColor(200, 200, 210);
        doc.setLineWidth(0.3);
        // Background sky grid
        for (let i = 0; i < 6; i++) {
          doc.line(15, 60 + i * 18, 195, 60 + i * 18);
        }

        // Transmission Tower structure
        doc.setDrawColor(80, 90, 110);
        doc.setLineWidth(0.7);
        // Tower vertical legs
        doc.line(75, 155, 90, 60);
        doc.line(135, 155, 120, 60);
        // Inner braces
        doc.line(75, 155, 135, 155);
        doc.line(78, 135, 132, 135);
        doc.line(81, 115, 129, 115);
        doc.line(85, 95, 125, 95);
        doc.line(88, 75, 122, 75);
        doc.line(90, 60, 120, 60);
        // Diagonal braces
        doc.line(75, 155, 132, 135);
        doc.line(135, 155, 78, 135);
        doc.line(78, 135, 129, 115);
        doc.line(132, 135, 81, 115);
        doc.line(81, 115, 125, 95);
        doc.line(129, 115, 85, 95);
        doc.line(85, 95, 122, 75);
        doc.line(125, 95, 88, 75);
        doc.line(88, 75, 120, 60);
        doc.line(122, 75, 90, 60);

        // Tower horizontal crossarms
        doc.setLineWidth(1.0);
        // Top crossarm
        doc.line(80, 75, 130, 75);
        // Middle crossarm
        doc.line(70, 95, 140, 95);
        // Bottom crossarm
        doc.line(60, 115, 150, 115);

        // Hanging insulator icons
        doc.line(80, 75, 80, 83);
        doc.line(130, 75, 130, 83);
        doc.line(70, 95, 70, 103);
        doc.line(140, 95, 140, 103);
        doc.line(60, 115, 60, 123);
        doc.line(150, 115, 150, 123);

        // Power Transmission lines extending outwards
        doc.setDrawColor(40, 50, 70);
        doc.setLineWidth(0.5);
        doc.line(15, 88, 80, 83);
        doc.line(80, 83, 195, 100);
        
        doc.line(15, 108, 70, 103);
        doc.line(70, 103, 195, 120);

        doc.line(15, 128, 60, 123);
        doc.line(60, 123, 195, 140);

        doc.line(15, 82, 130, 83);
        doc.line(130, 83, 195, 95);

        doc.line(15, 102, 140, 103);
        doc.line(140, 103, 195, 115);

        doc.line(15, 122, 150, 123);
        doc.line(150, 123, 195, 135);

        // Company text brand segment
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(15, 46, 92); // ces-blue
        doc.text("CANDELA ENGINEERING & SERVICES", 105, 172, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(13);
        doc.setTextColor(110, 110, 120);
        doc.text("Engineering & Financial Consultant", 105, 180, { align: "center" });

        // Styled thick accent bar (matching Page 1 design)
        doc.setFillColor(15, 46, 92);
        doc.rect(15, 186, 180, 1.8, 'F');

        // Cover page pillars with custom polygon arrows
        const pillars = ["Project", "Consultancy", "Trading"];
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(15, 46, 92);

        pillars.forEach((pillar, idx) => {
          const yPos = 205 + idx * 16;
          // Custom solid arrow polygon
          doc.setFillColor(15, 46, 92);
          doc.triangle(20, yPos - 4.5, 20, yPos + 0.5, 23, yPos - 2, 'F');
          doc.text(pillar, 28, yPos);
        });

        // Estd base line
        doc.setFillColor(120, 120, 130);
        doc.rect(15, 255, 180, 1.2, 'F');

        // ================= PAGE 2: ABOUT US & PROJECTS =================
        doc.addPage();
        drawHeaderFooter(2);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(15, 46, 92);
        doc.text("About Us", 15, 48);

        // Underline title
        doc.setDrawColor(227, 168, 19); // Gold
        doc.setLineWidth(0.8);
        doc.line(15, 51, 45, 51);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(15, 46, 92);
        const aboutText1 = "CANDELA ENGINEERING & SERVICES is an Engineering & Financial consultant for setting up of Industries in West Bengal. We are currently giving services to our valuable clients since 2016.";
        const splitText1 = doc.splitTextToSize(aboutText1, 180);
        doc.text(splitText1, 15, 58);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(50, 50, 60);
        const aboutText2 = "We provide feasible technical solutions for engineering purposes and our mission is to deliver our services to our valuable clients with the highest level of satisfaction. We are committed to serve customers with top notch services for different types of industries while facilitating extraordinary growth and sustainable profitability with cutting-edge standards.";
        const splitText2 = doc.splitTextToSize(aboutText2, 180);
        doc.text(splitText2, 15, 71);

        // Center double dashed line divider
        doc.setDrawColor(180, 180, 190);
        doc.setLineWidth(0.4);
        doc.setLineDashPattern([2, 1.5], 0);
        doc.line(15, 96, 195, 96);
        doc.line(15, 98, 195, 98);
        doc.setLineDashPattern([], 0); // reset

        // Projects Section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(15, 46, 92);
        doc.text("Projects:-", 15, 110);

        // Projects bullet lists
        const projects = [
          "Electrical Projects.",
          "Electrification Work.",
          "Electrical Maintenance Work.",
          "Annual Maintenance Contract (AMC) of Electrical Installations.",
          "Engineering for Green field & Brown Field projects.",
          "Solar Power Project."
        ];

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 46, 92);

        projects.forEach((item, idx) => {
          const yPos = 122 + idx * 11;
          drawBullet(16, yPos);
          doc.text(item, 22, yPos);
        });

        // ================= PAGE 3: CONSULTANCY =================
        doc.addPage();
        drawHeaderFooter(3);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(15, 46, 92);
        doc.text("Consultancy:-", 15, 48);

        // Underline title
        doc.setDrawColor(227, 168, 19);
        doc.setLineWidth(0.8);
        doc.line(15, 51, 50, 51);

        const consultancyItems = [
          "Central & State subsidy as per eligibility of the project.",
          "Special Rate of Electricity Duty (5% instead of 12.5 / 15% for Electrical Melting Furnaces).",
          "Registration & Renewal of Own Power Generating Plant (Turbo Generator / Diesel Generator / Captive Power Plant).",
          "Directorate of Electricity (DOE) – Approval / Renewal / Permission.",
          "Designing & Engineering of Power & Distribution System of the Plant / Project.",
          "Synchronization of power generating plant with grid (NOC from Power Supply Authority) & Agreement with Electricity Supply Companies.",
          "New Power Connection for newly setup industries (Construction & Permanent Power) including amendment of Power Agreement with power supply companies.",
          "Factory License Approval Including General layout & other Drawings required for Factory Inspectorate.",
          "Cost & Energy Reduction in plant including monthly Electricity bills.",
          "Energy Audit.",
          "Statutory License – State Water Investigation Directorate (SWID)."
        ];

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(15, 46, 92);

        let currentY = 59;
        consultancyItems.forEach((item) => {
          drawBullet(16, currentY);
          const splitItem = doc.splitTextToSize(item, 170);
          doc.text(splitItem, 22, currentY);
          // dynamically compute next spacing based on wrapped height
          currentY += (splitItem.length * 4.5) + 5;
        });

        // ================= PAGE 4: TRADING =================
        doc.addPage();
        drawHeaderFooter(4);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(15, 46, 92);
        doc.text("Trading:-", 15, 48);

        // Underline title
        doc.setDrawColor(227, 168, 19);
        doc.setLineWidth(0.8);
        doc.line(15, 51, 38, 51);

        const tradingItems = [
          "Electrical Panels (Control Panel – Automatic Power Factor Controlling Panel (APFC), and any type of Electrical panels.",
          "Lightning Arrestor (LA), Earthing Equipment.",
          "Measuring Instruments.",
          "Other Electrical Equipment (Industrial & Domestic).",
          "Transformers (up to 5MVA, 33KV).",
          "Safety Equipment."
        ];

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 46, 92);

        currentY = 59;
        tradingItems.forEach((item) => {
          drawBullet(16, currentY);
          const splitItem = doc.splitTextToSize(item, 170);
          doc.text(splitItem, 22, currentY);
          currentY += (splitItem.length * 5) + 6;
        });

        // ================= PAGE 5: OUR CLIENTS & CONTACT INFO =================
        doc.addPage();
        drawHeaderFooter(5);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(15, 46, 92);
        doc.text("Our Clients:-", 15, 48);

        // Underline title
        doc.setDrawColor(227, 168, 19);
        doc.setLineWidth(0.8);
        doc.line(15, 51, 48, 51);

        // List 23 clients in elegant columns
        const clientsCol1 = [
          "1. HUSTON (INDIA) PVT. LTD.",
          "2. JSR Grain Energy Pvt. Ltd.",
          "3. SHIW",
          "4. VIKAS GROUP",
          "5. NSI (INDIA) LTD.",
          "6. NIPHA",
          "7. STAR CEMENT",
          "8. RBA Ferro",
          "9. RBA Exports Private Limited",
          "10. ADI / AEI",
          "11. RUPA",
          "12. CRESCENT"
        ];

        const clientsCol2 = [
          "13. Kejriwal CASTINGS LIMITED",
          "14. THE SUKHJIT STARCH",
          "15. ADAK METCAST",
          "16. LOCO CASTINGS Pvt. Ltd.",
          "17. TEESTA AGRO INDUSTRIES LTD.",
          "18. ARIS FOUNDRY",
          "19. LASER POWER & INFRA",
          "20. EDIBLE GROUP",
          "21. PCPL",
          "22. PAHARPUR",
          "23. mallcom"
        ];

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(40, 50, 70);

        clientsCol1.forEach((client, idx) => {
          const yPos = 58 + idx * 8.5;
          doc.text(client, 18, yPos);
        });

        clientsCol2.forEach((client, idx) => {
          const yPos = 58 + idx * 8.5;
          doc.text(client, 110, yPos);
        });

        // Contact segment block container at the bottom
        doc.setFillColor(15, 46, 92); // Deep corporate blue background
        doc.rect(15, 172, 180, 50, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text("CONTACT DETAILS", 22, 182);

        // Golden marker line inside contact box
        doc.setFillColor(227, 168, 19);
        doc.rect(22, 184, 30, 1, 'F');

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.text("Phone: +91 91237 71662 / +91 98765 43210", 22, 192);
        doc.text("Email: candelaengineering.service2016@gmail.com", 22, 200);
        doc.text("Address: Danesh Sk. Lane, Shibpur, Howrah - 711109, West Bengal.", 22, 208);

        // Save PDF brochure
        doc.save('Candela_Engineering_Corporate_Brochure.pdf');

        setDownloadState('success');
        setTimeout(() => setDownloadState('idle'), 3000);
      } catch (err) {
        console.error("PDF generation failed:", err);
        setDownloadState('idle');
      }
    }, 1200);
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-slate-950 via-ces-blue to-slate-950 text-white overflow-hidden py-20 lg:py-28">
      {/* Professional Polish structural 12-column grid visual wireframe */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
          <div className="border-r border-slate-300"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy Panel */}
        <motion.div 
          className="lg:col-span-7 flex flex-col space-y-6 text-left relative z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-ces-accent/10 border border-ces-accent/30 px-3.5 py-1.5 rounded-sm text-xs font-bold tracking-widest text-ces-accent uppercase max-w-max">
            <ShieldCheck className="w-4 h-4 text-ces-accent" />
            <span>Govt. Electrical License Holder</span>
          </div>

          <h1 className="font-gothic font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ces-accent to-slate-100">
              CANDELA
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ces-accent to-slate-100">
              Group
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Premier Engineering & Financial Consultant supporting the setup and operation of heavy industries in West Bengal since 2016. End-to-end solutions for Turnkey Electrification, Regulatory Compliance, and High-Tension Equipment Supply.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleAction('services')}
              className="bg-white text-ces-blue hover:bg-slate-100 px-8 py-3.5 font-bold text-sm uppercase tracking-wider rounded-sm shadow-lg shadow-black/20 transition-all duration-300 flex items-center space-x-2 group cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-ces-blue transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleAction('contact')}
              className="border border-white text-white hover:bg-white/10 px-8 py-3.5 font-bold text-sm uppercase tracking-wider rounded-sm transition-all duration-300 cursor-pointer"
            >
              Request Quote
            </button>
            <button
              onClick={handleDownloadProfile}
              disabled={downloadState === 'downloading'}
              className="border border-ces-accent/60 text-ces-accent hover:border-ces-accent hover:bg-ces-accent/10 px-6 py-3.5 font-bold text-sm uppercase tracking-wider rounded-sm transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              title="Download full Corporate Profile (PDF Brochure spec sheet)"
            >
              <ArrowDownToLine className={`w-4 h-4 text-ces-accent ${downloadState === 'downloading' ? 'animate-bounce' : ''}`} />
              <span>
                {downloadState === 'downloading' ? 'Downloading...' : downloadState === 'success' ? 'Brochure Saved ✓' : 'Download Profile'}
              </span>
            </button>
          </div>

          {/* Core Service Pillar Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Consultancy</span>
              <span className="text-xs text-slate-400">Subsidies & Licensing</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Project</span>
              <span className="text-xs text-slate-400">Design & Build</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Trading</span>
              <span className="text-xs text-slate-400">Power Equipment</span>
            </div>
          </div>
        </motion.div>

        {/* Right Graphical Visual Panel */}
        <motion.div 
          className="lg:col-span-5 relative w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative frame elements to make the visual super premium */}
          <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-slate-800">
            {/* Main high quality industrial image depicting sunset transmission line */}
            <img
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
              alt="Industrial High Voltage Power Grid and Transmission Lines at sunset"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
            {/* Elegant deep-blue to transparent overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>

            {/* Float Stats Badge 1: 2016-Present */}
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-lg flex items-center space-x-3 shadow-lg">
              <div className="bg-ces-accent/20 p-2 rounded-md">
                <Zap className="w-5 h-5 text-ces-accent" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">ESTABLISHED</p>
                <p className="text-base font-bold text-white">Since 2016</p>
              </div>
            </div>

            {/* Float Stats Badge 2: Clients served */}
            <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-lg flex items-center space-x-3 shadow-lg">
              <div className="bg-amber-500/10 p-2.5 rounded-md">
                <BarChart3 className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">CLIENT PORTFOLIO</p>
                <p className="text-base font-bold text-white">23+ Heavy Industries</p>
              </div>
            </div>

            {/* Government electrical license number text banner on the card bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 border-t border-slate-800 py-3 px-4 text-xs font-mono text-slate-400 flex justify-between">
              <span>GOVT LICENSE: WEST BENGAL</span>
              <span className="text-ces-accent font-bold">ACTIVE STATE APPROVED</span>
            </div>
          </div>

          {/* Underlay glowing rings to simulate power waves */}
          <div className="absolute -z-10 -bottom-10 -right-10 w-72 h-72 bg-ces-accent/15 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 -top-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
