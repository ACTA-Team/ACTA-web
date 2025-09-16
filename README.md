# ACTA Web - Frontend dApp

A modern decentralized application (dApp) for the ACTA (Automated Credential Trust Authority) ecosystem, built with Next.js, React, and Stellar blockchain integration.

## 🌟 Overview

ACTA Web is the frontend interface for the ACTA ecosystem, enabling users to connect their Stellar wallets, generate API keys, and manage verifiable credentials. The application features a sleek, modern design with glass morphism effects, particle animations, and full responsive support.

## ✨ Features

### 🔐 Wallet Integration
- **Multi-wallet support**: Freighter, Albedo, xBull, Lobstr, and Rabet
- **Stellar network compatibility**: Testnet and Mainnet support
- **Secure authentication**: Wallet-based login and session management

### 🎨 Modern UI/UX
- **Glass morphism design**: Transparent sidebar with backdrop blur effects
- **Particle animations**: Dynamic Aurora and particle system backgrounds
- **Responsive layout**: Mobile-first design with adaptive components
- **Dark theme**: Elegant dark interface with custom color schemes

### 📋 Credential Management
- **Create credentials**: Issue new verifiable credentials
- **View credentials**: Display user's credential collection
- **Search credentials**: Find credentials by hash
- **Custom templates**: Multiple visual templates and gradients

### 🔑 API Key Generation
- **Secure key generation**: Create API keys for ACTA services
- **Key management**: View and manage active API keys
- **Integration ready**: Keys for seamless API integration

### 👤 Profile Management
- **Wallet information**: Display connected wallet details
- **Network status**: Show current Stellar network connection
- **Activity tracking**: Monitor recent wallet activities

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.5.0** - React framework with Turbopack
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe development

### UI Components
- **shadcn/ui** - Modern React component library
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### Blockchain Integration
- **Stellar Wallets Kit** - Multi-wallet connection
- **Stellar Base** - Stellar network utilities

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JosueBrenes/dApp-ACTA.git
   cd dApp-ACTA/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Configure the following variables in `.env`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://acta.up.railway.app/v1
   NEXT_PUBLIC_STELLAR_NETWORK=testnet
   NEXT_PUBLIC_APP_NAME=ACTA dApp
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint with auto-fix
npm run lint:check   # Check ESLint without fixing
npm run format       # Format code with Prettier
npm run format:check # Check Prettier formatting
```

## 🏗️ Project Structure

```
src/
├── @types/              # TypeScript type definitions
├── app/                 # Next.js app directory
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── layout/          # Layout components
│   │   ├── DashboardLayout.tsx
│   │   └── Sidebar.tsx
│   ├── modules/         # Feature modules
│   │   ├── auth/        # Authentication
│   │   ├── api-key/     # API key management
│   │   ├── credentials/ # Credential management
│   │   ├── dashboard/   # Dashboard
│   │   └── profile/     # User profile
│   ├── ui/              # shadcn/ui components
│   ├── Aurora.tsx       # Aurora animation
│   └── magicui/         # Magic UI components
├── config/              # Configuration files
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── providers/           # React context providers
├── scripts/             # Utility scripts
└── services/            # API services
```

## 🎨 Design System

### Color Scheme
- **Background**: Dynamic gradients (slate-900 → background → slate-800)
- **Sidebar**: Black transparent (`bg-black/40`) with backdrop blur
- **Cards**: Solid backgrounds for content readability
- **Accents**: Blue to purple gradients

### Components
- **Glass morphism**: Transparent elements with backdrop blur
- **Particle system**: Interactive background animations
- **Aurora effects**: Gradient animations for visual appeal
- **Responsive design**: Mobile-first approach

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔗 API Integration

The frontend connects to the ACTA API for:
- **User credentials** management
- **API key** generation and validation
- **Authentication** services
- **Credential** issuance and verification

API Base URL: `https://acta.up.railway.app/v1`

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Follow **ESLint** and **Prettier** configurations
- Use **TypeScript** for type safety
- Follow **shadcn/ui** component patterns
- Write **descriptive commit messages**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🏆 Hackathon Project

This project was developed for the **Meridian Hackathon**, showcasing innovative solutions for decentralized credential management using the Stellar blockchain.

## 📞 Support

For support, questions, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/JosueBrenes/dApp-ACTA/issues)
- **Email**: Contact the development team
- **Documentation**: Check the [API documentation](../API-v2/README.md)

## 🙏 Acknowledgments

- **Stellar Development Foundation** for blockchain infrastructure
- **shadcn** for the amazing UI component library
- **Vercel** for hosting and deployment platform
- **Meridian Hackathon** for the opportunity to innovate

---

**Built with ❤️ for the decentralized future**