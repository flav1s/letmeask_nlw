import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type UseRoomType = {
  question: QuestionType[];
  title: string;
};

export function useRoom(roomId: string): UseRoomType {
  const { user } = useAuth();
  const [question, setQuestion] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              // eslint-disable-next-line @typescript-eslint/no-shadow
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestion(parsedQuestions);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { question, title };
}
