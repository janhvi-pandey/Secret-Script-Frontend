import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const DotLoaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:nth-child(1) {
    background-color: #ff6347;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    background-color: #1e90ff;
    animation-delay: 0.3s;
  }
  &:nth-child(3) {
    background-color: #32cd32;
    animation-delay: 0.6s;
  }
`;

const LoadingDots = () => {
  return (
    <DotLoaderContainer>
      <Dot />
      <Dot />
      <Dot />
    </DotLoaderContainer>
  );
};

export default LoadingDots;
