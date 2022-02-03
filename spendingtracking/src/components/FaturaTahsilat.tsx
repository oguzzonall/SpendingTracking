import React, { ReactElement, useState } from "react";
import { Container, FormControl, MenuItem, InputLabel, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector, RootStateOrAny } from "react-redux";
//import { itfFaturaTahsilatService } from "../../services/itfFaturaTahsilatService";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";

interface ItfFaturaGiris {}

interface ItfFaturaGirisProps {
  id: number;
  customerName: string;
  serviceType: string;
  webSupportRef: string;
  invoiceDate: Date;
  invoiceNo: string;
  percentage: number;
  amount: number;
  currency: string;
  effort: string;
  receiptStatus: string;
  receiptDate: Date;
  actions: string;
}

interface ItfSearchFormProps {
  startDate?: Date;
  endDate?: Date;
  search?: string;
  customerId?: string;
  statu?: string;
}

interface ItfRowDialogFormProps {
  receiptDate?: Date;
  receiptStatus?: number;
}

enum receiptStatusEnum {
  IPTAL = "İptal",
  TAHSILAT_BEKLIYOR = "Tahsilat Bekliyor",
  TAHSILAT_TAMAMLANDI = "Tahsilat Tamamlandı",
}

enum receiptStatusvalueEnum {
  IPTAL = 3,
  TAHSILAT_BEKLIYOR = 12,
  TAHSILAT_TAMAMLANDI = 14,
}

