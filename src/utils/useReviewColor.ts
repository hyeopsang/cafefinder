import { useMemo } from "react";
import { Review, ReviewContent } from "../types";

const useReviewColor = (reviews: Review[]) => {
  const getAverage = (category: keyof ReviewContent) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce(
      (acc, review) =>
        acc + (typeof review.content[category] === "number" ? review.content[category] : 0),
      0
    );

    return total / reviews.length;
  };

  const categoryColor = useMemo(() => {
    const categories: (keyof ReviewContent)[] = [
      "taste",
      "mood",
      "kind",
      "comfort",
      "wifi",
      "parking",
    ]; 

    return categories.reduce((acc, category) => {
      const avg = getAverage(category);
      let color = "#ccc9c2"; 

      if (avg > 1 && avg <= 1.66) color = "#fccbc7";
      else if (avg > 1.66 && avg <= 2.33) color = "#deefc6";
      else if (avg > 2.33 && avg <= 3) color = "#bdf3f3";

      return { ...acc, [category]: color };
    }, {} as Record<keyof ReviewContent, string>);
  }, [reviews]);

  return categoryColor;
};

export default useReviewColor;
