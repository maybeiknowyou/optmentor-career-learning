export interface BadgeDefinition { id: string; title: string; description: string; requirement: string; icon: string }
export interface EarnedBadge extends BadgeDefinition { earnedAt: string }
