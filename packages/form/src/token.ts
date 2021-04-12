import type { InjectionKey } from 'vue'
import type { Emitter } from 'mitt'
import type {
  FieldErrorList,
} from 'async-validator'

export interface UrFormContext {
  registerLabelWidth(width: number, oldWidth: number): void
  deregisterLabelWidth(width: number): void
  autoLabelWidth: string | undefined
  formMitt: Emitter
  emit: (evt: string, ...args: any[]) => void
  labelSuffix: string
  inline?: boolean
  model?: Record<string, unknown>
  size?: string
  showMessage?: boolean
  labelPosition?: string
  labelWidth?: string
  rules?: Record<string, unknown>
  statusIcon?: boolean
  hideRequiredAsterisk?: boolean
  disabled?: boolean
}

export interface ValidateFieldCallback {
  (message?: string, invalidFields?: FieldErrorList): void
}

export interface UrFormItemContext {
  prop?: string
  formItemMitt: Emitter
  size: ComponentSize
  validateState: string
  validate(trigger?: string, callback?: ValidateFieldCallback): void
  updateComputedLabelWidth(width: number): void
  addValidateEvents(): void
  removeValidateEvents(): void
  resetField(): void
  clearValidate(): void
}

// TODO: change it to symbol
export const urFormKey: InjectionKey<UrFormContext> = 'urForm' as any

export const urFormItemKey: InjectionKey<UrFormItemContext> = 'urFormItem' as any

export const urFormEvents = {
  addField: 'ur.form.addField',
  removeField: 'ur.form.removeField',
} as const
