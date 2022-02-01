import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Paper, Button, Backdrop, Typography } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { useTranslation } from 'next-i18next'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { formatBytes } from '@/utils/index'
import { Error } from '@/components/Error'
import { limits } from '@/constants'

const maxFileSize = limits.visitor.maxFileSize // @todo

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      borderStyle: 'dashed',
      borderWidth: '2px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(5),
      color: theme.palette.text.secondary,
      height: '100%',
      flexDirection: 'column',
      textAlign: 'center',
    },
  }),
)

interface DropZoneProps {
  onChange(file: File): void
}
const DropZone: React.FC<DropZoneProps> = ({ onChange }) => {
  const classes = useStyles()
  const { t } = useTranslation('components')
  const [error, setError] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFilesInput(acceptedFiles)
    },
    noClick: true,
    noKeyboard: true,
    disabled: false,
  })

  const handleFilesInput = (files: File[] | FileList) => {
    setError('')

    console.log('files in', files)

    // Custom error handling
    if (!files.length) {
      setError(t('components:DropZone.error.noFiles', 'No file selected. Please try another file.'))
      return
    }

    // We only allow one file for now.
    if (files.length > 1) {
      setError(t('components:DropZone.error.tooManyFiles', 'Too many files'))
      return
    }
    const file = files[0]

    setFile(file)

    if (file.size > maxFileSize) {
      setError(
        t('components:DropZone.error.fileToLarge', {
          defaultValue: 'File too large. Maximum file size is {{max}}.',
          max: formatBytes(maxFileSize),
        }),
      )
      return
    }

    onChange(file)
  }

  return (
    <div {...getRootProps()}>
      <Backdrop open={isDragActive} style={{ zIndex: 100 }}>
        <Typography variant="h2" gutterBottom style={{ color: '#fff', textAlign: 'center' }}>
          {t('components:DropZone.backdrop', `Drop It Like It's Hot`)}
        </Typography>
      </Backdrop>
      <Paper elevation={0} variant="outlined" className={classes.paper}>
        <input
          {...getInputProps()}
          id="file-input"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              handleFilesInput(e.target.files)
            }
          }}
        />
        <p>
          {t(
            'components:DropZone.dragAndDrop',
            'Drag & drop files here, or click the button select files.',
          )}
        </p>
        <label htmlFor="file-input">
          <Button component="span" variant="outlined" startIcon={<CloudUpload />}>
            {t('components:DropZone.button', 'Select files')}
          </Button>
        </label>
      </Paper>
      {file && (
        <div>
          {file.name} - {formatBytes(file.size)}
        </div>
      )}
      {error && <Error error={error} />}
    </div>
  )
}

export default DropZone
