import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListaUsuarios.css";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nomeBusca, setNomeBusca] = useState("");

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("https://cadastrodeusuarios-production.up.railway.app/usuario");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const buscarPorNome = async () => {
    if (!nomeBusca.trim()) {
      fetchUsuarios(); // se campo vazio, retorna tudo
      return;
    }

    try {
      const response = await axios.get(`https://cadastrodeusuarios-production.up.railway.app/usuario/pesquisa/${nomeBusca}`);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao pesquisar usuário:", error);
      alert("Erro ao pesquisar usuário.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Tem certeza que deseja deletar este usuário?");
    if (!confirm) return;

    try {
      await axios.delete(`https://cadastrodeusuarios-production.up.railway.app/usuario/${id}`);
      setUsuarios(usuarios.filter((u) => u.id !== id));
      alert("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao deletar usuário.");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="lista-container">
      <Link to="/" className="voltar-btn">
        Voltar para Cadastro
      </Link>

      <h1>Usuários Cadastrados</h1>

      {/* Barra de pesquisa */}
      <div className="pesquisa-container">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={nomeBusca}
          onChange={(e) => setNomeBusca(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarPorNome()}
        />
        <button onClick={buscarPorNome}>Pesquisar</button>
      </div>

      <div className="usuarios-grid">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="usuario-card">
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Idade:</strong> {usuario.idade}</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>
            <button className="delete-btn" onClick={() => handleDelete(usuario.id)}>
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaUsuarios;
