# GitHub Repository Setup

## Stap 1: Maak GitHub Repository

1. Ga naar [github.com](https://github.com) en log in
2. Klik op het **+** icoon rechtsboven → **New repository**
3. Vul in:
   - **Repository name**: `helderly` (of kies eigen naam)
   - **Description**: "Rustige planning app - Focus op wat belangrijk is"
   - **Visibility**: Public of Private (kies zelf)
   - **DO NOT** check "Initialize with README" (we hebben al code)
4. Klik **Create repository**

## Stap 2: Push naar GitHub

Na het aanmaken van de repository, GitHub toont instructies. Gebruik deze:

### Als je repository al bestaat:
```bash
# Voeg remote toe (vervang YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/helderly.git

# Push code
git branch -M main
git push -u origin main
```

### Als je repository net is aangemaakt:
```bash
# Verwijder bestaande remote (als die er is)
git remote remove origin

# Voeg nieuwe remote toe (vervang YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/helderly.git

# Push code
git branch -M main
git push -u origin main
```

## Stap 3: Verifieer

1. Ga naar je GitHub repository
2. Check of alle bestanden zichtbaar zijn
3. Check of `.env.local` **NIET** zichtbaar is (staat in .gitignore)

## Volgende Stap: Vercel

Na het pushen naar GitHub:
1. Ga naar [vercel.com](https://vercel.com)
2. Import Project → Kies je GitHub repository
3. Vercel detecteert Next.js automatisch
4. Klik Deploy

**Belangrijk**: Voeg daarna environment variables toe in Vercel!
