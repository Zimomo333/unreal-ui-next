<template>
  <div
    class="ur-form-item"
    :class="formItemClass"
  >
    <LabelWrap
      :is-auto-width="labelStyle.width === 'auto'"
      :update-all="urForm.labelWidth === 'auto'"
    >
      <label
        v-if="label || $slots.label"
        :for="labelFor"
        class="ur-form-item__label"
        :style="labelStyle"
      >
        <slot name="label">{{ label }}</slot>
      </label>
    </LabelWrap>
    <div class="ur-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="ur-zoom-in-top">
        <slot
          v-if="shouldShowError"
          name="error"
          :error="validateMessage"
        >
          <div
            class="ur-form-item__error"
            :class="{
              'ur-form-item__error--inline':
                typeof inlineMessage === 'boolean'
                  ? inlineMessage
                  : urForm.inlineMessage || false
            }"
          >
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  inject,
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  toRefs,
  reactive,
} from 'vue'
import { NOOP } from '@vue/shared'
import AsyncValidator from 'async-validator'
import { RuleItem } from 'async-validator'
import LabelWrap from './label-wrap'
import { getPropByPath, useGlobalConfig } from '@/utils/util'
import { isValidComponentSize } from '@/utils/validators'
import mitt from 'mitt'
import { urFormKey, urFormItemKey, urFormEvents } from './token'

import type { PropType } from 'vue'
import type { UrFormContext, ValidateFieldCallback } from './token'

