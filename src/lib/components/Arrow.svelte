<script>
  export let p1;
  export let p2;

  $: minX = Math.min(p1.x, p2.x);
  $: minY = Math.min(p1.y, p2.y);
  $: width = Math.abs(p2.x - p1.x);
  $: height = Math.abs(p2.y - p1.y);

  $: x1 = p1.x - minX;
  $: y1 = p1.y - minY;
  $: x2 = p2.x - minX;
  $: y2 = p2.y - minY;

  $: midY = (y1 + y2) / 2;
  
  $: pathData = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}
                 M ${x2} ${y2} L ${x2 - 20} ${y2 - 20}
                 M ${x2} ${y2} L ${x2 + 20} ${y2 - 20}
                 `;
</script>

<svg
  style:position="absolute"
  style:top="{minY}px"
  style:left="{minX}px"
  width={width * 2}
  height={height * 2}
  style:pointer-events="none"
  style:overflow="visible"
>

  <path
    d={pathData}
    fill="none"
    stroke="#fa6769"
    stroke-width="10"
    stroke-linecap="round"
  />
</svg>