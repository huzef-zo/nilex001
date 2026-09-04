interface PlaceholderImageProps {
  className?: string;
}

export default function PlaceholderImage({ className = "" }: PlaceholderImageProps) {
  return (
    <div
      className={`flex items-center justify-center bg-nilex-navy-soft border border-nilex-gold/30 text-nilex-gold/70 text-xs font-mono uppercase tracking-luxe ${className}`}
    >
      Photo pending
    </div>
  );
}
