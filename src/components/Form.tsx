import { Alert, Button, Divider, FormControl, FormControlLabel, FormLabel, LinearProgress, Radio, RadioGroup, Stack, TextField, TextareaAutosize, useMediaQuery } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import theme from "../theme/themeApp";
import { FormFieldsProps } from "../interfaces/Form";

const Form = () => {
  const [progress, setProgress] = useState<number>(0);
  const smallSize = useMediaQuery(theme.breakpoints.down('sm'));

  const { register, setValue, handleSubmit, getValues, reset, watch, formState: { errors } } = useForm<FormFieldsProps>({
    defaultValues: {
      email: "",
      name: "",
      identificationType: "",
      identificationNumber: "",
      expeditionDateDocument: "",
      lastName: "",
      phone: "",
      headquarters: "",
      jornal: "",
      comments: ""
    }
  });

  const registerFormField = useMemo(() => {
    return {
      email: register("email", {
        required: {
          message: "El correo es requerido",
          value: true
        },
        pattern: {
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: "El correo no es válido"
        }
      }),
      headquarters: register("headquarters", {
        required: {
          message: "La sede es requerida",
          value: true
        }
      }),
      name: register("name", {
        required: {
          message: "El nombre es requerido",
          value: true
        }
      }),
      lastName: register("lastName", {
        required: {
          message: "El apellido es requerido",
          value: true
        }
      }),
      identificationType: register('identificationType', {
        required: {
          message: 'El tipo de identificación es requerido',
          value: true
        }
      }),
      identificationNumber: register("identificationNumber", {
        required: {
          message: "El número de identificación es requerido",
          value: true
        }
      }),
      expeditionDateDocument: register("expeditionDateDocument", {
        required: {
          message: "La fecha de expedición del documento es requerida",
          value: true
        }
      }),
      phone: register("phone", {
        required: {
          message: "El número de celular es requerido",
          value: true
        }
      }),
      jornal: register("jornal", {
        required: {
          message: "La jornada es requerida",
          value: true
        }
      })
    }
  }, [])
  
  const registerHandleChange = () => {
    const nameInput = { ...registerFormField.name }
    const textFieldEmail = { ...registerFormField.email }
    const textFieldLastname = { ...registerFormField.lastName }
    const textFieldIdType = { ...registerFormField.identificationType }
    const textFieldIdNumber = { ...registerFormField.identificationNumber }
    const textFieldDateExpeditionDate = { ...registerFormField.expeditionDateDocument }
    const textFieldPhoneNumber = { ...registerFormField.phone }
    const textFieldJornal = { ...registerFormField.jornal }

    return {
      nameInput,
      textFieldLastname,
      textFieldEmail,
      textFieldIdNumber,
      textFieldDateExpeditionDate,
      textFieldIdType,
      textFieldPhoneNumber,
      textFieldJornal
    }
  }

  const handleChange = (e: any) => {
    console.log(errors.email?.message )
    if (e.target.value) {
      if (!getValues("email")){
        setProgress((prevProgress) => prevProgress + 12.5)
        return
      }
    }
    setProgress((prevProgress) => prevProgress - 12.5)
  }

  const onSubmit = handleSubmit(() => {
    const formatter = moment().format('DD-MMM-YYYY');
    setValue("expeditionDateDocument", formatter);
    reset();
  });

  return (
    <form onSubmit={onSubmit} style={{ gap: 3 }}>
      <Stack bgcolor={"background.paper"} position={"sticky"} top={"0"}>
        <LinearProgress sx={{ margin: "20px 0px" }} variant="determinate" value={progress} />
      </Stack>

      <pre>
        {JSON.stringify(watch(), null, 3)}
      </pre>
      <Stack margin={"10px 0px"} gap={1}>
        <TextField
          
          onBlurCapture={(e) => {
            registerFormField.email.onChange(e)
            handleChange(e)
          }}
          fullWidth
          {...registerFormField.email}
          label={"Correo electrónico"}
        />
        {errors.email && errors.email && <Alert severity={"error"}>{errors.email?.message}</Alert>}
        <Divider />
      </Stack>
      <Stack margin={"10px 0px"} gap={1}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Sede:</FormLabel>
          <RadioGroup {...registerFormField.headquarters}>
            <FormControlLabel value={"Sede calle 100"} control={<Radio />} {...register("headquarters")} label="Sede calle 100" />
            <FormControlLabel value={"Sede Centro"} control={<Radio />} {...register("headquarters")} label="Sede Centro" />
          </RadioGroup>
        </FormControl>
        {errors.headquarters && <Alert severity={"error"}>{errors.headquarters?.message}</Alert>}
      </Stack>
      <Divider />
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel id="demo-radio-buttons-group-label">Nombre:</FormLabel>
        <Stack direction={`${smallSize ? "column" : "row"}`} alignItems={"center"} gap={1}>
          <TextField
            fullWidth
            {...registerFormField.name}
            onBlurCapture={(e) => {
              registerHandleChange().nameInput.onChange(e)
              handleChange(e)
            }}
          />
          <TextField
            {...registerFormField.name}
            onBlur={(e) => {
              registerHandleChange().textFieldLastname.onChange(e)
              handleChange(e)
            }}
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
          <RadioGroup {...registerFormField.identificationType}>
            <FormControlLabel
              onClick={(e) => {
                registerHandleChange().textFieldIdType.onBlur(e)
                handleChange(e)
              }}
              value={"Cedula"} {...registerFormField.identificationType} label="Cédula" control={<Radio />} />
            <FormControlLabel
              onClick={(e) => {
                registerHandleChange().textFieldIdType.onBlur(e)
                handleChange(e)
              }}
              label="Cedula de extranjería" {...registerFormField.identificationType} value={"Extranjería"} control={<Radio />} />
            <FormControlLabel
              onClick={(e) => {
                registerHandleChange().textFieldIdType.onBlur(e)
                handleChange(e)
              }}
              label="Tarjeta de identidad" {...registerFormField.identificationType} value={"Tarjeta de identidad"} control={<Radio />} />
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
          onBlurCapture={(e) => {
            registerHandleChange().textFieldIdNumber.onChange(e)
            handleChange(e)
          }}
          {...registerFormField.identificationNumber} label={"Numero de identificacion"} type="number" />
        {errors.identificationNumber &&
          <Alert severity="error">{errors.identificationNumber?.message}</Alert>
        }
        <Divider />
      </Stack>
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel>Fecha de expedicion del documento</FormLabel>
        <TextField {...registerFormField.expeditionDateDocument} type="date" />
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
        <TextField
          onBlurCapture={(e) => {
            registerHandleChange().textFieldPhoneNumber.onChange(e)
            handleChange(e)
          }}
          {...registerFormField.phone} label={"Numero de celular"} type="number" />
        {errors.phone && <Alert severity="error">{errors.phone.message}</Alert>}
        <Divider />
      </Stack>
      <Stack margin={"10px 0px"} gap={1}>
        <FormLabel>Preferencia de jornada agendamiento cita</FormLabel>
        <RadioGroup {...registerFormField.jornal} >
          <FormControlLabel
            onClick={(e) => {
              registerHandleChange().textFieldJornal.onChange(e)
              handleChange(e)
            }}
            {...registerFormField.jornal} value={"Mañana"} control={<Radio />} label="Mañana" />
          <FormControlLabel
            onClick={(e) => {
              registerHandleChange().textFieldJornal.onChange(e)
              handleChange(e)
            }}
            {...registerFormField.jornal} value={"Tarde"} control={<Radio />} label="Tarde" />
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