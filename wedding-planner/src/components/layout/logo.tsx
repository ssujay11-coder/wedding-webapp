import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  variant?: 'default' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { width: 32, height: 32, textSize: 'text-base', subtextSize: 'text-[8px]' },
    md: { width: 40, height: 40, textSize: 'text-xl', subtextSize: 'text-[10px]' },
    lg: { width: 56, height: 56, textSize: 'text-3xl', subtextSize: 'text-xs' },
  }

  const { width, height, textSize, subtextSize } = sizeClasses[size]

  return (
    <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
      <div className="relative">
        <Image
          src="/images/logo.png"
          alt="Elite Wedding Planner"
          width={width}
          height={height}
          priority
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <h2
          className={`font-display font-bold tracking-tight ${textSize} ${
            variant === 'light' ? 'text-white' :
            variant === 'dark' ? 'text-foreground' :
            'text-foreground'
          }`}
        >
          ELITE
        </h2>
        <p
          className={`${subtextSize} tracking-widest uppercase font-sans font-medium ${
            variant === 'light' ? 'text-white/90' :
            variant === 'dark' ? 'text-primary' :
            'text-primary'
          }`}
        >
          Wedding Planner
        </p>
      </div>
    </Link>
  )
}
