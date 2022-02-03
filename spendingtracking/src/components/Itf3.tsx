import { Divider, Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FieldArray, Form, Formik, getIn} from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  people: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("firstName is required"),
      company: Yup.string().required("company is required"),
      statu: Yup.string().required("statu is required"),
    })
  ),
});

const debug = true;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1),
  },
}));

const MyForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Formik
        initialValues={{
          firstName: "",
          people: [
            {
              id: Math.random(),
              statu: "",
              company: "",
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("onSubmit", JSON.stringify(values, null, 2));
        }}
      >
        {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
          <div>
            <Grid xs={12}>
              <TextField
                className={classes.field}
                margin="normal"
                variant="outlined"
                label="FirstName"
                name="firstName"
                value={values.firstName}
                required
                helperText={getIn(touched, "firstName") && getIn(errors, "firstName") ? getIn(errors, "firstName") : ""}
                error={Boolean(getIn(touched, "firstName") && getIn(errors, "firstName"))}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Form noValidate autoComplete="off">
              <FieldArray name="people">
                {({ push, remove }) => (
                  <div>
                    {values.people.map((p, index) => {
                      const company = `people[${index}].company`;
                      const touchedCompany = getIn(touched, company);
                      const errorCompany = getIn(errors, company);

                      const statu = `people[${index}].statu`;
                      const touchedStatu = getIn(touched, statu);
                      const errorStatu = getIn(errors, statu);

                      return (
                        <div key={p.id}>
                          <TextField
                            className={classes.field}
                            margin="normal"
                            variant="outlined"
                            label="Company"
                            name={company}
                            value={p.company}
                            required
                            helperText={touchedCompany && errorCompany ? errorCompany : ""}
                            error={Boolean(touchedCompany && errorCompany)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <TextField
                            className={classes.field}
                            margin="normal"
                            select
                            style={{ width: "150px" }}
                            variant="outlined"
                            label="Statu"
                            name={statu}
                            value={p.statu}
                            required
                            helperText={touchedStatu && errorStatu ? errorStatu : ""}
                            error={Boolean(touchedStatu && errorStatu)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option key="1" value="1">
                              ahmet
                            </option>
                            <option key="2" value="2">
                              oğuz
                            </option>
                          </TextField>
                        </div>
                      );
                    })}
                    <Button
                      className={classes.button}
                      type="button"
                      variant="outlined"
                      onClick={() => push({ id: Math.random(), firstName: "", lastName: "" })}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Button
                className={classes.button}
                type="submit"
                color="primary"
                variant="contained"
                // disabled={!isValid || values.people.length === 0}
              >
                submit
              </Button>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              {debug && (
                <>
                  <pre style={{ textAlign: "left" }}>
                    <strong>Values</strong>
                    <br />
                    {JSON.stringify(values, null, 2)}
                  </pre>
                  <pre style={{ textAlign: "left" }}>
                    <strong>Errors</strong>
                    <br />
                    {JSON.stringify(errors, null, 2)}
                  </pre>
                </>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
