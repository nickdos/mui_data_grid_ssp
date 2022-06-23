import * as React from 'react';
import { SwipeableDrawer, Typography, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, 
    TableContainer, Table, TableBody, IconButton, BottomNavigationAction, BottomNavigation, CssBaseline, CircularProgress } from '@mui/material';
import { TravelExploreOutlined, ChevronRight, ChevronLeft } from '@mui/icons-material/';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from './theme';
import RecordSection from './RecordSection';

export default function RecordDrawer({ drawerState, toggleDrawer, recordState, stepRecord }) {

  const fieldListMap = {
    "Summary":    ["scientificName", "dataResourceName", "basisOfRecord", "eventDate"],
    "Record":     ["institutionName","collectionName", "dataResourceName", "basisOfRecord", "miscProperties"],
    "Taxon":      ["scientificName", "scientificNameAuthorship", "vernacularName", "taxonConceptID", "kingdom", 
                   "phylum", "class", "order", "family", "genus", "matchType" ],
    "Location":   ["country", "countryCode", "stateProvince", "locality", "decimalLatitude", "decimalLongitude", 
                   "geodeticDatum"],
    "Occurrence": ["occurrenceID", "institutionCode", "collectionCode", "catalogNumber", "recordNumber", 
                   "basisOfRecord", "preparations", "recordedBy", "reproductiveCondition", "occurrenceStatus"],
    "Event":      ["eventDate", "datePrecision"],
    "Other":      ["license", "lastModifiedTime", "provenance", "geospatiallyKosher" ]
  };
  const anchor = "right";
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const drawerWidth = 600;

  return (
      <React.Fragment key={anchor}>
        {/* <CssBaseline /> */}
        <SwipeableDrawer 
          PaperProps={largeScreen ? {
            sx: {
                width: drawerWidth,
            }
          } : {
              sx: {
                  width: "95%",
              }
          }}
          anchor={anchor}
          open={drawerState}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          {recordState.isLoading && (
            <CircularProgress
              size={68}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 1,
              }}
            />
          )}
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <IconButton onClick={toggleDrawer}><ChevronRight /></IconButton>
              </ListItemIcon>
              <ListItemIcon>
                <TravelExploreOutlined fontSize="large"/>
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{ fontSize: '1.2rem' }}
                      component="span"
                      variant="h6"
                      color="text.primary"
                    >
                      Occurrence Record 
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{  fontFamily: 'Roboto Mono', fontSize: '0.9rem' }}
                      component="span"
                      variant="p"
                      color="text.primary"
                    >
                      {recordState.uuid}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="" component="" />
            <Paper sx={{ width: '100%', marginBottom: '56px' }}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableBody>
                    { Object.keys(fieldListMap).map((section) => (
                      <RecordSection key={section} recordData={recordState.data} section={section} fieldList={fieldListMap[section]}/>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </List>
          <Paper sx={{ position: 'fixed', bottom: 0, right: 0, width: drawerWidth }} elevation={3}>
            <BottomNavigation showLabels>
              <BottomNavigationAction 
                  label="Previous" 
                  icon={<ChevronLeft/>} 
                  onClick={()=>stepRecord(recordState.uuid, 'previous')}
                  disabled={recordState.isLoading}
              />
              <BottomNavigationAction 
                  label="Next" 
                  icon={<ChevronRight />} 
                  onClick={()=>stepRecord(recordState.uuid, 'next')}
                  disabled={recordState.isLoading}
              />
            </BottomNavigation>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
  );
}
