<template>
  <div
    ref="selectWrapper"
    v-click-outside:[popperPaneRef]="handleClose"
    class="ur-select"
    :class="[selectSize ? 'ur-select--' + selectSize : '']"
    @click.stop="toggleMenu"
  >
    <ur-popper
      ref="popper"
      v-model:visible="dropMenuVisible"
      placement="bottom-start"
      :append-to-body="popperAppendToBody"
      :popper-class="`ur-select__popper ${popperClass}`"
      manual-mode
      effect="light"
      pure
      trigger="click"
      transition="ur-zoom-in-top"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
      @before-enter="handleMenuEnter"
    >
      <template #trigger>
        <div class="select-trigger">
          <div
            v-if="multiple"
            ref="tags"
            class="ur-select__tags"
            :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }"
          >
            <span v-if="collapseTags && selected.length">
              <ur-tag
                :closable="!selectDisabled && !selected[0].isDisabled"
                :size="collapseTagSize"
                :hit="selected[0].hitState"
                type="info"
                disable-transitions
                @close="deleteTag($event, selected[0])"
              >
                <span class="ur-select__tags-text" :style="{ 'max-width': inputWidth - 123 + 'px' }">{{ selected[0].currentLabel }}</span>
              </ur-tag>
              <ur-tag
                v-if="selected.length > 1"
                :closable="false"
                :size="collapseTagSize"
                type="info"
                disable-transitions
              >
                <span class="ur-select__tags-text">+ {{ selected.length - 1 }}</span>
              </ur-tag>
            </span>
            <!-- <div> -->
            <transition v-if="!collapseTags" @after-leave="resetInputHeight">
              <span :style="{marginLeft: prefixWidth && selected.length ? `${prefixWidth}px` : null}">
                <ur-tag
                  v-for="item in selected"
                  :key="getValueKey(item)"
                  :closable="!selectDisabled && !item.isDisabled"
                  :size="collapseTagSize"
                  :hit="item.hitState"
                  type="info"
                  disable-transitions
                  @close="deleteTag($event, item)"
                >
                  <span class="ur-select__tags-text" :style="{ 'max-width': inputWidth - 75 + 'px' }">{{ item.currentLabel }}</span>
                </ur-tag>
              </span>
            </transition>
            <!-- </div> -->
            <input
              v-if="filterable"
              ref="input"
              v-model="query"
              type="text"
              class="ur-select__input"
              :class="[selectSize ? `is-${ selectSize }` : '']"
              :disabled="selectDisabled"
              :autocomplete="autocomplete"
              :style="{ marginLeft: prefixWidth && !selected.length || tagInMultiLine ? `${prefixWidth}px` : null, flexGrow: '1', width: `${inputLength / (inputWidth - 32)}%`, maxWidth: `${inputWidth - 42}px` }"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup="managePlaceholder"
              @keydown="resetInputState"
              @keydown.down.prevent="navigateOptions('next')"
              @keydown.up.prevent="navigateOptions('prev')"
              @keydown.esc.stop.prevent="visible = false"
              @keydown.enter.stop.prevent="selectOption"
              @keydown.delete="deletePrevTag"
              @keydown.tab="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              @input="debouncedQueryChange"
            >
          </div>
          <ur-input
            :id="id"
            ref="reference"
            v-model="selectedLabel"
            type="text"
            :placeholder="currentPlaceholder"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="{ 'is-focus': visible }"
            :tabindex="(multiple && filterable) ? '-1' : null"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @paste="debouncedOnInputChange"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.esc.stop.prevent="visible = false"
            @keydown.tab="visible = false"
            @mouseenter="inputHovering = true"
            @mouseleave="inputHovering = false"
          >
            <template v-if="$slots.prefix" #prefix>
              <div style="height: 100%;display: flex;justify-content: center;align-items: center">
                <slot name="prefix"></slot>
              </div>
            </template>
            <template #suffix>
              <ur-button
                v-show="!showClose"
                :class="['ur-select__caret', 'ur-input__icon', 'ur-icon-' + iconClass]
              ">
                <svg t="1617026397299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1173" width="200" height="200"><path d="M361.6 19.2L848 507.2 361.6 995.2l-128-126.4 366.4-361.6L225.6 129.6 350.4 8z" p-id="1174" fill="#8a8a8a"></path></svg>
              </ur-button>
              <i
                v-if="showClose && inputHovering"
                :class="`ur-select__caret ur-input__icon ${clearIcon}`"
                @click="handleClearClick"
              >
                <svg fill="#8a8a8a" t="1616246996292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7349" width="200" height="200"><path d="M851.456 755.419429q0 22.820571-16.018286 38.838857l-77.677714 77.677714q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-168.009143-168.009143-168.009143 168.009143q-16.018286 16.018286-38.838857 16.018286t-38.838857-16.018286l-77.677714-77.677714q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l168.009143-168.009143-168.009143-168.009143q-16.018286-16.018286-16.018286-38.838857t16.018286-38.838857l77.677714-77.677714q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l168.009143 168.009143 168.009143-168.009143q16.018286-16.018286 38.838857-16.018286t38.838857 16.018286l77.677714 77.677714q16.018286 16.018286 16.018286 38.838857t-16.018286 38.838857l-168.009143 168.009143 168.009143 168.009143q16.018286 16.018286 16.018286 38.838857z" p-id="7350"></path></svg>
              </i>
            </template>
          </ur-input>
        </div>
      </template>
      <template #default>
        <ur-select-menu>
          <ur-scrollbar
            v-show="options.size > 0 && !loading"
            ref="scrollbar"
            tag="ul"
            wrap-class="ur-select-dropdown__wrap"
            view-class="ur-select-dropdown__list"
            :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
          >
            <ur-option
              v-if="showNewOption"
              :value="query"
              :created="true"
            />
            <slot></slot>
          </ur-scrollbar>
          <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.size === 0 ))">
            <slot v-if="$slots.empty" name="empty"></slot>
            <p v-else class="ur-select-dropdown__empty">
              {{ emptyText }}
            </p>
          </template>
        </ur-select-menu>
      </template>
    </ur-popper>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  defineComponent,
  onMounted,
  onBeforeUnmount,
  nextTick,
  reactive,
  provide,
  computed,
} from 'vue'
import UrInput from '@/packages/input'
import UrOption from './option.vue'
import UrSelectMenu from './select-dropdown.vue'
import UrTag from '@/packages/tag'
import UrPopper from '@/packages/popper'
import UrScrollbar from '@/packages/scrollbar'
import { ClickOutside } from '@/directives'
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
import { t } from '@/locale'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@/utils/constants'
import { isValidComponentSize } from '@/utils/validators'
import { useSelect, useSelectStates } from './useSelect'
import { selectKey } from './token'
import { useFocus } from '@/hooks'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'UrSelect',
  componentName: 'UrSelect',
  components: {
    UrInput,
    UrSelectMenu,
    UrOption,
    UrTag,
    UrScrollbar,
    UrPopper,
  },
  directives: { ClickOutside },
  props: {
    name: String,
    id: String,
    modelValue: [Array, String, Number, Boolean, Object],
    autocomplete: {
      type: String,
      default: 'off',
    },
    automaticDropdown: Boolean,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: {
      type: String,
      default: '',
    },
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value',
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    clearIcon: {
      type: String,
      default: 'ur-icon-circle-close',
    },
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'remove-tag', 'clear', 'visible-change', 'focus', 'blur'],

  setup(props, ctx) {
    const states = useSelectStates(props)
    const {
      optionsArray,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      setSelected,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconClass,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      onOptionCreate,
      onOptionDestroy,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,

      reference,
      input,
      popper,
      tags,
      selectWrapper,
      scrollbar,
    } = useSelect(props, states, ctx)

    const { focus } = useFocus(reference)

    const {
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      cachedOptions,
      optionsCount,
      prefixWidth,
      tagInMultiLine,
    } = toRefs(states)

    provide(selectKey, reactive({
      props,
      options,
      optionsArray,
      cachedOptions,
      optionsCount,
      filteredOptionsCount,
      hoverIndex,
      handleOptionSelect,
      selectEmitter: states.selectEmitter,
      onOptionCreate,
      onOptionDestroy,
      selectWrapper,
      selected,
      setSelected,
    }))

    onMounted(() => {
      states.cachedPlaceHolder = currentPlaceholder.value = (props.placeholder || t('el.select.placeholder'))
      if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
        currentPlaceholder.value = ''
      }
      addResizeListener(selectWrapper.value as any, handleResize)
      if (reference.value && reference.value.$el) {
        const sizeMap = {
          medium: 36,
          small: 32,
          mini: 28,
        }
        const input = reference.value.input
        states.initialInputHeight = input.getBoundingClientRect().height || sizeMap[selectSize.value]
      }
      if (props.remote && props.multiple) {
        resetInputHeight()
      }
      nextTick(() => {
        if (reference.value.$el) {
          inputWidth.value = reference.value.$el.getBoundingClientRect().width
        }
        if (ctx.slots.prefix) {
          const inputChildNodes = reference.value.$el.childNodes
          const input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
          const prefix = reference.value.$el.querySelector('.ur-input__prefix')
          prefixWidth.value = Math.max(prefix.getBoundingClientRect().width + 5, 30)
          if (states.prefixWidth) {
            input.style.paddingLeft = `${Math.max(states.prefixWidth, 30)}px`
          }
        }
      })
      setSelected()
    })



    onBeforeUnmount(() => {
      removeResizeListener(selectWrapper.value as any, handleResize)
    })

    if (props.multiple && !Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, [])
    }
    if (!props.multiple && Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, '')
    }

    const popperPaneRef = computed(() => {
      return popper.value?.popperRef
    })

    return {
      tagInMultiLine,
      prefixWidth,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconClass,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,
      focus,

      reference,
      input,
      popper,
      popperPaneRef,
      tags,
      selectWrapper,
      scrollbar,
    }
  },
})
</script>
