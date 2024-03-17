export const SERVICES_TO_NOTIFY = {
  POSTS: 'http://posts-clusterip-srv:5174/events',
  COMMENTS: 'http://comments-srv:5175/events',
  QUERY: 'http://query-srv:5177/events',
  MODERATION: 'http://moderation-srv:5178/events',
} as const;
