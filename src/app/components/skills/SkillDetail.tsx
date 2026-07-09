import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  DollarSign,
  CheckCircle,
  Circle,
  Award,
  ExternalLink,
  Play,
  FileText,
  Wrench,
  ShoppingBag,
  Star,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useCertificate } from '../../context/CertificateContext';
import { SKILLS_DATABASE } from '../../utils/skillsDatabase';
import {
  PASSING_SCORE,
  generateCourseLessons,
  readLessonProgress,
  writeLessonProgress,
} from '../../utils/learningContent';
import CertificateModal from '../certificates/CertificateModal';
import { EmptyState, GlyphTile } from '../ui/product-ui';
import type { Certificate, Badge } from '../../context/CertificateContext';

const NAVY = '#0F2C1A';
const GOLD = '#AD7E00';
const GREEN = '#1F5C2E';

function getBadgeLevelForSkill(skillId: number): Badge['level'] {
  if (skillId >= 37) return 'gold';
  if (skillId >= 19) return 'silver';
  return 'bronze';
}

function getDifficultyStyle(d: string) {
  if (d === 'Beginner') return { bg: '#ECFDF5', text: '#065F46', dot: '#10B981' };
  if (d === 'Intermediate') return { bg: '#FFFBEB', text: '#92400E', dot: '#F59E0B' };
  return { bg: '#FEF2F2', text: '#991B1B', dot: '#EF4444' };
}

