import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const passRef = useRef<HTMLInputElement>(null);
  const confPassRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passvisible, setPassvisible] = useState<boolean>(false);
  const [confPassVisible, setConfPassVisible] = useState<boolean>(false);

  const handleFnameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };
  const handleLnameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleConfPassChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.target.value);
  };

  // To show/hide password on eye icon click
  const handlePassVisibility = () => {
    setPassvisible((prev: boolean) => {
      if (passRef !== null && passRef.current !== null) {
        if (prev) {
          passRef.current.type = "password";
        } else {
          passRef.current.type = "text";
        }
      }
      return !prev;
    });
  };

  // To show/hide confirm password on eye icon click
  const handleConfPassVisibility = () => {
    setConfPassVisible((prev: boolean) => {
      if (confPassRef !== null && confPassRef.current !== null) {
        if (prev) {
          confPassRef.current.type = "password";
        } else {
          confPassRef.current.type = "text";
        }
      }
      return !prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="m-0 p-0 flex justify-center min-h-screen relative">
      <div className="auth-image login-image absolute top-0 left-0 w-full h-full z-[-1] hidden sm:block"></div>

      <div className="flex-grow flex flex-col pt-4 px-12 justify-center md:w-[50%] w-full items-center bg-transparent">
        {/* Title */}
        <div className="md:mt-4 md:mb-5 mt-[10vh] mb-5 w-full flex flex-col items-center lg:text-sm">
          <h1 className="md:text-3xl text-2xl text-primary-500 font-semibold text-center">
            Welcome back, You have been missed!
          </h1>
        </div>
        {/* ////////// */}

        {/* THE FORM */}
        <div className="w-full flex flex-col items-center">
          <form onSubmit={handleSubmit} className="md:w-[50%] p-6">
            {/* email */}
            <div className="auth-input w-full h-fit">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={handleEmailChange}
                value={email}
                placeholder="Email"
                required
              />
            </div>
            {/* //////////// */}

            {/* <div className="flex md:flex-row flex-col justify-around md:items-center items-left gap-4"> */}
            {/* password */}
            <div className="auth-input">
              <label htmlFor="password">Password</label>
              <div className="relative w-full h-fit">
                <input
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="Password"
                  ref={passRef}
                  className="w-full"
                  required
                />

                <span
                  onClick={handlePassVisibility}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  {/* open eye */}

                  {!passvisible && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}

                  {/* closed eye */}
                  {passvisible && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            {/* //////////// */}

            {/* //////////// */}
            {/* </div> */}

            <div className="flex flex-col items-start mt-5 justify-center w-full">
              <div className="flex gap-4 justify-between items-center mt-4">
                <button
                  type="submit"
                  className="secondary-btn flex gap-4 items-center px-6"
                >
                  Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
                <Link
                  to="/recovery-email-send"
                  className="text-primary-500 pl-1"
                >
                  Forget password?
                </Link>{" "}
              </div>
              <p className="my-3">
                Don't have account?{" "}
                <span className="underline text-primary-500">
                  <Link to="/signup">Signup</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
