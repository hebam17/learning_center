import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RESET_PASSWORD } from "../../graphql/mutation/authMutations";
import { UserType } from "../../__generated__/graphql";

export const ResetPassword = () => {
  const [newPass, setNewPass] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location:", location);
  const { email, code } = location.state.data;

  console.log({ email, newPass });

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD,
    {
      variables: {
        email,
        code,
        newPassword: newPass,
        type: UserType.Student,
      },
      onCompleted({ resetPassword }) {
        setErrorMessage("");
        console.log("reset Password:", resetPassword);
        navigate("/login", {
          replace: true,
          state: {
            data: {
              nessage: "You reset the password , now please login",
            },
          },
        });
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPass(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !newPass.trim()) {
        navigate("/recovery", {
          replace: true,
          state: {
            data: {
              errMessage:
                "Sorry, an error occurred please write your email again",
            },
          },
        });
      }
      resetPassword();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="md:mx-6 mx-4">
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="lg:text-4xl md:text-3xl text-2xl leading-10 text-center font-semibold md:mb-4 mb-3 text-sky-500">
          Reset password
        </h1>

        <p className="font-semibold lg:text-lg md:text-base text-sm text-center mb-2">
          Enter the new password
        </p>

        {/* <DisplayError error={error} /> */}

        <form method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              name="newPassword"
              id="newPassword"
              onChange={handleChange}
              placeholder="New password here"
              className="w-full my-1 px-3 py-2 rounded-lg bg-sky-50 focus:outline-sky-500 focus:border-none lg:text-lg md:text-base text-sm"
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 lg:text-2xl md:text-xl text-lg text-white rounded-lg mt-4 bg-sky-500"
            >
              submit
            </button>
          </div>
        </form>
        <div className="text-center pt-4 md:text-base text-sm">
          <span className="text-gray-800 tracking-tight">
            Cannot get the number?
            <button
              onClick={() => navigate("/recovery-email-send")}
              className="text-red-500 pl-1"
            >
              Resend
            </button>
          </span>
        </div>
      </div>
    </main>
  );
};
