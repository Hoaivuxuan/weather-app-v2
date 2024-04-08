import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ShopifyWidget } from './ShopifyWidget';
import { SmallWeatherWidget } from './SmallWeatherWidget'
const nameToWidget = {
  Shopify: ShopifyWidget,
  SmallWeather: SmallWeatherWidget
};
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;


  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_ADDED':
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_UPDATE': 
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_DELETED':
      // Do nothing
      break;

    case 'WIDGET_CLICK':
      break;

    default:
      break;
  }
}
