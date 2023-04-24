import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom'

const Valikko = (props) => {
  return (
    <>
      <Drawer variant="permanent" sx={{ bgcolor: "#D4EBEC" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Valikko</Typography>
        </Box>
        <List sx={{ width: 200, fontSize: 18 }}>
          <ListItem>
            <ListItemIcon>
              <ListItemText></ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: '0 25px 25px 0' }}>
              <Link to={'/tietoa'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary="Tietoa" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: '0 25px 25px 0' }}>
              <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary="Etusivu" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: '0 25px 25px 0' }} onClick={() => props.setLaskuri(props.laskuri + 1)}>
              <Link to={'/kokoelmat'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary="Kokoelmat" />
              </Link>
            </ListItemButton>
          </ListItem>
          {props.kirjautumisToken && (
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: '0 25px 25px 0' }} onClick={() => props.setLaskuri(props.laskuri + 1)}>
                <Link to={'/omakokoelma'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary="Oma kokoelma" />
                </Link>
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Typography variant="body2" sx={{ p: 2 }}>Kirja-arkisto © 2023</Typography>
      </Drawer>
    </>
  )
}

export { Valikko }