import logo from "../assets/Candela_Logo.jpg";

interface CompanyLogoProps {
  className?: string;
}

export default function CompanyLogo({
  className = "w-20 h-20 object-contain",
}: CompanyLogoProps) {
  return (
    <img
      src={logo}
      alt="Candela Engineering & Services"
      className={className}
      draggable={false}
    />
  );
}
