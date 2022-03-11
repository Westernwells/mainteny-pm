import Avatar from '@mui/material/Avatar';

interface Props {
  src: string | undefined;
  alt: string;
  avatarStyle?: {[key: string]: string | number};
}

export const UserAvatar = ({src, alt, avatarStyle}: Props) => {
  alt = alt.trim().toUpperCase();
  return (
    <Avatar
      sx={{
        fontWeight: 'bold',
        ...avatarStyle,
      }}
      src={src}
      alt={alt}>
      {typeof alt === 'string' && alt.length
        ? alt.split(' ').length > 1
          ? alt[0].concat(
              alt.split(' ').slice(-1)[0].length
                ? alt.split(' ').slice(-1)[0][0]
                : '',
            )
          : alt[0]
        : '?'}
    </Avatar>
  );
};
