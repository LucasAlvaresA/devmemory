import * as Styled from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";

const App = () => {

  const resetAndCreateGrid = () => {}

  return (
    <Styled.Container>
      <Styled.Info>
        <Styled.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </Styled.LogoLink>

        <Styled.InfoArea>
          <InfoItem label="Time" value="00:00" />
          <InfoItem label="Moves" value="0" />
        </Styled.InfoArea>

        <Button 
          icon={RestartIcon}
          label="Restart"
          onClick={resetAndCreateGrid}
        />
      </Styled.Info>
      <Styled.GridArea>
        ...
      </Styled.GridArea>
    </Styled.Container>
  )
}

export default App;