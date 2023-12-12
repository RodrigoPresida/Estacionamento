interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date;
}

(function () {
  const $ = (query:string): HTMLInputElement | null => document.querySelector(query);

  function patio() {
    function ler (){
        return JSON.parse(localStorage.getItem("patio") || "[]") as Veiculo[];
    }
    function salvar(veiculos: Veiculo[]){
        {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }     
    
    }
    function adicionar(veiculo: Veiculo, salva?: boolean){
        const row = document.createElement("tr");
        row.innerHTML = '<td>' + veiculo.nome + '</td><td>' + veiculo.placa + '</td><td>' + veiculo.entrada + '</td><td><button class="delete" data-placa= "${veiculo.placa}">Remover</button></td>';
        $("#patio")?.appendChild(row);
        if (salva)salvar([...ler(), veiculo]);
    }
    function remover(){}
    function renderizar(){
        $("#patio")!.innerHTML = "";
        const patio = ler();
        if (patio.length) {
            patio.forEach(veiculo => adicionar(veiculo));
        }
    }
    
    return {ler, adicionar, remover, renderizar, salvar};
    
    
  }

$("#cadastrar")?.addEventListener("click", () => {
const nome = $("#nome")?.value;
const placa = $("#placa")?.value;
console.log(nome, placa);
if (!nome || !placa) {
    alert(`Os campos nome e placa são obrigatórios!`);
    return;
}
patio().renderizar();
patio().adicionar({nome, placa: placa, entrada: new Date()}, true);
});
})();