export const AUTH_COPY = {
  en: {
    signInTitle: 'Welcome Back',
    signUpTitle: 'Create Account',
    signInSubtitle: 'Sign in to access your personalized dashboard',
    signUpSubtitle: 'Join White Caves to explore luxury properties in Dubai',
    socialLabel: 'Quick sign in with',
    google: 'Continue with Google (Gmail)',
    facebook: 'Facebook',
    apple: 'Apple',
    email: 'Email',
    phone: 'Phone',
    signInPromptText: 'Already have an account? Sign In',
    signUpPromptText: "Don't have an account? Sign Up",
  },
  ar: {
    signInTitle: 'مرحباً بعودتك',
    signUpTitle: 'إنشاء حساب',
    signInSubtitle: 'سجّل الدخول للوصول إلى لوحة التحكم الخاصة بك',
    signUpSubtitle: 'انضم إلى وايت كيفز لاستكشاف العقارات الفاخرة في دبي',
    socialLabel: 'تسجيل الدخول السريع عبر',
    google: 'المتابعة باستخدام جوجل (Gmail)',
    facebook: 'فيسبوك',
    apple: 'آبل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    signInPromptText: 'لديك حساب بالفعل؟ سجّل الدخول',
    signUpPromptText: 'ليس لديك حساب؟ أنشئ حساباً',
  },
} as const;

export type AuthLocale = keyof typeof AUTH_COPY;
export type AuthCopy = (typeof AUTH_COPY)[AuthLocale];

export const getAuthLocale = (): AuthLocale => {
  if (typeof document === 'undefined') return 'en';
  const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
  return lang.startsWith('ar') ? 'ar' : 'en';
};
