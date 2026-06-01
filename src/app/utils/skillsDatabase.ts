// CraftHub Skills Database - 50+ Low-Capital Vocational Skills
// Each skill includes difficulty, setup cost, income potential, and resource requirements

export interface Skill {
  id: number;
  name: string;
  emoji: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  startupCost: 'Very Low' | 'Low' | 'Medium';
  incomeLevel: 'Low' | 'Medium' | 'High';
  lessons: number;
  description: string;
  hasVideo: boolean;
  hasPDF: boolean;
  tools: string[];
  materials: string[];
  timeToLearn: string;
}

export const SKILLS_DATABASE: Skill[] = [
  // Baking & Cooking
  { id: 1, name: 'Bread Baking', emoji: '🍞', category: 'Baking', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 8, description: 'Learn to bake fresh bread daily', hasVideo: true, hasPDF: true, tools: ['Oven', 'Mixing bowl', 'Measuring cups'], materials: ['Flour', 'Yeast', 'Salt'], timeToLearn: '1 week' },
  { id: 2, name: 'Pastry Making', emoji: '🥐', category: 'Baking', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 12, description: 'Create delicious pastries and donuts', hasVideo: true, hasPDF: true, tools: ['Rolling pin', 'Pastry cutter', 'Oven'], materials: ['Flour', 'Butter', 'Eggs'], timeToLearn: '2 weeks' },
  { id: 3, name: 'Cake Decoration', emoji: '🎂', category: 'Baking', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 10, description: 'Master cake decorating techniques', hasVideo: true, hasPDF: true, tools: ['Piping bags', 'Decorating tips', 'Turntable'], materials: ['Frosting', 'Food coloring', 'Fondant'], timeToLearn: '10 days' },
  { id: 4, name: 'Cooking Local Dishes', emoji: '🍲', category: 'Cooking', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Medium', lessons: 6, description: 'Cook traditional meals for catering', hasVideo: true, hasPDF: true, tools: ['Cooking pots', 'Stove'], materials: ['Local vegetables', 'Grains', 'Spices'], timeToLearn: '1 week' },
  { id: 5, name: 'Juice & Smoothie Making', emoji: '🧃', category: 'Cooking', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'Medium', lessons: 5, description: 'Make fresh juices and smoothies', hasVideo: true, hasPDF: true, tools: ['Blender', 'Juicer', 'Bottles'], materials: ['Fruits', 'Vegetables', 'Yogurt'], timeToLearn: '3 days' },
  { id: 6, name: 'Soy Products', emoji: '🥛', category: 'Cooking', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 8, description: 'Make soy milk, tofu and soy products', hasVideo: true, hasPDF: true, tools: ['Large pot', 'Sieve', 'Cloth'], materials: ['Soybeans', 'Water', 'Coagulant'], timeToLearn: '1 week' },
  { id: 7, name: 'Fish Smoking', emoji: '🐟', category: 'Food Processing', difficulty: 'Beginner', startupCost: 'Medium', incomeLevel: 'High', lessons: 7, description: 'Smoke and preserve fish', hasVideo: true, hasPDF: true, tools: ['Smoking chamber', 'Thermometer'], materials: ['Fresh fish', 'Wood', 'Salt'], timeToLearn: '2 weeks' },
  { id: 8, name: 'Fruit Processing', emoji: '🍍', category: 'Food Processing', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'Medium', lessons: 9, description: 'Make jams, fruit leather, dried fruits', hasVideo: true, hasPDF: true, tools: ['Pots', 'Blender', 'Drying racks'], materials: ['Fruits', 'Sugar', 'Containers'], timeToLearn: '1 week' },
  
  // Textiles & Clothing
  { id: 9, name: 'Hand Sewing', emoji: '🪡', category: 'Tailoring', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Low', lessons: 6, description: 'Basic hand sewing techniques', hasVideo: true, hasPDF: true, tools: ['Needles', 'Thread', 'Scissors'], materials: ['Fabric'], timeToLearn: '1 week' },
  { id: 10, name: 'Machine Tailoring', emoji: '🧵', category: 'Tailoring', difficulty: 'Intermediate', startupCost: 'Medium', incomeLevel: 'High', lessons: 15, description: 'Use sewing machine for clothing', hasVideo: true, hasPDF: true, tools: ['Sewing machine', 'Measuring tape', 'Pattern paper'], materials: ['Fabric', 'Thread', 'Buttons'], timeToLearn: '3 weeks' },
  { id: 11, name: 'Dress Making', emoji: '👗', category: 'Tailoring', difficulty: 'Advanced', startupCost: 'Medium', incomeLevel: 'High', lessons: 20, description: 'Design and make custom dresses', hasVideo: true, hasPDF: true, tools: ['Sewing machine', 'Dress forms', 'Scissors'], materials: ['Various fabrics', 'Trimmings'], timeToLearn: '4 weeks' },
  { id: 12, name: 'Batik Printing', emoji: '🎨', category: 'Textiles', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 8, description: 'Create beautiful batik designs on fabric', hasVideo: true, hasPDF: true, tools: ['Wax', 'Dye pot', 'Fabric'], materials: ['Fabric', 'Wax', 'Dyes'], timeToLearn: '1 week' },
  { id: 13, name: 'Screen Printing', emoji: '🖨️', category: 'Textiles', difficulty: 'Intermediate', startupCost: 'Medium', incomeLevel: 'High', lessons: 12, description: 'Print designs on t-shirts and fabric', hasVideo: true, hasPDF: true, tools: ['Screen', 'Squeegee', 'Ink'], materials: ['Screen mesh', 'Ink', 'Fabric'], timeToLearn: '2 weeks' },
  { id: 14, name: 'Embroidery', emoji: '🧂', category: 'Textiles', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'Medium', lessons: 10, description: 'Hand embroider beautiful designs', hasVideo: true, hasPDF: true, tools: ['Needles', 'Thread', 'Hoop'], materials: ['Thread', 'Fabric'], timeToLearn: '2 weeks' },
  { id: 15, name: 'Weaving', emoji: '🧺', category: 'Textiles', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 14, description: 'Weave baskets and fabric', hasVideo: true, hasPDF: true, tools: ['Loom', 'Shuttles', 'Comb'], materials: ['Yarn', 'Cotton', 'Raffia'], timeToLearn: '3 weeks' },
  
  // Crafts & Decorations
  { id: 16, name: 'Soap Making', emoji: '🧼', category: 'Crafts', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 8, description: 'Make natural soaps from scratch', hasVideo: true, hasPDF: true, tools: ['Pots', 'Mold', 'Thermometer'], materials: ['Oils', 'Lye', 'Fragrance'], timeToLearn: '1 week' },
  { id: 17, name: 'Candle Making', emoji: '🕯️', category: 'Crafts', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 7, description: 'Create decorative scented candles', hasVideo: true, hasPDF: true, tools: ['Wax', 'Mold', 'Wick', 'Pot'], materials: ['Wax', 'Wick', 'Fragrance', 'Dye'], timeToLearn: '1 week' },
  { id: 18, name: 'Jewelry Making', emoji: '💎', category: 'Crafts', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 12, description: 'Create beaded jewelry', hasVideo: true, hasPDF: true, tools: ['Pliers', 'Beads', 'Wire', 'String'], materials: ['Beads', 'Wire', 'String', 'Clasps'], timeToLearn: '2 weeks' },
  { id: 19, name: 'Clay & Pottery', emoji: '🏺', category: 'Crafts', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'Medium', lessons: 14, description: 'Create pottery and ceramic items', hasVideo: true, hasPDF: true, tools: ['Potter\'s wheel', 'Clay tools', 'Kiln'], materials: ['Clay', 'Glaze'], timeToLearn: '3 weeks' },
  { id: 20, name: 'Paper Crafts', emoji: '📄', category: 'Crafts', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Low', lessons: 8, description: 'Make cards, decorations, gift items', hasVideo: true, hasPDF: true, tools: ['Scissors', 'Glue', 'Markers'], materials: ['Paper', 'Cardstock', 'Decorations'], timeToLearn: '1 week' },
  { id: 21, name: 'Woodcarving', emoji: '🪵', category: 'Crafts', difficulty: 'Intermediate', startupCost: 'Medium', incomeLevel: 'High', lessons: 16, description: 'Carve beautiful wooden designs', hasVideo: true, hasPDF: true, tools: ['Chisels', 'Knives', 'Mallets', 'Sandpaper'], materials: ['Wood', 'Finishes'], timeToLearn: '4 weeks' },
  { id: 22, name: 'Basket Weaving', emoji: '🧤', category: 'Crafts', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'High', lessons: 10, description: 'Weave traditional baskets', hasVideo: true, hasPDF: true, tools: ['Reeds', 'Basket forms'], materials: ['Reed', 'Raffia', 'Cane'], timeToLearn: '2 weeks' },
  { id: 23, name: 'Beadwork', emoji: '✨', category: 'Crafts', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 11, description: 'Create intricate beadwork designs', hasVideo: true, hasPDF: true, tools: ['Beads', 'String', 'Needle'], materials: ['Beads', 'String', 'Wire'], timeToLearn: '2 weeks' },
  
  // Agriculture & Plants
  { id: 24, name: 'Mushroom Growing', emoji: '🍄', category: 'Agriculture', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 9, description: 'Grow mushrooms indoors', hasVideo: true, hasPDF: true, tools: ['Containers', 'Substrate', 'Spray bottle'], materials: ['Spawn', 'Compost'], timeToLearn: '2 weeks' },
  { id: 25, name: 'Herb Growing', emoji: '🌿', category: 'Agriculture', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Medium', lessons: 7, description: 'Grow medicinal and cooking herbs', hasVideo: true, hasPDF: true, tools: ['Pots', 'Soil', 'Seeds'], materials: ['Potting soil', 'Seeds'], timeToLearn: '1 week' },
  { id: 26, name: 'Vegetable Gardening', emoji: '🥬', category: 'Agriculture', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'Medium', lessons: 10, description: 'Grow vegetables year-round', hasVideo: true, hasPDF: true, tools: ['Tools', 'Seeds', 'Compost'], materials: ['Soil', 'Seeds', 'Water'], timeToLearn: '2 weeks' },
  { id: 27, name: 'Fruit Tree Farming', emoji: '🌳', category: 'Agriculture', difficulty: 'Intermediate', startupCost: 'Medium', incomeLevel: 'High', lessons: 12, description: 'Plant and care for fruit trees', hasVideo: true, hasPDF: true, tools: ['Shovel', 'Seedlings'], materials: ['Saplings', 'Compost'], timeToLearn: '3 weeks' },
  
  // Hair & Beauty
  { id: 28, name: 'Hair Braiding', emoji: '💇‍♀️', category: 'Beauty', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'High', lessons: 10, description: 'Learn different braiding styles', hasVideo: true, hasPDF: true, tools: ['Comb', 'Clips', 'Extensions'], materials: ['Hair extensions', 'Clips'], timeToLearn: '2 weeks' },
  { id: 29, name: 'Natural Dreadlocks', emoji: '🌀', category: 'Beauty', difficulty: 'Intermediate', startupCost: 'Very Low', incomeLevel: 'High', lessons: 8, description: 'Install and maintain dreadlocks', hasVideo: true, hasPDF: true, tools: ['Comb', 'Wax', 'Clips'], materials: ['Wax', 'Thread'], timeToLearn: '1 week' },
  { id: 30, name: 'Makeup Application', emoji: '💄', category: 'Beauty', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 12, description: 'Professional makeup application', hasVideo: true, hasPDF: true, tools: ['Brushes', 'Makeup'], materials: ['Cosmetics', 'Brushes'], timeToLearn: '2 weeks' },
  { id: 31, name: 'Skincare & Facials', emoji: '✨', category: 'Beauty', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 10, description: 'Provide skincare services', hasVideo: true, hasPDF: true, tools: ['Facial tools', 'Products'], materials: ['Skincare products'], timeToLearn: '1 week' },
  { id: 32, name: 'Nail Art', emoji: '💅', category: 'Beauty', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 11, description: 'Create nail art designs', hasVideo: true, hasPDF: true, tools: ['Nail polish', 'Brushes', 'Tools'], materials: ['Polish', 'Accessories'], timeToLearn: '1 week' },
  { id: 33, name: 'Massage Therapy', emoji: '🧘‍♀️', category: 'Beauty', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 14, description: 'Learn massage techniques', hasVideo: true, hasPDF: true, tools: ['Massage table', 'Oils'], materials: ['Massage oils'], timeToLearn: '3 weeks' },
  
  // Home & Cleaning
  { id: 34, name: 'Home Cleaning Service', emoji: '🧹', category: 'Services', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Medium', lessons: 6, description: 'Professional home cleaning', hasVideo: true, hasPDF: true, tools: ['Mops', 'Brooms', 'Vacuum'], materials: ['Cleaning supplies'], timeToLearn: '1 week' },
  { id: 35, name: 'Laundry Service', emoji: '👔', category: 'Services', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'Medium', lessons: 5, description: 'Offer laundry and ironing services', hasVideo: true, hasPDF: true, tools: ['Washing machine', 'Iron'], materials: ['Detergent'], timeToLearn: '3 days' },
  { id: 36, name: 'Cooking Catering', emoji: '🍽️', category: 'Services', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 15, description: 'Provide catering services', hasVideo: true, hasPDF: true, tools: ['Cooking equipment'], materials: ['Ingredients'], timeToLearn: '2 weeks' },
  
  // Child Care
  { id: 37, name: 'Child Care Center', emoji: '👶', category: 'Services', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Medium', lessons: 8, description: 'Start a daycare center', hasVideo: true, hasPDF: true, tools: ['Toys', 'Furniture'], materials: ['Educational materials'], timeToLearn: '1 week' },
  { id: 38, name: 'Early Childhood Education', emoji: '📚', category: 'Services', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'Medium', lessons: 12, description: 'Teach early childhood skills', hasVideo: true, hasPDF: true, tools: ['Teaching materials'], materials: ['Books', 'Toys'], timeToLearn: '2 weeks' },
  
  // Digital & Services
  { id: 39, name: 'Phone Repair', emoji: '📱', category: 'Services', difficulty: 'Intermediate', startupCost: 'Medium', incomeLevel: 'High', lessons: 16, description: 'Repair mobile phones', hasVideo: true, hasPDF: true, tools: ['Tools', 'Parts'], materials: ['Replacement parts'], timeToLearn: '3 weeks' },
  { id: 40, name: 'Basic Literacy Teaching', emoji: '✏️', category: 'Services', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Low', lessons: 10, description: 'Teach reading and writing', hasVideo: true, hasPDF: true, tools: ['Chalkboard', 'Materials'], materials: ['Books', 'Writing materials'], timeToLearn: '1 week' },
  { id: 41, name: 'Language Tutoring', emoji: '🗣️', category: 'Services', difficulty: 'Intermediate', startupCost: 'Very Low', incomeLevel: 'Medium', lessons: 12, description: 'Teach languages online or offline', hasVideo: true, hasPDF: true, tools: ['Materials'], materials: ['Books'], timeToLearn: '2 weeks' },
  
  // Agriculture & Animals
  { id: 42, name: 'Chicken Farming', emoji: '🐔', category: 'Agriculture', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 10, description: 'Start a profitable chicken farm', hasVideo: true, hasPDF: true, tools: ['Coop', 'Feeders'], materials: ['Feed', 'Chicks'], timeToLearn: '2 weeks' },
  { id: 43, name: 'Goat Farming', emoji: '🐐', category: 'Agriculture', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 12, description: 'Raise goats for meat/milk', hasVideo: true, hasPDF: true, tools: ['Shelter', 'Equipment'], materials: ['Feed', 'Animals'], timeToLearn: '2 weeks' },
  { id: 44, name: 'Beekeeping', emoji: '🐝', category: 'Agriculture', difficulty: 'Intermediate', startupCost: 'Low', incomeLevel: 'High', lessons: 13, description: 'Produce honey and bee products', hasVideo: true, hasPDF: true, tools: ['Hive', 'Smoker', 'Protective gear'], materials: ['Bees', 'Flowers'], timeToLearn: '2 weeks' },
  
  // More Crafts
  { id: 45, name: 'Leatherwork', emoji: '👜', category: 'Crafts', difficulty: 'Intermediate', startupCost: 'Medium', incomeLevel: 'High', lessons: 14, description: 'Create leather bags and items', hasVideo: true, hasPDF: true, tools: ['Knife', 'Punches', 'Stamps'], materials: ['Leather', 'Thread', 'Dye'], timeToLearn: '3 weeks' },
  { id: 46, name: 'Shoe Making', emoji: '👞', category: 'Crafts', difficulty: 'Advanced', startupCost: 'Medium', incomeLevel: 'High', lessons: 18, description: 'Make custom shoes', hasVideo: true, hasPDF: true, tools: ['Lasts', 'Hammer', 'Knife'], materials: ['Leather', 'Sole', 'Thread'], timeToLearn: '4 weeks' },
  { id: 47, name: 'Charcoal Production', emoji: '⚫', category: 'Food Processing', difficulty: 'Beginner', startupCost: 'Medium', incomeLevel: 'High', lessons: 8, description: 'Produce cooking charcoal', hasVideo: true, hasPDF: true, tools: ['Kiln', 'Equipment'], materials: ['Wood', 'Fuel'], timeToLearn: '1 week' },
  { id: 48, name: 'Coconut Products', emoji: '🥥', category: 'Food Processing', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'High', lessons: 10, description: 'Make coconut oil, milk, and more', hasVideo: true, hasPDF: true, tools: ['Grater', 'Press', 'Pots'], materials: ['Coconuts'], timeToLearn: '1 week' },
  { id: 49, name: 'Plant Propagation', emoji: '🌱', category: 'Agriculture', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'Medium', lessons: 7, description: 'Grow plants from seeds and cuttings', hasVideo: true, hasPDF: true, tools: ['Pots', 'Soil'], materials: ['Seeds', 'Compost'], timeToLearn: '1 week' },
  { id: 50, name: 'Fish Farming', emoji: '🐠', category: 'Agriculture', difficulty: 'Intermediate', startupCost: 'Medium', incomeLevel: 'High', lessons: 14, description: 'Farm fish in ponds or tanks', hasVideo: true, hasPDF: true, tools: ['Tank/pond', 'Aerator', 'Nets'], materials: ['Fish feed', 'Fingerlings'], timeToLearn: '3 weeks' },
  { id: 51, name: 'Tie-Dye Textiles', emoji: '🎨', category: 'Textiles', difficulty: 'Beginner', startupCost: 'Very Low', incomeLevel: 'High', lessons: 6, description: 'Create colorful tie-dye patterns', hasVideo: true, hasPDF: true, tools: ['Dye', 'Rubber bands', 'Fabric'], materials: ['Fabric', 'Dyes'], timeToLearn: '1 week' },
  { id: 52, name: 'Sewing Home Decor', emoji: '🪑', category: 'Tailoring', difficulty: 'Beginner', startupCost: 'Low', incomeLevel: 'Medium', lessons: 9, description: 'Make curtains, pillows, cushions', hasVideo: true, hasPDF: true, tools: ['Sewing machine', 'Scissors'], materials: ['Fabric', 'Thread', 'Stuffing'], timeToLearn: '1 week' }
];

export function getSkillById(id: number): Skill | undefined {
  return SKILLS_DATABASE.find(skill => skill.id === id);
}

export function getSkillsByCategory(category: string): Skill[] {
  return SKILLS_DATABASE.filter(skill => skill.category === category);
}

export function getSkillsByDifficulty(difficulty: string): Skill[] {
  return SKILLS_DATABASE.filter(skill => skill.difficulty === difficulty);
}

export const SKILL_CATEGORIES = [
  'Baking',
  'Cooking',
  'Food Processing',
  'Tailoring',
  'Textiles',
  'Crafts',
  'Agriculture',
  'Beauty',
  'Services'
];
