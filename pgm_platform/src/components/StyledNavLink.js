// StyledNavLink.js : a styled NavLink component (not functional component because that would have to re-render on every prop change, which is not necessary here)

import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    display: 'flex',                
    justifyContent: 'center',       // Center horizontally
    alignItems: 'center',           // Center vertically
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(6),
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    lineHeight: theme.typography.h5.lineHeight,
    fontFamily: theme.typography.h5.fontFamily,
    textDecoration: 'none',
    '&.active': {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.action.selected,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.action.hoverText,
    },
    height: '70%',  // height of parent container
    width: '70%',   // width of parent container
}));

export default StyledNavLink;
