import { Menu, Button, Text, Avatar, Switch } from "@mantine/core";
import {
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../Slices/UserSlice";
import { useTheme } from "../../Context/ThemeContext";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { isDarkMode, toggleTheme } = useTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/");
  };
  const profile = useSelector((state: any) => state.profile);

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex gap-2 items-center cursor-pointer">
          <Avatar
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/avatar.png"
            }
            alt="it's me"
          />
          <div>{user.name}</div>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>
        {/* <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item> */}
        {/* <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item> */}
        <Menu.Item
          leftSection={
            isDarkMode ? <IconSun size={14} /> : <IconMoon size={14} />
          }
          rightSection={
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              size="md"
              color="dark.4"
              onLabel={
                <IconSun
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-yellow-4)"
                />
              }
              offLabel={
                <IconMoonStars
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-blue-6)"
                />
              }
            />
          }
        >
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default ProfileMenu;
