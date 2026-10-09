import { Navigate, useParams, useSearchParams } from "react-router-dom";

// Old per-course enrollment links (/courses/tarteel/enroll?...) still work: they
// are passed on to the single enrollment page.
export default function LegacyEnrollRedirect() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const next = new URLSearchParams(searchParams);
  next.set("course", id);
  return <Navigate to={{ pathname: "/enroll", search: `?${next.toString()}` }} replace />;
}
