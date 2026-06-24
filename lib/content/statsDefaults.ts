// Statistics / Achievements section — default content (single source of truth).
export interface StatItem {
  icon: string;
  /** Display value, e.g. "500" or "India + Global" */
  value: string;
  suffix: string;
  label: string;
  /** Count-up animation (only applies to numeric values) */
  animate: boolean;
}

export interface StatsContent {
  items: StatItem[];
}

export const STATS_DEFAULTS: StatsContent = {
  items: [
    { icon: "🏆", value: "500", suffix: "+", label: "Licences Obtained", animate: true },
    { icon: "🏢", value: "1000", suffix: "+", label: "Businesses Served", animate: true },
    { icon: "🌐", value: "India + Global", suffix: "", label: "Market Expansion Support", animate: false },
    { icon: "🤝", value: "100", suffix: "+", label: "Associate Professionals", animate: true },
  ],
};
