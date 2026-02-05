import { useState } from "react";
import styled from "styled-components";
import type { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  border: 1px solid #000;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Photo = styled.img`
  width: 150px;
  height: 130px;
  border-radius: 15px;
  object-fit: cover;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: black;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
  color: #474444;
`;

const TextArea = styled.textarea`
  background-color: white;
  color: black;
  border: 1px solid green;
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;
  width: 90%;
  resize: none;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: red;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: #334d2b;
  color: #fff;
  border: 1px solid #334d2b;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #334d2b;
  }
`;

const ActionButtonDEl = styled.button`
  background-color: red;
  color: #fff;
  padding: 4px 10px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: red;
    border: 1px solid red;
  }
`;

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export default function Tweet({
  username,
  photo,
  tweet,
  userId,
  id,
  avatar
}: ITweet) {
  const user = auth.currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const onUpdate = async () => {
    if (user?.uid !== userId || editedTweet === "" || editedTweet === tweet) {
      setIsEditing(false);
      return;
    }
    try {
      setIsLoading(true);
      const tweetRef = doc(db, "tweets", id);
      await updateDoc(tweetRef, {
        tweet: editedTweet
      });
      setIsEditing(false);
    } catch (e) {
      console.error("error is", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Column>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {avatar ? (
            <AvatarImg src={avatar} alt={username} />
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
          <Username>{username}</Username>
        </div>

        {isEditing ? (
          <TextArea
            rows={3}
            value={editedTweet}
            onChange={(e) => setEditedTweet(e.target.value)}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}

        {user?.uid === userId && (
          <ButtonContainer>
            {isEditing ? (
              <>
                <ActionButton onClick={onUpdate}>
                  {isLoading ? "Saving..." : "Save"}
                </ActionButton>
                <ActionButton onClick={() => setIsEditing(false)}>
                  Cancel
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton onClick={() => setIsEditing(true)}>
                  Edit
                </ActionButton>
                <ActionButtonDEl onClick={onDelete}>Delete</ActionButtonDEl>
              </>
            )}
          </ButtonContainer>
        )}
      </Column>
      <Column>
        {photo ? <Photo src={photo} alt="Tweet content" /> : null}
      </Column>
    </Wrapper>
  );
}