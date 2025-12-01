import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'dark';
  showText?: boolean;
}

export default function Logo({ className = '', variant = 'default', showText = true }: LogoProps) {
  // Check if logo image exists in public/images
  const hasLogoImage = true; // Logo now available in public/images/logo.svg

  if (hasLogoImage) {
    return (
      <Link href="/" className={`flex items-center ${className}`}>
        <Image
          src="/images/logo.svg"
          alt="InnoJSC Logo"
          width={150}
          height={50}
          priority
          className={`h-10 w-auto ${variant === 'dark' ? 'grayscale brightness-[3]' : ''}`}
        />
      </Link>
    );
  }

  // Text-based logo (fallback)
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {/* Icon/Monogram */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-red-700 text-white font-bold text-xl shadow-md">
          I
        </div>
        {/* Text */}
        {showText && (
          <div className="ml-3 flex items-baseline">
            <span className="text-2xl font-bold text-primary">InnoJSC</span>
            <span className="ml-2 text-lg font-light text-gray-700">Careers</span>
          </div>
        )}
      </div>
    </Link>
  );
}
