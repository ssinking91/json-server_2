import React, { memo } from 'react';
import styled from 'styled-components';

const Spinner = (props: any) => {
  const { scrollSpinner } = props;
  // 무한 스크롤 스피너
  if (scrollSpinner) {
    return (
      <>
        <ScrollSpinnerBox>
          <section>
            <div className="sk-three-bounce">
              <div className="sk-bounce-1 sk-child"></div>
              <div className="sk-bounce-2 sk-child"></div>
              <div className="sk-bounce-3 sk-child"></div>
            </div>
          </section>
        </ScrollSpinnerBox>
      </>
    );
  }
  // 리스트 로딩 스피너
  return (
    <>
      <SpinnerBox>
        <section>
          <div className="sk-three-bounce">
            <div className="sk-bounce-1 sk-child"></div>
            <div className="sk-bounce-2 sk-child"></div>
            <div className="sk-bounce-3 sk-child"></div>
          </div>
        </section>
      </SpinnerBox>
    </>
  );
};

const SpinnerBox = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  section {
    flex: 1 1 25%;
  }
  .sk-three-bounce {
    width: 32em;
    margin: auto;
    text-align: center;
  }
  .sk-three-bounce .sk-child {
    width: 8em;
    height: 8em;
    background-color: #ff8450;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
    animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
  }
  .sk-three-bounce .sk-bounce-1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .sk-three-bounce .sk-bounce-2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-three-bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

  @keyframes sk-three-bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const ScrollSpinnerBox = styled(SpinnerBox)`
  width: auto;
  height: auto;
  margin: 65px 0;
  position: inherit;
  top: 0;
  left: 0;
  transform: translate(0%, 0%);
`;

export default memo(Spinner);
