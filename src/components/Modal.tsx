import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Spinner from './Spinner';
import { ProdDataType } from './TabThree';

type ModalType = {
  modalOpen: () => void;
  PostData: ProdDataType[] | null;
  toPriceFormatOfKor: (price: number) => string;
  totalPrice: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Modal({
  modalOpen,
  PostData,
  toPriceFormatOfKor,
  totalPrice,
  setIndex,
}: ModalType) {
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 전송 기능
  const setPostData = useCallback(async () => {
    const newPostData = PostData?.map((el) => el.name);
    console.log(newPostData);
    setIsLoading(true);
    try {
      const { data, status, statusText } = await axios.post(`http://localhost:4000/cart`, {
        vegetables: newPostData,
      });

      if (status >= 400) {
        alert(`잘못된 요청입니다.🤢 statusText: ${statusText}`);
      } else if (status >= 500) {
        alert(`서버 에러입니다.🤢 statusText: ${statusText}`);
      }

      setIsLoading(false);
      modalOpen();
      window.localStorage.clear();
      setIndex(3);
    } catch (e: any) {
      alert(`에러가 발생했습니다.🤢 잠시후 다시 실행해 주세요. `);
      console.error(e);
      setIsLoading(false);
    }
  }, [PostData, modalOpen, setIndex]);

  return (
    <>
      <ModalBg onClick={modalOpen}></ModalBg>

      {isLoading ? (
        <Spinner />
      ) : (
        <ModalBox>
          <h1>🥔 못난이 채소 주문 정보</h1>
          <i onClick={modalOpen}></i>
          {PostData && PostData.length > 0 ? (
            PostData.map((el, idx) => {
              return (
                <p key={el.name}>{`${idx + 1}. ${el.name} (${toPriceFormatOfKor(el.price)}원)`}</p>
              );
            })
          ) : (
            <p>😭 주문 된 정보가 없습니다.</p>
          )}
          <strong>👀 총 금액 : {toPriceFormatOfKor(totalPrice)}원</strong>
          <ConfirmBtn
            onClick={() => setPostData()}
            disabled={PostData && PostData.length > 0 ? false : true}
          >
            주문하기
          </ConfirmBtn>
        </ModalBox>
      )}
    </>
  );
}

const ModalBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.5);
  overflow: hidden;
  z-index: 1;
`;

const ModalBox = styled.article`
  width: 40%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 2rem;
  border-radius: 8px;
  position: fixed;
  gap: 3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 10;

  @keyframes ModalfadeIn {
    from {
      opacity: 0;
      top: 0%;
    }
    to {
      opacity: 1;
      top: 50%;
    }
  }

  animation: ModalfadeIn 0.75s ease;

  @media screen and (max-width: 1040px) {
    width: 55%;
  }
  h1 {
    width: 100%;
    padding: 1.5rem 1rem;
    margin: 1.5rem 0;
    text-align: center;
    font: 2.2rem 'Noto Sans', 'Noto Sans KR', sans-serif;
    font-weight: 600;
    color: white;
    background: #e56e44;
    border-radius: 8px;
  }
  p {
    overflow: hidden;
    word-wrap: break-word;
    font: 2.2rem 'Noto Sans', 'Noto Sans KR', sans-serif;
    line-height: 2.4rem;
    font-weight: 600;
  }
  strong {
    margin-top: 1rem;
    font-size: 2.4rem;
    line-height: 2.6rem;
    font-weight: 700;
  }
  i {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 5px;
    top: 5px;
    cursor: pointer;
    ::before,
    ::after {
      position: absolute;
      width: 2px;
      height: 25px;
      top: 5px;
      background-color: black;
      content: '';
    }
    ::before {
      right: 15px;
      transform: rotate(45deg);
    }
    ::after {
      right: 15px;
      transform: rotate(-45deg);
    }
  }
`;

const ConfirmBtn = styled.button`
  width: 130px;
  height: 50px;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 10px;
  margin: 1.5rem 0;
  :hover {
    transition: all 0.35s ease;
    background-color: #00aaee;
  }
  :not(:hover) {
    transition: all 0.35s ease;
    background-color: #232323;
  }

  @keyframes ModalfadeInBtn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: ModalfadeInBtn 2.25s ease;
`;
