class Funcionario {
  constructor(id, nome, idade, cargo, salario) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }
  
  // Métodos de acesso (getters e setters)
  getNome() { return this.nome; }
  setNome(novoNome) { this.nome = novoNome; }
  
  getIdade() { return this.idade; }
  setIdade(novaIdade) { this.idade = novaIdade; }
  
  getCargo() { return this.cargo; }
  setCargo(novoCargo) { this.cargo = novoCargo; }
  
  getSalario() { return this.salario; }
  setSalario(novoSalario) { this.salario = novoSalario; }
  
  toString() {
    return `ID: ${this.id}, Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario}`;
  }
}

// Array para armazenar os funcionários
let funcionarios = [];
let idAtual = 1;
let modoEdicao = false;
let funcionarioEmEdicao = null;

// Seleção dos elementos HTML
const form = document.getElementById('formFuncionario');
const tabela = document.getElementById('tabelaFuncionarios').getElementsByTagName('tbody')[0];
const resultadoRelatorio = document.getElementById('resultadoRelatorio');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  // Captura os valores do formulário
  const nome = document.getElementById('nome').value;
  const idade = parseInt(document.getElementById('idade').value);
  const cargo = document.getElementById('cargo').value;
  const salario = parseFloat(document.getElementById('salario').value);

  if (modoEdicao && funcionarioEmEdicao != null) {
    // Atualiza os dados do funcionário em edição
    funcionarioEmEdicao.nome = nome;
    funcionarioEmEdicao.idade = idade;
    funcionarioEmEdicao.cargo = cargo;
    funcionarioEmEdicao.salario = salario;
    modoEdicao = false;
    funcionarioEmEdicao = null;
  } else {
    // Cria um novo funcionário e adiciona ao array
    const novoFuncionario = new Funcionario(idAtual++, nome, idade, cargo, salario);
    funcionarios.push(novoFuncionario);
  }

  // Limpa o formulário e atualiza a tabela
  form.reset();
  listarFuncionarios();
});

// Função para listar os funcionários na tabela HTML
function listarFuncionarios() {
  tabela.innerHTML = '';
  funcionarios.forEach(func => {
    let linha = tabela.insertRow();
    linha.insertCell(0).innerText = func.id;
    linha.insertCell(1).innerText = func.nome;
    linha.insertCell(2).innerText = func.idade;
    linha.insertCell(3).innerText = func.cargo;
    linha.insertCell(4).innerText = func.salario.toFixed(2);
    
    // Cria a célula para os botões de ação
    let acoes = linha.insertCell(5);
    
    // Botão Editar
    let btnEditar = document.createElement('button');
    btnEditar.innerText = 'Editar';
    btnEditar.onclick = () => carregarFuncionarioParaEdicao(func.id);
    acoes.appendChild(btnEditar);

    // Botão Excluir
    let btnExcluir = document.createElement('button');
    btnExcluir.innerText = 'Excluir';
    btnExcluir.onclick = () => excluirFuncionario(func.id);
    acoes.appendChild(btnExcluir);
  });
}

// Função para excluir funcionário utilizando arrow function
const excluirFuncionario = (id) => {
  funcionarios = funcionarios.filter(func => func.id !== id);
  listarFuncionarios();
}

// Função para carregar os dados do funcionário para edição utilizando arrow function
const carregarFuncionarioParaEdicao = (id) => {
  const func = funcionarios.find(f => f.id === id);
  if (func) {
    document.getElementById('nome').value = func.nome;
    document.getElementById('idade').value = func.idade;
    document.getElementById('cargo').value = func.cargo;
    document.getElementById('salario').value = func.salario;
    modoEdicao = true;
    funcionarioEmEdicao = func;
  }
}

// Relatórios utilizando métodos de array (map, filter, reduce)

// Relatório: Funcionários com salário maior que R$ 5000
document.getElementById('btnRelatorioSalario').addEventListener('click', () => {
  const relatorio = funcionarios.filter(func => func.salario > 5000);
  exibirRelatorio('Funcionários com salário > R$ 5000', relatorio);
});

// Relatório: Média Salarial dos Funcionários
document.getElementById('btnMediaSalarial').addEventListener('click', () => {
  if (funcionarios.length === 0) {
    exibirRelatorio('Média Salarial', 'Sem dados.');
    return;
  }
  const somaSalarios = funcionarios.reduce((soma, func) => soma + func.salario, 0);
  const media = somaSalarios / funcionarios.length;
  exibirRelatorio('Média Salarial', media.toFixed(2));
});

// Relatório: Cargos Únicos
document.getElementById('btnCargosUnicos').addEventListener('click', () => {
  const cargos = funcionarios.map(func => func.cargo);
  const cargosUnicos = [...new Set(cargos)];
  exibirRelatorio('Cargos Únicos', cargosUnicos);
});

// Relatório: Lista de Nomes em Maiúsculo
document.getElementById('btnNomesMaiusculo').addEventListener('click', () => {
  const nomesMaiusculo = funcionarios.map(func => func.nome.toUpperCase());
  exibirRelatorio('Nomes em Maiúsculo', nomesMaiusculo);
});

// Função para exibir o relatório na área designada
function exibirRelatorio(titulo, dados) {
  let conteudo = `<h3>${titulo}</h3>`;
  if (Array.isArray(dados)) {
    conteudo += '<ul>';
    dados.forEach(item => {
      conteudo += `<li>${item.toString()}</li>`;
    });
    conteudo += '</ul>';
  } else {
    conteudo += `<p>${dados}</p>`;
  }
  resultadoRelatorio.innerHTML = conteudo;
}
