
/**
 * ENVIO AUTO PIPE
 * Exportação da planilha e preparação do e-mail.
 *
 * Versão pública para portfólio.
 * Nenhum e-mail é enviado por padrão.
 */

/**
 * Verifica se as integrações estão habilitadas.
 */
function validarIntegracoesPipe() {
  if (CONFIG_PIPE.MODO_DEMONSTRACAO === true) {
    throw new Error(
      'Operação bloqueada: modo de demonstração ativo.'
    );
  }

  if (CONFIG_PIPE.INTEGRACOES.PLANILHA_ATIVA !== true) {
    throw new Error('Integração com planilha desativada.');
  }

  if (CONFIG_PIPE.INTEGRACOES.EMAIL_ATIVO !== true) {
    throw new Error('Integração de e-mail desativada.');
  }
}


/**
 * Obtém a planilha ativa e verifica sua disponibilidade.
 */
function obterPlanilhaPipeline() {
  if (CONFIG_PIPE.INTEGRACOES.PLANILHA_ATIVA !== true) {
    throw new Error('A integração com planilha está desativada.');
  }

  const planilha = SpreadsheetApp.getActiveSpreadsheet();

  if (!planilha) {
    throw new Error('Nenhuma planilha ativa foi encontrada.');
  }

  return planilha;
}


/**
 * Exporta a planilha para o formato XLSX.
 */
function exportarPipelineXlsx() {
  validarIntegracoesPipe();

  const planilha = obterPlanilhaPipeline();
  const id = planilha.getId();

  const url =
    'https://docs.google.com/spreadsheets/d/' +
    encodeURIComponent(id) +
    '/export?format=xlsx';

  const token = ScriptApp.getOAuthToken();

  const resposta = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token
    },
    muteHttpExceptions: true
  });

  if (resposta.getResponseCode() !== 200) {
    throw new Error(
      'Falha ao exportar a planilha. Código HTTP: ' +
      resposta.getResponseCode()
    );
  }

  return resposta.getBlob().setName(
    CONFIG_PIPE.EMAIL.NOME_ARQUIVO
  );
}


/**
 * Monta o conteúdo do e-mail.
 */
function montarEmailPipeline() {
  return {
    assunto: CONFIG_PIPE.EMAIL.ASSUNTO,

    corpoHTML: `
      <p>Olá!</p>

      <p>Espero que esteja tudo bem.</p>

      <p>
        Encaminho em anexo o
        <b>Pipeline de Negócios e Soluções</b>
        atualizado referente a esta semana.
      </p>

      <p>
        O relatório apresenta o acompanhamento
        das oportunidades e negociações em andamento.
      </p>

      <br>

      <p>Atenciosamente,</p>

      <p>
        <b>${CONFIG_PIPE.EMAIL.NOME_REMETENTE}</b>
      </p>
    `
  };
}


/**
 * Prepara o relatório sem realizar envio.
 */
function visualizarPipelineSemEnviar() {
  const email = montarEmailPipeline();

  Logger.log('=== PRÉVIA DO PIPELINE AUTO ===');
  Logger.log('Assunto: ' + email.assunto);
  Logger.log('Arquivo previsto: ' + CONFIG_PIPE.EMAIL.NOME_ARQUIVO);
  Logger.log('Destinatários configurados: fictícios');
  Logger.log('Modo: demonstração');
  Logger.log('Nenhum e-mail foi enviado.');

  return {
    sucesso: true,
    demonstracao: true,
    assunto: email.assunto,
    arquivo: CONFIG_PIPE.EMAIL.NOME_ARQUIVO,
    envioRealizado: false
  };
}


/**
 * Envia o Pipeline por e-mail.
 *
 * Exige habilitação explícita das integrações.
 */
function enviarPipelineSemanal() {
  validarIntegracoesPipe();

  const destinatario = CONFIG_PIPE.DESTINATARIOS.PRINCIPAL;
  const copia = CONFIG_PIPE.DESTINATARIOS.COPIA;

  if (!destinatario || !destinatario.includes('@')) {
    throw new Error('Destinatário principal inválido.');
  }

  const planilha = obterPlanilhaPipeline();

  if (!planilha.getId()) {
    throw new Error('Não foi possível identificar a planilha.');
  }

  const anexo = exportarPipelineXlsx();
  const email = montarEmailPipeline();

  MailApp.sendEmail({
    to: destinatario,
    cc: copia || '',
    subject: email.assunto,
    htmlBody: email.corpoHTML,
    attachments: [anexo],
    name: CONFIG_PIPE.EMAIL.NOME_REMETENTE
  });

  Logger.log('Pipeline enviado com sucesso.');

  return {
    sucesso: true,
    envioRealizado: true
  };
}
