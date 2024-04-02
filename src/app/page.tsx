"use client";

import React from "react";
import styled from "styled-components";

import List from "@/components/List";
import Loader from "@/components/Loader";
import { Exercise } from "@/utils/interface";
import axios, { AxiosError } from "axios";

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin: 32px 0 48px 0;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 786px;

  @media (max-width: 786px) {
    width: 100%;
  }
`;

const MessageContainer = styled.div`
  width: 786px;
  margin: 32px 0;
  text-align: center;

  @media (max-width: 786px) {
    width: 100%;
  }

  & h1 {
    font-weight: 400;
    width: 100%;
    text-align: center;
  }
`;

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [list, setList] = React.useState<Exercise[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  // Fetch all exercise list from the API
  React.useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/exercise")
        .then(response => {
          setList(response.data.result);
          setIsLoading(false);
        })
        .catch((error: AxiosError) => {
          setErrorMessage(error.message);
        });
    };

    fetchData();
  }, []);

  return (
    <main>
      <Title>Top Exercises</Title>

      <ListContainer>
        {
          isLoading ? <Loader /> :
            errorMessage ? (
              <MessageContainer>{errorMessage}</MessageContainer>
            ) : list.map((item: Exercise) => (
              <List key={item.id} data={item} />
            ))
        }
      </ListContainer>
    </main>
  );
}