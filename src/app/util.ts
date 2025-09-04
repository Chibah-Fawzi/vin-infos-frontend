let BACKEND_URI: string | undefined;

if (process.env.NODE_ENV === "production") {
  BACKEND_URI = process.env.BACKEND_URI;
} else {
  BACKEND_URI = "http://localhost:8000";
}

export default BACKEND_URI;
