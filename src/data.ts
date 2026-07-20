import { ProjectItem, ConsultancyItem, TradingItem, ClientItem } from './types';

export const COMPANY_DETAILS = {
  name: 'Candela Group',
  abbreviation: 'CES',
  tagline: 'Engineering & Financial Consultant',
  founded: 2016,
  ceo: 'Sayan Biswas',
  ceoTitle: 'Chief Executive Officer',
  credentials: ['Govt. Electrical License Holder', 'Industrial Engineering Consultant', 'Financial Subsidy Specialists'],
  phone: '+91 91237 71662',
  email: 'candelaengineering.service2016@gmail.com',
  address: 'Danesh Sk Lane, H79X+8XW, Padmapukur, Shibpur, Howrah, West Bengal 711109',
  website: 'candelaes.in',
  description: 'CANDELA GROUP is a premier Engineering & Financial consultant for setting up of Industries in West Bengal. We are currently giving services to our valuable clients since 2016.',
  mission: 'To provide feasible technical solutions for engineering purposes and deliver our services to our valuable clients with the highest level of satisfaction. We are committed to serving customers with top-notch services for different types of industries while facilitating extraordinary growth and sustainable profitability with cutting-edge standards.',
  vision: 'To be the most trusted name in industrial engineering and financial consultancy in India, recognized for integrity, regulatory expertise, and innovative technical designs that empower industries to flourish sustainably.'
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Electrical Projects',
    category: 'Turnkey Execution',
    description: 'End-to-end execution of complex industrial electrical installations, substation erection, and layout designs.',
    specs: ['Substation erection up to 33KV', 'HT & LT cable laying & termination', 'Industrial load distribution planning', 'Single Line Diagram (SLD) designing']
  },
  {
    id: 'p2',
    title: 'Electrification Work',
    category: 'Industrial & Commercial',
    description: 'Comprehensive internal and external electrification work for greenfield and Brownfield manufacturing units and process plants.',
    specs: ['Cable tray installation & structural support', 'Lighting layouts (Indoor, Outdoor & High-mast)', 'UPS & battery bank installation']
  },
  {
    id: 'p3',
    title: 'Electrical Maintenance Work',
    category: 'Utility Management',
    description: 'Preventive and corrective maintenance services for high-voltage and low-voltage electrical distribution networks.',
    specs: ['Transformer health assessment & oil filtration', 'Relay testing & calibration', 'Thermal imaging of panels and joints', 'Earth resistance measurement & testing']
  },
  {
    id: 'p4',
    title: 'Annual Maintenance Contract (AMC) of Electrical Installations',
    category: 'Operations & Maintenance',
    description: 'Customizable O&M contracts for industrial and commercial installations, ensuring zero downtime and complete statutory compliance.',
    specs: ['24/7 on-call technical team support', 'Periodic safety audits and compliance checks', 'Shutdown maintenance and restoration planning', 'Logbook maintenance & statutory reporting']
  },
  {
    id: 'p5',
    title: 'Engineering for Green field & Brown Field projects',
    category: 'Engineering & Design',
    description: 'Comprehensive engineering planning, conceptualization, detailed engineering, and expansion modeling for new and existing factories.',
    specs: ['Feasibility study & capacity estimation', 'Relocation & utility expansion mapping', 'Retrofitting of modern control systems', 'As-built drawing generation & CAD design']
  },
  {
    id: 'p6',
    title: 'Solar Power Project',
    category: 'Renewable Energy',
    description: 'Erection, commissioning, and integration of grid-interactive and off-grid solar photovoltaic systems for industrial roofs and fields.',
    specs: ['Solar resource assessment & shadow analysis', 'Net-metering & grid connectivity coordination', 'Inverter and panel integration planning', 'ROI estimation & subsidy documentation']
  }
];

