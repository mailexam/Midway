# Midway.js + Mailexam

Minimal [Midway.js 3](https://midwayjs.org/) (Koa) example that sends test mail through [Mailexam](https://mailexam.io/) SMTP via [Nodemailer](https://nodemailer.com/).

Based on the [Mailexam Midway.js guide](https://wiki.mailexam.ru/en/examples/midway/).

## What you need

- A Mailexam account and a project with SMTP credentials.
- Node.js 18+ and npm.

From your Mailexam welcome email or dashboard:

| Variable | Description |
|----------|-------------|
| `MAILEXAM_LOGIN` | SMTP login (for example, `xxxxx`) |
| `MAILEXAM_PASSWORD` | SMTP password (paired with the login) |
| Host | `{MAILEXAM_LOGIN}.mailexam.io` (built automatically in code) |

## Quick start (host)

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

3. Edit `.env`:

```env
MAILEXAM_LOGIN=YOUR_LOGIN
MAILEXAM_PASSWORD=YOUR_PASSWORD
MAILEXAM_PORT=587
MAIL_FROM=noreply@example.test
```

4. Build and run the server:

```bash
npm run build
npm start
```

The server listens on `http://127.0.0.1:7001` by default.

5. Send a test message:

```bash
curl -X POST http://127.0.0.1:7001/mail/test \
  -H 'Content-Type: application/json' \
  -d '{"to":"user@example.test","subject":"Test","text":"Hello"}'
```

The message appears in the Mailexam dashboard → your project → inbox.

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MAILEXAM_LOGIN` | yes | — | SMTP login; also used to build the host name |
| `MAILEXAM_PASSWORD` | yes | — | SMTP password |
| `MAILEXAM_PORT` | no | `587` | SMTP port (`587`, `2525`, or `465`) |
| `MAIL_FROM` | no | `noreply@example.test` | Sender address |
| `HTTP_HOST` | no | `127.0.0.1` | HTTP bind address |
| `HTTP_PORT` | no | `7001` | HTTP listen port |

For port **587** the transport uses STARTTLS (`secure: false`). For port **465** it uses SMTPS (`secure: true`).

## Project layout

```
.
├── package.json
├── tsconfig.json
├── bootstrap.js              # loads .env, starts Midway
├── src/
│   ├── configuration.ts
│   ├── config/config.default.ts
│   ├── service/mail.service.ts
│   └── controller/mail.controller.ts
├── .env.example
├── Dockerfile                # for local debugging only
└── docker-compose.yml
```

## Docker (debugging)

Docker is provided for local debugging. For day-to-day development, run the app on the host with `npm run build && npm start` (see above).

```bash
cp .env.example .env
# edit .env with your credentials

docker compose up --build
```

Then call the same endpoint on the mapped port:

```bash
curl -X POST http://127.0.0.1:7001/mail/test \
  -H 'Content-Type: application/json' \
  -d '{"to":"user@example.test","subject":"Test","text":"Hello"}'
```

Inside the container the server binds to `0.0.0.0:7001`.

## CI

Set these secrets in your CI environment:

```yaml
variables:
  MAILEXAM_LOGIN: $MAILEXAM_LOGIN
  MAILEXAM_PASSWORD: $MAILEXAM_PASSWORD
  MAILEXAM_PORT: "587"
  MAIL_FROM: "noreply@example.test"
```

After sending a message in a test, verify delivery via the [Mailexam API](https://mailexam.io/api).

## Troubleshooting

**Connection timeout / authentication failed**

- Host must be `{login}.mailexam.io`, where `{login}` matches `MAILEXAM_LOGIN`.
- Login and password must come from the same Mailexam project.

**Port 587 and TLS**

- For 587: `secure: false` (STARTTLS). For 465: `secure: true`.

**Variables `undefined`**

- Add a `.env` file in the project root or export variables in your shell/CI.
- `bootstrap.js` loads `.env` via `dotenv` before the app starts.

**Message not in the dashboard**

- Open the inbox of the same Mailexam project.
- Check server logs for SMTP errors on `sendMail`.

## See also

- [Mailexam Midway.js guide (wiki)](https://wiki.mailexam.ru/en/examples/midway/)
- [NestJS reference implementation](https://github.com/mailexam/NestJS) — another Node.js framework with Nodemailer
- [Midway.js documentation](https://midwayjs.org/)
- [Nodemailer documentation](https://nodemailer.com/)
- [Mailexam API documentation](https://mailexam.io/api)

## License

Apache 2.0
