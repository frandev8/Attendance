import Avatar from "@mui/material/Avatar";

function AdminAvatar() {
  return (
    <div style={{ display: "flex", height: "90%" }}>
      <div>
        <Avatar
          style={{ height: "100%", width: "40px" }}
          alt="Remy Sharp"
          src="../../src/assets/images/man_profile.jpeg"
        />
      </div>
      <div style={{ marginLeft: "5px" }}>
        <ul>
          <li>Admin</li>
          <li>Williams</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminAvatar;
