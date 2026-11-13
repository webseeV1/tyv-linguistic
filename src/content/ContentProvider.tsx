"use client";

import { createContext, useContext, useMemo } from "react";
import type { Overrides } from "./schema";
import { sharedFor } from "./apply";
import type { SharedContent } from "./shared";

/**
 * Transporte les contenus modifiés par TYV (lus côté serveur) jusqu'aux
 * composants client, qui continuent d'utiliser `useI18n()` sans changement.
 */
const OverridesContext = createContext<Overrides>({});

export function ContentProvider({
  overrides,
  children,
}: {
  overrides: Overrides;
  children: React.ReactNode;
}) {
  return (
    <OverridesContext.Provider value={overrides}>
      {children}
    </OverridesContext.Provider>
  );
}

export const useOverrides = (): Overrides => useContext(OverridesContext);

/** Visuels et coordonnées, valeurs TYV appliquées. */
export function useShared(): SharedContent {
  const overrides = useOverrides();
  return useMemo(() => sharedFor(overrides), [overrides]);
}
