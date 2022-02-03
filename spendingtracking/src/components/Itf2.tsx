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

function Itf2() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
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
            <Grid container justifyContent="flex-end" alignItems="center">
              <Button style={{marginTop:"15px"}} type="submit" variant="outlined">
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    </Grid>
  );
}

export default Itf2;
