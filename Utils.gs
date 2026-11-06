
/**
 * ENVIO AUTO PIPE
 * Funções auxiliares e diagnósticos.
 *
 * Versão pública para portfólio.
 * Não registra destinatários, IDs ou dados sensíveis.
 */

/**
 * Retorna a data e hora no fuso configurado.
 */
function obterDataHoraPipeline() {
  const fuso = CONFIG_PIPE.AGENDAMENTO.FUSO_HORARIO;

  return Utilities.formatDate(
    new Date(),
    fuso,
    'dd/MM/yyyy HH:mm:ss'
  );
}

/**
 * Registra mensagens de execução sem dados sensíveis.
 */
function registrarLogPipeline(mensagem, tipo) {
  const categoria = tipo || 'INFO';

  Logger.log(
    '[' + categoria + '] ' +
    obterDataHoraPipeline() +
    ' - ' +
    String(mensagem)
  );
}

/**
 * Verifica as configurações básicas do projeto.
 *
 * Não envia e-mails, exporta planilhas
 * ou instala gatilhos.
 */
function diagnosticarPipeline() {
  const integracoes = CONFIG_PIPE.INTEGRACOES;
  const agendamento = CONFIG_PIPE.AGENDAMENTO;

  const diagnostico = {
    projeto: CONFIG_PIPE.NOME_PROJETO,
    modoDemonstracao: CONFIG_PIPE.MODO_DEMONSTRACAO,
    planilhaAtiva: integracoes.PLANILHA_ATIVA,
    emailAtivo: integracoes.EMAIL_ATIVO,
    diaAgendamento: agendamento.DIA_SEMANA,
    horarioAgendamento: agendamento.HORA + 'h às ' +
      (agendamento.HORA + 1) + 'h',
    fusoHorario: agendamento.FUSO_HORARIO
  };

  registrarLogPipeline(
    'Diagnóstico de configuração concluído.'
  );

  Logger.log(JSON.stringify(diagnostico, null, 2));

  return diagnostico;
}

/**
 * Verifica se a configuração está em modo seguro.
 */
function verificarModoSeguroPipeline() {
  const seguro =
    CONFIG_PIPE.MODO_DEMONSTRACAO === true &&
    CONFIG_PIPE.INTEGRACOES.PLANILHA_ATIVA === false &&
    CONFIG_PIPE.INTEGRACOES.EMAIL_ATIVO === false;

  if (!seguro) {
    registrarLogPipeline(
      'O projeto não está com todas as proteções padrão ativas.',
      'AVISO'
    );
  }

  return seguro;
}
