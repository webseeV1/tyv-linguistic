// Les contenus modifiés depuis /admin sont publiés immédiatement
// (régénération à la demande) ; ce délai n’est qu’un filet de sécurité.
export const revalidate = 60;

import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  return <HomeSections />;
}
