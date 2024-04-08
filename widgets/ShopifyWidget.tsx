/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  ImageWidget,
  SvgWidget,
  TextWidget,
  type FlexWidgetStyle,
} from 'react-native-android-widget';

export function ShopifyWidget() {
  return (
    <FlexWidget
      style={{
        backgroundColor: '#ffffff',
        height: 180,
        width: 180,
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FlexWidget 
        style={{
        }}
      >
        <TextWidget
          text="Hà Nội"
          style={{ 
            marginTop: -3,
            fontSize: 20, 
            color: '#5686DF', 
            fontWeight: '700',
            fontFamily: 'Roboto',
          }}
        />
      </FlexWidget>
      <FlexWidget
        style={{          
          height: 'match_parent',
          width: 'match_parent',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <FlexWidget 
          style={{          
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <FlexWidget 
            style={{
            }}
          >
            <TextWidget
              text="20°"
              style={{
                marginTop: -12,
                fontSize: 50, 
                color: '#5686DF',
                fontWeight: '200',
              }}
            />
          </FlexWidget>
          <FlexWidget 
            style={{
              width: 'match_parent',
              height: 'match_parent',
              justifyContent: 'center', 
              alignItems: 'center', 
            }}
          >
            <TextWidget
              text="Mưa phùn"
              style={{
                textAlign: 'center',
                width: 60,
                fontSize: 16, 
                color: '#5686DF',
                fontWeight: '300',
              }}
            /> 
            <TextWidget
              text="~16°"
              style={{
                fontSize: 16, 
                color: '#5686DF',
                fontWeight: '500',
              }}
            />
          </FlexWidget>
        </FlexWidget>
        <FlexWidget 
          style={{ 
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <FlexWidget 
            style={{
              width: 'match_parent',
              alignItems: 'center',
            }}
          >
            <Cloudy width={40} height={40}/>
          </FlexWidget>
          <FlexWidget style={{width: 'match_parent', alignItems:'center', marginTop: 10}}>
            <TextWidget
              text="Thứ tư"
              style={{ 
                fontSize: 15, 
                color: '#EE5C51',
                fontWeight: '600',
              }}
            />
            <TextWidget
              text="22"
              style={{ 
                marginTop: -12,
                fontSize: 50, 
                color: '#000000',
                fontWeight: '200',
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>

      {/* <FlexWidget
        style={{
          justifyContent: 'space-between',
          flexDirection: 'column',
          width: 'match_parent',
          flex: 1,
        }}
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <MetricCellText title="Total Sales" amount="$2.03k" trend={-75} />

          <BarChart />
        </Row>

        <Row>
          <MetricCell paddingRight={6}>
            <MetricCellText title="Sessions" amount="2,008" trend={213} />
            <SparkLine />
          </MetricCell>
          <MetricCell paddingLeft={6}>
            <MetricCellText
              title="Avg order value"
              amount="$122.52"
              trend={-66}
            />
            <SparkLine />
          </MetricCell>
        </Row>

        <Row>
          <MetricCell paddingRight={6}>
            <MetricCellText title="Conversion rate" amount="0%" trend={0} />
            <SparkLineEmpty />
          </MetricCell>
          <MetricCell paddingLeft={6}>
            <MetricCellText title="Total orders" amount="39" trend={70} />
            <SparkLine />
          </MetricCell>
        </Row>

        <Row>
          <MetricCell paddingRight={6}>
            <MetricCellText title="Net sales" amount="1.89k" trend={-77} />
            <SparkLine />
          </MetricCell>
          <MetricCell paddingLeft={6}>
            <MetricCellText title="Visitors" amount="2,008" trend={213} />
            <SparkLine />
          </MetricCell>
        </Row>
      </FlexWidget> */}
    </FlexWidget>
  );
}


interface RowProps {
  children: any;
  style?: FlexWidgetStyle;
}

function Row({ children, style }: RowProps) {
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        width: 'match_parent',
        ...style,
      }}
    >
      {children}
    </FlexWidget>
  );
}

interface MetricCellProps {
  children: any;
  paddingLeft?: number;
  paddingRight?: number;
}

function MetricCell({ children, paddingLeft, paddingRight }: MetricCellProps) {
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        flex: 1,
        width: 'match_parent',
        height: 'wrap_content',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft,
        paddingRight,
      }}
    >
      {children}
    </FlexWidget>
  );
}

interface MetricCellTextProps {
  title: string;
  amount: string;
  trend: number;
}

function MetricCellText({ title, amount, trend }: MetricCellTextProps) {
  return (
    <FlexWidget style={{ flexDirection: 'column' }}>
      <TextWidget text={title} style={{ fontSize: 12, color: '#717173' }} />
      <TextWidget text={amount} style={{ fontSize: 12, color: '#222222' }} />
      <FlexWidget style={{ flexDirection: 'row', alignItems: 'center' }}>
        {trend === 0 ? (
          <IconWidget
            font="material"
            icon="horizontal_rule"
            size={24}
            style={{
              color: '#8F9094',
            }}
          />
        ) : null}
        {trend !== 0 ? (
          <IconWidget
            font="material"
            icon={trend < 0 ? 'arrow_drop_down' : 'arrow_drop_up'}
            size={24}
            style={{
              color: trend < 0 ? '#FF4660' : '#00A284',
            }}
          />
        ) : null}
        {trend !== 0 ? (
          <TextWidget
            text={`${Math.abs(trend)}%`}
            style={{ fontSize: 12, color: trend < 0 ? '#FF4660' : '#00A284' }}
          />
        ) : null}
      </FlexWidget>
    </FlexWidget>
  );
}

function BarChart() {
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 'match_parent',
        paddingVertical: 6,
      }}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <FlexWidget
          key={i}
          style={{
            width: 8,
            height: i === 5 || i === 10 ? 'match_parent' : 8,
            borderRadius: 4,
            marginRight: 4,
            backgroundGradient: {
              from: '#8D75F6',
              to: i === 5 || i === 10 ? '#00E1A4' : '#8D75F6',
              orientation: 'BOTTOM_TOP',
            },
          }}
        />
      ))}
    </FlexWidget>
  );
}

