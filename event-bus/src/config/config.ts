export const SERVICES_TO_NOTIFY = {
  POSTS: 'http://localhost:5174/events',
  COMMENTS: 'http://localhost:5175/events',
  QUERY: 'http://localhost:5177/events',
  MODERATION: 'http://localhost:5178/events',
} as const;
