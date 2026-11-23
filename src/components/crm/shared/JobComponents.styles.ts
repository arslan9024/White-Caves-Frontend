/* ============================================================================
 * JobComponents Styled Components Barrel Entry Point
 * Re-exports sub-style modules to satisfy AEG-042 (<350 lines).
 * ============================================================================ */

export {
  JobPostComposer,
  NotificationToast,
  FormFieldError,
  ErrorMessage,
  PlatformError,
  ComposerHeader,
  HeaderIcon,
  HeaderInfo,
  PlatformSelection,
  PlatformsRow,
  PlatformChip,
} from './JobComposerLayout.styles';

export {
  JobForm,
  FormSection,
  FormGrid,
  FormField,
  InputWithIcon,
  SalaryRange,
  ComposerActions,
  ActionBtn,
} from './JobFormElements.styles';

export {
  JobPreview,
  PreviewCard,
  PreviewHeader,
  PreviewMeta,
  PreviewSection,
} from './JobPreview.styles';
