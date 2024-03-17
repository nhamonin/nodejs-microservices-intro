export type IComment = {
  id: string;
  content: string;
  status: 'approved' | 'rejected' | 'pending';
};
