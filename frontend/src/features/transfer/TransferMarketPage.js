import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransferList, buyPlayer, clearBuySuccess } from "./transferSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";

const TransferMarketPage = () => {
  const dispatch = useDispatch();
  const { players, loading, error, buySuccess } = useSelector(
    (state) => state.transfer
  );

  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchTransferList({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchTransferList({ teamName, playerName, maxPrice }));
  };

  const handleReset = () => {
    setTeamName("");
    setPlayerName("");
    setMaxPrice("");
    dispatch(fetchTransferList({}));
  };

  const handleBuy = (playerId) => {
    dispatch(buyPlayer({ playerId }))
      .unwrap()
      .then((res) => {
        toast.success("Player bought successfully");
        dispatch(fetchTransferList({ teamName, playerName, maxPrice }));
      })
      .catch((err) => {
        toast.error(err || "Failed to buy player");
      });
  };

  return (
    <Box p={2}>
      <Typography variant="h4">Transfer Market</Typography>

      <Box display="flex" gap={2} mt={2} flexWrap="wrap">
        <TextField
          label="Team Name"
          variant="outlined"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          size="small"
        />
        <TextField
          label="Player Name"
          variant="outlined"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          size="small"
        />
        <TextField
          label="Max Price"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          size="small"
        />

        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {buySuccess && <Alert severity="success">{buySuccess}</Alert>}

      {loading ? (
        <Typography mt={2}>Loading...</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          {players.map((player) => (
            <Card key={player._id} sx={{ width: "250px" }}>
              <CardContent>
                <Typography variant="h6">{player.name}</Typography>
                <Typography>Position: {player.position}</Typography>
                {player.currentTeam && (
                  <Typography>
                    Owned By: {player.currentTeam.name || "Unknown Team"}
                  </Typography>
                )}
                <Typography>Asking Price: ${player.askingPrice}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleBuy(player._id)}
                  sx={{ mt: 1 }}
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TransferMarketPage;
