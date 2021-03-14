import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Head from 'next/head'

import Markdown from '@/components/Markdown'
import Page from '@/components/Page'
import { faq } from '@/data/faq'

import remark from 'remark'
import strip from 'strip-markdown'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ heading, body }) => {
    let answer = ''

    remark()
      .use(strip)
      .process(body, function (err, file) {
        if (err) throw err
        answer = String(file)
      })

    return {
      '@type': 'Question',
      name: heading,
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'foo' + answer,
      },
    }
  }),
}

const Faq = () => (
  <Page title="Frequently Asked Questions">
    <Head>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </Head>
    {faq.map(({ heading, body }, index) => (
      <Box key={index} py={3}>
        <Box mb={2}>
          <Typography variant="h3">{heading}</Typography>
        </Box>
        <Markdown source={body} />
      </Box>
    ))}
  </Page>
)

export default Faq
