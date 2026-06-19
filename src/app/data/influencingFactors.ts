import {
  Briefcase,
  Sailboat,
  Building2,
  Wrench,
  Users,
  RefreshCw,
  UserCheck,
  Target,
  UserPlus,
  User,
  Crown,
  GraduationCap,
  FileCheck,
  Coins,
  Share2,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type InfluencingFactorField = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export const AVAILABLE_FIELDS: readonly InfluencingFactorField[] = [
  { id: "job-content", name: "Job content", icon: Briefcase },
  { id: "work-leisure", name: "Work and leisure", icon: Sailboat },
  { id: "structures-procedures", name: "Structures and procedures", icon: Building2 },
  { id: "workplace-tools", name: "Workplace / Tools", icon: Wrench },
  { id: "collaboration", name: "Collaboration within the company", icon: Users },
  { id: "dealing-changes", name: "Dealing with changes", icon: RefreshCw },
  { id: "customer-orientation", name: "Customer orientation", icon: UserCheck },
  { id: "company-strategy", name: "Company strategy", icon: Target },
  { id: "involvement-employees", name: "Involvement of employees", icon: UserPlus },
  { id: "immediate-superior", name: "Immediate superior", icon: User },
  { id: "executive-management", name: "Executive management", icon: Crown },
  { id: "employee-development", name: "Employee development", icon: GraduationCap },
  { id: "objective-agreement", name: "Objective agreement", icon: FileCheck },
  { id: "remuneration", name: "Remuneration", icon: Coins },
  { id: "knowledge-sharing", name: "Knowledge sharing", icon: Share2 },
  { id: "team", name: "Team", icon: UsersRound },
] as const;

export const WEAKNESS_DEFAULT = ["job-content", "company-strategy", "involvement-employees"];
export const STRENGTH_DEFAULT = ["work-leisure", "team", "immediate-superior"];

export type HausRelative = "strength" | "weakness";

const WEAKNESS_DEFAULT_SET = new Set<string>(WEAKNESS_DEFAULT);
const STRENGTH_DEFAULT_SET = new Set<string>(STRENGTH_DEFAULT);

export function getFactorHausRelative(factorId: string): HausRelative | undefined {
  if (WEAKNESS_DEFAULT_SET.has(factorId)) return "weakness";
  if (STRENGTH_DEFAULT_SET.has(factorId)) return "strength";
  return undefined;
}

export function getFactorById(id: string): InfluencingFactorField | undefined {
  return AVAILABLE_FIELDS.find((field) => field.id === id);
}

export function idsToFactorNames(ids: readonly string[]): string[] {
  return ids
    .map((id) => getFactorById(id)?.name)
    .filter((name): name is string => name !== undefined);
}

export function areIdSetsEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((id) => setB.has(id));
}

const HAUS_RELATIVE_SORT_ORDER: Record<HausRelative, number> = {
  strength: 0,
  weakness: 1,
};

export function sortFieldsByHausRelative(
  fields: readonly InfluencingFactorField[]
): InfluencingFactorField[] {
  return [...fields].sort((a, b) => {
    const aRelative = getFactorHausRelative(a.id);
    const bRelative = getFactorHausRelative(b.id);
    const aOrder = aRelative !== undefined ? HAUS_RELATIVE_SORT_ORDER[aRelative] : 2;
    const bOrder = bRelative !== undefined ? HAUS_RELATIVE_SORT_ORDER[bRelative] : 2;
    if (aOrder !== bOrder) return aOrder - bOrder;

    const aIndex = AVAILABLE_FIELDS.findIndex((field) => field.id === a.id);
    const bIndex = AVAILABLE_FIELDS.findIndex((field) => field.id === b.id);
    return aIndex - bIndex;
  });
}
