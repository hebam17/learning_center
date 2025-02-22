import { useMutation } from "@apollo/client";
import { Token } from "graphql";
import { ReactElement, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";
import { REGISTER_VERIFICATION } from "../graphql/mutation/authMutations";

const RegisterVerification = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const {
    state: { type, data },
  } = location;

  const [verificationToken, setVerificationToken] = useState("");

  const [registerVerification, { loading, error, data: registerData }] =
    useMutation<Token>(REGISTER_VERIFICATION, {
      variables: {
        input: {
          userId: data.register.userId,
          type: type,
          code: verificationToken,
        },
      },
    });

  const handleVerificationTokenChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationToken(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await registerVerification();
      console.log("Result:", result);
    } catch (error) {
      console.log("error:", error);
    }
  };

  let content: ReactElement | ReactElement[];

  if (loading) content = <p>Loading</p>;

  if (error) {
    content = (
      <p>Sorry, an error occure, Please refresh the page or try again later!</p>
    );
  }

  content = (
    <form onSubmit={handleSubmit}>
      <div className="auth-input">
        <label htmlFor="lname">Verification Input:</label>
        <input
          type="text"
          id="verificationToken"
          onChange={handleVerificationTokenChange}
          value={verificationToken}
          placeholder="Last name"
          required
        />
      </div>
      <button
        type="submit"
        className="secondary-btn"
        disabled={navigation.state === "submitting"}
      >
        {navigation.state === "submitting" ? "Verifying ..." : "Verify"}
      </button>
    </form>
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {content}
    </div>
  );
};

export default RegisterVerification;
