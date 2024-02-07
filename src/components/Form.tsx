import { Alert, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, TextareaAutosize, useMediaQuery } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import { useForm } from "react-hook-form";
import theme from "../theme/themeApp";

interface FormFieldsProps {
  email: string
  name: string
  lastName: string
  identificationNumber: string
  sede: string
  identificationType: string
  phone: string
  jornal: string
  comments: string
  expeditionDateDocument: string
}

const Form = () => {
  const smallSize = useMediaQuery(theme.breakpoints.down('sm'));
  const { register, setValue, getValues, handleSubmit, reset, watch, formState: { errors } } = useForm<FormFieldsProps>({
    defaultValues: {
      email: "",
      name: "",
      identificationType: "",
      identificationNumber: "",
      expeditionDateDocument: "",
      lastName: "",
      phone: "",
      sede: "",
      jornal: "",
      comments: ""
    }
  });

  const onSubmit = handleSubmit((data) => {
    const formatter = moment().format('DD-MMM-YYYY');
    setValue("expeditionDateDocument", formatter);
    console.log(getValues("expeditionDateDocument"))
    console.log("Formulario enviado", data);
    reset();
  });

  return (
    <form onSubmit={onSubmit} style={{ gap: 3 }}>
      <pre>
        {JSON.stringify(watch(), null, 3)}
      </pre>
      <Stack margin={"10px 0px"} gap={1}>
        <TextField
          fullWidth
          {...register("email", {
            required: {
              message: "El email es requerido",
              value: true
            },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "El correo no es válido"
            }
          })}
          label={"Correo electrónico"}
        />
        {errors.email && errors.sede && <Alert severity={"error"}>{errors.email?.message}</Alert>}
        <Divider />
      </Stack>
      <Stack margin={"10px 0px"} gap={1}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Sede:</FormLabel>
          <RadioGroup {...register("sede", {
            required: {
              message: "La sede es requerida",
              value: true
            }
          })}>
            <FormControlLabel value={"Sede calle 100"} control={<Radio />} {...register("sede")} label="Sede calle 100" />
            <FormControlLabel value={"Sede Centro"} control={<Radio />} {...register("sede")} label="Sede Centro" />
          </RadioGroup>
        </FormControl>
        {errors.sede && <Alert severity={"error"}>{errors.sede?.message}</Alert>}
      </Stack>
      <Divider />
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel id="demo-radio-buttons-group-label">Nombre:</FormLabel>
        <Stack direction={`${smallSize ? "column" : "row"}`} alignItems={"center"} gap={1}>
          <TextField
            {...register("name", {
              required: {
                message: "El nombre es requeridos",
                value: true
              }
            })}
            fullWidth
            label={"Nombre(s)"}
          />
          <TextField
            {...register("lastName", {
              required: {
                message: "Los apellidos son requeridos",
                value: true
              }
            })}
            fullWidth
            label={"Apellidos"}
          />
        </Stack>
        {errors.name || errors.lastName ?
          <Stack direction={`${smallSize ? "column" : "row"}`} width={"100%"} gap={1}>
            {errors.name && <Alert sx={{ width: "100%" }} severity="error">{errors.name?.message}</Alert>}
            {errors.lastName && <Alert sx={{ width: "100%" }} severity="error">{errors.lastName?.message}</Alert>}
          </Stack>
          : null}
      </Stack>
      <Divider />
      <Stack margin={"10px 0px"}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Tipo de identificación</FormLabel>
          <RadioGroup {...register("identificationType", {
            required: {
              message: "El tipo de identificación es requerida",
              value: true
            }
          })}>
            <FormControlLabel value={"Cedula"} {...register("identificationType")} label="Cédula" control={<Radio />} />
            <FormControlLabel label="Cedula de extranjería" {...register("identificationType")} value={"Extranjería"} control={<Radio />} />
            <FormControlLabel label="Tarjeta de identidad" {...register("identificationType")} value={"Tarjeta de identidad"} control={<Radio />} />
          </RadioGroup>
        </FormControl>
        {errors.identificationType &&
          <Alert severity="error">{errors.identificationType?.message}</Alert>
        }
      </Stack>
      <Divider />
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel id="demo-radio-buttons-group-label">Número de identificación</FormLabel>
        <TextField
          {...register("identificationNumber", {
            required: {
              message: "El número de identificación es requerido",
              value: true
            }
          })} label={"Numero de identificacion"} type="number" />
        {errors.identificationNumber &&
          <Alert severity="error">{errors.identificationNumber?.message}</Alert>
        }
        <Divider />
      </Stack>
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel>Fecha de expedicion del documento</FormLabel>
        <TextField
          type="date"
          {...register("expeditionDateDocument", {
            required: {
              message: "La fecha de expedición es requerida",
              value: true
            }
          })}
        />
        {errors.expeditionDateDocument &&
          <Alert severity="error">{errors.expeditionDateDocument.message as string}</Alert>
        }
        <Divider />
        <FormLabel>Fecha de nacimiento</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Fecha" />
        </LocalizationProvider>
      </Stack>
      <Divider />
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel>Celular</FormLabel>
        <TextField {...register("phone", {
          required: {
            message: "El número de celular es requerido",
            value: true
          }
        })} label={"Numero de celular"} type="number" />
        {errors.phone && <Alert severity="error">{errors.phone.message}</Alert>}
        <Divider />
      </Stack>
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel>Preferencia de jornada agendamiento cita</FormLabel>
        <RadioGroup
          {...register("jornal", {
            required: {
              message: "La jornada de agendamiento de la cita es requerida",
              value: true
            }
          })}
        >
          <FormControlLabel {...register("jornal")} value={"Mañana"} control={<Radio />} label="Mañana" />
          <FormControlLabel {...register("jornal")} value={"Tarde"} control={<Radio />} label="Tarde" />
        </RadioGroup>
        {errors.jornal && <Alert severity="error">{errors.jornal.message}</Alert>}
        <Divider />
      </Stack>
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel>Comentarios</FormLabel>
        <TextareaAutosize style={{ height: "50px", borderRadius: "10px" }} />
      </Stack>
      <Button sx={{ width: `${smallSize ? "100%" : "30%"}` }} variant={`${smallSize ? "contained" : "outlined"}`} size="large" type='submit'>
        Enviar
      </Button>
    </form>
  )
}

export default Form;