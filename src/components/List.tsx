"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

import { Exercise } from "@/utils/interface";

const ListItemContainer = styled.div`
  width: 50%;
  max-width: 50%;
  
  &:hover {
    cursor: pointer;
    background-color: rgba(255,255,255,0.25);
  }

  @media (max-width: 786px) {
    width: 100%;
    max-width: 100%;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin: 16px 32px;
`;

const ListImageContainer = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
  width: 60px;
  height: 60px;
  background-color: silver;
`;

const ListInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  & > h2 {
    font-size: 16px;
    font-weight: 700;
    padding: 0;
    margin: 0;
  }

  & > p {
    font-size: 14px;
    font-weight: 400px;
    padding: 0;
    margin: 0;
  }
`;

const ListIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = ({ data }: { data: Exercise }) => {
  const router = useRouter();

  return (
    <ListItemContainer onClick={() => router.push(`/${data.id}`)} data-testid="list-container">
      <ListItem>
        <ListImageContainer>
          <Image
            alt={"preview"}
            src={data.image}
            sizes={"60px"}
            data-testid={"list-image"}
            fill
            priority
          />
        </ListImageContainer>

        <ListInfoContainer>
          <h2 data-testid={"list-name"}>{data.name}</h2>
          <p data-testid={"list-muscle"}>{data.muscle}</p>
        </ListInfoContainer>

        <ListIconContainer>
          <Image
            alt={"arrow-right"}
            src={"/arrow-right.svg"}
            width={20}
            height={36}
          />
        </ListIconContainer>
      </ListItem>
    </ListItemContainer>
  );
};

export default List;