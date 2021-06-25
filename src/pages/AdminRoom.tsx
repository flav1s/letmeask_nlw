import React from "react";
import { useHistory, useParams } from "react-router";

import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import deleteImg from "../assets/images/delete.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom(): JSX.Element {
  const params = useParams<RoomParams>();
  const history = useHistory();
  const roomId = params.id;

  const { question, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({ endedAt: new Date() });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    // eslint-disable-next-line no-alert
    if (window.confirm("Você tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isAnswered: true });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isHighlighted: true });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined type="submit" onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {question.length > 0 && <span>{question.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {question.map((q) => {
            return (
              <Question
                key={q.id}
                content={q.content}
                author={q.author}
                isHighlighted={q.isHighlighted}
                isAnswered={q.isAnswered}
              >
                {!q.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(q.id)}
                    >
                      <img src={checkImg} alt="Check question" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(q.id)}
                    >
                      <img src={answerImg} alt="Answer question" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.id)}
                >
                  <img src={deleteImg} alt="Remove question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
