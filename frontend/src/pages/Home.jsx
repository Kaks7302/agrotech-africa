import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import InstallButton from "../components/InstallButton";
import { t, getLanguage } from "../i18n";
import "./home.css";

function Home() {
  const lang = getLanguage();

  const text = {
    pt: {
      badge: "🌱 Tecnologia & Investimentos",
      title: "Faça Crescer o Seu Futuro Com a Agrotech Africa",
      subtitle:
        "Uma plataforma digital de investimento criada para Moçambique, combinando crescimento inspirado na agricultura, tecnologia, referências e acompanhamento de rendimentos diários.",
      create: "Criar Conta",
      signin: "Entrar",
      stats1: "Dias de Duração",
      stats2: "Lucro Diário",
      stats3: "Levantamento Mínimo",
      stats4: "Bónus de Referência",
      how: "Como Funciona",
      step1: "Criar Conta",
      step1Text: "Registe-se usando o seu número de telefone de Moçambique.",
      step2: "Escolher Pacote",
      step2Text: "Selecione o plano de investimento que prefere.",
      step3: "Pagar via E-mola",
      step3Text: "Envie a referência do pagamento e o comprovativo.",
      step4: "Ganhar Diariamente",
      step4Text:
        "Depois da aprovação, o seu pacote começa a gerar ganhos diários.",
      popular: "Planos de Investimento Populares",
      start: "Começar Agora",
      assistance: "Precisa de Ajuda?",
      assistanceText:
        "Contacte a nossa equipa de suporte no WhatsApp para ajuda com depósitos, levantamentos e configuração da conta.",
      whatsapp: "Falar no WhatsApp",
    },

    en: {
      badge: "🌱 Technology & Investments",
      title: "Grow Your Future With Agrotech Africa",
      subtitle:
        "A digital investment platform built for Mozambique, combining agriculture-inspired growth, technology, referrals, and daily income tracking.",
      create: "Create Account",
      signin: "Sign In",
      stats1: "Days Duration",
      stats2: "Daily Profit",
      stats3: "Minimum Withdrawal",
      stats4: "Referral Bonus",
      how: "How It Works",
      step1: "Create Account",
      step1Text: "Register with your Mozambique phone number.",
      step2: "Choose Package",
      step2Text: "Select your preferred investment plan.",
      step3: "Pay via E-mola",
      step3Text: "Submit payment reference and screenshot proof.",
      step4: "Earn Daily",
      step4Text: "After approval, your package starts earning daily.",
      popular: "Popular Investment Plans",
      start: "Start Now",
      assistance: "Need Assistance?",
      assistanceText:
        "Contact our support team on WhatsApp for help with deposits, withdrawals, and account setup.",
      whatsapp: "Chat on WhatsApp",
    },
  };

  const page = text[lang];

  const previewPackages = [
    {
      name: "Digital Start",
      price: "1,300 MT",
      daily: "43 MT/day",
    },
    {
      name: "Agro Smart",
      price: "6,600 MT",
      daily: "220 MT/day",
    },
    {
      name: "Mega Vision",
      price: "25,000 MT",
      daily: "833 MT/day",
    },
  ];

  return (
    <div className="landing-page">
      <LanguageSwitcher />

      <header className="landing-hero">
        <nav className="landing-nav">
          <h2>AGROTECH AFRICA</h2>

          <div>
            <Link to="/login">{t("login")}</Link>
            <Link to="/register" className="nav-btn">
              {t("register")}
            </Link>
          </div>
        </nav>

        <div className="hero-content">
          <span>{page.badge}</span>

          <h1>{page.title}</h1>

          <p>{page.subtitle}</p>

          <div className="hero-buttons">
            <Link to="/register">{page.create}</Link>

            <Link to="/login" className="secondary-btn">
              {page.signin}
            </Link>
          </div>
        </div>
      </header>

      <section className="landing-stats">
        <div>
          <h2>365</h2>
          <p>{page.stats1}</p>
        </div>

        <div>
          <h2>3.33%</h2>
          <p>{page.stats2}</p>
        </div>

        <div>
          <h2>100 MT</h2>
          <p>{page.stats3}</p>
        </div>

        <div>
          <h2>10%</h2>
          <p>{page.stats4}</p>
        </div>
      </section>

      <section className="how-section">
        <h2>{page.how}</h2>

        <div className="how-grid">
          <div>
            <h3>1. {page.step1}</h3>
            <p>{page.step1Text}</p>
          </div>

          <div>
            <h3>2. {page.step2}</h3>
            <p>{page.step2Text}</p>
          </div>

          <div>
            <h3>3. {page.step3}</h3>
            <p>{page.step3Text}</p>
          </div>

          <div>
            <h3>4. {page.step4}</h3>
            <p>{page.step4Text}</p>
          </div>
        </div>
      </section>

      <section className="preview-section">
        <h2>{page.popular}</h2>

        <div className="preview-grid">
          {previewPackages.map((item, index) => (
            <div className="preview-card" key={index}>
              <h3>{item.name}</h3>

              <h1>{item.price}</h1>

              <p>{item.daily}</p>

              <Link to="/register">{page.start}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="support-section">
        <h2>{page.assistance}</h2>

        <p>{page.assistanceText}</p>

        <a
          href="https://t.me/AgentBraxton"
          target="_blank"
          rel="noreferrer"
        >
          Telegram Support
        </a>
      </section>

      <InstallButton />
    </div>
  );
}

export default Home;