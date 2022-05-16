import { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import ToastModal from './ToastModal';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Search() {
  const [storage, setLocalStorage] = useLocalStorage<string[] | []>('Allergy', []);
  const [IsAreadyModal, setIsAreadyModal] = useState(false);
  const [IsLimitModal, setIsLimitModal] = useState(false);

  return (
    <>
      <Card>
        <h1>⭐ 나의 알러지 목록</h1>
        {storage.length > 0 &&
          storage.map((el, idx) => {
            return (
              <div key={el}>
                {idx + 1}. {el}
              </div>
            );
          })}
      </Card>
      <SearchBox>
        <h1>
          👀 검색을 통해 원하는 알러지 채소를 등록해주세요.
          <br />✨ 최대 3개까지 선택할 수 있습니다.
          <br />
          💡 <strong>위,아래 방향키와 Enter로 선택이 가능합니다.</strong>
        </h1>
        <SearchBar
          storage={storage}
          setLocalStorage={setLocalStorage}
          setIsModal={setIsAreadyModal}
          setIsLimitModal={setIsLimitModal}
        />
      </SearchBox>

      {IsAreadyModal && (
        <ToastModal content="이미 저장 되었습니다!! 🤢" setIsModal={setIsAreadyModal} />
      )}

      {IsLimitModal && (
        <ToastModal content="3개 이상 저장은 안돼요!! 🤢" setIsModal={setIsLimitModal} />
      )}
    </>
  );
}

export default Search;

const SearchBox = styled.section`
  width: 100rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1040px) {
  }

  h1 {
    text-align: center;
    font-size: 3.4rem;
    font-weight: 700;
    line-height: 5.4rem;
    margin-bottom: 2.2rem;
    strong {
      text-align: center;
      font-size: 3.4rem;
      font-weight: 700;
      line-height: 5.4rem;
      margin-bottom: 2.2rem;
    }
  }

  @media screen and (max-width: 1040px) {
    width: 95%;

    h1 {
      font-size: 1.5rem;
      line-height: 2.5rem;
      strong {
        font-size: 1.8rem;
        line-height: 2.8rem;
        font-weight: 700;
      }
    }
  }
`;

const Card = styled.article`
  width: 35%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border-radius: 1rem;
  position: absolute;
  top: 18.5%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  div {
    font-size: 1.4rem;
    line-height: 1.6rem;
    font-weight: 700;
  }
  @media screen and (max-width: 1040px) {
    width: 55%;
    top: 20%;
    h1 {
      margin-bottom: 0;
    }
  }

  @keyframes SearchfadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: SearchfadeIn 2.25s ease;
`;
