import { Link } from "react-router-dom";

const BecomeATeacher = () => {
  return (
    <div>
      {/* Title */}
      <section className="w-full flex flex-col items-center lg:text-sm bg-gray-50 py-4 mt-3">
        <div className="md:text-xl text-base text-gray-900 font-semibold ">
          Become a Teacher at{" "}
          <span className="text-primary-500">Learning Center</span>
        </div>
        <p className="text-gray-700 text-base">
          Who, Why, and how We will answer it all here
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between sm:gap-6 gap-2 sm:flex-row flex-col global-padding pt-0 flex-grow">
          <div className="flex flex-col gap-6 sm:items-start items-center sm:text-left text-center">
            <div>
              <h1 className="lg:text-4xl md:text-3xl text-2xl md:text-gray-900 text-gray-900 font-semibold mb-3">
                Become a Teacher
              </h1>
              <p className="text-gray-700 text-base">
                Join us and be one of our elite teachers and help students
                achieve their goals
              </p>
            </div>
            <Link to="/new-teacher/create-account" className="secondary-btn">
              Get Started
            </Link>
          </div>

          {/* The image */}
          <div className="w-fit">
            <img
              src="/images/enthusiasm.jpg"
              alt="An enthusiastic girl that points left"
            />
          </div>
        </div>

        {/* ////////////// */}
        <div className="flex gap-3 flex-wrap global-padding py-6 bg-primary-100 justify-between items-center">
          {/* /////start item1/// */}
          <div className="flex gap-2 items-start p-2">
            <img src="/images/people-fill.svg" alt="icon represents people" />
            <div className="flex flex-col gap-1">
              {/* make this dynamic later */}
              <span className="text-2xl font-semibold text-gray-900">
                67.1k
              </span>
              <span className="text-base text-gray-500">Students</span>
            </div>
          </div>
          {/* //////// */}

          {/* /////start item2/// */}
          <div className="flex gap-2 items-start p-2">
            <img src="/images/file-earmark-check-fill.svg" alt="file checked" />
            <div className="flex flex-col gap-1">
              {/* make this dynamic later */}
              <span className="text-2xl font-semibold text-gray-900">150</span>
              <span className="text-base text-gray-500">
                Certified Instructor
              </span>
            </div>
          </div>
          {/* //////// */}

          {/* /////start item3/// */}
          <div className="flex gap-2 items-start p-2">
            <img src="/images/check-badge.svg" alt="badge checked" />
            <div className="flex flex-col gap-1">
              {/* make this dynamic later */}
              <span className="text-2xl font-semibold text-gray-900">
                99.9%
              </span>
              <span className="text-base text-gray-500">Success Rate</span>
            </div>
          </div>
          {/* //////// */}

          {/* /////start item4/// */}
          <div className="flex gap-2 items-start p-2">
            <img
              src="/images/graduation-hat.svg"
              alt="icon represents people"
            />
            <div className="flex flex-col gap-1">
              {/* make this dynamic later */}
              <span className="text-2xl font-semibold text-gray-900">100+</span>
              <span className="text-base text-gray-500">
                Locations around country
              </span>
            </div>
          </div>
          {/* //////// */}
        </div>
      </section>
      {/* ////////// */}

      {/* WHY */}
      <section className="flex md:flex-row flex-col global-padding gap-8 my-8">
        <div className="md:max-w-[40vw] max-w-full rounded-none card-shadow">
          <img
            src="/images/study-8.jpg"
            alt="a competation between 2 students setting behind labtop with their teacher and other classmates"
            className="w-full h-full object-fit object-center"
          />
        </div>
        <div className="px-4">
          <div className="mb-4">
            <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-gray-900 mb-3">
              Why you will start teaching at{" "}
              <span className="text-primary-500">Learning Center</span>?
            </h3>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio in facilis nostrum sint, ea perspiciatis eos minima
              autem dolorum voluptates.
            </p>
          </div>
          <ul className="list-none m-0 p-0">
            {/* list item1 */}
            <li className="flex gap-3 items-start mb-2">
              <img
                src="/images/check-circle-fill.svg"
                alt="check mark inside of a circle"
                className="p-1"
              />
              {/* /////// */}
              <span className="flex flex-col">
                <span className="text-gray-900 text-lg">
                  Teach your students as you want
                </span>
                <span className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor, fuga necessitatibus eum magnam cum exercitationem?
                </span>
              </span>
            </li>
            {/* //////// */}

            {/* list item2 */}
            <li className="flex gap-3 items-start mb-2">
              <img
                src="/images/check-circle-fill.svg"
                alt="check mark inside of a circle"
                className="p-1"
              />
              {/* /////// */}
              <span className="flex flex-col">
                <span className="text-gray-900 text-lg">
                  Competitive salary
                </span>
                <span className="text-gray-700 text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Earum esse facilis ea libero qui consequatur.
                </span>
              </span>
            </li>
            {/* //////// */}
            {/* list item3 */}
            <li className="flex gap-3 items-start mb-2">
              <img
                src="/images/check-circle-fill.svg"
                alt="check mark inside of a circle"
                className="p-1"
              />
              {/* /////// */}
              <span className="flex flex-col">
                <span className="text-gray-900 text-lg">
                  Positive environment to help you grow
                </span>
                <span className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  rerum aspernatur perferendis quas saepe optio! Numquam aut
                  voluptatum eos explicabo!
                </span>
              </span>
            </li>
            {/* //////// */}
          </ul>
        </div>
      </section>
      {/* ////////// */}

      {/* HOW */}
      <section className="global-padding bg-gray-50">
        <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-gray-900 mb-10">
          How you'll become Teacher?
        </h3>
        {/* <div className="flex flex-wrap gap-6 justify-between items-center"> */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))] auto-rows-auto gap-x-4 gap-y-6 justify-center items-center">
          {/* card1 */}
          <div className="flex p-4 card-shadow-sm flex-col text-center max-w-[270px]">
            <h4 className="md:text-lg text-base font-semibold text-primary-500 mb-1">
              <span className="text-gray-900">1.</span>Create an account
            </h4>
            <p className="text-gray-700 lg:text-base text-sm p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              qui accusantium suscipit. Iure, corporis pariatur!
            </p>
          </div>
          {/* //////// */}

          {/* card2 */}
          <div className="flex p-4 card-shadow-sm flex-col text-center max-w-[270px]">
            <h4 className="md:text-lg text-base font-semibold text-primary-500 mb-1">
              <span className="text-gray-900">2.</span>Schedual an interview
            </h4>
            <p className="text-gray-700 lg:text-base text-sm p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              qui accusantium suscipit. Iure, corporis pariatur!
            </p>
          </div>
          {/* /////////// */}
          {/* card3 */}
          <div className="flex p-4 card-shadow-sm flex-col text-center max-w-[270px]">
            <h4 className="md:text-lg text-base font-semibold text-primary-500 mb-1">
              <span className="text-gray-900">3.</span>Attend our preparation
              training for new teachers
            </h4>
            <p className="text-gray-700 lg:text-base text-sm p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              qui accusantium suscipit. Iure, corporis pariatur!
            </p>
          </div>
          {/* ////////////// */}

          {/* card4 */}
          <div className="flex p-4 card-shadow-sm flex-col text-center max-w-[270px]">
            <h4 className="md:text-lg text-base font-semibold text-primary-500 mb-1">
              <span className="text-gray-900">4.</span>Start teaching
            </h4>
            <p className="text-gray-700 lg:text-base text-sm p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              qui accusantium suscipit. Iure, corporis pariatur!
            </p>
          </div>
          {/* ///////////// */}
        </div>
      </section>

      {/* WHO */}
      <section className="global-padding lg:h-[150vh] my-14">
        {/* <div className="flex flex-col h-full justify-center items-center"> */}
        <div className="mb-12">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-gray-900 mb-3">
            Who become a teacher
          </h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
            provident autem corrupti dolores eius optio? Vero aspernatur ut
            ratione minus quas impedit, tempore nisi ab obcaecati dolorem cum
            similique nam perspiciatis corporis dignissimos expedita odio
            cupiditate, animi ipsa. Itaque ut ipsum, nam voluptate iste aliquid
            nobis ratione facere deleniti cum?
          </p>
        </div>

        <div className="flex lg:flex-row gap-8 flex-col-reverse overflow-hidden">
          <ul className="list-none m-0 p-0 flex flex-col gap-6">
            {/* list item1 */}
            <li className="flex gap-3 items-start mb-2">
              <img
                src="/images/check-circle-fill.svg"
                alt="check mark inside of a circle"
                className="p-1"
              />
              {/* /////// */}
              <span className="flex flex-col">
                <span className="text-gray-900 text-lg">Enthusiasm</span>
                <span className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Obcaecati voluptate, eveniet magni in eligendi similique
                  reprehenderit nisi minima atque consequatur dolore sint! Quia,
                  sunt temporibus?
                </span>
              </span>
            </li>
            {/* //////// */}

            {/* list item2 */}
            <li className="flex gap-3 items-start mb-2">
              <img
                src="/images/check-circle-fill.svg"
                alt="check mark inside of a circle"
                className="p-1"
              />
              {/* /////// */}
              <span className="flex flex-col">
                <span className="text-gray-900 text-lg">Growing mindsit</span>
                <span className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ratione quae commodi, quam blanditiis, neque qui eveniet est
                  a, quisquam odit excepturi alias placeat eos distinctio ex
                  assumenda culpa dicta repudiandae.
                </span>
              </span>
            </li>
            {/* //////// */}
            {/* list item3 */}
            <li className="flex gap-3 items-start mb-2">
              <img
                src="/images/check-circle-fill.svg"
                alt="check mark inside of a circle"
                className="p-1"
              />
              {/* /////// */}
              <span className="flex flex-col">
                <span className="text-gray-900 text-lg">Positive attitude</span>
                <span className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  iusto unde ab dolorum repellat, cum nostrum id quo maxime
                  tenetur nisi blanditiis culpa delectus autem repellendus quod
                  nobis quam veritatis.
                </span>
              </span>
            </li>
            {/* //////// */}

            {/* list item4 */}
            <li className="flex gap-3 items-start mb-2">
              <img
                src="/images/check-circle-fill.svg"
                alt="check mark inside of a circle"
                className="p-1"
              />
              {/* /////// */}
              <span className="flex flex-col">
                <span className="text-gray-900 text-lg">Responsibility</span>
                <span className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  doloribus amet assumenda odio, error laborum nulla tenetur
                  sint numquam! Natus accusamus alias incidunt nesciunt ullam
                  modi optio autem rerum sequi!
                </span>
              </span>
            </li>
            {/* //////// */}
          </ul>

          <div className="flex-grow flex min-w-[50%] h-full justify-center items-center">
            <img
              src="/images/group1.jpg"
              alt="a teacher"
              className="object-cover w-full lg:hidden block"
            />

            <img
              src="/images/group2.jpg"
              alt="a teacher"
              className="object-cover w-full lg:block hidden"
            />
          </div>
        </div>

        {/* </div> */}
      </section>

      {/* GO TO REGISTERATION FORM */}
      <section className="flex items-center justify-between gap-6 md:flex-row flex-col global-padding flex-grow bg-gray-900 border-b-1 border-gray-800">
        <div className="flex flex-col gap-6 md:items-start items-center md:text-left text-center md:max-w-[50%]">
          <div>
            <h1 className="lg:text-4xl md:text-3xl text-2xl text-white font-semibold mb-3">
              Start teaching with us and inspire others
            </h1>
            <p className="text-gray-400 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              tempore sapiente iusto. Accusantium impedit saepe optio dolorem
              explicabo ad, deleniti commodi cum, itaque officia velit.
            </p>
          </div>
          <Link to="/new-teacher/create-account" className="secondary-btn">
            Register Now
          </Link>
        </div>

        {/* The image */}
        <div className="flex gap-4 items-end max-h-[75vh] md:px-[5vw] px-5 overflow-x-hidden">
          <img
            src="/images/pexels-karolina-grabowska-8005452-part2.JPG"
            alt="An enthusiastic girl that points right"
            className="object-cover"
          />
          <img
            src="/images/pexels-karolina-grabowska-8005452-part1.JPG"
            alt="An enthusiastic girl that points left"
          />
        </div>
      </section>
    </div>
  );
};

export default BecomeATeacher;
