import { Fragment, useState } from 'react';

import ContentCommon from './_component/content-common';
import HeaderCommon from './_component/header-common';

const ImageSupervisePage = () => {
  const [data, setData] = useState({});

  return (
    <Fragment>
      <HeaderCommon setData={setData} />
      <ContentCommon data={data} />
    </Fragment>
  );
};

export default ImageSupervisePage;
