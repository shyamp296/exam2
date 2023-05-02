import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import {
  TextField,
  Autocomplete,
  FormGroup,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
// import { SkillOption } from "./types";
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
  skills: string[];
  profile: File | null;
}
interface Error {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phoneNo?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
  gender?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  qualifications?: string;
  skills?: string;
  profile?: string;
}

interface Country {
  name: string;
  states: State[];
}

interface State {
  name: string;
  cities: string[];
}

const options: any = ["React Js", "Node Js", "JavaScript"];

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
    skills: [],
    profile: null,
  });
  const [errors, setErrors] = useState<Error>({});

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showcPassword, setcShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickcShowPassword = () => setcShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleInputChange = (e: any | Error) => {
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

  const handleQualificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const updatedQualifications = checked
      ? [...formData.qualifications, value]
      : formData.qualifications.filter((q) => q !== value);
    setFormData({ ...formData, qualifications: updatedQualifications });
  };

  const handleSkillChange = (selectedOptions: any) => {
    setFormData({ ...formData, skills: selectedOptions });
  };

  const validate = (data: RegistrationFormData | Error) => {
    const errors: any = {};

    // Firstname Validation
    if (!data.firstname) {
      errors.firstname = "Firstname is required";
    }

    // LastName Validation
    if (!data.lastname) {
      errors.lastname = "LastName is required";
    }

    // Username Validation
    if (!data.username) {
      errors.username = "Username is required";
    }

    // Email Validation
    if (!data.email) {
      errors.email = "email is required";
    } else if (!data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.email = "Please enter a valid email address";
    }

    //Password validation
    if (!data.password) {
      errors.password = "Password is required";
    } else if (!data.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      console.log(data.password);
      errors.password = "Password length is less than 8 digit";
    }

    //Confirm Password Validation
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (
      !data.confirmPassword.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ) {
      errors.confirmPassword = "ConfirmPassword length is less than 8 digit";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    // else {
    //   errors.ConfirmPassword = "";
    // }
    if (!data.phoneNo) {
      errors.phoneNo = "PhoneNo is required";
    } else if (!data.phoneNo.match("[0-9]{10}")) {
      errors.phoneNo = "Please provide valid phone number";
    }

    //gender validation
    if (!data.gender) {
      errors.gender = "Gender is required";
    }

    //DOB validation
    if (!data.dob) {
      errors.dob = "Please select Your Birth Date";
    }

    if (!data.country) {
      errors.country = "Country is required";
    }

    if (!data.state) {
      errors.state = "State is required";
    }

    if (!data.city) {
      errors.city = "City is required";
    }

    if (!data.address) {
      errors.address = "Address is required";
    }
    if (!data.qualifications) {
      errors.qualifications = "Qualifications is required";
    }
    if (!data.skills) {
      errors.skills = "please select atleast one skills";
    }

    if (!data.profile) {
      errors.profile = "profile picture is required";
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const errors = validate(formData);
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      console.log("abc", FormData);

      let Data = {
        firstName: formData.firstname,
        lastName: formData.lastname,
        userName: formData.username,
        phone_no: formData.phoneNo,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        dob: formData.dob,
        gender: formData.gender,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        qualification: formData.qualifications,
        skills: formData.skills,
        role: 2,
      };
      console.log(
        "🚀 ~ file: Signup.js:127 ~ signupSuccess ~ inputData:",
        Data
      );
      const response = await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Data),
      });
      return response.json();
    } else {
      setErrors(errors);
      console.log("ysdftjusdgtyfg", FormData);
      return;
    }
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
                {errors.firstname && (
                  <div style={{ color: "red" }}>{errors.firstname}</div>
                )}
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
                {errors.lastname && (
                  <div style={{ color: "red" }}>{errors.lastname}</div>
                )}
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
                {errors.username && (
                  <div style={{ color: "red" }}>{errors.username}</div>
                )}
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
                {errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="phoneNo"
                  label="Phone Number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  autoComplete="phoneNo"
                />
                {errors.phoneNo && (
                  <div style={{ color: "red" }}>{errors.phoneNo}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type={showcPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickcShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showcPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
                {errors.confirmPassword && (
                  <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                )}
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
                {errors.dob && <div style={{ color: "red" }}>{errors.dob}</div>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="male"
                    name="gender"
                  >
                    <FormControlLabel
                      value="male"
                      name="gender"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      name="gender"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
                {errors.gender && (
                  <div style={{ color: "red" }}>{errors.gender}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="Select-Country">
                    --Select Country--
                  </InputLabel>
                  <Select
                    labelId="Select-Country"
                    id="Select-Country"
                    value={formData.country}
                    name="country"
                    label="Select Country"
                    onChange={handleCountryChange}
                  >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                  </Select>
                </FormControl>
                {errors.country && (
                  <div style={{ color: "red" }}>{errors.country}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="Select-State">--Select State--</InputLabel>
                  <Select
                    labelId="Select-State"
                    id="Select-State"
                    label="Select State"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    disabled={!formData.country}
                  >
                    {states.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.state && (
                  <div style={{ color: "red" }}>{errors.state}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="Select-City">--Select City--</InputLabel>
                  <Select
                    labelId="Select-City"
                    id="Select-City"
                    name="city"
                    label="Select City"
                    value={formData.city}
                    onChange={handleCityChange}
                    disabled={!formData.state}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.city && (
                  <div style={{ color: "red" }}>{errors.city}</div>
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  fullWidth
                  multiple
                  options={options}
                  onChange={(event, value) => handleSkillChange(value)}
                  filterSelectedOptions
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="programing skills"
                    />
                  )}
                />
                {errors.skills && (
                  <div style={{ color: "red" }}>{errors.skills}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormLabel>Qualification : </FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="qualifications"
                        value="highschool"
                        checked={formData.qualifications.includes("highschool")}
                        onChange={handleQualificationsChange}
                        color="primary"
                      />
                    }
                    label="High School"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="qualifications"
                        value="undergraduate"
                        checked={formData.qualifications.includes(
                          "undergraduate"
                        )}
                        onChange={handleQualificationsChange}
                        color="primary"
                      />
                    }
                    label="Undergraduate"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="qualifications"
                        value="Postgraduate"
                        checked={formData.qualifications.includes(
                          "Postgraduate"
                        )}
                        onChange={handleQualificationsChange}
                        color="primary"
                      />
                    }
                    label="Postgraduate"
                  />
                </FormGroup>
                {errors.qualifications && (
                  <div style={{ color: "red" }}>{errors.qualifications}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Address : </FormLabel>
                <FormControl fullWidth>
                  <textarea
                    required
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    id="address"
                    autoComplete="new-address"
                  />
                </FormControl>
                {errors.address && (
                  <div style={{ color: "red" }}>{errors.address}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Profile Picture : </FormLabel>
                <TextField
                  required
                  fullWidth
                  type="file"
                  id="profile"
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                  autoComplete="profile"
                />
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
