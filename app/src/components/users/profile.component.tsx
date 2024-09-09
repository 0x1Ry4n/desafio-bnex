import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";
import { Container, CardContent, Card, Typography, Box, Avatar, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

type State = {
  redirect: string | null;
  userReady: boolean;
  currentUser: (IUser & { access: string }) | null;
};

const Profile = () => {
  const [state, setState] = useState<State>({
    redirect: null,
    userReady: false,
    currentUser: null,
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      setState((prevState) => ({ ...prevState, redirect: "/home" }));
    } else {
      setState({
        currentUser: currentUser as IUser & { access: string },
        userReady: true,
        redirect: null,
      });
    }
  }, []);

  if (state.redirect) {
    return <Navigate to={state.redirect} />;
  }

  const { currentUser } = state;

  const cardStyles = {
    backgroundColor: "#f5f5f5",
    fontSize: 20,
    minWidth: 275,
    boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    p: "20px",
  };

  const avatarStyles = {
    backgroundColor: "#1976d2",
    width: 60,
    height: 60,
    mb: 2,
  };

  const gridItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 2,
  };

  return (
    <Container sx={{ mt: 4 }}>
      {state.userReady && currentUser && (
        <Card sx={cardStyles}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
              <Avatar sx={avatarStyles}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {currentUser.username}'s Profile
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <PersonIcon />
                <Typography>
                  <b>Username:</b> {currentUser.username}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={gridItemStyle}>
                <EmailIcon />
                <Typography>
                  <b>Email:</b> {currentUser.email}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Profile;
