# Villa Group Website

Static real estate website with LeadRat CRM integration.

## 🚀 Quick Deploy

### Deploy to Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

Or use the [Vercel Dashboard](https://vercel.com/new) - just connect your Git repo.

### Deploy to Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. Follow prompts

## 🧪 Local Testing

The form requires the `/api/leadrat-proxy` serverless function, which keeps the CRM API key server-side.

**Option 1: Use Vercel Dev Server**
```bash
npm i -g vercel
vercel dev
```

**Option 2: Use Netlify Dev Server**
```bash
npm i -g netlify-cli
netlify dev
```

Then open http://localhost:3000 (or the port shown).

## 📁 Project Structure

```
├── index.html          # Main page
├── thank-you.html      # Success page
├── api/
│   └── leadrat-proxy.js # Serverless function (posts leads to LeadRat)
├── css/                # Stylesheets
├── js/                 # JavaScript files
└── images/            # Image assets
```

## 🔧 Configuration

Leads are pushed to LeadRat by `/api/leadrat-proxy.js`:

```
POST https://connect.leadrat.com/api/v1/integration/Website
```

**Set the API key as an environment variable, not in code.** This repo is public, so
the literal in `api/leadrat-proxy.js` is only a fallback and must be treated as
already disclosed.

```bash
vercel env add LEADRAT_API_KEY production
vercel env add LEADRAT_API_KEY preview
vercel env add LEADRAT_API_KEY development   # for `vercel dev`
```

The browser never sees the key — `index.html` posts plain form fields to
`/api/leadrat-proxy` and the function adds the `API-Key` header. Name and a valid
10-digit mobile are required; email is optional.
