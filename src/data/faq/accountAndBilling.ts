import { trialPeriod } from '@/constants'
import { TFunction } from 'next-i18next'

const accountAndBilling = (t: TFunction) => [
  {
    id: 'payment-provider',
    category: 'accountAndBilling',
    heading: t('common:faq.payment-provider.heading', 'Who is the payment provider?'),
    body: t(
      'common:faq.payment-provider.body',
      `We work with [Stripe](https://stripe.com/) as our payment provider. We don't store any payment related information whatsoever.`,
    ),
  },
  {
    id: 'payment-methods',
    category: 'accountAndBilling',
    heading: t('common:faq.payment-methods.heading', 'What payment methods are supported?'),
    body: t(
      'common:faq.payment-methods.body',
      `Our payment provider [Stripe](https://stripe.com/) offers a variety of payment options: Google Pay, Credit Card (VISA, Mastercard, American Express, etc.) among many others. Once you choose a premium plan you get redirected to Stripe where you can select your preferred method.`,
    ),
  },
  {
    id: 'subscriptions',
    category: 'accountAndBilling',
    heading: t('common:faq.subscriptions.heading', 'How do subscriptions work?'),
    body: t(
      'common:faq.subscriptions.body',
      `Once you subscribe to a premium plan, you get instant access to the corresponding features for as long as the subscription lasts. You will be billed every month or year, based on the selected billing interval. A subscription can be cancelled anytime.`,
    ),
  },
  {
    id: 'trial',
    category: 'accountAndBilling',
    heading: t('common:faq.trial.heading', 'How do trials work?'),
    body: t('common:faq.trial.body', {
      defaultValue: `**Try before you buy**: You can test all premium features for a **{{ trialPeriod }} day trial period**. Once the trial ends you will be billed based on your chosen plan. Cancellations during the trial period result in the immediate termination of the subscription - **no billing** will be made in such case.`,
      trialPeriod,
    }),
  },
  {
    id: 'end-subscription',
    category: 'accountAndBilling',
    heading: t('common:faq.end-subscription.heading', 'How do I cancel a subscription?'),
    body: t(
      'common:faq.end-subscription.body',
      `Sign in to the [account page](/account). Under the "Subscription" tab you can cancel your subscription anytime, **no questions asked**.`,
    ),
  },
]
export default accountAndBilling
