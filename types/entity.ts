export interface ITask {
  _id: string;
  title: string;
  batch: string;
  urllink: string;
  githublink?: string;
  notes?: string;
}

export interface ITaskResult {
  data: ITask[];
}
