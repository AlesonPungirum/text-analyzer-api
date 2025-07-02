API de Análise de Texto com IA - Node.js

>  This is a challenge by [Coodesh](https://coodesh.com/)

API REST desenvolvida em Node.js com arquitetura em camadas que analisa textos em português, retorna estatísticas e detecta sentimentos usando inteligência artificial.
Funcionalidades

*Análise estatística de texto (contagem de palavras)
*Identificação das 5 palavras mais frequentes (excluindo stopwords)
*Análise de sentimento usando IA
*Busca de termos na última análise
*Tratamento de erros com status HTTP apropriados
*Cache em memória para histórico
*Rate limiting para proteção da API
*Arquitetura em camadas para escalabilidade

#Arquitetura
O projeto utiliza uma arquitetura em camadas para melhor organização e manutenção.
      
#Tecnologias Utilizadas

Linguagem: Node.js (14+)
Framework: Express.js
Arquitetura: Arquitetura em Camadas
IA: Hugging Face API (modelo BERT multilíngue)
Documentação: Swagger
HTTP Client: Axios
Segurança: CORS, Rate Limiting

#Começando
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

#Como Instalar e Usar
1. Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd text-analyzer-api-nodejs
2. Instale as dependências
npm install
3. Configure a API do Hugging Face para usar a análise de sentimentos com IA:

Crie uma conta gratuita em https://huggingface.co
Gere um token de API em https://huggingface.co/settings/tokens
No arquivo app.js, substitua hf_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX pelo seu token

StopWords obtidas de https://gist.github.com/alopes/5358189

