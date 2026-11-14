/**
 * WCAG 2.1 AA accessibility label guard (Point 52).
 */
export function hasAccessibleLabel(props: {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
}): boolean {
  return Boolean(
    props['aria-label']?.trim() || props['aria-labelledby']?.trim() || props.title?.trim()
  );
}