export default function SkillDetail() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const { awardCertificate, hasCertificate, certificates, badges } = useCertificate();

  const skill = SKILLS_DATABASE.find((s) => s.id === Number(skillId));
  const lessons = useMemo(() => (skill ? generateCourseLessons(skill) : []), [skill]);

  const [completedLessons, setCompletedLessons] = useState<Set<number>>(() => new Set(readLessonProgress(skillId ?? '').completedLessonIds));
  const [quizScores, setQuizScores] = useState<Record<number, number>>(() => readLessonProgress(skillId ?? '').quizScores);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean } | null>(null);

  const [activeCert, setActiveCert] = useState<{ cert: Certificate; badge: Badge } | null>(null);

  if (!skill) {
    return (
      <EmptyState
        title="Skill not found"
        description="This lesson is not available right now. Return to the skills library to keep learning."
        action={
          <button onClick={() => navigate('/learn')} className="app-primary-btn">
            Back to Skills Library
          </button>
        }
      />
    );
  }

  const diff = getDifficultyStyle(skill.difficulty);
  const progress = lessons.length > 0 ? Math.round((completedLessons.size / lessons.length) * 100) : 0;
  const alreadyCertified = hasCertificate(skill.id);
  const allDone = completedLessons.size === lessons.length;
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];
  const nextRequiredLesson = lessons.find((lesson) => !completedLessons.has(lesson.id))?.id ?? lessons[0]?.id ?? 1;

  const saveProgress = (nextCompleted: Set<number>, nextScores = quizScores) => {
    if (!skillId) return;
    writeLessonProgress(skillId, {
      completedLessonIds: [...nextCompleted],
      quizScores: nextScores,
    });
  };

  const completeLesson = (id: number, score: number) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(id);
      const nextScores = { ...quizScores, [id]: Math.max(score, quizScores[id] ?? 0) };
      setQuizScores(nextScores);
      saveProgress(next, nextScores);
      return next;
    });
  };

  const openLesson = (id: number) => {
    const previousComplete = id === 1 || completedLessons.has(id - 1);
    if (!previousComplete && !completedLessons.has(id)) return;
    setActiveLessonId(id);
    setAnswers({});
    setQuizResult(null);
  };

  const submitQuiz = () => {
    if (!activeLesson) return;
    const score = activeLesson.quiz.reduce((total, question) => {
      return total + (answers[question.id] === question.answerIndex ? 1 : 0);
    }, 0);
    const passed = score >= PASSING_SCORE;
    setQuizResult({ score, passed });

    if (passed) {
      completeLesson(activeLesson.id, score);
      const nextLesson = lessons.find((lesson) => lesson.id > activeLesson.id && !completedLessons.has(lesson.id));
      if (nextLesson) {
        window.setTimeout(() => {
          setActiveLessonId(nextLesson.id);
          setAnswers({});
          setQuizResult(null);
        }, 700);
      }
    }
  };

  const handleComplete = () => {
    const userName = userProfile?.firstName || 'Learner';
    const cert = awardCertificate(skill.id, skill.name, skill.emoji, userName);
    // Build badge locally so we never read from stale async state
    const earnedBadge: Badge = {
      id: `badge-${skill.id}-${Date.now()}`,
      skillId: skill.id,
      skillName: skill.name,
      emoji: skill.emoji,
      level: getBadgeLevelForSkill(skill.id),
      earnedAt: new Date().toISOString(),
    };
    setActiveCert({ cert, badge: earnedBadge });
  };

  const showExistingCert = () => {
    const cert = certificates.find((c) => c.skillId === skill.id);
    const badgeInCtx = badges.find((b) => b.skillId === skill.id);
    if (cert && badgeInCtx) setActiveCert({ cert, badge: badgeInCtx });
  };

  return (
    <div className="max-w-screen-xl space-y-6">
      {/* Back + breadcrumb */}
      <button
        onClick={() => navigate('/learn')}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Skills Library
      </button>

      {/* Hero header */}
      <div
        className="rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #001F40 100%)` }}
      >
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10" style={{ backgroundColor: GOLD }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div
            className="h-20 w-20 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 border-2 border-white/20"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            {skill.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: diff.bg, color: diff.text }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: diff.dot }} />
                {skill.difficulty}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-white/10 text-white">
                {skill.category}
              </span>
              {alreadyCertified && (
                <span
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer"
                  style={{ backgroundColor: GOLD, color: '#fff' }}
                  onClick={showExistingCert}
                >
                  <Award size={12} /> Certified
                </span>
              )}
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{skill.name}</h1>
            <p className="text-slate-300 text-sm mb-4 max-w-2xl">{skill.description}</p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} /> {skill.lessons} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {skill.timeToLearn}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign size={14} /> {skill.startupCost} startup cost
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} fill={GOLD} stroke={GOLD} /> 4.{5 + (skill.id % 5)} rating
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div
              className="relative h-20 w-20 rounded-full flex items-center justify-center"
              style={{ background: `conic-gradient(${GOLD} ${progress * 3.6}deg, rgba(255,255,255,0.15) 0deg)` }}
            >
              <div className="h-14 w-14 rounded-full bg-[#001F40] flex items-center justify-center flex-col">
                <span className="text-lg font-bold text-white">{progress}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-300">Progress</p>
          </div>
        </div>
      </div>

      {/* Main content 2-col */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Lessons list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-semibold text-slate-900">Course Sessions</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {completedLessons.size} of {lessons.length} completed. Pass each quiz with {PASSING_SCORE}/10 to continue.
                </p>
              </div>
              {allDone && !alreadyCertified && (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GREEN }}
                >
                  <Award size={15} />
                  Claim Certificate
                </button>
              )}
              {alreadyCertified && (
                <button
                  onClick={showExistingCert}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: GOLD }}
                >
                  <Award size={15} />
                  View Certificate
                </button>
              )}
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progress === 100 ? GREEN : NAVY,
                }}
              />
            </div>
          </div>

          {/* Active lesson */}
          {activeLesson && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-100 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Lesson {activeLesson.id}</p>
                    <h2 className="mt-1 text-lg font-bold text-slate-900">{activeLesson.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{activeLesson.overview}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-600">
                    {activeLesson.type === 'video' ? <Play size={12} /> : <FileText size={12} />}
                    {activeLesson.type}
                  </span>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900">Step by step</h3>
                  <ol className="mt-3 space-y-3">
                    {activeLesson.steps.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm leading-6 text-slate-600">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E3F6E8] text-xs font-bold text-[#1F5C2E]">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 rounded-xl border border-[#BFCDBA] bg-[#F0FDF4] p-4">
                    <p className="text-sm font-bold text-slate-900">Practical task</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{activeLesson.practiceTask}</p>
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Extra tutorial source</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {activeLesson.resource.source} / {activeLesson.resource.title}
                        </p>
                      </div>
                      <a
                        href={activeLesson.resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="app-secondary-btn px-3 py-2 text-xs"
                      >
                        Open <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-5 lg:border-l lg:border-t-0">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Quiz</h3>
                      <p className="text-xs text-slate-500">Answer all 10 questions.</p>
                    </div>
                    {quizScores[activeLesson.id] && (
                      <span className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-xs font-bold text-[#065F46]">
                        Best {quizScores[activeLesson.id]}/10
                      </span>
                    )}
                  </div>

                  <div className="max-h-[520px] space-y-4 overflow-y-auto pr-1">
                    {activeLesson.quiz.map((question) => (
                      <fieldset key={question.id} className="rounded-xl border border-slate-200 p-3">
                        <legend className="px-1 text-xs font-bold text-slate-800">
                          {question.id}. {question.question}
                        </legend>
                        <div className="mt-2 space-y-1.5">
                          {question.options.map((option, optionIndex) => (
                            <label
                              key={option}
                              className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                            >
                              <input
                                type="radio"
                                name={`lesson-${activeLesson.id}-question-${question.id}`}
                                checked={answers[question.id] === optionIndex}
                                onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }))}
                                className="mt-0.5"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    ))}
                  </div>

                  {quizResult && (
                    <div
                      className="mt-4 rounded-xl p-3 text-sm"
                      style={{
                        backgroundColor: quizResult.passed ? '#ECFDF5' : '#FEF2F2',
                        color: quizResult.passed ? '#065F46' : '#991B1B',
                      }}
                    >
                      {quizResult.passed
                        ? `Passed with ${quizResult.score}/10. The next lesson is unlocked.`
                        : `You scored ${quizResult.score}/10. Read the lesson again, do the task, then retake the quiz.`}
                    </div>
                  )}

                  <button
                    onClick={submitQuiz}
                    disabled={Object.keys(answers).length < activeLesson.quiz.length}
                    className="app-primary-btn mt-4 w-full"
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lesson list */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-50">
              {lessons.map((lesson) => {
                const done = completedLessons.has(lesson.id);
                const locked = lesson.id > 1 && !completedLessons.has(lesson.id - 1) && !done;
                const active = lesson.id === activeLessonId;
                return (
                  <div
                    key={lesson.id}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors ${locked ? 'cursor-not-allowed opacity-55' : 'cursor-pointer hover:bg-slate-50/60'} ${active ? 'bg-[#F0FDF4]' : ''}`}
                    onClick={() => openLesson(lesson.id)}
                  >
                    <button
                      className="flex-shrink-0 transition-transform hover:scale-110"
                      onClick={(e) => { e.stopPropagation(); openLesson(lesson.id); }}
                      aria-label={done ? 'Completed' : locked ? 'Locked' : 'Open lesson'}
                      disabled={locked}
                    >
                      {done ? (
                        <CheckCircle size={22} style={{ color: GREEN }} fill={GREEN} />
                      ) : (
                        <Circle size={22} className="text-slate-300" />
                      )}
                    </button>
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: done ? '#ECFDF5' : '#EEF2FF' }}
                    >
                      {lesson.type === 'video' ? (
                        <Play size={14} style={{ color: done ? GREEN : '#4F46E5' }} />
                      ) : (
                        <FileText size={14} style={{ color: done ? GREEN : '#4F46E5' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium truncate ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}
                      >
                        Lesson {lesson.id}: {lesson.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock size={11} /> {lesson.duration}
                        <span className="mx-1">/</span>
                        <span className="capitalize">{lesson.type}</span>
                      </p>
                    </div>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                      style={
                        done
                          ? { backgroundColor: '#ECFDF5', color: '#065F46' }
                          : locked
                            ? { backgroundColor: '#F8FAFC', color: '#94A3B8' }
                            : { backgroundColor: '#F1F5F9', color: '#64748B' }
                      }
                    >
                      {done ? 'Done' : locked ? 'Locked' : lesson.id === nextRequiredLesson ? 'Next' : `${lesson.duration}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complete button below list when all done */}
          {allDone && !alreadyCertified && (
            <div
              className="rounded-2xl p-6 text-center border-2"
              style={{ borderColor: GREEN, backgroundColor: '#F0FDF4' }}
            >
              <Award size={28} className="mx-auto mb-3" style={{ color: GREEN }} />
              <h3 className="font-bold text-slate-900 mb-1">You've completed all lessons!</h3>
              <p className="text-sm text-slate-500 mb-4">
                Claim your certificate and badge to prove your expertise.
              </p>
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white mx-auto transition-opacity hover:opacity-90"
                style={{ backgroundColor: GREEN }}
              >
                <Award size={16} />
                Claim Certificate & Badge
              </button>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Quick start */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Quick Start</h3>
            </div>
            <div className="p-4 space-y-2.5">
              <button
                onClick={() => openLesson(nextRequiredLesson)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                <Zap size={15} />
                {completedLessons.size > 0 ? 'Continue Next Lesson' : 'Start First Lesson'}
                <ChevronRight size={14} className="ml-auto" />
              </button>
              {alreadyCertified && (
                <button
                  onClick={showExistingCert}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold border-2 transition-colors hover:bg-slate-50"
                  style={{ borderColor: GOLD, color: GOLD }}
                >
                  <Award size={15} />
                  View My Certificate
                  <ChevronRight size={14} className="ml-auto" />
                </button>
              )}
            </div>
          </div>

          {/* Skill info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="font-semibold text-slate-900">Skill Details</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Difficulty', value: skill.difficulty, color: diff.text, bg: diff.bg },
                { label: 'Startup Cost', value: skill.startupCost, color: GOLD, bg: '#FFFBEB' },
                { label: 'Income Level', value: skill.incomeLevel, color: GREEN, bg: '#ECFDF5' },
                { label: 'Duration', value: skill.timeToLearn, color: NAVY, bg: '#EEF2FF' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg p-3" style={{ backgroundColor: item.bg }}>
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="text-sm font-bold" style={{ color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wrench size={15} style={{ color: NAVY }} />
              <h3 className="font-semibold text-slate-900 text-sm">Tools You'll Need</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-600"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag size={15} style={{ color: GREEN }} />
              <h3 className="font-semibold text-slate-900 text-sm">Materials</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.materials.map((m) => (
                <span
                  key={m}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ backgroundColor: '#ECFDF5', color: '#065F46' }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* What you earn */}
          <div
            className="rounded-xl p-5 text-white"
            style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #0F3D1E 100%)` }}
          >
            <h3 className="font-semibold text-sm mb-3">After Completion</h3>
            <div className="space-y-2 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-300 flex-shrink-0" />
                Digital certificate of completion
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-300 flex-shrink-0" />
                Skill badge for your profile
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-300 flex-shrink-0" />
                List your products in the Marketplace
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-300 flex-shrink-0" />
                {skill.incomeLevel} income potential
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate modal */}
      {activeCert && (
        <CertificateModal
          certificate={activeCert.cert}
          badge={activeCert.badge}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
}
