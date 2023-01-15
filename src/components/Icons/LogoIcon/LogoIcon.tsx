import React, { FC } from "react";
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../icons/Logo.svg';

const LogoIcon: FC = () => {
  return (
    <HandySvg
        src={iconSrc}
        width="130"
        height="25"
    />
   );
};

export default LogoIcon;
