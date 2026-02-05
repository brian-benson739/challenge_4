import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import {  Link, useNavigate } from "react-router-dom";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Timeline from "../components/timeline";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 500%;
  background-color: #ffffff;
  height: 750px;
  overflow: hidden;
`;

const FaceWrapper = styled.div`
  display: flex;
  width: 55%;
  border-radius: 15px;
  border: 1px solid #000;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid #000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const MainContentArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 15px;
  h1 {
    font-size: 20px;
    margin: 0;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding-bottom: 15px;
  gap: 35px;
  h1 {
    font-size: 16px;
    color: #ff4d4d;
  }
`;

const ProfileSection = styled.div`
  padding-bottom: 20px;
  margin-top: 10px;
`;

const NavLink = styled.div`
  border-top: 1px solid #000;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  color: black;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AvatarImg = styled.img`
  width: 50px;
  display: flex;
  height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const FormArea = styled.div`
  border-bottom: 1px solid #000;
  padding: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  background-color: transparent;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  color: #000;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
  resize: none;
  font-family: inherit;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  align-items: center;
`;

const AttachFileButton = styled.label`
  color: #000;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  border: 1px solid #000;
  &:hover {
    background-color: #334d2b;
    color: white;
  }
`;

const SubmitBtn = styled.input`
  background-color: #334d2b;
  color: #fff;
  border: 1px solid #334d2b;
  padding: 8px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #334d2b;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const ScrollableTimelineContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  padding: 15px;
`;

export default function TweetForm() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
        photoURL: user.photoURL
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: url });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onLogOut = async () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <PageContainer>
      <FaceWrapper>
        <Sidebar>
          <Header>
            <span>Twitter 𝕏</span>
          </Header>
          <ProfileSection as="a" href="/profile">
            {user?.photoURL ? (
              <AvatarImg src={user.photoURL} alt="Profile" />
            ) : (
              <AvatarPlaceholder>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              </AvatarPlaceholder>
            )}
          </ProfileSection>
          <NavLink>@{user?.displayName || "Username"}</NavLink>
          <NavLink as="a" href="/" style={{ textDecoration: "none" }}>
            Home
          </NavLink>
          <NavLink as={Link} to="/profile" style={{ textDecoration: "none" }}>
            Profile
          </NavLink>
        </Sidebar>
        <MainContentArea> 
          <Header> 
            <h1>Welcome, {user?.displayName || "To 𝕏"}</h1>
            <HeaderLinks onClick={onLogOut}> 
              <h1>Logout</h1> 
            </HeaderLinks> 
          </Header> 
 
          <Form onSubmit={onSubmit}> 
            <FormArea>
              <TextArea
                onChange={onChange}
                required
                rows={5}
                value={tweet}
                maxLength={180}
                placeholder="Write your tweet here..."
              />
              <InputWrapper>
                <AttachFileButton htmlFor="file">
                  {file ? "Photo added 𝕏" : "Add photo"}
                </AttachFileButton>
                <AttachFileInput
                  onChange={onFileChange}
                  type="file"
                  id="file"
                  accept="image/*"
                />
                <SubmitBtn
                  type="submit"
                  value={isLoading ? "Posting..." : "Post Tweet"}
                />
              </InputWrapper>
            </FormArea>
          </Form>

          <ScrollableTimelineContainer>
            <Timeline />
          </ScrollableTimelineContainer>
        </MainContentArea>
      </FaceWrapper>
    </PageContainer>
  );
}
