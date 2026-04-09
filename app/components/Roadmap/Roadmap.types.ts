import { ReactNode } from "react";

export interface RoadmapStep {
  id: string | number;
  title: string;
  description: string;
  date: string; // "20 Mars 2024" par exemple
  isCompleted?: boolean;
  heure?: string; // "18:00" par exemple
  isUpcoming?: boolean;
}
