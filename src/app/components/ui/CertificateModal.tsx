import { useEffect, useRef, useCallback } from 'react';
import type { Certificate, Badge } from '../../context/CertificateContext';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  certificate: Certificate;
  badge: Badge;
  onClose: () => void;
}

const BADGE_CONFIG: Record<Badge['level'], { color: string; bg: string; border: string; label: string; icon: string }> = {
  bronze: { color: '#8B5E3C', bg: '#FDF0E6', border: '#CD7F32', label: 'Bronze Award', icon: '🥉' },
  silver: { color: '#6B7280', bg: '#F3F4F6', border: '#9CA3AF', label: 'Silver Award', icon: '🥈' },
  gold:   { color: '#B48C00', bg: '#FFFBEB', border: '#D4A017', label: 'Gold Award',   icon: '🥇' },
};

export default function CertificateModal({ certificate, badge, onClose }: CertificateModalProps) {
  const badgeCfg = BADGE_CONFIG[badge.level];
  const certificateRef = useRef<HTMLDivElement>(null);

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 2200;
    const colors = ['#B48C00', '#003366', '#1F5C2E', '#fff', '#D4A017'];
    const frame = () => {
      confetti({ particleCount: 6, angle: 60,  spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    fireConfetti();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [fireConfetti]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes badgePopIn {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes certFadeIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cert-badge-pop { animation: badgePopIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both; }
        .cert-card      { animation: certFadeIn 0.45s ease-out both; }
        @media print {
          body > *:not(.cert-print-target) { display: none !important; }
          .cert-modal-overlay { position: static !important; background: white !important; }
          .cert-no-print { display: none !important; }
          .cert-card { box-shadow: none !important; animation: none !important; }
        }
      `}</style>

      <div
        className="cert-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(4px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          ref={certificateRef}
          className="cert-card cert-print-target relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: '#FFFDF5', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <div className="m-4 rounded-xl p-1" style={{ border: '3px solid #B48C00' }}>
            <div className="rounded-lg p-6" style={{ border: '1.5px solid #D4A017', backgroundColor: '#FFFDF5' }}>

              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full mb-3" style={{ backgroundColor: '#003366' }}>
                  <span className="text-white font-bold text-sm tracking-wider">🎓 CRAFTHUB ACADEMY</span>
                </div>
                <h1 className="text-2xl font-bold tracking-wide uppercase mb-1"
                    style={{ color: '#003366', fontFamily: 'Georgia, serif', letterSpacing: '0.08em' }}>
                  Certificate of Completion
                </h1>
                <div className="h-0.5 mx-auto mb-4 rounded"
                     style={{ width: '80%', background: 'linear-gradient(90deg, transparent, #B48C00, transparent)' }} />
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm tracking-wide" style={{ color: '#6B7280' }}>This is to certify that</p>

                <div className="text-3xl font-bold italic py-2 px-6 rounded-lg mx-auto inline-block"
                     style={{ color: '#003366', fontFamily: 'Georgia, "Times New Roman", serif',
                              borderBottom: '2px solid #B48C00', borderTop: '2px solid #B48C00' }}>
                  {certificate.userName}
                </div>

                <p className="text-sm tracking-wide" style={{ color: '#6B7280' }}>has successfully completed the course in</p>

                <div className="py-3">
                  <span className="text-5xl block mb-2">{certificate.emoji}</span>
                  <span className="text-2xl font-bold" style={{ color: '#1F5C2E', fontFamily: 'Georgia, serif' }}>
                    {certificate.skillName}
                  </span>
                </div>

                <div className="cert-badge-pop inline-flex flex-col items-center gap-1 px-6 py-3 rounded-xl mx-auto"
                     style={{ backgroundColor: badgeCfg.bg, border: `2px solid ${badgeCfg.border}` }}>
                  <span className="text-3xl">{badgeCfg.icon}</span>
                  <span className="font-bold text-sm uppercase tracking-widest" style={{ color: badgeCfg.color }}>
                    {badgeCfg.label}
                  </span>
                </div>

                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Awarded on <span className="font-semibold" style={{ color: '#003366' }}>{certificate.completionDate}</span>
                </p>

                <div className="h-px mx-8 my-3"
                     style={{ background: 'linear-gradient(90deg, transparent, #B48C00, transparent)' }} />

                <div className="flex flex-col items-center gap-1">
                  <div className="text-xl italic font-bold" style={{ color: '#003366', fontFamily: 'Georgia, serif' }}>
                    CraftHub Academy
                  </div>
                  <div className="w-32 h-px" style={{ backgroundColor: '#003366' }} />
                  <p className="text-xs tracking-wider uppercase" style={{ color: '#9CA3AF' }}>Authorised Signature</p>
                </div>

                <div className="text-xs tracking-widest uppercase mt-2 font-medium" style={{ color: '#D4A017' }}>
                  ✦ Verified Achievement ✦
                </div>
              </div>
            </div>
          </div>

          <div className="cert-no-print flex gap-3 px-6 pb-6">
            <button type="button" onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#003366', color: 'white' }}>
              <span>⬇</span> Download Certificate
            </button>
            <button type="button" onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#1F5C2E', color: 'white' }}>
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
