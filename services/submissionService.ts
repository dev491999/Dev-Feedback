
import { GOOGLE_SHEET_URL, LOCAL_STORAGE_KEY, SUBMISSION_COOLDOWN } from '../constants';
import { FeedbackSubmission } from '../types';

export const canSubmit = (): boolean => {
  const lastTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!lastTime) return true;
  
  const now = Date.now();
  const lastTimestamp = parseInt(lastTime, 10);
  return (now - lastTimestamp) > SUBMISSION_COOLDOWN;
};

export const submitFeedback = async (message: string): Promise<boolean> => {
  const submission: FeedbackSubmission = {
    message,
    timestamp: new Date().toISOString()
  };

  try {
    // We use text/plain to avoid a CORS preflight (OPTIONS) request.
    // Google Apps Script doesn't support OPTIONS requests, but it can 
    // parse the JSON body of a simple POST request.
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(submission)
    });

    // With no-cors, we can't read the response, so we assume success if no error thrown
    localStorage.setItem(LOCAL_STORAGE_KEY, Date.now().toString());
    return true;
  } catch (error) {
    console.error("Submission failed:", error);
    return false; 
  }
};
