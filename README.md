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

`npm i -g pnpm` - Opcjonalne, jednakże rekomenduje korzystać z `pnpm` zamiast `npm`, ponieważ na `npm` projekt nie jest do końca przetestowany
`pnpm i` - Instalacja zależności
`docker compose up --build` - Uruchomienie bazy danych i silnika wyszukiwania (postgres & elasticsearch)
`pnpx prisma db push` - Zaaktualizuj strukturę bazy danych
`pnpm prisma-seed` - uzupełnij bazę danych przykładowymi rekordami
`pnpm dev` - uruchom aplikację w trybie deweloperskim

Na tym etapie, aby skorzystać z aplikacji wystarczy otworzyć stronę `http://localhost:3000/`
Udanej zabawy!

Screeny z aplikacji dostępne w folderze [assets](./assets)

![image info](./assets/1.png)

![image info](./assets/2.png)

![image info](./assets/3.png)

![image info](./assets/4.png)

![image info](./assets/5.png)

![image info](./assets/6.png)

![image info](./assets/7.png)

![image info](./assets/8.png)

![image info](./assets/9.png)