export const CONSULTANCY_DATA: ConsultancyItem[] = [
  {
    id: 'c1',
    title: 'Central & State subsidy as per eligibility of the project',
    category: 'Financial Advisory',
    description: 'End-to-end guidance and processing of central and state industrial policies, incentive schemes, and financial subsidies.',
    benefits: ['Capital investment subsidy mapping', 'Interest subvention scheme processing', 'Employment-linked incentives facilitation', 'Documentation & representation to departments']
  },
  {
    id: 'c2',
    title: 'Special Rate of Electricity Duty',
    category: 'Utility Advisory',
    description: 'Processing for special concessional rate of electricity duty (5% instead of 12.5% / 15% standard rate) specifically for Electrical Melting Furnaces.',
    benefits: ['Substantial reduction in monthly smelting bills', 'Audit of past electricity consumption and duty paid', 'Liaison with Power & Energy departments', 'Continuous compliance monitoring']
  },
  {
    id: 'c3',
    title: 'Registration & Renewal of Own Power Generating Plant',
    category: 'Regulatory Licensing',
    description: 'Complete registration, inspection coordination, and periodic renewal of captive power generation assets like Turbo Generators, Diesel Generators, and Captive Power Plants.',
    benefits: ['Liaison with CEA/State Electricity authorities', 'Preparation of load flow & technical specification reports', 'Safety approval from electrical inspectorate', 'Timely compliance alerts and automatic renewals']
  },
  {
    id: 'c4',
    title: 'Directorate of Electricity (DOE) – Approval / Renewal / Permission',
    category: 'Regulatory Licensing',
    description: 'Securing necessary approvals, installation permissions, and safety certificates from the Directorate of Electricity (DOE) for industrial setups.',
    benefits: ['Drawing approvals for HV/EHV installations', 'Safety certificate for commissioning equipment', 'Regulatory dispute resolution support', 'Speedy file processing and liaison']
  },
  {
    id: 'c5',
    title: 'Designing & Engineering of Power & Distribution System of the Plant / Project',
    category: 'Engineering Design',
    description: 'Engineering layout, single line diagrams, relay coordination studies, fault level calculations, and active distribution design.',
    benefits: ['Optimized cable sizing to minimize line losses', 'Reliable relay setting and trip coordination', 'Power flow simulation & load balancing', 'Energy-efficient transformer selection']
  },
  {
    id: 'c6',
    title: 'Synchronization of power generating plant with grid',
    category: 'Utility Advisory',
    description: 'Getting NOC from Power Supply Authority and drawing legal agreements with electricity distribution companies for captive power plant synchronization.',
    benefits: ['Technical stability checks prior to grid linkage', 'NOC acquisition from State Discoms', 'PPA (Power Purchase Agreement) consultation', 'Grid connectivity engineering planning']
  },
  {
    id: 'c7',
    title: 'New Power Connection for newly setup industries',
    category: 'Utility Advisory',
    description: 'Facilitating connection process for Construction Power and Permanent Power, including managing amendments in Power Agreements with electricity supply companies.',
    benefits: ['Optimized contract demand calculation', 'Application filing & deposit coordination', 'Execution of power purchase & supply contracts', 'Timely connection tracking']
  },
  {
    id: 'c8',
    title: 'Factory License Approval Including General layout & other Drawings',
    category: 'Regulatory Licensing',
    description: 'Drafting general assembly, process layout, structural ventilation plans, and representing files to the Factory Inspectorate for approval.',
    benefits: ['Precise CAD drawings matching Inspectorate standards', 'Compliance check with local Factory Acts & Safety norms', 'Fast-track processing & site visits planning', 'Structural stability certificate co-ordination']
  },
  {
    id: 'c9',
    title: 'Cost & Energy Reduction on monthly Electricity bills',
    category: 'Optimization Services',
    description: 'Audit of billing tariff structures, power factor maintenance optimization, maximum demand control, and phase correction.',
    benefits: ['Reduction in high-demand penalty charges', 'Optimal capacitor bank design for near-unity PF', 'Tariff category optimization analysis', 'Significant reduction in utility operational costs']
  },
  {
    id: 'c10',
    title: 'Energy Audit',
    category: 'Optimization Services',
    description: 'Comprehensive energy audit by certified personnel to identify areas of energy dissipation and map low-cost & high-ROI saving opportunities.',
    benefits: ['Detailed thermal & electrical energy audit reports', 'Specific energy consumption bench-marking', 'Carbon footprint analysis', 'Financially viable energy saving recommendations']
  },
  {
    id: 'c11',
    title: 'Statutory License – State Water Investigation Directorate (SWID)',
    category: 'Regulatory Licensing',
    description: 'Liaison and acquisition of statutory permissions/licenses for groundwater extraction and tube-well sinkings from SWID.',
    statutoryAgency: 'State Water Investigation Directorate (SWID), Govt. of West Bengal',
    benefits: ['Groundwater feasibility assessment coordination', 'SWID application preparation & hydrogeological reports', 'No-Objection Certificate (NOC) extraction', 'Water recycling and rainwater harvesting design advisory']
  }
];

