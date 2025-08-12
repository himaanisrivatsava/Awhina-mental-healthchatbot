## 🔑 Setup AstraDB & OpenAI API Keys

This project requires credentials from **AstraDB** and **OpenAI** before it can run.  
Follow the steps below to set up your environment.

---

### 1️⃣ Create an AstraDB account & credentials

1. Go to: [https://www.datastax.com/products/datastax-astra](https://www.datastax.com/products/datastax-astra)
2. Sign up (or log in) and create a **Serverless database**.
3. In your Astra dashboard:
   - **Namespace**: Usually `default_keyspace` unless you created a custom one.
   - **Collection Name**: Choose any valid name (e.g., `db-awhina`).
   - **API Endpoint**: Copy from the "Connect" tab (e.g., `https://<DB_ID>-<region>.apps.astra.datastax.com`).
   - **Application Token**: Generate a new token (role: Database Administrator or higher). Copy it — you’ll only see it once.

---

### 2️⃣ Create an OpenAI account & API key

1. Go to: [https://platform.openai.com/docs/overview](https://platform.openai.com/docs/overview)
2. Sign up (or log in) to your OpenAI Developer account.
3. In your dashboard, create a **Secret API Key**.
4. Copy it — you’ll only see it once.

---

### 3️⃣ Create `.env` under `Scripts/` folder

Inside your project, create the folder if it doesn’t exist:

```bash
mkdir -p Scripts
```
Create a file named .env inside Scripts/ and paste the following, replacing the placeholder values with your own credentials from AstraDB & OpenAI:

.env
```
ASTRA_DB_NAMESPACE=" "
ASTRA_DB_COLLECTION=" "
ASTRA_DB_API_ENDPOINT=" "
OPENAI_API_KEY=" "
```
## 4️ Add .env to .gitignore
Ensure your .env file is never committed to GitHub:

```
# Ignore environment variables
.env
Scripts/.env
```
## 5 Run the project
Once your .env is set up, run your project as instructed in the main README run section:

```
npm install
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
