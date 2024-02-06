import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { LinearProgress, List, ListItem, Stack, SxProps, ThemeProvider, Typography } from "@mui/material";
import Form from './components/Form';
import theme from "./theme/themeApp";

function App() {
  const StylesStack: SxProps = {
    maxWidth: "80%",
    margin: "auto",
    direction: "row",
    justifyContent: "space-around",
    gap: 5,
    height: "100vh",
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack {...StylesStack}>
        <Stack width={"50%"} sx={{
          backgroundImage: "url(https://titandxp.com/wp-content/uploads/2023/05/FEATURE.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}>
        </Stack>
        <Stack overflow={"auto"} gap={1} padding={"20px"} borderRadius={"20px"} width={"50%"}>
          <LinearProgress variant="determinate" value={10} />
          <Typography variant="h5">Agendamiento de pasaporte</Typography>
          <Typography color={theme.palette.grey[800]} variant="body1">Diligencia correctamente la información de la persona que se desea agendar la cita en la cancillería para  el trámite del pasaporte teniendo en cuenta lo siguiente:
          </Typography>
          <List>
            <ListItem sx={{ gap: 1 }}>
              <CalendarMonthOutlinedIcon fontSize="small" sx={{ color: theme.palette.action.active }} />
              <Typography color={theme.palette.action.active} variant="body1">Las citas solo estarán disponibles de jueves a domingo.</Typography>
            </ListItem>
            <ListItem sx={{ gap: 1 }}>
              <FmdGoodOutlinedIcon fontSize="small" sx={{ color: theme.palette.action.active }} />
              <Typography color={theme.palette.action.active} variant="body1">La citas presenciales se atienden en solo 2 sedes (Sede Norte Calle 100 - Sede Centro).</Typography>
            </ListItem>
            <ListItem sx={{ gap: 1 }}>
              <BrowseGalleryOutlinedIcon fontSize="small" sx={{ color: theme.palette.action.active }} />
              <Typography color={theme.palette.action.active} variant="body1">La zona horaria de citas es de 7:00 a. m. a 3:00 p. m.</Typography>
            </ListItem>
          </List>

          {/* Formulario */}
          <Form />
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default App
