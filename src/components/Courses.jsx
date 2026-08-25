import { useState } from "react";
import Reveal from "./Reveal";
import CourseCard from "./CourseCard";
import { COURSES } from "../lib/constants";

export default function Courses() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="courses" className="bg-cream py-24 kufic-pattern">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Our Courses
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            A structured path through the 5 rights of the Quran
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">
          {COURSES.map((course, i) => (
            <Reveal key={course.id} delay={i * 0.1}>
              <CourseCard
                course={course}
                expanded={expandedId === course.id}
                onToggle={() =>
                  setExpandedId((current) => (current === course.id ? null : course.id))
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
