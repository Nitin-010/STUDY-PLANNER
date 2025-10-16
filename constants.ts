import { Topic, Status } from './types';

const getFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const INITIAL_TOPICS_DATA: Topic[] = [
  {
    id: 1,
    name: 'MATHEMATICS',
    chapters: [
      { id: 101, name: 'Calculus I: Limits & Derivatives', totalLectures: 12, currentLecture: 5, dpps: 3, currentDpps: 1, estimatedHours: 20, deadline: getFutureDate(14), status: Status.ON_GOING, startDate: getFutureDate(-3) },
      { id: 102, name: 'Linear Algebra: Vectors & Matrices', totalLectures: 15, currentLecture: 0, dpps: 5, currentDpps: 0, estimatedHours: 25, deadline: getFutureDate(30), status: Status.NEXT, startDate: null },
      { id: 103, name: 'Probability & Statistics', totalLectures: 10, currentLecture: 0, dpps: 4, currentDpps: 0, estimatedHours: 18, deadline: getFutureDate(45), status: Status.LATER, startDate: null },
      { id: 104, name: 'Differential Equations', totalLectures: 14, currentLecture: 14, dpps: 5, currentDpps: 5, estimatedHours: 22, deadline: getFutureDate(-10), status: Status.COMPLETED, startDate: getFutureDate(-25) },
    ],
  },
  {
    id: 2,
    name: 'PHYSICS',
    chapters: [
      { id: 201, name: 'Classical Mechanics', totalLectures: 18, currentLecture: 9, dpps: 4, currentDpps: 2, estimatedHours: 30, deadline: getFutureDate(21), status: Status.ON_GOING, startDate: getFutureDate(-10) },
      { id: 202, name: 'Electromagnetism', totalLectures: 20, currentLecture: 0, dpps: 6, currentDpps: 0, estimatedHours: 35, deadline: getFutureDate(50), status: Status.NEXT, startDate: null },
      { id: 203, name: 'Thermodynamics', totalLectures: 12, currentLecture: 0, dpps: 3, currentDpps: 0, estimatedHours: 20, deadline: getFutureDate(65), status: Status.LATER, startDate: null },
    ],
  },
  {
    id: 3,
    name: 'PHYSICAL CHEMISTRY',
    chapters: [
      { id: 301, name: 'Chemical Kinetics', totalLectures: 10, currentLecture: 1, dpps: 2, currentDpps: 0, estimatedHours: 15, deadline: getFutureDate(18), status: Status.ON_GOING, startDate: getFutureDate(-1) },
      { id: 302, name: 'Quantum Chemistry', totalLectures: 16, currentLecture: 0, dpps: 5, currentDpps: 0, estimatedHours: 28, deadline: getFutureDate(40), status: Status.LATER, startDate: null },
      { id: 303, name: 'Spectroscopy', totalLectures: 12, currentLecture: 0, dpps: 4, currentDpps: 0, estimatedHours: 22, deadline: getFutureDate(55), status: Status.LATER, startDate: null },
    ],
  },
];