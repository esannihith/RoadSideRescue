export interface OnboardingFooterItem {
  icon: string;
  color: string;
  label: string;
}

export interface OnboardingItem {
  id: string;
  image: any;
  title: string;
  description: string;
  footer: OnboardingFooterItem[];
}
