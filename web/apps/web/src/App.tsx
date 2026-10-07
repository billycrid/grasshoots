import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Route, Routes, NavLink } from 'react-router';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { defaultPlatformConfig, type HealthResponse } from '@grasshoots/contracts';
import { grasshootsBrand } from '@grasshoots/ui';
import { fetchHealth, fetchPlatformConfig } from './api.js';

type State = { loading: boolean; health: HealthResponse | null; failed: boolean };
function useSystemHealth() {
  const [state, setState] = useState<State>({ loading: true, health: null, failed: false });
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => {
    setState((previous) => ({ ...previous, loading: true }));
    setRevision((previous) => previous + 1);
  }, []);
  useEffect(() => {
    let active = true;
    void fetchHealth()
      .then((health) => {
        if (active) setState({ loading: false, health, failed: false });
      })
      .catch(() => {
        if (active) setState({ loading: false, health: null, failed: true });
      });
    const timer = setTimeout(refresh, 30000);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [revision, refresh]);
  return { ...state, refresh };
}

function Brand({ name }: { name: string }) {
  if (name !== defaultPlatformConfig.brand.name)
    return (
      <Typography fontWeight={800} variant="h5">
        {name}
      </Typography>
    );
  return (
    <Box role="img" aria-label={name} className="brand-wordmark">
      <img src="/brand-reference.png" alt="" aria-hidden="true" />
    </Box>
  );
}

function HealthPage() {
  const { health, loading, failed, refresh } = useSystemHealth();
  const ready = health?.status === 'ok' && !loading;
  const api = loading ? 'Checking' : failed ? 'Unavailable' : 'Connected';
  const database = loading
    ? 'Checking'
    : failed
      ? 'Not checked'
      : health?.checks.database === 'up'
        ? 'Connected'
        : 'Unavailable';
  const cards = [
    {
      title: 'Web application',
      label: 'Running',
      description: 'Your Grasshoots workspace is running in this browser.',
      icon: <DesktopWindowsOutlinedIcon />,
      good: true,
    },
    {
      title: 'Backend API',
      label: api,
      description: 'A live connection from the web app to the Grasshoots API.',
      icon: <DnsOutlinedIcon />,
      good: api === 'Connected',
    },
    {
      title: 'PostgreSQL',
      label: database,
      description: 'A database query verifies connectivity and the foundation migration.',
      icon: <StorageOutlinedIcon />,
      good: database === 'Connected',
    },
  ];
  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        gap={2}
        mb={4}
      >
        <Box>
          <Typography variant="overline" color="secondary" fontWeight={800} letterSpacing={2}>
            LOCAL WORKSPACE
          </Typography>
          <Typography component="h1" variant="h3" sx={{ fontSize: { xs: 30, md: 38 }, mt: 0.5 }}>
            System health
          </Typography>
          <Typography color="text.secondary" mt={1}>
            A strong start for something worth shouting about.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<RefreshRoundedIcon />}
          disabled={loading}
          onClick={() => void refresh()}
        >
          {loading ? 'Checking…' : 'Check again'}
        </Button>
      </Stack>
      <Box
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: '16px',
          bgcolor: grasshootsBrand.ink,
          color: 'white',
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.2} mb={2}>
          <Box
            sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: grasshootsBrand.hootGreen }}
          />
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, color: grasshootsBrand.hootGreen, fontWeight: 700 }}
          >
            THE FOUNDATION
          </Typography>
        </Stack>
        <Typography
          component="h2"
          variant="h4"
          sx={{ fontSize: { xs: 26, md: 32 }, maxWidth: 620 }}
        >
          Making noise starts
          <br />
          with solid ground.
        </Typography>
        <Typography sx={{ color: '#CDD5D1', maxWidth: 600, mt: 2, lineHeight: 1.8 }}>
          One shared platform for grassroots sport. This local workspace brings together the web
          app, API and database.
        </Typography>
        <Chip
          label="Phase 0 · Project foundation"
          size="small"
          sx={{
            mt: 3,
            bgcolor: grasshootsBrand.hootGreen,
            color: grasshootsBrand.ink,
            fontWeight: 700,
          }}
        />
      </Box>
      <Box role="status" aria-live="polite" aria-atomic="true" mb={3}>
        <Stack direction="row" alignItems="center" gap={1}>
          {ready ? (
            <CheckCircleOutlineRoundedIcon color="secondary" />
          ) : (
            <ErrorOutlineRoundedIcon color={loading ? 'disabled' : 'warning'} />
          )}
          <Typography fontWeight={700}>
            {loading
              ? 'Checking local services…'
              : ready
                ? 'All systems connected'
                : failed
                  ? 'The API could not be reached'
                  : 'The database needs attention'}
          </Typography>
        </Stack>
      </Box>
      {!loading && !ready && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {failed
            ? 'Make sure the API is running, then check again. Database health cannot be verified until the API responds.'
            : 'The API is running, but PostgreSQL is not ready. Start the database and run migrations, then check again.'}{' '}
          Setup commands are in the project README.
        </Alert>
      )}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 2 }}
      >
        {cards.map((card) => (
          <Card
            key={card.title}
            component="section"
            aria-label={card.title}
            sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 225 }}
          >
            <Box sx={{ color: 'secondary.main', mb: 2 }}>{card.icon}</Box>
            <Typography component="h2" variant="h6" fontSize={17}>
              {card.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, mb: 3, lineHeight: 1.7, flex: 1 }}
            >
              {card.description}
            </Typography>
            <Chip
              label={card.label}
              size="small"
              variant="outlined"
              icon={card.good ? <CheckCircleOutlineRoundedIcon /> : undefined}
              color={card.good ? 'secondary' : 'default'}
              sx={{ alignSelf: 'flex-start', fontWeight: 700 }}
            />
          </Card>
        ))}
      </Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        gap={1}
        sx={{ my: 2.5, color: 'text.secondary' }}
      >
        <Typography variant="caption">
          {health && !loading
            ? `Last checked ${new Date(health.checkedAt).toLocaleTimeString('en-GB')}`
            : 'Waiting for a successful API response'}
        </Typography>
        <Typography variant="caption">Checks automatically every 30 seconds</Typography>
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={3} justifyContent="space-between">
        <Box>
          <Typography component="h2" fontWeight={700}>
            Small beginnings. Shared ambition.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            sx={{ maxWidth: 550, lineHeight: 1.8 }}
          >
            The platform starts here. Club workspaces and sport-specific tools will follow in later
            phases.
          </Typography>
        </Box>
        <Chip label="Local development" variant="outlined" size="small" />
      </Stack>
    </>
  );
}

