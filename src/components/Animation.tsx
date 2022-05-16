import styled from 'styled-components';

const Animation = () => {
  return (
    <Div id="loading1">
      <div className="wrap2">
        <div className="round">
          <div className="circle"></div>
          <div className="circle2"></div>
        </div>
        <div className="loading1">
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
        </div>
      </div>
      ;
    </Div>
  );
};

export default Animation;

const Div = styled.div`
  margin: 0;
  padding: 0;
  .round {
    position: absolute;
    top: 80%;
    left: 50%;
    width: 146px;
    height: 30px;
    transform: translate(-50%, -50%);
    justify-content: space-between;
  }

  .circle {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background: black;
  }

  .circle2 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background: black;
    margin-left: 80%;
  }

  @keyframes loading {
    0% {
      height: 0;
    }
    50% {
      height: 40px;
    }
    100% {
      height: 0;
    }
  }

  .loading1 {
    position: absolute;
    top: 88%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40%;
    display: flex;
    align-items: center;
  }

  .obj {
    width: 6px;
    height: 40px;
    background: black;
    margin: 0 3px;
    border-radius: 10px;
    animation: loading 0.8s infinite;
  }
`;
