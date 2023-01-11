<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">공고 정보</h3>

    <div class="mt-8">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="id" label="ID">
          <n-input v-model:value="model.id" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="age" label="AGE">
          <n-input v-model:value="model.age" @keydown.enter.prevent />
        </n-form-item>

        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="model.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          ref="rPasswordFormItemRef"
          first
          path="reenteredPassword"
          label="Re-enter Password"
        >
          <n-input
            v-model:value="model.reenteredPassword"
            :disabled="!model.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                :disabled="model.age === null"
                round
                type="primary"
                @click="handleValidateButtonClick"
              >
                Validate
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRouter } from "vue-router";
import { FormInst, FormItemInst, FormItemRule, FormValidationError, useMessage, FormRules } from 'naive-ui'

interface ModelType {
  id: string | null
  name: string | null
  age: string | null
  password: string | null
  reenteredPassword: string | null
}

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      id: null,
      name: null,
      age: null,
      password: null,
      reenteredPassword: null
    })
    function validatePasswordStartWith (
      rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame (rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password
    }

    //유효성
    const rules: FormRules = {
      age: [
        {
          required: true,
          validator (rule: FormItemRule, value: string) {
            if (!value) {
              return new Error('Age is required')
            } else if (!/^\d*$/.test(value)) {
              return new Error('Age should be an integer')
            } else if (Number(value) < 18) {
              return new Error('Age should be above 18')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: 'Password is required'
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: 'Re-entered password is required',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: 'Password is not same as re-entered password!',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: 'Password is not same as re-entered password!',
          trigger: ['blur', 'password-input']
        }
      ]
    }
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput () {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
        }
      },
      handleValidateButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate(
          (errors: Array<FormValidationError> | undefined) => {
            if (!errors) {
              message.success('Valid')
            } else {
              message.error('Invalid')
            }
          }
        )
      }
    }
  }
})
</script>