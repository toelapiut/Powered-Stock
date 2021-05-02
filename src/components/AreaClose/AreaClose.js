import React, {useMemo, useCallback} from 'react';
import {AreaClosed, Line, Bar} from '@visx/shape';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import {curveMonotoneX} from '@visx/curve';
import {GridRows, GridColumns} from '@visx/grid';
import {scaleTime, scaleLinear} from '@visx/scale';
import {Tooltip, TooltipWithBounds, defaultStyles} from '@visx/tooltip';
import {localPoint} from '@visx/event';
import {LinearGradient} from '@visx/gradient';
import {max, extent} from 'd3-array';
import {formatDate, getDate, getStockValue, bisectDate} from '../../helper/utils';
import PropTypes from 'prop-types';


const stock = appleStock.slice(120);
export const background = '#222352';
export const background2 = '#222352';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';

import {getWindowDimensions} from '../../helper/utils';

let dimensions = getWindowDimensions();

console.log({dimensions});

const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid white',
  color: 'white',
};

export const AreaClose = ({
  width = dimensions.width - 470,
  height = dimensions.height- 190,
  margin = {top: 0, right: 0, bottom: 0, left: 0},
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}) => {
  if (width < 10) return null;

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  // scales
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(stock, getDate),
      }),
    [innerWidth, margin.left],
  );

  const stockValueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
        nice: true,
      }),
    [margin.top, innerHeight],
  );

  // tooltip handler
  const handleTooltip = useCallback(
    (event) => {
      const {x} = localPoint(event) || {x: 0};
      const x0 = dateScale.invert(x);
      const index = bisectDate(stock, x0, 1);
      const d0 = stock[index - 1];
      const d1 = stock[index];
      let d = d0;

      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }

      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: stockValueScale(getStockValue(d)),
      });
    },
    [showTooltip, stockValueScale, dateScale],
  );

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#area-background-gradient)"
          rx={10}
        />
        <LinearGradient id="area-background-gradient" from={background} to={background2}/>
        <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1}/>
        <GridRows
          left={margin.left}
          scale={stockValueScale}
          width={innerWidth}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0}
          pointerEvents="none"
        />
        <GridColumns
          top={margin.top}
          scale={dateScale}
          height={height}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0.2}
          pointerEvents="none"
        />
        <AreaClosed
          data={stock}
          x={d => dateScale(getDate(d)) ?? 0}
          y={d => stockValueScale(getStockValue(d)) ?? 0}
          yScale={stockValueScale}
          strokeWidth={1}
          stroke="url(#area-gradient)"
          fill="url(#area-gradient)"
          curve={curveMonotoneX}
        />
        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          rx={14}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />
        {tooltipData && (
          <g>
            <Line
              from={{x: tooltipLeft, y: margin.top}}
              to={{x: tooltipLeft, y: innerHeight + margin.top}}
              stroke={accentColorDark}
              strokeWidth={2}
              pointerEvents="none"
              strokeDasharray="5,2"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill={accentColorDark}
              stroke="white"
              strokeWidth={2}
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
      {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - 12}
            left={tooltipLeft + 12}
            style={tooltipStyles}
          >
            {`$${getStockValue(tooltipData)}`}
          </TooltipWithBounds>
          <Tooltip
            top={innerHeight + margin.top - 14}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              minWidth: 72,
              textAlign: 'center',
              transform: 'translateX(-50%)',
            }}
          >
            {formatDate(getDate(tooltipData))}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

AreaClose.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  showTooltip: PropTypes.func,
  hideTooltip: PropTypes.func,
  tooltipData: PropTypes.object,
  tooltipTop: PropTypes.number,
  tooltipLeft: PropTypes.number,
};

