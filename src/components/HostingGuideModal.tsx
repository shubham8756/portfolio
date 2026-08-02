import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Download, 
  Code, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';

interface HostingGuideModalProps {
  onClose: () => void;
  onExportJSON: () => void;
}

export const HostingGuideModal: React.FC<HostingGuideModalProps> = ({
  onClose,
  onExportJSON,
}) => {
  const [activePlatform, setActivePlatform] = useState<'vercel' | 'netlify' | 'cloudflare'>('vercel');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const platforms = [
    {
      id: 'vercel',
      name: 'Vercel',
      badge: 'Active & Recommended',
      freeBandwidth: '100 GB / month',
      customDomain: 'Included Free',
      ssl: 'Automatic HTTPS',
      easeScore: '10 / 10',
      description: 'The premier cloud platform for front-end frameworks. Connect your GitHub repository and Vercel builds & deploys every commit automatically in seconds.',
      commands: [
        'npm install -g vercel',
        'vercel login',
        'vercel --prod'
      ],
      steps: [
        'Push your portfolio repository to GitHub.',
        'Go to Vercel.com and sign in with GitHub.',
        'Click "Add New Project" and import your portfolio repository.',
        'Vercel automatically detects Vite/React. Click "Deploy". Done!'
      ]
    },
    {
      id: 'netlify',
      name: 'Netlify',
      badge: 'Best for Drag & Drop',
      freeBandwidth: '100 GB / month',
      customDomain: 'Included Free',
      ssl: 'Automatic Let\'s Encrypt',
      easeScore: '9.8 / 10',
      description: 'Ultra-fast global CDN with seamless continuous deployment from Git, form submissions built-in, and instant preview URLs.',
      commands: [
        'npm run build',
        'npx netlify-cli deploy --prod --dir=dist'
      ],
      steps: [
        'Run `npm run build` to generate the static build files in `/dist`.',
        'Log in to Netlify.com.',
        'Drag and drop your `dist` folder directly onto Netlify dashboard, OR connect your GitHub repo.',
        'Your site is instantly live with a free SSL certificate!'
      ]
    },
    {
      id: 'cloudflare',
      name: 'Cloudflare Pages',
      badge: 'Unlimited Free Bandwidth',
      freeBandwidth: 'Unlimited',
      customDomain: 'Included Free',
      ssl: 'Automatic Universal SSL',
      easeScore: '9.5 / 10',
      description: 'Backed by Cloudflare\'s ultra-low latency global edge network with 300+ data centers worldwide.',
      commands: [
        'npx wrangler pages deploy dist'
      ],
      steps: [
        'Create a free Cloudflare account.',
        'Go to Workers & Pages -> Create Application -> Pages.',
        'Connect your GitHub repository and choose Vite framework preset.',
        'Click "Save and Deploy".'
      ]
    }
  ];

  const currentPlatform = platforms.find((p) => p.id === activePlatform)!;

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Free Portfolio Hosting Guide
              </h3>
              <p className="text-xs text-slate-400">
                How to host this portfolio 100% free with zero monthly cost & custom domain support.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Market Overview Summary */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              What's currently best in the market for developer portfolios?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              In 2026, the industry gold standard for modern front-end portfolios is a **React + Vite / Next.js SPA** hosted on **Vercel** or **Netlify**. Both offer generous perpetual free tiers, global CDN edge distribution, automatic HTTPS certificates, and seamless GitHub pull-request deploy previews.
            </p>
          </div>

          {/* Platform Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activePlatform === p.id
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-sm font-bold">{p.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{p.badge}</div>
              </button>
            ))}
          </div>

          {/* Detailed Platform Guide */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{currentPlatform.name} Hosting Specs</h4>
                <p className="text-xs text-slate-400 mt-0.5">{currentPlatform.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">
                  Bandwidth: {currentPlatform.freeBandwidth}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-indigo-400">
                  Custom Domain: {currentPlatform.customDomain}
                </span>
              </div>
            </div>

            {/* Step by Step Instructions */}
            <div>
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Deployment Steps ({currentPlatform.name})
              </h5>
              <div className="space-y-2.5">
                {currentPlatform.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CLI Commands */}
            <div>
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                Quick CLI Commands
              </h5>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs text-indigo-300">
                {currentPlatform.commands.map((cmd, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <span>$ {cmd}</span>
                    <button
                      onClick={() => handleCopy(cmd)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="Copy Command"
                    >
                      {copiedCommand === cmd ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Export Portfolio Config Button */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-indigo-400" />
              <div>
                <h5 className="text-sm font-bold text-white">Export Portfolio Data (JSON)</h5>
                <p className="text-xs text-slate-400">Download all your profile content, projects, skills, and experience to back it up or import into your repo.</p>
              </div>
            </div>

            <button
              onClick={onExportJSON}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md whitespace-nowrap shrink-0 transition-all"
            >
              Export Portfolio JSON
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
