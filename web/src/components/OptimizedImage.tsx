import Image, { ImageProps } from 'next/image';
import { blurPlaceholders, type BlurPlaceholderKey } from '@/lib/blur-placeholders';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL'> {
  /** Image identifier for optimized loading */
  imageKey: 'acta-logo' | 'acta-card';
  /** Size variant for responsive loading */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Enable blur placeholder for better UX */
  useBlurPlaceholder?: boolean;
}

const imagePaths = {
  'acta-logo': {
    sm: '/images/acta_logo/acta-logo-24.avif',
    md: '/images/acta_logo/acta-logo-48.avif', 
    lg: '/images/acta_logo/acta-logo-96.avif',
    xl: '/images/acta_logo/acta-logo-96.avif',
    fallback: '/Acta-logo.png'
  },
  'acta-card': {
    sm: '/images/acta_card/acta-card-sm.avif',
    md: '/images/acta_card/acta-card-md.avif',
    lg: '/images/acta_card/acta-card-lg.avif', 
    xl: '/images/acta_card/acta-card-lg.avif',
    fallback: '/ActaCard.png'
  }
} as const;

const blurKeys: Record<OptimizedImageProps['imageKey'], BlurPlaceholderKey> = {
  'acta-logo': 'actaLogo',
  'acta-card': 'actaCard'
};

export default function OptimizedImage({
  imageKey,
  size = 'md',
  useBlurPlaceholder = true,
  alt,
  ...props
}: OptimizedImageProps) {
  const imagePath = imagePaths[imageKey];
  const src = imagePath[size];
  
  const blurPlaceholder = useBlurPlaceholder ? {
    placeholder: 'blur' as const,
    blurDataURL: blurPlaceholders[blurKeys[imageKey]]
  } : {};

  return (
    <Image
      src={src}
      alt={alt}
      {...blurPlaceholder}
      {...props}
    />
  );
}