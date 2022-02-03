import { Toolbar, AppBar, Typography, Grid, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  email: Yup.string().email("Invalid Email").required("Email Required"),
  phone: Yup.number().integer().typeError("Please enter a valid phone number").required("Phone Required"),
});

function Itf() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">ITF PAGE</Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                alert(values);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Your details</Typography>
                  </Grid>

                  <Grid item xs={6}>
                      <TextField id="firstName" name="firstName" label="firstName"/>
                  </Grid>

                  <Grid item xs={6}></Grid>

                  <Grid item xs={12}>
                    <Typography>Address</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>Booking information</Typography>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Itf;
