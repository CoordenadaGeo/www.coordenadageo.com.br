import Image from 'next/image';
import clsx from 'clsx';

type Variant = 'principal' | 'horizontal' | 'branco' | 'horiz-branco';

const sources: Record<Variant, { src: string; width: number; height: number }> = {
  principal: { src: '/brand/logo-principal.png', width: 360, height: 360 },
  horizontal: { src: '/brand/logo-horizontal.png', width: 520, height: 140 },
  branco: { src: '/brand/logo-principal-branco.png', width: 360, height: 360 },
  'horiz-branco': { src: '/brand/logo-horizontal-branco.png', width: 520, height: 140 },
};

export default function Logo({
  variant = 'horizontal',
  className,
  priority = false,
}: {
  variant?: Variant;
  className?: string;
  priority?: boolean;
}) {
  const { src, width, height } = sources[variant];
  return (
    <Image
      src={src}
      alt="Coordenada Geo"
      width={width}
      height={height}
      priority={priority}
      className={clsx('w-auto', className)}
    />
  );
}
