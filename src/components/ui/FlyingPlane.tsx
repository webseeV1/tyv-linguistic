"use client";

import { Plane } from "lucide-react";

/**
 * Petit avion décoratif qui traverse la section Packs en sinusoïde.
 * 100 % CSS (transforms + z-index discret) → animation compositée, aucun
 * setInterval ni rAF. Passe alternativement devant / derrière les cards.
 */
export function FlyingPlane() {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-1/2 motion-reduce:hidden"
      aria-hidden="true"
    >
      <div className="tyv-plane-track absolute left-0 top-0">
        <div className="tyv-plane-wave">
          <a
            href="#contact"
            onClick={handleClick}
            title="Nous contacter"
            aria-label="Nous contacter"
            className="tyv-plane-link pointer-events-auto relative block cursor-pointer text-tyv-sky transition-colors hover:text-tyv-navy"
          >
            <Plane
              className="size-8 drop-shadow-sm sm:size-6"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
