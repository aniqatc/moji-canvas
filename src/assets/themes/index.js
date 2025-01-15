import activities from './activities.svg';
import animals from './animals.svg';
import flags from './flags.svg';
import food from './food.svg';
import objects from './objects.svg';
import people from './people.svg';
import all from './all.svg';
import smileys from './smileys.svg';
import symbols from './symbols.svg';
import travel from './travel.svg';
import misc from './misc.svg';

export const themes = [
  { id: 'all', icon: all, label: 'Random', value: 'all' },
  { id: 'activities', icon: activities, label: 'Activities', value: 'activities' },
  { id: 'animals-nature', icon: animals, label: 'Animals & Nature', value: 'animals-nature' },
  { id: 'flags', icon: flags, label: 'Flags', value: 'flags' },
  { id: 'food-drink', icon: food, label: 'Food & Drink', value: 'food-drink' },
  { id: 'objects', icon: objects, label: 'Objects', value: 'objects' },
  { id: 'people-body', icon: people, label: 'People', value: 'people-body' },
  { id: 'symbols', icon: symbols, label: 'Symbols', value: 'symbols' },
  { id: 'smileys-emotion', icon: smileys, label: 'Smileys', value: 'smileys-emotion' },
  { id: 'travel-places', icon: travel, label: 'Travel & Places', value: 'travel-places' },
  { id: 'extras-', icon: misc, label: 'Miscellaneous', value: 'extras-' },
];
