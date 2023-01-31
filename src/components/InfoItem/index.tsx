import * as Styled from "./styles";

type Props = {
    label: string;
    value: string;
}

export const InfoItem = ({ label, value}: Props ) => {
    return (
        <Styled.Container>
            <Styled.Label>{label}</Styled.Label>
            <Styled.Value>{value}</Styled.Value>
        </Styled.Container>
    )
}