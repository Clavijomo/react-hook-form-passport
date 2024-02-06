import { Alert, Button, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from "react-hook-form";

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
}

const Form = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormFieldsProps>({
    defaultValues: {
      email: "",
      name: "",
      identificationType: "",
      identificationNumber: "",
      lastName: "",
      phone: "",
      sede: "",
      jornal: "",
      comments: ""
    }
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Formulario enviado", data);
  });

  return (
    <form onSubmit={onSubmit} style={{ gap: 3 }}>
      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
      <TextField
        sx={{ margin: "10px 0px" }}
        fullWidth
        {...register("email", {
          required: {
            message: "El email es requerido",
            value: true
          },
          minLength: {
            message: "El email debe tener al menos dos caracteres",
            value: 2
          },
          maxLength: {
            message: "El email debe tener máximo 20 caracteres",
            value: 20
          }
        })}
        label={"Correo electrónico"}
      />
      {errors.email && errors.sede && <Alert severity={"error"}>{errors.sede?.message}</Alert>}
      <br />
      <Divider />
      <FormControl sx={{ margin: "10px 0px" }}>
        <FormLabel id="demo-radio-buttons-group-label">Sede:</FormLabel>
        <RadioGroup {...register("sede", {
          required: {
            message: "Seleccionar la sede es requerida",
            value: true
          }
        })}>
          <FormControlLabel value={"Sede calle 100"} control={<Radio />} {...register("sede")} label="Sede calle 100" />
          <FormControlLabel value={"Sede Centro"} control={<Radio />} {...register("sede")} label="Sede Centro" />
        </RadioGroup>
      </FormControl>
      {errors.sede && <Alert severity={"error"}>{errors.sede?.message}</Alert>}
      <Divider />
      <Stack margin={"20px 0px"}>
        <FormLabel id="demo-radio-buttons-group-label">Nombres:</FormLabel>
        <TextField
          {...register("name", {
            required: {
              message: "El/los nombres son requeridos",
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
          margin="dense"
          label={"Apellidos"}
        />
        {errors.name || errors.lastName ?
          <Stack direction={"row"} width={"100%"} gap={1}>
            {errors.name && <Alert severity="error">{errors.name?.message}</Alert>}
            {errors.lastName && <Alert severity="error">{errors.lastName?.message}</Alert>}
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
      <TextField label={"Numero de identificacion"} type="number" />
      <Divider />
      <FormLabel>Fecha de expedicion del documento</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Fecha" />
      </LocalizationProvider>
      <Divider />
      <FormLabel>Fecha de nacimiento</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Fecha" />
      </LocalizationProvider>
      <TextField label={"Numero de celular"} type="number" />
      <Divider />
      <FormLabel >Preferencia de jornada agendamiento cita</FormLabel>
      <RadioGroup>
        <FormControlLabel value={"Sede calle 100"} control={<Radio />} label="Mañana" />
        <FormControlLabel value={"Sede calle 100"} control={<Radio />} label="Tarde" />
      </RadioGroup>
      <Divider />
      <FormLabel>Comentarios</FormLabel>
      <TextareaAutosize style={{ height: "50px", borderRadius: "10px" }} />
      <Divider />
      <Button sx={{ width: "max-content" }} variant='outlined' type='submit'>
        Enviar
      </Button>
    </form>
  )
}

export default Form;