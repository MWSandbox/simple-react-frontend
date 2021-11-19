import './RootPage.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import CounterTable from '../components/CounterTable/CounterTable';

export default function RootPage() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme =
    createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light'
      }
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="pageContainer">
        <div id="pageContent">
          <h1>Simple React Frontend</h1>
          <CounterTable />
        </div>
      </div>
    </ThemeProvider>

  );
}
