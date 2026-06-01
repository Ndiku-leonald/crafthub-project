import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Badge = {
  id: string;
  skillId: number;
  skillName: string;
  emoji: string;
  level: 'bronze' | 'silver' | 'gold';
  earnedAt: string;
};

export type Certificate = {
  id: string;
  skillId: number;
  skillName: string;
  emoji: string;
  userName: string;
  earnedAt: string;
  completionDate: string;
};

type CertificateContextType = {
  certificates: Certificate[];
  badges: Badge[];
  completedSkills: number[];
  awardCertificate: (skillId: number, skillName: string, emoji: string, userName: string) => Certificate;
  hasCertificate: (skillId: number) => boolean;
  getBadgeLevel: (skillId: number) => Badge['level'] | null;
};

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

function getBadgeLevelForSkill(skillId: number): Badge['level'] {
  if (skillId >= 37) return 'gold';
  if (skillId >= 19) return 'silver';
  return 'bronze';
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function CertificateProvider({ children }: { children: ReactNode }) {
  const [certificates, setCertificates] = useState<Certificate[]>(() =>
    loadFromStorage<Certificate[]>('crafthub_certificates', [])
  );
  const [badges, setBadges] = useState<Badge[]>(() =>
    loadFromStorage<Badge[]>('crafthub_badges', [])
  );

  useEffect(() => {
    localStorage.setItem('crafthub_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('crafthub_badges', JSON.stringify(badges));
  }, [badges]);

  const completedSkills = certificates.map((c) => c.skillId);

  const awardCertificate = (
    skillId: number,
    skillName: string,
    emoji: string,
    userName: string
  ): Certificate => {
    const now = new Date().toISOString();
    const completionDate = new Date().toLocaleDateString('en-UG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const certificate: Certificate = {
      id: `cert-${skillId}-${Date.now()}`,
      skillId,
      skillName,
      emoji,
      userName,
      earnedAt: now,
      completionDate,
    };

    const badge: Badge = {
      id: `badge-${skillId}-${Date.now()}`,
      skillId,
      skillName,
      emoji,
      level: getBadgeLevelForSkill(skillId),
      earnedAt: now,
    };

    setCertificates((prev) => {
      const filtered = prev.filter((c) => c.skillId !== skillId);
      return [...filtered, certificate];
    });

    setBadges((prev) => {
      const filtered = prev.filter((b) => b.skillId !== skillId);
      return [...filtered, badge];
    });

    return certificate;
  };

  const hasCertificate = (skillId: number): boolean => {
    return certificates.some((c) => c.skillId === skillId);
  };

  const getBadgeLevel = (skillId: number): Badge['level'] | null => {
    const badge = badges.find((b) => b.skillId === skillId);
    return badge ? badge.level : null;
  };

  return (
    <CertificateContext.Provider
      value={{ certificates, badges, completedSkills, awardCertificate, hasCertificate, getBadgeLevel }}
    >
      {children}
    </CertificateContext.Provider>
  );
}

export function useCertificate(): CertificateContextType {
  const context = useContext(CertificateContext);
  if (context === undefined) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  return context;
}
