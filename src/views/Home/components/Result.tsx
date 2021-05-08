import React, { useState } from 'react'

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import {
  Box,
  FormControlLabel,
  Switch,
  CircularProgress,
  Paper,
  Typography,
} from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ArrowBack, Share } from '@material-ui/icons'
import { RWebShare } from 'react-web-share'

import { sanitizeUrl } from '@/utils/index'
import BaseButton from '@/components/BaseButton'
import Spacer from '@/components/Spacer'
import { State } from '../index'
import { isProduction } from '@/config'
import { UserSettingsFields } from '@/api/models/UserSettings'
import { emojiShortUrl } from '@/constants'
import { useSession } from 'next-auth/client'

type ResultProps = Pick<State, 'data'> &
  Pick<UserSettingsFields, 'isEmojiShortLinkEnabled'> & {
    onReset: () => void
  }

const Result: React.FunctionComponent<ResultProps> = ({
  data,
  onReset,
  isEmojiShortLinkEnabled,
}) => {
  const alias = data?.alias
  const encryptionKey = data?.encryptionKey
  const [session] = useSession()
  const [hasCopied, setHasCopied] = useState(false)
  // Form options
  const [isEmojiLinkEnabled, setIsEmojiLinkEnabled] = React.useState(isEmojiShortLinkEnabled)

  const origin =
    isProduction && isEmojiLinkEnabled
      ? emojiShortUrl
      : `${sanitizeUrl(process.env.NEXT_PUBLIC_BASE_URL)}/l`
  const shortenedUrl = alias ? `${origin}/${alias}#${encryptionKey}` : null

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmojiLinkEnabled(event.target.checked)
  }

  return (
    <Spacer flexDirection="column" spacing={2} marginY={1}>
      <style
        dangerouslySetInnerHTML={{
          __html: `.web-share-fade { color: #1b242e; }`, // For react-web-share
        }}
      />
      {data && (
        <Box my={2}>
          <BaseButton
            startIcon={<ArrowBack />}
            size="small"
            variant="text"
            color="secondary"
            onClick={onReset}
          >
            Create new secret
          </BaseButton>
          {shortenedUrl && (
            <Paper elevation={3}>
              <Box px={4} pt={4} pb={3}>
                <Box mb={4} display="flex" flexDirection="column">
                  <Typography variant="h4" align="center" component="div" noWrap>
                    {shortenedUrl}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  <Box mx={1}>
                    <RWebShare
                      data={{
                        text: `You received a secret: ${shortenedUrl} \n \nReply with a secret:`,
                        title: 'Share your secret link:',
                      }}
                    >
                      <BaseButton startIcon={<Share />} color="primary" size="large">
                        Share
                      </BaseButton>
                    </RWebShare>
                  </Box>
                  <Box mx={1}>
                    <CopyToClipboard
                      text={shortenedUrl}
                      options={{ format: 'text/plain' }}
                      onCopy={() => {
                        setHasCopied(true)
                        setTimeout(() => {
                          setHasCopied(false)
                        }, 2000)
                      }}
                    >
                      <BaseButton
                        startIcon={<FileCopyOutlinedIcon />}
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        {hasCopied ? 'Copied' : 'Copy'}
                      </BaseButton>
                    </CopyToClipboard>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
          <Box p={1} display="flex">
            {session && (
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={isEmojiLinkEnabled}
                    onChange={handleSwitchChange}
                    name="emojiLink"
                    color="secondary"
                  />
                }
                label="Use emoji link"
              />
            )}

            <Box ml="auto" px={1}>
              <Typography color="textSecondary" variant="caption">
                {data?.message || (
                  <>
                    <CircularProgress size=".8em" color="inherit" /> Encrypt and save…
                  </>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Spacer>
  )
}

export default Result
