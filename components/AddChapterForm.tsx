import React, { useState } from 'react';

interface AddChapterFormProps {
    onAddChapter: (chapterName: string) => void;
}

const AddChapterForm: React.FC<AddChapterFormProps> = ({ onAddChapter }) => {
    const [chapterName, setChapterName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (chapterName.trim()) {
            onAddChapter(chapterName.trim());
            setChapterName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-3 border-t border-neutral-800 flex items-center gap-3">
            <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                placeholder="Add a new chapter..."
                className="flex-grow bg-neutral-800/80 text-slate-300 text-sm border-neutral-700 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-shadow"
                aria-label="New chapter name"
            />
            <button
                type="submit"
                className="bg-teal-600/50 text-teal-200 font-semibold px-4 py-1.5 text-sm rounded-md hover:bg-teal-600/70 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-neutral-900 focus:ring-teal-500 transition-colors disabled:bg-slate-700/50 disabled:text-slate-400 disabled:cursor-not-allowed"
                disabled={!chapterName.trim()}
            >
                Add
            </button>
        </form>
    );
};

export default AddChapterForm;