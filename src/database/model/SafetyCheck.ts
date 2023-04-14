export enum Issues {
  BLOATED_CANS,
  UNSAFE_BAGS,
  STALE_BAKERY,
  ROTTEN_FRUITS_OR_VEGETABLES,
}

export default interface SafetyCheck {
  expired: boolean;
  leaking: boolean;
  spoiled: boolean;
  issues: Issues[];
  cookedisExpired: boolean;
  cookedIsHot: boolean;
  cookedIsSafe: boolean;
  cookedIsLeaking: boolean;
  cookedIsSpoiled: boolean;
  verified: boolean;
  additionalNotes: string;
}
