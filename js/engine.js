document.addEventListener("DOMContentLoaded", () => {
    
    // ESTADO CENTRALIZADO DA APLICAÇÃO (State Management Engine)
    const game = {
        ano: 1,
        maxAnos: 6,
        dinheiro: 1500,
        carbono: 0,
        biodiversidade: 100,
        agua: 100,
        loteSelecionado: null,
        upgrades: {
            gotejamento: false,
            biofabrica: false
        },
        lotes: [
            { tipo: "vazio", saudeSolo: 100 },
            { tipo: "vazio", saudeSolo: 100 },
            { tipo: "vazio", saudeSolo: 100 },
            { tipo: "vazio", saudeSolo: 100 }
        ]
    };

    // CAPTURA DE COMPONENTES INTERATIVOS
    const elAno = document.getElementById("txt-ano");
    const elDinheiro = document.getElementById("m-dinheiro");
    const elCarbono = document.getElementById("m-carbono");
    const elBiodiv = document.getElementById("m-biodiv");
    const elAgua = document.getElementById("m-agua");
    const barBiodiv = document.getElementById("bar-biodiv");
    const barAgua = document.getElementById("bar-agua");
    const ticker = document.getElementById("event-ticker");
    const controlPanel = document.getElementById("control-panel");
    const plotTitle = document.getElementById("selected-plot-title");
  
  // Captura do botão de começar jogo (adicione junto com os outros 'document.getElementById')
const introScreen = document.getElementById("intro-screen");
const btnComecar = document.getElementById("btn-comecar");

// Evento para fechar a introdução e iniciar a simulação
btnComecar.addEventListener("click", () => {
    introScreen.classList.add("hidden");
});

    // REFRESH COMPLETO DA INTERFACE VISUAL
    function render() {
        elAno.innerText = game.ano + " / " + game.maxAnos;
        elDinheiro.innerText = game.dinheiro;
        elCarbono.innerText = game.carbono;
        elBiodiv.innerText = game.biodiversidade;
        elAgua.innerText = game.agua;

        barBiodiv.style.width = game.biodiversidade + "%";
        barAgua.style.width = game.agua + "%";

        // Renderização individual de cada lote baseado no estado interno
        game.lotes.forEach((lote, index) => {
            const card = document.getElementById("plot-" + index);
            const statusTxt = card.querySelector(".plot-status");
            const statsTxt = card.querySelector(".plot-stats");

            card.className = "plot-card"; 
            if (game.loteSelecionado === index) {
                card.classList.add("selected");
            }

            if (lote.tipo === "vazio") {
                statusTxt.innerText = "Pousio / Vazio";
                statusTxt.className = "plot-status";
            } else if (lote.tipo === "soja") {
                statusTxt.innerText = "Soja Comercial";
                statusTxt.className = "plot-status plot-soja";
            } else if (lote.tipo === "rotacao") {
                statusTxt.innerText = "Soja + Milho";
                statusTxt.className = "plot-status plot-rotacao";
            } else if (lote.tipo === "floresta") {
                statusTxt.innerText = "Reserva Ambiental";
                statusTxt.className = "plot-status plot-floresta";
            }
            statsTxt.innerText = "Nutrientes Solo: " + lote.saudeSolo + "%";
        });
    }

    function pushLog(texto, classe) {
        const p = document.createElement("p");
        p.className = "log-entry " + classe;
        p.innerText = "[Ano " + game.ano + "] " + texto;
        ticker.appendChild(p);
        ticker.scrollTop = ticker.scrollHeight;
    }

    // MANIPULAÇÃO DA SELECÇÃO DE LOTES ESPACIAIS
    document.querySelectorAll(".plot-card").forEach((card) => {
        card.addEventListener("click", (e) => {
            const idx = parseInt(e.currentTarget.getAttribute("data-plot"));
            game.loteSelecionado = idx;
            controlPanel.classList.remove("inactive");
            plotTitle.innerText = "LOTE " + (idx + 1);
            render();
        });
    });

    // SISTEMA DE ORDENS DE PLANTIO
    document.querySelectorAll(".btn-action").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (game.loteSelecionado === null) return;
            const acao = e.currentTarget.getAttribute("data-action");
            game.lotes[game.loteSelecionado].tipo = acao;
            pushLog("Lote " + (game.loteSelecionado + 1) + " configurado para: " + acao.toUpperCase() + ".", "system");
            render();
        });
    });

    // MECÂNICA DE UPGRADES DA LOJA
    document.querySelectorAll(".btn-buy").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const up = e.currentTarget.getAttribute("data-upgrade");
            if (game.upgrades[up]) return;

            const custos = { gotejamento: 400, biofabrica: 300 };
            if (game.dinheiro >= custos[up]) {
                game.dinheiro -= custos[up];
                game.upgrades[up] = true;
                e.currentTarget.innerText = "Adquirido";
                e.currentTarget.classList.add("owned");
                pushLog("Tecnologia adquirida: " + up.toUpperCase() + " integrada à fazenda.", "reward");
                render();
            } else {
                pushLog("Erro: Capital em caixa insuficiente para esta tecnologia.", "alert");
            }
        });
    });

    // LÓGICA DO PROCESSAMENTO ANUAL (MOTOR DO JOGO)
    document.getElementById("btn-passar-ano").addEventListener("click", () => {
        let rendimentoAno = 0;
        let impactoSoloAcumulado = 0;
        let contagemFlorestas = 0;

        // 1. Processar cada lote individualmente
        game.lotes.forEach((lote) => {
            if (lote.tipo === "soja") {
                rendimentoAno += 400;
                lote.saudeSolo -= 25;
                impactoSoloAcumulado -= 10;
                game.agua -= game.upgrades.gotejamento ? 5 : 15;
            } else if (lote.tipo === "rotacao") {
                rendimentoAno += 250;
                lote.saudeSolo = Math.min(100, lote.saudeSolo + 10);
                impactoSoloAcumulado += 5;
                game.agua -= game.upgrades.gotejamento ? 2 : 8;
            } else if (lote.tipo === "floresta") {
                contagemFlorestas++;
                lote.saudeSolo = Math.min(100, lote.saudeSolo + 15);
                impactoSoloAcumulado += 15;
            } else if (lote.tipo === "vazio") {
                lote.saudeSolo = Math.min(100, lote.saudeSolo + 20);
            }
            
            if (game.upgrades.biofabrica && lote.tipo !== "floresta") {
                lote.saudeSolo = Math.min(100, lote.saudeSolo + 5);
            }
            if (lote.saudeSolo < 0) lote.saudeSolo = 0;
        });

        // 2. Aplicar Balanço Global
        game.dinheiro += rendimentoAno;
        game.biodiversidade = Math.max(0, Math.min(100, game.biodiversidade + impactoSoloAcumulado));
        
        // Linhas simplificadas separando a matemática para evitar erros de sintaxe
        const creditosFlorestas = contagemFlorestas * 20;
        const quantidadeSoja = game.lotes.filter(l => l.tipo === "soja").length;
        const penalidadeSoja = quantidadeSoja * 10;
        game.carbono += (creditosFlorestas - penalidadeSoja);

        pushLog("Safra recolhida! Receita bruta de R$ " + rendimentoAno + " adicionada.", "reward");

        // 3. Gerador de Eventos Climáticos Aleatórios
        const rng = Math.random();
        if (rng < 0.25) {
            pushLog("ALERTA: Seca extrema prolongada no Paraná! Níveis freáticos caíram.", "alert");
            game.agua -= game.upgrades.gotejamento ? 10 : 30;
        } else if (rng > 0.8) {
            pushLog("BONUS: Créditos de carbono valorizados no mercado verde global! Recebeu incentivos.", "reward");
            game.dinheiro += 200;
        }

        // Amortizações de segurança
        if (game.agua < 0) game.agua = 0;
        if (game.biodiversidade < 0) game.biodiversidade = 0;

        // 4. Verificação de Condições de Derrota Crítica
        if (game.agua <= 0 || game.biodiversidade <= 0) {
            finalizarJogo(false);
            return;
        }

        // Avançar tempo
        if (game.ano < game.maxAnos) {
            game.ano++;
            render();
        } else {
            finalizarJogo(true);
        }
    });

    // TELA DE ENCERRAMENTO
    function finalizarJogo(vitoria) {
        const endScreen = document.getElementById("end-screen");
        const title = document.getElementById("end-title");
        const body = document.getElementById("end-report-body");

        if (vitoria) {
            title.innerText = "Safra Concluída - Relatório de Sustentabilidade";
            title.style.color = "var(--primary)";
            
            let relatorioHtml = "<p><strong>Parabéns!</strong> Concluiu com sucesso os 6 anos de gestão agrícola rural.</p><br>";
            relatorioHtml += "<p>💰 Capital Final Acumulado: R$ " + game.dinheiro + "</p>";
            relatorioHtml += "<p>🌳 Nível de Biodiversidade: " + game.biodiversidade + "%</p>";
            relatorioHtml += "<p>💧 Reservas de Água: " + game.agua + "%</p>";
            relatorioHtml += "<p>📉 Pegada de Carbono: " + game.carbono + " toneladas CO2eq</p><br>";
            relatorioHtml += "<p><em>Sua propriedade provou que o Agro Forte do Paraná consegue prosperar comercialmente mantendo o equilíbrio ecológico intocado!</em></p>";
            body.innerHTML = relatorioHtml;
        } else {
            title.innerText = "Gestão Interrompida - Falência Ecológica";
            title.style.color = "var(--danger)";
            
            let relatorioHtml = "<p>Sua propriedade entrou em colapso ecológico total devido ao esgotamento severo dos recursos hídricos ou destruição total da biodiversidade local.</p><br>";
            relatorioHtml += "<p>A ganância pela monocultura sem o devido descanso do solo ou preservação de mata ciliar destrói o futuro da produção agrícola a longo prazo.</p>";
            body.innerHTML = relatorioHtml;
        }
        endScreen.classList.remove("hidden");
    }

    document.getElementById("btn-restart").addEventListener("click", () => {
        window.location.reload();
    });

    render();
});
