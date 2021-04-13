<template>
  <div
    :class="[
      type === 'textarea' ? 'ur-textarea' : 'ur-input',
      inputSize ? 'ur-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'ur-input-group': $slots.prepend || $slots.append,
        'ur-input-group--append': $slots.append,
        'ur-input-group--prepend': $slots.prepend,
        'ur-input--prefix': $slots.prefix || prefixIcon,
        'ur-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
      },
      $attrs.class
    ]"
    :style="$attrs.style"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div v-if="$slots.prepend" class="ur-input-group__prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        class="ur-input__inner"
        v-bind="attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      >
      <!-- 前置内容 -->
      <span v-if="$slots.prefix || prefixIcon" class="ur-input__prefix">
        <slot name="prefix"></slot>
        <i
          v-if="prefixIcon"
          :class="['ur-input__icon', prefixIcon]"
        ></i>
      </span>
      <!-- 后置内容 -->
      <span v-if="getSuffixVisible()" class="ur-input__suffix">
        <span class="ur-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i v-if="suffixIcon" :class="['ur-input__icon', suffixIcon]"></i>
          </template>
          <i
            v-if="showClear"
            class="ur-input__icon ur-icon-circle-close ur-input__clear"
            @mousedown.prevent
            @click="clear"
          >
            <svg fill="#8a8a8a" t="1616246996292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7349" width="200" height="200"><path d="M851.456 755.419429q0 22.820571-16.018286 38.838857l-77.677714 77.677714q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-168.009143-168.009143-168.009143 168.009143q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-77.677714-77.677714q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l168.009143-168.009143-168.009143-168.009143q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l77.677714-77.677714q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l168.009143 168.009143 168.009143-168.009143q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l77.677714 77.677714q16.018286 16.018286 16.018286 38.838857t-16.018286 38.838857l-168.009143 168.009143 168.009143 168.009143q16.018286 16.018286 16.018286 38.838857z" p-id="7350"></path></svg>
          </i>
          <i v-if="showPwdVisible" class="ur-input__icon ur-icon-view ur-input__clear" @click="handlePasswordVisible">
            <svg fill="#8a8a8a" t="1616247476651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13061" width="200" height="200"><path d="M662.257 382.457c0 32.885-25.799 59.2-58.201 59.2-32.371 0-58.686-26.315-58.686-59.2 0-32.371 26.315-58.686 58.686-58.686 4.058 0 7.6 1.514 11.657 2.028-29.343-20.743-65.285-33.401-103.715-33.401-100.201 0-181.142 81.971-181.142 183.172 0 100.657 80.944 182.629 181.142 182.629 100.171 0 181.115-81.971 181.115-182.629 0-38.971-12.657-75.399-33.401-104.742 1.029 4.059 2.544 7.601 2.544 11.63zM1014.371 457.858c-84.485-154.829-283.827-311.142-502.371-311.142-218.571 0-417.915 156.314-501.886 311.142l-10.114 17.713 10.114 17.686c83.972 154.315 283.315 311.142 501.886 311.142 218.544 0 417.885-156.829 502.371-311.142l9.629-17.686-9.629-17.713zM512 731.571c-180.114 0-350.629-129.028-428.542-256 77.914-127.514 248.428-256 428.542-256 180.085 0 350.599 128.486 428.515 256-77.915 126.972-248.43 256-428.515 256z" p-id="13062"></path></svg>
          </i>
          <span v-if="isWordLimitVisible" class="ur-input__count">
            <span class="ur-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <i v-if="validateState" :class="['ur-input__icon', 'ur-input__validateIcon', validateIcon]"></i>
      </span>
      <!-- 后置元素 -->
      <div v-if="$slots.append" class="ur-input-group__append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      ref="textarea"
      class="ur-textarea__inner"
      v-bind="attrs"
      :tabindex="tabindex"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="textareaStyle"
      :aria-label="label"
      :placeholder="placeholder"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    >
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="ur-input__count">{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  inject,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
  ref,
  shallowRef,
  onMounted,
  onUpdated,
} from 'vue'
import { useAttrs } from '@/hooks'
import { UPDATE_MODEL_EVENT, VALIDATE_STATE_MAP } from '@/utils/constants'
import { isObject, useGlobalConfig } from '@/utils/util'
import isServer from '@/utils/isServer'
import { isKorean } from '@/utils/isDef'
import { isValidComponentSize } from '@/utils/validators'
import { urFormKey, urFormItemKey } from '@/packages/form'
import calcTextareaHeight from './calcTextareaHeight'

import type { PropType } from 'vue'
import type { UrFormContext, UrFormItemContext } from '@/packages/form'

type AutosizeProp = {
  minRows?: number
  maxRows?: number
} | boolean

const PENDANT_MAP = {
  suffix: 'append',
  prefix: 'prepend',
}

