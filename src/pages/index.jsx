import React from 'react';
import Image from 'next/image';
import settings from '../assets/settingsIcon.svg';

export default function Home() {
  return (
    <div className="">
      <header
        className="sticky top-0 z-10 flex justify-between h-[48px] \
            bg-[#651FFF] text-white text-[16px] border-b-[#DCDCDC] border-b-[6px]"
      >
        <p className="flex font-bold font-ubuntu items-center ml-4">LOGO</p>
        <Image
          src={settings}
          alt="settings"
          width={30}
          height={30}
          className="mr-4"
        />
      </header>
      <div className="relative flex-nowrap">
        <p
          className="absolute top-[333px] left-[-410px] text-[200px] font-bold tracking-[0.18em] rotate-90 \
         bg-clip-text text-transparent bg-[linear-gradient(90deg,_#E60000,_#FFCC00_33%,_#007F00_66%,#0000CC_100%)]"
        >
          TAIWAN
        </p>
        <div className="text-[32px] ">
          <p>人口數、戶數按戶別及性別統計</p>
        </div>
      </div>
    </div>
  );
}
