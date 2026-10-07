import { createTheme } from '@mui/material/styles';

export const grasshootsBrand = {
  ink: '#101820',
  hootGreen: '#65C878',
  fieldGreen: '#246B4A',
  signal: '#D6F45A',
  chalk: '#F5F6F1',
  paper: '#FFFFFF',

  textSecondary: '#5E6870',
  divider: '#DDE3DF',
} as const;

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: grasshootsBrand.hootGreen,
      contrastText: grasshootsBrand.ink,
    },

    secondary: {
      main: grasshootsBrand.fieldGreen,
      contrastText: '#FFFFFF',
    },

    background: {
      default: grasshootsBrand.chalk,
      paper: grasshootsBrand.paper,
    },

    text: {
      primary: grasshootsBrand.ink,
      secondary: grasshootsBrand.textSecondary,
    },

    divider: grasshootsBrand.divider,
  },

  typography: {
    fontFamily: [
      'Manrope',
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),

    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },

    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 8,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: 'none',
          minHeight: 40,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${grasshootsBrand.divider}`,
          boxShadow: '0 1px 2px rgba(16, 24, 32, 0.05)',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: grasshootsBrand.paper,
          color: grasshootsBrand.ink,
          borderBottom: `1px solid ${grasshootsBrand.divider}`,
        },
      },
    },
  },
});