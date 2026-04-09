export interface RoadmapStep {
  id: string | number;
  title: string;
  description: string;
  date: Date;
  isCompleted?: boolean;
  isUpcoming?: boolean;
}
