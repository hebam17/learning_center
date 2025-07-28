import { Form, Link, useNavigate, useNavigation } from "react-router-dom";
import DisplayError from "../../components/DisplayError";
import { useState } from "react";
import { EmailValidation } from "../../utils/validations";
import { useMutation } from "@apollo/client";
import { FORGET_PASSWORD } from "../../graphql/mutation/authMutations";
import { UserType } from "../../__generated__/graphql";

const RecoveryEmailSend = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const [forgetPassword, { loading, error, data }] = useMutation(
    FORGET_PASSWORD,
    {
      variables: {
        email,
        type: UserType.Student,
      },
      onCompleted({ forgetPassword }) {
        setErrorMessage("");
        console.log(forgetPassword);

        navigate("/recovery", {
          replace: true,
          state: {
            data: { email },
          },
        });
      },
    }
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting");
    console.log(navigation);
    try {
      if (!email.trim()) setErrorMessage("Please write your email first");

      if (!EmailValidation(email))
        setErrorMessage("Please provide a valide email");

      forgetPassword();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="md:mx-6 mx-4">
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="lg:text-4xl md:text-3xl text-2xl leading-10 text-center font-semibold md:mb-4 mb-3 text-primary-500">
          Reset Your Password
        </h1>
        <p className="font-semibold lg:text-lg md:text-base text-sm text-center mb-2">
          Enter your email adress below and we’ll send you an Email with
          instructions
        </p>

        <DisplayError error={errorMessage} />

        <div className="lg:w-1/2 md:w-2/3 sm:w-3/4 w-full mx-auto">
          <Form
            method="post"
            className="profile py-2 flex flex-col justify-center"
            onSubmit={handleSubmit}
            replace
          >
            <input
              type="email"
              onChange={handleEmailChange}
              className="w-full my-1 px-3 py-2 rounded-lg bg-white outline outline-1 outline-primary-500 focus:border-none lg:text-lg md:text-base text-sm font-semibold"
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 lg:text-2xl md:text-xl text-lg text-white rounded-lg mt-4 bg-primary-500"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Sending ..."
                : "Send Verification Code"}
            </button>
          </Form>
        </div>
        <div className="text-center pt-4 md:text-base text-sm">
          <span className="text-gray-800 tracking-tight">
            remembered the password?
            <Link to="/login" className="text-primary-700 pl-1">
              Login Now
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default RecoveryEmailSend;
