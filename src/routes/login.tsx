import { Link, useNavigate } from "react-router-dom";
import GithubButton from "../components/github-btn";
import {
  PageContainer,
  Wrapper,
  Title,
  Description,
  Form,
  InputWrapper,
  Input,
  CheckboxWrapper,
  CheckboxLabel,
  ForgotPasswordLink,
  OrSeparator,
  Switcher,
  Error
} from "../components/auth-components";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
    console.log(name, email, password);
  };

  return (
    <PageContainer>
      <Wrapper>
        <Title>LogIn 𝕏</Title>
        <Description>
          Log in by entering your email address and password or continue with
          social login.
        </Description>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <Input
              onChange={onChange}
              value={email}
              name="email"
              placeholder="Email address"
              type="email"
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={onChange}
              value={password}
              name="password"
              placeholder="Password"
              type="password"
              required
            />
          </InputWrapper>

          <Input
            className="submit"
            type="submit"
            value={isLoading ? "Loading...." : "Login"}
          />
          {error !== "" ? <Error>{error}</Error> : null}
        </Form>
        <CheckboxWrapper>
          <CheckboxLabel>
            <Input type="checkbox" />
            Remember me
          </CheckboxLabel>
          <ForgotPasswordLink to="/create-account">
            Forgot password?
          </ForgotPasswordLink>
        </CheckboxWrapper>
        <OrSeparator>Or</OrSeparator>

        <GithubButton />
        <Switcher>
          Don't have an account?
          <Link to="/create-account"> Sign up here.</Link>
        </Switcher>
      </Wrapper>
    </PageContainer>
  );
}
