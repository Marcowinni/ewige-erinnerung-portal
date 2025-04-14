
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

const FeatureCard = ({ icon: Icon, title, description, iconColor = "text-primary" }: FeatureCardProps) => {
  return (
    <div className="bg-card hover:shadow-lg transition-all duration-300 p-6 rounded-lg border border-border hover-scale">
      <div className={`${iconColor} mb-4`}>
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-serif mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
