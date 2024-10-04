
import React from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import "./Navbar.css";
import checklistImage from "../../../Assets/checklist.jpg.jpg";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdAssignmentTurnedIn, MdAssignment } from "react-icons/md";
import { BiSolidHourglassBottom } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Image from "../../../Assets/task.jpg";

function Navbar() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({ left: false });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeView, setActiveView] = React.useState("");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, left: open });
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logged out");
    handleCloseMenu();
  };

  const handleSidebarClick = (text) => {
    let path;
    switch (text) {
      case "Dashboard":
        path = "/dashboard";
        break;
      case "Daily Checklist":
        path = "/assigned"; 
        break;
      case "Pending Checklist":
        path = "/pending"; 
        break;
      case "Assigned Checklist":
        path = "/priority"; 
        break;
      default:
        return;
    }
    navigate(`/user${path}`);
    setActiveView(path === "/dashboard" ? "dashboard" : "");
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Dashboard", "Daily Checklist", "Pending Checklist", "Assigned Checklist"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleSidebarClick(text)}>
                <ListItemIcon style={{ color: "#25274D" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {[ "Settings", "Notification","Admin"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (text === "Performance Reports") {
                    navigate("/user/reports");
                  } else if (text === "Settings") {
                    navigate("/user/settings");
                  } else if (text === "Notification") {
                    navigate("/user/notification");
                  }else if (text==="Admin"){
                    navigate("/admin/dashboard")
                  }
                }}
              >
                <ListItemIcon style={{ color: "#25274D" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const renderDashboardContent = () => (
    <div className="dashboard-cards">
      <Card className="welcome-card">
        <CardContent>
          <Typography
            style={{ fontSize: "2rem" }}
            variant="h6"
            component="div"
            className="card-title"
          >
            Hi User! Welcome to Checklist-Genie!
            <img
              src={Image}
              alt="task"
              style={{ width: "14rem", height: "9rem", marginLeft: "25rem" }}
            />
          </Typography>
          <Typography
            variant="body1"
            component="div"
            className="card-description"
          >
            Check out any upcoming checklist and recent project below!
          </Typography>
        </CardContent>
      </Card>
      <div className="task-cards">
        <Card
          onClick={() => handleCardClick("/user/Priority")}
          className="clickable-card"
        >
          <CardContent>
            <Typography variant="h5" component="div" className="card-title">
              Assigned Checklist <MdAssignment className="card-icon" />
            </Typography>
          </CardContent>
        </Card>
        <Card
          onClick={() => handleCardClick("/user/pending")}
          className="clickable-card"
        >
          <CardContent>
            <Typography variant="h5" component="div" className="card-title">
              Pending Checklist <BiSolidHourglassBottom className="card-icon" />
            </Typography>
          </CardContent>
        </Card>
        <Card
          onClick={() => handleCardClick("/user/complete")}
          className="clickable-card"
        >
          <CardContent>
            <Typography variant="h5" component="div" className="card-title">
              Completed Checklist <MdAssignmentTurnedIn className="card-icon" />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <header className="container">
          <Button onClick={toggleDrawer(true)} className="drawer-button">
            <FaBars />
          </Button>
          <div className="check">
            <img src={checklistImage} alt="Checklist" />
          </div>
          <div className="pro" onClick={handleProfileClick}>
            <FaUserCircle />
          </div>
        </header>

        <main className="main-content">
          {activeView === "dashboard" && renderDashboardContent()}
        </main>

        <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              width: "200px",
            },
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default Navbar;


