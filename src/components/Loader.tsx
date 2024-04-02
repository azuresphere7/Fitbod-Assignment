import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Circle = styled.span`
  width: 48px;
  height: 48px;
  border: 4px solid transparent;
  border-top-color: black;
  border-right-color: black;
  border-radius: 50%;
  animation: animate-spin 1s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Circle />
    </LoaderContainer>
  );
};

export default Loader;