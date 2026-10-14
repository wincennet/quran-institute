import { useEffect, useState } from "react";
import { fetchApprovedReviews, reviewToTestimonial } from "../lib/cms";

// Reviews you approved in the admin page, shaped like the built-in testimonials.
export default function useApprovedReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let active = true;
    fetchApprovedReviews().then((rows) => {
      if (active) setReviews(rows.map(reviewToTestimonial));
    });
    return () => {
      active = false;
    };
  }, []);

  return reviews;
}
