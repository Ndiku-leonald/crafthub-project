import type { Skill } from './skillsDatabase';

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
};

export type LearningResource = {
  title: string;
  url: string;
  source: string;
  type: 'guide' | 'manual' | 'video-guide';
};

export type CourseLesson = {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'text';
  duration: string;
  overview: string;
  steps: string[];
  practiceTask: string;
  quiz: QuizQuestion[];
  resource: LearningResource;
};

export type StoredLessonProgress = {
  completedLessonIds: number[];
  quizScores: Record<number, number>;
};

const DEFAULT_PROGRESS: StoredLessonProgress = {
  completedLessonIds: [],
  quizScores: {},
};

export const PASSING_SCORE = 8;
export const QUIZ_QUESTION_COUNT = 10;

const CATEGORY_RESOURCES: Record<string, LearningResource> = {
  Baking: {
    title: 'How to Make Bread From Scratch',
    url: 'https://www.instructables.com/How-to-Make-Bread-From-Scratch/',
    source: 'Instructables',
    type: 'guide',
  },
  Cooking: {
    title: 'Food preparation and kitchen practice collection',
    url: 'https://www.instructables.com/cooking/',
    source: 'Instructables',
    type: 'guide',
  },
  'Food Processing': {
    title: 'Food preservation and small processing guides',
    url: 'https://www.instructables.com/cooking/',
    source: 'Instructables',
    type: 'guide',
  },
  Tailoring: {
    title: 'How to Sew',
    url: 'https://www.instructables.com/How-to-Sew./',
    source: 'Instructables',
    type: 'guide',
  },
  Textiles: {
    title: 'Screen Printing',
    url: 'https://www.instructables.com/Screen-Printing-3/',
    source: 'Instructables',
    type: 'guide',
  },
  Crafts: {
    title: 'Jewelry Making',
    url: 'https://www.instructables.com/Jewelry-Making-1/',
    source: 'Instructables',
    type: 'guide',
  },
  Agriculture: {
    title: 'Planting the vegetable garden',
    url: 'https://extension.umn.edu/planting-and-growing-guides/planting-vegetable-garden',
    source: 'University of Minnesota Extension',
    type: 'manual',
  },
  Beauty: {
    title: 'Hair Braiding for Absolute Beginners',
    url: 'https://www.instructables.com/How-to-Braid-Your-Own-Hair/',
    source: 'Instructables',
    type: 'guide',
  },
  Services: {
    title: 'Gadget Repair 101',
    url: 'https://www.instructables.com/Gadget-Repair-101/',
    source: 'Instructables',
    type: 'guide',
  },
};

const SKILL_RESOURCES: Record<string, LearningResource> = {
  'Bread Baking': CATEGORY_RESOURCES.Baking,
  'Hand Sewing': CATEGORY_RESOURCES.Tailoring,
  'Machine Tailoring': {
    title: 'Meet Your Sewing Machine',
    url: 'https://www.instructables.com/Meet-Your-Sewing-Machine/',
    source: 'Instructables',
    type: 'guide',
  },
  'Candle Making': {
    title: 'DIY Candles',
    url: 'https://www.instructables.com/DIY-Candles/',
    source: 'Instructables',
    type: 'guide',
  },
  'Jewelry Making': CATEGORY_RESOURCES.Crafts,
  'Screen Printing': CATEGORY_RESOURCES.Textiles,
  'Hair Braiding': CATEGORY_RESOURCES.Beauty,
  'Chicken Farming': {
    title: 'Successfully Raising a Small Flock of Laying Chickens',
    url: 'https://extension.psu.edu/successfully-raising-a-small-flock-of-laying-chickens/',
    source: 'Penn State Extension',
    type: 'manual',
  },
  Beekeeping: {
    title: 'Basic Beekeeping - Manual 1',
    url: 'https://www.fao.org/sustainable-food-value-chains/training-and-learning-center/details-materials/en/c/276700/',
    source: 'FAO',
    type: 'manual',
  },
  'Fish Farming': {
    title: 'Simple Methods for Aquaculture',
    url: 'https://www.fao.org/fishery/static/FAO_Training/FAO_Training/General/t0581e/Index.htm',
    source: 'FAO',
    type: 'manual',
  },
  'Phone Repair': {
    title: 'Gadget Repair 101',
    url: 'https://www.instructables.com/Gadget-Repair-101/',
    source: 'Instructables',
    type: 'guide',
  },
};

const LESSON_SEQUENCE = [
  'Safety, purpose, and expected outcome',
  'Tools and materials setup',
  'Preparing the work area',
  'Basic technique practice',
  'Quality checks and hygiene',
  'Common mistakes and fixes',
  'Small batch production',
  'Pricing and record keeping',
  'Customer presentation',
  'Final practical project',
  'Packaging and storage',
  'Troubleshooting in the field',
  'Improving speed without losing quality',
  'Selling locally',
  'Assessment and next steps',
];

function getResourceForSkill(skill: Skill): LearningResource {
  return SKILL_RESOURCES[skill.name] ?? CATEGORY_RESOURCES[skill.category] ?? CATEGORY_RESOURCES.Crafts;
}

function rotateOptions(options: string[], seed: number) {
  const offset = seed % options.length;
  const rotated = [...options.slice(offset), ...options.slice(0, offset)];
  return {
    options: rotated,
    answerIndex: rotated.indexOf(options[0]),
  };
}

function makeQuestion(id: number, seed: number, question: string, correct: string, wrong: string[]): QuizQuestion {
  const rotated = rotateOptions([correct, ...wrong], seed + id);
  return {
    id,
    question,
    options: rotated.options,
    answerIndex: rotated.answerIndex,
  };
}

