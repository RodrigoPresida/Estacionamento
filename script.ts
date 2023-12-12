interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
}

(function () {
  const $ = (query:string): HTMLInputElement | null => document.querySelector(query);

  function calcuTempo(mil: number) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);
    return `${min}m e ${sec}s`;
  }

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
row.querySelector(".delete")?.addEventListener("click", function() {
    remover(veiculo.placa);
});

        $("#patio")?.appendChild(row);
        if (salva)salvar([...ler(), veiculo]);
    }
    function remover(placa: string){
        const {entrada, nome} = ler().find((veiculo) => veiculo.placa === placa);
        const tempo = calcuTempo (new Date().getTime() - new Date(entrada).getTime());
        if (confirm(`O veiculo ${nome} permaneceu ${tempo} no estacionamento. Deseja encerrar?`))
        return;{
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            renderizar();
        }
    }
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
patio().adicionar({nome, placa: placa, entrada: new Date().toISOString()}, true);
});
})();