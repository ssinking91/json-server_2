import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ProdDataType } from './TabThree';

type ToggleProps = {
  ProdData: ProdDataType;
  handleAddPrice: (price: number, choice: boolean) => void;
  handlePostData: (obj: ProdDataType, choice: boolean) => void;
};

const Toggle = ({ ProdData, handleAddPrice, handlePostData }: ToggleProps) => {
  const { name, canBuy, price } = ProdData;

  const [toggle, setToggle] = useState(false);

  //<input type="checkbox">의 체크 여부를 확인하고 싶다면 event.target.checked를 사용
  const handleToggle = useCallback(
    (e: any) => {
      e.stopPropagation();
      setToggle(() => e.target.checked);
      handleAddPrice(price, toggle);
      handlePostData(ProdData, toggle);
    },
    [ProdData, handleAddPrice, handlePostData, price, toggle],
  );

  return (
    <Container>
      <Switch>
        <SwitchCheckbox
          type="checkbox"
          className="switchCheckbox"
          id={name}
          onChange={handleToggle}
          disabled={canBuy ? false : true}
        />
        <SwitchLabel
          className="SwitchLabel"
          htmlFor={name}
          // active={toggle}
        >
          <Switchball className="Switchball" />
        </SwitchLabel>
      </Switch>
    </Container>
  );
};

export default Toggle;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SwitchCheckbox = styled.input`
  display: none;
  &:checked + .SwitchLabel .Switchball {
    transform: translateX(3rem);
  }
  &:checked + .SwitchLabel {
    background-position: left;
    background: linear-gradient(to right, #20d7ff 50%, #e9e9e9 50%) left;
    background-size: 200%;
    transition: all 0.3s linear;
  }
`;

const SwitchLabel = styled.label`
  position: relative;
  width: 6rem;
  height: 2.6rem;
  border-radius: 5rem;
  cursor: pointer;
  background-position: right;
  background: linear-gradient(to left, #e9e9e9 50%, #20d7ff 50%) right;
  background-size: 200%;
  transition: all 0.3s linear;
`;

const Switchball = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  top: 0.3rem;
  left: 0.5rem;

  transition: transform 0.3s linear;

  background-color: white;
`;
