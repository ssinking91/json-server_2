import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ProdDataType } from './TabOne';
import AutoComplete from './AutoComplete';
import NoSearch from './NoSearch';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';
import _ from 'lodash';

type SearchBarProps = {
  storage: [] | string[];
  setLocalStorage: (value: [] | string[]) => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLimitModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchBar({ storage, setLocalStorage, setIsModal, setIsLimitModal }: SearchBarProps) {
  const [addRepos, setAddRepos] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isInput, setIsInput] = useState(false);
  const [ProdData, setProdData] = useState<ProdDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [targetIndex, setTargetIndex] = useState(-1);

  const [keyupTimer, setKeyupTimer] = useState(0);

  // 데이터 가져오기 기능
  const getFetchData = useCallback(async () => {
    setProdData(null);
    setIsLoading(true);
    try {
      const { data, status, statusText } = await axios.get(
        `http://localhost:4000/vegetables?name_like=${userInput}`,
      );

      if (status >= 400) {
        alert(`잘못된 요청입니다.🤢 statusText: ${statusText}`);
      } else if (status >= 500) {
        alert(`서버 에러입니다.🤢 statusText: ${statusText}`);
      }

      setProdData(data);
      setIsLoading(false);
      setTargetIndex(-1);
    } catch (e: any) {
      alert(`에러가 발생했습니다.🤢 잠시후 다시 실행해 주세요. `);
      console.error(e);
      setIsLoading(false);
    }
  }, [userInput]);

  useEffect(() => {
    if (userInput !== '') {
      getFetchData();
    }
  }, [getFetchData, userInput]);

  // onChange 기능
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserInput(e.target.value);
  //   if (e.target.value === '') {
  //     setIsInput(false);
  //     setProdData(null);
  //   } else {
  //     setIsInput(true);
  //   }
  // };

  // 검색시 debounce(window.setTimeout())
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (keyupTimer) {
      clearTimeout(keyupTimer);
    }
    const newTimer = window.setTimeout(() => {
      setUserInput(e.target.value);

      if (e.target.value === '') {
        setIsInput(false);
        setProdData(null);
      } else {
        setIsInput(true);
      }
    }, 200);

    setKeyupTimer(newTimer);
  };

  // 검색시 debounce(lodash)
  // const debounce = _.debounce((e) => handleSearchChange(e), 200);
  // const debounceSearch = useCallback(debounce, [debounce]);

  useEffect(() => {
    if (storage) {
      setAddRepos(storage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LocalStorage 추가
  const handleAddRepo = useCallback(
    (allergy: string) => {
      if (addRepos.length < 3) {
        if (addRepos.length > 0) {
          const newRepos = addRepos.map((value) => value);
          if (newRepos.includes(allergy)) {
            setIsModal((prev) => !prev);
          } else {
            setAddRepos([...addRepos, allergy]);
            setLocalStorage([...addRepos, allergy]);
          }
        } else {
          setAddRepos([allergy]);
          setLocalStorage([allergy]);
        }
      } else setIsLimitModal((prev) => !prev);
    },
    [addRepos, setIsLimitModal, setIsModal, setLocalStorage],
  );

  // onKeyUp 기능
  const handleSearchKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (ProdData) {
        const maxIndex = ProdData.length - 1;

        switch (e.key) {
          case 'ArrowUp':
            if (targetIndex === 0) {
              return;
            } else {
              const index = targetIndex - 1;
              setTargetIndex(index);
            }
            break;

          case 'ArrowDown':
            if (targetIndex === maxIndex) {
              return;
            } else {
              const index = targetIndex + 1;
              setTargetIndex(index);
            }
            break;

          case 'Enter':
            console.log(ProdData[targetIndex].name);
            handleAddRepo(ProdData[targetIndex].name);
            // setUserInput('');
            setIsInput(false);
            setProdData(null);
            break;

          default:
          // throw new Error(`Unhandled key type:${e.key}`);
        }
      }
    },
    [ProdData, handleAddRepo, targetIndex],
  );

  // onFocus 기능
  const handleOnFocus = useCallback(() => {
    setIsInput(true);
    if (userInput !== '') {
      getFetchData();
    }
  }, [getFetchData, userInput]);

  return (
    <>
      <InputBox>
        <LeftBox>
          <IconBox>
            <SearchIcon className="search_icon" />
          </IconBox>
          <TextBox>
            <SearchInput
              placeholder="🫑 알러지 채소를 입력해 주세요."
              type="text"
              // value={userInput}
              // onChange={(e) => debounceSearch(e)}
              onChange={(e) => handleSearchChange(e)}
              onKeyUp={(e) => handleSearchKeyUp(e)}
              onBlur={() => setIsInput(false)}
              // eslint-disable-next-line no-sequences
              onFocus={() => handleOnFocus()}
              //   disabled={isLoading}
            />
          </TextBox>
        </LeftBox>
        <RightBox>검색</RightBox>
        <MobileRightBox>
          <SearchIcon />
        </MobileRightBox>
      </InputBox>

      {isLoading
        ? isInput && <NoSearch searching />
        : ProdData && ProdData.length > 0
        ? isInput && (
            <AutoComplete
              ProdData={ProdData}
              targetIndex={targetIndex}
              setTargetIndex={setTargetIndex}
              handleAddRepo={handleAddRepo}
            />
          )
        : isInput && <NoSearch />}
    </>
  );
}

export default SearchBar;

const InputBox = styled.div`
  width: 66rem;
  height: 6.5rem;
  display: flex;
  border-radius: 5rem;
  overflow: hidden;

  @media screen and (max-width: 1040px) {
    width: 95%;
    height: 4.64rem;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const LeftBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  background-color: #fff;
`;

const IconBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .search_icon {
    color: #505b65;
    margin-left: 1.1rem;
  }

  @media screen and (max-width: 1040px) {
    display: none;
  }
`;

const TextBox = styled.div`
  width: 90%;
  height: 100%;

  @media screen and (max-width: 1040px) {
    width: 100%;
    padding-left: 2rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.8rem;

  ::placeholder {
    color: #aebbc5;
  }
  @media screen and (max-width: 1040px) {
    font-size: 1.4rem;
  }
`;

const RightBox = styled.button`
  width: 15%;
  height: 100%;
  background-color: #327be9;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;

  @media screen and (max-width: 1040px) {
    display: none;
  }
`;

const MobileRightBox = styled.button`
  display: none;
  width: 15%;
  height: 100%;
  padding-right: 2rem;
  background-color: #fff;
  text-align: right;

  @media screen and (max-width: 1040px) {
    display: block;
  }
`;