export const TRADING_DATA: TradingItem[] = [
  {
    id: 't1',
    title: 'Electrical Panels',
    category: 'Switchgear & Panels',
    description: 'Supply of customized, high-quality, CPRI-tested electrical panels including APFC, PCC, MCC, and AMF panels.',
    specifications: [
      'Automatic Power Factor Controlling (APFC) Panels',
      'Power Control Center (PCC) Panels (up to 6300A)',
      'Motor Control Center (MCC) Panels (Draw-out & Non draw-out)',
      'Feeder Pillars & Busduct structures'
    ]
  },
  {
    id: 't2',
    title: 'Lightning Arrestor (LA) & Earthing Equipment',
    category: 'Protection Systems',
    description: 'Advanced lightning protection and modern maintenance-free earthing accessories for residential and heavy industrial use.',
    specifications: [
      'Chemical Earthing Electrodes (Copper bonded & GI)',
      'Earth Enhancing Compounds (Bentonite & carbon-based)',
      'Conventional & ESE Lightning Arrestors',
      'Copper and GI grounding flats & wires'
    ]
  },
  {
    id: 't3',
    title: 'Measuring Instruments',
    category: 'Metrology & Testing',
    description: 'High-precision, calibrated digital and analog measuring instruments for operational control and energy monitoring.',
    specifications: [
      'Multi-function Energy Meters (MFM) with RS485 communication',
      'Digital Ammeters, Voltmeters, & Frequency meters',
      'CTs (Current Transformers) and PTs (Potential Transformers) of class 0.2s/0.5s',
      'Portable testing meters (Megger, Earth Tester, Multimeter)'
    ]
  },
  {
    id: 't4',
    title: 'Other Electrical Equipment (Industrial & Domestic)',
    category: 'Consumables & Spares',
    description: 'Wholesale trading and supply of standard industrial cabling, switchgear components, protection relays, and domestic utility fittings.',
    specifications: [
      'FRLS & armoured cables (Polycab, Finolex, Havells)',
      'MCCBs, MCBs, RCCBs, & Contactors of leading brands (L&T, Siemens, ABB)',
      'Industrial plugs, sockets, and distribution boxes',
      'LED lighting and energy-saving fixtures'
    ]
  },
  {
    id: 't5',
    title: 'Transformers (up to 5MVA, 33KV)',
    category: 'Power Transmission',
    description: 'Premium distribution and power transformers built to strict BIS and BEE standards with high thermal stability and low no-load losses.',
    specifications: [
      'Oil-cooled Distribution Transformers (up to 5MVA, 11KV/33KV)',
      'Dry Type (Cast Resin) Transformers for indoor installations',
      'On-Load Tap Changer (OLTC) and Off-Circuit Tap Changer integration',
      'Standard low-loss core CRGO sheet configuration'
    ]
  },
  {
    id: 't6',
    title: 'Safety Equipment',
    category: 'Industrial Safety',
    description: 'Ensuring absolute occupational safety with certified protective apparel, rubber mats, insulation kits, and shock-treatment tools.',
    specifications: [
      'High-voltage insulating rubber mats (Class A/B/C as per IS 15652)',
      'Electrical safety hand gloves (tested up to 33KV)',
      'Arc Flash protective suits and helmets',
      'Discharge rods and insulated rescue hooks'
    ]
  }
];

