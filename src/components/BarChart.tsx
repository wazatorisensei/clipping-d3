/**
 * @description Técnica de Clipping em um Gráfico de Barras - usar o viewport do clip path para renderizar os dados visuais apenas nele.
 */

import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: { value: number }[];
  width: number;
  height: number;
}

export const BarChart: FC<BarChartProps> = ({ data, width, height }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    // Limpar qualquer conteúdo existente
    svg.selectAll('*').remove();
    // Definindo o Clipping Path
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    const group = svg.append('g').attr('clip-path', 'url(#clip');

    const xScale = d3
      .scaleBand()
      .domain(data.map((_d, i) => i.toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .range([height, 0]);

    group
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_d, i) => xScale(i.toString())!)
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.value))
      .attr('fill', 'steelblue');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 200])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', (event) => {
        group.attr('transform', event.transform);
      });

    svg.call(zoom);
  }, [data, width, height]);

  return (
    <svg
      style={{ border: '1px solid white', borderRadius: '4px', padding: '2px' }}
      ref={ref}
      width={width}
      height={height}
    />
  );
};