export default defineComponent({
  name: 'UrInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    resize: {
      type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
      validator: (val: string) => ['none', 'both', 'horizontal', 'vertical'].includes(val),
    },
    autosize: {
      type: [Boolean, Object] as PropType<AutosizeProp>,
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
      validator: (val: string) => ['on', 'off'].includes(val),
    },
    placeholder: {
      type: String,
    },
    form: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
    },
    tabindex: {
      type: String,
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },

  emits: [UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear',
    'mouseleave', 'mouseenter', 'keydown'],

  setup(props, ctx) {
    const instance = getCurrentInstance()
    const attrs = useAttrs()
    const $ELEMENT = useGlobalConfig()

    const urForm = inject(urFormKey, {} as UrFormContext)
    const urFormItem = inject(urFormItemKey, {} as UrFormItemContext)

    const input = ref(null)
    const textarea = ref (null)
    const focused = ref(false)
    const hovering = ref(false)
    const isComposing = ref(false)
    const passwordVisible = ref(false)
    const _textareaCalcStyle = shallowRef({})

    const inputOrTextarea = computed(() => input.value || textarea.value)
    const inputSize = computed(() => props.size || urFormItem.size || $ELEMENT.size)
    const needStatusIcon = computed(() => urForm.statusIcon)
    const validateState = computed(() => urFormItem.validateState || '')
    const validateIcon = computed(() => VALIDATE_STATE_MAP[validateState.value])
    const textareaStyle = computed(() => ({
      ..._textareaCalcStyle.value,
      resize: props.resize,
    }))
    const inputDisabled = computed(() => props.disabled || urForm.disabled)
    const nativeInputValue = computed(() => (props.modelValue === null || props.modelValue === undefined) ? '' : String(props.modelValue))
    const upperLimit = computed(() => ctx.attrs.maxlength)
    const showClear = computed(() => {
      return props.clearable &&
        !inputDisabled.value &&
        !props.readonly &&
        nativeInputValue.value &&
        (focused.value || hovering.value)
    })
    const showPwdVisible = computed(() => {
      return props.showPassword &&
        !inputDisabled.value &&
        !props.readonly &&
        (!!nativeInputValue.value || focused.value)
    })
    const isWordLimitVisible = computed(() => {
      return props.showWordLimit &&
        ctx.attrs.maxlength &&
        (props.type === 'text' || props.type === 'textarea') &&
        !inputDisabled.value &&
        !props.readonly &&
        !props.showPassword
    })
    const textLength = computed(() => {
      return typeof props.modelValue === 'number' ? String(props.modelValue).length : (props.modelValue || '').length
    })
    const inputExceed = computed(() => {
      // show exceed style if length of initial value greater then maxlength
      return isWordLimitVisible.value && (textLength.value > upperLimit.value)
    })

    const resizeTextarea = () => {
      const { type, autosize } = props

      if (isServer || type !== 'textarea') return

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0
        _textareaCalcStyle.value = calcTextareaHeight(textarea.value, minRows, maxRows)
      } else {
        _textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight,
        }
      }
    }

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    const calcIconOffset = place => {
      const { el } = instance.vnode
      const elList: HTMLSpanElement[] = Array.from(el.querySelectorAll(`.ur-input__${place}`))
      const target = elList.find(item => item.parentNode === el)

      if (!target) return

      const pendant = PENDANT_MAP[place]

      if (ctx.slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${el.querySelector(`.ur-input-group__${pendant}`).offsetWidth}px)`
      } else {
        target.removeAttribute('style')
      }
    }

    const updateIconOffset = () => {
      calcIconOffset('prefix')
      calcIconOffset('suffix')
    }

    const handleInput = event => {
      const { value } = event.target

      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (isComposing.value) return

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (value === nativeInputValue.value) return

      ctx.emit(UPDATE_MODEL_EVENT, value)
      ctx.emit('input', value)

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      nextTick(setNativeInputValue)
    }

    const handleChange = event => {
      ctx.emit('change', event.target.value)
    }

    const focus = () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      nextTick(() => {
        inputOrTextarea.value.focus()
      })
    }

    const blur = () => {
      inputOrTextarea.value.blur()
    }

    const handleFocus = event => {
      focused.value = true
      ctx.emit('focus', event)
    }

    const handleBlur = event => {
      focused.value = false
      ctx.emit('blur', event)
      if (props.validateEvent) {
        urFormItem.formItemMitt?.emit('ur.form.blur', [props.modelValue])
      }
    }

    const select = () => {
      inputOrTextarea.value.select()
    }

    const handleCompositionStart = () => {
      isComposing.value = true
    }

    const handleCompositionUpdate = event => {
      const text = event.target.value
      const lastCharacter = text[text.length - 1] || ''
      isComposing.value = !isKorean(lastCharacter)
    }

    const handleCompositionEnd = event => {
      if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
      }
    }

    const clear = () => {
      ctx.emit(UPDATE_MODEL_EVENT, '')
      ctx.emit('change', '')
      ctx.emit('clear')
    }

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value
      focus()
    }

    const getSuffixVisible = () => {
      return ctx.slots.suffix ||
        props.suffixIcon ||
        showClear.value ||
        props.showPassword ||
        isWordLimitVisible.value ||
        (validateState.value && needStatusIcon.value)
    }

    watch(() => props.modelValue, val => {
      nextTick(resizeTextarea)
      if (props.validateEvent) {
        urFormItem.formItemMitt?.emit('el.form.change', [val])
      }
    })

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => {
      setNativeInputValue()
    })

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    watch(() => props.type, () => {
      nextTick(() => {
        setNativeInputValue()
        resizeTextarea()
        updateIconOffset()
      })
    })

    onMounted(() => {
      setNativeInputValue()
      updateIconOffset()
      nextTick(resizeTextarea)
    })

    onUpdated(() => {
      nextTick(updateIconOffset)
    })

    const onMouseLeave = e => {
      hovering.value = false
      ctx.emit('mouseleave', e)
    }

    const onMouseEnter = e => {
      hovering.value = true
      ctx.emit('mouseenter', e)
    }

    const handleKeydown = e => {
      ctx.emit('keydown', e)
    }

    return {
      input,
      textarea,
      attrs,
      inputSize,
      validateState,
      validateIcon,
      textareaStyle,
      resizeTextarea,
      inputDisabled,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      upperLimit,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      inputOrTextarea,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handlePasswordVisible,
      clear,
      select,
      focus,
      blur,
      getSuffixVisible,
      onMouseLeave,
      onMouseEnter,
      handleKeydown,
    }
  },
})

</script>
