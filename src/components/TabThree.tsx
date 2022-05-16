import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Skeleton from './Skeleton';
import Toggle from './Toggle';
import Modal from './Modal';

export type ProdDataType = {
  id: number;
  name: string;
  canBuy: boolean;
  price: number;
};

type TabThreeProps = {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

function TabThree({ setIndex }: TabThreeProps) {
  const [ProdData, setProdData] = useState<ProdDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addPrice, setAddPrice] = useState(0);
  const [PostData, setPostData] = useState<ProdDataType[] | null>(null);

  const getFetchData = async () => {
    setProdData(null);
    setIsLoading(true);
    try {
      const { data, status, statusText } = await axios.get(`http://localhost:4000/add-vegetables`);

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

  // 현지화를 위한 toLocaleString() : 지정된 지역에서 사용하는 숫자의 표현방식으로 문자열로 리턴
  const toPriceFormatOfKor = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  // 총 추가 금액
  const handleAddPrice = useCallback((price: number, choice: boolean) => {
    if (choice) {
      setAddPrice((prev) => prev - price);
    } else {
      setAddPrice((prev) => prev + price);
    }
  }, []);

  // 전송 객체 배열 데이터 추가
  const handlePostData = useCallback(
    (obj: ProdDataType, choice: boolean) => {
      if (choice) {
        if (PostData) {
          const newObj = PostData.filter((el) => el.id !== obj.id);
          setPostData([...newObj]);
        }
      } else {
        if (PostData) setPostData([...PostData, obj]);
        else setPostData([obj]);
      }
    },
    [PostData],
  );

  // Modal
  const [modal, setmodal] = useState(false);

  // Modal 이벤트
  const modalOpen = useCallback(() => {
    if (modal) {
      document.body.style.overflow = 'unset'; // 스크롤 방지 해제
      setmodal(!modal);
    } else {
      document.body.style.overflow = 'hidden'; //모달창 띄웠을 때 스크롤 방지
      setmodal(!modal);
    }
  }, [modal]);

  return (
    <>
      {isLoading ? (
        <SkeletonWrapper>
          <Skeleton>
            <Skeleton.Item type="square" width={'55%'} height={'35vh'}></Skeleton.Item>
          </Skeleton>
        </SkeletonWrapper>
      ) : (
        <Card>
          <h1>💞 추가 선택</h1>
          {ProdData &&
            ProdData.length > 0 &&
            ProdData.map((el, idx) => {
              return (
                <CardDiv key={el.id} canBuy={el.canBuy}>
                  {idx + 1}. {el.name}({toPriceFormatOfKor(el.price)}원)
                  <Toggle
                    ProdData={el}
                    handleAddPrice={handleAddPrice}
                    handlePostData={handlePostData}
                  />
                </CardDiv>
              );
            })}

          <strong>👀 총 추가 금액 : {toPriceFormatOfKor(addPrice)}원</strong>
          <CheckBtn onClick={modalOpen}>확인</CheckBtn>
        </Card>
      )}

      {modal && (
        <Modal
          modalOpen={modalOpen}
          PostData={PostData}
          toPriceFormatOfKor={toPriceFormatOfKor}
          totalPrice={addPrice}
          setIndex={setIndex}
        />
      )}
    </>
  );
}

export default TabThree;

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
  strong {
    font-size: 2rem;
    line-height: 2.2rem;
    font-weight: 700;
    margin-top: 2rem;
  }

  @keyframes TabThreefadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: TabThreefadeIn 2.25s ease;
`;

const CardDiv = styled.div<{ canBuy: boolean }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 700;
  color: ${(props) => (props.canBuy ? '' : '#aebbc5')};
  text-decoration: ${(props) => (props.canBuy ? '' : 'line-through')};
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

  @keyframes TabThreefadeInBtn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: TabThreefadeInBtn 2.25s ease;
`;
