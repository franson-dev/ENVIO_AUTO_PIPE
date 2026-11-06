# ENVIO AUTO PIPE

Automação de envio semanal de relatórios de Pipeline de Negócios e Soluções utilizando Google Apps Script.

## Sobre o projeto

O **ENVIO AUTO PIPE** é uma solução de automação desenvolvida para simplificar o compartilhamento semanal de relatórios comerciais.

O projeto automatiza a exportação de uma planilha do Google Sheets para o formato Excel (`.xlsx`) e prepara o envio do arquivo por e-mail aos destinatários configurados.

A execução é programada para todas as quintas-feiras, entre 12h e 13h, considerando o fuso horário de São Paulo.

## Objetivos

- Automatizar o compartilhamento semanal do Pipeline.
- Reduzir atividades operacionais repetitivas.
- Padronizar a comunicação por e-mail.
- Facilitar o acompanhamento das oportunidades comerciais.
- Reduzir falhas manuais no processo de envio.

## Funcionalidades

- Exportação de planilhas Google Sheets para Excel.
- Preparação automática de e-mails em HTML.
- Configuração de destinatários e cópias.
- Agendamento semanal por gatilho do Google Apps Script.
- Proteção contra execuções simultâneas.
- Prevenção de envios duplicados na mesma data.
- Diagnóstico e registro de execução.
- Modo de demonstração para testes seguros.

## Tecnologias utilizadas

- Google Apps Script
- JavaScript
- Google Sheets
- Gmail / MailApp
- Google Drive
- Time-driven Triggers

## Estrutura do projeto

```text
ENVIO_AUTO_PIPE/
│
├── README.md
├── Config.gs
├── Code.gs
├── Agendamentos.gs
└── Utils.gs
```

### Descrição dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `Config.gs` | Centraliza configurações e parâmetros do projeto. |
| `Code.gs` | Gerencia exportação da planilha e envio do e-mail. |
| `Agendamentos.gs` | Controla o agendamento e a execução semanal. |
| `Utils.gs` | Reúne funções auxiliares, diagnósticos e logs. |

## Fluxo de funcionamento

1. O gatilho semanal identifica o momento programado para execução.
2. O sistema verifica as configurações e as permissões necessárias.
3. A planilha ativa é exportada para Excel.
4. O conteúdo do e-mail é preparado com o relatório anexado.
5. O e-mail é enviado aos destinatários configurados.
6. A execução é registrada para evitar duplicidade.

## Segurança e proteção

Esta versão pública foi preparada exclusivamente para demonstração e apresentação em portfólio.

Por padrão:

- O modo de demonstração permanece ativado.
- A integração com planilhas permanece desabilitada.
- A integração de e-mail permanece desabilitada.
- Os destinatários utilizados são fictícios.
- Nenhum gatilho é instalado automaticamente.
- O envio real depende de habilitação explícita das integrações.

**Importante:** este repositório não contém dados comerciais, informações de clientes ou endereços de e-mail corporativos utilizados na operação original.

## Configuração

1. Crie um projeto no Google Apps Script.
2. Adicione os arquivos `.gs` deste repositório.
3. Revise as configurações em `Config.gs`.
4. Configure as permissões necessárias.
5. Realize os testes com o modo de demonstração.
6. Somente em uma implantação própria e autorizada, habilite as integrações e instale o gatilho.

Não habilite integrações utilizando dados corporativos ou destinatários reais sem a devida autorização.

## Aprendizados técnicos

Este projeto demonstra a aplicação prática de:

- Automação de processos administrativos.
- Integração entre serviços Google.
- Manipulação e exportação de arquivos.
- Envio automatizado de relatórios.
- Agendamento de tarefas recorrentes.
- Organização modular de código.
- Tratamento de erros e prevenção de duplicidade.
- Boas práticas de segurança em projetos públicos.

## Status

**Projeto:** versão pública para portfólio.

**Ambiente:** demonstração.

**Envio automático real:** desabilitado por padrão.

---

Desenvolvido como projeto de automação com Google Apps Script.
