export interface RecipeXivapi {
  ID: string;
  Name_fr: string;
  RecipeLevelTable: RecipeLevelTable;
  QualityFactor: number;
  DifficultyFactor: number;
  DurabilityFactor: number;
  Icon: string;
  ClassJob: ClassJobXivapi;
  [propName: string]: any;
}

export interface Recipe {
  ID: string;
  Name_fr: string;
  RecipeLevelTable: RecipeLevelTable;
  QualityFactor: number;
  DifficultyFactor: number;
  DurabilityFactor: number;
  Icon: string;
  ClassJob: ClassJob;
}

interface RecipeLevelTable {
  ClassJobLevel: number;
  ConditionsFlag: number;
  Difficulty: number;
  Durability: number;
  ID: number;
  ProgressDivider: number;
  ProgressModifier: number;
  Quality: number;
  QualityDivider: number;
  QualityModifier: number;
  Stars: number;
  SuggestedControl: number;
  SuggestedCraftsmanship: number;
}

interface ClassJobXivapi {
  ID: string;
  Abbreviation_fr: string;
  Icon: string;
  [propName: string]: any;
}

interface ClassJob {
  ID: string;
  Abbreviation_fr: string;
  Icon: string;
}
