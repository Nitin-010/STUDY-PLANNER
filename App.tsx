import React, { useState } from 'react';
import { Topic, Chapter, Status } from './types';
import { INITIAL_TOPICS_DATA } from './constants';
import TopicCard from './components/TopicCard';
import MusicPlayer from './components/MusicPlayer';
import AddTopicForm from './components/AddTopicForm';

const App: React.FC = () => {
  const [topicsData, setTopicsData] = useState<Topic[]>(INITIAL_TOPICS_DATA);

  const handleChapterUpdate = (topicId: number, chapterId: number, updatedChapter: Partial<Chapter>) => {
    setTopicsData(prevTopics =>
      prevTopics.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            chapters: topic.chapters.map(chapter =>
              chapter.id === chapterId ? { ...chapter, ...updatedChapter } : chapter
            ),
          };
        }
        return topic;
      })
    );
  };

  const handleAddTopic = (topicName: string) => {
    const newTopic: Topic = {
      id: Date.now(),
      name: topicName.toUpperCase(),
      chapters: [],
    };
    setTopicsData(prevTopics => [...prevTopics, newTopic]);
  };

  const handleTopicDelete = (topicId: number) => {
    if (window.confirm('Are you sure you want to delete this topic and all its chapters?')) {
      setTopicsData(prevTopics => prevTopics.filter(topic => topic.id !== topicId));
    }
  };
  
  const handleAddChapter = (topicId: number, chapterName: string) => {
    const newChapter: Chapter = {
      id: Date.now(),
      name: chapterName,
      totalLectures: 10, // Default value
      currentLecture: 0,
      dpps: 5, // Default value
      currentDpps: 0,
      estimatedHours: 15, // Default value
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      status: Status.NEXT,
      startDate: null,
    };

    setTopicsData(prevTopics =>
      prevTopics.map(topic =>
        topic.id === topicId
          ? { ...topic, chapters: [...topic.chapters, newChapter] }
          : topic
      )
    );
  };
  
  const handleDeleteChapter = (topicId: number, chapterId: number) => {
     if (window.confirm('Are you sure you want to delete this chapter?')) {
        setTopicsData(prevTopics =>
          prevTopics.map(topic =>
            topic.id === topicId
              ? { ...topic, chapters: topic.chapters.filter(c => c.id !== chapterId) }
              : topic
          )
        );
     }
  };

  return (
    <div className="bg-black min-h-screen font-sans text-slate-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-orbitron text-teal-300">
            Study Planner
          </h1>
          <p className="mt-4 text-lg text-slate-400 font-tiro-hindi italic">
            "मैं ज्वाला हूँ बुझी राख नहीं, मैं कर्म के साथ हूँ किस्मत के साथ नहीं।"
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AddTopicForm onAddTopic={handleAddTopic} />
            {topicsData.map(topic => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onChapterUpdate={handleChapterUpdate}
                onTopicDelete={handleTopicDelete}
                onAddChapter={handleAddChapter}
                onDeleteChapter={handleDeleteChapter}
              />
            ))}
          </div>
          
          <aside className="lg:col-span-1">
             <MusicPlayer />
          </aside>
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Designed for focus and clarity. Happy studying!</p>
        </footer>
      </div>
    </div>
  );
};

export default App;