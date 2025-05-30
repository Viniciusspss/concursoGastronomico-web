import { DefaultHeader } from "@/components/DefaultHeader";
import { RestaurantHeader } from "@/components/RestaurantHeader";
import { useAppSelector } from "@/hooks/useAppSelector";

export function About() {
  const { user } = useAppSelector(state => state.auth)
  return (
    <div className="flex items-center flex-col gap-15 bg-gradient-to-b from-[var(--color-background)] to-[var(--text-foreground)] h-screen">
      {user && "email" in user ? <DefaultHeader /> : <RestaurantHeader />}
      <div className="flex w-[50%] flex-col gap-7 items-center">
        <h1 className="text-3xl text-[var(--text-primary)]">SOBRE NÓS</h1>
        <p className="text-[var(--text-foreground)]">
          O Cozinha Arretada é um projeto acadêmico desenvolvido com o objetivo
          de valorizar a gastronomia regional e dar visibilidade aos
          restaurantes locais, especialmente em cidades pequenas. Através desta
          plataforma, buscamos criar uma ponte entre os estabelecimentos e os
          consumidores, promovendo pratos típicos, incentivando a cultura
          alimentar da região e fortalecendo a conexão entre quem cozinha e quem
          aprecia uma boa comida.
        </p>
        <p className="text-[var(--text-foreground)]">
          Mais do que uma simples vitrine, o site funciona como um espaço de
          descoberta e interação: usuários podem se cadastrar, avaliar pratos,
          conhecer novos sabores e acompanhar um ranking dos restaurantes mais
          bem avaliados. Os estabelecimentos, por sua vez, ganham destaque,
          recebem feedbacks valiosos e têm a chance de competir em um concurso
          gastronômico que celebra o que há de melhor na culinária local.
        </p>
        <p className="text-[var(--text-foreground)]">
          Este projeto nasceu dentro de um contexto acadêmico, como parte de uma
          proposta universitária voltada ao desenvolvimento de soluções digitais
          com impacto social e cultural. Por isso, o Cozinha Arretada carrega
          consigo não apenas tecnologia, mas também propósito e afeto pela
          cozinha da nossa terra.
        </p>
      </div>
    </div>
  );
}
