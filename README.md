<br />

### ✨ [ugly_us] 프론트엔드 엔지니어 과제 - 신항민

---

<br />

### 💫  프로젝트 소개

- ugly_us 웹에 접속하여 알러지 채소를 선택하고 추가 채소를 선택할 수 있는 웹 페이지 구현

<br />

### ⚙️  프로젝트 기획

1. 코드 재사용성 및 컴포넌트화를 고려
2. 렌더링 최적화를 고려
3. UI/UX를 고려

<br />

### 🛠 기능 시연 

<br />

### 👀  요구사항

- 첫번째 탭

첫번째 탭에서이 이번주 채소박스의 채소들의 정보를 보여주는 탭입니다. API를 통해서 채소 정보를 확인하고 보여줍니다.

    - 고객은 이번주 채소박스의 채소들을 확인할 수 있어야 합니다.(GET /default-vegetables 참고)
    - (선택) 데이터 로딩 시에 Skeleton UI를 사용해주시면 좋습니다.

- 두번째 탭

두번째 탭에서는 알러지 채소를 등록하는 탭입니다. 알러지를 등록할 채소를 검색하는 검색바가 있습니다. 검색을 통해 원하는 알러지를 등록합니다. 알러지는 최대 3개까지 선택할 수 있습니다.

    - 이번주 채소박스의 채소와 알러지로 선택된 채소를 확인할 수 있어야 합니다.
    - 알러지는 최대 3개 선택할 수 있습니다.
    - 알러지가 이번주 채소박스의 채소에 포함되면 해당 채소는 채소박스 채소에서 제외되고 보여져야 합니다.
    - 알러지는 Autocomplete 검색바로 검색가능해야 합니다.(GET /vegetables 와 json-server 문서 참고)
    - 선택된 알러지는 localStorage에 저장되어야 하고 고객은 새로고침시에도 선택했던 알러지를 확인할 수 있어야 합니다.
    - (선택) 검색시 Debounce 처리를 해주시면 좋습니다.

- 세번째 탭

세번째 탭에서는 추가 채소를 선택합니다. 추가 채소 목록을 받고 추가 채소와 추가되는 가격을 보여줍니다. 추가 채소이지만 추가할 수 없는 경우(재고 부족등의 이유로) 추가할 수 없어야 합니다. 또한 알러지 채소는 추가 채소로 추가할 수 없습니다. 마지막 확인 버튼을 누르면 탭과 컨테이너가 사라지고 종료 페이지가 나옵니다.

    - 확인 버튼을 누르면 POST /cart 로 cart 데이터에 최종 채소 목록을 저장합니다.
    - 마지막 확인이 성공하면 localSotrage가 비워져야 합니다.
    - 에러가 발생시에 고객은 에러가 발생했다는 것을 알아야 합니다.
    - (선택) 확인을 누르면 최종 채소 목록을 보여주며 채소 선택이 종료된다는 알람 모달을 만들어주면 좋습니다.

- 종료 페이지

알러지를 제외한 이번주 고객이 받을 채소(추가 채소 포함)를 보여주면됩니다.

    - GET /cart 를 사용합니다.

- 공통 사항

  - 이미지는 예시를 보여주는 것이며 디자인을 일치시킬 필요는 없습니다.
  - 색/폰트 크기/공간 크기 등등이 일치할 필요는 없습니다.
  - 탭을 누르면 각각의 탭 컨테이너가 보여져야 합니다.
  - (선택) 모바일에서 슬라이드 액션으로 탭을 이동할 수 있도록 개발해주시면 좋습니다.

- API

  - GET /default-vegetables

  curl --request GET \
   --url http://localhost:4000/default-vegetables \

  - GET /vegetables

  curl --request GET \
   --url http://localhost:4000/vegetables \

  검색 기능 https://github.com/typicode/json-server#full-text-search 참고

  - GET /add-vegetables

  curl --request GET \
   --url http://localhost:4000/add-vegetables \

  - POST /cart

  curl --request POST \
   --url http://localhost:4000/cart \
   --header 'Content-Type: application/json' \
   --data '{ "vegetables": ["미나리", "사과"] }'

  - GET /cart

<br />

### 🔨  실행방법 - 1

```jsx
cd ugly_us

//  json-server 사용하기를 사용하기 위해 2개의 터미널 필요

// fake-server 디렉토리에서 다음 명령어 실행

npx json-server db.json --port 4000

// ugly_us 디렉토리에서 다음 명령어 실행
1. npm install

2. npm start
```

<br />

