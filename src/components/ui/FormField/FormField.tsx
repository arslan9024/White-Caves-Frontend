/**
 * FormField — Theme-aware form input with label, error display, and password strength
 *
 * Uses design tokens from FormField.styles.ts for consistent styling.
 * Follows White Caves UI patterns: FC + memo, transient styled props (< 350 lines, AEG-042).
 */

import React, { FC, memo, useState, useId } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import type { PasswordStrength } from '@/utils/validation';
import {
  Wrapper,
  LabelRow,
  Label,
  RequiredStar,
  CharCount,
  InputWrapper,
  StyledInput,
  StyledTextarea,
  StyledSelect,
  TogglePasswordBtn,
  ErrorRow,
  HintText,
  ValidIcon,
  StrengthBar,
  StrengthSegment,
  StrengthLabel,
  STRENGTH_CONFIG,
} from './FormField.styles';

export interface FormFieldProps {
  /** Field name — must match schema key */
  name: string;
  /** Label text */
  label?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select';
  /** The placeholder text for the input */
  placeholder?: string;
  /** Current value */
  value: string | number;
  /** Error message (from useFormValidation) */
  error?: string;
  /** Whether field has been touched (for showing errors) */
  touched?: boolean;
  /** Change handler (from useFormValidation) */
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  /** Blur handler (from useFormValidation) */
  onBlur: (e: { target: { name: string } }) => void;
  /** Is this field required? (shows indicator) */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Password strength result (for password fields) */
  passwordStrength?: { strength: PasswordStrength; score: number; feedback: string[] };
  /** Select options */
  options?: { value: string; label: string }[];
  /** Max length (shows counter) */
  maxLength?: number;
  /** Auto-focus */
  autoFocus?: boolean;
  /** Extra class name */
  className?: string;
  /** Hint text below input */
  hint?: string;
}

const FormField: FC<FormFieldProps> = memo(function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  touched = false,
  onChange,
  onBlur,
  required: isRequired = false,
  disabled = false,
  passwordStrength,
  options,
  maxLength,
  autoFocus = false,
  className,
  hint,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const autoId = useId();
  const inputId = `field-${name}-${autoId}`;
  const errorId = `error-${name}-${autoId}`;

  const showError = touched && !!error;
  const isValid = touched && !error && String(value).length > 0;
  const currentLength = String(value).length;
  const isPasswordField = type === 'password';

  const renderInput = () => {
    const commonProps = {
      id: inputId,
      name,
      value: value ?? '',
      onChange,
      onBlur,
      placeholder,
      disabled,
      autoFocus,
      $hasError: showError,
      $isValid: isValid,
      'aria-invalid': showError || undefined,
      'aria-describedby': showError ? errorId : undefined,
      'aria-required': isRequired || undefined,
    };

    if (type === 'textarea') {
      return <StyledTextarea {...commonProps} maxLength={maxLength} />;
    }

    if (type === 'select') {
      return (
        <StyledSelect {...commonProps}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </StyledSelect>
      );
    }

    return (
      <StyledInput
        {...commonProps}
        type={isPasswordField && showPassword ? 'text' : type}
        maxLength={maxLength}
      />
    );
  };

  return (
    <Wrapper className={className}>
      {(label || maxLength) && (
        <LabelRow>
          {label && (
            <Label htmlFor={inputId}>
              {label}
              {isRequired && <RequiredStar aria-hidden="true">*</RequiredStar>}
            </Label>
          )}
          {maxLength && (
            <CharCount $over={currentLength > maxLength}>
              {currentLength}/{maxLength}
            </CharCount>
          )}
        </LabelRow>
      )}

      <InputWrapper>
        {renderInput()}
        {isPasswordField && (
          <TogglePasswordBtn
            type="button"
            onClick={() => setShowPassword(s => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </TogglePasswordBtn>
        )}
        {isValid && !isPasswordField && type !== 'textarea' && type !== 'select' && (
          <ValidIcon>
            <CheckCircle size={18} />
          </ValidIcon>
        )}
      </InputWrapper>

      {isPasswordField && passwordStrength && String(value).length > 0 && (
        <>
          <StrengthBar
            role="progressbar"
            aria-valuenow={passwordStrength.score}
            aria-valuemin={0}
            aria-valuemax={4}
          >
            {[1, 2, 3, 4].map(seg => (
              <StrengthSegment
                key={seg}
                $active={seg <= STRENGTH_CONFIG[passwordStrength.strength].segments}
                $color={STRENGTH_CONFIG[passwordStrength.strength].color}
              />
            ))}
          </StrengthBar>
          <StrengthLabel $color={STRENGTH_CONFIG[passwordStrength.strength].color}>
            {STRENGTH_CONFIG[passwordStrength.strength].label}
          </StrengthLabel>
        </>
      )}

      <ErrorRow role={showError ? 'alert' : undefined}>
        {showError ? (
          <>
            <AlertCircle size={14} />
            <span id={errorId}>{error}</span>
          </>
        ) : hint ? (
          <HintText>{hint}</HintText>
        ) : null}
      </ErrorRow>
    </Wrapper>
  );
});

export default FormField;
