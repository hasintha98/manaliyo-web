import React from 'react';
import './common-components.css'
import { CImage } from '@coreui/react';

const CircularProgress = ({img}) => {


  return (
    <div class="ui-widgets">
            <div class="ui-values"> <CImage
                  src={img}
                  width={175}
                  height={175}
           
                  style={{ borderRadius: "50%" }}
                /></div>
            <div class="ui-labels"><span>80%</span><br /><span>Profile Completion</span></div>
        </div>
  );
};

export default CircularProgress;
