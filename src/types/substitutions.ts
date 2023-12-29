type substitutionType = {
  lesson: string;
  teacher: string;
  branch: string;
  subject: string;
  class: string;
  case: string;
  message: string;
};

type substitutionTableType = {
  time: string;
  dayIndex: number;
  zastepstwa: substitutionType[];
};

type substitutions = {
  timeRange: string;
  tables: substitutionTableType[];
};
