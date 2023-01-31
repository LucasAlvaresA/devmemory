import * as Styled from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import { InfoItem } from "./components/InfoItem";

const App = () => {
  return (
    <Styled.Container>
      <Styled.Info>
        <Styled.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </Styled.LogoLink>

        <Styled.InfoArea>
          <InfoItem label="Tempo" value="00:00" />
          <InfoItem label="Movimentos" value="0" />
        </Styled.InfoArea>

        <button>Reiniciar</button>
      </Styled.Info>
      <Styled.GridArea>
        ...
      </Styled.GridArea>
    </Styled.Container>
  )
}

export default App;