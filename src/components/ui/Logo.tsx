import Image from "next/image";

type LogoProps = {
  /** true quand le logo est posé sur un fond sombre → rendu en blanc */
  onDark?: boolean;
  /** "mark" = TYV + globe (navbar) · "full" = logo complet avec baseline (footer) */
  variant?: "mark" | "full";
  className?: string;
  priority?: boolean;
};

const SOURCES = {
  mark: { src: "/images/tyv-logo-mark.png", width: 729, height: 273 },
  full: { src: "/images/tyv-logo.png", width: 729, height: 373 },
} as const;

export function Logo({
  onDark = false,
  variant = "mark",
  className,
  priority = false,
}: LogoProps) {
  const { src, width, height } = SOURCES[variant];
  const image = (
    <Image
      src={src}
      alt="TYV — Linguistic Travel & Study Programs"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );

  if (!onDark) return image;

  // Sur fond sombre : le logo garde ses couleurs d'origine (globe + avion bleus),
  // posé sur un cartouche blanc — demande explicite du client.
  return (
    <span className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 shadow-sm">
      {image}
    </span>
  );
}
