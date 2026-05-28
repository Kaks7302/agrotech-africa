export const translations = {
  pt: {
    login: "Entrar",
    register: "Registar",
    createAccount: "Criar Conta",
    welcome: "Bem-vindo",
    phoneNumber: "Número de telefone",
    password: "Senha",
    fullName: "Nome completo",
    referralCode: "Código de referência",
    humanVerification: "Verificação humana",
    logout: "Sair",

    dashboard: "Painel",
    totalBalance: "Saldo total",
    profitBalance: "Saldo de lucro",
    investmentPlans: "Planos de investimento",
    dailyProfit: "Lucro diário",
    duration: "Duração",
    buyNow: "Comprar agora",

    investments: "Investimentos",
    withdraw: "Levantar",
    referrals: "Referências",
    profile: "Perfil",
    support: "Suporte",
    history: "Histórico",
    installApp: "Instalar App",

    completePayment: "Concluir pagamento",
    paymentReference: "Referência do pagamento",
    submitPayment: "Enviar pagamento",

    withdrawFunds: "Levantar fundos",
    submitWithdrawal: "Enviar levantamento",

    paymentDetails: "Detalhes de Pagamento",
emolaNumber: "Número E-mola",
accountHolder: "Titular da Conta",
uploadScreenshot: "Carregar Comprovativo",
noPackageSelected: "Nenhum pacote selecionado",
backToDashboard: "Voltar ao Painel",

minimumWithdrawNote: "Levantamento mínimo é 100 MT. Uma taxa de 10% será deduzida.",
amountToWithdraw: "Valor a levantar",
emolaPhone: "Número E-mola",
fee: "Taxa",
youReceive: "Você recebe",

home: "Início",
wallet: "Carteira",
team: "Equipa",
account: "Conta",

myInvestments: "Meus Investimentos",
noActiveInvestments: "Ainda não tem investimentos ativos",
buyPackageApproval: "Compre um pacote e aguarde aprovação do administrador.",
investment: "Investimento",
daysPaid: "Dias pagos",
totalEarned: "Total ganho",
status: "Estado",

referralProgram: "Programa de Referência",
inviteEarn: "Convide amigos e ganhe 10% de bónus em cada depósito aprovado.",
yourReferralCode: "Seu código de referência",
copied: "Copiado",
copyCode: "Copiar código",
referredUsers: "Utilizadores Referidos",
noReferralsYet: "Ainda não tem referências",
bonusEarned: "Bónus ganho",
joinedOn: "Entrou em",

myProfile: "Meu Perfil",
name: "Nome",
phone: "Telefone",
accountDetails: "Detalhes da Conta",
copyReferralCode: "Copiar código de referência",
contactSupport: "Contactar Suporte",
  },

  en: {
    login: "Login",
    register: "Register",
    createAccount: "Create Account",
    welcome: "Welcome",
    phoneNumber: "Phone number",
    password: "Password",
    fullName: "Full name",
    referralCode: "Referral code",
    humanVerification: "Human verification",
    logout: "Logout",

    dashboard: "Dashboard",
    totalBalance: "Total Balance",
    profitBalance: "Profit Balance",
    investmentPlans: "Investment Plans",
    dailyProfit: "Daily Profit",
    duration: "Duration",
    buyNow: "Buy Now",

    investments: "Investments",
    withdraw: "Withdraw",
    referrals: "Referrals",
    profile: "Profile",
    support: "Support",
    history: "History",
    installApp: "Install App",

    completePayment: "Complete Payment",
    paymentReference: "Payment Reference",
    submitPayment: "Submit Payment",

    withdrawFunds: "Withdraw Funds",
    submitWithdrawal: "Submit Withdrawal",

    paymentDetails: "Payment Details",
emolaNumber: "E-mola Number",
accountHolder: "Account Holder",
uploadScreenshot: "Upload Screenshot",
noPackageSelected: "No Package Selected",
backToDashboard: "Back to Dashboard",

minimumWithdrawNote: "Minimum withdrawal is 100 MT. A 10% fee is deducted.",
amountToWithdraw: "Amount to withdraw",
emolaPhone: "E-mola phone number",
fee: "Fee",
youReceive: "You Receive",

home: "Home",
wallet: "Wallet",
team: "Team",
account: "Account",

myInvestments: "My Investments",
noActiveInvestments: "No active investments yet",
buyPackageApproval: "Buy a package and wait for admin approval.",
investment: "Investment",
daysPaid: "Days Paid",
totalEarned: "Total Earned",
status: "Status",

referralProgram: "Referral Program",
inviteEarn: "Invite friends and earn 10% bonus on every approved deposit.",
yourReferralCode: "Your Referral Code",
copied: "Copied",
copyCode: "Copy Code",
referredUsers: "Referred Users",
noReferralsYet: "No referrals yet",
bonusEarned: "Bonus Earned",
joinedOn: "Joined On",

myProfile: "My Profile",
name: "Name",
phone: "Phone",
accountDetails: "Account Details",
copyReferralCode: "Copy Referral Code",
contactSupport: "Contact Support",
  },
};

export const getLanguage = () => {
  return localStorage.getItem("agrotech_lang") || "pt";
};

export const setLanguage = (lang) => {
  localStorage.setItem("agrotech_lang", lang);
  window.dispatchEvent(new Event("languageChanged"));
};

export const t = (key) => {
  const lang = getLanguage();
  return translations[lang]?.[key] || key;
};