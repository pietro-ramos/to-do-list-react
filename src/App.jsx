import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    // Estados para tarefas pendentes e concluídas
    const [tarefasPendentes, setTarefasPendentes] = useState([]);
    const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');

    // Adicionar nova tarefa à lista de pendentes
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefasPendentes([...tarefasPendentes, novaTarefa]);
            setNovaTarefa('');
        }
    };

    // Mover tarefa de pendente para concluída
    const concluirTarefa = (indice) => {
        const tarefaConcluida = tarefasPendentes[indice];
        setTarefasPendentes(tarefasPendentes.filter((_, i) => i !== indice));
        setTarefasConcluidas([...tarefasConcluidas, tarefaConcluida]);
    };

    // Mover tarefa de concluída de volta para pendente
    const desfazerTarefa = (indice) => {
        const tarefaDesfeita = tarefasConcluidas[indice];
        setTarefasConcluidas(tarefasConcluidas.filter((_, i) => i !== indice));
        setTarefasPendentes([...tarefasPendentes, tarefaDesfeita]);
    };

    // Remover tarefa concluída
    const removerTarefa = (indice) => {
        setTarefasConcluidas(tarefasConcluidas.filter((_, i) => i !== indice));
    };

    return (
        <div className="App">
            <h1>Lista de Tarefas</h1>

            {/* Input para adicionar nova tarefa */}
            <div>
                <input
                    type="text"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    placeholder="Digite uma nova tarefa"
                />
                <button onClick={adicionarTarefa}>Adicionar</button>
            </div>

            {/* Lista de tarefas pendentes */}
            <div>
                <h2>Tarefas Pendentes</h2>
                {tarefasPendentes.length > 0 ? (
                    <ul>
                        {tarefasPendentes.map((tarefa, indice) => (
                            <li key={indice}>
                                {tarefa}{' '}
                                <button onClick={() => concluirTarefa(indice)}>Concluir</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Não há tarefas pendentes.</p>
                )}
            </div>

            {/* Lista de tarefas concluídas */}
            <div>
                <h2>Tarefas Concluídas</h2>
                {tarefasConcluidas.length > 0 ? (
                    <ul>
                        {tarefasConcluidas.map((tarefa, indice) => (
                            <li key={indice} style={{ textDecoration: 'line-through' }}>
                                {tarefa}{' '}
                                <button onClick={() => desfazerTarefa(indice)}>Desfazer</button>{' '}
                                <button onClick={() => removerTarefa(indice)}>Apagar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Não há tarefas concluídas.</p>
                )}
            </div>
        </div>
    );
}

export default App;
