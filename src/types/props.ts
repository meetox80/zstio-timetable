type hourType = {
  number: number;
  timeFrom: string;
  timeTo: string;
};

type lessonType = {
  subject: string;
  teacher: string;
  teacherId: string;
  room: string;
  roomId: string;
};

type timeTableType = {
  hours: hourType[];
  generatedDate: string;
  title: string;
  validate: string;
  lessons: [lessonType, lessonType, lessonType, lessonType, lessonType];
};

type nameValueType = {
  name: string;
  value: string;
};

type props = {
  status: boolean;
  text: string;
  siteTitle: string;
  timeTableID: string;
  timeTable: timeTableType;
  classes: nameValueType[];
  rooms: nameValueType[];
  teachers: nameValueType[];
};

type substitutionType = {
  lesson: string;
  teacher: string;
  branch: string;
  subject: string;
  class: string;
  case: string;
  message: string;
};

type substitutionsListType = {
  dayIndex: number;
  zastepstwa: substitutionType[];
};
