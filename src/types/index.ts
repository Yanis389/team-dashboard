export interface Member {
  id: number;
  name: string;
  email: string;
}

export interface Team {
  id: number;
  title: string;
  body: string;
  assignedMemberIds: number[];
}