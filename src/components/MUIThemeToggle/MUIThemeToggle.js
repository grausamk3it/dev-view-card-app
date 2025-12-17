import React from 'react';
import { 
  IconButton,
  Tooltip,
  Typography,
  Box
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

const MUIThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Tooltip title={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}>
        <IconButton
          onClick={toggleTheme}
          size="medium"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }
          }}
        >
          {theme === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Tooltip>

      <Typography 
        variant="body2" 
        sx={{ 
          color: 'white',
          display: { xs: 'none', sm: 'block' }
        }}
      >
        {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
      </Typography>
    </Box>
  );
};

export default MUIThemeToggle;