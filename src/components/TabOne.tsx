import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Skeleton from './Skeleton';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type ProdDataType = {
  id: number;
  name: string;
};

function TabOne() {
  const [storage, setLocalStorage] = useLocalStorage<string[] | []>('Allergy', []);
  const [addRepos, setAddRepos] = useState<string[]>([]);
  const [ProdData, setProdData] = useState<ProdDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFetchData = async () => {
    setIsLoading(true);
    try {
      const { data, status, statusText } = await axios.get(
        `http://localhost:4000/default-vegetables`,
      );

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
    if (storage) {
      setAddRepos(storage);
    }
    getFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonWrapper>
          <Skeleton>
            <Skeleton.Item type="square" width={'55%'} height={'45vh'}></Skeleton.Item>
          </Skeleton>
        </SkeletonWrapper>
      ) : (
        <Card>
          <h1>🍅 이번주 채소</h1>
          {ProdData &&
            ProdData.length > 0 &&
            ProdData.map((el, idx) => {
              const hasRepo = addRepos.includes(el.name);
              return (
                <CardDiv key={el.name} hasRepo={hasRepo}>
                  {idx + 1}. {el.name}
                </CardDiv>
              );
            })}
        </Card>
      )}
    </>
  );
}

export default TabOne;

const SkeletonWrapper = styled.div`
  width: 100%;
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
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.35s ease;
  cursor: pointer;
  &:hover {
    background-color: azure;
  }
  &:not(:hover) {
    background-color: #fff;
  }
  h1 {
    font-size: 2rem;
    line-height: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  @keyframes TabOnefadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: TabOnefadeIn 2.25s ease;
`;

const CardDiv = styled.div<{ hasRepo: boolean }>`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.hasRepo && '#aebbc5'};
  text-decoration: ${(props) => props.hasRepo && 'line-through'};
`;
