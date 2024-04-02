import axios, { AxiosError } from "axios";
import { screen } from "@testing-library/react";

import { Exercise } from "@/utils/interface";

describe("Index Page Test", () => {
  it("Retrieve exercise list from the API", async () => {
    await axios.get("/api/exercise")
      .then(response => {
        expect(Array.isArray(response.data.result)).toBe(true);

        response.data.result.forEach((exercise: Exercise) => {
          expect(typeof exercise.id).toBe("string");
          expect(typeof exercise.name).toBe("string");
          expect(typeof exercise.muscle).toBe("string");
          expect(typeof exercise.image).toBe("string");
        });
      })
      .catch((error: AxiosError) => {
        expect(typeof error.message).toBe("string");
      });
  });

  it("List exercises according to the mockup", async () => {
    await axios.get("/api/exercise")
      .then(response => {
        response.data.result.forEach((exercise: Exercise) => {
          expect(screen.findByText(exercise.name)).toBeInTheDocument();
        });
      })
      .catch((error: AxiosError) => {
        expect(typeof error.message).toBe("string");
      });
  });
});