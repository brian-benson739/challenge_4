import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f2f2f2;
  padding: 20px;
`;

export const Wrapper = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 30px;
  color: #333;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  position: relative;
  padding-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;

  &.submit {
    background-color: #333;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 12px;
    font-weight: 600;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  font-size: 14px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #333;
  cursor: pointer;


`;

export const TermsText = styled.p`
  font-size: 12px;
  color: #888;
  padding-top: 20px;
  text-align: left;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

export const ForgotPasswordLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`;

export const OrSeparator = styled.div`
  text-align: center;
  padding: 25px;
  position: relative;
  font-size: 14px;
  color: #888;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    border-top: 1px solid #ddd;
  }
  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;


export const Switcher = styled.div`
  padding-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #333;

  a {
    color: inherit;
    text-decoration: underline;
    font-weight: 500;
  }
`;

export const Error = styled.p`
  color: red;
  height: 30px;
  border-radius: 20px;
  margin-top: 10px;
  text-align: center;
`;

export const Description = styled.p`
  width: 100%;
  font-size: 17px;
  color: #898989;
  padding-bottom: 30px;
`