export function App() {
  const [platform, setPlatform] = useState(defaultPlatformConfig);
  const [configUnavailable, setConfigUnavailable] = useState(false);
  useEffect(() => {
    let active = true;
    const load = () => {
      void fetchPlatformConfig()
        .then((config) => {
          if (active) {
            setPlatform(config);
            setConfigUnavailable(false);
          }
        })
        .catch(() => {
          if (active) setConfigUnavailable(true);
        });
    };
    load();
    const timer = setInterval(load, 30000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    document.title = `${platform.brand.name} · System health`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', platform.brand.tagline);
  }, [platform]);
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          height: 88,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          aria-label={`${platform.brand.name} home`}
          underline="none"
        >
          <Brand name={platform.brand.name} />
        </Link>
        <Chip
          label="Development"
          variant="outlined"
          size="small"
          sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: 'calc(100vh - 88px)',
        }}
      >
        <Box
          component="aside"
          sx={{
            width: { xs: '100%', md: 248 },
            flexShrink: 0,
            borderRight: { md: `1px solid ${grasshootsBrand.divider}` },
            borderBottom: { xs: `1px solid ${grasshootsBrand.divider}`, md: 0 },
            borderColor: 'divider',
            p: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: { xs: 'none', md: 'block' }, letterSpacing: 1.5, mb: 2, fontSize: 10 }}
          >
            PLATFORM
          </Typography>
          <Box component="nav" aria-label="Main navigation">
            <Button
              component={NavLink}
              to="/"
              end
              fullWidth
              startIcon={<DashboardOutlinedIcon />}
              sx={{
                justifyContent: 'flex-start',
                bgcolor: '#E4F2E5',
                color: 'secondary.main',
                px: 2,
              }}
            >
              System health
            </Button>
          </Box>
          <Box sx={{ mt: 'auto', pt: 8, display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body2" fontWeight={800}>
              {platform.brand.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              {platform.brand.tagline}
            </Typography>
            <Typography variant="caption" color="secondary" display="block" mt={3}>
              {platform.brand.primaryDomain}
            </Typography>
          </Box>
        </Box>
        <Container
          component="main"
          id="main"
          tabIndex={-1}
          maxWidth="lg"
          sx={{ p: { xs: 3, md: 5 }, pb: 6 }}
        >
          {configUnavailable && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Platform settings are unavailable. Showing the last available brand settings.
            </Alert>
          )}
          <Routes>
            <Route path="/" element={<HealthPage />} />
            <Route
              path="*"
              element={
                <Box py={8}>
                  <Typography component="h1" variant="h3">
                    Page not found
                  </Typography>
                  <Typography my={2}>This page is not part of the foundation workspace.</Typography>
                  <Button component={RouterLink} to="/" variant="contained">
                    Back to system health
                  </Button>
                </Box>
              }
            />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