function SparkLine() {
  return (
    <SvgWidget
      style={{
        width: 42,
        height: 42,
      }}
      svg={`
<svg
  id="chart"
  width="500"
  height="500"
  viewBox="0 0 500 500"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00E1A4" />
      <stop offset="100%" stop-color="#8D75F6" />
    </linearGradient>
  </defs>
  <path
    d="M 0,51.531164569369366 C 10.000000000000002,104.71987128342933 29.999999999999996,282.694862149111 50,317.47469813966916 C 70,352.25453413022734 80,240.2957717778056 100,225.43034452216017 C 120,210.56491726651473 130,247.3399789904011 150,243.1475618614419 C 170,238.95514473248267 180,234.97528999171524 200,204.46825887736406 C 220,173.9612277630129 230,103.12169051547102 250,90.61240628968602 C 270,78.10312206390104 280,83.48729100462829 300,141.92183774843915 C 320,200.35638449225002 330,345.4113348281296 350,382.7851400087403 C 370,420.158945189351 380,350.2921574087128 400,328.7908636514925 C 420,307.2895698942722 430,305.16714976830076 450,275.2786712226389 C 470,245.390192676977 490,198.53451098307428 500,179.34847092318313"
    fill="none"
    stroke="url(#gradient)"
    stroke-width="16px"
  />
  <g></g>
</svg>
  `}
    />
  );
}

function SparkLineEmpty() {
  return (
    <SvgWidget
      style={{
        width: 42,
        height: 42,
      }}
      svg={`
<svg
  id="chart"
  width="500"
  height="500"
  viewBox="0 0 500 500"
  xmlns="http://www.w3.org/2000/svg"
>
  <line
    x1="0"
    x2="500"
    y1="250"
    y2="250"
    stroke="#8D75F6"
    stroke-width="16px"
  />
  <g></g>
</svg>
  `}
    />
  );
}

interface CloudyProps {
  width: number;
  height: number;
}

