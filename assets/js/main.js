const inputTarefa = document.querySelector('.input-tarefa');
const btnAdd = document.querySelector('.btn-add');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {

    if (e.keyCode === 13){
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criarBtnApagar(li){
    li.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar');
    li.appendChild(btnApagar);
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText= textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criarBtnApagar(li);
    salvartarefas();
}

btnAdd.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target;

    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvartarefas();
    }
});

function salvartarefas(){
    const liTerafas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTerafas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto. replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for( let tarefas of listaDeTarefas){
        criaTarefa(tarefas);
    }
}

addTarefasSalvas();