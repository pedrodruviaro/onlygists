<script setup lang="ts">
import PublicHeadline from '~/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import GistCodeSnippet from '~/modules/gists/components/CodeSnippet/CodeSnippet.vue'
import LazyDialogPaymentSuccess from '~/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import LazyDialogPaymentError from '~/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'

const route = useRoute()
const isPaymentSuccessfully = ref(false)
const isPaymentFailed = ref(false)

onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if (success_payment) isPaymentSuccessfully.value = true
  if (fail_payment) isPaymentFailed.value = true
})
</script>

<template>
  <PublicHeadline
    title="useSession.ts"
    description="pega a ***seção*** do usuário logado na *aplicação*"
    author="pedrodruviaro"
    lang="typescript"
  />

  <GistCodeSnippet :isPaid="true" :loading="false" lang="typescript" />

  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFailed" />
</template>
