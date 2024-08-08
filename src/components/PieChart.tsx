import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PieChartProps {
  data: { value: number }[];
  width: number;
  height: number;
}

export const PieChart: FC<PieChartProps> = ({ data, width, height }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const radius = Math.min(width, height) / 2;
    const svg = d3
      .select(ref.current)
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
      .attr('width', width)
      .attr('height', height);

    // Limpar qualquer conteúdo existente
    svg.selectAll('*').remove();

    // Define o Clipping Path
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    const group = svg.append('g').attr('clip-path', 'url(#clip)');

    const pie = d3.pie<{ value: number }>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = group
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr(
        'd',
        arc as d3.Arc<
          any,
          d3.PieArcDatum<{
            value: number;
          }>
        >
      )
      .attr('fill', (_d, i) => d3.schemeCategory10[i % 10]);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 5])
      .translateExtent([
        [-width / 2, -height / 2],
        [width / 2, height / 2],
      ])
      .extent([
        [-width / 2, -height / 2],
        [width / 2, height / 2],
      ])
      .on('zoom', (event) => {
        group.attr('transform', event.transform);
      });

    svg.call(zoom as d3.ZoomBehavior<SVGSVGElement, unknown>);
  }, [data, width, height]);

  return <svg ref={ref}></svg>;
};
