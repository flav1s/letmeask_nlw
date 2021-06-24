import React from "react";
import { useParams } from "react-router";

import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom(): JSX.Element {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { question, title } = useRoom(roomId);
  const { user } = useAuth();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined type="submit">
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
              <Question key={q.id} content={q.content} author={q.author} />
            );
          })}
        </div>
      </main>
    </div>
  );
}
