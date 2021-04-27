import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const pink = '#ff0083'
const bg = '#1b242e'

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: { paper: '#151c24', default: bg },
    primary: {
      main: pink,
    },
    error: {
      main: pink,
    },
    text: {
      primary: '#dddddd',
    },
    secondary: {
      main: bg,
    },
  },

  typography: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    h1: { fontFamily: 'Poppins, sans-serif', fontSize: '70%', color: pink },
    h2: { fontFamily: 'Poppins, sans-serif', fontSize: '40%', marginBottom: '.7em' },
    h3: { fontFamily: 'Poppins, sans-serif', fontSize: '26%', marginBottom: '1em' },
    h4: {
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontSize: '25%',
      fontWeight: 'normal',
      marginBottom: '.5em',
    },
    subtitle1: { fontSize: '40%', lineHeight: '1.55' },
  },
})
theme = responsiveFontSizes(theme, { factor: 3 })

export default theme
