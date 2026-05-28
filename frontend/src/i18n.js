export const translations = {
  en: {
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    investments: "Investments",
    withdraw: "Withdraw",
    referrals: "Referrals",
    profile: "Profile",
    logout: "Logout",
    totalBalance: "Total Balance",
    profitBalance: "Profit Balance",
    referralCode: "Referral Code",
    investmentPlans: "Investment Plans",
    dailyProfit: "Daily Profit",
    duration: "Duration",
    buyNow: "Buy Now",
    welcome: "Welcome",
    createAccount: "Create Account",
    phoneNumber: "Phone Number",
    password: "Password",
    fullName: "Full Name",
    humanVerification: "Human Verification",
    submitPayment: "Submit Payment",
    completePayment: "Complete Payment",
    paymentReference: "Payment Reference",
    withdrawFunds: "Withdraw Funds",
    submitWithdrawal: "Submit Withdrawal",
    support: "Support",
    language: "Language",
  },

  pt: {
    login: "Entrar",
    register: "Registar",
    dashboard: "Painel",
    investments: "Investimentos",
    withdraw: "Levantar",
    referrals: "Referências",
    profile: "Perfil",
    logout: "Sair",
    totalBalance: "Saldo Total",
    profitBalance: "Saldo de Lucro",
    referralCode: "Código de Referência",
    investmentPlans: "Planos de Investimento",
    dailyProfit: "Lucro Diário",
    duration: "Duração",
    buyNow: "Comprar Agora",
    welcome: "Bem-vindo",
    createAccount: "Criar Conta",
    phoneNumber: "Número de Telefone",
    password: "Senha",
    fullName: "Nome Completo",
    humanVerification: "Verificação Humana",
    submitPayment: "Enviar Pagamento",
    completePayment: "Concluir Pagamento",
    paymentReference: "Referência do Pagamento",
    withdrawFunds: "Levantar Fundos",
    submitWithdrawal: "Enviar Pedido de Levantamento",
    support: "Suporte",
    language: "Idioma",
  },
};

export const getLanguage = () => {
  return localStorage.getItem("agrotech_lang") || "en";
};

export const t = (key) => {
  const lang = getLanguage();
  return translations[lang][key] || key;
};