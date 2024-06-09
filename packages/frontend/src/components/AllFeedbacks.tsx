import React, { useEffect, useState } from 'react';
import { FullTestItem } from '../../../functions/src/utilities/fullTestUtilities';
import { post } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import { Spinner } from './Spinner';

export const AllFeedbacks: React.FC = () => {
  const [fullTestItem, setFullTestItem] = useState<
    FullTestItem | undefined | null
  >();

  useEffect(() => {
    const getData = async () => {
      const response = await toJSON(
        post({
          apiName: 'myAPI',
          path: '/',
        }),
      );

      setFullTestItem(response);
    };
    getData();
    // return () => {};
  }, []);

  let out;

  if (fullTestItem === undefined) {
    out = <Spinner message={'Loading your feedback'} />;
  } else {
    out = JSON.stringify(fullTestItem);
  }

  return out;
};
