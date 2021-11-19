import { Alert } from "@mui/material";

interface ApiError {
  errorMessage: string;
}

export default function ErrorAlert(error:ApiError) {
  if (error.errorMessage) {
    return (
      <Alert severity="error">{error.errorMessage}</Alert>
    );
  }
  return null;
}