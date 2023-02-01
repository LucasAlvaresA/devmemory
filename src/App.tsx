import React from "react";
import * as Styled from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridItem } from "./components/GridItem";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { formatTime } from "./helpers/formatTime";

const App = () => {
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = React.useState<number>(0);
  const [moveCount, setMoveCount] = React.useState<number>(0);
  const [shownCount, setShownCount] = React.useState<number>(0);
  const [gridItems, setGridItems] = React.useState<GridItemType[]>([]);

  React.useEffect(() => resetAndCreateGrid(), []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // Verify if opened are equal
  React.useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {
        // If both are equal, make every shown permanent
        if(opened[0].item === opened[1].item) {
          let tempGrid = [...gridItems];
          for(let i in tempGrid) {
            if(tempGrid[i].shown) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }
          }
          setGridItems(tempGrid);;
          setShownCount(0);
          // if they are NOT equal, close all shown
        } else {
          setTimeout(() => {
            let tempGrid = [...gridItems];
            for (let i in tempGrid) {
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);;
            setShownCount(0);
          }, 1000)
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItems]);

  // Verify if game is over
  React.useEffect(() => {
    if (moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems])

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
    if (playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItems];

      if(!tempGrid[index].permanentShown && !tempGrid[index].shown) {
        tempGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tempGrid);
    } 
  }

  return (
    <Styled.Container>
      <Styled.Info>
        <Styled.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </Styled.LogoLink>

        <Styled.InfoArea>
          <InfoItem label="Time" value={formatTime(timeElapsed)} />
          <InfoItem label="Moves" value={moveCount.toString()} />
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