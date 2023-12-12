"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function ler() {
            return JSON.parse(localStorage.getItem("patio") || "[]");
        }
        function salvar(veiculos) {
            {
                localStorage.setItem("patio", JSON.stringify(veiculos));
            }
        }
        function adicionar(veiculo, salva) {
            var _a;
            const row = document.createElement("tr");
            row.innerHTML = '<td>' + veiculo.nome + '</td><td>' + veiculo.placa + '</td><td>' + veiculo.entrada + '</td><td><button class="delete" data-placa= "${veiculo.placa}">Remover</button></td>';
            (_a = $("#patio")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover() { }
        function renderizar() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, renderizar, salvar };
    }
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        console.log(nome, placa);
        if (!nome || !placa) {
            alert(`Os campos nome e placa são obrigatórios!`);
            return;
        }
        patio().renderizar();
        patio().adicionar({ nome, placa: placa, entrada: new Date() }, true);
    });
})();
