import React, {useRef} from 'react';
import {useIsFetching} from 'react-query';
import LoadingBar, {LoadingBarRef} from 'react-top-loading-bar';

interface LoadingProps extends LoadingBarRef {
  continuousStart: (startingValue?: number, refreshRate?: number) => void;
}

export const Loading = () => {
  const isFetching = useIsFetching();
  const ref = useRef<LoadingProps>(null);

  if (isFetching) {
    ref.current!.continuousStart();
  } else if (ref.current) {
    ref.current.complete();
  }

  return <LoadingBar color="#222B45" ref={ref} />;
};
