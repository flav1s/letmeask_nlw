import '../styles/auth.scss';

import { Button } from '../components/Button';
import IllustrationImg from '../assets/images/illustration.svg';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';

// import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  // const { user } = useAuth();
  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="Ask and Answer Illustration" />
        <strong>Crie salas e Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
