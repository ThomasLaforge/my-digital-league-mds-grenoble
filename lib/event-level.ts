export type EventLevel =
  | "MOLDU"
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "EXPERT";

export interface LevelOption {
  value: EventLevel;
  label: string;
}

export const EVENT_LEVEL_OPTIONS: LevelOption[] = [
  { value: "MOLDU", label: "Moldu" },
  { value: "BEGINNER", label: "Débutant" },
  { value: "INTERMEDIATE", label: "Intermédiaire" },
  { value: "ADVANCED", label: "Avancé" },
  { value: "EXPERT", label: "Expert" },
];
