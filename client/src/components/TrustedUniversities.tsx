export default function TrustedUniversities() {
  return (
    <section className="lg:px-[10vw] md:px-[4vw] px-4 py-8 flex md:flex-row flex-col justify-between content-center gap-6 lg:mb-10 md:mb-8 sm:mb-8 mb-4">
      <div className="p-4">
        <h3 className="text-left lg:text-3xl md:text-2xl text-xl mb-4 text-gray-900 font-bold">
          Our students join top universities
        </h3>
        <p className="text-gray-700 text-base">
          Our programs helped students join top universities in the world in the
          past years and you can too.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 p-2 justify-center">
        <span className="top-uni">Oxford</span>
        <span className="top-uni">Cambridge</span>
        <span className="top-uni">MIT</span>
        <span className="top-uni">Stanford</span>
        <span className="top-uni">Seoul</span>
        <span className="top-uni">UCL</span>
        <span className="top-uni">Tsinghua</span>
        <span className="top-uni">Tokyo</span>
      </div>
    </section>
  );
}
