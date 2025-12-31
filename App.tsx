
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { COPY } from './constants';
import { AppView } from './types';
import { canSubmit, submitFeedback } from './services/submissionService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.FORM);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already submitted in the last 24h
    if (!canSubmit()) {
      setView(AppView.SUCCESS);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    if (!message.trim()) {
      setError(true);
      return;
    }

    setIsSubmitting(true);
    const success = await submitFeedback(message);
    
    if (success) {
      setView(AppView.SUCCESS);
    } else {
      // In a "quiet" app, we usually don't show technical errors unless requested.
      // But we prevent double submission.
      setIsSubmitting(false);
    }
  };

  if (view === AppView.SUCCESS) {
    return (
      <Layout>
        <div className="flex flex-col gap-6 animate-in fade-in duration-700">
          <p className="serif-text text-xl leading-relaxed whitespace-pre-line text-slate-700">
            {COPY.SUCCESS_MESSAGE}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl text-slate-900 leading-tight">
            {COPY.TITLE}
          </h1>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
            {COPY.BODY_PARA_1}
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <ul className="flex flex-col gap-3 italic text-slate-700 serif-text text-lg">
            <li>{COPY.QUESTION_1}</li>
            <li>{COPY.QUESTION_2}</li>
            <li>{COPY.QUESTION_3}</li>
          </ul>

          <p className="text-slate-500 text-sm whitespace-pre-line leading-relaxed">
            {COPY.DIRECT_NOTE}
          </p>
        </section>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError(false);
              }}
              disabled={isSubmitting}
              placeholder={COPY.PLACEHOLDER}
              className={`w-full min-h-[300px] p-6 bg-white border ${
                error ? 'border-red-300' : 'border-slate-200'
              } rounded-sm text-slate-800 transition-all duration-200 resize-none leading-relaxed text-base`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-32 py-3 px-6 bg-slate-900 text-white font-medium text-sm tracking-wide rounded-sm transition-all
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800 active:scale-95'}`}
          >
            {isSubmitting ? 'Sending...' : COPY.SUBMIT_BUTTON}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default App;
