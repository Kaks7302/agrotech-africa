# Agrotech Africa

## Setup
Backend:
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Seed packages once with Thunder Client/Postman:
```txt
POST http://localhost:5000/api/packages/seed
```

Features included:
- Register / login with JWT
- User dashboard
- Investment packages
- E-mola payment proof upload
- Admin approval / rejection
- Daily income cron
- Withdrawal request, minimum 100 MT, 10% fee
- Referral code system
- Green mobile-first UI
