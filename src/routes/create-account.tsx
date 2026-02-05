import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
import GithubButton from "../components/github-btn";

import {
  PageContainer,
  Wrapper,
  Title,
  Form,
  InputWrapper,
  Input,
  OrSeparator,
  Switcher,
  Error,
  TermsText
} from "../components/auth-components";

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name
      });
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
        <Title>Create Your Account</Title>
        <GithubButton />
        <OrSeparator>Or</OrSeparator>

        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <Input
              onChange={onChange}
              name="name"
              value={name}
              placeholder="Name"
              type="text"
              required
            />
          </InputWrapper>
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
            value={isLoading ? "Loading...." : "Create Account"}
          />
          {error !== "" ? <Error>{error}</Error> : null}
        </Form>
        <TermsText>
          By creating an account, you are agree to the
          <a href="/create-account"> Terms of Service</a> and
          <a href="/create-account"> Privacy Policy</a>.
        </TermsText>
        <Switcher>
          Already have an account?
          <Link to="/login"> Log in here</Link>
        </Switcher>
      </Wrapper>
    </PageContainer>
  );
}
