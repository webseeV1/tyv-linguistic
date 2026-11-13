/**
 * Lecture / écriture d'une valeur dans un objet via un chemin pointé
 * (« offres.blocs.0.phrase »). Utilisé par la surcouche de contenu éditable.
 */

type Indexable = Record<string, unknown> | unknown[];

const isIndexable = (v: unknown): v is Indexable =>
  typeof v === "object" && v !== null;

/** Valeur située à `path`, ou `undefined` si le chemin n'existe pas. */
export function getByPath(root: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!isIndexable(acc)) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, root);
}

/**
 * Copie de `root` dans laquelle `path` vaut `value`.
 * Les objets/tableaux traversés sont clonés (immuable) ; si le chemin
 * n'existe pas dans la structure d'origine, la valeur est ignorée.
 */
export function setByPath<T>(root: T, path: string, value: unknown): T {
  const keys = path.split(".");

  const walk = (node: unknown, depth: number): unknown => {
    const key = keys[depth];
    if (!isIndexable(node)) return node;

    const current = (node as Record<string, unknown>)[key];
    // Chemin inconnu dans la structure de référence → on n'invente rien.
    if (current === undefined) return node;

    const next = depth === keys.length - 1 ? value : walk(current, depth + 1);

    if (Array.isArray(node)) {
      const copy = node.slice();
      copy[Number(key)] = next;
      return copy;
    }
    return { ...(node as Record<string, unknown>), [key]: next };
  };

  return walk(root, 0) as T;
}
