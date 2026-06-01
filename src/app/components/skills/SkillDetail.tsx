import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Download, Play, FileText, Smartphone } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { SKILLS_DATABASE } from '../../utils/skillsDatabase';
import { SkillContent, getSkillContent, downloadContent, saveDownloadedSkill } from '../../utils/contentManagement';

export default function SkillDetail() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { t } = useLocale();
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const skill = SKILLS_DATABASE.find(s => s.id === Number(skillId));
  const contents = getSkillContent(Number(skillId));

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t('notFound') || 'Skill not found'}</p>
      </div>
    );
  }

  const handleDownload = (content: SkillContent) => {
    const downloadedContent = downloadContent(content);
    saveDownloadedSkill(downloadedContent);
    setDownloaded(prev => new Set([...prev, content.url]));
  };

  return (
    <div className="min-h-screen space-y-8" style={{ backgroundColor: 'var(--off-white)' }}>
      <div className="px-6 py-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6"
          style={{ color: 'var(--primary)' }}
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <div className="text-6xl mb-4">{skill.emoji}</div>
          <h1 className="text-4xl mb-3" style={{ color: 'var(--primary)' }}>
            {skill.name}
          </h1>
          <p className="text-lg mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {skill.description}
          </p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'white' }}>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Difficulty</p>
              <p className="font-bold" style={{ color: 'var(--primary)' }}>{skill.difficulty}</p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'white' }}>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Startup Cost</p>
              <p className="font-bold" style={{ color: 'var(--secondary)' }}>{skill.startupCost}</p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'white' }}>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Income Level</p>
              <p className="font-bold" style={{ color: 'var(--green)' }}>{skill.incomeLevel}</p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'white' }}>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Learn in</p>
              <p className="font-bold" style={{ color: 'var(--navy)' }}>{skill.timeToLearn}</p>
            </div>
          </div>

          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: 'white' }}>
            <h3 className="font-bold mb-3" style={{ color: 'var(--primary)' }}>Tools You'll Need:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skill.tools.map((tool, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--charcoal)' }}>
                  {tool}
                </span>
              ))}
            </div>
            <h3 className="font-bold mb-3" style={{ color: 'var(--primary)' }}>Materials:</h3>
            <div className="flex flex-wrap gap-2">
              {skill.materials.map((material, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--success)', color: 'var(--green)' }}>
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>

        {contents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              📚 Learning Resources
            </h2>
            <div className="space-y-4">
              {contents.map((content) => (
                <div key={content.url} className="rounded-lg p-6" style={{ backgroundColor: 'white', borderLeft: '4px solid var(--secondary)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {content.contentType === 'pdf' && <FileText size={24} style={{ color: 'var(--secondary)' }} />}
                      {content.contentType === 'video' && <Play size={24} style={{ color: 'var(--secondary)' }} />}
                      <div>
                        <h3 className="font-bold" style={{ color: 'var(--charcoal)' }}>{content.title}</h3>
                        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          {content.fileSize} {content.duration && `• ${content.duration}`}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(content)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:opacity-80"
                      style={{
                        backgroundColor: downloaded.has(content.url) ? 'var(--success)' : 'var(--secondary)',
                        color: 'white'
                      }}
                    >
                      <Download size={18} />
                      {downloaded.has(content.url) ? 'Downloaded' : 'Download'}
                    </button>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    {content.description}
                  </p>

                  {content.steps.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-bold mb-3" style={{ color: 'var(--primary)' }}>Steps Included:</p>
                      <div className="space-y-2">
                        {content.steps.slice(0, 3).map((step) => (
                          <div key={step.stepNumber} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--primary)' }}>
                              {step.stepNumber}
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: 'var(--charcoal)' }}>{step.title}</p>
                              {step.duration && <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>⏱️ {step.duration}</p>}
                            </div>
                          </div>
                        ))}
                        {content.steps.length > 3 && (
                          <p className="text-xs mt-2" style={{ color: 'var(--secondary)' }}>
                            + {content.steps.length - 3} more steps
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {content.isOfflineAvailable && (
                    <div className="mt-4 flex items-center gap-2 text-sm px-3 py-2 rounded" style={{ backgroundColor: 'var(--success)', color: 'var(--green)' }}>
                      <Smartphone size={16} />
                      <span>Available Offline</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {contents.length === 0 && (
          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: 'white' }}>
            <p className="text-lg mb-3" style={{ color: 'var(--muted-foreground)' }}>
              📚 Learning materials coming soon
            </p>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Check back soon for step-by-step guides and video tutorials
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate('/learn')}
          className="w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--secondary)', color: 'white' }}
        >
          Start Learning Now
        </button>
      </div>
    </div>
  );
}
