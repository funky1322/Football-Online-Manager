import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyTeam } from "../team/teamSlice";
import { setIsNewUser } from "../auth/authSlice";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { team, loading, error } = useSelector((state) => state.team);
  const { isNewUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isNewUser) {
      const timerId = setTimeout(() => {
        dispatch(fetchMyTeam());
        dispatch(setIsNewUser(false));
      }, 5000);

      return () => clearTimeout(timerId);
    } else {
      dispatch(fetchMyTeam());
    }
  }, [dispatch, isNewUser]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!team)
    return <Typography>No team found or still being created...</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h4">Welcome {team.name}!</Typography>
      <Typography variant="h6">Budget: ${team.budget}</Typography>
      <Typography mt={2}>
        Use the navigation above to explore your team or the transfer market.
      </Typography>
    </Box>
  );
};

export default HomePage;
