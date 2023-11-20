import React, { useState, useId } from 'react';
import Image from 'next/image';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import settingsIcon from '../assets/settingsIcon.svg';

export default function Home({
  rawData111,
  rawData110,
  rawData109,
  rawData108,
  rawData107,
}) {
  const showData111 = rawData111.responseData.map(
    ({
      site_id,
      village,
      household_ordinary_m,
      household_ordinary_f,
      household_single_m,
      household_single_f,
      household_ordinary_total,
      household_single_total,
    }) => ({
      city: site_id.slice(0, 3),
      district: site_id.slice(3),
      village: village,
      ordinaryMale: household_ordinary_m,
      ordinaryFemale: household_ordinary_f,
      singleMale: household_single_m,
      singleFemale: household_single_f,
      householdOrdinaryRatio:
        +household_ordinary_total /
        (+household_ordinary_total + +household_single_total),
      householdSingleRatio:
        +household_single_total /
        (+household_ordinary_total + +household_single_total),
    })
  );
  const [input, setInput] = useState({
    year: ' ',
    city: '臺北市',
    district: ' ',
  });

  const city111List = Array.from(new Set(showData111.map(({ city }) => city)));
  const district111List = Array.from(
    new Set(showData111.map(({ district }) => district))
  );

  const option111 = {};
  showData111.forEach(
    ({
      city,
      district,
      ordinaryMale,
      ordinaryFemale,
      singleMale,
      singleFemale,
    }) => {
      if (!Object.keys(option111).includes(city)) {
        option111[city] = {};
      }
      if (!Object.keys(option111[city]).includes(district)) {
        option111[city][district] = {
          ordinaryMale: +0,
          ordinaryFemale: +0,
          singleMale: +0,
          singleFemale: +0,
        };
      } else {
        option111[city][district].ordinaryMale += +ordinaryMale;
        option111[city][district].ordinaryFemale += +ordinaryFemale;
        option111[city][district].singleMale += +singleMale;
        option111[city][district].singleFemale += +singleFemale;
      }
    }
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: '#651FFF',
        white: '#FFFFFF',
      },
      secondary: {
        main: '#651FFF',
      },
    },
  });

  const columnOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: '人口數統計',
    },
    colors: ['#7D5FB2', '#C29FFF'],
    // subtitle: {
    //   text: 'chart',
    // },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          crop: false,
          overflow: 'none',
        },
      },
      series: {
        dataLabels: {
          style: {
            fontSize: 15 + 'px',
          },
        },
      },
    },

    xAxis: {
      categories: ['共同生活', '獨立生活'],
      crosshair: true,
      max: 1,
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      labels: {
        // format: '{value:.0f} %',
      },
      tickInterval: 100,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '男性',
        data: [100, 200],
      },
      {
        name: '女性',
        data: [300, 500],
      },
    ],
  };
  const pieOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '戶數統計',
    },
    colors: ['#A3B1FF', '#626EB2'],
    xAxis: {
      categories: ['共同生活', '獨立生活'],
      crosshair: true,
      max: 1,
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      labels: {
        // format: '{value:.0f} %',
      },
      tickInterval: 5,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '女性',
        data: [3, 5],
      },
    ],
  };
  // console.log(Object.keys(option111[input.city]));
  console.log(input.city);

  return (
    <div className="">
      <header
        className="sticky top-0 z-10 flex justify-between h-[48px] \
            bg-[#651FFF] text-white text-[16px] border-b-[#DCDCDC] border-b-[6px]"
      >
        <p className="flex font-bold font-ubuntu items-center ml-4">LOGO</p>
        <Image
          src={settingsIcon}
          alt="settings"
          width={30}
          height={30}
          className="mr-4 flex items-center cursor-pointer"
        />
      </header>
      <div className="relative">
        <p
          className="absolute top-[333px] left-[-410px] text-[200px] font-bold tracking-[0.18em] rotate-90 \
         bg-clip-text text-transparent bg-[linear-gradient(90deg,_#E60000,_#FFCC00_33%,_#007F00_66%,#0000CC_100%)]"
        >
          TAIWAN
        </p>
        <div className="relative pl-[290px] pr-[144px] mx-auto flex-col py-4 items-start justify-center">
          <p className="relative flex justify-center text-[25px] md:text-[32px]  whitespace-nowrap">
            人口數、戶數按戶別及性別統計
          </p>
          <ThemeProvider theme={theme}>
            <div className="relative py-12 flex space-x-3 justify-center">
              <FormControl sx={{ minWidth: 73, height: 30 }}>
                <InputLabel id="year">年份</InputLabel>
                <Select
                  SelectDisplayProps={{
                    style: {
                      paddingTop: 10,
                      paddingBottom: 8,
                      fontSize: '16px',
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.year}
                  label="Age"
                  placeholder="年份"
                  onChange={(e) => {
                    setInput((prevInput) => ({
                      year: e.target.value,
                      city: prevInput.city,
                      district: prevInput.district,
                    }));
                  }}
                >
                  <MenuItem value={111}>111</MenuItem>
                  <MenuItem value={110}>110</MenuItem>
                  <MenuItem value={109}>109</MenuItem>
                  <MenuItem value={108}>108</MenuItem>
                  <MenuItem value={107}>107</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 165, maxHeight: 30 }}>
                <InputLabel id="demo-simple-select-label">縣/市</InputLabel>
                <Select
                  SelectDisplayProps={{
                    style: {
                      paddingTop: 10,
                      paddingBottom: 8,
                      fontSize: '16px',
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.city}
                  label="Age"
                  placeholder="請選擇縣/市"
                  onChange={(e) => {
                    setInput((prevInput) => ({
                      year: prevInput.year,
                      city: e.target.value,
                      district: prevInput.district,
                    }));
                  }}
                >
                  {Object.keys(option111).map((city) => (
                    <MenuItem key={useId()} value={city}>{`${city}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 165, maxHeight: 30 }}>
                {/* <InputLabel id="demo-simple-select-label">區</InputLabel> */}
                {/* <Select
                  SelectDisplayProps={{
                    style: {
                      paddingTop: 10,
                      paddingBottom: 8,
                      fontSize: '16px',
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.district}
                  label="Age"
                  placeholder="請先選擇縣/市"
                  onChange={(e) => {
                    setInput((prevInput) => ({
                      year: prevInput.year,
                      city: prevInput.city,
                      district: e.target.value,
                    }));
                  }}
                >
                  {district111List.map((district) => (
                    <MenuItem key={useId()} value={district}>
                      {`${district}`}
                    </MenuItem>
                  ))}
                </Select> */}
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={district111List}
                  sx={{
                    maxHeight: 41,
                    width: 165,
                    fontSize: '16px',
                  }}
                  ListboxProps={{
                    style: {
                      // paddingTop: 10,
                      // paddingBottom: 8,
                      fontSize: '16px',
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // InputProps={{ style: { fontSize: `16 !important` } }}
                      label="區"
                    />
                  )}
                />
              </FormControl>
              <button
                className="bg-[#651FFF] w-[83px] h-[37px] font-ubuntu font-bold text-[14px] text-white rounded"
                type="button"
                disabled
              >
                SUBMIT
              </button>
            </div>
            <Divider sx={{ color: 'primary.main', borderColor: 'black' }}>
              <Chip
                label="搜尋結果"
                sx={{
                  color: 'primary.main',
                  backgroundColor: 'primary.white',
                }}
              />
            </Divider>
          </ThemeProvider>
          <div>
            <p className="flex justify-center text-[32px] py-12">
              111年 台北市 中正區
            </p>
          </div>
          <HighchartsReact highcharts={Highcharts} options={columnOptions} />
          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const rawData111 = await fetch(
    'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/111'
  ).then((res) => res.json());
  const rawData110 = await fetch(
    'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/110'
  ).then((res) => res.json());
  const rawData109 = await fetch(
    'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/109'
  ).then((res) => res.json());
  const rawData108 = await fetch(
    'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/108'
  ).then((res) => res.json());
  const rawData107 = await fetch(
    'https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/107'
  ).then((res) => res.json());

  return {
    props: {
      rawData111,
      rawData110,
      rawData109,
      rawData108,
      rawData107,
    },
  };
};
