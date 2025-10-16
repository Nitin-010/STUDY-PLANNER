export enum Status {
  ON_GOING = 'On Going',
  NEXT = 'Next',
  LATER = 'Later',
  COMPLETED = 'Completed',
}

export interface Chapter {
  id: number;
  name: string;
  totalLectures: number;
  currentLecture: number;
  dpps: number;
  currentDpps: number;
  estimatedHours: number;
  deadline: string; // ISO date string e.g., "2024-08-15"
  status: Status;
  startDate?: string | null; // ISO date string
}

export interface Topic {
  id: number;
  name: string;
  chapters: Chapter[];
}