import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Download,
  Play,
  FileText,
  CheckCircle2,
  Circle,
  BookOpen,
  Wrench,
  BarChart2,
  Award,
} from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useUser } from '../../context/UserContext';
import { useCertificate } from '../../context/CertificateContext';
import { SKILLS_DATABASE } from '../../utils/skillsDatabase';
import {
  SkillContent,
  getSkillContent,
  downloadContent,
  saveDownloadedSkill,
} from '../../utils/contentManagement';
import CertificateModal from '../ui/CertificateModal';
import type { Certificate, Badge } from '../../context/CertificateContext';

// ─── Lesson generation ──────────────────────────────────────────────────────

const LESSON_TEMPLATES = [
  'Introduction & Overview',
  'Getting Started',
  'Tools & Materials',
  'Core Techniques',
  'Step-by-Step Practice',
  'Common Mistakes to Avoid',
  'Advanced Tips',
  'Quality & Standards',
  'Business Basics',
  'Practice Exercise',
  'Safety Guidelines',
  'Marketing Your Product',
  'Pricing & Costing',
  'Customer Service',
  'Scaling Your Craft',
  'Final Assessment',
  'Portfolio Building',
  'Certification Review',
  'Next Steps',
  'Bonus: Expert Secrets',
];

function generateLessons(count: number): string[] {
  const base = LESSON_TEMPLATES.slice(0, count);
  while (base.length < count) {
    base.push(`Module ${base.length + 1}`);
  }
  return base;
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'lessons' | 'resources' | 'progress';

// ─── Component ──────────────────────────────────────────────────────────────

export default function SkillDetail() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { userProfile } = useUser();
  const { awardCertificate, hasCertificate, badges, certificates } = useCertificate();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [checkedLessons, setCheckedLessons] = useState<Set<number>>(new Set());
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [earnedCert, setEarnedCert] = useState<Certificate | null>(null);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);

  const skill = SKILLS_DATABASE.find((s) => s.id === Number(skillId));
  const contents = getSkillContent(Number(skillId));
  const lessonList = skill ? generateLessons(skill.lessons) : [];

  const alreadyCertified = skill ? hasCertificate(skill.id) : false;
  const existingCert = alreadyCertified
    ? certificates.find((c) => c.skillId === skill!.id)
    : null;
  const existingBadge = alreadyCertified
    ? badges.find((b) => b.skillId === skill!.id)
    : null;

  const allLessonsChecked =
    lessonList.length > 0 && checkedLessons.size === lessonList.length;

  const handleToggleLesson = useCallback((idx: number) => {
    setCheckedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);

  const handleCompleteCourse = () => {
    if (!skill) return;
    const userName = userProfile?.firstName || 'Learner';
    const cert = awardCertificate(skill.id, skill.name, skill.emoji, userName);
    const badgeLevel: Badge['level'] =
      skill.id >= 37 ? 'gold' : skill.id >= 19 ? 'silver' : 'bronze';
    const badge: Badge = {
      id: cert.id,
      skillId: skill.id,
      skillName: skill.name,
      emoji: skill.emoji,
      level: badgeLevel,
      earnedAt: cert.earnedAt,
    };
    setEarnedCert(cert);
    setEarnedBadge(badge);
    setShowModal(true);
  };

  const handleDownload = (content: SkillContent) => {
    const dc = downloadContent(content);
    saveDownloadedSkill(dc);
    setDownloaded((prev) => new Set([...prev, content.url]));
  };

  if (!skill) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--off-white)' }}
      >
        <div className="text-center">
          <p className="text-xl mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {t('notFound') || 'Skill not found'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/learn')}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{ backgroundColor: 'var(--navy)', color: 'white' }}
          >
            Back to Skills
          </button>
        </div>
      </div>
    );
  }

  const progressPct = lessonList.length
    ? Math.round((checkedLessons.size / lessonList.length) * 100)
    : 0;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={14} /> },
    { id: 'lessons', label: 'Lessons', icon: <CheckCircle2 size={14} /> },
    { id: 'resources', label: 'Resources', icon: <FileText size={14} /> },
    { id: 'progress', label: 'Progress', icon: <BarChart2 size={14} /> },
  ];

  const badgeLevelColor = (level: Badge['level']) => {
    if (level === 'gold') return 'var(--gold)';
    if (level === 'silver') return '#6B7280';
    return '#8B5E3C';
  };

  const badgeLevelBg = (level: Badge['level']) => {
    if (level === 'gold') return '#FFFBEB';
    if (level === 'silver') return '#F3F4F6';
    return '#FDF0E6';
  };

  const badgeLevelBorder = (level: Badge['level']) => {
    if (level === 'gold') return 'var(--gold)';
    if (level === 'silver') return '#9CA3AF';
    return '#CD7F32';
  };

  const badgeIcon = (level: Badge['level']) =>
    level === 'gold' ? '🥇' : level === 'silver' ? '🥈' : '🥉';

  return (
    <>
      <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--off-white)' }}>
        {/* ── Back + breadcrumb ── */}
        <div className="px-5 pt-5 pb-2 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--navy)' }}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <span style={{ color: 'var(--muted-foreground)' }}>/</span>
          <button
            type="button"
            onClick={() => navigate('/learn')}
            className="text-sm hover:underline"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Skills Library
          </button>
          <span style={{ color: 'var(--muted-foreground)' }}>/</span>
          <span
            className="text-sm font-semibold truncate max-w-[160px]"
            style={{ color: 'var(--navy)' }}
          >
            {skill.name}
          </span>
        </div>

        {/* ── Already certified banner ── */}
        {alreadyCertified && (
          <div
            className="mx-5 mt-3 rounded-xl px-4 py-3 flex items-center justify-between gap-3"
            style={{ backgroundColor: '#FFFBEB', border: '1.5px solid var(--gold)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <span className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>
                You've completed this course!
              </span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition hover:opacity-80"
              style={{ backgroundColor: 'var(--gold)', color: 'white' }}
            >
              <Download size={13} /> Download
            </button>
          </div>
        )}

        {/* ── Hero section ── */}
        <div
          className="mx-5 mt-4 rounded-2xl p-6 shadow-sm"
          style={{ backgroundColor: 'white' }}
        >
          <div className="text-6xl mb-3">{skill.emoji}</div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--navy)', fontFamily: 'Georgia, serif' }}
          >
            {skill.name}
          </h1>
          <p className="text-base mb-5" style={{ color: 'var(--muted-foreground)' }}>
            {skill.description}
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {(
              [
                { label: 'Difficulty', value: skill.difficulty, color: 'var(--secondary)', bg: '#FFF4EF' },
                { label: 'Startup Cost', value: skill.startupCost, color: 'var(--gold)', bg: '#FFFBEB' },
                { label: 'Income Level', value: skill.incomeLevel, color: 'var(--green)', bg: '#F0FDF4' },
                { label: 'Time to Learn', value: skill.timeToLearn, color: 'var(--navy)', bg: 'var(--card-bg)' },
              ] as const
            ).map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: stat.bg }}
              >
                <p className="text-xs mb-1" style={{ color: 'var(--muted-foreground)' }}>
                  {stat.label}
                </p>
                <p className="font-bold text-sm" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mx-5 mt-5">
          <div
            className="flex rounded-xl overflow-hidden border"
            style={{ borderColor: 'var(--border)', backgroundColor: 'white' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all"
                style={{
                  backgroundColor:
                    activeTab === tab.id ? 'var(--navy)' : 'transparent',
                  color:
                    activeTab === tab.id ? 'white' : 'var(--muted-foreground)',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ── */}
        <div className="mx-5 mt-4">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div
                className="rounded-2xl p-5 shadow-sm"
                style={{ backgroundColor: 'white' }}
              >
                <h3
                  className="font-bold mb-3 flex items-center gap-2"
                  style={{ color: 'var(--navy)' }}
                >
                  <Wrench size={16} /> Tools You'll Need
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: 'var(--card-bg)', color: 'var(--navy)' }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-5 shadow-sm"
                style={{ backgroundColor: 'white' }}
              >
                <h3 className="font-bold mb-3" style={{ color: 'var(--navy)' }}>
                  🧪 Materials Needed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: 'var(--success)', color: 'var(--green)' }}
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-5 shadow-sm"
                style={{ backgroundColor: 'white' }}
              >
                <h3 className="font-bold mb-2" style={{ color: 'var(--navy)' }}>
                  📖 About this Skill
                </h3>
                <p style={{ color: 'var(--muted-foreground)' }}>{skill.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span style={{ color: 'var(--green)' }}>✅ {skill.lessons} lessons</span>
                  {skill.hasVideo && (
                    <span style={{ color: 'var(--secondary)' }}>▶ Video included</span>
                  )}
                  {skill.hasPDF && (
                    <span style={{ color: 'var(--gold)' }}>📄 PDF guide</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LESSONS */}
          {activeTab === 'lessons' && (
            <div className="space-y-4">
              <div
                className="rounded-2xl shadow-sm overflow-hidden"
                style={{ backgroundColor: 'white' }}
              >
                <div
                  className="px-5 py-4 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h3 className="font-bold" style={{ color: 'var(--navy)' }}>
                    Course Lessons ({lessonList.length})
                  </h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    Check each lesson as you complete it
                  </p>
                </div>
                <div>
                  {lessonList.map((lesson, idx) => {
                    const done = checkedLessons.has(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleLesson(idx)}
                        className="w-full flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50 text-left border-b last:border-b-0"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                          style={{
                            backgroundColor: done ? 'var(--green)' : 'var(--card-bg)',
                            color: done ? 'white' : 'var(--navy)',
                          }}
                        >
                          {done ? '✓' : idx + 1}
                        </div>
                        <span
                          className="flex-1 text-sm font-medium"
                          style={{
                            color: done ? 'var(--muted-foreground)' : 'var(--charcoal)',
                            textDecoration: done ? 'line-through' : 'none',
                          }}
                        >
                          {lesson}
                        </span>
                        {done ? (
                          <CheckCircle2 size={18} style={{ color: 'var(--green)' }} />
                        ) : (
                          <Circle size={18} style={{ color: 'var(--border)' }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Complete course button */}
              {allLessonsChecked && !alreadyCertified && (
                <button
                  type="button"
                  onClick={handleCompleteCourse}
                  className="w-full py-4 rounded-2xl font-bold text-lg transition-all hover:opacity-90 active:scale-95 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold), #D4A017)',
                    color: 'white',
                  }}
                >
                  🎓 Complete Course & Earn Certificate
                </button>
              )}

              {alreadyCertified && (
                <div
                  className="w-full py-4 rounded-2xl font-bold text-lg text-center"
                  style={{ backgroundColor: 'var(--success)', color: 'var(--green)' }}
                >
                  ✅ Course Completed!
                </div>
              )}

              {!allLessonsChecked && !alreadyCertified && (
                <p
                  className="text-center text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Complete all {lessonList.length} lessons to earn your certificate (
                  {checkedLessons.size}/{lessonList.length} done)
                </p>
              )}
            </div>
          )}

          {/* RESOURCES */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              {contents.length === 0 ? (
                <div
                  className="rounded-2xl p-8 text-center shadow-sm"
                  style={{ backgroundColor: 'white' }}
                >
                  <p className="text-4xl mb-3">📚</p>
                  <p className="font-semibold mb-1" style={{ color: 'var(--navy)' }}>
                    Resources Coming Soon
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Step-by-step guides and video tutorials will be added here.
                  </p>
                </div>
              ) : (
                contents.map((content) => (
                  <div
                    key={content.url}
                    className="rounded-2xl p-5 shadow-sm"
                    style={{
                      backgroundColor: 'white',
                      borderLeft: '4px solid var(--gold)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {content.contentType === 'pdf' ? (
                          <FileText size={22} style={{ color: 'var(--secondary)' }} />
                        ) : (
                          <Play size={22} style={{ color: 'var(--secondary)' }} />
                        )}
                        <div>
                          <p
                            className="font-bold text-sm"
                            style={{ color: 'var(--charcoal)' }}
                          >
                            {content.title}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            {content.fileSize}
                            {content.duration && ` • ${content.duration}`} •{' '}
                            {content.language}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownload(content)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition hover:opacity-80 shrink-0"
                        style={{
                          backgroundColor: downloaded.has(content.url)
                            ? 'var(--success)'
                            : 'var(--navy)',
                          color: downloaded.has(content.url)
                            ? 'var(--green)'
                            : 'white',
                        }}
                      >
                        <Download size={14} />
                        {downloaded.has(content.url) ? 'Saved' : 'Download'}
                      </button>
                    </div>
                    <p
                      className="text-sm mb-3"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {content.description}
                    </p>
                    {content.steps.length > 0 && (
                      <div
                        className="border-t pt-3 mt-2"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <p
                          className="text-xs font-bold mb-2"
                          style={{ color: 'var(--navy)' }}
                        >
                          Steps Included:
                        </p>
                        <div className="space-y-1.5">
                          {content.steps.slice(0, 4).map((step) => (
                            <div
                              key={step.stepNumber}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                                style={{
                                  backgroundColor: 'var(--card-bg)',
                                  color: 'var(--navy)',
                                }}
                              >
                                {step.stepNumber}
                              </div>
                              <span
                                className="text-xs"
                                style={{ color: 'var(--charcoal)' }}
                              >
                                {step.title}
                              </span>
                            </div>
                          ))}
                          {content.steps.length > 4 && (
                            <p
                              className="text-xs"
                              style={{ color: 'var(--secondary)' }}
                            >
                              + {content.steps.length - 4} more steps
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {content.isOfflineAvailable && (
                      <div className="mt-3">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: 'var(--success)',
                            color: 'var(--green)',
                          }}
                        >
                          📲 Available Offline
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* PROGRESS */}
          {activeTab === 'progress' && (
            <div className="space-y-4">
              {/* Progress bar */}
              <div
                className="rounded-2xl p-5 shadow-sm"
                style={{ backgroundColor: 'white' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold" style={{ color: 'var(--navy)' }}>
                    Your Progress
                  </h3>
                  <span
                    className="font-bold text-xl"
                    style={{ color: 'var(--gold)' }}
                  >
                    {progressPct}%
                  </span>
                </div>
                <div
                  className="w-full h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--card-bg)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPct}%`,
                      background:
                        'linear-gradient(90deg, var(--navy), var(--gold))',
                    }}
                  />
                </div>
                <p
                  className="text-sm mt-3"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {checkedLessons.size} of {lessonList.length} lessons completed
                </p>
              </div>

              {/* Certificate status */}
              <div
                className="rounded-2xl p-5 shadow-sm"
                style={{ backgroundColor: 'white' }}
              >
                <h3
                  className="font-bold mb-3 flex items-center gap-2"
                  style={{ color: 'var(--navy)' }}
                >
                  <Award size={18} style={{ color: 'var(--gold)' }} />
                  Certificate Status
                </h3>
                {alreadyCertified && existingCert ? (
                  <div className="space-y-3">
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ backgroundColor: 'var(--success)' }}
                    >
                      <span className="text-2xl">🎓</span>
                      <div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: 'var(--green)' }}
                        >
                          Certificate Earned!
                        </p>
                        <p className="text-xs" style={{ color: 'var(--green)' }}>
                          {existingCert.completionDate}
                        </p>
                      </div>
                    </div>
                    {existingBadge && (
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          backgroundColor: badgeLevelBg(existingBadge.level),
                          border: `1px solid ${badgeLevelBorder(existingBadge.level)}`,
                        }}
                      >
                        <span className="text-2xl">
                          {badgeIcon(existingBadge.level)}
                        </span>
                        <div>
                          <p
                            className="font-bold text-sm capitalize"
                            style={{
                              color: badgeLevelColor(existingBadge.level),
                            }}
                          >
                            {existingBadge.level} Badge
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            {existingBadge.skillName}
                          </p>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition hover:opacity-80"
                      style={{ backgroundColor: 'var(--navy)', color: 'white' }}
                    >
                      <Download size={15} /> Download Certificate
                    </button>
                  </div>
                ) : (
                  <div
                    className="p-4 rounded-xl text-center"
                    style={{ backgroundColor: 'var(--card-bg)' }}
                  >
                    <p className="text-3xl mb-2">🏆</p>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: 'var(--navy)' }}
                    >
                      Complete all lessons to earn your certificate
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {lessonList.length - checkedLessons.size} lessons remaining
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Certificate Modal ── */}
      {showModal && earnedCert && earnedBadge && (
        <CertificateModal
          certificate={earnedCert}
          badge={earnedBadge}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
