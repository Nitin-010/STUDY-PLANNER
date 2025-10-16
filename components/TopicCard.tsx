import React, { useState } from 'react';
import { Topic, Chapter } from '../types';
import ChapterItem from './ChapterItem';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { TrashIcon } from './icons/TrashIcon';
import AddChapterForm from './AddChapterForm';

interface TopicCardProps {
  topic: Topic;
  onChapterUpdate: (topicId: number, chapterId: number, updatedChapter: Partial<Chapter>) => void;
  onTopicDelete: (topicId: number) => void;
  onAddChapter: (topicId: number, chapterName: string) => void;
  onDeleteChapter: (topicId: number, chapterId: number) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onChapterUpdate, onTopicDelete, onAddChapter, onDeleteChapter }) => {
  const [isOpen, setIsOpen] = useState(true);

  const ongoingCount = topic.chapters.filter(c => c.status === 'On Going').length;

  return (
    <div className={`bg-neutral-900/50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-neutral-800`}>
      <header className={`w-full p-4 flex justify-between items-center bg-teal-900/10`}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-grow flex items-center focus:outline-none text-left"
        >
            <h2 className={`text-xl font-bold tracking-wide uppercase text-teal-300`}>{topic.name}</h2>
            {ongoingCount > 0 && (
                <span className={`ml-3 text-xs font-semibold px-2 py-1 rounded-full bg-teal-400/80 text-teal-950`}>{ongoingCount} Ongoing</span>
            )}
        </button>
        <div className="flex items-center">
            <button 
              onClick={() => onTopicDelete(topic.id)} 
              className={`p-2 rounded-full hover:bg-red-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-red-500`}
              aria-label={`Delete ${topic.name} topic`}
            >
              <TrashIcon className="w-5 h-5 text-slate-400 hover:text-red-500" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="ml-2 focus:outline-none p-2 rounded-full hover:bg-neutral-700/50">
              <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
        </div>
      </header>
      
      {isOpen && (
        <div className="p-1 sm:p-2 bg-neutral-900/30">
           <div className="space-y-2">
                {topic.chapters.map(chapter => (
                <ChapterItem
                    key={chapter.id}
                    chapter={chapter}
                    onUpdate={(updatedChapter) => onChapterUpdate(topic.id, chapter.id, updatedChapter)}
                    onDelete={() => onDeleteChapter(topic.id, chapter.id)}
                />
                ))}
            </div>
            {topic.chapters.length === 0 && (
                <p className="text-center text-slate-500 py-4">No chapters yet. Add one to get started!</p>
            )}
            <AddChapterForm onAddChapter={(name) => onAddChapter(topic.id, name)} />
        </div>
      )}
    </div>
  );
};

export default TopicCard;