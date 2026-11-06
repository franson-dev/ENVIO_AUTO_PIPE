/**
 * ENVIO AUTO PIPE
 * Gerenciamento do agendamento semanal.
 *
 * Execução prevista: quinta-feira, entre 12h e 13h.
 * A instalação do gatilho exige habilitação explícita.
 */

/**
 * Instala o gatilho semanal do Pipeline.
 *
 * Não instala enquanto o projeto estiver em demonstração.
 */
function instalarGatilhoPipeline() {
  if (CONFIG_PIPE.MODO_DEMONSTRACAO === true) {
    throw new Error(
      'Instalação bloqueada: modo de demonstração ativo.'
    );
  }

  if (
    CONFIG_PIPE.INTEGRACOES.PLANILHA_ATIVA !== true ||
    CONFIG_PIPE.INTEGRACOES.EMAIL_ATIVO !== true
  ) {
    throw new Error(
      'Habilite as integrações antes de instalar o gatilho.'
    );
  }

  const gatilhos = ScriptApp.getProjectTriggers();

  const jaExiste = gatilhos.some(function(gatilho) {
    return gatilho.getHandlerFunction() ===
      'executarAgendamentoPipeline';
  });

  if (jaExiste) {
    Logger.log('O gatilho semanal já está instalado.');
    return;
  }

  ScriptApp.newTrigger('executarAgendamentoPipeline')
    .timeBased()
    .everyWeeks(1)
    .onWeekDay(ScriptApp.WeekDay.THURSDAY)
    .atHour(CONFIG_PIPE.AGENDAMENTO.HORA)
    .inTimezone(CONFIG_PIPE.AGENDAMENTO.FUSO_HORARIO)
    .create();

  Logger.log(
    'Gatilho semanal instalado para quinta-feira, entre 12h e 13h.'
  );
}

/**
 * Executa o envio automático com proteção contra duplicidade.
 */
function executarAgendamentoPipeline() {
  if (CONFIG_PIPE.MODO_DEMONSTRACAO === true) {
    Logger.log(
      'Execução bloqueada: projeto em modo de demonstração.'
    );

    return {
      sucesso: false,
      motivo: 'MODO_DEMONSTRACAO'
    };
  }

  const bloqueio = LockService.getScriptLock();

  if (!bloqueio.tryLock(10000)) {
    Logger.log('Outra execução está em andamento.');

    return {
      sucesso: false,
      motivo: 'EXECUCAO_EM_ANDAMENTO'
    };
  }

  try {
    const fuso = CONFIG_PIPE.AGENDAMENTO.FUSO_HORARIO;

    const dataAtual = Utilities.formatDate(
      new Date(),
      fuso,
      'yyyy-MM-dd'
    );

    const propriedades =
      PropertiesService.getScriptProperties();

    const chave = 'PIPELINE_ENVIADO_' + dataAtual;

    if (propriedades.getProperty(chave) === 'SIM') {
      Logger.log('O Pipeline já foi enviado nesta data.');

      return {
        sucesso: false,
        motivo: 'ENVIO_JA_REALIZADO'
      };
    }

    propriedades.setProperty(chave, 'EM_PROCESSAMENTO');

    try {
      const resultado = enviarPipelineSemanal();

      propriedades.setProperty(chave, 'SIM');

      Logger.log('Execução automática concluída.');

      return resultado;

    } catch (erro) {
      propriedades.setProperty(chave, 'ERRO');

      Logger.log(
        'Falha no envio automático: ' + erro.message
      );

      throw erro;
    }

  } finally {
    bloqueio.releaseLock();
  }
}

/**
 * Verifica os parâmetros do agendamento.
 * Não instala gatilhos nem envia e-mails.
 */
function testarConfiguracaoAgendamentoPipeline() {
  const configuracao = CONFIG_PIPE.AGENDAMENTO;

  const valida =
    configuracao.DIA_SEMANA === 'THURSDAY' &&
    configuracao.HORA === 12 &&
    configuracao.FUSO_HORARIO === 'America/Sao_Paulo';

  Logger.log(
    valida
      ? 'Configuração de agendamento válida.'
      : 'Verifique os parâmetros do agendamento.'
  );

  return {
    configuracaoValida: valida,
    dia: configuracao.DIA_SEMANA,
    horario: '12h às 13h',
    fuso: configuracao.FUSO_HORARIO
  };
}
