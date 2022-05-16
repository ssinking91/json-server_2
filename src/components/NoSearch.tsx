import styled from 'styled-components';

type NoSearchProps = {
  searching?: boolean;
};

function NoSearch({ searching }: NoSearchProps) {
  if (searching) {
    return (
      <>
        <SearchMSGBox>
          <p className="searching_text">검색 중...</p>
        </SearchMSGBox>
      </>
    );
  }

  return (
    <>
      <SearchMSGBox>
        <p>검색어 없음</p>
      </SearchMSGBox>
    </>
  );
}

export default NoSearch;

const SearchMSGBox = styled.div`
  width: 66rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 105%;
  padding: 2.4rem;
  border-radius: 3rem;
  background-color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  z-index: 9;

  .searching_text {
    color: #aebbc5;
  }

  @media screen and (max-width: 1040px) {
    width: 95%;
    height: 4.64rem;
    display: flex;
    justify-content: center;
    top: 110%;
    padding: 0;
    padding-left: 3%;
  }
`;
