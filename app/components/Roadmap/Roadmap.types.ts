export interface RoadmapStep {
  id: string | number;
  title: string;
  description: string;
  date: string;
  isCompleted?: boolean;
  heure?: string;
  isUpcoming?: boolean;
}
