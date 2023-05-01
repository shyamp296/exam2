import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

interface RegistrationFormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  confirmPassword: string;
  dob: string;
  gender: "male" | "female";
  country: string;
  state: string;
  city: string;
  address: string;
  qualifications: string[];
  programmingSkills: string[];
  profile: File | null;
}

interface Country {
  name: string;
  states: State[];
}

interface State {
  name: string;
  cities: string[];
}
interface SkillOption {
  value: string;
  label: string;
}

export default function Registration() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "male",
    country: "",
    state: "",
    city: "",
    address: "",
    qualifications: [],
    programmingSkills: [],
    profile: null,
  });
  const [errors, setErrors] = useState<object>({});
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const handleInputChange = (e: any) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  const handleCountryChange = (e: any) => {
    const selectedCountry = e.target.value;
    console.log(
      "🚀 ~ file: Dropdown.js:36 ~ handleCountryChange ~ selectedCountry:",
      selectedCountry
    );
    setFormData(() => ({
      ...formData,
      country: selectedCountry,
      state: "",
      city: "",
    }));

    setErrors({
      ...errors,
      [e.target.name]: null,
    });
    console.log(
      "🚀 ~ file: Registration.js:211 ~ handleCountryChange ~ errors:",
      errors
    );

    const countryStates =
      selectedCountry === "India"
        ? ["Gujrat", "Madhya Pradesh", "Uttar Pradesh"]
        : ["Ontario", "Quebec", "British Columbia"];
    setStates(countryStates);
    setCities([]);
  };

  const handleStateChange = (e: any) => {
    const selectedState = e.target.value;
    console.log(
      "🚀 ~ file: Dropdown.js:51 ~ handleStateChange ~ selectedState:",
      selectedState
    );
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      city: "",
    }));

    setErrors({
      ...errors,
      [e.target.name]: null,
    });
    const stateCities =
      selectedState === "Gujrat"
        ? ["Ahmedabad", "Amreli", "Rajkot", "Surat", "Bharuch", "Bhavnagar"]
        : selectedState === "Madhya Pradesh"
          ? [
            "Alirajpur",
            "Anuppur",
            "Ashok Nagar",
            "Balaghat",
            "Barwani",
            "Betul",
          ]
          : selectedState === "Uttar Pradesh"
            ? [
              "Agra",
              "Allahabad",
              "Aligarh",
              "Ambedkar Nagar",
              "Auraiya",
              "Azamgarh",
            ]
            : selectedState === "Ontario"
              ? ["Toronto", "Ottawa", "Mississauga"]
              : selectedState === "Quebec"
                ? ["Montreal", "Quebec City", "Laval"]
                : selectedState === "British Columbia"
                  ? ["Vancouver", "Victoria", "Surrey"]
                  : [];
    setCities(stateCities);
  };

  const handleCityChange = (e: any) => {
    const selectedCity = e.target.value;
    console.log(
      "🚀 ~ file: Dropdown.js:87 ~ handleCityChange ~ selectedCity:",
      selectedCity
    );
    setFormData((prevData) => ({
      ...prevData,
      city: selectedCity,
    }));

    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  label="First Name"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="family-name"
                  label="Last Name"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  label="User Name"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNo"
                  label="Phone Number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  autoComplete="phoneNo"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  // minLength={8}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                <FormLabel>Date of Birth:</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  id="dob"
                  autoComplete="dob"
                />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="Agreed" color="primary" />}
                  label="I Agree to term and condition"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
