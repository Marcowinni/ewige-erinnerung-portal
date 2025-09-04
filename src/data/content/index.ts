import { deContent } from './de';
import { enContent } from './en';
import { frContent } from './fr';
import { itContent } from './it';
import { ContentData, Language, Mode } from './types';

const contentMap = {
  de: deContent,
  en: enContent,
  fr: frContent,
  it: itContent,
};

export const getContent = (language: Language): ContentData => {
  return contentMap[language];
};

export const getSharedContent = (language: Language) => {
  return getContent(language).shared;
};

export const getModeContent = (language: Language, mode: Mode) => {
  const content = getContent(language);
  if (mode === 'pet') return content.pet;
  if (mode === 'surprise') return content.surprise; 
  return content.human;
};



export * from './types';