import { Performance } from "@/utils/interface";

// Calculate Estimated 1RM based on Brzycki formula
export function calcBrzycki(reps: number, weight: number) {
  return weight * (36 / (37 - reps));
}

// Convert Date value to MM/DD/YYYY format
export function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return month + "/" + day + "/" + year;
}

// Update localStorage value by adding a new performance
export function createPerformance(performance: Performance) {
  const list = localStorage.getItem("performance");

  if (list) {
    const parsedList = JSON.parse(list);
    const updatedList = [...parsedList, performance];

    localStorage.setItem("performance", JSON.stringify(updatedList));
  } else {
    const newList = [performance];
    localStorage.setItem("performance", JSON.stringify(newList));
  }
}


// Get performances list from localStorage value
export function getPerformance(id: string | number) {
  const list = localStorage.getItem("performance");

  if (list) {
    const parsedList = JSON.parse(list);

    // Filter and sort array by its Id and created date
    const sortedPerformances = parsedList
      .filter((item: Performance) => item.id === id)
      .sort((a: Performance, b: Performance) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Group the list by created date
    const groupedList = sortedPerformances.reduce((acc: any, performance: Performance) => {
      const key = formatDate(new Date(performance.createdAt));

      if (!acc[key]) {
        acc[key] = [performance];
      } else {
        acc[key] = [...acc[key], performance];
      }

      return acc;
    }, {});

    return groupedList;
  } else {
    return {};
  }
}