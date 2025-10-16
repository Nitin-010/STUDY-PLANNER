import React, { useState } from 'react';
import { Chapter, Status } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClockIcon } from './icons/ClockIcon';
import { PencilIcon } from './icons/PencilIcon';
import { PlayIcon } from './icons/PlayIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CheckmarkIcon } from './icons/CheckmarkIcon';
import { EditIcon } from './icons/EditIcon';

interface ChapterItemProps {
  chapter: Chapter;
  onUpdate: (updatedChapter: Partial<Chapter>) => void;
  onDelete: () => void;
}

const statusStyles: { [key in Status]: string } = {
  [Status.ON_GOING]: 'bg-teal-500/20 text-teal-300 ring-teal-500/30',
  [Status.NEXT]: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
  [Status.LATER]: 'bg-gray-500/20 text-gray-400 ring-gray-500/30',
  [Status.COMPLETED]: 'bg-green-500/20 text-green-300 ring-green-500/30',
};

const calculateDaysLeft = (deadline: string): { text: string, color: string } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0,0,0,0);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: `${Math.abs(diffDays)} days ago`, color: 'text-red-400' };
  if (diffDays === 0) return { text: `Today`, color: 'text-yellow-400' };
  if (diffDays === 1) return { text: `1 day left`, color: 'text-yellow-400' };
  return { text: `${diffDays} days left`, color: 'text-slate-400' };
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ChapterItem: React.FC<ChapterItemProps> = ({ chapter, onUpdate, onDelete }) => {
    const [showLectureCheck, setShowLectureCheck] = useState(false);
    const [showDppCheck, setShowDppCheck] = useState(false);
    const [isEditingDeadline, setIsEditingDeadline] = useState(false);
    const [isEditingHours, setIsEditingHours] = useState(false);
    const [editableHours, setEditableHours] = useState(chapter.estimatedHours);

    const lectureProgress = chapter.totalLectures > 0 ? (chapter.currentLecture / chapter.totalLectures) * 100 : 0;
    const dppProgress = chapter.dpps > 0 ? (chapter.currentDpps / chapter.dpps) * 100 : 0;
    const daysLeft = calculateDaysLeft(chapter.deadline);

    const lecturePulseClass = lectureProgress > 0 && lectureProgress < 100 ? 'animate-pulse-bg' : '';
    const dppPulseClass = dppProgress > 0 && dppProgress < 100 ? 'animate-pulse-bg' : '';

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate({ status: e.target.value as Status });
    };

    const handleLectureChange = (increment: number) => {
        const newLecture = Math.max(0, Math.min(chapter.totalLectures, chapter.currentLecture + increment));
        const updatePayload: Partial<Chapter> = { currentLecture: newLecture };

        if (newLecture > 0 && !chapter.startDate) {
            updatePayload.startDate = new Date().toISOString().split('T')[0];
        }
        
        if (newLecture === chapter.totalLectures && chapter.totalLectures > 0) {
            setShowLectureCheck(true);
            setTimeout(() => setShowLectureCheck(false), 1000);
        }
        onUpdate(updatePayload);
    };

    const handleDppChange = (increment: number) => {
        const newDpps = Math.max(0, Math.min(chapter.dpps, chapter.currentDpps + increment));
        if (newDpps === chapter.dpps && chapter.dpps > 0) {
            setShowDppCheck(true);
            setTimeout(() => setShowDppCheck(false), 1000);
        }
        onUpdate({ currentDpps: newDpps });
    };

    return (
        <div className="bg-neutral-900/60 p-4 rounded-lg border border-neutral-800 hover:border-teal-800/80 hover:shadow-xl transition-all duration-200 group">
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-slate-200 group-hover:text-teal-300 transition-colors flex-1">
                    {chapter.name}
                </h3>
                <div className="flex items-center gap-2">
                    <select 
                      value={chapter.status} 
                      onChange={handleStatusChange}
                      className={`text-xs font-semibold py-1 px-2 rounded-md ring-1 ring-inset focus:outline-none focus:ring-2 bg-transparent ${statusStyles[chapter.status]}`}
                    >
                        {Object.values(Status).map(s => <option key={s} value={s} className="bg-neutral-800 text-slate-200">{s}</option>)}
                    </select>
                    <button onClick={onDelete} className="text-slate-500 hover:text-red-400 focus:outline-none" aria-label="Delete chapter">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="mt-3 text-sm text-slate-400 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                <div className="flex items-center space-x-2 relative group/edit">
                    <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                    {isEditingDeadline ? (
                        <input
                            type="date"
                            value={chapter.deadline}
                            onChange={(e) => onUpdate({ deadline: e.target.value })}
                            onBlur={() => setIsEditingDeadline(false)}
                            autoFocus
                            className="bg-neutral-800 text-slate-300 rounded px-1 text-sm w-32 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                    ) : (
                        <span className={`cursor-pointer ${daysLeft.color}`} onClick={() => setIsEditingDeadline(true)}>
                            {daysLeft.text}
                        </span>
                    )}
                    <button onClick={() => setIsEditingDeadline(true)} className="absolute -right-5 opacity-0 group-hover/edit:opacity-100 transition-opacity" aria-label="Edit deadline">
                        <EditIcon className="w-3.5 h-3.5 text-slate-400 hover:text-teal-300" />
                    </button>
                </div>
                <div className="flex items-center space-x-2 relative group/edit">
                    <ClockIcon className="w-4 h-4 flex-shrink-0" />
                    {isEditingHours ? (
                        <input
                            type="number"
                            value={editableHours}
                            onChange={(e) => setEditableHours(Number(e.target.value))}
                            onBlur={() => { onUpdate({ estimatedHours: editableHours }); setIsEditingHours(false); }}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.currentTarget.blur(); } }}
                            autoFocus
                            className="bg-neutral-800 text-slate-300 rounded px-1 text-sm w-16 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                    ) : (
                        <span className="cursor-pointer" onClick={() => { setEditableHours(chapter.estimatedHours); setIsEditingHours(true); }}>
                            {chapter.estimatedHours} hrs
                        </span>
                    )}
                    <button onClick={() => { setEditableHours(chapter.estimatedHours); setIsEditingHours(true); }} className="absolute -right-5 opacity-0 group-hover/edit:opacity-100 transition-opacity" aria-label="Edit estimated hours">
                        <EditIcon className="w-3.5 h-3.5 text-slate-400 hover:text-teal-300" />
                    </button>
                </div>
                {chapter.startDate && (
                  <div className="flex items-center space-x-2">
                      <PlayIcon className="w-4 h-4" />
                      <span>Started: {formatDate(chapter.startDate)}</span>
                  </div>
                )}
            </div>

            <div className="mt-4 space-y-3">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-slate-400">Lecture Progress</span>
                        <div className="flex items-center space-x-2">
                           <button onClick={() => handleLectureChange(-1)} disabled={chapter.currentLecture === 0} className="text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg leading-none font-bold pb-1">-</button>
                           <span className="text-xs font-semibold text-slate-300">{chapter.currentLecture} / {chapter.totalLectures}</span>
                           <button onClick={() => handleLectureChange(1)} disabled={chapter.currentLecture === chapter.totalLectures} className="text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg leading-none font-bold pb-1">+</button>
                        </div>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-2.5 relative">
                        <div className={`bg-gradient-to-r from-teal-500 to-cyan-400 h-2.5 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20 ${lecturePulseClass}`} style={{ width: `${lectureProgress}%` }}></div>
                         {showLectureCheck && <CheckmarkIcon className="absolute -right-2 -top-2 w-6 h-6 text-green-400 animate-bounce-in" />}
                    </div>
                </div>

                {chapter.dpps > 0 && (
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-slate-400 flex items-center"><PencilIcon className="w-3 h-3 mr-1.5"/>DPP Progress</span>
                        <div className="flex items-center space-x-2">
                           <button onClick={() => handleDppChange(-1)} disabled={chapter.currentDpps === 0} className="text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg leading-none font-bold pb-1">-</button>
                           <span className="text-xs font-semibold text-slate-300">{chapter.currentDpps} / {chapter.dpps}</span>
                           <button onClick={() => handleDppChange(1)} disabled={chapter.currentDpps === chapter.dpps} className="text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg leading-none font-bold pb-1">+</button>
                        </div>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-2.5 relative">
                        <div className={`bg-gradient-to-r from-teal-400 to-sky-500 h-2.5 rounded-full transition-all duration-300 shadow-lg shadow-sky-500/20 ${dppPulseClass}`} style={{ width: `${dppProgress}%` }}></div>
                        {showDppCheck && <CheckmarkIcon className="absolute -right-2 -top-2 w-6 h-6 text-green-400 animate-bounce-in" />}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default ChapterItem;