import { Search, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import { useState, useMemo } from 'react';
import { SKILLS_DATABASE, SKILL_CATEGORIES } from '../../utils/skillsDatabase';

export default function SkillsLibrary() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    let result = SKILLS_DATABASE;
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const featured = SKILLS_DATABASE[0];

  return (
    <div className="min-h-screen space-y-8" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="px-6 py-8">
        <h1 className="mb-6" style={{ color: 'var(--navy)' }}>
          {t('whatToLearn')}
        </h1>

        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={20}
              style={{ color: 'var(--muted-foreground)' }}
            />
            <input
              type="text"
              placeholder={t('searchSkills')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:border-[var(--navy)]"
              style={{ backgroundColor: 'white', borderColor: 'var(--border)' }}
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-8 pb-2 -mx-6 px-6">
          {['All', ...SKILL_CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-2 rounded-full whitespace-nowrap transition-all"
              style={{
                backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'white',
                color: selectedCategory === cat ? 'white' : 'var(--charcoal)',
                border: selectedCategory === cat ? 'none' : '1px solid var(--border)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {featured && (
          <section className="mb-8">
            <button
              type="button"
              onClick={() => navigate(`/skill/${featured.id}`)}
              className="w-full rounded-2xl overflow-hidden transition-all hover:shadow-lg text-left"
              style={{ backgroundColor: 'white' }}
            >
              <div className="h-48 flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, #D4A017 100%)'
              }}>
                <div className="text-8xl">{featured.emoji}</div>
              </div>

              <div className="p-6">
                <h2 className="mb-2" style={{ color: 'var(--navy)' }}>
                  {featured.name}
                </h2>
                <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  {featured.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                  <span className="px-3 py-1 rounded-full" style={{
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--navy)'
                  }}>
                    {featured.difficulty}
                  </span>
                  <span style={{ color: 'var(--muted-foreground)' }}>·</span>
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    {featured.lessons} {t('lessonsLabel')}
                  </span>
                  {featured.hasPDF && (
                    <>
                      <span style={{ color: 'var(--muted-foreground)' }}>·</span>
                      <span style={{ color: 'var(--secondary)' }}>PDF</span>
                    </>
                  )}
                  {featured.hasVideo && (
                    <>
                      <span style={{ color: 'var(--muted-foreground)' }}>·</span>
                      <span style={{ color: 'var(--secondary)' }}>Video</span>
                    </>
                  )}
                </div>

                <div
                  className="w-full py-3 rounded-xl transition-all hover:opacity-90 font-medium text-center pointer-events-none"
                  style={{ backgroundColor: 'var(--gold)', color: 'var(--navy)' }}
                >
                  {t('startLearning')}
                </div>
              </div>
            </button>
          </section>
        )}

        <section>
          <h2 className="mb-4" style={{ color: 'var(--navy)' }}>
            {t('allSkills')}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {filteredSkills.map(skill => (
              <button
                key={skill.id}
                type="button"
                onClick={() => navigate(`/skill/${skill.id}`)}
                className="rounded-xl p-4 flex flex-col transition-all hover:shadow-lg text-left"
                style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
              >
                <div className="text-5xl mb-3">{skill.emoji}</div>

                <h3 className="mb-2" style={{ color: 'var(--navy)' }}>
                  {skill.name}
                </h3>

                <p className="text-sm mb-3 flex-1" style={{ color: 'var(--muted-foreground)' }}>
                  {skill.description}
                </p>

                <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  <span>{skill.lessons} lessons</span>
                  <span>·</span>
                  <span style={{ backgroundColor: 'var(--card-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                    {skill.difficulty}
                  </span>
                </div>

                <div
                  className="w-full py-2 rounded-lg transition-all hover:opacity-90 font-medium text-center cursor-pointer"
                  style={{ backgroundColor: 'var(--secondary)', color: 'white' }}
                >
                  {t('enrol')}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
