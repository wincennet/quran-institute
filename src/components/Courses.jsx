import Reveal from "./Reveal";
import CourseCard from "./CourseCard";
import ScrollRow from "./ScrollRow";
import { COURSES } from "../lib/constants";
import { STAR_PATTERN_STYLE } from "../lib/starPattern";

export default function Courses() {
  const groupCourses = COURSES.filter((course) => course.formats?.includes("Group"));
  const individualCourses = COURSES.filter((course) => course.formats?.includes("Individual"));

  return (
    <section id="courses" className="bg-[#352b23] py-24" style={STAR_PATTERN_STYLE}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-left max-w-2xl">
          <span className="font-sans text-gold text-sm uppercase tracking-[0.25em]">
            Our Courses
          </span>
          <h2 className="font-heading text-cream-light text-3xl md:text-4xl font-medium mt-3">
            A structured path through the 5 rights of the Quran
          </h2>
        </Reveal>

        {individualCourses.length > 0 && (
          <div className="mt-16">
            <Reveal className="text-left max-w-xl">
              <h3 className="font-heading text-cream-light text-3xl md:text-4xl font-bold">
                Individual Courses
              </h3>
              <p className="text-cream/75 text-sm mt-2">
                One-to-one — choose your own days and timetable
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <ScrollRow>
                {individualCourses.map((course) => (
                  <CourseCard key={course.id} course={course} format="Individual" />
                ))}
              </ScrollRow>
            </Reveal>
          </div>
        )}

        {groupCourses.length > 0 && (
          <div className="mt-16">
            <Reveal className="text-left max-w-xl">
              <h3 className="font-heading text-cream-light text-3xl md:text-4xl font-bold">
                Group Courses
              </h3>
              <p className="text-cream/75 text-sm mt-2">
                Fixed-schedule batches, learn alongside other students
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <ScrollRow>
                {groupCourses.map((course) => (
                  <CourseCard key={course.id} course={course} format="Group" />
                ))}
              </ScrollRow>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
