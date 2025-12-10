import { BoxingGame } from "@/components/game/BoxingGame";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Boxing Bets - Apuestas de Boxeo Retro 8-Bit</title>
        <meta name="description" content="Juego de apuestas de boxeo estilo arcade 8-bit con un padre borracho que comenta tus jugadas. Elige tu boxeador, apuesta monedas virtuales y gana." />
      </Helmet>
      <BoxingGame />
    </>
  );
};

export default Index;
