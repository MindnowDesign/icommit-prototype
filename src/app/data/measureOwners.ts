export type MeasureOwner = {
  id: string;
  name: string;
  jobTitle: string;
  avatarUrl: string;
};

export const MEASURE_OWNERS: readonly MeasureOwner[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    jobTitle: "Team lead",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "marco-rossi",
    name: "Marco Rossi",
    jobTitle: "Product manager",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "elena-weber",
    name: "Elena Weber",
    jobTitle: "HR business partner",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "james-walsh",
    name: "James Walsh",
    jobTitle: "Department head",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
] as const;

export function getMeasureOwnerById(id: string): MeasureOwner | undefined {
  return MEASURE_OWNERS.find((owner) => owner.id === id);
}

export function getMeasureOwnerInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
