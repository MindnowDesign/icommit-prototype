import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  getMeasureOwnerById,
  getMeasureOwnerInitials,
  type MeasureOwner,
} from "../../data/measureOwners";

interface MeasureOwnerDisplayProps {
  ownerId: string;
  size?: "sm" | "md";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "size-6 text-[10px]",
  md: "size-8 text-xs",
} as const;

export function MeasureOwnerDisplay({
  ownerId,
  size = "sm",
  className,
}: MeasureOwnerDisplayProps) {
  const owner = getMeasureOwnerById(ownerId);

  if (!owner) {
    return (
      <span className="text-sm text-[#989898] truncate">Unassigned</span>
    );
  }

  return (
    <MeasureOwnerChip owner={owner} size={size} className={className} />
  );
}

export function MeasureOwnerChip({
  owner,
  size = "sm",
  showJobTitle = false,
  className,
}: {
  owner: MeasureOwner;
  size?: "sm" | "md";
  showJobTitle?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 min-w-0 ${className ?? ""}`}>
      <Avatar className={SIZE_CLASSES[size]}>
        <AvatarImage src={owner.avatarUrl} alt={owner.name} />
        <AvatarFallback className="bg-[#f0f8ff] text-[#0b446f] font-semibold">
          {getMeasureOwnerInitials(owner.name)}
        </AvatarFallback>
      </Avatar>
      <span className="flex min-w-0 items-center gap-2">
        <span className="truncate text-sm text-[#656565]" title={owner.name}>
          {owner.name}
        </span>
        {showJobTitle && (
          <>
            <span className="h-3.5 w-px shrink-0 bg-[#dcdcdc]" aria-hidden />
            <span className="truncate text-sm text-[#989898]" title={owner.jobTitle}>
              {owner.jobTitle}
            </span>
          </>
        )}
      </span>
    </span>
  );
}
