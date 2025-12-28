# Villa Group Website

Static real estate website with sell.do CRM integration.

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

The form requires the `/api/selldo-proxy` serverless function to avoid CORS issues.

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
│   └── selldo-proxy.js # Serverless function (handles CORS)
├── css/                # Stylesheets
├── js/                 # JavaScript files
└── images/            # Image assets
```

## 🔧 Configuration

The sell.do API integration is configured in `/api/selldo-proxy.js` with the API key already set.