export default defineComponent({
  name: 'UrFormItem',
  componentName: 'UrFormItem',
  components: {
    LabelWrap,
  },
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: [Object, Array] as PropType<RuleItem | RuleItem[]>,
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: '',
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: {
      types: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
  },
  setup(props) {
    const formItemMitt = mitt()
    const $ELEMENT = useGlobalConfig()

    const urForm = inject(urFormKey, {} as UrFormContext)
    const validateState = ref('')
    const validateMessage = ref('')
    const validateDisabled = ref(false)

    const computedLabelWidth = ref('')

    const vm = getCurrentInstance()
    const isNested = computed(() => {
      let parent = vm.parent
      while (parent && parent.type.name !== 'UrForm') {
        if (parent.type.name === 'UrFormItem') {
          return true
        }
        parent = parent.parent
      }
      return false
    })


    let initialValue = undefined

    watch(
      () => props.error,
      val => {
        validateMessage.value = val
        validateState.value = val ? 'error' : ''
      }, {
        immediate: true,
      },
    )
    watch(
      () => props.validateStatus,
      val => {
        validateState.value = val
      },
    )

    const labelFor = computed(() => props.for || props.prop)
    const labelStyle = computed(() => {
      if (urForm.labelPosition === 'top') return {}
      const labelWidth = props.labelWidth || urForm.labelWidth
      if (labelWidth) {
        return {
          width: labelWidth,
        }
      }
      return {}
    })
    const contentStyle = computed(() => {
      if (urForm.labelPosition === 'top' || urForm.inline) {
        return {}
      }
      if (!props.label && !props.labelWidth && isNested.value) {
        return {}
      }
      const labelWidth = props.labelWidth || urForm.labelWidth
      const ret: Partial<CSSStyleDeclaration> = {}
      if (labelWidth === 'auto') {
        if (props.labelWidth === 'auto') {
          ret.marginLeft = computedLabelWidth.value
        } else if (urForm.labelWidth === 'auto') {
          ret.marginLeft = urForm.autoLabelWidth
        }
      } else {
        ret.marginLeft = labelWidth
      }
      return ret
    })
    const fieldValue = computed(() => {
      const model = urForm.model
      if (!model || !props.prop) {
        return
      }

      let path = props.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path, true).v
    })
    const isRequired = computed(() => {
      let rules = getRules()
      let required = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            required = true
            return false
          }
          return true
        })
      }
      return required
    })
    const urFormItemSize = computed(() => props.size || urForm.size)
    const sizeClass = computed(() => {
      return urFormItemSize.value || $ELEMENT.size
    })

    const validate = (trigger: string, callback: ValidateFieldCallback = NOOP) => {
      validateDisabled.value = false
      const rules = getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && props.required === undefined) {
        callback()
        return
      }
      validateState.value = 'validating'
      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[props.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[props.prop] = fieldValue.value
      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          validateState.value = !errors ? 'success' : 'error'
          validateMessage.value = errors ? errors[0].message : ''
          callback(validateMessage.value, invalidFields)
          urForm.emit?.(
            'validate',
            props.prop,
            !errors,
            validateMessage.value || null,
          )
        },
      )
    }

    const clearValidate = () => {
      validateState.value = ''
      validateMessage.value = ''
      validateDisabled.value = false
    }
    const resetField = () => {
      validateState.value = ''
      validateMessage.value = ''
      let model = urForm.model
      let value = fieldValue.value
      let path = props.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }
      let prop = getPropByPath(model, path, true)
      validateDisabled.value = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(initialValue)
      } else {
        prop.o[prop.k] = initialValue
      }
      // reset validateDisabled after onFieldChange triggered
      nextTick(() => {
        validateDisabled.value = false
      })
    }

    const getRules = () => {
      const formRules = urForm.rules
      const selfRules = props.rules
      const requiredRule =
        props.required !== undefined ? { required: !!props.required } : []

      const prop = getPropByPath(formRules, props.prop || '', false)
      const normalizedRule = formRules
        ? (prop.o[props.prop || ''] || prop.v)
        : []

      return [].concat(selfRules || normalizedRule || []).concat(requiredRule)
    }
    const getFilteredRule = trigger => {
      const rules = getRules()

      return rules
        .filter(rule => {
          if (!rule.trigger || trigger === '') return true
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1
          } else {
            return rule.trigger === trigger
          }
        })
        .map(rule => ({ ...rule }))
    }

    const onFieldBlur = () => {
      validate('blur')
    }

    const onFieldChange = () => {
      if (validateDisabled.value) {
        validateDisabled.value = false
        return
      }

      validate('change')
    }
    const updateComputedLabelWidth = width => {
      computedLabelWidth.value = width ? `${width}px` : ''
    }

    const addValidateEvents = () => {
      const rules = getRules()

      if (rules.length || props.required !== undefined) {
        formItemMitt.on('ur.form.blur', onFieldBlur)
        formItemMitt.on('ur.form.change', onFieldChange)
      }
    }
    const removeValidateEvents = () => {
      formItemMitt.off('ur.form.blur', onFieldBlur)
      formItemMitt.off('ur.form.change', onFieldChange)
    }

    const urFormItem = reactive({
      ...toRefs(props),
      size: sizeClass,
      validateState,
      removeValidateEvents,
      addValidateEvents,
      resetField,
      clearValidate,
      validate,
      formItemMitt,
      updateComputedLabelWidth,
    })

    onMounted(() => {
      if (props.prop) {
        urForm.formMitt?.emit(urFormEvents.addField, urFormItem)

        let value = fieldValue.value
        initialValue = Array.isArray(value)
          ? [...value] : value

        addValidateEvents()
      }
    })
    onBeforeUnmount(() => {
      urForm.formMitt?.emit(urFormEvents.removeField, urFormItem)
    })

    provide(urFormItemKey, urFormItem)

    const formItemClass = computed(() => [
      {
        'ur-form-item--feedback': urForm.statusIcon,
        'is-error': validateState.value === 'error',
        'is-validating': validateState.value === 'validating',
        'is-success': validateState.value === 'success',
        'is-required': isRequired.value || props.required,
        'is-no-asterisk': urForm.hideRequiredAsterisk,
      },
      sizeClass.value ? 'ur-form-item--' + sizeClass.value : '',
    ])

    const shouldShowError = computed(() => {
      return validateState.value === 'error' && props.showMessage && urForm.showMessage
    })

    return {
      formItemClass,
      shouldShowError,
      urForm,
      labelStyle,
      contentStyle,
      validateMessage,
      labelFor,
      resetField,
      clearValidate,
    }
  },
})
</script>
