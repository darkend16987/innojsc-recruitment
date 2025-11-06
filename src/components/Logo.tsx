import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'dark';
  showText?: boolean;
}

export default function Logo({ className = '', variant = 'default', showText = true }: LogoProps) {
  // Kiểm tra nếu có logo image trong public/images
  // Nếu không có, sẽ render text-based logo
  const hasLogoImage = false; // Set to true khi đã có logo.svg/png

  if (hasLogoImage) {
    return (
      <Link href="/" className={`flex items-center ${className}`}>
        <Image
          src={variant === 'dark' ? '/images/logo-dark.svg' : '/images/logo.svg'}
          alt="InnoJSC Logo"
          width={120}
          height={40}
          priority
          className="h-8 w-auto"
        />
      </Link>
    );
  }

  // Text-based logo (fallback)
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {/* Icon/Monogram */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-xl shadow-md">
          I
        </div>
        {/* Text */}
        {showText && (
          <div className="ml-3 flex items-baseline">
            <span className="text-2xl font-bold text-blue-600">InnoJSC</span>
            <span className="ml-2 text-lg font-light text-gray-700">Careers</span>
          </div>
        )}
      </div>
    </Link>
  );
}
