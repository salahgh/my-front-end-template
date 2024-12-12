import { Container, Typography } from "@mui/material";

export function Home() {
  return (
    <Container>
      <div className={"bg-amber-800"} style={{ width: 500, height: 500 }}>
        <Typography variant="h2" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1"> Welcome to the Home Page! </Typography>
      </div>
    </Container>
  );
}
