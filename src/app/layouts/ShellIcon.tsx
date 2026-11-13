import {
  BookOutlined,
  CloseOutlined,
  HomeOutlined,
  MessageOutlined,
  PlayCircleFilled,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const icons = {
  play: PlayCircleFilled,
  home: HomeOutlined,
  watchlist: BookOutlined,
  search: SearchOutlined,
  settings: SettingOutlined,
  close: CloseOutlined,
  chat: MessageOutlined,
};

type ShellIconName = keyof typeof icons;

function ShellIcon({
  name,
  className = "size-5",
}: {
  name: ShellIconName;
  className?: string;
}) {
  const Icon = icons[name];

  return (
    <Icon aria-hidden="true" className={`${className} [&>svg]:size-full`} />
  );
}

export default ShellIcon;
