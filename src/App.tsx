import React from "react";
import * as Styled from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridItem } from "./components/GridItem";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";

const App = () => {
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = React.useState<number>(0);
  const [moveCount, setMoveCount] = React.useState<number>(0);
  const [shownCount, setShownCount] = React.useState<number>(0);
  const [gridItems, setGridItems] = React.useState<GridItemType[]>([]);

  React.useEffect(() => resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    // reset game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // create empty grid
    let tempGrid: GridItemType[] = [];
    for(let i = 0; i < (items.length * 2); i++) {
      tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }

    // fill grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < (items.length); i++) {
        let pos = -1;
        while( pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }

    setGridItems(tempGrid)

    // start game
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    
  }

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
        <Styled.Grid>
          {gridItems.map((item, index) => (
            <GridItem 
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </Styled.Grid>
      </Styled.GridArea>
    </Styled.Container>
  )
}

export default App;