import { BrowseGalleryOutlined as BrowseGalleryOutlinedIcon, CalendarMonthOutlined as CalendarMonthOutlinedIcon, FmdGoodOutlined as FmdGoodOutlinedIcon } from '@mui/icons-material';
import { Grid, List, ListItem, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import Form from './components/Form';
import theme from "./theme/themeApp";

interface ListInformation {
  title: string
  icon: React.ReactNode
}
function App() {
  const minMedium = useMediaQuery(theme.breakpoints.up('md'));
  const minSm = useMediaQuery(theme.breakpoints.down("sm"));

  const ListInformation: ListInformation[] = [
    {
      icon: <CalendarMonthOutlinedIcon fontSize="small" sx={{ color: theme.palette.action.active }} />,
      title: "Las citas solo estarán disponibles de jueves a domingo."
    },
    {
      icon: <FmdGoodOutlinedIcon fontSize="small" sx={{ color: theme.palette.action.active }} />,
      title: "La citas presenciales se atienden en solo 2 sedes (Sede Norte Calle 100 - Sede Centro)."
    },
    {
      icon: <BrowseGalleryOutlinedIcon fontSize="small" sx={{ color: theme.palette.action.active }} />,
      title: "La zona horaria de citas es de 7:00 a. m. a 3:00 p. m."
    }
  ]

  return (
    <ThemeProvider theme={theme}>
      <Grid container item sx={{
        maxWidth: `${minSm ? "100%" : "85%"}`,
        width: "100%",
        margin: "auto",
        height: "100vh"
      }} spacing={2}>
        { minMedium && (
          <Grid xs={0} lg={6} sx={{
            backgroundImage: "url(https://titandxp.com/wp-content/uploads/2023/05/FEATURE.svg)",
            backgroundRepeat: "no-repeat",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}>
          </Grid>
        )}
        <Grid item xs={12} lg={6} overflow={"auto"} height={"100%"} gap={1} padding={"20px"}>
          <Typography variant={`${minSm ? "h5" : "h5"}`} sx={{ fontWeight: 500 }} margin={"10px 0px"}>Agendamiento de pasaporte</Typography>
          <Typography color={theme.palette.grey[800]} variant="body1">Diligencia correctamente la información de la persona que se desea agendar la cita en la cancillería para  el trámite del pasaporte teniendo en cuenta lo siguiente:</Typography>
          <List sx={{ margin: "10px 0px", flexDirection: "column", display: "flex", gap: 1 }}>
            {ListInformation &&
              ListInformation.map((item, i) => (
                <ListItem key={i} sx={{ gap: 1, padding: `${minSm ? "0" : "none"}` }}>
                  {item.icon}
                  <Typography color={theme.palette.action.active} variant='body1'>{item.title}</Typography>
                </ListItem>
              ))
            }
          </List>
          {/* Formulario */}
          <Form />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App;
