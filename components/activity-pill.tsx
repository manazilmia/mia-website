import {
  BowArrowIcon,
  BulbIcon,
  CookingPotIcon,
  FootballIcon,
  HammerIcon,
  Plant01Icon,
  RunningShoesIcon,
  SwimmingIcon,
  TentTreeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";

export type ActivityIconName =
  | "football"
  | "swimming"
  | "archery"
  | "running"
  | "camping"
  | "cooking"
  | "carpentry"
  | "farming"
  | "skills";

const activityIcons = {
  football: FootballIcon,
  swimming: SwimmingIcon,
  archery: BowArrowIcon,
  running: RunningShoesIcon,
  camping: TentTreeIcon,
  cooking: CookingPotIcon,
  carpentry: HammerIcon,
  farming: Plant01Icon,
  skills: BulbIcon,
};

function ActivityIcon({ name }: { name: ActivityIconName }) {
  return (
    <HugeiconsIcon
      icon={activityIcons[name]}
      size={18}
      color="currentColor"
      strokeWidth={1.7}
      className="size-[18px] shrink-0 text-[#4C4238]"
      aria-hidden
    />
  );
}

export function ActivityPill({
  label,
  icon,
}: {
  label: string;
  icon: ActivityIconName;
}) {
  return (
    <Badge className="h-auto min-h-9 gap-2 border-[#d8cbbc] bg-[#f1ece9] px-3 py-1.5 font-medium text-[#4C4238] shadow-[0_1px_2px_rgba(30,21,12,.04)]">
      <ActivityIcon name={icon} />
      <span>{label}</span>
    </Badge>
  );
}
