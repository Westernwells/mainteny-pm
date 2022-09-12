import {Grid} from '@mui/material';
import {useUser} from 'hooks/reactQuery/useUserSession';
import {Progress} from 'components/Progress';
import {Account} from './Account';
import {PersonalDetails} from './PersonalDetails';
import {LanguageAndRegion} from './LanguageAndRegion';

export const ProfilePage = () => {
  const {data: user, isLoading, isIdle} = useUser();

  if (isLoading || isIdle) {
    return <Progress />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={6} sm={12}>
        <PersonalDetails
          propertyOwner={user!}
          containerStyles={{height: '100%'}}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <Account propertyOwner={user!} />
      </Grid>
      <Grid item md={6} sm={12}>
        <LanguageAndRegion propertyOwner={user!} />
      </Grid>
    </Grid>
  );
};
