"use client";

import Image from "next/image";
import React from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

import Loader from "@/components/Loader";
import PerformanceItem from "@/components/PerformanceItem";
import { calcBrzycki, createPerformance, getPerformance } from "@/utils/function";
import { Exercise, Performance } from "@/utils/interface";

interface PageProps {
  params: {
    id: string | number;
  };
}

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin: 32px 0;
`;

const LoaderContainer = styled.div`
  margin: 32px 0;
`;

const MessageContainer = styled.div`
  width: 600px;
  margin: 32px 0;
  text-align: center;

  @media (max-width: 664px) {
    width: 100%;
  }

  & h1 {
    font-weight: 400;
    width: 100%;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #eeeeee;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 32px;
`;

const LargeFieldLabel = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin: 32px 0 24px 0;
`;

const SmallFieldLabel = styled.h2`
  font-size: 14px;
  font-weight: 700;
  margin: 8px 0 24px 0;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 400px;
`;

const Input = styled.input`
  font-size: 14px;
  width: 72px;
  height: 35px;
  margin: 0px 16px 0 8px;
  border: 1px solid #000000;
  outline: none;
  border-radius: 12px;
  text-align: center;
`;

const Button = styled.button`
  font-size: 24px;
  width: 42px;
  height: 35px;
  margin-left: 16px;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: #0085BF;
  color: white;
  
  &:hover {
    cursor: pointer;
    background-color: dodgerblue;
  }

  &:active {
    background-color: #01648f;
  }
`;

const PerformanceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  width: 600px;

  @media (max-width: 664px) {
    width: 100%;
  }
`;

export default function DetailsPage({ params: { id } }: PageProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [detail, setDetail] = React.useState<Exercise>();
  const [performanceList, setPerformanceList] = React.useState<any>();
  const [reps, setReps] = React.useState<number>(0);
  const [weight, setWeight] = React.useState<number>(0);

  // Add a new performance item and update the list
  const addPerformance = () => {
    const newPerformance: Performance = {
      id,
      reps,
      weight,
      estimated1RM: calcBrzycki(reps, weight),
      createdAt: new Date()
    };

    createPerformance(newPerformance);
    setPerformanceList(getPerformance(id));
    setReps(0);
    setWeight(0);
  };

  // Fetch the exercise details from the API
  React.useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/exercise/${id}`)
        .then(response => {
          if (response.data.success) {
            setDetail(response.data.result);
          } else {
            setErrorMessage(response.data.message);
          }

          setPerformanceList(getPerformance(id));
          setIsLoading(false);
        })
        .catch((error: AxiosError) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  return isLoading ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) :
    errorMessage ?
      <MessageContainer>
        <h1>{errorMessage}</h1>
      </MessageContainer>
      :
      detail ? (
        <main>
          <Title>{detail.name}</Title>

          <ImageContainer>
            <Image
              src={detail.image}
              fill
              sizes={"150px"}
              alt={"preview"}
              priority
            />
          </ImageContainer>

          <DetailContainer>
            <LargeFieldLabel>Add set:</LargeFieldLabel>

            <InputContainer>
              <InputLabel>Reps</InputLabel>
              <Input
                type="number"
                value={reps}
                onChange={({ target: { value } }) => setReps(Number(value))}
              />

              <InputLabel>Weight</InputLabel>
              <Input
                type="number"
                value={weight}
                onChange={({ target: { value } }) => setWeight(Number(value))}
              />

              <Button onClick={addPerformance}>+</Button>
            </InputContainer>

            <LargeFieldLabel>Performances:</LargeFieldLabel>

            {
              Object.keys(performanceList).length > 0 ?
                Object.keys(performanceList).map((key: string) => (
                  <FlexColumnContainer key={key}>
                    <SmallFieldLabel>{key}</SmallFieldLabel>

                    <PerformanceContainer>
                      {
                        performanceList[key].map((item: Performance, index: number) => (
                          <PerformanceItem key={index} data={item} />
                        ))
                      }
                    </PerformanceContainer>
                  </FlexColumnContainer>
                )) : (
                  <MessageContainer>No performance created</MessageContainer>
                )
            }

          </DetailContainer>
        </main>
      ) : (
        <MessageContainer>No Data</MessageContainer>
      );
}