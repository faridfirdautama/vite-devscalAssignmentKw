export interface ITask {
  _id: string;
  title: string;
  batch: string;
  url_link: string;
  github_link?: string;
  notes?: string;
}

export interface ITaskResult {
  data: ITask[];
}
