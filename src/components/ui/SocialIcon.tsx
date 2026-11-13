import { SOCIAL_PATHS, type SocialKey } from "@/lib/socials";

export function SocialIcon({
  name,
  className,
}: {
  name: SocialKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  );
}
