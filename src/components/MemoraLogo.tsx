const MemoraLogo = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M15 85 L35 40 L50 65 L65 40 L85 85 Z" 
        fill="currentColor" 
        opacity="0.8"
      />
      <path 
        d="M25 85 L40 50 L50 70 L60 50 L75 85 Z" 
        fill="currentColor" 
        opacity="0.6"
      />
    </svg>
  );
};

export default MemoraLogo;