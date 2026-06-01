import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, BookOpen, Layers, ChevronRight, Star, Clock, DollarSign, Zap } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { SKILLS_DATABASE, SKILL_CATEGORIES } from '../../utils/skillsDatabase';

const NAVY = '#003366';
const GOLD = '#B48C00';
const GREEN = '#1F5C2E';

function getDifficultyStyle(difficulty: string): { bg: string; text: string; dot: string } {
  switch (difficulty) {
    case 'Beginner':
      return { bg: '#ECFDF5', text: '#065F46', dot: '#10B981' };
    case 'Intermediate':
      return { bg: '#FFFBEB', text: '#92400E', dot: '#F59E0B' };
    case 'Advanced':
      return { bg: '#FEF2F2', text: '#991B1B', dot: '#EF4444' };
    default:
      return { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' };
  }
}

function getStartupCostColor(cost: string): string {
  switch (cost) {
    case 'Very Low':
      return GREEN;
    case 'Low':
      return GOLD;
    case 'Medium':
      return '#EA580C';
    default:
      return '#64748B';
  }
}

function getCategoryColor(category: string): { bg: string; text: string } {
  const colors: Record<string, { bg: string; text: string }> = {
    Baking: { bg: '#FEF9E7', text: '#B45309' },
    Cooking: { bg: '#FEF2F2', text: '#B91C1C' },
    'Food Processing': { bg: '#FFF7ED', text: '#C2410C' },
    Tailoring: { bg: '#EEF2FF', text: '#4338CA' },
    Textiles: { bg: '#F5F3FF', text: '#6D28D9' },
    Crafts: { bg: '#ECFDF5', text: '#065F46' },
    Agriculture: { bg: '#F0FDF4', text: '#15803D' },
    Beauty: { bg: '#FDF4FF', text: '#A21CAF' },
    Services: { bg: '#F0F9FF', text: '#0369A1' },
  };
  return colors[category] ?? { bg: '#F1F5F9', text: '#475569' };
}

export default function SkillsLibrary() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    let result = SKILLS_DATABASE;
    if (selectedCategory !== 'All') {
      result = result.filter((s) => s.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const featured = SKILLS_DATABASE[0];

  return (
    <div className="space-y-6 max-w-screen-2xl">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {t('whatToLearn') || 'Skills Library'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover vocational skills to learn, earn income, and build your future.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
            <BookOpen size={14} style={{ color: NAVY }} />
            <span className="text-xs font-semibold text-slate-700">
              {SKILLS_DATABASE.length} Total Skills
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
            <Layers size={14} style={{ color: GOLD }} />
            <span className="text-xs font-semibold text-slate-700">
              {SKILL_CATEGORIES.length} Categories
            </span>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={18}
        />
        <input
          type="text"
          placeholder={t('searchSkills') || 'Search skills by name, category, or description...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        {['All', ...SKILL_CATEGORIES].map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
              style={
                active
                  ? { backgroundColor: NAVY, color: '#fff', borderColor: NAVY }
                  : { backgroundColor: '#fff', color: '#475569', borderColor: '#e2e8f0' }
              }
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {SKILLS_DATABASE.filter((s) => s.category === cat).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Featured skill banner */}
      {!searchQuery && selectedCategory === 'All' && (
        <div
          className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/skill/${featured.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/skill/${featured.id}`)}
        >
          <div
            className="relative flex flex-col md:flex-row items-stretch"
            style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #D4A017 60%, #E8B730 100%)` }}
          >
            <div className="flex-1 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.15)', color: '#fff' }}
                >
                  Featured Skill
                </span>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#003366' }}
                >
                  {featured.difficulty}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: NAVY }}>
                {featured.name}
              </h2>
              <p className="text-sm mb-4 max-w-md" style={{ color: '#1a3a5c' }}>
                {featured.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm" style={{ color: '#1a3a5c' }}>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {featured.lessons} {t('lessonsLabel') || 'lessons'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {featured.timeToLearn}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign size={14} />
                  {featured.startupCost} startup cost
                </span>
                {featured.hasVideo && (
                  <span className="px-2 py-0.5 rounded-md bg-white/30 text-xs font-semibold">
                    Video
                  </span>
                )}
                {featured.hasPDF && (
                  <span className="px-2 py-0.5 rounded-md bg-white/30 text-xs font-semibold">
                    PDF
                  </span>
                )}
              </div>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: NAVY }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/skill/${featured.id}`);
                }}
              >
                <Zap size={15} />
                {t('startLearning') || 'Start Learning'}
                <ChevronRight size={15} />
              </button>
            </div>

            <div
              className="hidden md:flex items-center justify-center w-56 text-9xl flex-shrink-0"
              style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
            >
              {featured.emoji}
            </div>
          </div>
        </div>
      )}

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {filteredSkills.length === SKILLS_DATABASE.length
            ? `Showing all ${filteredSkills.length} skills`
            : `${filteredSkills.length} skill${filteredSkills.length !== 1 ? 's' : ''} found`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        {(searchQuery || selectedCategory !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Skills grid or empty state */}
      {filteredSkills.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-semibold text-slate-900 mb-2">No skills found</h3>
          <p className="text-sm text-slate-500 mb-5">
            Try adjusting your search or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const diff = getDifficultyStyle(skill.difficulty);
            const cat = getCategoryColor(skill.category);
            return (
              <div
                key={skill.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
                onClick={() => navigate(`/skill/${skill.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/skill/${skill.id}`)}
              >
                <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border border-slate-100"
                    style={{ backgroundColor: cat.bg }}
                  >
                    {skill.emoji}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: diff.bg, color: diff.text }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: diff.dot }}
                      />
                      {skill.difficulty}
                    </span>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: cat.bg, color: cat.text }}
                    >
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <h3 className="font-semibold text-slate-900 text-base mb-1 group-hover:text-[#003366] transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} />
                      {skill.lessons} lessons
                    </span>
                    <span className="text-slate-200">|</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {skill.timeToLearn}
                    </span>
                    <span className="text-slate-200">|</span>
                    <span
                      className="flex items-center gap-1 font-semibold"
                      style={{ color: getStartupCostColor(skill.startupCost) }}
                    >
                      <DollarSign size={11} />
                      {skill.startupCost}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-4">
                    {skill.hasVideo && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                        Video
                      </span>
                    )}
                    {skill.hasPDF && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                        PDF
                      </span>
                    )}
                    <span className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold ml-auto">
                      <Star size={11} fill="#F59E0B" />
                      4.{Math.min(9, 5 + (skill.id % 5))}
                    </span>
                  </div>

                  <button
                    className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: NAVY }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/skill/${skill.id}`);
                    }}
                  >
                    {t('enrol') || 'Enrol Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