function FaturaTahsilat({}: ItfFaturaGiris): ReactElement {
  const auth = useSelector((state: RootStateOrAny) => state.authentication);
  const yearStartDate = new Date(new Date().getFullYear(), 0, 2);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 0);
  const valuesDate = {
    initialStartDate: yearStartDate.toISOString().substring(0, 10),
    initialEndDate: currentDate.toISOString().substring(0, 10),
  };

  const [ItfForm, setItfForm] = useState<ItfFaturaGirisProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  ////////////////////////// Pop-up consts

  const [open, setOpen] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const handleClickOpen = (row: ItfFaturaGirisProps) => {
    if (row.receiptStatus === receiptStatusEnum.IPTAL) {
      setOpenCancel(true);
    } else if (row.receiptStatus === receiptStatusEnum.TAHSILAT_TAMAMLANDI) {
      setSelectedItem(row);
      setOpen(true);
    } else if (row.receiptStatus === receiptStatusEnum.TAHSILAT_BEKLIYOR) {
      setSelectedItem(row);
      setOpen(true);
    } else setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelClose = () => {
    setSelectedItem(undefined);
    setOpenCancel(false);
  };
  // DATA GRİDDDD CODES

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "customerName", headerName: "Müşteri", width: 150 },
    { field: "serviceType", headerName: "Hizmet Türü", width: 120 },
    { field: "webSupportRef", headerName: "WebSupportNo", width: 200 },
    { field: "invoiceDate", headerName: "Fatura Tarihi", width: 180 },
    { field: "invoiceNo", headerName: "Fatura No", width: 150 },
    { field: "percentage", headerName: "Oran%", width: 150 },
    { field: "amount", headerName: "Tutar", width: 200 },
    { field: "currency", headerName: "Para Birimi", width: 200 },
    { field: "effort", headerName: "Efor", width: 200 },
    { field: "receiptStatus", headerName: "Durum", width: 200 },
    { field: "receiptDate", headerName: "Tahsilat Tarihi", width: 200 },
    {
      field: "actions",
      headerName: "Aksiyon",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleClickOpen(params.row)} startIcon={<EditIcon />}></Button>
          </div>
        );
      },
    },
  ];

  const initialSearchValues: ItfSearchFormProps = {
    customerId: undefined,
    search: undefined,
    statu: undefined,
    endDate: undefined,
    startDate: undefined,
  };

  const initialRowDialogFormValues: ItfRowDialogFormProps = {
    receiptDate: undefined,
    receiptStatus: undefined,
  };

  const formik = useFormik({
    initialValues: initialSearchValues,
    onSubmit: async (values) => {
      // const response = await itfFaturaTahsilatService(values.startDate, values.endDate, values.customerId, values.statu);
      // setItfForm(response.data);
      setItfForm([
        {
          id: 1,
          invoiceDate: new Date("2021-10-30 00:00:"),
          invoiceNo: "A000",
          amount: 150,
          customerName: "DeutheBank",
          serviceType: "Ek Geliştirme",
          webSupportRef: "BNK-21-000",
          currency: "USD",
          effort: "wdaw",
          receiptDate: new Date(),
          receiptStatus: "Tahsilat Bekliyor",
          percentage: 25,
          actions: "",
        },
      ]);
    },
  });

  const rowDialogFormValidationSchema = yup.object({
    receiptDate: yup.date().when("receiptStatus", {
      is: (val: number) => val === receiptStatusvalueEnum.TAHSILAT_TAMAMLANDI,
      then: yup.date().required("Fatura Tarihi Zorunludur!"),
    }),
  });

  const formik2 = useFormik({
    initialValues: initialRowDialogFormValues,
    validationSchema: rowDialogFormValidationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values));
      handleClose();
    },
  });

  const rows = [...ItfForm];

  return (
    <div>
      <h5 style={{ color: "red", fontFamily: "sans-serif", fontStyle: "italic", fontSize: "15px" }}>FATURA TAHSİLAT</h5>
      <hr />
      <br />

      <Dialog
        // POP UP İPTAL EDİLDİ
        open={openCancel}
        onClose={handleCancelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">İptal edilmiş Fatura Tahsil Edilemez.</DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        // ORJİNAL AÇILAN POP-UP
        open={open}
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>Tahsilat</DialogTitle>
        <form onSubmit={formik2.handleSubmit}>
          <DialogContent>
            <InputLabel id="demo-simple-select-standard-label" sx={{ fontSize: 15 }}>
              Tahsilat Tarihi
            </InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="receiptDate"
              name="receiptDate"
              type="date"
              defaultValue={valuesDate.initialStartDate}
              value={formik2.values.receiptDate}
              onChange={formik2.handleChange}
              error={formik2.touched.receiptDate && Boolean(formik2.errors.receiptDate)}
              helperText={formik2.touched.receiptDate && formik2.errors.receiptDate}
              InputProps={{
                inputProps: {
                  min: selectedItem && new Date(selectedItem.invoiceDate).toISOString().slice(0, 10),
                  max: currentDate.toISOString().slice(0, 10),
                },
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              sx={{ fontSize: 15 }}
              select
              id="receiptStatus"
              name="receiptStatus"
              value={formik2.values.receiptStatus}
              onChange={formik2.handleChange}
              error={formik2.touched.receiptStatus && Boolean(formik2.errors.receiptStatus)}
              helperText={formik2.touched.receiptStatus && formik2.errors.receiptStatus}
              label="Fatura Durumu"
            >
              <MenuItem value={14} sx={{ fontSize: 15 }}>
                Tahsil Edildi
              </MenuItem>
              <MenuItem value={12} sx={{ fontSize: 15 }}>
                Tahsilat Bekliyor
              </MenuItem>
            </TextField>
          </DialogContent>
        </form>
        <DialogActions>
          <Button
            type="submit"
            onClick={() => (!formik2.errors.receiptDate || !formik2.errors.receiptStatus) && formik2.submitForm()}
          >
            Kaydet
          </Button>
          <Button onClick={handleClose}>Vazgeç</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{ marginLeft: "50px" }}>
              <label>Fatura Tarihi Aralığı</label>
            </FormControl>
          </div>

          <Grid container lg={12} sm={12} md={12} xs={12}>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }} style={{ marginLeft: "50px" }}>
                <TextField
                  id="startDate"
                  label=" "
                  type="date"
                  name="startDate"
                  defaultValue={valuesDate.initialStartDate}
                  inputProps={{ style: { fontSize: 14, height: 8 } }}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                  helperText={formik.touched.startDate && formik.errors.startDate}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 180 }}
                />
              </FormControl>
            </Grid>

            <Grid item lg={2} md={2} sm={6} xs={12}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }} style={{ marginLeft: "50px" }}>
                <TextField
                  id="endDate"
                  label=" "
                  type="date"
                  name="endDate"
                  defaultValue={valuesDate.initialEndDate}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { fontSize: 14, height: 8 } }}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                  helperText={formik.touched.endDate && formik.errors.endDate}
                  sx={{ width: 180 }}
                />
              </FormControl>
            </Grid>

            <Grid item lg={5} md={5} sm={6.8} xs={2}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 30 }}></FormControl>
            </Grid>

            <Grid item lg={2} md={2} sm={5.2} xs={10}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <TextField
                  id="search"
                  name="search"
                  label="Search"
                  type="search"
                  value={formik.values.search}
                  onChange={formik.handleChange}
                  error={formik.touched.search && Boolean(formik.errors.search)}
                  helperText={formik.touched.search && formik.errors.search}
                  inputProps={{ style: { fontSize: 14, height: 8 } }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 180 }}
                />
              </FormControl>
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={12}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }} style={{ marginLeft: "50px" }}>
                <TextField
                  sx={{ fontSize: 15 }}
                  select
                  id="customerId"
                  name="customerId"
                  value={formik.values.customerId}
                  onChange={formik.handleChange}
                  error={formik.touched.customerId && Boolean(formik.errors.customerId)}
                  helperText={formik.touched.customerId && formik.errors.customerId}
                  label="Müşteri"
                  disabled={false}
                >
                  <MenuItem value={1} sx={{ fontSize: 15 }}>
                    Akbank
                  </MenuItem>
                  <MenuItem value={2} sx={{ fontSize: 15 }}>
                    Yapı Kredi
                  </MenuItem>
                  <MenuItem value={3} sx={{ fontSize: 15 }}>
                    Deutsche Bank
                  </MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid lg={2} md={2} sm={5} xs={12}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }} style={{ marginLeft: "50px" }}>
                <TextField
                  sx={{ fontSize: 15 }}
                  select
                  id="statu"
                  name="statu"
                  value={formik.values.statu}
                  onChange={formik.handleChange}
                  error={formik.touched.statu && Boolean(formik.errors.statu)}
                  helperText={formik.touched.statu && formik.errors.statu}
                  label="Durum"
                >
                  <MenuItem value={3} sx={{ fontSize: 15 }}>
                    Tahsil Edildi
                  </MenuItem>
                  <MenuItem value={4} sx={{ fontSize: 15 }}>
                    Tahsilat Bekliyor
                  </MenuItem>
                  <MenuItem value={5} sx={{ fontSize: 15 }}>
                    İptal Edildi
                  </MenuItem>
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid justifyContent="right" item xs={12}>
            <Button variant="contained" type="submit" style={{ float: "right", height: 30, marginTop: "0px" }}>
              Filtrele
            </Button>
          </Grid>
        </form>
      </Container>
      <Container style={{ marginTop: 60 }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
        </div>
      </Container>
    </div>
  );
}

export default FaturaTahsilat;
