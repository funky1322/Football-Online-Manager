import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={NavLink}
          to="/home"
          sx={{ textDecoration: "none", color: "#fff" }}
        >
          Fantasy App
        </Typography>

        <Box sx={{ flexGrow: 1, display: "flex", gap: 2, ml: 2 }}>
          {token && (
            <>
              <Button
                component={NavLink}
                to="/my-team"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                My Team
              </Button>
              <Button
                component={NavLink}
                to="/transfer-market"
                color="inherit"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                Transfer Market
              </Button>
            </>
          )}
        </Box>

        {token && (
          <Button color="inherit" onClick={handleLogout} sx={{ mr: 0 }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
