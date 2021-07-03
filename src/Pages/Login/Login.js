import React from "react";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import { signInWithGoogle } from "../../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";

export default function Login() {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <center>
        <h1>App Name Here</h1>
        {localStorage.getItem("authLoading") !== null ? (
          <div>
            <CircularProgress />
            <div>
              <IconButton
                onClick={() => {
                  localStorage.removeItem("authLoading");
                  window.location.reload();
                }}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
            size="large"
            style={{ textTransform: "none", borderRadius: "50px" }}
            startIcon={
              <SvgIcon>
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </SvgIcon>
            }
          >
            <b>Login with Google</b>
          </Button>
        )}
      </center>
    </div>
  );
}
