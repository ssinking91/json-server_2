import { useCallback, useState } from 'react';
import styled from 'styled-components';
import TabOne from '../components/TabOne';
import TabTwo from '../components/TabTwo';
import TabThree from '../components/TabThree';
import TabFour from '../components/TabFour';

type TabType = {
  name: string;
  content: JSX.Element;
};

const Home = () => {
  const [tabIndex, setIndex] = useState(0); // TabContent λ³κ²½

  const tabLabel: TabType[] = [
    { name: 'π μ΄λ²μ£Ό μ±μ', content: <TabOne /> },
    { name: 'β­ μλ¬μ§ μ ν', content: <TabTwo /> },
    { name: 'π μΆκ° μ ν', content: <TabThree setIndex={setIndex} /> },
  ];

  const handleTabChange = useCallback((e: number) => {
    setIndex(e);
  }, []);

  return (
    <main>
      {tabIndex === 3 ? (
        <TabFour setIndex={setIndex} />
      ) : (
        <>
          <Tabs>
            {tabLabel.map((el, idx) => {
              return (
                <TabsItem
                  key={el.name}
                  length={tabLabel.length}
                  active={tabIndex === idx ? true : false}
                  onClick={() => {
                    handleTabChange(idx);
                  }}
                >
                  {tabLabel[idx].name}
                </TabsItem>
              );
            })}
          </Tabs>
          <TabContent>{tabLabel[tabIndex].content}</TabContent>
        </>
      )}
    </main>
  );
};

export default Home;

const Tabs = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  background-color: #eeeeee;
`;

const TabsItem = styled.div<{ length: number; active: boolean }>`
  width: ${(props) => (props.length ? `calc(100%/${props.length})` : '100%')};
  min-height: 5rem;
  line-height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.active ? '#fff' : '#000000')};
  background-color: ${(props) => (props.active ? '#ff8450' : '')};
  font-size: 1.4rem;
  font-weight: 700;
  transition: all 0.35s ease;
  &:hover {
    cursor: pointer;
    background-color: #ffe0d3;
    transition: all 0.35s ease;
  }
`;

const TabContent = styled.section`
  width: 100%;
  height: 90vh;
  min-height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
