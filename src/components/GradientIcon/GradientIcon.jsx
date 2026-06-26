const GradientIcon = ({ id, children }) => {
    const gradientId = `gradient-stroke-${id}`;
  
    return (
      <svg
        className="w-5 h-5 mr-2 mt-0.5"
        fill="none"
        stroke={`url(#${gradientId})`}
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {/* The first stop uses your Primary color */}
            <stop offset="0%" stopColor="var(--primary)" />
            {/* The second stop can be a lighter version or the same primary for a subtle effect */}
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
  
        {children}
      </svg>
    );
  };
  
  export default GradientIcon;