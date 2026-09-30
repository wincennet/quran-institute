import Reveal from "./Reveal";
import CourseCard from "./CourseCard";
import { COURSES } from "../lib/constants";

export default function Courses() {
  const groupCourses = COURSES.filter((course) => course.formats?.includes("Group"));
  const individualCourses = COURSES.filter((course) => course.formats?.includes("Individual"));

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

        {groupCourses.length > 0 && (
          <div className="mt-16">
            <Reveal className="text-center max-w-xl mx-auto">
              <span className="font-sans text-gold-dark text-xs uppercase tracking-[0.2em]">
                Group Courses
              </span>
              <h3 className="font-heading text-brown text-xl md:text-2xl font-semibold mt-2">
                Fixed-schedule batches, learn alongside other students
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10 max-w-3xl mx-auto">
              {groupCourses.map((course, i) => (
                <Reveal key={course.id} delay={i * 0.1}>
                  <CourseCard course={course} format="Group" />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {individualCourses.length > 0 && (
          <div className="mt-16">
            <Reveal className="text-center max-w-xl mx-auto">
              <span className="font-sans text-gold-dark text-xs uppercase tracking-[0.2em]">
                Individual Courses
              </span>
              <h3 className="font-heading text-brown text-xl md:text-2xl font-semibold mt-2">
                One-to-one — choose your own language and timetable
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10 max-w-3xl mx-auto">
              {individualCourses.map((course, i) => (
                <Reveal key={course.id} delay={i * 0.1}>
                  <CourseCard course={course} format="Individual" />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
