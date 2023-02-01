import React from "react";
import * as Styled from "./styles";
import { GridItemType } from "../../types/GridItemType";
import b7Svg from "../../svgs/b7.svg";
import { items } from "../../data/items";

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <Styled.Container 
            onClick={onClick}
            showBackground={item.permanentShown || item.shown}
        >
            {!item.permanentShown && !item.shown &&
                <Styled.Icon src={b7Svg} alt="" opacity={.1} />
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <Styled.Icon src={items[item.item].icon} alt="" />
            }
        </Styled.Container>
    )
}