function Cloudy({width, height}: CloudyProps) {
  return (
    <SvgWidget
      style={{
        width,
        height,
      }}
      svg={`
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.6" d="M23.9712 22.1711C26.4839 22.1711 28.518 20.137 28.518 17.6243C28.518 15.1115 26.4839 13.0774 23.9712 13.0774C23.9555 13.0774 23.9399 13.0774 23.9243 13.0774C23.5237 9.46173 20.4491 6.64204 16.7138 6.64204C13.7641 6.64204 11.2305 8.40044 10.0964 10.9236C10.06 10.9236 10.0236 10.9184 9.98715 10.9184C6.88133 10.9184 4.36338 13.4363 4.36338 16.5422C4.36338 19.648 6.88133 22.1659 9.98715 22.1659" fill="#57AAFF"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8725 12.7008C23.4878 10.3621 21.9777 8.39792 19.9145 7.38344C20.7772 5.45633 22.7117 4.11371 24.9597 4.11371C28.011 4.11371 30.4846 6.5873 30.4846 9.63864C30.4846 11.2592 29.7869 12.7168 28.6754 13.7274C27.8527 12.9136 26.722 12.4115 25.4747 12.4115C24.9107 12.4115 24.3708 12.5137 23.8725 12.7008Z" fill="#FDCA4F"/>
      <path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M24.1513 22.1677C26.5804 22.0733 28.5181 20.0767 28.5181 17.6243C28.5181 15.1115 26.484 13.0774 23.9713 13.0774H23.9244C23.9104 12.9508 23.8931 12.8253 23.8726 12.7008C24.3709 12.5137 24.9107 12.4115 25.4746 12.4115C27.8157 12.4115 29.7458 14.1803 30.0007 16.4589H30.0319C31.6083 16.4589 32.888 17.7387 32.888 19.315C32.888 20.8913 31.6083 22.1711 30.0319 22.1711L24.1513 22.1677Z" fill="#5686DF"/>
      <path d="M11.6676 25.6724C12.1388 25.6724 12.5208 25.2904 12.5208 24.8192C12.5208 24.348 12.1388 23.966 11.6676 23.966C11.1964 23.966 10.8144 24.348 10.8144 24.8192C10.8144 25.2904 11.1964 25.6724 11.6676 25.6724Z" fill="#57AAFF"/>
      <path d="M15.9283 25.6724C16.3995 25.6724 16.7815 25.2904 16.7815 24.8192C16.7815 24.348 16.3995 23.966 15.9283 23.966C15.4571 23.966 15.0751 24.348 15.0751 24.8192C15.0751 25.2904 15.4571 25.6724 15.9283 25.6724Z" fill="#57AAFF"/>
      <path d="M20.1942 25.6724C20.6654 25.6724 21.0474 25.2904 21.0474 24.8192C21.0474 24.348 20.6654 23.966 20.1942 23.966C19.723 23.966 19.341 24.348 19.341 24.8192C19.341 25.2904 19.723 25.6724 20.1942 25.6724Z" fill="#57AAFF"/>
      <path d="M24.4552 25.6724C24.9264 25.6724 25.3084 25.2904 25.3084 24.8192C25.3084 24.348 24.9264 23.966 24.4552 23.966C23.984 23.966 23.602 24.348 23.602 24.8192C23.602 25.2904 23.984 25.6724 24.4552 25.6724Z" fill="#57AAFF"/>
      <path d="M19.8533 5.7778C20.3245 5.7778 20.7065 5.39581 20.7065 4.92461C20.7065 4.45341 20.3245 4.07142 19.8533 4.07142C19.3821 4.07142 19.0001 4.45341 19.0001 4.92461C19.0001 5.39581 19.3821 5.7778 19.8533 5.7778Z" fill="#FDCA4F"/>
      <path d="M11.6676 32.6124C12.1388 32.6124 12.5208 32.2304 12.5208 31.7592C12.5208 31.288 12.1388 30.906 11.6676 30.906C11.1964 30.906 10.8144 31.288 10.8144 31.7592C10.8144 32.2304 11.1964 32.6124 11.6676 32.6124Z" fill="#57AAFF"/>
      <path d="M15.9283 32.6124C16.3995 32.6124 16.7815 32.2304 16.7815 31.7592C16.7815 31.288 16.3995 30.906 15.9283 30.906C15.4571 30.906 15.0751 31.288 15.0751 31.7592C15.0751 32.2304 15.4571 32.6124 15.9283 32.6124Z" fill="#57AAFF"/>
      <path d="M20.1942 32.6124C20.6654 32.6124 21.0474 32.2304 21.0474 31.7592C21.0474 31.288 20.6654 30.906 20.1942 30.906C19.723 30.906 19.341 31.288 19.341 31.7592C19.341 32.2304 19.723 32.6124 20.1942 32.6124Z" fill="#57AAFF"/>
      <path d="M24.4551 32.6124C24.9263 32.6124 25.3083 32.2304 25.3083 31.7592C25.3083 31.288 24.9263 30.906 24.4551 30.906C23.9839 30.906 23.6019 31.288 23.6019 31.7592C23.6019 32.2304 23.9839 32.6124 24.4551 32.6124Z" fill="#57AAFF"/>
      <path d="M9.53459 29.2048C10.0058 29.2048 10.3878 28.8228 10.3878 28.3516C10.3878 27.8804 10.0058 27.4984 9.53459 27.4984C9.06338 27.4984 8.6814 27.8804 8.6814 28.3516C8.6814 28.8228 9.06338 29.2048 9.53459 29.2048Z" fill="#57AAFF"/>
      <path d="M13.8005 29.2048C14.2717 29.2048 14.6537 28.8228 14.6537 28.3516C14.6537 27.8804 14.2717 27.4984 13.8005 27.4984C13.3293 27.4984 12.9473 27.8804 12.9473 28.3516C12.9473 28.8228 13.3293 29.2048 13.8005 29.2048Z" fill="#57AAFF"/>
      <path d="M18.0614 29.2048C18.5326 29.2048 18.9146 28.8228 18.9146 28.3516C18.9146 27.8804 18.5326 27.4984 18.0614 27.4984C17.5902 27.4984 17.2082 27.8804 17.2082 28.3516C17.2082 28.8228 17.5902 29.2048 18.0614 29.2048Z" fill="#57AAFF"/>
      <path d="M22.322 29.2048C22.7932 29.2048 23.1752 28.8228 23.1752 28.3516C23.1752 27.8804 22.7932 27.4984 22.322 27.4984C21.8508 27.4984 21.4688 27.8804 21.4688 28.3516C21.4688 28.8228 21.8508 29.2048 22.322 29.2048Z" fill="#57AAFF"/>
      <path d="M30.7103 5.77781C31.1815 5.77781 31.5635 5.39582 31.5635 4.92462C31.5635 4.45341 31.1815 4.07143 30.7103 4.07143C30.2391 4.07143 29.8571 4.45341 29.8571 4.92462C29.8571 5.39582 30.2391 5.77781 30.7103 5.77781Z" fill="#FDCA4F"/>
      <path d="M32.0675 9.84924C32.5387 9.84924 32.9207 9.46726 32.9207 8.99605C32.9207 8.52485 32.5387 8.14286 32.0675 8.14286C31.5963 8.14286 31.2143 8.52485 31.2143 8.99605C31.2143 9.46726 31.5963 9.84924 32.0675 9.84924Z" fill="#FDCA4F"/>
      <path d="M30.7103 13.9207C31.1815 13.9207 31.5635 13.5387 31.5635 13.0675C31.5635 12.5963 31.1815 12.2143 30.7103 12.2143C30.2391 12.2143 29.8571 12.5963 29.8571 13.0675C29.8571 13.5387 30.2391 13.9207 30.7103 13.9207Z" fill="#FDCA4F"/>
      <path d="M25.2818 3.06352C25.753 3.06352 26.135 2.68154 26.135 2.21033C26.135 1.73913 25.753 1.35714 25.2818 1.35714C24.8106 1.35714 24.4286 1.73913 24.4286 2.21033C24.4286 2.68154 24.8106 3.06352 25.2818 3.06352Z" fill="#FDCA4F"/>
      </svg>
      
      `}
    />
  );
}