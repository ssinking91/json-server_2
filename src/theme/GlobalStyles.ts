import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
 
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
         font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
         background-color: #cae9ff;
    }

    // rem의 "r"은 바로 "root(최상위)"를 뜻합니다. 
    // 최상위 태그(요소)에 지정한 것을 기준으로 삼으며, 보통 최상위 태그는 html태그
    
    html {
         font-size: 10px; 
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    ::-webkit-scrollbar {
         display: none;
    }
    input, textarea {
        -moz-user-select: auto;
        -webkit-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
    }
    input {
        border: none;
        outline: none;
    }
    button {
        padding: 0;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
    }
    ol, ul, li {
        list-style: none;
    }
`;

export default GlobalStyles;
