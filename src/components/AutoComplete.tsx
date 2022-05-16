import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';
import { ProdDataType } from './TabOne';

type AutoCompleteProps = {
  ProdData: ProdDataType[];
  targetIndex: number;
  setTargetIndex: React.Dispatch<React.SetStateAction<number>>;
  handleAddRepo: (allergy: string) => void;
};

function AutoComplete({ ProdData, targetIndex, setTargetIndex, handleAddRepo }: AutoCompleteProps) {
  const handleOnMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // e.preventDefault();
      // e.stopPropagation();

      console.log('handleOnMouseOver 시작');
      setTargetIndex(-1);
    },
    [setTargetIndex],
  );

  const handleOnClick = useCallback(
    (name: string) => {
      console.log('handleOnClick 시작');
      handleAddRepo(name);
    },
    [handleAddRepo],
  );

  return (
    <>
      <AutoCompleteBox>
        <Title>추천 검색어</Title>
        {ProdData &&
          ProdData.length > 0 &&
          ProdData.map((data, idx) => {
            return (
              <AutoList
                key={data.id}
                onClick={() => handleOnClick(data.name)}
                onMouseOver={(e) => handleOnMouseOver(e)}
                targetIndex={targetIndex === idx ? false : true}
              >
                <SearchIcon className="search_icon" />
                <SearchWord>{data.name}</SearchWord>
              </AutoList>
            );
          })}
      </AutoCompleteBox>
    </>
  );
}

export default AutoComplete;

const AutoCompleteBox = styled.div`
  width: 66rem;
  height: auto;
  min-height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 105%;
  padding: 2.6rem 0;
  border-radius: 3rem;
  margin-bottom: 2.6rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 10;
  overflow: hidden;
  @media screen and (max-width: 1040px) {
    width: 95%;
    top: 110%;
  }
`;

const Title = styled.div`
  font-size: 1.4rem;
  padding: 0 2.4rem;
  color: #6c737a;
  margin-bottom: 1rem;
`;

const AutoList = styled.div<{ targetIndex: boolean }>`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  color: ${(props) => (props.targetIndex ? '' : '#fff')};
  background-color: ${(props) => (props.targetIndex ? '#fff' : '#abcbfc')};
  cursor: pointer;

  .search_icon {
    color: ${(props) => (props.targetIndex ? '#505b65' : '#fff')};
  }
  :hover {
    color: #fff;
    background-color: #abcbfc;

    .search_icon {
      color: #fff;
    }
  }
`;

const SearchWord = styled.p`
  font-size: 1.8rem;
  padding-top: 0.3rem;
  margin-left: 1.3rem;
`;
