import Avatar from '@mui/material/Avatar';

interface Props {
  src: string | undefined;
  alt: string;
  avatarStyle?: {[key: string]: string | number};
  userRole?: 'owner' | 'manager' | 'technician' | 'unknown';
}

export const UserAvatar = ({
  src,
  alt,
  avatarStyle,
  userRole = 'unknown',
}: Props) => {
  const palette = {
    owner: 'info.main',
    manager: 'warning.main',
    technician: 'success.main',
    unknown: 'primary.main',
  };
  return (
    <Avatar
      sx={{
        backgroundColor: palette[userRole],
        fontWeight: 'bold',
        ...avatarStyle,
      }}
      src={src}
      alt={alt}
    >
      {alt.split(' ').length > 1
        ? alt[0]
            .toUpperCase()
            .concat(alt.split(' ').slice(-1)[0][0].toUpperCase())
        : alt[0].toUpperCase()}
    </Avatar>
  );
};
