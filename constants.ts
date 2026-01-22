import { LucideIcon, Star, Moon, Sun, Heart, Briefcase, Brain, Coins, Sparkles, Scroll, Compass } from 'lucide-react';

export interface Persona {
  id: string;
  name: string;
  glyph: string;
  doctrine: string;
  quote: string;
  auraColor: string;
}

export const PERSONAS: Persona[] = [
  {
    id: 'stoic',
    name: 'The Stoic',
    glyph: '🏛️',
    doctrine: 'Control only what belongs to you.',
    quote: 'Suffering arises from trying to control the uncontrollable.',
    auraColor: 'border-stone-400'
  },
  {
    id: 'mystic',
    name: 'The Mystic',
    glyph: '👁️',
    doctrine: 'The universe is not outside of you.',
    quote: 'Look inward; the answers have always been there.',
    auraColor: 'border-purple-300'
  },
  {
    id: 'architect',
    name: 'The Architect',
    glyph: '📐',
    doctrine: 'Structure creates freedom.',
    quote: 'Design your days, or they will be designed for you.',
    auraColor: 'border-blue-300'
  },
  {
    id: 'healer',
    name: 'The Healer',
    glyph: '🌿',
    doctrine: 'Wholeness is your natural state.',
    quote: 'You are not broken, you are simply unfolding.',
    auraColor: 'border-green-300'
  }
];

export interface Room {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  excerpt: string;
}

export const ROOMS: Room[] = [
  {
    id: 'career',
    title: 'Career & Vocation',
    icon: Briefcase,
    description: 'Aligning work with cosmic purpose.',
    excerpt: 'Your 10th House indicates a shift towards public leadership in late 2026. The current transit suggests...'
  },
  {
    id: 'love',
    title: 'Love & Union',
    icon: Heart,
    description: 'Dynamics of connection and soul contracts.',
    excerpt: 'Venus entering your 7th House opens a portal for deep karmic resolution in relationships...'
  },
  {
    id: 'money',
    title: 'Wealth & Resources',
    icon: Coins,
    description: 'Flow of abundance and material stability.',
    excerpt: 'Jupiter aspects your 2nd House ruler, expanding your capacity to receive, but beware of impulsive investments...'
  },
  {
    id: 'mind',
    title: 'Mind & Clarity',
    icon: Brain,
    description: 'Mental patterns and inner dialogue.',
    excerpt: 'Mercury retrograde in your sign invites a review of how you speak to yourself. Silence is your ally now...'
  }
];

export const TIMELINE_EVENTS = [
  { 
    label: 'I', 
    title: 'Health & Fitness', 
    theme: 'System', 
    desc: 'The vessel must be fortified. Structure your physical reality to support the weight of your ambition.' 
  },
  { 
    label: 'II', 
    title: 'Intellectual Life', 
    theme: 'Clarity', 
    desc: 'A clouded mind cannot navigate. Seek the signal within the noise through rigorous study and silence.' 
  },
  { 
    label: 'III', 
    title: 'Personal Growth', 
    theme: 'Meaning', 
    desc: 'Evolution is mandatory. Shed the skin of who you were to accommodate who you are becoming.' 
  },
  { 
    label: 'IV', 
    title: 'Love & Relationship', 
    theme: 'Comfort', 
    desc: 'Intimacy is the mirror. Find sanctuary in connections that challenge and hold you simultaneously.' 
  },
  { 
    label: 'V', 
    title: 'Financial Life', 
    theme: 'Clarity', 
    desc: 'Money is congealed energy. Clear the blockages to allow resources to flow where they are needed.' 
  },
  { 
    label: 'VI', 
    title: 'Life Vision', 
    theme: 'Meaning', 
    desc: 'The grand design. Look beyond the horizon to architect a legacy that outlasts your physical form.' 
  },
];