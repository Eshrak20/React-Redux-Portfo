const TechBadge = ({ label, icon: Icon, className = "" }) => (
  <span
    className={`inline-flex cursor-default select-none items-center gap-1.5 border border-primary/20 bg-primary/10 font-medium text-primary ${className}`}
  >
    {Icon && <Icon size={13} />}
    <span>{label}</span>
  </span>
);

export default TechBadge;