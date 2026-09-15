# How to deploy this as a public, working prototype

This folder is a complete, ready-to-deploy version of the Kuvera Weekly Review Pulse Generator, using the same approach as your first chatbot deployment (Groq's free tier + Vercel).

## Before you start

You already have a Groq API key from deploying the chatbot — you can reuse the same one. No need to create a new account or key.

## Step 1 — Open this folder in Claude Code

Point Claude Code at this project folder (containing `index.html`, `api/chat.js`, `package.json`, `vercel.json`).

## Step 2 — Paste this exact prompt into Claude Code

```
I have a small web app in this folder: a static index.html frontend and an
api/chat.js Vercel serverless function that proxies requests to the Groq API
using an environment variable called GROQ_API_KEY. This is a second,
separate project from my earlier chatbot deployment.

Please help me deploy this to Vercel as a new, separate project:

1. Check if the Vercel CLI is installed (it should be, from last time).
2. Log me in if needed (vercel login).
3. Initialize this folder as a NEW Vercel project (not the same one as my
   chatbot) and deploy it to production (vercel --prod).
4. Set the GROQ_API_KEY environment variable for this new project (I'll
   reuse the same Groq key from my chatbot deployment) - either via
   vercel env add GROQ_API_KEY, or tell me exactly where in the Vercel
   dashboard to add it for this specific project.
5. After the environment variable is set, redeploy so it takes effect
   (vercel --prod again).
6. Give me the final live public URL when everything is working.

Explain each step in plain language as you go.
```

## Step 3 — Test before sharing

Once deployed, open the live URL and click "Load sample data" then "Generate Weekly Pulse" to confirm it produces themes, a one-page note, and an email draft correctly - same as it did in Claude.ai.

## If you hit a rate-limit message during testing

This uses the same retry logic and free-tier setup as your chatbot, so the same behavior applies: it will quietly retry for about 23 seconds before showing any message, and normal spaced-out testing shouldn't trigger it. If it does, wait 30 seconds and try again.

## Cost note

Same as before - Vercel and Groq's free tiers are both genuinely free, no card required. This is a separate project from your chatbot, but reuses the same free Groq account, so there's no additional signup needed.
