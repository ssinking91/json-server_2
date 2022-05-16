import { ReactNode, memo } from 'react';
import styled from 'styled-components';

type ItemType = {
  type: 'round' | 'square';
  width?: number | string;
  height?: number | string;
};

type SkeletonType = {
  children: ReactNode;
};

const Item = ({ type, width = 300, height = 300, ...props }: ItemType) => {
  // console.log(width, height);
  return <Content type={type} width={width} height={height} {...props}></Content>;
};

const Content = styled.div<ItemType>`
  display: inline-block;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  border-radius: ${({ type }) => (type === 'round' ? '50%' : '10px')};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-image: linear-gradient(90deg, #dfe3e8 0px, #efefef 40px, #dfe3e8 80px);
  background-size: 200% 100%;
  background-position: 0 center;
  animation: skeleton--loading 2s infinite linear;
`;

// <Skeleton />
const Skeleton = ({ children, ...props }: SkeletonType) => {
  // console.log(children);
  return <Wrapper {...props}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: inherit;
  /* text-align: center; */

  @keyframes skeleton--loading {
    0% {
      background-position: 100%;
    }
    90% {
      background-position-x: -100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`;

// <Skeleton.Item />
Skeleton.Item = Item;

export default Skeleton;
