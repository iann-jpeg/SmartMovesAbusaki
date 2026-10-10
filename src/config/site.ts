/**
 * Central site configuration for SmartMoves Abusaki Group Limited.
 * Edit this single file to update company details, navigation, brands,
 * divisions, contact information and SEO defaults across the whole site.
 */

export const site = {
  name: "SmartMoves Abusaki Group Limited",
  shortName: "SmartMoves",
  tagline: "BUILDING BUSINESSES • CREATING OPPORTUNITIES.",
  description:
    "SmartMoves Abusaki Group Limited is a Kenyan business group focused on developing practical solutions through technology, publishing, education and business development.",
  url: "https://smartmovesabusaki.co.ke",
  contact: {
    email: "smda.official@outlook.com",
    phone: "+254 798761036",
    phoneHref: "+254798761036",
    address: "Nairobi, Kenya",
  },
  // Set these once verified URLs are available. Empty strings hide the links.
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
  },
  brands: {
    smdaUrl: "", // SMART MOVES DEVELOPMENT AGENCY website, when available
    booksUrl: "", // SmartMoves Books catalogue/website, when available
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Businesses", href: "/businesses" },
  { label: "SmartMoves Books", href: "/smartmoves-books" },
  { label: "Workshops", href: "/workshops" },
  { label: "Contact", href: "/contact" },
];

export type DivisionStatus = "Active" | "Developing" | "Planned";

export interface Division {
  id: string;
  name: string;
  status: DivisionStatus;
  showStatus: boolean;
  description: string;
  services: string[];
  audience: string;
  cta: { label: string; href: string };
}

export const divisions: Division[] = [
  {
    id: "technology",
    name: "Technology & Digital Solutions",
    status: "Active",
    showStatus: false,
    description:
      "We develop and support digital products, websites, software solutions and technology-enabled workflows that help businesses and institutions operate more effectively.",
    services: [
      "Website design and development",
      "Business web applications",
      "Workflow digitization",
      "Database and information-system solutions",
      "Technical consulting and system support",
    ],
    audience: "Businesses and institutions seeking practical digital solutions.",
    cta: { label: "Explore Digital Solutions", href: "/businesses#technology" },
  },
  {
    id: "publishing",
    name: "Publishing & Learning Resources",
    status: "Active",
    showStatus: false,
    description:
      "Through SmartMoves Books, we aim to make structured learning and revision resources more accessible to learners, educators and institutions.",
    services: [
      "Educational revision books",
      "Learning and assessment materials",
      "Digital publications",
      "Print-ready educational resources",
      "Institutional publishing projects",
    ],
    audience: "Learners, educators, schools and institutions.",
    cta: { label: "Explore SmartMoves Books", href: "/smartmoves-books" },
  },
  {
    id: "education",
    name: "Education & Capacity Building",
    status: "Developing",
    showStatus: false,
    description:
      "We support knowledge-sharing through workshops, short training sessions and practical learning experiences designed around real-world needs.",
    services: [
      "Digital literacy",
      "Business technology",
      "Entrepreneurship",
      "Productivity and digital tools",
      "Practical technology skills",
    ],
    audience: "Students, professionals, entrepreneurs and community groups.",
    cta: { label: "Enquire About Training", href: "/workshops" },
  },
  {
    id: "ventures",
    name: "Business Development & Future Ventures",
    status: "Developing",
    showStatus: false,
    description:
      "We explore opportunities to build, improve and support practical business ideas with the potential to create lasting value.",
    services: [
      "Business development",
      "Digital product innovation",
      "Strategic collaborations",
      "Venture development",
      "Future business opportunities",
    ],
    audience: "Collaborators, innovators and institutional partners.",
    cta: { label: "Discuss an Opportunity", href: "/contact?category=partnership" },
  },
];

export interface Brand {
  name: string;
  label: string;
  description: string;
  url: string; // empty = no external CTA shown
}

export const brands: Brand[] = [
  {
    name: "SMART MOVES DEVELOPMENT AGENCY",
    label: "Existing Operating Business",
    description:
      "SMART MOVES DEVELOPMENT AGENCY is the existing operating business associated with the SmartMoves identity. It provides the foundation for current business activities and service development.",
    url: site.brands.smdaUrl,
  },
  {
    name: "SmartMoves Books",
    label: "Publishing Brand",
    description:
      "SmartMoves Books focuses on educational publishing and the development of revision and learning resources for students, educators and institutions.",
    url: site.brands.booksUrl,
  },
];

export const enquiryCategories = [
  { value: "general", label: "General enquiry" },
  { value: "digital", label: "Digital solutions" },
  { value: "publishing", label: "Publishing / SmartMoves Books" },
  { value: "training", label: "Workshops and training" },
  { value: "partnership", label: "Partnership and business development" },
] as const;

export const seo = {
  defaultTitle:
    "SmartMoves Abusaki Group Limited | Technology, Publishing & Business Development",
  defaultDescription:
    "Discover SmartMoves Abusaki Group Limited, a Kenyan business group focused on digital solutions, educational publishing, practical learning and business development.",
} as const;
