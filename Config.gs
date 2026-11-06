
/**
 * ENVIO AUTO PIPE
 * Configurações da versão pública para portfólio.
 *
 * Configure seus próprios dados antes de habilitar
 * qualquer integração.
 */

const CONFIG_PIPE = {
  NOME_PROJETO: 'ENVIO AUTO PIPE',

  MODO_DEMONSTRACAO: true,

  INTEGRACOES: {
    PLANILHA_ATIVA: false,
    EMAIL_ATIVO: false
  },

  DESTINATARIOS: {
    PRINCIPAL: 'destinatario@example.com',
    COPIA: 'copia@example.com'
  },

  EMAIL: {
    ASSUNTO: 'PIPELINE RELATÓRIO',
    NOME_ARQUIVO: 'Pipeline_de_Negocios_e_Solucoes.xlsx',
    NOME_REMETENTE: 'Automação de Pipeline'
  },

AGENDAMENTO: {
  DIA_SEMANA: 'THURSDAY',
  HORA: 12,
  MINUTO: 0,
  FUSO_HORARIO: 'America/Sao_Paulo'
}
};
