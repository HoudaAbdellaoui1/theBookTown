import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const pages = ["Books", "Authors", "Categories"];

function Header(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#E5DAD8" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to={"/"}
            component="a"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <img
              src={require("../../assets/images/3.png")}
              height="100"
              alt="bookstagram-logo"
              border="0"
              className="mb-1"
            />
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#1E3F48",
                  display: "block",
                  mx: 3,
                  fontFamily: "monospace",
                  fontSize: "20px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {props.auth.isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  size="large"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    sx={{ width: 60, height: 60, bgcolor: "#6D799E" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to={`/users/profile/${props.auth.user.id}`}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem component={Link} to={"/books/add"}>
                  <Typography textAlign="center">Add book</Typography>
                </MenuItem>
                <MenuItem onClick={props.logoutUser}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1E3F48",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#163238", color: "white" },
                  }}
                >
                  <Link
                    to={"/users/login"}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </Button>
                <Button
                  variant="contained"
                  to={"/users/register"}
                  sx={{
                    backgroundColor: "#E48D7A",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f87b65", color: "#1E3F48" },
                  }}
                >
                  <Link
                    to={"/users/register"}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Register
                  </Link>
                </Button>
              </Stack>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
const mapStateToPros = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};
export default connect(mapStateToPros, mapDispatchToProps)(Header);
