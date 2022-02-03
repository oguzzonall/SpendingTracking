import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Typography, Grid, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup.string().email("Enter a valid email").required("Email is Required"),
});

interface Personnel {
  company: string;
}

interface ITFForm {
  firstName: string;
  lastName: string;
  email: string;
  personnels: Array<Personnel>;
}

const initialValues: ITFForm = {
  firstName: "",
  lastName: "",
  email: "",
  personnels: [
    {
      company: "BIS Çözüm",
    },
  ],
};

function Itf4() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validationSchema: validationSchema,
  });
  return (
    <Grid item xs={12}>
      <Container maxWidth="md">
        <div className={classes.formWrapper}>
          <form onSubmit={formik.submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Your details</Typography>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="email"
                  name="email"
                  label="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
            </Grid>
            {formik.values.personnels?.map((item: any, index: number) => {
              return (
                <Grid xs={12}>
                  <TextField
                    id={`peoples.${index}.company`}
                    name={`peoples.${index}.company`}
                    label="company"
                    value={formik.values.personnels[index].company}
                    onChange={(e?: any) => formik.setFieldValue(`peoples.${index}.company`, e.target.value)}
                    error={formik.touched.personnels && Boolean(formik.touched.personnels[index].company)}
                    helperText={formik.touched.personnels && formik.errors.personnels}
                  />
                  <Button
                    style={{ marginTop: "15px", marginLeft: "15px" }}
                    variant="outlined"
                    onClick={() => {
                      let newPeoples = formik.values.personnels.filter((x) => x !== formik.values.personnels[index]);
                      formik.setFieldValue("peoples", newPeoples);
                    }}
                    hidden={formik.values.personnels.length === 1}
                  >
                    Sil
                  </Button>
                </Grid>
              );
            })}
            <Grid item xs={4}>
              <Button
                style={{ marginTop: "15px" }}
                variant="outlined"
                onClick={() => {
                  let newPeoples = formik.values.personnels;
                  newPeoples.push({ company: "" });
                  formik.setFieldValue("peoples", newPeoples);
                }}
              >
                Ekle
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center">
              <Button style={{ marginTop: "15px" }} type="submit" variant="outlined">
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    </Grid>
  );
}

export default Itf4;
