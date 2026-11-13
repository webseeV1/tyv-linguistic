import Link from "next/link";
import type { ComponentProps, MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-tyv-sky text-white hover:bg-tyv-sky/90 hover:shadow-lg hover:shadow-tyv-sky/30 active:scale-[0.98]",
  outline:
    "border-2 border-tyv-navy text-tyv-navy hover:bg-tyv-navy hover:text-white active:scale-[0.98]",
  "outline-light":
    "border-2 border-white/80 text-white hover:bg-white hover:text-tyv-navy active:scale-[0.98]",
  ghost: "text-tyv-navy hover:bg-tyv-navy/5",
};

// min-h ≥ 48px sur mobile = touch target accessible
const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-base",
  lg: "min-h-12 px-8 py-3.5 text-base sm:text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  // Type onClick unifié pour les deux variantes (lien / bouton) afin que
  // l'inférence du paramètre `e` fonctionne au point d'appel.
  onClick?: MouseEventHandler<HTMLElement>;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "onClick">;

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "onClick"> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, ...rest } =
      props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...(rest as React.ComponentProps<"a">)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
