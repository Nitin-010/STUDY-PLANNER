import React, { useState } from 'react';

interface AddTopicFormProps {
    onAddTopic: (topicName: string) => void;
}

const AddTopicForm: React.FC<AddTopicFormProps> = ({ onAddTopic }) => {
    const [topicName, setTopicName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topicName.trim()) {
            onAddTopic(topicName.trim());
            setTopicName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-neutral-900/50 rounded-xl shadow-lg p-4 flex items-center gap-4 border border-neutral-800">
            <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="Enter a new topic name..."
                className="flex-grow bg-neutral-800 text-slate-200 border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                aria-label="New topic name"
            />
            <button
                type="submit"
                className="bg-teal-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-teal-500 transition-colors disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
                disabled={!topicName.trim()}
            >
                Add Topic
            </button>
        </form>
    );
};

export default AddTopicForm;