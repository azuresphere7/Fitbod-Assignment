import React from "react";
import styled from "styled-components";
import { Performance } from "@/utils/interface";

const ListContainer = styled.div`
  display: flex;
  flex-basis: calc(50% - 24px);
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  width: 50%;

  & p {
    margin: 0;
  }

  @media (max-width: 664px) {
    flex-basis: 100%;
  }
`;

const EstimatedContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BoldLabel = styled.div`
  font-weight: 700;
  margin-right: 4px;
`;

const PerformanceItem = ({ data }: { data: Performance }) => {
  const { reps, weight, estimated1RM } = data;

  return (
    <ListContainer>
      <p>{reps} x {weight} lb</p>

      <EstimatedContainer>
        <BoldLabel>Estimated 1RM:</BoldLabel>
        <p>{estimated1RM.toFixed(0)} lb</p>
      </EstimatedContainer>
    </ListContainer>
  );
};

export default PerformanceItem;