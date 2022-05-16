import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Skeleton from './Skeleton';
import Animation from './Animation';
import uglyUs from '../assets/uglyUs.png';

type ProdDataType = {
  id: number;
  vegetables: string[];
};

type TabThreeProps = {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

function TabThree({ setIndex }: TabThreeProps) {
  const [ProdData, setProdData] = useState<ProdDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFetchData = async () => {
    setProdData(null);
    setIsLoading(true);
    try {
      const { data, status, statusText } = await axios.get(`http://localhost:4000/cart`);

      if (status >= 400) {
        alert(`잘못된 요청입니다.🤢 statusText: ${statusText}`);
      } else if (status >= 500) {
        alert(`서버 에러입니다.🤢 statusText: ${statusText}`);
      }

      setProdData(data);
      setIsLoading(false);
    } catch (e: any) {
      alert(`에러가 발생했습니다.🤢 잠시후 다시 실행해 주세요. `);
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TabFourImg src={uglyUs} />
      <TabFourContainer>
        {isLoading ? (
          <Skeleton>
            <Skeleton.Item type="square" width={'55%'} height={'35vh'}></Skeleton.Item>
          </Skeleton>
        ) : (
          <Card>
            <h1>🎁 주문 완료</h1>
            {ProdData &&
              ProdData.length > 0 &&
              ProdData[ProdData.length - 1].vegetables.length > 0 &&
              ProdData[ProdData.length - 1].vegetables.map((el, idx) => {
                return <div key={el}>{`${idx + 1}. ${el}`}</div>;
              })}
            <CheckBtn onClick={() => setIndex(0)}>홈으로</CheckBtn>
          </Card>
        )}
        <Animation />
      </TabFourContainer>
    </>
  );
}

export default TabThree;

const TabFourImg = styled.img`
  width: 50%;
  height: auto;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  @keyframes TabFourImgfadeInBtn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotateY(0deg);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) rotateY(360deg);
    }
  }

  animation: TabFourImgfadeInBtn 2.25s ease;
`;

const TabFourContainer = styled.section`
  width: 100%;
  height: 100vh;
  min-height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Card = styled.article`
  width: 55%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.35s ease;
  z-index: 9;
  cursor: pointer;

  @keyframes TabFourShake {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    25% {
      transform: translate(-50%, -50%) rotate(-8deg);
    }
    50% {
      transform: translate(-50%, -50%) rotate(8deg);
    }
    75% {
      transform: translate(-50%, -50%) rotate(-8deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  animation: TabFourShake 0.75s ease;

  &:hover {
    background-color: azure;
  }
  &:not(:hover) {
    background-color: #fff;
  }
  h1 {
    font-size: 3rem;
    line-height: 3.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  div {
    font-size: 2.5rem;
    line-height: 2.7rem;
    font-weight: 700;
  }
  strong {
    font-size: 2rem;
    line-height: 2.2rem;
    font-weight: 700;
    margin-top: 2rem;
  }
`;

const CheckBtn = styled.button`
  width: 130px;
  height: 50px;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 10px;
  margin-top: 2.5rem;
  :hover {
    transition: all 0.35s ease;
    background-color: #00aaee;
  }
  :not(:hover) {
    transition: all 0.35s ease;
    background-color: #232323;
  }

  @keyframes TabFourfadeInBtn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: TabFourfadeInBtn 2.25s ease;
`;
