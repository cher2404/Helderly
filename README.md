# Helderly

Rustige planning voor mensen die focussen. Geen ruis, geen stress. Alleen helderheid over wat er echt toe doet vandaag.

## 🚀 Features

- **Vandaag** - Duidelijk overzicht van je dag
- **Focus Mode** - Werk aan één taak tegelijk
- **Kalender** - Plan vooruit met week- en maandoverzicht
- **Mappen** - Organiseer taken in projecten
- **Together** - Samenwerken met je team
- **PWA** - Installeer als app, werkt offline
- **Daily Ritual** - Begin elke dag met focus

## 🛠️ Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **Supabase** - Backend & Database (ready to connect)

## 📦 Setup

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 🗄️ Supabase Setup

1. Maak een Supabase project op [supabase.com](https://supabase.com)
2. Haal API keys op (Settings → API)
3. Maak `.env.local` bestand:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://jouw-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key
   ```
4. Voer SQL schema uit (zie `DEPLOYMENT.md`)

## 🚀 Deployment

### Vercel (aanbevolen)

1. Push code naar GitHub (al gedaan ✅)
2. Import project in [Vercel](https://vercel.com)
3. Voeg environment variables toe
4. Deploy

Zie `DEPLOYMENT.md` voor uitgebreide instructies.

## 📚 Documentatie

- `DEPLOYMENT.md` - Uitgebreide deployment & Supabase setup
- `QUICK_START.md` - Snelle start gids
- `GITHUB_SETUP.md` - GitHub repository setup

## 🎨 Design

- **Kleuren**: Wit (#FFFFFF), Paars accent (#8C46E0), Donkere footer (#050025)
- **Tone**: Rustig, volwassen, praktisch
- **Taal**: Nederlands (100%)

## 📄 Licentie

Private project - Alle rechten voorbehouden
