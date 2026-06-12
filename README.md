# AgroVerde
# 🌾 AgroSim Pro: O Legado Verde
> **Simulador Avançado de Ecossistemas e Gestão Sustentável** > *Projeto desenvolvido para a Categoria Programação — Concurso Agrinho 2026*

---

## 📋 Alinhamento com o Tema Oficial
Este projeto foi inteiramente construído em torno do tema oficial do Concurso Agrinho 2026:  
**"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"**

O **AgroSim Pro** transforma conceitos teóricos de sustentabilidade numa experiência prática e interativa de gamificação. Através dele, o utilizador assume o papel de um produtor rural no Paraná que precisa de tomar decisões estratégicas para manter a sua propriedade lucrativa sem esgotar os recursos naturais, demonstrando que a tecnologia e a preservação são aliadas fundamentais para o futuro do agronegócio.

---

## 📖 Enredo e Introdução Narrativa
O utilizador assume a gestão da **Fazenda Primavera**, uma propriedade tradicional no interior do Paraná. O desafio é gerir a terra durante um ciclo crítico de **6 anos**. 

Num cenário global focado em metas ambientais e afetado por mudanças climáticas severas, o jogador não pode apenas focar-se no lucro imediato. Ele é desafiado a honrar o legado da terra, provando ser possível abastecer o mercado e, ao mesmo tempo, proteger a biodiversidade, o solo e a água.

---

## 🎮 Mecânicas de Jogo e Como Jogar

O simulador funciona através de um sistema de estratégia por turnos (anos), onde o utilizador controla um ecossistema complexo:

1. **Gestão Espacial por Lotes (Grid):** A fazenda é dividida em 4 quadrantes independentes. O jogador deve clicar em cada lote para definir o seu uso atual:
   * **Monocultura de Soja:** Alta rentabilidade financeira, mas degrada os nutrientes do solo agressivamente e consome muita água.
   * **Rotação de Culturas (Soja + Milho):** Lucro moderado, mas recupera parcialmente os nutrientes do solo e consome menos água.
   * **Reserva Ambiental (Reflorestamento):** Não gera receita direta com colheita, mas reconstrói a biodiversidade, regenera o solo e gera valiosos **Créditos de Carbono**.
   * **Pousio (Vazio):** Deixa a terra descansar para recuperar os seus nutrientes naturais de forma orgânica.
2. **Indicadores Críticos e Condições de Derrota:** O ecossistema é monitorizado por 4 métricas globais: Capital em Caixa, Balanço de Carbono, Biodiversidade e Nível do Lençol Freático (Água). Se a **Biodiversidade** ou a **Água** atingirem **0%**, ocorre um colapso ecológico na propriedade e o jogo termina imediatamente em **Falência Ecológica**.
3. **Loja de Upgrades Tecnológicos:** O capital acumulado pode ser reinvestido em tecnologias de precisão:
   * *Irrigação Inteligente (Gotejamento):* Reduz drasticamente o consumo de água de todas as culturas e atenua os efeitos de secas.
   * *Biofábrica Local:* Utiliza defensivos biológicos para garantir bónus automáticos de saúde e nutrientes ao solo a cada ano.
4. **Eventos Climáticos Estocásticos:** A cada viragem de ano, o motor lúdico processa probabilidades de eventos reais, como secas extremas prolongadas (que punem propriedades sem tecnologia de irrigação) ou valorizações do mercado verde (créditos de carbono).

---

## 🛠️ Engenharia de Software e Tecnologias Aplicadas
O projeto destaca-se pela aplicação de conceitos avançados de programação do Ensino Médio, utilizando exclusivamente tecnologia nativa (**Vanilla Web Stack**) sem o auxílio de frameworks externos:

* **Gerenciamento Centralizado de Estado (State Machine):** Toda a lógica do simulador baseia-se num objeto JavaScript central (`game`). As interações do utilizador modificam este estado e disparam uma função reativa de renderização (`render()`), garantindo a sincronia perfeita entre os dados e a interface visual.
* **Manipulação Assíncrona e Avançada do DOM:** Uso avançado de seletores (`querySelectorAll`, `currentTarget`, `getAttribute`) para identificar dinamicamente qual lote espacial a matriz lógica está a alterar.
* **Estruturas de Dados Dinâmicas:** Uso de vetores (Arrays) preenchidos com sub-objetos para mapear as propriedades e a degradação individual de cada lote de terra em tempo real.
* **Modelagem Estocástica (Algoritmos Probabilísticos):** Utilização de `Math.random()` para simular a imprevisibilidade do clima e fatores de mercado.
* **CSS Grid & Layout Responsivo Avançado:** O mapa da fazenda e o painel de indicadores foram construídos utilizando *CSS Grid Layout* e *Flexbox*, assegurando que a aplicação seja totalmente responsiva e corra perfeitamente em computadores, tablets ou smartphones.
* **Boas Práticas de Programação (Clean Code):** Separação estrita de responsabilidades. O HTML atua estritamente na estrutura semântica, o CSS foca-se no design visual (estilo *Dashboard Dark*) e o JavaScript dita o motor lógico, eliminando qualquer código inline nas tags.

---

## 📂 Estrutura de Pastas do Projeto
```text
├── index.html        # Estrutura semântica, modais de introdução/fim e painéis
├── README.md         # Documentação técnica e pedagógica do projeto
├── css/
│   └── style.css     # Estilização completa, variáveis nativas e Grid Responsivo
└── js/
    └── engine.js     # Motor lógico do simulador e gestão de dados
