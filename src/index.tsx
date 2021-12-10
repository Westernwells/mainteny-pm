import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles';

import {App} from './App';
import {theme} from './theme';
import {store} from './redux/store';

const queryClient = new QueryClient();

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.querySelector('#root'),
);