export const CLIENTS_DATA: ClientItem[] = [
  // Food Agriculture Industry
  { id: 'cl2', name: 'JSR Grain Energy Pvt. Ltd.', subtitle: '', industry: '' },
  { id: 'cl14', name: 'THE SUKHJIT STARCH AND CHEMICALS LIMITED', subtitle: 'Evolving with Nature', industry: 'Food Agriculture Industry' },
  { id: 'cl17', name: 'TEESTA AGRO INDUSTRIES LTD.', subtitle: 'Fertilizers & Chemicals', industry: 'Food Agriculture Industry' },
  { id: 'cl20', name: 'EDIBLE GROUP', subtitle: 'Refined Oils & FMCG', industry: 'Food Agriculture Industry' },

  // Jute & Textile Industry
  { id: 'cl11', name: 'RUPA', subtitle: 'Rupa & Company Ltd', industry: 'Jute & Textile Industry' },
  { id: 'cl23', name: 'mallcom', subtitle: 'Personal Protective Equipment', industry: 'Jute & Textile Industry' },

  // Iron & Steel Industry
  { id: 'cl1', name: 'HUSTON (INDIA) PVT. LTD.', subtitle: 'Heavy Machinery & Structurals', industry: 'Iron & Steel Industry' },
  { id: 'cl3', name: 'SHIW', subtitle: 'Iron & Steel Castings', industry: 'Iron & Steel Industry' },
  { id: 'cl5', name: 'NSI (INDIA) LTD.', subtitle: 'Engineering & Castings', industry: 'Iron & Steel Industry' },
  { id: 'cl6', name: 'NIPHA', subtitle: 'Expanding Horizons, Upholding Values', industry: 'Iron & Steel Industry' },
  { id: 'cl8', name: 'RBA Ferro', subtitle: 'Consultation - Engineering - Delivery', industry: 'Iron & Steel Industry' },
  { id: 'cl10', name: 'AEI', subtitle: 'Associated Engineering Industries', industry: 'Iron & Steel Industry' },
  { id: 'cl13', name: 'Kejriwal CASTINGS LIMITED', subtitle: 'Foundry & Cast Iron Pipes', industry: 'Iron & Steel Industry' },
  { id: 'cl15', name: 'ADAK METCAST', subtitle: 'Precision Metallurgical Castings', industry: 'Iron & Steel Industry' },
  { id: 'cl16', name: 'LOCO CASTINGS Pvt. Ltd.', subtitle: 'Railway Castings & Components', industry: 'Iron & Steel Industry' },
  { id: 'cl18', name: 'ARIS FOUNDRY', subtitle: 'Casting Satisfaction, Moduling Trust', industry: 'Iron & Steel Industry' },

  // Chemical, Paper, Leather & Others Industry
  { id: 'cl4', name: 'VIKAS GROUP', subtitle: 'Industrial Infrastructure', industry: 'Chemical, Paper, Leather & Others Industry' },
  { id: 'cl7', name: 'STAR CEMENT', subtitle: 'Solid Setting', industry: 'Chemical, Paper, Leather & Others Industry' },
  { id: 'cl9', name: 'RBA Exports Private Limited', subtitle: 'International Trading', industry: 'Chemical, Paper, Leather & Others Industry' },
  { id: 'cl12', name: 'CRESCENT', subtitle: 'Industrial Utilities & Chemicals', industry: 'Chemical, Paper, Leather & Others Industry' },
  { id: 'cl19', name: 'LASER POWER & INFRA', subtitle: 'Power Cables & Infrastructure', industry: 'Chemical, Paper, Leather & Others Industry' },
  { id: 'cl21', name: 'PCPL', subtitle: 'Chemicals & Plastics', industry: 'Chemical, Paper, Leather & Others Industry' },
  { id: 'cl22', name: 'PAHARPUR', subtitle: 'Cooling Towers & Heat Exchangers', industry: 'Chemical, Paper, Leather & Others Industry' }
];
