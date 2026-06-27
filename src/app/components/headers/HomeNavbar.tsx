import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export function HomeNavbar() {
  const authmember = null;
  return (
    <div className="home-navbar">
      <Container sx={{ mt: "55px", height: "642px" }}>
        <Stack
          direction="row"
          sx={{
            height: "50px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <NavLink to="/">
              <img
                style={{ width: "125px", height: "30px" }}
                src="/icons/burak.svg"
              />
            </NavLink>
          </Box>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              minWidth: "700px",
              alignItems: "center",
            }}
          >
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName={"underline"}>
                Home
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>
            {authmember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authmember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName={"underline"}>
                  My Page{" "}
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>
            {<img
                style={{ width: "125px", height: "30px" }}
                src="/icons/basket"
              />}

            {!authmember ? (
              <Box>
                <Button variant="contained" style={{ background : "#3776CC", color:"f8f8ff" }}>
                  Login
                </Button>
              </Box>
            ) : (
              <img />
            )}
          </Stack>
        </Stack>
        <Stack>DETAIL </Stack>
      </Container>
    </div>
  );
}
