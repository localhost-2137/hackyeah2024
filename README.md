# TrustLink

Cześć,
Witamy w README naszego projektu na hackhathon hackYeah 2024.
Aby odpalić naszą aplikację należy posiadać nodejs oraz dockera, a następnie wykonaj poniższe polecenia:

stwórz plik `.env` z zawartością podobną do tej poniżej:
```
AUTH_SECRET="authsecret"
DATABASE_URL=postgres://root:password@localhost:5432/hackyeah
AUTH_TRUST_HOST=http://localhost:3000
EMAIL_USER=example@example.com
EMAIL_HOST=smtp.example.com
EMAIL_HOST_PASSWORD=password
GOOGLE_CLIENT_ID=clientid
GOOGLE_CLIENT_SECRET=client secret
NEXTAUTH_JWT_SECRET=jwtsecret
NEXTAUTH_SECRET=nextauthsecret
GEMINI_API_KEY=geminiapikey
```

1. Zainstaluj pnpm
```bash
npm i -g pnpm
```
2. Zainstaluj zależności
```bash
pnpm install
```
3. Włącz baze danych i silnik wyszukiwania
```bash
docker compose up --build
```
4. Zaktualizuj strukturę bazy danych
```bash
npx prisma db push
```
5. Uzupełnij bazę przykładowymi rekordami
```bash
pnpm prisma-seed
```
6. Uruchom aplikację w trybie deweloperskim
```bash
pnpm dev
```

Na tym etapie, aby skorzystać z aplikacji wystarczy otworzyć stronę `http://localhost:3000/`
Udanej zabawy!

Screeny z aplikacji dostępne w folderze [assets](./assets)