function getPracticeVerb(category: string) {
  if (category === 'Baking' || category === 'Cooking' || category === 'Food Processing') return 'prepare a safe small batch';
  if (category === 'Agriculture') return 'set up a small demonstration plot or care plan';
  if (category === 'Tailoring' || category === 'Textiles') return 'make a neat sample piece';
  if (category === 'Beauty') return 'practice the technique on a willing model or mannequin';
  if (category === 'Services') return 'complete a mock customer job checklist';
  return 'make one simple sample product';
}

function buildLessonSteps(skill: Skill, lessonNumber: number): string[] {
  const mainTool = skill.tools[lessonNumber % skill.tools.length] ?? skill.tools[0] ?? 'basic tool';
  const mainMaterial = skill.materials[lessonNumber % skill.materials.length] ?? skill.materials[0] ?? 'material';

  return [
    `Confirm the goal of this ${skill.name} session and write down what a good result should look like.`,
    `Prepare ${mainTool} and keep your work area clean, dry, and safe before starting.`,
    `Measure or inspect ${mainMaterial} before use so you do not waste money or produce weak results.`,
    `Practice the core movement slowly three times, checking shape, texture, fit, or strength after each attempt.`,
    `Record one improvement you made and one mistake to avoid in the next session.`,
  ];
}

function buildQuiz(skill: Skill, lessonNumber: number): QuizQuestion[] {
  const tool = skill.tools[lessonNumber % skill.tools.length] ?? skill.tools[0] ?? 'tool';
  const material = skill.materials[lessonNumber % skill.materials.length] ?? skill.materials[0] ?? 'material';

  return [
    makeQuestion(1, skill.id + lessonNumber, `What should you do before starting ${skill.name}?`, 'Prepare tools, materials, and a clean work area', ['Start quickly to save time', 'Buy the most expensive equipment first', 'Skip measuring materials']),
    makeQuestion(2, skill.id + lessonNumber, `Which item belongs in this skill setup?`, tool, ['A television remote', 'A perfume bottle', 'A car tyre']),
    makeQuestion(3, skill.id + lessonNumber, `Which material should be checked before use?`, material, ['Dust from the floor', 'Unknown chemical waste', 'Old packaging only']),
    makeQuestion(4, skill.id + lessonNumber, 'Why should a learner make small batches first?', 'To practice safely and reduce waste', ['To avoid learning quality standards', 'To hide mistakes from customers', 'To finish without checking results']),
    makeQuestion(5, skill.id + lessonNumber, 'What is the best response when the result is poor?', 'Find the cause, adjust, and try again', ['Sell it immediately', 'Blame the customer', 'Stop recording progress']),
    makeQuestion(6, skill.id + lessonNumber, `What does good ${skill.name} practice require?`, 'Patience, hygiene, and consistent checks', ['Guessing only', 'No cleaning', 'Ignoring safety']),
    makeQuestion(7, skill.id + lessonNumber, 'When should pricing be considered?', 'After calculating materials, time, and quality', ['Before knowing costs', 'Only after losing money', 'Never']),
    makeQuestion(8, skill.id + lessonNumber, 'What proves a lesson has been understood?', 'A completed practice task and a passed quiz', ['Opening the lesson once', 'Skipping the task', 'Guessing every answer']),
    makeQuestion(9, skill.id + lessonNumber, 'What should be written in the learner notebook?', 'Materials used, time taken, result, and next improvement', ['Only jokes', 'Nothing', 'Customer secrets']),
    makeQuestion(10, skill.id + lessonNumber, 'What should happen before serving or selling a product/service?', 'Check safety, quality, and customer readiness', ['Ignore defects', 'Hide the process', 'Avoid feedback']),
  ];
}

export function generateCourseLessons(skill: Skill): CourseLesson[] {
  const resource = getResourceForSkill(skill);

  return Array.from({ length: skill.lessons }, (_, index) => {
    const id = index + 1;
    const topic = LESSON_SEQUENCE[index % LESSON_SEQUENCE.length];
    const type: CourseLesson['type'] = index % 3 === 0 && skill.hasVideo ? 'video' : skill.hasPDF ? 'pdf' : 'text';

    return {
      id,
      title: topic,
      type,
      duration: `${Math.floor(12 + (index * 6) % 28)} min`,
      overview: `In this session you learn ${topic.toLowerCase()} for ${skill.name}. The lesson is written for a first-time learner and uses the tools and materials already listed in Craft Hub.`,
      steps: buildLessonSteps(skill, id),
      practiceTask: `Go and try this now: ${getPracticeVerb(skill.category)} for ${skill.name}. Use a small amount of material, take a photo or note the result, then write one thing you would improve before serving a real customer.`,
      quiz: buildQuiz(skill, id),
      resource,
    };
  });
}

export function getProgressKey(skillId: number | string) {
  return `skill_progress_${skillId}`;
}

export function readLessonProgress(skillId: number | string): StoredLessonProgress {
  try {
    const stored = localStorage.getItem(getProgressKey(skillId));
    if (!stored) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return { completedLessonIds: parsed, quizScores: {} };
    }
    return {
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
      quizScores: parsed.quizScores ?? {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function writeLessonProgress(skillId: number | string, progress: StoredLessonProgress) {
  localStorage.setItem(getProgressKey(skillId), JSON.stringify(progress));
}

export function getAllLearningProgress(skills: Skill[]) {
  return skills
    .map((skill) => {
      const progress = readLessonProgress(skill.id);
      const completed = new Set(progress.completedLessonIds).size;
      return {
        skill,
        completed,
        total: skill.lessons,
        percent: skill.lessons > 0 ? Math.round((completed / skill.lessons) * 100) : 0,
      };
    })
    .filter((item) => item.completed > 0);
}