### 👨🏻‍💻 기능 구현 목록

### 1. 코드 재사용성 - hooks

<br>

> 코드를 작성하면서 생각한 것은
>
> 1.  하나의 함수는 하나의 기능 구현
> 2.  재사용성
> 3.  hook을 만들어 아이템을 가져오고 state에 저장하는 중복작업을 최소화
>
> 이 점을 가장 많이 생각했다.

- 총 1가지의 hook을 만들었습니다.

1. /src/hooks/useLocalStorage.js

- localStorage에 추가하는 부분과 삭제하는 부분은 버튼의 내용만 다르다. 따라서 재사용 가능하게 구현

<br />

### 2. 렌더링 최적화

<br />

> 렌더링 최적화 위해 생각한 것은
>
> 1.  **React.memo**를 이용한 컴포넌트 메모이제이션 방법
>
>     - React.memo는 컴포넌트를 래핑하여 props를 비교하여 메모이제이션 기법을 제공하는 함수로서 리렌더링을 방지 하였습니다.
>
> 2.  **React.useCallback**
>
>     - useCallback으로 함수를 선언해주면 종속 변수들이 변하지 않으면 굳이 함수를 재생성하지 않고 이전에 있던 참조 변수를 그대로 하위 컴포넌트에 props로 전달하여 하위 컴포넌트도 props가 변경되지 않았다고 인지하게 됩니다. 이에 따라 하위 컴포넌트의 리렌더링을 방지 하였습니다.
>
> 3.  하위 컴포넌트의 props로 객체를 넘겨주는 경우 새 객체 생성을 주의
>
>     - props로 전달한 객체가 동일한 값을 보유하고 있다고 하더라도 새로 생성된 객체는 이전 객체와 다른 참조 주소를 가진 객체이기 때문에 메모이제이션이 통하지 않습니다. 따라서 생성자 함수나 객체 리터럴로 객체를 생성해서 하위 컴포넌트로 넘겨주는 방식보다는, state를 그대로 하위컴포넌트에 넘겨주어 필요한 데이터 가공을 그 하위컴포넌트에서 해주는 것이 좋습니다.

<br/>

1. React.memo를 이용한 컴포넌트

- Spinner.tsx/ToastModal.tsx에 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화

2. React.useCallback

- 컴포넌트에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업을 위해 컴포넌트 이벤트 핸들러(event handler)에 useCallback으로 묶어 함수를 새로 만들지 않고 재사용

<br />

### 3. UI/UX를 고려

<br/>

> 1. 전체적인 컴포넌트 생성 시 width값을 % 로 설정해 가로 사이즈가 줄어들때 자동으로 크기를 가져가도록 설정, 미디어 쿼리를 사용해 특정 컴포넌트 크기 및 색상 노출 여부를 컨트롤 하였고, 모바일 사이즈가 되었을 때 모바일 전용 제공 하였습니다.

<br />

> 2. React axios를 활용하여 api를 호출하면 발생하는 딜레이 시간 동안 로딩 화면을 보여줄 Spinner 기능 제공 하였습니다.

- /src/components/Spinner.tsx
- /src/components/Skeleton.tsx

<br />

> 3. 사용자 경험을 고려하여 기존 알럿창으로 뜨는 경고창을 모달창으로 변경하여 구현을 하였습니다.

- /src/components/ToastModal.tsx

<br />

<br />

🏆 &nbsp; refactoring

1. debounce

<br/>

> 코드의 가독성을 위해 lodash의 debouce를 썻다.
>
> lodash는 순수 자바스크립트로 작성된 유틸리티를 제공하는 라이브러리인데 빠르고 직관적이면서 사용도 간편해서 많이 사용되고 있다. 참고로 lodash 내부의 debounce도 setTimeout과 clearTimeout을 이용해서 구현2되고 있으므로 동작 방식이 위 코드와 크게 다르지 않았다.

- 변경전

```javascript
  import _ from 'lodash';

  ...

  // onChange 기능
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (e.target.value === '') {
      setIsInput(false);
      setProdData(null);
    } else {
      setIsInput(true);
    }
  };

    // 검색시 debounce(lodash)
  const debounce = _.debounce((e) => handleSearchChange(e), 200);
  const debounceSearch = useCallback(debounce, [debounce]);

  ...

```

<br />

> 하지만 순수 자바스크립트로 debounce를 구현해 보고 싶었다.

- 변경후

```javascript
  import _ from 'lodash';

...

const [keyupTimer, setKeyupTimer] = useState(0);
  ...

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

  ...

```

<br />
