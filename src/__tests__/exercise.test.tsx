import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import List from "@/components/List";
import Navbar from "@/layouts/Navbar";
import mockRouter from "@/utils/mockRouter";
import { calcBrzycki, createPerformance, getPerformance } from "@/utils/function";

const mockExercise = {
  id: "landmine-press",
  name: "Landmine Press",
  muscle: "Shoulders",
  image: "https://app-media.fitbod.me/v2/208/images/thumb.jpg",
};

const mockPerformance = {
  id: "landmine-press",
  reps: 9,
  weight: 5,
  estimated1RM: calcBrzycki(9, 5),
  createdAt: new Date()
};

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    }),
    useSearchParams: () => ({
      get: () => { }
    })
  };
});

describe("Exercise Page Test", () => {
  it("Clicking on the Fitbod logo navigates to the Index page", async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Navbar />
      </RouterContext.Provider>
    );

    await userEvent.click(screen.getByTestId("logo"));
    expect(mockRouter.push).toHaveBeenCalledWith("/", "/", expect.any(Object));
  });

  it("Show name and image of the exercise for that page, according to the mockup", () => {
    const { getByTestId } = render(<List data={mockExercise} />);

    expect(getByTestId("list-name")).toHaveTextContent(mockExercise.name);
    expect(getByTestId("list-image")).toBeInTheDocument();
    expect(getByTestId("list-muscle")).toHaveTextContent(mockExercise.muscle);
  });

  it("These should be stored in Local Storage, so that when the page loads again they are persisted", () => {
    createPerformance(mockPerformance);

    const performanceList = localStorage.getItem("performance");


    expect(performanceList?.includes(mockPerformance.reps.toString())).toBe(true);
    expect(performanceList?.includes(mockPerformance.weight.toString())).toBe(true);
  });

  it("Performances should be grouped into the day they were performed", () => {
    const performanceList = getPerformance(mockExercise.id);

    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

    Object.keys(performanceList).map((key: string) => {
      expect(dateFormat.test(key)).toBe(true);
    });
  });
});
