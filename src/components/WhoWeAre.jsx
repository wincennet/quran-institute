import Reveal from "./Reveal";

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="bg-cream-light py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Our Story
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            Who We Are
          </h2>
        </Reveal>

        <Reveal className="mt-10 space-y-6 text-brown-light text-base md:text-lg leading-relaxed">
          <p>
            Assiratul Mustaqeem Institute began at home, with a family that loved Deen-e-Islam. Our
            mother, a qualified teacher who completed her Alima course with Arabic and Tajweed
            training, began teaching at a young age, after her marriage. She raised her children
            with Islamic values and taught them Tajweed, and in 2013 she began teaching the Quran
            online. She taught her own children first, and since then our family has taught
            students living abroad.
          </p>
          <p>
            Today that family tradition has grown into a proper institute. We know how hard it can
            be to find a patient, qualified Quran teacher where you live, especially for families
            raising children far from home. So we bring the classroom to you, with a teacher who
            gives your child her full attention and never rushes them.
          </p>
          <p>
            Every student learns at their own pace. We don’t compare learners or hurry anyone. We
            teach for as long as it takes, because the goal is not finishing a book but building a
            lasting bond with the Quran.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
